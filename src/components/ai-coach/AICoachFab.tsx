import { useAIStore } from '../../stores/useAIStore';

export default function AICoachFab() {
  const isOpen = useAIStore((s) => s.isOpen);
  const toggleOpen = useAIStore((s) => s.toggleOpen);
  const messages = useAIStore((s) => s.messages);

  if (isOpen) return null;

  return (
    <button
      onClick={toggleOpen}
      className="fixed right-4 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-float transition-all"
      style={{
        bottom: 'calc(5rem + env(safe-area-inset-bottom, 0px))',
        background: 'linear-gradient(135deg, #6c5ce7, #a855f7)',
        boxShadow: '0 0 30px rgba(108, 92, 231, 0.5), 0 0 60px rgba(168, 85, 247, 0.2)',
      }}
    >
      <span>🤖</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#00f0ff] animate-pulse" />
      {messages.length > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-500 text-white text-[10px] md:text-xs flex items-center justify-center font-bold">
          {Math.min(messages.length, 9)}
        </span>
      )}
    </button>
  );
}
