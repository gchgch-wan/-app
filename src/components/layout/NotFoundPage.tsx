import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl mb-6">🌌</div>
        <h1 className="text-4xl font-bold mb-4">
          页面未找到
        </h1>
        <p className="text-gray-400 mb-8">
          你探索到了一个不存在的页面。在 NebulaFit 的宇宙中，这颗星球还未被发现。
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="glow-btn px-6 py-3">
            🏠 返回首页
          </Link>
          <Link to="/dashboard" className="px-6 py-3 rounded-xl border border-[#1a1a3e] text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition-all">
            📊 去仪表盘
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
