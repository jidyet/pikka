// src/hooks/useSubscription.js
import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export function useSubscription() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'subscriptions'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const sub = snapshot.docs[0].data();
        setSubscription({
          plan: sub.plan,
          status: sub.status,
          nextPaymentDate: sub.nextPaymentDate,
        });
      } else {
        setSubscription(null); // no subscription found
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { ...subscription, loading };
}
