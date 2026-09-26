import React from 'react';
import { Linkedin, Twitter, Instagram, Github, Phone, Mail, MapPin, Shield } from 'lucide-react';

export default function Footer({ onNavigate, onOpenHelp, isAuthPage = false }) {
  const handleQuickLink = (targetTab) => {
    if (onNavigate) {
      onNavigate(targetTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSupportLink = (action) => {
    if (action === 'help' && onOpenHelp) {
      onOpenHelp();
    } else if (action === 'contact') {
      window.location.href = 'mailto:support@manakos.in';
    }
  };

  return (
    <footer className="w-full bg-[#0F172A] text-white px-4 sm:px-8 lg:px-12 py-8 z-20 shrink-0 border-t border-slate-800 font-sans select-none mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">

        {/* Column 1: Identity & Role */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0062D2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Shield size={14} className="text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              ManakOS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-normal max-w-xs">
            National Standards and Quality Intelligence Operating System for Indian Standards specifications, statutory Quality Control Orders, laboratory testing parameters, and ISI Mark compliance.
          </p>
          <div className="flex items-center gap-2 pt-1 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="GitHub repository"
              aria-label="GitHub"
            >
              <Github size={13} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="Twitter"
              aria-label="Twitter"
            >
              <Twitter size={13} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
          </div>
        </div>

        {/* Column 2: Applications */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white">
            Compliance tools
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('standards')}
                className="hover:text-white transition-colors text-left"
              >
                Standards directory
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('compliance')}
                className="hover:text-white transition-colors text-left"
              >
                Compliance studio
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('verification')}
                className="hover:text-white transition-colors text-left"
              >
                Licence and lab verifier
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('documents')}
                className="hover:text-white transition-colors text-left"
              >
                Document analyzer
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Regulatory Resources */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white">
            Regulatory resources
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('notifications')}
                className="hover:text-white transition-colors text-left"
              >
                Gazette radar and QCOs
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('compare')}
                className="hover:text-white transition-colors text-left"
              >
                Clause comparator
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleSupportLink('help')}
                className="hover:text-white transition-colors text-left"
              >
                Platform user guide
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleQuickLink('home')}
                className="hover:text-white transition-colors text-left"
              >
                Executive dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Authority Information */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-white">
            Authority reference
          </h4>
          <div className="text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
            <p className="font-semibold text-slate-200">Bureau of Indian Standards</p>
            <p className="flex items-start gap-1.5 text-slate-400">
              <MapPin size={13} className="text-[#0062D2] shrink-0 mt-0.5" />
              <span>Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002</span>
            </p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <Phone size={13} className="text-[#0062D2] shrink-0" />
              <span>National Toll-Free: 1800 11 4000</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail size={13} className="text-[#0062D2] shrink-0" />
              <a
                href="mailto:support@manakos.in"
                className="text-slate-300 hover:text-white transition-colors hover:underline"
              >
                support@manakos.in
              </a>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <p>© 2026 ManakOS. Developed for Bureau of Indian Standards and Indian manufacturing compliance.</p>
        <p className="text-slate-400">Official BIS Gazette synchronization active</p>
      </div>
    </footer>
  );
}
