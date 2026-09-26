import React from 'react';
import { 
  Home, BookOpen, ShieldCheck, FileCheck, BadgeCheck, Sparkles, 
  Scale, Bell, Headphones, X, Landmark, Compass, Award, ExternalLink,
  Shield, Cpu, Layers
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  onOpenHelp,
  auth
}) {
  const isOfficer = Boolean(
    auth?.user?.is_admin === true ||
    auth?.user?.role?.toLowerCase().includes('admin') ||
    auth?.user?.role?.toLowerCase().includes('officer') ||
    auth?.user?.role?.toLowerCase().includes('director') ||
    (typeof window !== 'undefined' && sessionStorage.getItem('bis_officer_auth') === 'true')
  );

  const navigationSections = [
    {
      title: 'Platform',
      items: [
        { id: 'home', label: 'Executive dashboard', icon: <Home size={17} /> },
        { id: 'standards', label: 'Standards directory', icon: <BookOpen size={17} /> },
        { id: 'compliance', label: 'Compliance studio', icon: <ShieldCheck size={17} /> },
      ]
    },
    {
      title: 'Intelligence and audit',
      items: [
        { id: 'assistant', label: 'Manak AI copilot', icon: <Sparkles size={17} />, badge: 'AI' },
        { id: 'documents', label: 'Document analyzer', icon: <FileCheck size={17} /> },
        { id: 'verification', label: 'Licence and lab verifier', icon: <BadgeCheck size={17} /> },
      ]
    },
    {
      title: 'Statutory and compare',
      items: [
        { id: 'compare', label: 'Clause comparator', icon: <Scale size={17} /> },
        { id: 'notifications', label: 'Gazette radar and QCOs', icon: <Bell size={17} />, badge: 'Live' },
      ]
    }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 manak-sidebar flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-900">Navigation</span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>

          {navigationSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              <span className="px-3 text-xs font-medium text-slate-400 block mb-1">
                {sec.title}
              </span>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onTabChange(item.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`w-full h-9 flex items-center justify-between px-3 rounded-xl text-xs transition-all active:scale-[0.99] ${
                        isActive
                          ? 'bg-[#0062D2] text-white font-medium shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-normal'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : item.badge === 'Live'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Need Help Card */}
          <div
            onClick={() => {
              onTabChange('assistant');
              if (window.innerWidth < 1024) onClose();
            }}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 cursor-pointer transition-all flex items-center justify-between gap-2.5"
            role="button"
            tabIndex={0}
            aria-label="Open Manak Copilot"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0062D2] flex items-center justify-center shrink-0">
                <Sparkles size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-900 leading-tight">Need expert help?</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">Chat with Manak Copilot</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Official Bureau of Indian Standards Authority Badge */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                <Landmark size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  Bureau of Indian Standards
                </p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                  Government of India, Manak Bhavan
                </p>
              </div>
            </div>

            <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 text-[10px]">
              <div className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Registry synchronized</span>
              </div>
              <span className="text-slate-400">IS 24K+</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
