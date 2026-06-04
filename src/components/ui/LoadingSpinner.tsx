export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#1a1a3e] border-t-[#00f0ff] animate-spin" />
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    </div>
  );
}
