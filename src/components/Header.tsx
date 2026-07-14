import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Menu, X, User, LogOut, RefreshCw } from 'lucide-react';

export default function Header() {
  const { activePage, setPage, currentUser, logout, resetAll } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Discover' },
    { id: 'browse', label: 'Browse Projects' },
    { id: 'org-profile', label: 'Success Stories & Orgs' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <button
              onClick={() => setPage('landing')}
              className="flex items-center gap-2 cursor-pointer group"
              id="brand-logo"
            >
              <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                KINDRED
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold uppercase tracking-wider">
                Impact-First
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  activePage === item.id
                    ? 'text-emerald-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={resetAll}
              title="Reset Sandbox Data"
              className="p-2 text-slate-400 hover:text-emerald-500 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                  id="user-profile-menu-button"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-slate-700 hidden lg:inline">
                    {currentUser.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-100 py-1 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-mono">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {currentUser.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setPage('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <User className="h-4 w-4 text-slate-400" />
                      Donor Dashboard
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 text-red-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setPage('auth')}
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 active:scale-98 transition-all shadow-xs cursor-pointer"
                id="sign-in-button"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => {
                if (currentUser) {
                  setPage('browse');
                } else {
                  setPage('auth');
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all shadow-sm cursor-pointer"
            >
              Start Backing
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={resetAll}
              title="Reset Sandbox Data"
              className="p-2 text-slate-400 hover:text-emerald-500 rounded-lg"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                activePage === item.id
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <hr className="my-2 border-slate-100" />
          {currentUser ? (
            <>
              <button
                onClick={() => {
                  setPage('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-6 w-6 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                My Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50/50"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setPage('auth');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-2.5 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
}
