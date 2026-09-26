import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, HelpCircle, Bell, User, LogOut, Globe, Menu, 
  CheckCircle2, AlertTriangle, ShieldCheck, ChevronDown, 
  Building2, Award, Search, X, ShieldAlert, FileText, Check,
  Layers, Shield
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../services/api';

export default function Header({
  language,
  onLanguageChange,
  onOpenHelp,
  onOpenAuthModal,
  onOpenProfile,
  auth,
  onMenuClick,
  onTabChange,
  activeTab
}) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [liveNotifications, setLiveNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const loadNotifications = async () => {
    try {
      const params = {};
      if (auth?.user?.email) {
        params.email = auth.user.email;
      }
      const data = await getNotifications(params);
      if (Array.isArray(data)) {
        setLiveNotifications(data);
        const unread = data.filter(n => n.unread).length;
        setUnreadCount(unread);
      }
    } catch (e) {
      // Keep state on network failure
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 8000);
    return () => clearInterval(interval);
  }, [auth?.user?.id, auth?.user?.email]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleNotifications = () => {
    setShowNotifDropdown(!showNotifDropdown);
    loadNotifications();
  };

  const quickNotifications = [
    {
      id: 1,
      title: 'IS 17803 Mandatory Quality Control Order',
      badge: 'Statutory Order',
      desc: 'Quality Control Order published. Compliance mandatory by 01 July 2026.',
      time: '10m ago',
      target: 'compliance'
    },
    {
      id: 2,
      title: 'ISI Licence CM/L-7128394 Renewal Due',
      badge: 'Licence notice',
      desc: 'Licence validity expires in 45 days. Submit Form V audit report.',
      time: '3h ago',
      target: 'verification'
    },
    {
      id: 3,
      title: 'NABL Test Report Evaluated',
      badge: 'Evidence verified',
      desc: 'Readiness at 75%. Uploading Clause 8.1 report increases score to 95%.',
      time: '2d ago',
      target: 'documents'
    }
  ];

  const isOfficer = Boolean(
    auth?.user?.is_admin === true ||
    auth?.user?.role?.toLowerCase().includes('admin') ||
    auth?.user?.role?.toLowerCase().includes('officer') ||
    auth?.user?.role?.toLowerCase().includes('director') ||
    (typeof window !== 'undefined' && sessionStorage.getItem('bis_officer_auth') === 'true')
  );

  return (
    <header className="w-full manak-header sticky top-0 z-40 shrink-0 select-none transition-all">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 lg:hidden transition-all"
            aria-label="Toggle navigation menu"
          >
            <Menu size={19} />
          </button>

          <div
            className="flex items-center gap-2.5 cursor-pointer py-1 group"
            onClick={() => onTabChange && onTabChange('home')}
            title="Return to ManakOS dashboard"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0062D2] flex items-center justify-center text-white shadow-xs">
              <Shield size={18} className="text-white" />
            </div>

            <div className="flex flex-col text-left leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#0F172A]">
                  ManakOS
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                  Indian Standards
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-normal">
                National Standards Operating System
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => onTabChange && onTabChange('compliance')}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all text-left"
            title="Search Indian Standards, gazette orders, or HS codes"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search size={15} className="text-slate-500 shrink-0" />
              <span className="text-xs font-normal truncate">
                Search Indian Standards, gazette orders, or HS codes
              </span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Controls & Notification Center */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-medium text-[#0F172A]">
          
          {/* Language Selector */}
          <div className="hidden sm:block">
            <LanguageSelector language={language} onChange={onLanguageChange} />
          </div>

          {/* Help Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
            aria-label="Help and guidelines"
            title="Help and guidelines"
          >
            <HelpCircle size={18} />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleToggleNotifications}
              className={`w-9 h-9 flex items-center justify-center relative rounded-xl text-slate-600 hover:text-slate-900 transition-all active:scale-95 ${
                showNotifDropdown ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-100'
              }`}
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3 z-50 animate-fade-in text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">Notifications</span>
                    {unreadCount > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-medium">
                        {unreadCount} new
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">All caught up</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={async () => {
                          await markAllNotificationsAsRead();
                          setUnreadCount(0);
                          setLiveNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                        }}
                        className="text-[11px] text-slate-500 hover:text-slate-900"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifDropdown(false);
                        onTabChange && onTabChange('notifications');
                      }}
                      className="text-[11px] text-[#0062D2] font-medium hover:underline"
                    >
                      View all
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {(liveNotifications.length > 0 ? liveNotifications.slice(0, 5) : quickNotifications).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={async () => {
                        if (notif.unread && (notif._id || notif.id)) {
                          markNotificationAsRead(notif.id || notif._id);
                          setLiveNotifications(prev => prev.map(n => (n.id === notif.id || n._id === notif.id) ? { ...n, unread: false } : n));
                          setUnreadCount(prev => Math.max(0, prev - 1));
                        }
                        setShowNotifDropdown(false);
                        const target = notif.action_primary?.target || notif.target || 'compliance';
                        onTabChange && onTabChange(target);
                      }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-700">
                          {notif.badge}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {notif.date || notif.time}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                        {notif.description || notif.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowNotifDropdown(false);
                    onTabChange && onTabChange('notifications');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs transition-all text-center"
                >
                  Open notification center
                </button>
              </div>
            )}
          </div>

          {/* User Profile / Sign In Pill */}
          {auth?.user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                type="button"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-[#0062D2] text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
                  {auth.user.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'MO'}
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-xs font-semibold text-slate-900 truncate max-w-[110px]">
                    {auth.user.full_name}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate max-w-[110px] mt-0.5">
                    {auth.user.company_name || 'Enterprise'}
                  </span>
                </div>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 space-y-3 z-50 animate-fade-in text-xs">
                  <div className="pb-3 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">{auth.user.full_name}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{auth.user.email || 'manufacturer@portal.in'}</p>
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium text-[10px]">
                        {auth.user.role || 'Manufacturer'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium text-[10px] flex items-center gap-1">
                        <Award size={11} />
                        MSME verified
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenProfile && onOpenProfile();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                    >
                      <Building2 size={15} className="text-[#0062D2]" />
                      <span>Enterprise profile and GSTIN</span>
                    </button>

                    {isOfficer && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserDropdown(false);
                          onTabChange && onTabChange('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 font-medium transition-colors"
                      >
                        <ShieldAlert size={15} className="text-amber-600" />
                        <span>Admin governance panel</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserDropdown(false);
                        auth.logout();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
                    >
                      <LogOut size={13} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="h-9 px-4 rounded-xl bg-[#0062D2] hover:bg-[#0051AE] text-white text-xs font-semibold transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <User size={14} />
              <span>Sign in</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
