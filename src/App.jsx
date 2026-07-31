import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Navigation, Cpu, Eye, Wifi, X } from 'lucide-react';

// ==========================================
// 1. 先宣告客製化內容元件 (系統架構圖)
// ==========================================
// 1. 系統架構與核心哲學元件 (對應第二張圖)
const SystemArchitectureContent = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-4 overflow-y-auto">
      <div className="flex-1 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Pipeline 架構</h3>
        <div className="space-y-3 my-auto">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-700 text-cyan-300">Input<br/><span className="text-[9px] text-slate-400">1280x720 @ 30fps</span></div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-blue-500/40 text-blue-300">YOLOv26n<br/><span className="text-[9px] text-slate-400">2.6M params</span></div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/40 text-emerald-300">LSTR CULane<br/><span className="text-[9px] text-slate-400">765K params</span></div>
          </div>
          <div className="flex justify-center"><div className="w-0.5 h-4 bg-cyan-500/50" /></div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-purple-500/40 text-purple-300">Spatial Fusion v2</div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/40 text-amber-300">3-Tier Threat</div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-pink-500/40 text-pink-300">HUD Render</div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[42%] bg-slate-900/80 border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between text-xs space-y-2">
        <h3 className="text-lg font-bold text-blue-400 mb-2">核心設計原則</h3>
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">⚡ <b>CPU-only 邊緣部署</b>：全在 ARM Cortex-A76 執行。</div>
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">🔗 <b>輕量化模型選型</b>：總大小小於 9MB。</div>
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">🛡️ <b>機車專用 TTC 閥值</b>：較 ISO 15623 更嚴格。</div>
        <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">📈 <b>三重時序穩定</b>：EMA 平滑 + 突變過濾 + Coasting。</div>
      </div>
    </div>
  );
};

// 2. LSTR 車道偵測與威脅分級元件 (對應第一張圖)
const LstrAndThreatContent = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-4 overflow-y-auto">
      <div className="flex-1 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between text-xs">
        <div>
          <h3 className="text-lg font-bold text-emerald-400 mb-2">🛣️ LSTR 車道偵測 + 時序穩定</h3>
          <p className="text-slate-300 mb-3 leading-relaxed">
            以 ResNet18s 骨幹搭配 Transformer Decoder 輸出有理函數曲線，適應台灣道路環境。
          </p>
          <div className="space-y-1.5 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-emerald-300">✅ 有理函數：x = c0/(y-c1)^2 + ...</div>
            <div className="text-slate-300">✅ EMA 平滑：α=0.4 / 突變降 0.08 + Coasting 15 幀</div>
            <div className="text-slate-300">✅ Skip-2 跳幀：每 3 幀推論一次 (~17ms/幀)</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800">
          <div className="font-bold text-slate-200 mb-2 font-mono">Per-Class 真實寬度</div>
          <div className="bg-slate-950 rounded-xl overflow-hidden font-mono text-[11px]">
            <div className="grid grid-cols-3 bg-slate-900 p-1.5 text-slate-400"><div>Class</div><div className="text-center">Width</div><div className="text-right">Dist</div></div>
            <div className="grid grid-cols-3 p-1.5 border-t border-slate-900"><div>car</div><div className="text-center text-cyan-400">1.8 m</div><div className="text-right">36 m</div></div>
            <div className="grid grid-cols-3 p-1.5 border-t border-slate-900"><div>scooter</div><div className="text-center text-cyan-400">0.7 m</div><div className="text-right">14 m</div></div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[48%] bg-slate-900/80 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between text-xs">
        <div>
          <h3 className="text-lg font-bold text-amber-400 mb-2">🛡️ 距離估算 + TTC 威脅分級</h3>
          <div className="space-y-1.5 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3">
            <div className="text-red-400">🔴 critical : TTC &lt; 1.0s &amp; dist &lt; 2.0m</div>
            <div className="text-orange-400">🟠 warning : TTC &lt; 1.5s &amp; dist &lt; 4.0m</div>
            <div className="text-yellow-400">🟡 caution : TTC &lt; 2.5s &amp; dist &lt; 8.0m</div>
          </div>
        </div>
        <div className="space-y-2 font-mono">
          <div className="bg-red-950/40 border border-red-500/50 p-2 rounded-xl text-red-200 text-[11px]">🔴 [CRITICAL] SCOOTER 3.2m TTC 0.8s</div>
          <div className="bg-orange-950/40 border border-orange-500/50 p-2 rounded-xl text-orange-200 text-[11px]">🟠 [WARNING] CAR 8.0m TTC 1.9s</div>
        </div>
      </div>
    </div>
  );
};
const VisionPipelineContent = () => {
  const pipelineSteps = [
    { title: 'FrameReader', subtitle: '獨立線程 RAW 擷取', detail: '1280x720 @ 30fps', color: 'border-cyan-500/50 text-cyan-400', icon: '📷' },
    { title: 'YOLOv26n', subtitle: '物件偵測核心', detail: '2.6M params / imgsz=256/320', color: 'border-blue-500/50 text-blue-400', icon: '🎯' },
    { title: 'LSTR CULane', subtitle: '車道線檢測', detail: '765K params / TorchScript + skip-2', color: 'border-emerald-500/50 text-emerald-400', icon: '🛣️' },
    { title: 'Spatial Fusion v2', subtitle: '空間融合模組', detail: 'EMA Speed / Per-class -3m dist', color: 'border-purple-500/50 text-purple-400', icon: '📍' },
    { title: '3-Tier Threat', subtitle: '三級威脅評估', detail: 'Critical / Warning / Caution', color: 'border-amber-500/50 text-amber-400', icon: '⚠️' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto">
      <div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center space-x-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          <span>視覺處理管道 (VISION PIPELINE V2)</span>
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-6">端到端即時邊緣視覺推論與威脅分級架構</p>
      </div>

      {/* 5 階段橫向流動骨牌排版 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-auto">
        {pipelineSteps.map((step, idx) => (
          <div key={idx} className={`bg-slate-950/90 border ${step.color} rounded-2xl p-4 flex flex-col justify-between relative group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
            <div>
              <div className="text-2xl mb-2">{step.icon}</div>
              <div className="text-xs font-mono text-slate-500">STEP 0{idx + 1}</div>
              <h4 className="text-sm font-bold text-white mt-1">{step.title}</h4>
              <div className="text-[11px] text-slate-300 mt-0.5">{step.subtitle}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-cyan-300/80">
              {step.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-slate-500 font-mono">
        Pipeline Latency &lt; 30ms • Fully Synchronized on ARM Cortex-A76
      </div>
    </div>
  );
};
// ==========================================
// 2. 展示項目資料設定檔 (此時元件已存在，可以安全引用)
// ==========================================
const VISOR_ITEMS = [
  {
    id: 'hud-display',
    title: '市區重車流',
    subtitle: '2,676 detections - 106 threats - 32.5 FPS',
    icon: Eye,
    color: 'from-cyan-500 to-blue-600',
    description: '高亮度 HUD 投影介面，即時顯示速限、導航箭頭與車況警示，確保騎士視線不離路面。',
    placeholderText: '預留區域：HUD 視角模擬動畫 / 3D 渲染展示',
    gridClass: 'col-span-2 row-span-2',
    clipPath: 'polygon(2rem 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%, 0 2rem)',
    videoSrc: '/yolov26-demo.mp4'
  },
  {
    id: 'ai-detection',
    title: '視覺處理管道 (Vision Pipeline v2)',
    subtitle: 'End-to-End Edge Vision Inference',
    icon: ShieldAlert,
    color: 'from-blue-600 to-indigo-600',
    description: '端到端即時邊緣視覺推論架構，透過五大階段實現高精度物件偵測與威脅分級。',
    placeholderText: '預留區域：AI 物件辨識即時 Bounding Box 動畫',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 0 100%)',

    // 🚀 1. 縮小宮格時顯示的 5 階段霓虹預覽條
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-between px-2 py-1.5 bg-slate-950/80 border border-blue-500/40 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        {['RAW', 'YOLO', 'LSTR', 'Fusion', 'Threat'].map((step, i) => (
          <React.Fragment key={i}>
            <span className="text-[8px] font-mono font-bold text-blue-300 px-1 py-0.5 bg-blue-950/60 border border-blue-500/50 rounded">
              {step}
            </span>
            {i < 4 && <div className="w-1.5 h-[2px] bg-cyan-400 animate-pulse" />}
          </React.Fragment>
        ))}
      </div>
    ),

    // 🚀 2. 點擊放大後顯示的 5 階段骨牌互動詳細面板
    customContent: <VisionPipelineContent />
  },
  {
    id: 'route-nav',
    title: '系統架構與核心哲學', // 👈 換這裡
    subtitle: 'Pipeline & Core Design Principles',
    icon: Navigation,
    color: 'from-indigo-500 to-purple-600',
    description: '基於 ARM 架構的最佳化邊緣運算模型與多重時序穩定機制。',
    placeholderText: '預留區域：系統架構',
    gridClass: 'col-span-1 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 1.5rem 100%, 0 calc(100% - 1.5rem))',
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-between px-2 py-1.5 bg-slate-950/80 border border-cyan-500/40 rounded-xl text-[9px] font-mono text-cyan-300">
        <span>Input</span> ➔ <span>YOLOv26</span> ➔ <span>HUD</span>
      </div>
    ),
    customContent: <SystemArchitectureContent /> // 👈 綁定第二張圖元件
  },
  {
    id: 'edge-computing',
    title: 'LSTR 車道偵測與威脅分級', // 👈 換這裡
    subtitle: 'Lane Detection & Threat Assessment',
    icon: Cpu,
    color: 'from-amber-500 to-red-600',
    description: '結合 LSTR 曲線預測與真實寬度距離估算的動態 TTC 威脅分級系統。',
    placeholderText: '預留區域：LSTR 與威脅分級',
    gridClass: 'col-span-1 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%)',
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-around px-2 py-1 bg-slate-950/80 border border-amber-500/40 rounded-xl text-[9px] font-mono text-amber-300">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span>LSTR Lane + TTC</span>
      </div>
    ),
    customContent: <LstrAndThreatContent /> // 👈 綁定第一張圖元件
  },
  {
    id: 'telemetry',
    title: '郊區輕車流',
    subtitle: '1,682 detections - 22 threats - 38.3 FPS',
    icon: Activity,
    color: 'from-teal-500 to-cyan-600',
    description: '自動紀錄傾角、加速度與行車軌跡，事故發生時自動觸發緊急通報。',
    placeholderText: '預留區域：波形圖與數據',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 2rem, 2rem 0, 100% 0, 100% 100%, 0 100%)',
    videoSrc: '/yolov26-demo2.mp4'
  },
  {
    id: 'v2x-connect',
    title: '系統架構與核心哲學',
    subtitle: 'Pipeline & Core Design Principles',
    icon: Wifi,
    color: 'from-blue-500 to-teal-400',
    description: '基於 ARM 架構的最佳化邊緣運算模型與多重時序穩定機制。。',
    placeholderText: '預留區域：動態地圖軌跡',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)',
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-between px-2 py-1.5 bg-slate-950/80 border border-cyan-500/40 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div className="flex items-center space-x-1.5 text-[9px] font-mono font-bold text-cyan-300">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          <span>Input</span>
        </div>
        <div className="w-3 h-[2px] bg-cyan-400/80 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <div className="text-[9px] font-mono font-bold text-blue-300 px-1.5 py-0.5 bg-blue-950/60 border border-blue-500/50 rounded">
          YOLOv26
        </div>
        <div className="w-3 h-[2px] bg-blue-400/80 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        <div className="text-[9px] font-mono font-bold text-purple-300">
          HUD
        </div>
      </div>
    ),

    // 展開後的大視窗內容維持不變
    customContent: <SystemArchitectureContent />
  },
];

// ==========================================
// 3. 主應用程式元件
// ==========================================
export default function VisorExhibitionApp() {
  const [activeId, setActiveId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const idleTimerRef = useRef(null);
  const currentIndexRef = useRef(0);

  // 核心計時狀態機：精準控制 8 秒展示與 2 秒全畫面停頓
  useEffect(() => {
    if (!isAutoPlaying) return;

    let timer;
    if (activeId !== null) {
      setCountdown(8);
      let currentSec = 8;

      timer = setInterval(() => {
        currentSec -= 1;
        setCountdown(currentSec);
        if (currentSec <= 0) {
          clearInterval(timer);
          setActiveId(null);
          setIsTransitioning(true);
        }
      }, 1000);

    } else if (isTransitioning) {
      setCountdown(2);
      let currentSec = 2;

      timer = setInterval(() => {
        currentSec -= 1;
        setCountdown(currentSec);
        if (currentSec <= 0) {
          clearInterval(timer);
          setIsTransitioning(false);
          currentIndexRef.current = (currentIndexRef.current + 1) % VISOR_ITEMS.length;
          setActiveId(VISOR_ITEMS[currentIndexRef.current].id);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeId, isTransitioning]);

  // 6 秒無動作自動輪播偵測
  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      if (!activeId && !isTransitioning) {
        setActiveId(VISOR_ITEMS[currentIndexRef.current].id);
      }
    }, 6000);
  };

  useEffect(() => {
    const handleUserActivity = () => {
      if (isAutoPlaying) {
        setIsAutoPlaying(false);
        setIsTransitioning(false);
      }
      resetIdleTimer();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    resetIdleTimer();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      clearTimeout(idleTimerRef.current);
    };
  }, [isAutoPlaying]);

  const handleCardClick = (id) => {
    setIsAutoPlaying(false);
    setIsTransitioning(false);
    const clickedIndex = VISOR_ITEMS.findIndex(item => item.id === id);

    if (activeId === id) {
      setActiveId(null);
      if (clickedIndex !== -1) {
        currentIndexRef.current = (clickedIndex + 1) % VISOR_ITEMS.length;
      }
    } else {
      setActiveId(id);
      if (clickedIndex !== -1) {
        currentIndexRef.current = clickedIndex;
      }
    }
  };

  const handleBackdropClick = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(false);
    if (activeId) {
      const activeIdx = VISOR_ITEMS.findIndex(item => item.id === activeId);
      if (activeIdx !== -1) {
        currentIndexRef.current = (activeIdx + 1) % VISOR_ITEMS.length;
      }
    }
    setActiveId(null);
  };

  const activeItem = VISOR_ITEMS.find((item) => item.id === activeId);

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-white overflow-hidden font-sans select-none flex flex-col z-0">
      {/* 背景科技網格與光暈 */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 頂部標題列 */}
      <header className="h-16 shrink-0 px-6 flex justify-between items-center z-20 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/40 relative">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          <h1 className="text-xl sm:text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            VISOR 行車助理 <span className="text-xs font-mono text-slate-400 tracking-normal border border-cyan-500/30 px-2 py-0.5 rounded ml-2">SYSTEM DEMO</span>
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
          <span className={`w-2.5 h-2.5 rounded-full ${isAutoPlaying ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span>
            {isAutoPlaying
              ? (isTransitioning ? `NEXT IN (${countdown}s)` : `AUTO PLAYING (${countdown}s)`)
              : 'CLICK / INTERACTIVE MODE'}
          </span>
        </div>
      </header>

      {/* 主展示區 - 不規則科技拼圖排版 */}
      <main className="flex-1 min-h-0 p-6 grid grid-cols-4 grid-rows-3 gap-4 relative z-10">
        {VISOR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = activeId === item.id;
          return (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={() => handleCardClick(item.id)}
              style={{ clipPath: item.clipPath }}
              className={`relative group bg-slate-800 hover:bg-cyan-500/80 p-[1px] cursor-pointer transition-colors duration-300 ${item.gridClass}`}
            >
              <div
                style={{ clipPath: item.clipPath }}
                className="w-full h-full bg-slate-900/95 relative flex flex-col justify-between overflow-hidden p-6"
              >
                {/* 宮格背景影片或迷你示意圖播放 */}
                {item.videoSrc ? (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <video
                      src={item.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-30 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                  </div>
                ) : item.previewContent ? (
                  // 🚀 這裡會渲染我們剛才寫的迷你架構示意圖！
                  <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    {item.previewContent}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                  </div>
                ) : null}

                <div className={`flex flex-col h-full justify-between transition-opacity duration-300 relative z-10 ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="flex justify-between items-start z-10">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-cyan-300 border border-white/10 shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 drop-shadow-md">0{VISOR_ITEMS.indexOf(item) + 1}</span>
                  </div>
                  <div className="z-10 mt-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 drop-shadow-md">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1 line-clamp-2 drop-shadow-md">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* 獨立 CSS 背景暗化與模糊遮罩 */}
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${activeId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* 展開後的集中放大視窗 */}
      <AnimatePresence>
        {activeId && activeItem && (
          <motion.div
            key={`modal-wrapper-${activeId}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            <motion.div
              layoutId={`card-${activeId}`}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{ clipPath: activeItem.clipPath }}
              className="w-[85vw] h-[85vh] bg-cyan-500/60 p-[1.5px] pointer-events-auto"
            >
              <div
                style={{ clipPath: activeItem.clipPath }}
                className="w-full h-full bg-slate-900 relative flex flex-col justify-between overflow-hidden p-8"
              >
                {/* 頂部資訊與關閉按鈕 */}
                <div className="flex justify-between items-center border-b border-slate-700/50 pb-4 shrink-0 relative z-20">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeItem.color} text-white`}>
                      <activeItem.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-wide">{activeItem.title}</h2>
                      <p className="text-sm font-mono text-cyan-400">{activeItem.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="font-mono text-xs text-slate-400 border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 rounded-full hidden sm:block">
                      FEATURE DISPLAY
                    </div>
                    <button
                      onClick={handleBackdropClick}
                      className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* 中間動態內容渲染區 (完美自動判斷 customContent, videoSrc 或是預設轉圈圈) */}
                <div className="my-6 flex-1 min-h-0 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden">

                  {activeItem.customContent ? (
                    <div className="w-full h-full relative z-10 flex items-center justify-center">
                      {activeItem.customContent}
                    </div>
                  ) : activeItem.videoSrc ? (
                    <video
                      src={activeItem.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                      <div className="z-10 text-center">
                        <div className="w-16 h-16 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-300 font-mono text-base tracking-widest px-4">{activeItem.placeholderText}</p>
                      </div>
                    </>
                  )}

                </div>

                {/* 底部說明 */}
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/50 shrink-0 relative z-20 backdrop-blur-md">
                  <p className="text-slate-300 text-base leading-relaxed tracking-wide">{activeItem.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}