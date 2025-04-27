// src/pages/FakeCheckout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js'; // 👈 Stripe Import
import Topbar from '../components/Topbar';
import BottomNav from '../components/BottomNav';
import GoToDashboardButton from '../components/GoToDashboardButton';

// ✅ Put your Stripe Public Key here (Publishable Key)
const stripePromise = loadStripe('pk_test_51RHeDg4DsBIdwdg1PXTYgjNI83sZfHykbcGQsCc1lS4Itwg6sYVJ5vfKHBzjjhFx6lr0Nx8gVmf6tspxLAw7HZAj00fu9cqzJt'); // replace with your real key

// ✅ Mapping plan to Price IDs
const PRICE_IDS = {
  'Pro': 'price_12345abcde',    // replace with your Stripe price ID
  'Elite': 'price_67890vwxyz',  // replace with your Stripe price ID
};

const FakeCheckout = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(plan);
    } else {
      navigate('/select-plan');
    }
  }, [navigate]);

  const handleStripeCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error('Stripe not initialized.');
        return;
      }

      const priceId = PRICE_IDS[selectedPlan];
      if (!priceId) {
        toast.error('Invalid Plan Selected');
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          { price: priceId, quantity: 1 },
        ],
        mode: 'subscription', // recurring payment
        successUrl: `${window.location.origin}/dashboard`, // after payment
        cancelUrl: `${window.location.origin}/select-plan`, // if user cancels
        customerEmail: "test@example.com", // optional if you want prefill (later dynamic)
      });

      if (error) {
        console.error(error);
        toast.error(error.message);
      }
    } catch (err) {
      console.error('Checkout Error:', err);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Topbar />

      <main className="flex-1 p-6 flex flex-col items-center text-center">
        <GoToDashboardButton />

        <h1 className="text-3xl font-bold mb-6">Complete Your Payment</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl mb-4">
            Selected Plan: <span className="text-blue-500 font-semibold">{selectedPlan}</span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You will be redirected to secure Stripe Checkout.
          </p>

          <button
            onClick={handleStripeCheckout}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md"
          >
            Pay with Stripe
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default FakeCheckout;
