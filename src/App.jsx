import React, { useState, useEffect, useRef } from 'react';

import { 

  Camera, 

  Scan, 

  MessageSquare, 

  User, 

  TrendingUp, 

  CheckCircle2, 

  XCircle, 

  ChevronRight, 

  Zap, 

  Info,

  Package,

  Star, 

  RefreshCw,

  Gift,

  Map,

  Trophy,

  Flame,

  Languages,

  PlusCircle,

  ShoppingCart,

  ShieldAlert,

  GraduationCap,

  Send,

  Volume2,

  ArrowUpCircle,

  HelpCircle,

  ChevronLeft,

  Truck,

  Store,

  Smartphone,

  Quote,

  ThumbsUp,

  HeartPulse,

  Sparkles,

  ShowerHead,

  Coffee,

  Target

} from 'lucide-react';



// --- Configuration & Mock Data ---

const apiKey = ""; // Provided at runtime

const appId = typeof __app_id !== 'undefined' ? __app_id : 'asw-goal-nin-jiom';



// --- Mascot Component (屈仔) ---

const WatsonsMascot = ({ className = "w-6 h-6", color = "#0099a1" }) => (

  <svg viewBox="0 0 240 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">

    {/* Legs */}

    <path d="M90 270 C 90 300, 70 300, 70 300" stroke={color} strokeWidth="12" strokeLinecap="round"/>

    <path d="M150 270 C 150 300, 170 300, 170 300" stroke={color} strokeWidth="12" strokeLinecap="round"/>

    {/* Body */}

    <rect x="40" y="50" width="160" height="220" rx="10" fill={color} />

    {/* Handle */}

    <path d="M80 50 C 80 10, 160 10, 160 50" stroke="#333" strokeWidth="10" strokeLinecap="round" fill="none"/>

    {/* Eyes */}

    <circle cx="95" cy="110" r="10" fill="#333" />

    <circle cx="145" cy="110" r="10" fill="#333" />

    {/* Cheeks */}

    <circle cx="75" cy="125" r="8" fill="#7ed9dd" opacity="0.6" />

    <circle cx="165" cy="125" r="8" fill="#7ed9dd" opacity="0.6" />

    {/* Mouth */}

    <circle cx="120" cy="130" r="8" fill="#333" />

    <circle cx="123" cy="128" r="3" fill="white" />

    {/* Arms */}

    <path d="M40 180 L 10 230" stroke={color} strokeWidth="12" strokeLinecap="round"/>

    <path d="M200 180 L 230 230 L 200 230" stroke={color} strokeWidth="12" strokeLinecap="round" fill="none"/>

    {/* W Logo */}

    <path d="M140 210 L 150 250 L 165 220 L 180 250 L 190 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

  </svg>

);



const TRANSLATIONS = {

  "Traditional Chinese": {

    appTitle: "AI - 領言",

    closedDeal: "今日已完成交易",

    dailyTarget: "每天任務目標",

    scanPrice: "掃描價錢牌",

    memberId: "會員辨識",

    dwellZones: "高停留人流區",

    approach: "立即出擊",

    oosRescue: "O+O 缺貨救援模式",

    rating: "評分",

    salesPitchTitle: "AI 話術區",

    appHook: "App 下載享有優惠",

    storePrice: "店內價",

    appPriceLabel: "App 專享價",

    saveOnApp: "立即下載屈臣氏手機 App 省下",

    bundleTitle: "優惠組合",

    added: "已加入",

    addToPitch: "加入對話",

    outOfStock: "店內缺貨 (可線上訂購)",

    inStock: "架上現貨",

    objectionBuster: "意見記錄 (如有)",

    objectionPlaceholder: "例如: 價錢太貴了...",

    closeDeal: "即時下單",

    pass: "放棄",

    memberConnect: "會員辨識",

    aiLab: "AI 模擬演練室",

    aiLabStatus: "O+O 銷售演練模組即將上線",

    rescueHint: "架上缺貨。請改用快遞送貨話術。",

    toneCaring: "溫馨",

    toneEnergetic: "熱情",

    toneQuick: "簡短",

    simInStock: "掃描 枇杷膏 (現貨)",

    simRescue: "掃描 幸福感冒素 (缺貨)",

    verifiedReview: "精選評價",

    youMayAlsoLike: "你可能也喜歡",

    exploreCats: "瀏覽屈臣氏類別",

    catHealth: "健康",

    catSkin: "美肌護膚",

    catPersonal: "個人護理",

    catHousehold: "家庭用品",

    pitchPart1: "產品優勢及推廣",

    pitchPart2: "網上評分",

    pitchPart3: "網上真實用家反饋及口碑"

  },

  "English": {

    appTitle: "AI - The Strategic Voice",

    closedDeal: "Closed deal",

    dailyTarget: "Daily Target",

    scanPrice: "Scan Price",

    memberId: "Member ID",

    dwellZones: "High Dwell Zones",

    approach: "APPROACH",

    oosRescue: "O+O Delivery Rescue",

    rating: "Rating",

    salesPitchTitle: "AI Sales Pitch",

    appHook: "App Adoption Hook",

    storePrice: "Store Price",

    appPriceLabel: "App Price",

    saveOnApp: "Save by downloading App",

    bundleTitle: "Special Bundle",

    added: "ACTIVE",

    addToPitch: "ADD TO PITCH",

    outOfStock: "Out of stock on shelf",

    inStock: "In Stock",

    objectionBuster: "Feedback (If any)",

    objectionPlaceholder: "e.g. Too expensive...",

    closeDeal: "CLOSE DEAL",

    pass: "PASS",

    memberConnect: "Member Look-up",

    aiLab: "AI Training Lab",

    aiLabStatus: "Roleplay Simulation coming soon",

    rescueHint: "Out of stock. Pivot to Express Delivery pitch.",

    toneCaring: "Caring",

    toneEnergetic: "Energetic",

    toneQuick: "Quick",

    simInStock: "Scan Pei Pa Koa (Stock)",

    simRescue: "Scan Fortune (Rescue)",

    verifiedReview: "Top Review",

    youMayAlsoLike: "You May Also Like",

    exploreCats: "Watsons Categories",

    catHealth: "Health",

    catSkin: "Skin Care",

    catPersonal: "Personal Care",

    catHousehold: "Household & Beverage",

    pitchPart1: "Benefits & Promos",

    pitchPart2: "Online Rating",

    pitchPart3: "Sentiment & Feedback"

  }

};



const MOCK_DATA = {

  products: {

    "NIN001": {

      id: "NIN001",

      name: "京都念慈菴 蜜煉川貝枇杷膏 300毫升",

      enName: "NIN JIOM Pei Pa Koa 300ml",

      category: "Health",

      price: 58.0,

      promoPrice: 52.0,

      appPrice: 46.8, 

      mechanics: "買 2 件即享 9 折 (平均 $46.8)",

      planogram: "第 3 巷 - 家庭醫藥",

      stock: 55,

      reviews: { rating: 4.9, keywords: ["喉嚨救星", "成分天然"], topComment: "每次喉嚨痛必買，效果真係好快！", enTopComment: "Always my first choice for a sore throat!" },

      tags: ["家中常備"],

      bundleWith: "FORT001"

    },

    "FORT001": {

      id: "FORT001",

      name: "特強幸福傷風咳素 36片裝",

      enName: "FORTUNE COLTALIN-GP EXTRA 36S",

      category: "Health",

      price: 98.0,

      appPrice: 85.0,

      mechanics: "App 會員首購立減 $20",

      planogram: "第 3 巷 - 家庭醫藥",

      stock: 0, 

      reviews: { rating: 4.8, keywords: ["見效快", "不瞌睡"], topComment: "感冒發燒食佢好快退。", enTopComment: "Relieves flu symptoms fast without drowsiness." },

      tags: ["強效配方"],

      bundleWith: "NIN001"

    },

    "PAN001": {

      id: "PAN001",

      name: "必理痛 傷風感冒熱飲 10包裝",

      enName: "Panadol Cold & Flu Hot Drink 10s",

      category: "Health",

      price: 75.0,

      appPrice: 65.0,

      mechanics: "限時 88 折",

      planogram: "第 3 巷 - 家庭醫藥",

      stock: 30,

      reviews: { rating: 4.7, keywords: ["暖胃舒緩"], topComment: "熱飲好舒服，適合冬天感冒。", enTopComment: "Very soothing hot drink for winter flu." },

      tags: ["冬季熱賣"]

    },

    "SKIN001": {

      id: "SKIN001",

      name: "理膚泉 全效修護萬用膏 40毫升",

      enName: "La Roche-Posay Cicaplast Baume B5 40ml",

      category: "Skin Care",

      price: 110.0,

      promoPrice: 95.0,

      appPrice: 82.0,

      mechanics: "兩件 85 折",

      planogram: "第 1 巷 - 美肌護理",

      stock: 15,

      reviews: { rating: 4.8, keywords: ["抗敏必備", "B5修復"], topComment: "修復紅腫好有用。", enTopComment: "Amazing for skin repair and redness." },

      tags: ["醫學護膚"]

    },

    "SKIN002": {

      id: "SKIN002",

      name: "屈臣氏 燕窩絲炫透潤面膜",

      enName: "Watsons Bird's Nest Mask",

      category: "Skin Care",

      price: 88.0,

      appPrice: 75.0,

      mechanics: "買一送一",

      planogram: "第 1 巷 - 美肌護理",

      stock: 120,

      reviews: { rating: 4.6, keywords: ["深層滋潤", "亮白"], topComment: "敷完好水潤。", enTopComment: "Skin feels very hydrated." },

      tags: ["屈臣氏獨家"]

    },

    "PC001": {

      id: "PC001",

      name: "屈臣氏 蜜桃洗手液 500毫升",

      enName: "Watsons Hand Soap Peach 500ml",

      category: "Personal Care",

      price: 18.0,

      promoPrice: 15.0,

      appPrice: 12.0,

      mechanics: "加 $1 多一件",

      planogram: "第 5 巷 - 個人衛生",

      stock: 200,

      reviews: { rating: 4.6, keywords: ["味道清新", "性質溫和"], topComment: "性價比好高。", enTopComment: "Great value for money." },

      tags: ["可換領補充裝"]

    },

    "PC002": {

      id: "PC002",

      name: "屈臣氏 潤膚沐浴乳補充裝 800ml",

      enName: "Watsons Body Wash Refill 800ml",

      category: "Personal Care",

      price: 32.0,

      appPrice: 28.0,

      mechanics: "買二件再減 $10",

      planogram: "第 5 巷 - 個人衛生",

      stock: 150,

      reviews: { rating: 4.5, keywords: ["環保", "高容量"], topComment: "補充裝好環保。", enTopComment: "Eco-friendly and large capacity." },

      tags: ["可持續選擇"]

    },

    "HB001": {

      id: "HB001",

      name: "滴露 殺菌消毒噴霧 450毫升",

      enName: "Dettol Disinfectant Spray 450ml",

      category: "Household & Beverage",

      price: 55.0,

      promoPrice: 48.0,

      appPrice: 39.0,

      mechanics: "閃購價：$39",

      planogram: "第 8 巷 - 家庭用品",

      stock: 45,

      reviews: { rating: 4.9, keywords: ["家居防護", "信心之選"], topComment: "噴霧設計好方便。", enTopComment: "The spray design is very convenient." },

      tags: ["限時閃購"]

    },

    "HB002": {

      id: "HB002",

      name: "屈臣氏 蒸餾水 8公升",

      enName: "Watsons Distilled Water 8L",

      category: "Household & Beverage",

      price: 25.0,

      appPrice: 22.0,

      mechanics: "滿 $100 免費送貨",

      planogram: "第 10 巷 - 飲料專區",

      stock: 80,

      reviews: { rating: 4.9, keywords: ["純淨", "大容量"], topComment: "送貨好方便。", enTopComment: "Home delivery is very convenient." },

      tags: ["家居必備"]

    }

  },

  members: {

    "M12345": {

      name: "陳太太", enName: "Mrs. Chan", tier: "金級會員", points: 4500

    }

  },

  storeZones: [

    { name: "第 3 巷 (傷風感冒)", enName: "Aisle 3 (Cold & Flu)", color: "bg-orange-500" },

    { name: "第 1 巷 (美肌護膚)", enName: "Aisle 1 (Skin Care)", color: "bg-rose-500" }

  ]

};



// --- Sub-Components ---



const HomeView = ({ t, lang, setView, startScanner, toggleLang, handleCategoryClick }) => (

  <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-10">

    <div className="p-6 bg-slate-900 text-white rounded-b-[40px] shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">

          <WatsonsMascot className="w-8 h-8" /> {t.appTitle}

        </h1>

        <div className="flex gap-2">

          <button onClick={toggleLang} className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black border border-white/20">

            {lang === "English" ? "中文" : "ENG"}

          </button>

          <button onClick={() => setView('training')} className="bg-white/10 p-2 rounded-full text-white/60"><GraduationCap size={18} /></button>

        </div>

      </div>

      

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white/5 rounded-3xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">

          <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center mb-2">

            <CheckCircle2 size={16} className="text-teal-400" />

          </div>

          <p className="text-[10px] uppercase opacity-60 font-black mb-1 leading-tight tracking-tighter">

            {t.closedDeal}

          </p>

          <p className="text-2xl font-black text-white">4</p>

        </div>

        

        <div className="bg-white/5 rounded-3xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">

          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">

            <Target size={16} className="text-blue-400" />

          </div>

          <p className="text-[10px] uppercase opacity-60 font-black mb-1 leading-tight tracking-tighter">

            {t.dailyTarget}

          </p>

          <p className="text-2xl font-black text-white">10</p>

        </div>

      </div>

      

      <div className="mt-4 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">

        <div className="bg-teal-400 h-full w-[40%] rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>

      </div>

    </div>



    <div className="p-5 space-y-6">

      <div className="grid grid-cols-2 gap-4">

        <button onClick={startScanner} className="flex flex-col items-center justify-center bg-teal-600 text-white p-6 rounded-[32px] shadow-lg active:scale-95 transition-transform">

          <Scan size={32} />

          <span className="font-black mt-2 text-xs uppercase tracking-widest">{t.scanPrice}</span>

        </button>

        <button onClick={() => setView('member')} className="flex flex-col items-center justify-center bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm active:scale-95 transition-transform">

          <User size={32} className="text-slate-400" />

          <span className="font-black mt-2 text-xs text-slate-700 uppercase tracking-widest">{t.memberId}</span>

        </button>

      </div>



      <div className="space-y-3">

        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">

          <Package size={12} className="text-teal-600" /> {t.exploreCats}

        </h3>

        <div className="grid grid-cols-2 gap-3">

           {[

             { key: "Health", icon: HeartPulse, color: "bg-orange-100 text-orange-600", label: t.catHealth },

             { key: "Skin Care", icon: Sparkles, color: "bg-rose-100 text-rose-600", label: t.catSkin },

             { key: "Personal Care", icon: ShowerHead, color: "bg-teal-100 text-teal-600", label: t.catPersonal },

             { key: "Household & Beverage", icon: Coffee, color: "bg-blue-100 text-blue-600", label: t.catHousehold }

           ].map(cat => (

             <button key={cat.key} onClick={() => handleCategoryClick(cat.key)} className="bg-white p-4 rounded-[24px] border border-slate-100 flex items-center gap-3 shadow-sm active:scale-95 transition-all">

               <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center`}><cat.icon size={20} /></div>

               <span className="text-xs font-black text-slate-700 leading-tight">{cat.label}</span>

             </button>

           ))}

        </div>

      </div>



      <div className="space-y-3">

        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">

          <Flame size={12} className="text-orange-500" /> {t.dwellZones}

        </h3>

        {MOCK_DATA.storeZones.map((zone, idx) => (

          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className={`w-2 h-2 rounded-full ${zone.color} animate-pulse`}></div>

              <p className="font-bold text-slate-800 text-sm">{lang === "English" ? zone.enName : zone.name}</p>

            </div>

            <button onClick={startScanner} className="text-[10px] font-black text-teal-600 underline uppercase">{t.approach}</button>

          </div>

        ))}

      </div>

    </div>

  </div>

);



const ResultView = ({ 

  t, lang, scannedProduct, memberData, salesPitch, isGenerating, setView, 

  pitchTone, setPitchTone, generateSalesPitch, 

  handleSuccess, objection, setObjection, handleObjection, objectionResponse,

  showBundle, setShowBundle, simulateScan

}) => {

  const isOOS = scannedProduct?.stock === 0;

  const currentPrice = scannedProduct?.promoPrice || scannedProduct?.price || 0;

  const appPrice = scannedProduct?.appPrice || 0;

  const savings = (currentPrice - appPrice).toFixed(1);

  const bundleItem = scannedProduct?.bundleWith ? MOCK_DATA.products[scannedProduct.bundleWith] : null;

  

  // Logic for "You May Also Like" - Finds other items in the same category

  const recommendations = Object.values(MOCK_DATA.products).filter(p => p.category === scannedProduct?.category && p.id !== scannedProduct?.id);



  return (

    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">

      <div className="p-4 flex items-center justify-between bg-white border-b sticky top-0 z-20">

        <button onClick={() => setView('home')} className="p-2 bg-slate-100 rounded-full"><XCircle size={20} /></button>

        <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-tighter">

          {lang === "English" ? "English Mode" : "中文模式"}

        </div>

      </div>



      <div className="p-5 space-y-4">

        {/* Context Strip */}

        <div className="flex flex-col gap-2">

          <div className="flex gap-2">

            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">

              <div className="flex text-yellow-400 gap-0.5"><Star size={12} className="fill-yellow-400" /><Star size={12} className="fill-yellow-400" /><Star size={12} className="fill-yellow-400" /><Star size={12} className="fill-yellow-400" /><Star size={12} className="fill-yellow-400" /></div>

              <span className="text-[10px] font-black">{scannedProduct?.reviews?.rating} {t.rating}</span>

            </div>

            {isOOS && (

              <div className="flex-[1.5] bg-orange-500 px-3 py-2 rounded-2xl text-white flex items-center gap-2">

                <Store size={16} />

                <span className="text-[10px] font-black uppercase tracking-tight">{t.oosRescue}</span>

              </div>

            )}

          </div>

          

          <div className="bg-white p-3 rounded-2xl shadow-sm border-l-4 border-yellow-400 flex items-start gap-3">

             <Quote size={16} className="text-yellow-400 shrink-0 mt-1" />

             <div className="flex-1">

                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.verifiedReview}</p>

                <p className="text-xs font-bold text-slate-700 italic leading-tight">

                  "{lang === "English" ? scannedProduct?.reviews?.enTopComment : scannedProduct?.reviews?.topComment}"

                </p>

             </div>

          </div>

        </div>



        {/* AI Sales Pitch Section */}

        <div className="bg-white p-6 rounded-[32px] shadow-xl border-t-4 border-teal-500 relative">

          <div className="flex justify-between items-center mb-4">

            <div className="flex gap-1 bg-slate-100 p-1 rounded-full">

              {['Caring', 'Energetic', 'Quick'].map(toneKey => (

                <button 

                  key={toneKey}

                  onClick={() => setPitchTone(toneKey)}

                  className={`px-3 py-1 rounded-full text-[8px] font-black uppercase transition-all ${pitchTone === toneKey ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400'}`}

                >

                  {t[`tone${toneKey}`]}

                </button>

              ))}

            </div>

            <button onClick={() => generateSalesPitch(scannedProduct, memberData, pitchTone, lang, showBundle)} className="p-2 bg-slate-50 rounded-full text-slate-300 hover:text-teal-600"><RefreshCw size={14} /></button>

          </div>

          

          {isGenerating ? (

            <div className="space-y-4 py-2">

              <div className="flex gap-3"><div className="w-2 h-2 bg-slate-100 rounded-full mt-2"></div><div className="h-4 bg-slate-50 animate-pulse rounded w-full"></div></div>

              <div className="flex gap-3"><div className="w-2 h-2 bg-slate-100 rounded-full mt-2"></div><div className="h-4 bg-slate-50 animate-pulse rounded w-5/6"></div></div>

              <div className="flex gap-3"><div className="w-2 h-2 bg-slate-100 rounded-full mt-2"></div><div className="h-4 bg-slate-50 animate-pulse rounded w-4/6"></div></div>

            </div>

          ) : (

            <div className={`text-slate-700 leading-snug space-y-4 ${lang === "English" ? "text-lg" : "text-xl tracking-tight"}`}>

              {salesPitch.split('\n').filter(line => line.trim().length > 0).map((line, i) => {

                const cleanLine = line.replace(/^-/, '').trim();

                const boldMatch = cleanLine.match(/^\*\*(.*?)\*\*:(.*)/);

                

                return (

                  <div key={i} className="flex gap-3 items-start group">

                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.3)]"></div>

                    {boldMatch ? (

                      <span className="font-normal">

                        <strong className="font-black text-slate-900 border-b-2 border-teal-100">{boldMatch[1]}</strong>: {boldMatch[2]}

                      </span>

                    ) : (

                      <span className="font-bold">{cleanLine}</span>

                    )}

                  </div>

                );

              })}

            </div>

          )}

        </div>



        {/* You May Also Like Section - Dynamic Categories */}

        {recommendations.length > 0 && (

          <div className="space-y-3">

             <div className="flex items-center gap-2 px-1">

                <ThumbsUp size={14} className="text-teal-600" />

                <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{t.youMayAlsoLike}</h4>

             </div>

             <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">

                {recommendations.map(prod => (

                  <button 

                    key={prod.id}

                    onClick={() => simulateScan(prod.id)}

                    className="min-w-[150px] bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center active:scale-95 transition-transform"

                  >

                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-2">

                      <Package size={28} className="text-slate-200" />

                    </div>

                    <p className="text-[10px] font-black text-slate-800 leading-tight line-clamp-2 h-8 mb-1 uppercase tracking-tighter">

                      {lang === "English" ? prod.enName : prod.name}

                    </p>

                    <p className="text-xs font-black text-teal-600">${prod.price}</p>

                    <div className="mt-2 text-[8px] font-black text-teal-600 border border-teal-100 px-2 py-0.5 rounded-full uppercase">

                      Select Item

                    </div>

                  </button>

                ))}

             </div>

          </div>

        )}



        {/* App Adoption Hook */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-[32px] text-white shadow-lg relative overflow-hidden">

           <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Smartphone size={80} /></div>

           <p className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-1 opacity-80"><Zap size={10} className="fill-yellow-400 text-yellow-400" /> {t.appHook}</p>

           <div className="flex items-end justify-between gap-4">

              <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/10 text-center">

                <p className="text-[10px] opacity-60 font-bold mb-1">{t.storePrice}</p>

                <p className="text-xl font-black opacity-50 line-through">${currentPrice}</p>

              </div>

              <div className="flex-[1.5] bg-white p-4 rounded-3xl text-blue-900 shadow-xl text-center">

                <p className="text-[10px] font-black uppercase mb-1">{t.appPriceLabel}</p>

                <div className="flex items-baseline justify-center gap-1">

                  <span className="text-3xl font-black tracking-tighter">${appPrice}</span>

                </div>

              </div>

           </div>

           <div className="mt-4 bg-yellow-400 text-blue-900 py-2 rounded-2xl text-center font-black text-[10px] uppercase tracking-widest shadow-inner">

             {t.saveOnApp} HKD ${savings}

           </div>

        </div>



        {/* Power Up Bundle Section */}

        {bundleItem && (

          <div className={`p-5 rounded-[32px] transition-all transform border-2 ${showBundle ? 'bg-orange-50 border-orange-200 scale-105 shadow-md' : 'bg-white border-slate-100 opacity-80 shadow-sm'}`}>

            <div className="flex justify-between items-center mb-4">

              <div className="flex items-center gap-2">

                <PlusCircle size={16} className={showBundle ? 'text-orange-600' : 'text-slate-400'} />

                <span className={`font-black text-[10px] uppercase tracking-widest ${showBundle ? 'text-orange-600' : 'text-slate-400'}`}>{t.bundleTitle}</span>

              </div>

              <button 

                onClick={() => {

                  const newState = !showBundle;

                  setShowBundle(newState);

                  generateSalesPitch(scannedProduct, memberData, pitchTone, lang, newState);

                }}

                className={`text-[10px] font-black px-4 py-1.5 rounded-full transition-all ${showBundle ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'}`}

              >

                {showBundle ? t.added : t.addToPitch}

              </button>

            </div>

            <div className="flex gap-4 items-center">

              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-300"><Package size={24} /></div>

              <div className="flex-1">

                <h5 className="font-bold text-sm text-slate-800 leading-tight">{lang === "English" ? bundleItem.enName : bundleItem.name}</h5>

                <p className={`text-[10px] mt-1 font-bold ${bundleItem.stock === 0 ? 'text-orange-600' : 'text-slate-500'}`}>

                  {bundleItem.stock === 0 ? t.outOfStock : t.inStock}

                </p>

              </div>

            </div>

          </div>

        )}



        {/* Objection Buster */}

        <div className="bg-white p-5 rounded-[32px] border border-slate-200 shadow-sm space-y-3">

          <div className="flex items-center gap-2 mb-1">

            <ShieldAlert size={14} className="text-rose-500" />

            <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{t.objectionBuster}</h4>

          </div>

          <div className="flex gap-2">

            <input 

              value={objection}

              onChange={(e) => setObjection(e.target.value)}

              placeholder={t.objectionPlaceholder}

              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 placeholder:text-slate-300"

            />

            <button onClick={handleObjection} className="bg-slate-900 text-white p-2.5 rounded-xl active:scale-95 transition-transform"><Send size={16} /></button>

          </div>

          {objectionResponse && (

            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-sm font-medium text-teal-800 animate-in fade-in slide-in-from-bottom-2">

              <strong className="block mb-1">{lang === "English" ? "AI Response:" : "AI 回應:"}</strong> {objectionResponse}

            </div>

          )}

        </div>



        {/* Action Buttons */}

        <div className="flex gap-3 pt-6 pb-12 max-w-sm mx-auto w-full px-2">

           <button onClick={handleSuccess} className="flex-[2] bg-teal-600 text-white p-5 rounded-[28px] font-black shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">

            <WatsonsMascot className="w-5 h-5 grayscale brightness-[100]" /> {t.closeDeal}

           </button>

           <button onClick={() => setView('home')} className="flex-1 bg-white text-slate-400 p-5 rounded-[28px] font-black border border-slate-200 shadow-xl uppercase tracking-widest text-xs">{t.pass}</button>

        </div>

      </div>

    </div>

  );

};



const ScannerView = ({ t, videoRef, setView, stopScanner, simulateScan }) => (

  <div className="relative h-full bg-black">

    <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover opacity-60" />

    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

      <div className="w-64 h-64 border-2 border-teal-400 rounded-[40px] relative">

        <div className="absolute top-1/2 w-full h-0.5 bg-teal-400/50 animate-scan-line shadow-[0_0_15px_rgba(45,212,191,0.8)]"></div>

      </div>

      <div className="bg-black/60 p-6 rounded-3xl mt-10 w-4/5 text-center border border-white/10 backdrop-blur-md">

         <p className="text-white text-xs font-black uppercase opacity-60 mb-2 tracking-widest">O+O HHT SCANNER</p>

         <p className="text-white text-sm font-bold">Scanning...</p>

      </div>

    </div>

    <button onClick={() => { stopScanner(); setView('home'); }} className="absolute top-10 right-4 p-3 bg-white/10 rounded-full text-white backdrop-blur-md border border-white/20"><XCircle size={24} /></button>

    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 px-6">

       <button onClick={() => simulateScan("NIN001")} className="bg-teal-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">{t.simInStock}</button>

       <button onClick={() => simulateScan("FORT001")} className="bg-orange-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">{t.simRescue}</button>

    </div>

  </div>

);



// --- Main App Component ---



const App = () => {

  const [view, setView] = useState('home'); 

  const [lang, setLang] = useState("Traditional Chinese");

  const [scannedProduct, setScannedProduct] = useState(null);

  const [memberData, setMemberData] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const [salesPitch, setSalesPitch] = useState("");

  const [pitchTone, setPitchTone] = useState("Caring"); 

  const [successCount, setSuccessCount] = useState(4);

  const [objection, setObjection] = useState("");

  const [objectionResponse, setObjectionResponse] = useState("");

  const [showBundle, setShowBundle] = useState(false);

  const videoRef = useRef(null);



  const t = TRANSLATIONS[lang];



  const callGemini = async (prompt, systemInstruction) => {

    let retries = 0;

    while (retries < 5) {

      try {

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({

            contents: [{ parts: [{ text: prompt }] }],

            systemInstruction: { parts: [{ text: systemInstruction }] }

          })

        });

        if (!response.ok) throw new Error();

        const data = await response.json();

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return typeof text === 'string' ? text : "";

      } catch (e) {

        retries++;

        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, retries)));

      }

    }

  };



  const generateSalesPitch = async (product, member, tone, currentLang, includeBundle) => {

    if (!product) return;

    setIsGenerating(true);

    const isOOS = product.stock === 0;

    

    const rating = product.reviews?.rating;

    const keywords = product.reviews?.keywords?.join(', ');

    const topComment = currentLang === "English" ? product.reviews?.enTopComment : product.reviews?.topComment;



    const titles = currentLang === "English" ? {

      p1: TRANSLATIONS["English"].pitchPart1,

      p2: TRANSLATIONS["English"].pitchPart2,

      p3: TRANSLATIONS["English"].pitchPart3

    } : {

      p1: TRANSLATIONS["Traditional Chinese"].pitchPart1,

      p2: TRANSLATIONS["Traditional Chinese"].pitchPart2,

      p3: TRANSLATIONS["Traditional Chinese"].pitchPart3

    };



    const systemPrompt = `You are a Watsons O+O Ambassador. Lang: ${currentLang}. Tone: ${tone}.

    - Product: ${currentLang === "English" ? (product.enName || product.name) : product.name}

    - Rating: ${rating} stars

    - Sentiment Keywords: "${keywords}"

    - Feedback: "${topComment}"

    - App Saving: $${((product.promoPrice || product.price) - product.appPrice).toFixed(1)}

    

    TASK: Generate pitch in EXACTLY THREE points (prefix with '-'). Start immediately.

    BRAND RULE: ONLY mention "屈臣氏" or "Watsons". DO NOT mention Mannings or HKTV Mall. Strictly follow. 

    

    Structure:

    1. - **${titles.p1}**: [Benefits, promos, app savings. If OOS, rescue with Click & Collect at Watsons.]

    2. - **${titles.p2}**: [ONLY star rating summary: Rated ${rating} out of 5 stars.]

    3. - **${titles.p3}**: [Summarize feedback "${topComment}" and keywords "${keywords}".]`;

    

    try {

      const result = await callGemini("Generate pitch.", systemPrompt);

      setSalesPitch(result || `- **${titles.p1}**: Saving available!\n- **${titles.p2}**: 4.9 stars!\n- **${titles.p3}**: Fast relief!`);

    } catch (e) {

      setSalesPitch(currentLang === "English" ? `- **Benefits**: Best value.\n- **Rating**: 4.9 stars.` : `- **優勢**: 享有價格優惠。\n- **評分**: 高達 4.9 分。`);

    } finally {

      setIsGenerating(false);

    }

  };



  const toggleLang = () => {

    const nextLang = lang === "English" ? "Traditional Chinese" : "English";

    setLang(nextLang);

    if (scannedProduct) generateSalesPitch(scannedProduct, memberData, pitchTone, nextLang, showBundle);

  };



  const startScanner = async () => {

    setView('scanner');

    try {

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

      if (videoRef.current) videoRef.current.srcObject = stream;

    } catch (err) {

      console.warn("Camera access denied.");

    }

  };



  const stopScanner = () => {

    if (videoRef.current?.srcObject) {

      videoRef.current.srcObject.getTracks().forEach(track => track.stop());

    }

  };



  const simulateScan = (barcode) => {

    const product = MOCK_DATA.products[barcode];

    if (product) {

      setScannedProduct(product);

      setShowBundle(false);

      stopScanner();

      setView('result');

      generateSalesPitch(product, memberData, pitchTone, lang, false);

    }

  };



  const handleCategoryClick = (categoryName) => {

    // Finds the first trending product in the category

    const matched = Object.values(MOCK_DATA.products).find(p => p.category === categoryName);

    if (matched) simulateScan(matched.id);

  };



  const handleSuccess = () => {

    setSuccessCount(prev => prev + 1);

    setView('home');

    setScannedProduct(null);

    setObjection("");

    setObjectionResponse("");

    setShowBundle(false);

  };



  const handleObjection = async () => {

    if (!objection || !scannedProduct) return;

    setIsGenerating(true);

    const sys = `Handle objection in ${lang} for ${scannedProduct.name}: "${objection}". BRAND RULE: Only Watsons.`;

    try {

      const result = await callGemini("Handle objection", sys);

      setObjectionResponse(result || "I understand.");

    } catch (e) {

      setObjectionResponse("I understand.");

    } finally {

      setIsGenerating(false);

    }

  };



  return (

    <div className="max-w-md mx-auto h-[800px] bg-white shadow-2xl rounded-[60px] overflow-hidden border-[12px] border-slate-900 relative my-10 font-sans select-none">

      {view === 'home' && (

        <HomeView 

          t={t} lang={lang} successCount={successCount} 

          setView={setView} startScanner={startScanner} toggleLang={toggleLang}

          handleCategoryClick={handleCategoryClick}

        />

      )}

      

      {view === 'scanner' && (

        <ScannerView t={t} videoRef={videoRef} setView={setView} stopScanner={stopScanner} simulateScan={simulateScan} />

      )}

      

      {view === 'result' && (

        <ResultView 

          t={t} lang={lang} scannedProduct={scannedProduct} memberData={memberData} 

          salesPitch={salesPitch} isGenerating={isGenerating} setView={setView} 

          pitchTone={pitchTone} setPitchTone={setPitchTone} generateSalesPitch={generateSalesPitch} 

          handleSuccess={handleSuccess} objection={objection} setObjection={setObjection} 

          handleObjection={handleObjection} objectionResponse={objectionResponse} 

          showBundle={showBundle} setShowBundle={setShowBundle} simulateScan={simulateScan}

        />

      )}

      

      {view === 'member' && (

        <div className="p-8 h-full bg-white">

          <button onClick={() => setView('home')} className="mb-6 p-2 bg-slate-100 rounded-full"><XCircle size={20}/></button>

          <h2 className="text-3xl font-black mb-10 tracking-tighter">{t.memberConnect}</h2>

          <button 

            onClick={() => { setMemberData(MOCK_DATA.members["M12345"]); setView('home'); }}

            className="w-full p-6 bg-blue-50 border border-blue-200 rounded-[32px] flex items-center justify-between shadow-sm active:scale-95 transition-all"

          >

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">C</div>

              <div className="text-left"><p className="font-bold text-slate-800">{lang === "English" ? "Mrs. Chan" : "陳太太"}</p><p className="text-xs text-slate-500">{lang === "English" ? "Gold Tier" : "金級會員"}</p></div>

            </div>

            <ChevronRight size={20} className="text-blue-300" />

          </button>

        </div>

      )}

      

      {view === 'training' && (

        <div className="p-8 h-full bg-slate-900 text-white text-center flex flex-col justify-center">

          <button onClick={() => setView('home')} className="absolute top-10 left-8 p-2 bg-white/10 rounded-full"><XCircle size={20}/></button>

          <WatsonsMascot className="w-32 h-32 mx-auto mb-6" />

          <h2 className="text-2xl font-black mb-2">{t.aiLab}</h2>

          <p className="text-white/40 text-sm px-10">{t.aiLabStatus}</p>

        </div>

      )}



      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300/30 rounded-full"></div>

      <style>{`

        @keyframes scan-line { 0% { top: 0%; } 100% { top: 100%; } }

        .animate-scan-line { animation: scan-line 3.5s linear infinite; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }

        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

      `}</style>

    </div>

  );

};



export default App;