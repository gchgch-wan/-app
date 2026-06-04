import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/useAdminStore';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAdminStore((s) => s.login);

  const handleLogin = () => {
    if (login(password)) {
      setError('');
    } else {
      setError('密码错误');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-6">🛡️</div>
        <h1 className="text-2xl font-bold mb-2 neon-text">NebulaFit 管理后台</h1>
        <p className="text-gray-500 text-sm mb-8">请输入管理员密码进入</p>

        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="管理员密码"
          className="w-full bg-[#0a0a1a] border border-[#1a1a3e] rounded-xl px-4 py-3 text-white text-center placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition-colors mb-4"
          autoFocus
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button onClick={handleLogin} className="glow-btn w-full py-3">
          进入管理后台 →
        </button>

        <p className="text-gray-600 text-[10px] mt-6">
          默认密码: admin123
        </p>
      </motion.div>
    </div>
  );
}
