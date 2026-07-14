import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { setPage } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="footer-main">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display font-black text-lg text-white tracking-tight">
                KINDRED
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering local communities through real-time audited donations, native seed banks, and radical transparency. Track exactly where your dollars land.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-800/50 p-3 rounded-lg max-w-xs border border-slate-800/80">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Tax Deductible 501(c)(3) Certified</span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Discover Impact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setPage('browse')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Education Systems
                </button>
              </li>
              <li>
                <button onClick={() => setPage('browse')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Rainforest Canopies
                </button>
              </li>
              <li>
                <button onClick={() => setPage('browse')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Solar Filtration
                </button>
              </li>
              <li>
                <button onClick={() => setPage('browse')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Shelter Foundations
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Trust & Auditing</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setPage('org-profile')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Partner Directory
                </button>
              </li>
              <li>
                <a href="#transparency-report" className="hover:text-white transition-colors text-left">
                  Dollar Tracing Engine
                </a>
              </li>
              <li>
                <a href="#guidance" className="hover:text-white transition-colors text-left">
                  Annual Impact Reports
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors text-left">
                  Donor Bill of Rights
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive bi-weekly radical transparency audits and direct project stories. No spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full bg-slate-800 border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Kindred platform. All rights reserved. Registered 501(c)(3) nonprofit partner.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span>for community agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
