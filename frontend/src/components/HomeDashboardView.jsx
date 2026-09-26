import React, { useState } from 'react';
import { 
  Search, Mic, Sparkles, BookOpen, ShieldCheck, FileText, Scale, 
  BadgeCheck, Eye, CheckCircle2, AlertTriangle, 
  Upload, Layers, Check, Database, Award, Landmark, 
  TrendingUp, Clock, ExternalLink, ShieldAlert, Cpu, Shield,
  FileCheck
} from 'lucide-react';
import Footer from './Footer';

export default function HomeDashboardView({
  onNavigate,
  onStartSearch,
  onOpenEvidence,
  onCheckComplianceForStandard,
  onAskAIAboutStandard,
  onAskAI
}) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Chrome, Safari or Edge.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      let text = event.results[0][0].transcript || '';
      text = text.replace(/\b(\w+)(?:\s+\1\b)+/gi, '$1').replace(/\s+/g, ' ').trim();
      setQuery(text);
      if (onAskAI) onAskAI(text);
      else if (onStartSearch) onStartSearch(text);
    };

    recognition.start();
  };

  const handleRunSearch = (searchQuery = query) => {
    const q = searchQuery.trim() || "I manufacture domestic pressure cookers under IS 2347";
    if (onAskAI) {
      onAskAI(q);
    } else if (onStartSearch) {
      onStartSearch(q);
    }
  };

  const quickPrompts = [
    { label: "Domestic pressure cookers (IS 2347)", query: "I manufacture domestic pressure cookers under IS 2347" },
    { label: "Electric storage water heaters (IS 302)", query: "Requirements for electric storage water heaters under IS 302" },
    { label: "Sports footwear safety (IS 15844)", query: "Mandatory test clauses for sports footwear under IS 15844" },
    { label: "Toy safety compliance (IS 9873)", query: "Toy export and domestic certification rules under IS 9873" }
  ];

  const technicalClauses = [
    {
      clause: "Clause 6.1",
      title: "Hydrostatic bursting pressure",
      parameter: "Minimum 0.35 MPa (3.5 bar) without deformation",
      facility: "NABL or BIS lab required",
      status: "action_needed",
      statusText: "Report missing"
    },
    {
      clause: "Clause 8.2",
      title: "Thermal shock resistance",
      parameter: "200°C ΔT water quench, 5 consecutive cycles",
      facility: "In-house quality plan",
      status: "verified",
      statusText: "Verified"
    },
    {
      clause: "Clause 10.1",
      title: "Safety relief valve operation",
      parameter: "Release pressure within 100 kPa to 140 kPa",
      facility: "NABL calibration log",
      status: "verified",
      statusText: "Verified"
    },
    {
      clause: "Clause 12.3",
      title: "Handle temperature and mechanical strength",
      parameter: "Maximum handle temperature 50°C at full pressure",
      facility: "In-house inspection",
      status: "verified",
      statusText: "Verified"
    }
  ];

  const topStandards = [
    {
      id: "IS 2347:2017",
      title: "Domestic pressure cookers specification",
      status: "Mandatory Quality Control Order",
      statusClass: "text-amber-800 bg-amber-50 border-amber-200",
      scope: "Kitchenware and pressure vessels",
      qcoDate: "Enforced"
    },
    {
      id: "IS 302 (Part 2/Sec 21):2024",
      title: "Stationary storage type electric water heaters",
      status: "Mandatory Quality Control Order",
      statusClass: "text-amber-800 bg-amber-50 border-amber-200",
      scope: "Electrical appliances and thermal safety",
      qcoDate: "Enforced"
    },
    {
      id: "IS 15844 (Part 1):2023",
      title: "Sports footwear, general purpose",
      status: "Mandatory Quality Control Order",
      statusClass: "text-amber-800 bg-amber-50 border-amber-200",
      scope: "Footwear and personal protective gear",
      qcoDate: "Enforced"
    }
  ];

  const gazetteOrders = [
    {
      orderId: "S.O. 1823(E)",
      title: "Quality Control Order for Domestic Utensils and Pressure Cookers",
      ministry: "Ministry of Consumer Affairs",
      date: "21 April 2025",
      effect: "Compliance mandatory for all MSME domestic manufacturing units."
    },
    {
      orderId: "S.O. 1402(E)",
      title: "Electrical Appliances Safety Amendment Order",
      ministry: "Ministry of Commerce and Industry",
      date: "10 April 2025",
      effect: "Enforces revised insulation resistance clauses for storage heaters."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto manak-canvas flex flex-col justify-between animate-fade-in font-sans">
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 max-w-7xl mx-auto w-full">

        {/* ========================================================================= */}
        {/* 1. ARCHITECTURAL SEARCH HEADER                                            */}
        {/* ========================================================================= */}
        <div className="space-y-4 max-w-3xl">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Indian Standards and Quality Compliance Intelligence
            </h1>
            <p className="text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
              Map manufactured products to official Bureau of Indian Standards specifications, statutory Quality Control Orders, and required laboratory test clauses.
            </p>
          </div>

          {/* Search Console */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-300 shadow-xs focus-within:border-[#0062D2] focus-within:ring-2 focus-within:ring-[#0062D2]/15 transition-all">
              <div className="pl-3 text-slate-400">
                <Search size={18} />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunSearch()}
                placeholder="Enter product description, IS code, or HS code"
                className="w-full px-2 py-2 text-sm text-slate-900 font-normal outline-none bg-transparent placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors ${
                  isListening ? 'text-amber-600 bg-amber-50' : ''
                }`}
                title="Voice input"
                aria-label="Voice input"
              >
                <Mic size={17} />
              </button>

              <button
                type="button"
                onClick={() => handleRunSearch()}
                className="px-5 py-2 rounded-xl bg-[#0062D2] hover:bg-[#0051AE] text-white text-xs font-semibold transition-all shadow-xs shrink-0 active:scale-95"
              >
                Analyze product
              </button>
            </div>

            {/* Practical Prompt Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Examples:</span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(p.query);
                    handleRunSearch(p.query);
                  }}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors text-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SIGNATURE MOMENT: TECHNICAL CLAUSE & AUDIT TELEMETRY CONSOLE            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Active Standard Technical Specification Sheet (8 cols) */}
          <div className="lg:col-span-8 manak-panel p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#0062D2]">IS 2347:2017</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                    Mandatory Quality Control Order
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Domestic Pressure Cookers (Induction and Gas Compatible)
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('compliance')}
                className="text-xs font-medium text-[#0062D2] hover:underline self-start sm:self-auto"
              >
                Open full audit studio
              </button>
            </div>

            {/* Mandatory Testing Clauses Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Mandatory statutory testing clauses</span>
                <span>4 of 8 clauses shown</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-medium">
                      <th className="pb-2.5 font-medium">Clause reference</th>
                      <th className="pb-2.5 font-medium">Test parameter</th>
                      <th className="pb-2.5 font-medium">Testing facility requirement</th>
                      <th className="pb-2.5 font-medium text-right">Audit status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {technicalClauses.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 font-semibold text-slate-900 whitespace-nowrap">
                          {item.clause}
                          <span className="block text-[11px] font-normal text-slate-500">
                            {item.title}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600 max-w-xs pr-4">
                          {item.parameter}
                        </td>
                        <td className="py-3 text-slate-500 whitespace-nowrap">
                          {item.facility}
                        </td>
                        <td className="py-3 text-right whitespace-nowrap">
                          {item.status === 'verified' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Check size={12} />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                              <AlertTriangle size={12} />
                              <span>Action required</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Statutory Readiness & Immediate Action Directive (4 cols) */}
          <div className="lg:col-span-4 manak-panel p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Compliance readiness</span>
                <span className="text-xs font-semibold text-slate-900">5 of 8 clauses verified</span>
              </div>

              {/* Precise Engineering Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">62.5%</span>
                  <span className="text-xs font-medium text-slate-500">Passing threshold: 100%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0062D2] rounded-full" style={{ width: '62.5%' }} />
                </div>
              </div>

              {/* High Priority Action Required Box */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-700 shrink-0" />
                  <span className="text-xs font-semibold text-amber-900">
                    Immediate action required
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed font-normal">
                  Clause 6.1 requires hydrostatic bursting pressure test certificate from an accredited NABL testing facility prior to Form V filing.
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => onNavigate('documents')}
                className="w-full h-10 rounded-xl bg-[#0062D2] hover:bg-[#0051AE] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <Upload size={14} />
                <span>Upload laboratory test certificate</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('compliance')}
                className="w-full h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
              >
                Review complete checklist
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. PURPOSE-BUILT APPLICATION TOOLS                                        */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Compliance tools and registries
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1 */}
            <div 
              onClick={() => onNavigate('standards')}
              className="manak-panel p-5 cursor-pointer hover:border-slate-300 transition-all space-y-2.5 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0062D2] flex items-center justify-center">
                <BookOpen size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Standards directory</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Search 24,000+ Indian Standards with clause breakdowns and applicable products.
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#0062D2] block pt-1">
                Explore directory
              </span>
            </div>

            {/* Tool 2 */}
            <div 
              onClick={() => onNavigate('documents')}
              className="manak-panel p-5 cursor-pointer hover:border-slate-300 transition-all space-y-2.5 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileCheck size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Document analyzer</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Verify NABL test certificates against mandated clause tolerances automatically.
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#0062D2] block pt-1">
                Analyze test report
              </span>
            </div>

            {/* Tool 3 */}
            <div 
              onClick={() => onNavigate('verification')}
              className="manak-panel p-5 cursor-pointer hover:border-slate-300 transition-all space-y-2.5 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <BadgeCheck size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Licence and lab verifier</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Check validity of active CM/L licences and accredited laboratory test capabilities.
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#0062D2] block pt-1">
                Verify credentials
              </span>
            </div>

            {/* Tool 4 */}
            <div 
              onClick={() => onNavigate('compare')}
              className="manak-panel p-5 cursor-pointer hover:border-slate-300 transition-all space-y-2.5 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <Scale size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-900">Clause comparator</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Side-by-side comparison of standard amendments, scope updates, and test limits.
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#0062D2] block pt-1">
                Compare revisions
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. STATUTORY REPOSITORY & GAZETTE RADAR                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Active Standards Repository (8 cols) */}
          <div className="lg:col-span-8 manak-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Frequently consulted statutory standards
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('standards')}
                className="text-xs font-medium text-[#0062D2] hover:underline"
              >
                View all standards
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-medium">
                    <th className="pb-2.5">Standard code</th>
                    <th className="pb-2.5">Scope</th>
                    <th className="pb-2.5">Statutory status</th>
                    <th className="pb-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topStandards.map((std, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 font-semibold text-slate-900 whitespace-nowrap">
                        {std.id}
                        <span className="block text-[11px] font-normal text-slate-500 max-w-xs truncate">
                          {std.title}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 whitespace-nowrap">
                        {std.scope}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${std.statusClass}`}>
                          {std.status}
                        </span>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onNavigate('standards')}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Gazette Notifications Feed (4 cols) */}
          <div className="lg:col-span-4 manak-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Official Gazette notifications
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('notifications')}
                className="text-xs font-medium text-[#0062D2] hover:underline"
              >
                All orders
              </button>
            </div>

            <div className="space-y-3">
              {gazetteOrders.map((ord, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('notifications')}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 cursor-pointer transition-colors space-y-1 text-left"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">{ord.orderId}</span>
                    <span className="text-slate-500">{ord.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                    {ord.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {ord.effect}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
