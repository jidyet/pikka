// 💥 Same imports as before
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageProvider';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY_HERE');

const BillingPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [billingCycle, setBillingCycle] = useState('weekly');
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const planOptions = {
    basic: { name: 'Basic Plan', weekly: 500, biweekly: 900, monthly: 1900 },
    premium: { name: 'Premium Plan', weekly: 1000, biweekly: 1900, monthly: 2900 },
    pro: { name: 'Pro Plan', weekly: 2000, biweekly: 3900, monthly: 5900 },
  };

  useEffect(() => {
    const fetchBillingInfo = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      try {
        const userId = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setSubscription(userDoc.data().subscription || null);
        }

        const q = query(collection(db, 'transactions'), where('userId', '==', userId));
        const snapshot = await getDocs(q);
        const txns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(txns);
      } catch (error) {
        console.error('Error fetching billing info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, [navigate]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get('status');
    const sessionId = query.get('session_id');

    const updateSubscriptionAndSaveTransaction = async (sessionId) => {
      if (!auth.currentUser) return;

      try {
        const response = await fetch(`http://localhost:5000/retrieve-checkout-session?sessionId=${sessionId}`);
        const session = await response.json();

        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          subscription: {
            plan: session.metadata.planName,
            billingCycle: session.metadata.billingCycle,
            price: `$${(session.amount_total / 100).toFixed(2)}`,
            status: session.subscriptionStatus,
            stripeCustomerId: session.customerId,
            stripeSubscriptionId: session.subscriptionId,
            nextBillingDate: session.currentPeriodEnd,
          }
        });

        await addDoc(collection(db, 'transactions'), {
          userId: auth.currentUser.uid,
          amount: (session.amount_total / 100).toFixed(2),
          status: 'Success',
          plan: session.metadata.planName,
          billingCycle: session.metadata.billingCycle,
          receiptUrl: '',
          createdAt: new Date(),
        });

        console.log('Subscription updated & transaction saved!');
      } catch (error) {
        console.error('Error updating subscription or saving transaction:', error);
      }
    };

    if (status === 'success' && sessionId) {
      toast.success('Payment Successful! 🎉');
      updateSubscriptionAndSaveTransaction(sessionId);

      setTimeout(() => {
        navigate('/billing', { replace: true });
      }, 2000);
    } else if (status === 'cancel') {
      toast.error('Payment Cancelled.');
      setTimeout(() => {
        navigate('/billing', { replace: true });
      }, 2000);
    }
  }, [location, navigate]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const price = planOptions[selectedPlan][billingCycle];

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price,
        planName: planOptions[selectedPlan].name,
        billingCycle,
      }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  const handleManageSubscription = async () => {
    if (!auth.currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const customerId = userDoc.data().subscription?.stripeCustomerId;
        if (!customerId) {
          toast.error('No Stripe Customer ID found.');
          return;
        }

        const response = await fetch('http://localhost:5000/create-customer-portal-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId }),
        });

        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open portal.');
    }
  };

  const handleCancelSubscription = async () => {
    if (!auth.currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const subscriptionId = userDoc.data().subscription?.stripeSubscriptionId;
        if (!subscriptionId) {
          toast.error('No Subscription ID found.');
          return;
        }

        await fetch('http://localhost:5000/cancel-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subscriptionId }),
        });

        toast.success('Subscription cancelled.');
        navigate('/billing');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <Topbar />
      <h1 className="text-3xl font-bold text-center mb-6">Billing Info</h1>

      {/* Plan Selection */}
      <div className="flex gap-4 justify-center mb-6">
        <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="p-2 border rounded">
          <option value="basic">Basic Plan</option>
          <option value="premium">Premium Plan</option>
          <option value="pro">Pro Plan</option>
        </select>

        <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)} className="p-2 border rounded">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Every 2 Weeks ($10 Off)</option>
          <option value="monthly">Monthly ($15 Off)</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mb-10">
        <button onClick={handleCheckout} className="bg-purple-600 px-6 py-3 text-white rounded-lg hover:bg-purple-700">Upgrade Plan</button>
        <button onClick={handleManageSubscription} className="bg-blue-600 px-6 py-3 text-white rounded-lg hover:bg-blue-700">Manage Subscription</button>
        <button onClick={handleCancelSubscription} className="bg-red-600 px-6 py-3 text-white rounded-lg hover:bg-red-700">Cancel Subscription</button>
      </div>

      {/* Subscription Info */}
      {subscription && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Current Plan: {subscription.plan}</h2>
          <p>Billing: {subscription.billingCycle}</p>
          <p>Price: {subscription.price}</p>
          <p>Status: {subscription.status}</p>
          <p>Next Billing Date: {subscription.nextBillingDate ? new Date(subscription.nextBillingDate * 1000).toLocaleDateString() : '-'}</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default BillingPage;
