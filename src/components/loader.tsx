export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50">
      {/* Spinner de puntos girando */}
      <div className="relative mb-8">
        <div className="flex space-x-3 animate-bounce-slow">
          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Texto animado ISI SOLUTION */}
      <h1 className="text-5xl font-extrabold tracking-widest text-gray-700 animate-fade-in-out drop-shadow-md uppercase">
        <span className="inline-block animate-fade-in-out">I</span>
        <span className="inline-block animate-fade-in-out delay-200">S</span>
        <span className="inline-block animate-fade-in-out delay-400">I</span>{" "}
        <span className="inline-block animate-fade-in-out delay-600">S</span>
        <span className="inline-block animate-fade-in-out delay-800">O</span>
        <span className="inline-block animate-fade-in-out delay-[1000ms]">L</span>
        <span className="inline-block animate-fade-in-out delay-[1200ms]">U</span>
        <span className="inline-block animate-fade-in-out delay-[1400ms]">T</span>
        <span className="inline-block animate-fade-in-out delay-[1600ms]">I</span>
        <span className="inline-block animate-fade-in-out delay-[1800ms]">O</span>
        <span className="inline-block animate-fade-in-out delay-[2000ms]">N</span>
      </h1>
    </div>
  );
};
