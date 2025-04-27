require('dotenv').config();

const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(express.json());

// ✅ Create Checkout Session for Subscription
app.post('/create-checkout-session', async (req, res) => {
  const { price, planName, billingCycle } = req.body;

  if (!price || !planName || !billingCycle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const product = await stripe.products.create({
      name: `${planName} (${billingCycle})`,
    });

    const recurringInterval = billingCycle === 'weekly' ? 'week' :
                              billingCycle === 'biweekly' ? 'week' : 'month';
    const recurringIntervalCount = billingCycle === 'biweekly' ? 2 : 1;

    const stripePrice = await stripe.prices.create({
      unit_amount: price,
      currency: 'usd',
      recurring: {
        interval: recurringInterval,
        interval_count: recurringIntervalCount,
      },
      product: product.id,
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: stripePrice.id,
        quantity: 1,
      }],
      success_url: 'http://localhost:3000/billing?status=success&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/billing?status=cancel',
      metadata: {
        planName,
        billingCycle,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating subscription checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Retrieve Checkout Session
app.get('/retrieve-checkout-session', async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    res.json({
      id: session.id,
      customerId: session.customer,
      subscriptionId: session.subscription?.id || null,
      subscriptionStatus: session.subscription?.status || null,
      currentPeriodEnd: session.subscription?.current_period_end || null,
      amount_total: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create Customer Portal Session
app.post('/create-customer-portal-session', async (req, res) => {
  const { customerId } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: 'Missing customerId' });
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'http://localhost:3000/billing',
    });

    res.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Cancel Subscription
app.post('/cancel-subscription', async (req, res) => {
  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscriptionId' });
  }

  try {
    const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
    res.json(deletedSubscription);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
