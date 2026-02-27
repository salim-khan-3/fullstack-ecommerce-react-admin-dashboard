import { useState, useEffect } from "react";

const loaders = [
  { id: 0, name: "Neural Synapse" },
  { id: 1, name: "Atomic Core" },
  { id: 2, name: "Liquid Wave" },
  { id: 3, name: "Hologram Bar" },
];

// ── 1. Neural Synapse (Modern Dots) ──────────────────────────
function NeuralLoader() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <style>{`
        @keyframes pulseIn { 0%, 100% { transform: scale(0.8); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }
        @keyframes rotateOuter { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .synapse-dot { animation: pulseIn 1.5s ease-in-out infinite; }
        .outer-ring { animation: rotateOuter 4s linear infinite; }
      `}</style>
      <div className="outer-ring absolute w-full h-full border-2 border-dashed border-cyan-500/30 rounded-full" />
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="synapse-dot w-2 h-2 rounded-full bg-cyan-400"
            style={{ animationDelay: `${i * 0.15}s`, boxShadow: '0 0 15px #22d3ee' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── 2. Atomic Core (Unique 3D Effect) ───────────────────────
function AtomicLoader() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <style>{`
        @keyframes atomRotate { 
            0% { transform: rotateX(70deg) rotateZ(0deg); } 
            100% { transform: rotateX(70deg) rotateZ(360deg); } 
        }
        .atom-path {
          position: absolute; width: 100%; height: 100%;
          border: 2px solid #a78bfa; border-radius: 50%;
        }
      `}</style>
      <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff]" />
      <div className="atom-path" style={{ animation: 'atomRotate 1s linear infinite' }} />
      <div className="atom-path" style={{ animation: 'atomRotate 1.5s linear infinite', rotate: '60deg' }} />
      <div className="atom-path" style={{ animation: 'atomRotate 2s linear infinite', rotate: '120deg' }} />
    </div>
  );
}

// ── 3. Liquid Wave (Glassmorphism) ──────────────────────────
function LiquidLoader() {
  return (
    <div className="relative w-16 h-24 border-2 border-white/20 rounded-full overflow-hidden bg-white/5 backdrop-blur-sm">
      <style>{`
        @keyframes waveUp { 
            0% { transform: translateY(100%) rotate(0deg); }
            100% { transform: translateY(-20%) rotate(360deg); }
        }
      `}</style>
      <div 
        className="absolute bottom-0 left-[-50%] w-[200%] h-[200%] bg-gradient-to-t from-blue-600 to-cyan-400 rounded-[40%]"
        style={{ animation: 'waveUp 4s ease-in-out infinite alternate' }}
      />
    </div>
  );
}

// ── 4. Hologram Bar (Cyberpunk Style) ───────────────────────
function HologramLoader() {
  return (
    <div className="flex flex-col items-center gap-2">
      <style>{`
        @keyframes scan { 0% { left: -100%; } 100% { left: 100%; } }
      `}</style>
      <div className="relative w-48 h-1 bg-white/10 overflow-hidden">
        <div 
          className="absolute h-full w-full bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
          style={{ animation: 'scan 1.5s linear infinite' }}
        />
      </div>
      <span className="text-[10px] text-fuchsia-400 animate-pulse tracking-[0.3em]">SYSTEM LOADING...</span>
    </div>
  );
}

const loaderComponents = [NeuralLoader, AtomicLoader, LiquidLoader, HologramLoader];

const Loader = () => {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const ActiveLoader = loaderComponents[active];

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 bg-[#050505] text-white p-6">
      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="text-center z-10">
        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">
          ULTRA_LOADERS
        </h1>
        <div className="h-[2px] w-12 bg-cyan-500 mx-auto mt-2" />
      </header>

      {/* Showcase Card */}
      <div className="relative group z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
        <div className="relative w-72 h-72 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
          <div className={`transition-all duration-500 ${loading ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
            <ActiveLoader />
          </div>
        </div>
      </div>

      {/* Modern Glass Controls */}
      <div className="flex flex-wrap justify-center gap-3 z-10">
        {loaders.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all
              ${active === l.id 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/5'}`}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Loader;