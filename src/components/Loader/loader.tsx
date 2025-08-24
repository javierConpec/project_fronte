export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background-100 flex flex-col items-center justify-center z-50">
     
      <div className="w-16 h-16 border-4 border-background-700 border-t-background-100 rounded-full animate-spin mb-8"></div>


      <h1 className="text-5xl font-extrabold text-text-700 flex space-x-1 uppercase">
        {"ISI GLOBAL".split("").map((char, idx) => (
          <span
            key={idx}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};
