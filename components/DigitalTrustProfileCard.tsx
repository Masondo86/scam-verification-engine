'use client';

export default function DigitalTrustProfileCard() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-12 text-center border border-amber-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-amber-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
              🚀 Coming Soon
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Digital Trust Profile
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Your unified digital risk dashboard – combining scam exposure, digital footprint, and trust signals into one clear profile.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-amber-100">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-bold text-slate-900">Scam Exposure</h4>
                <p className="text-sm text-slate-600">Your high-risk scan history</p>
              </div>
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-amber-100">
                <div className="text-2xl mb-2">🔍</div>
                <h4 className="font-bold text-slate-900">Digital Footprint</h4>
                <p className="text-sm text-slate-600">Breaches, phone risk, device score</p>
              </div>
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-amber-100">
                <div className="text-2xl mb-2">🌐</div>
                <h4 className="font-bold text-slate-900">Trust Signals</h4>
                <p className="text-sm text-slate-600">Social presence, news, reputation</p>
              </div>
            </div>
            <button
              onClick={() => alert('Waitlist feature coming soon!')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-amber-200 transition-all hover:scale-105"
            >
              Join Waitlist
            </button>
            <p className="text-sm text-slate-500 mt-4">
              Be the first to access your complete digital trust profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}