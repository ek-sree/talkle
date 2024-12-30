const Loading = () => {
    return (
      <div className="text-7xl flex justify-center bg-slate-800 min-h-screen">
        <div className="flex items-center text-neutral-600">
            <span className="animate-pulse">

          TALKLE
            </span>
          <div className="flex space-x-1 ml-1">
            <div className="w-4 h-4 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-4 h-4 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-4 h-4 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-4 h-4 bg-neutral-600 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;