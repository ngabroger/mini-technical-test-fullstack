import React, { useState } from 'react';
import { verifyUserId } from '../services/todoApi';

type LoginFormProps = {
  userId: string;
  setUserId: (v: string) => void;
  setIsLoggedIn: (v: boolean) => void;
  setAlert: (v: { message: string; type?: string }) => void;
};

export default function LoginFormComponent({ userId, setUserId, setIsLoggedIn, setAlert }: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setLoading(true);
    try {
      const result = await verifyUserId(userId.trim());
      if (!result.valid) {
        setAlert({ message: result.message || 'User ID tidak valid', type: 'error' });
        setLoading(false);
        return;
      }
      localStorage.setItem('userId', userId.trim());
      setIsLoggedIn(true);
    } catch {
      setAlert({ message: 'Gagal verifikasi user ID', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>
        <p className="text-gray-500 text-center mb-6">Masukkan User ID untuk melanjutkan</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="User ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}