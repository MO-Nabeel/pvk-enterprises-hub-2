const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent";

const GlobalSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#040D1F] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full space-y-12">
        <div className="space-y-4">
          <div className={`${shimmer} h-4 w-28 rounded-full bg-white/10`} />
          <div className={`${shimmer} h-10 w-2/3 max-w-xl rounded-full bg-white/10`} />
          <div className={`${shimmer} h-4 w-1/2 max-w-md rounded-full bg-white/5`} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((card) => (
            <div
              key={card}
              className="rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-[1px]"
            >
              <div className="rounded-[calc(1.5rem-1px)] bg-white/5 p-6 space-y-5 backdrop-blur">
                <div className={`${shimmer} h-8 w-8 rounded-2xl bg-white/10`} />
                <div className="space-y-3">
                  <div className={`${shimmer} h-4 w-20 rounded-full bg-white/10`} />
                  <div className={`${shimmer} h-6 w-32 rounded-full bg-white/20`} />
                  <div className={`${shimmer} h-4 w-full rounded-full bg-white/10`} />
                  <div className={`${shimmer} h-4 w-5/6 rounded-full bg-white/10`} />
                </div>
                <div className={`${shimmer} h-10 w-full rounded-2xl bg-white/10`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[2fr,3fr]">
          <div className="space-y-4 rounded-3xl bg-white/5 p-6">
            <div className={`${shimmer} h-5 w-32 rounded-full bg-white/10`} />
            <div className={`${shimmer} h-8 w-2/3 rounded-full bg-white/20`} />
            <div className={`${shimmer} h-4 w-full rounded-full bg-white/10`} />
            <div className={`${shimmer} h-4 w-5/6 rounded-full bg-white/10`} />
            <div className="flex gap-3 pt-4">
              <div className={`${shimmer} h-12 flex-1 rounded-2xl bg-white/10`} />
              <div className={`${shimmer} h-12 flex-1 rounded-2xl bg-white/10`} />
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`${shimmer} h-12 w-12 rounded-2xl bg-white/10`} />
                <div className="flex-1 space-y-3">
                  <div className={`${shimmer} h-5 w-1/2 rounded-full bg-white/15`} />
                  <div className={`${shimmer} h-4 w-3/4 rounded-full bg-white/10`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default GlobalSkeleton;

