import { useState, FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Trophy, CreditCard, ChevronRight, Download, FileText, Send, CheckCircle2, UserCheck, HelpCircle, RefreshCw } from 'lucide-react';

export default function DashboardScreen() {
  const { currentUser, contributions, projects, selectProject, setPage, logout } = useApp();

  // If there is no user logged in, we prompt them to auth
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-6 p-8 bg-white border border-slate-100 rounded-3xl shadow-xs">
        <UserCheck className="h-12 w-12 text-slate-300 mx-auto" />
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-xl text-slate-900">Dashboard Access Required</h2>
          <p className="text-slate-500 text-sm">
            Please sign in to view your impact portfolio, recurring donations, download tax receipts, and access support widgets.
          </p>
        </div>
        <button
          onClick={() => setPage('auth')}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer"
        >
          Sign In as Sarah Jenkins
        </button>
      </div>
    );
  }

  // State for support message simulation
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);

  const handleSupportSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportMessage('');
    }, 4000);
  };

  const handleDownloadReport = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      // Simulate download
      alert('Downloaded: Kindred_Q3_Impact_Report_Sarah_Jenkins.pdf (Contains certified transaction ledgers and field survival photo logs.)');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="dashboard-screen">
      
      {/* 1. Header welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-slate-900 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-slate-500 text-sm">
            Review your transparent impact footprint and active field-mesh monitors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5" />
            Impact Score: {Math.round(currentUser.totalDonated / 10)}
          </span>
        </div>
      </div>

      {/* 2. Bento Summary Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: Total Impact Giving */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="absolute right-4 top-4 p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <CreditCard className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">My Total Impact Footprint</p>
          <p className="text-3xl font-display font-black text-slate-900">
            ${currentUser.totalDonated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 pt-1">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
            100% Tax Deductible Receipts Audited
          </p>
        </div>

        {/* KPI 2: Recurring Donations */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="absolute right-4 top-4 p-2 bg-blue-50 text-blue-600 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Active Subscriptions</p>
          <p className="text-3xl font-display font-black text-slate-900">
            {currentUser.recurringDonationsCount} Active
          </p>
          <p className="text-xs text-slate-400 pt-1">
            Next charge: August 1, 2026
          </p>
        </div>

        {/* KPI 3: Verification level */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <div className="absolute right-4 top-4 p-2 bg-white/10 text-emerald-400 rounded-xl border border-white/10">
            <UserCheck className="h-5 w-5" />
          </div>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">Verification Status</p>
          <p className="text-2xl font-display font-black text-white">
            Level {currentUser.verificationLevel} Global Backer
          </p>
          <p className="text-xs text-slate-300 pt-1">
            KYC Identity Cleared & Verified
          </p>
        </div>

      </section>

      {/* 3. Main Dashboard Layout splits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: List of Backed Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-1">
            <h2 className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
              Your Funded Projects
            </h2>
            <p className="text-slate-400 text-xs">
              Direct links to active field logs and GPS tags for the campaigns you support.
            </p>
          </div>

          {contributions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Filter unique projects backed */}
              {Array.from(new Set(contributions.map(c => c.projectId))).map((projId) => {
                const project = projects.find(p => p.id === projId);
                const projectContributions = contributions.filter(c => c.projectId === projId);
                const totalGiven = projectContributions.reduce((sum, curr) => sum + curr.amount, 0);
                
                if (!project) return null;
                const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));

                return (
                  <div
                    key={project.id}
                    onClick={() => selectProject(project.id)}
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                      <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white rounded-lg px-2.5 py-1 text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <span>Funded:</span>
                        <span className="text-emerald-400 font-extrabold">${totalGiven.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">{project.location}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                          <span>{percentRaised}% raised</span>
                          <span>{project.daysLeft} days left</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${percentRaised}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-600 pt-2 border-t border-slate-50">
                        <span>● FIELD MESH ACTIVE</span>
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl space-y-4">
              <ShieldAlert className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="font-display font-bold text-slate-800 text-lg">No backed campaigns yet</p>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                Join our collective transparency model. Pick an active, verified project to back, and trace your dollars directly.
              </p>
              <button
                onClick={() => setPage('browse')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Browse Active Campaigns
              </button>
            </div>
          )}

          {/* Recent Contributions History list table */}
          <div className="space-y-3 pt-4">
            <div className="space-y-1">
              <h2 className="font-display font-extrabold text-lg text-slate-900 tracking-tight">
                Recent Contributions Ledgers
              </h2>
              <p className="text-slate-400 text-xs">
                Auditable financial receipts matching secure bank statements.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-600">
                    <th className="p-3">Reference ID</th>
                    <th className="p-3">Project Title</th>
                    <th className="p-3">Method / Frequency</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Amount Given</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-600">
                  {contributions.map((c) => (
                    <tr key={c.id}>
                      <td className="p-3 font-semibold text-slate-900">{c.id}</td>
                      <td className="p-3 font-sans max-w-[200px] truncate font-medium text-slate-800">{c.projectTitle}</td>
                      <td className="p-3 font-sans">
                        {c.isRecurring ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                            Monthly Subscription
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border">
                            One-Time Pledge
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-sans text-slate-400">{c.date}</td>
                      <td className="p-3 text-right font-black text-emerald-600">+${c.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Profile Sidebar */}
        <aside className="space-y-6">
          
          {/* 1. Profile Profile details */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-white"></span>
              </span>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-slate-800 text-base">{currentUser.name}</h3>
              <p className="text-xs text-slate-400">Sarah Jenkins • Member since {currentUser.memberSince}</p>
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => alert('Demo Feature: Editing profile details is disabled in this preview.')}
                className="text-[10px] font-bold text-slate-500 border hover:bg-slate-50 rounded-lg px-2.5 py-1.5 cursor-pointer"
              >
                Edit Bio
              </button>
              <button
                onClick={logout}
                className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg px-2.5 py-1.5 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* 2. Download Report card */}
          <div className="bg-emerald-50/50 border border-emerald-100/60 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-800">
              <FileText className="h-5 w-5" />
              <h4 className="font-display font-extrabold text-sm">Download Auditable Ledgers</h4>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Generate a unified tax-deductible ledger report for the current Q3 physical period. Matches verified field GPS photos.
            </p>
            <button
              onClick={handleDownloadReport}
              disabled={downloadingReport}
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              {downloadingReport ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  Download Q3 Impact Report.pdf
                </>
              )}
            </button>
          </div>

          {/* 3. Help / Support Widget */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-slate-800">
              <HelpCircle className="h-5 w-5 text-slate-400" />
              <h4 className="font-display font-extrabold text-sm">Support & Auditing Concierge</h4>
            </div>
            
            {supportSent ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs space-y-1">
                <p className="font-bold">Message Transmitted!</p>
                <p>Our transparency auditors will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-2">
                <textarea
                  placeholder="Need to coordinate a custom corporate transparency campaign? Leave a message..."
                  rows={3}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500 placeholder-slate-400"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </aside>

      </div>

    </div>
  );
}
