// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage'; // ✅ Added

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // ✅ Get translations
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || t.loginFailed || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f111a] text-white px-6">
      <h1 className="text-2xl font-semibold mb-6">{t.loginTitle || 'Sign In'}</h1>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm mb-1">{t.email || 'Email'}</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded bg-yellow-100 text-black"
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
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded bg-yellow-100 text-black pr-10"
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
          {loading ? (t.signingIn || 'Signing In...') : (t.signIn || 'Sign In')}
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          {t.noAccount || "Don’t have an account?"}{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            {t.registerNow || 'Register Now'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
