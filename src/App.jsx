import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Navigation, Cpu, Eye, Wifi, X } from 'lucide-react';

// ==========================================
// 展示項目資料設定檔 
// ==========================================
const VISOR_ITEMS = [
  {
    id: 'hud-display',
    title: '抬頭顯示系統 (HUD)',
    subtitle: 'Real-time Optical Projection',
    icon: Eye,
    color: 'from-cyan-500 to-blue-600',
    description: '高亮度 HUD 投影介面，即時顯示速限、導航箭頭與車況警示，確保騎士視線不離路面。',
    placeholderText: '預留區域：HUD 視角模擬動畫 / 3D 渲染展示',
    gridClass: 'col-span-2 row-span-2',
    clipPath: 'polygon(2rem 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%, 0 2rem)',
    // 🚀 新增：在此填入你的 YOLOv26 影片路徑 (放在 public 資料夾下)
    videoSrc: '/yolov26-demo.mp4' 
  },
  {
    id: 'ai-detection',
    title: 'YOLOv8 盲點偵測',
    subtitle: 'AI Blind Spot Detection',
    icon: ShieldAlert,
    color: 'from-blue-600 to-indigo-600',
    description: '利用邊緣運算即時辨識後方與兩側來車，並於危險距離時發出視覺與音訊警示。',
    placeholderText: '預留區域：AI 物件辨識即時 Bounding Box 動畫',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 0, calc(100% - 2rem) 0, 100% 2rem, 100% 100%, 0 100%)'
  },
  {
    id: 'route-nav',
    title: '智慧路況導航',
    subtitle: 'Adaptive Route Guidance',
    icon: Navigation,
    color: 'from-indigo-500 to-purple-600',
    description: '結合即時路況與天氣數據，自動評估最佳騎士路線。',
    placeholderText: '預留區域：動態地圖軌跡',
    gridClass: 'col-span-1 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 1.5rem 100%, 0 calc(100% - 1.5rem))'
  },
  {
    id: 'edge-computing',
    title: 'Raspberry Pi 核心',
    subtitle: 'Edge Hardware Processing',
    icon: Cpu,
    color: 'from-purple-600 to-pink-600',
    description: '低功耗高效率車載單晶片電腦，提供毫秒級的影像處理。',
    placeholderText: '預留區域：硬體架構圖',
    gridClass: 'col-span-1 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%)'
  },
  {
    id: 'telemetry',
    title: '行車記錄與數據',
    subtitle: 'Telemetry & IoT Cloud',
    icon: Activity,
    color: 'from-teal-500 to-cyan-600',
    description: '自動紀錄傾角、加速度與行車軌跡，事故發生時自動觸發緊急通報。',
    placeholderText: '預留區域：波形圖與數據',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 2rem, 2rem 0, 100% 0, 100% 100%, 0 100%)'
  },
  {
    id: 'v2x-connect',
    title: 'V2X 車聯網通訊',
    subtitle: 'Vehicle-to-Everything',
    icon: Wifi,
    color: 'from-blue-500 to-teal-400',
    description: '支援周邊車輛與智慧路口設備訊號連動，提前預警盲區交會車輛。',
    placeholderText: '預留區域：車聯網拓撲動態圖',
    gridClass: 'col-span-2 row-span-1',
    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)'
  },
];

export default function VisorExhibitionApp() {
  const [activeId, setActiveId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [countdown, setCountdown] = useState(8); 
  const [isTransitioning, setIsTransitioning] = useState(false); 

  const idleTimerRef = useRef(null);
  const currentIndexRef = useRef(0);

  // ==========================================
  // 核心計時狀態機：精準控制 8 秒展示與 2 秒全畫面停頓
  // ==========================================
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

  // ==========================================
  // 6 秒無動作自動輪播偵測
  // ==========================================
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

  // ==========================================
  // 手動點擊互動邏輯
  // ==========================================
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
        
        {/* 右上角精準動態指示燈 */}
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
                {/* 🚀 宮格狀態：如果有影片，作為背景播放 */}
                {item.videoSrc && (
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
                )}

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
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${
          activeId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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

                {/* 中間動態動畫預留區 / 影片展示區 */}
                <div className="my-6 flex-1 min-h-0 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  {/* 🚀 放大狀態：如果有影片，填滿展示區 */}
                  {activeItem.videoSrc ? (
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