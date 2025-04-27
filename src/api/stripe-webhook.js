// src/api/stripe-webhook.js
import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const firestore = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe Webhook Secret (important)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Stripe needs raw body
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.planName;
      const price = session.amount_total / 100; // price in dollars

      if (userId && plan) {
        // Update user's Firestore profile
        await firestore.collection('users').doc(userId).set({
          subscription: {
            plan: plan,
            price: `$${price}/mo`,
            activatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }
        }, { merge: true });

        // Save transaction
        await firestore.collection('transactions').add({
          userId: userId,
          amount: price,
          plan: plan,
          status: 'Success',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log(`✅ Updated subscription and created transaction for user: ${userId}`);
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
