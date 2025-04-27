// src/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage'; // ✅ Added

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // ✅ Get translations
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.name });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        createdAt: new Date().toISOString(),
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || t.registrationFailed || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f111a] text-white px-6">
      <h1 className="text-2xl font-semibold mb-6">{t.registerTitle || 'Register'}</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm mb-1">{t.fullName || 'Full Name'}</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t.enterYourName || "Enter your name"}
            className="w-full px-4 py-3 rounded bg-[#1d1f29] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t.email || 'Email'}</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-yellow-100 text-black"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t.password || 'Password'}</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-yellow-100 text-black pr-10"
              placeholder={t.enterPassword || "Enter password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded disabled:opacity-50"
        >
          {loading ? (t.creating || 'Creating...') : (t.createAccount || 'Create Account')}
        </button>

        <p className="text-sm text-center text-gray-400">
          {t.haveAccount || 'Already have an account?'}{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            {t.signIn || 'Sign In'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
