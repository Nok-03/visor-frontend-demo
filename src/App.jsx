import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, Navigation, Cpu, Eye, Smartphone, X, Filter, Clock, Bluetooth, Zap, AlertTriangle, Database, Terminal, FileCode, Radio, Layers, BarChart3, FastForward } from 'lucide-react';

// ==========================================
// 1. 各卡片展開後的詳細內容元件
// ==========================================

// ⚡ 效能優化黑科技區塊 (已調整比例、移除滾輪、降低彩度)
const LstrAndThreatContent = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-5 p-5 overflow-hidden items-stretch rounded-2xl">
      {/* 左側：效能成長視覺圖表 */}
      <div className="flex-[1.8] bg-slate-900/60 border border-slate-700/60 rounded-2xl p-5 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center space-x-2.5 mb-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">效能優化黑科技</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
            透過輕量化模型架構與邊緣計算優化，成功將幀率從最初的 <span className="text-slate-400 font-mono font-bold">15.2 FPS</span> 顯著提升至 <span className="text-cyan-400 font-mono font-bold">32.5+ FPS</span> 滿幀運行！
          </p>
        </div>

        {/* 視覺化柱狀圖 (降低色彩彩度) */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex items-end justify-between gap-3 h-48 relative shadow-inner my-auto">
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#0f172a_1px,transparent_1px)] bg-[size:100%_2rem] opacity-30 pointer-events-none rounded-xl" />

          {/* Bar 1 */}
          <div className="flex-1 flex flex-col items-center justify-end h-full z-10 space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400">15.2 FPS</span>
            <div className="w-full bg-slate-700/80 rounded-t-lg transition-all duration-500" style={{ height: '40%' }} />
            <span className="text-[10px] font-mono text-slate-400 truncate w-full text-center">Baseline</span>
          </div>

          {/* Bar 2 */}
          <div className="flex-1 flex flex-col items-center justify-end h-full z-10 space-y-1.5">
            <span className="text-[11px] font-mono text-slate-300">31.6 FPS</span>
            <div className="w-full bg-slate-600 rounded-t-lg transition-all duration-500" style={{ height: '83%' }} />
            <span className="text-[10px] font-mono text-slate-400 truncate w-full text-center">+ Skip-2</span>
          </div>

          {/* Bar 3 */}
          <div className="flex-1 flex flex-col items-center justify-end h-full z-10 space-y-1.5">
            <span className="text-[11px] font-mono text-cyan-300 font-bold">34.8 FPS</span>
            <div className="w-full bg-cyan-700/80 rounded-t-lg transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]" style={{ height: '92%' }} />
            <span className="text-[10px] font-mono text-slate-300 truncate w-full text-center">+ TorchScript</span>
          </div>

          {/* Bar 4 */}
          <div className="flex-1 flex flex-col items-center justify-end h-full z-10 space-y-1.5">
            <span className="text-[11px] font-mono text-slate-300">32.5 FPS</span>
            <div className="w-full bg-slate-600 rounded-t-lg transition-all duration-500" style={{ height: '86%' }} />
            <span className="text-[10px] font-mono text-slate-400 truncate w-full text-center">+ TTC v2</span>
          </div>
        </div>
      </div>

      {/* 右側：四大優化卡片 (改為低彩度、高質感的統一灰藍風格) */}
      <div className="flex-[2.2] flex flex-col justify-between gap-2.5">
        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center shadow transition-all flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <FastForward className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Skip-2 跳幀</span>
            </h4>
            <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              +108% FPS
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            車道偵測每 3 幀執行一次，攤銷推論成本 <span className="text-slate-100 font-mono">50ms ➔ 17ms</span>。EMA/Coasting 讓跳幀在視覺上不可感知。
          </p>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center shadow transition-all flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>TorchScript Compile</span>
            </h4>
            <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              +7% FPS
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            載入時 <span className="text-slate-100 font-mono">jit.trace + jit.freeze (~2s)</span>，消除 Python interpreter overhead。
          </p>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center shadow transition-all flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400 shrink-0" />
              <span>imgsz=256 降解析</span>
            </h4>
            <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              +25% YOLO
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            YOLO 像素從 102,400 降至 <span className="text-slate-100 font-mono">65,536 (-36%)</span>，推論 <span className="text-slate-100 font-mono">~24ms</span>。
          </p>
        </div>

        <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-center shadow transition-all flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Logspace Y-Sampling</span>
            </h4>
            <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              更穩定
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <span className="text-slate-100 font-mono">logspace 取樣 50 點</span> (近密遠疏)，匹配人類視覺透視。
          </p>
        </div>
      </div>
    </div>
  );
};

// 🎯 戰術中控系統
const ConsoleAppContent = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto rounded-2xl">
      <div className="flex-[3] bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-center space-y-4">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-purple-300 tracking-wide">全功能中控架構</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-1 shadow-inner">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-base">
              <Radio className="w-4.5 h-4.5 shrink-0" />
              <span>測速預警</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              整合政府 API 與航向判斷，精準排除對向測速。
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-1 shadow-inner">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-base">
              <Navigation className="w-4.5 h-4.5 shrink-0" />
              <span>路測模擬</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              室內模擬真實路徑、時速與傾角變化。
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-1 shadow-inner">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
              <Zap className="w-4.5 h-4.5 shrink-0" />
              <span>邊緣燈光</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              螢幕邊緣燈光直覺呈現盲點威脅。
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center space-y-1 shadow-inner">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-base">
              <AlertTriangle className="w-4.5 h-4.5 shrink-0" />
              <span>E-SOS</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              自動偵測事故傾角並觸發簡訊通報機制。
            </p>
          </div>
        </div>

        <div className="bg-slate-950/90 p-4 rounded-2xl border border-blue-500/40 shadow-md">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-base mb-1">
            <Bluetooth className="w-5 h-5 shrink-0" />
            <span>藍牙自動配對</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
            Pi 5 端運行 <span className="text-cyan-300 font-semibold">visor_bt_agent.py</span> 自動配對代理人，手機首次配對後自動信任，下次靠近秒連。支援 SPP 序列通道 (<span className="text-slate-400">bluetooth.service -C 相容模式</span>)。
          </p>
        </div>
      </div>

      <div className="flex-[2] bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-start space-y-4">
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-cyan-300 tracking-wide">後設數據分析 (Gemini AI)</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shadow-inner">
          結合 <span className="text-cyan-300 font-bold">Gemini 2.5 Flash</span>，將超速、急煞與傾角熱力圖轉化為人性化的戰術建議報告。
        </p>

        <div className="space-y-3 font-mono">
          <div className="flex items-center space-x-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-teal-300 shadow-sm">
            <Database className="w-5 h-5 shrink-0 text-teal-400" />
            <span className="text-xs sm:text-sm font-semibold">Supabase 騎乘紀錄永久化儲存</span>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-purple-300 shadow-sm">
            <FileCode className="w-5 h-5 shrink-0 text-purple-400" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold">APK v1.1.0 已打包</span>
              <span className="text-[11px] text-slate-400 font-normal mt-0.5">(Cordova + cordova-plugin-sms)</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-emerald-300 shadow-sm">
            <Terminal className="w-5 h-5 shrink-0 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold">即時系統日誌同步</span>
              <span className="text-[11px] text-slate-400 font-normal mt-0.5">(TerminalConsole)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 系統架構元件
const SystemArchitectureContent = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-4 overflow-y-auto rounded-2xl">
      <div className="flex-1 bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Pipeline 架構</h3>
        <div className="space-y-3 my-auto">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-700 text-cyan-300">Input<br /><span className="text-[9px] text-slate-400">1280x720 @ 30fps</span></div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-blue-500/40 text-blue-300">YOLOv26n<br /><span className="text-[9px] text-slate-400">2.6M params</span></div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/40 text-emerald-300">LSTR CULane<br /><span className="text-[9px] text-slate-400">765K params</span></div>
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

// 視覺處理管道元件 (標題與副標題固定靠上，卡片置中，已移除下方區塊敘述)
const VisionPipelineContent = () => {
  const pipelineSteps = [
    { title: 'FrameReader', subtitle: '獨立線程 RAW 擷取', detail: '1280x720 @ 30fps', color: 'border-cyan-500/50 text-cyan-400', icon: '📷' },
    { title: 'YOLOv26n', subtitle: '物件偵測核心', detail: '2.6M params / imgsz=256/320', color: 'border-blue-500/50 text-blue-400', icon: '🎯' },
    { title: 'LSTR CULane', subtitle: '車道線檢測', detail: '765K params / TorchScript + skip-2', color: 'border-emerald-500/50 text-emerald-400', icon: '🛣️' },
    { title: 'Spatial Fusion v2', subtitle: '空間融合模組', detail: 'EMA Speed / Per-class -3m dist', color: 'border-purple-500/50 text-purple-400', icon: '📍' },
    { title: '3-Tier Threat', subtitle: '三級威脅評估', detail: 'Critical / Warning / Caution', color: 'border-amber-500/50 text-amber-400', icon: '⚠️' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start p-8 overflow-y-auto rounded-2xl space-y-6">
      {/* 標題與完整副標題 (靠上固定) */}
      <div className="shrink-0">
        <h3 className="text-2xl sm:text-3xl font-black text-cyan-400 mb-3 flex items-center space-x-3">
          <span className="w-3.5 h-3.5 bg-cyan-400 rounded-full animate-ping" />
          <span>視覺處理管道 (VISION PIPELINE V2)</span>
        </h3>
        <p className="text-base sm:text-lg text-slate-300 font-mono font-medium leading-relaxed">
          端到端即時邊緣視覺運算推論架構，透過五大階段實現高精度物件偵測及威脅分級
        </p>
      </div>

      {/* 五大步驟卡片 (彈性置中) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-auto shrink-0">
        {pipelineSteps.map((step, idx) => (
          <div key={idx} className={`bg-slate-950/90 border ${step.color} rounded-2xl p-5 flex flex-col justify-between relative group hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
            <div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-xs font-mono text-slate-400 font-bold">STEP 0{idx + 1}</div>
              <h4 className="text-lg font-black text-white mt-1.5">{step.title}</h4>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">{step.subtitle}</div>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs font-mono text-cyan-300 font-bold">
              {step.detail}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// HUD 抬頭顯示細節元件
const HudDisplayDetailContent = () => {
  const points = [
    '設計核心在於「極簡化資訊負載」，容許使用者於行動端靈活調整投影內容。',
    '安裝於安全帽鏡片前，不像傳統導航必須分心查看。',
    '同時監視即時顯示時速、測速照相預警及導航轉向資訊等多種資訊。',
    '可依照駕駛使用習慣及當下環境自動或手動調整亮度。'
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto items-stretch rounded-2xl">
      <div className="flex-[2] w-full min-h-[250px] bg-slate-950/80 border border-teal-500/30 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
        <div className="w-12 h-12 border-2 border-teal-400/40 border-t-teal-400 rounded-full animate-spin mb-3 z-10" />
        <p className="text-teal-300 font-mono text-sm tracking-widest z-10 font-bold">
          待新增 HUD顯示畫面
        </p>
      </div>

      <div className="w-full lg:w-1/3 bg-slate-900/90 border border-teal-500/40 rounded-2xl p-6 flex flex-col justify-center shadow-[0_0_25px_rgba(20,184,166,0.15)]">
        <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center space-x-2 shrink-0">
          <span className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
          <span>HUD 抬頭顯示特性</span>
        </h3>

        <ul className="space-y-3 overflow-y-auto pr-1">
          {points.map((pt, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <span className="text-teal-400 font-bold mt-0.5 shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 測試影片區塊元件
const TestVideoDetailContent = ({ selectedTab, setSelectedTab, videoTabs }) => {
  const currentTab = videoTabs[selectedTab] || videoTabs['city'];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-y-auto items-stretch rounded-2xl">
      <div className="flex-[2] w-full min-h-[300px] bg-slate-950/90 border border-cyan-500/30 rounded-2xl relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
        <div className="relative z-20 flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80 backdrop-blur-md self-start max-w-full">
          {Object.keys(videoTabs).map((tabKey) => {
            const isActive = selectedTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTab(tabKey);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
              >
                {videoTabs[tabKey].title}
              </button>
            );
          })}
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {currentTab.src ? (
            <video
              key={currentTab.src}
              src={currentTab.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="text-center p-6 bg-slate-950/70 border border-slate-800 rounded-2xl backdrop-blur-sm">
              <div className="w-12 h-12 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-amber-400 font-mono text-base tracking-widest font-bold">
                影片區待放
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1">
                【{currentTab.title}】實測片段準備中
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[38%] bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-start shadow-[0_0_25px_rgba(245,158,11,0.12)] space-y-3">        <div>
        <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center space-x-2 shrink-0 font-mono">
          <span className="text-xl">🛡️</span>
          <span>距離估算 + TTC 威脅分級</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 mb-3">          基於 <span className="text-cyan-300 font-mono font-bold">per-class 真實寬度</span> 的單眼距離估算（pinhole model），搭配 <span className="text-amber-300 font-mono font-bold">-3m 偏移</span>（相機至車尾中心校正）。EMA 追蹤相對速度，TTC 閾值針對機車煞車距離收緊。
        </p>

        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3 shadow-inner">
          <div className="flex items-center space-x-2.5 text-red-400">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] shrink-0" />
            <div className="flex-1 flex flex-wrap justify-between items-center">
              <span className="font-bold">critical</span>
              <span className="text-slate-300 text-[11px]">: TTC &lt; 1.0s &amp; dist &lt; 2.0m</span>
            </div>
            <span className="text-[10px] text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-900">-- 僅 IN_LANE</span>
          </div>

          <div className="flex items-center space-x-2.5 text-orange-400">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] shrink-0" />
            <div className="flex-1 flex flex-wrap justify-between items-center">
              <span className="font-bold">warning</span>
              <span className="text-slate-300 text-[11px]">: TTC &lt; 1.5s &amp; dist &lt; 4.0m</span>
            </div>
            <span className="text-[10px] text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-900">-- 僅 IN_LANE</span>
          </div>

          <div className="flex items-center space-x-2.5 text-yellow-400">
            <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] shrink-0" />
            <div className="flex-1 flex flex-wrap justify-between items-center">
              <span className="font-bold">caution</span>
              <span className="text-slate-300 text-[11px]">: TTC &lt; 2.5s &amp; dist &lt; 8.0m</span>
            </div>
            <span className="text-[10px] text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-900">-- 全部車道</span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300 text-[11px]">
              <Filter className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
              <span><b className="font-semibold text-white">邊緣過濾:</b> x &lt; 10% or &gt; 90% 寬度 ➔ safe</span>
            </div>

            <div className="flex items-center space-x-2 text-purple-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 shrink-0 text-purple-400" />
              <span><b className="font-semibold text-white">新物件降級:</b> age &lt; 3 幀 ➔ 最高 caution</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. 展示項目與影片資料設定檔 (全四角折角: 0.75rem / 12px)
// ==========================================
const FOUR_CORNER_CHAMFER = 'polygon(0.75rem 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% calc(100% - 0.75rem), calc(100% - 0.75rem) 100%, 0.75rem 100%, 0 calc(100% - 0.75rem), 0 0.75rem)';

const VISOR_ITEMS = [
  {
    id: 'hud-display',
    title: '測試影片',
    subtitle: '即時視覺分析與威脅偵測',
    icon: Eye,
    color: 'from-amber-500 to-orange-600',
    placeholderText: '預留區域：HUD 視角模擬動畫 / 3D 渲染展示',
    gridClass: 'col-span-2 row-span-2',
    clipPath: FOUR_CORNER_CHAMFER,
    hasVideoSelector: true
  },
  {
    id: 'ai-detection',
    title: '視覺處理管道 (Vision Pipeline v2)',
    subtitle: 'End-to-End Edge Vision Inference',
    icon: ShieldAlert,
    color: 'from-blue-600 to-indigo-600',
    description: '端到端即時邊緣視覺運算推論架構，透過五大階段實現高精度物件偵測及威脅分級',
    placeholderText: '預留區域：AI 物件辨識即時 Bounding Box 動畫',
    gridClass: 'col-span-2 row-span-1',
    clipPath: FOUR_CORNER_CHAMFER,
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
    customContent: <VisionPipelineContent />
  },
  {
    id: 'route-nav',
    title: '系統架構與核心哲學',
    subtitle: 'Pipeline & Core Design Principles',
    icon: Navigation,
    color: 'from-indigo-500 to-purple-600',
    description: '基於 ARM 架構的最佳化邊緣運算模型與多重時序穩定機制。',
    placeholderText: '預留區域：系統架構',
    gridClass: 'col-span-1 row-span-1',
    clipPath: FOUR_CORNER_CHAMFER,
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-between px-2 py-1.5 bg-slate-950/80 border border-cyan-500/40 rounded-xl text-[9px] font-mono text-cyan-300">
        <span>Input</span> ➔ <span>YOLOv26</span> ➔ <span>HUD</span>
      </div>
    ),
    customContent: <SystemArchitectureContent />
  },
  {
    id: 'edge-computing',
    title: '效能優化黑科技',
    subtitle: 'Performance Optimization & Benchmarks',
    icon: Zap,
    color: 'from-emerald-500 to-teal-600',
    description: '結合 Skip-2 跳幀、TorchScript 編譯與 imgsz=256 降解析技術，大幅釋放邊緣運算潛能。',
    placeholderText: '預留區域：效能優化黑科技',
    gridClass: 'col-span-1 row-span-1',
    clipPath: FOUR_CORNER_CHAMFER,
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-around px-2 py-1 bg-slate-950/80 border border-emerald-500/40 rounded-xl text-[9px] font-mono text-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Skip-2 + TorchScript</span>
      </div>
    ),
    customContent: <LstrAndThreatContent />
  },
  {
    id: 'telemetry',
    title: '抬頭顯示器（HUD）',
    subtitle: 'Head-Up Display System',
    icon: Activity,
    color: 'from-teal-500 to-cyan-600',
    placeholderText: '待新增 HUD顯示畫面',
    gridClass: 'col-span-2 row-span-1',
    clipPath: FOUR_CORNER_CHAMFER,
    customContent: <HudDisplayDetailContent />
  },
  {
    id: 'v2x-connect',
    title: '戰術中控系統 (CONSOLE APP)',
    subtitle: '全功能中控與後設數據分析',
    icon: Smartphone,
    color: 'from-purple-600 to-indigo-600',
    description: '整合測速預警、路測模擬、邊緣燈光、E-SOS、藍牙自動配對與 Gemini AI 後設數據分析。',
    placeholderText: '預留區域：戰術中控系統',
    gridClass: 'col-span-2 row-span-1',
    clipPath: FOUR_CORNER_CHAMFER,
    previewContent: (
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-between px-2 py-1.5 bg-slate-950/80 border border-purple-500/40 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]">
        <div className="flex items-center space-x-1 text-[9px] font-mono text-purple-300">
          <Smartphone className="w-3 h-3 text-purple-400" />
          <span>Console App</span>
        </div>
        <div className="w-2 h-[2px] bg-purple-400 animate-pulse" />
        <div className="text-[9px] font-mono text-cyan-300">Gemini AI</div>
        <div className="w-2 h-[2px] bg-cyan-400 animate-pulse" />
        <div className="text-[9px] font-mono text-emerald-300">Supabase</div>
      </div>
    ),
    customContent: <ConsoleAppContent />
  },
];

const VIDEO_TABS = {
  city: {
    title: '市區重車流',
    subtitle: '2,676 detections - 106 threats - 32.5 FPS',
    src: '/yolov26-demo.mp4'
  },
  suburb: {
    title: '郊區輕車流',
    subtitle: '1,682 detections - 22 threats - 38.3 FPS',
    src: '/yolov26-demo2.mp4'
  },
  night: {
    title: '黑夜',
    subtitle: 'Night Vision - Low Light Detection',
    src: ''
  },
  rainy: {
    title: '雨天',
    subtitle: 'Rainy Condition - Adverse Weather',
    src: ''
  }
};

// ==========================================
// 3. 主應用程式元件
// ==========================================
export default function VisorExhibitionApp() {
  const [activeId, setActiveId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedVideoTab, setSelectedVideoTab] = useState('city');

  const idleTimerRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (activeId === 'hud-display') {
      setSelectedVideoTab('city');
    }
  }, [activeId]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    let timer;
    if (activeId !== null) {
      setCountdown(8);
      let currentSec = 8;

      timer = setInterval(() => {
        currentSec -= 1;
        setCountdown(currentSec);

        if (activeId === 'hud-display' && currentSec === 5) {
          setSelectedVideoTab('suburb');
        }

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
  const currentVideoInfo = VIDEO_TABS[selectedVideoTab];

  return (
    <div className="relative w-screen h-screen bg-slate-950 text-white overflow-hidden font-sans select-none flex flex-col z-0">
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

      {/* 主展示網格區域 */}
      <main className="flex-1 min-h-0 p-6 grid grid-cols-4 grid-rows-3 gap-4 relative z-10">
        {VISOR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSelected = activeId === item.id;

          const videoSrc = item.hasVideoSelector ? currentVideoInfo.src : item.videoSrc;
          const cardTitle = item.hasVideoSelector ? item.title : item.title;
          const cardSubtitle = item.hasVideoSelector ? currentVideoInfo.subtitle : item.subtitle;

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
                {videoSrc ? (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <video
                      key={videoSrc}
                      src={videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-30 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                  </div>
                ) : item.previewContent ? (
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
                      {cardTitle}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1 line-clamp-2 drop-shadow-md">{cardSubtitle}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>

      {/* 暗化背景遮罩 */}
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 ease-out ${activeId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* 點擊展開後的 Modal 放大彈窗 */}
      <AnimatePresence>
        {activeId && activeItem && (
          <motion.div
            key={`modal-wrapper-${activeId}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            <motion.div
              layoutId={`card-${activeId}`}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="w-[85vw] h-[85vh] bg-cyan-500/60 p-[1.5px] pointer-events-auto rounded-3xl"
            >
              <div
                className="w-full h-full bg-slate-900 relative flex flex-col justify-between overflow-hidden p-8 rounded-[23px]"
              >
                {/* Modal 頂部抬頭 */}
                <div className="flex justify-between items-center border-b border-slate-700/50 pb-4 shrink-0 relative z-20">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeItem.color} text-white`}>
                      <activeItem.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-wide">
                        {activeItem.title}
                      </h2>
                      <p className="text-sm font-mono text-cyan-400">
                        {activeItem.hasVideoSelector ? currentVideoInfo.subtitle : activeItem.subtitle}
                      </p>
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

                {/* Modal 主體動態載入區 */}
                <div className="mt-6 flex-1 min-h-0 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center relative overflow-hidden">
                  {activeItem.hasVideoSelector ? (
                    <TestVideoDetailContent
                      selectedTab={selectedVideoTab}
                      setSelectedTab={setSelectedVideoTab}
                      videoTabs={VIDEO_TABS}
                    />
                  ) : activeItem.customContent ? (
                    <div className="w-full h-full relative z-10 flex items-center justify-center rounded-2xl overflow-hidden">
                      {activeItem.customContent}
                    </div>
                  ) : activeItem.videoSrc ? (
                    <video
                      key={activeItem.videoSrc}
                      src={activeItem.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
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

                {activeItem.description && (
                  <div className="mt-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800/50 shrink-0 relative z-20 backdrop-blur-md flex items-center">
                    <p className="text-slate-300 text-base leading-relaxed tracking-wide flex-1">
                      {activeItem.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}