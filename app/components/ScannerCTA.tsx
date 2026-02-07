import Link from 'next/link';

export default function ScannerCTA() {
  return (
    <div className="my-10 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">
            Received a suspicious message?
          </h3>
          <p className="text-slate-400 mb-0 max-w-md">
            Don't guess. Use our free South African scam analyzer to verify links, phone numbers, and emails instantly.
          </p>
        </div>

        <Link 
          href="/" 
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-900/50 flex items-center gap-2"
        >
          <span>Launch Scanner</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Trust Badge at bottom */}
      <div className="bg-slate-950/50 py-2 px-8 flex items-center justify-center md:justify-start gap-4 text-xs font-mono text-slate-500 border-t border-slate-800">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Analysis</span>
        <span>•</span>
        <span>100% Free</span>
        <span>•</span>
        <span>No Signup</span>
      </div>
    </div>
  );
}
