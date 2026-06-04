import { useAIStore } from '../../stores/useAIStore';

export default function AICoachFab() {
  const isOpen = useAIStore((s) => s.isOpen);
  const toggleOpen = useAIStore((s) => s.toggleOpen);
  const messages = useAIStore((s) => s.messages);

  if (isOpen) return null;

  return (
    <button
      onClick={toggleOpen}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-float"
      style={{
        background: 'linear-gradient(135deg, #6c5ce7, #a855f7)',
        boxShadow: '0 0 30px rgba(108, 92, 231, 0.5), 0 0 60px rgba(168, 85, 247, 0.2)',
      }}
    >
      <span>🤖</span>
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00f0ff] animate-pulse" />
      {messages.length > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
          {Math.min(messages.length, 9)}
        </span>
      )}
      <span className="absolute inset-0 rounded-full animate-ping bg-[#a855f7]/30" style={{ animationDuration: '3s' }} />
    </button>
  );
}
