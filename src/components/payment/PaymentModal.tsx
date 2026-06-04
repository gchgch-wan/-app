import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePaymentStore } from '../../stores/usePaymentStore';
import { useMembershipStore } from '../../stores/useMembershipStore';

export default function PaymentModal() {
  const { t } = useTranslation('common');
  const { processingOrder, showPaymentModal, processPayment, completePayment, cancelPayment, closePaymentModal } = usePaymentStore();
  const upgradeTo = useMembershipStore((s) => s.upgradeTo);
  const [method, setMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [step, setStep] = useState<'select' | 'qrcode' | 'success'>('select');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (showPaymentModal) {
      setStep('select');
      setCountdown(0);
    }
  }, [showPaymentModal]);

  const handleSelectMethod = (m: 'alipay' | 'wechat') => {
    setMethod(m);
    processPayment(m);
    setStep('qrcode');
    // 模拟支付倒计时
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleConfirmPayment = () => {
    const success = completePayment();
    if (success) {
      const planMap: Record<string, any> = {
        'monthly': 'monthly',
        'yearly': 'yearly',
        'lifetime': 'yearly',
      };
      const tier = planMap[processingOrder?.planId || ''] || 'monthly';
      upgradeTo(tier);
      setStep('success');
    }
  };

  if (!showPaymentModal || !processingOrder) return null;

  const isZh = true;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={step === 'success' ? closePaymentModal : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Step 1: Select Method */}
          {step === 'select' && (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💳</div>
                <h2 className="text-xl font-bold">选择支付方式</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {processingOrder.planName} · ¥{processingOrder.amount}
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSelectMethod('alipay')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    method === 'alipay' ? 'border-[#00f0ff] bg-[#00f0ff]/5' : 'border-[#1a1a3e] hover:border-[#00f0ff]/30'
                  }`}
                >
                  <span className="text-3xl">🔵</span>
                  <div className="text-left">
                    <p className="font-bold">支付宝</p>
                    <p className="text-xs text-gray-500">Alipay · 支持花呗</p>
                  </div>
                </button>
                <button
                  onClick={() => handleSelectMethod('wechat')}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    method === 'wechat' ? 'border-[#00ff88] bg-[#00ff88]/5' : 'border-[#1a1a3e] hover:border-[#00ff88]/30'
                  }`}
                >
                  <span className="text-3xl">🟢</span>
                  <div className="text-left">
                    <p className="font-bold">微信支付</p>
                    <p className="text-xs text-gray-500">WeChat Pay</p>
                  </div>
                </button>
              </div>
              <button onClick={cancelPayment} className="w-full py-3 rounded-xl border border-[#1a1a3e] text-gray-400 text-sm">
                取消
              </button>
            </>
          )}

          {/* Step 2: QR Code */}
          {step === 'qrcode' && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">扫码支付</h2>
              <p className="text-gray-400 text-sm mb-2">
                ¥{processingOrder.amount} · {method === 'alipay' ? '支付宝' : '微信支付'}
              </p>
              <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-6xl mb-2">{method === 'alipay' ? '🔵' : '🟢'}</div>
                  <div className="w-32 h-32 mx-auto border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">QR Code</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                {countdown > 0
                  ? `请使用${method === 'alipay' ? '支付宝' : '微信'}扫描二维码 (${countdown}s)`
                  : '支付超时，请重新发起'}
              </p>
              {countdown > 0 ? (
                <button onClick={handleConfirmPayment} className="glow-btn w-full py-3 text-sm">
                  ✅ 确认已支付 ¥{processingOrder.amount}
                </button>
              ) : (
                <button onClick={() => { setStep('select'); }} className="w-full py-3 rounded-xl border border-[#1a1a3e] text-gray-400 text-sm">
                  重新选择
                </button>
              )}
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.5 }}
                className="text-7xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 neon-text">支付成功！</h2>
              <p className="text-gray-400 mb-2">你已升级为 {processingOrder.planName}</p>
              <p className="text-xs text-gray-500 mb-6">订单号: {processingOrder.id}</p>
              <button onClick={closePaymentModal} className="glow-btn w-full py-3">
                开始使用 →
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
