import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Coins, Milestone, Landmark } from 'lucide-react';

export default function LandingScreen() {
  const { projects, selectProject, setPage } = useApp();

  // Pick top 3 projects to showcase on Landing
  const featuredProjects = projects.slice(0, 3);

  // Find latest donation comment across all projects dynamically
  const allDonationComments = projects.flatMap(p => 
    (p.comments || []).map(c => ({ ...c, projectTitle: p.title }))
  ).filter(c => c.amountDonated && c.amountDonated > 0);

  // Fallback if no real donations exist in the database yet
  const latestDonation = allDonationComments[0] || {
    userName: 'Alex Rivera',
    amountDonated: 150.00,
    projectTitle: 'Roots of Resilience: Amazon',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvrrytExK0ui02ZsX2WtTr-VYIlKodjZCNh-N96ICkaP4551yA6dv5twE5OIq3xSbwHLuvhmEBDH_M1J-fWhJ73gezupfJE_KhEa0KaDgptVsY-AyA8xMUv0TDXCSnJzxGYUViA5yqCB_c0VPnAxqYJMGOLIIZvvGyPU-0KcQ3eSRusv0hG10JKL5-dXsPAMAA5_HL198KV-JA9H0FW1t5Isa4rQAZ4eknWstbUjMTihRVE8YGLGbFUg'
  };

  return (
    <div className="space-y-16 py-8" id="landing-screen">
      
      {/* 1. Grand Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent z-10" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQKEqoq5tYk0cjAgdiLZVx2AF8QczV3sk0jtl8THqSQ9wMpKRZx24yHv70eSw_smLZUjXYk8LAs780W5ShdYvKdQGdxgcRI2xReQ5F_2TBtQs0XH5DqPQzgf4LF1abYaNslCuwJmgX0a_IlUajlhee7biTx4dejvHDd8fncyJxkKwACLBLKu8cOvgK3BrUK-0KtKsqPuscmt5JZ_ljw2LaIEi1d9EVJjBAxPKEb408oPXa2QXt4z6BqQ"
            alt="Community members and volunteers"
            className="absolute inset-0 h-full w-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          
          <div className="relative z-20 px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-32 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>RADICAL TRANSPARENCY PLATFORM</span>
            </div>
            
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Empowering communities through <span className="text-emerald-400">collective action</span>.
            </h1>
            
            <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
              Meet pre-vetted grassroots leaders, audit every dollar directly from your dashboard, and back verified climate, educational, and medical initiatives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setPage('browse')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white shadow-md transition-all cursor-pointer"
              >
                Browse Active Projects
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage('org-profile')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold bg-slate-800/80 hover:bg-slate-700/80 active:scale-98 text-slate-100 border border-slate-700 transition-all cursor-pointer"
              >
                Meet Verified Partners
              </button>
            </div>
          </div>

          {/* Floating Live Contribution Widget (Dynamic) */}
          <div className="hidden lg:block absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 max-w-xs text-xs animate-pulse">
            <p className="text-slate-300 font-mono uppercase tracking-wider text-[10px] mb-1.5">LIVE IMPACT FEED</p>
            <div className="flex items-center gap-3">
              <img
                src={latestDonation.userAvatar}
                alt={latestDonation.userName}
                className="h-8 w-8 rounded-full border border-white/20 object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-white font-semibold">{latestDonation.userName}</p>
                <p className="text-emerald-400 font-bold">pledged ${latestDonation.amountDonated?.toFixed(2)}</p>
                <p className="text-slate-300 text-[10px] truncate max-w-[180px]">{latestDonation.projectTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Trust Stats Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-slate-50 border border-slate-100 rounded-3xl text-center">
          <div>
            <p className="text-4xl font-display font-extrabold text-slate-900">$12.4M+</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">Total Clean Funding Delivered</p>
          </div>
          <div className="border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-6 sm:pt-0 sm:pl-6">
            <p className="text-4xl font-display font-extrabold text-slate-900">2,850+</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">Communities Actively Supported</p>
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0 lg:pl-6">
            <p className="text-4xl font-display font-extrabold text-slate-900">100%</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">Direct Audit Log Matching</p>
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-6 lg:pt-0 lg:pl-6">
            <p className="text-4xl font-display font-extrabold text-slate-900">42</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">Countries with Rooted Co-ops</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Causes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-slate-900 tracking-tight">
              Urgent Grassroots Initiatives
            </h2>
            <p className="text-slate-500 max-w-xl">
              These campaigns have active field monitors deploying resources right now. Support directly and track their local milestone progress.
            </p>
          </div>
          <button
            onClick={() => setPage('browse')}
            className="group inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-500 transition-colors cursor-pointer"
          >
            Explore All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => {
            const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));
            return (
              <div
                key={project.id}
                onClick={() => selectProject(project.id)}
                className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                      {project.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-xs text-white ${
                      project.urgency === 'Critical' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}>
                      {project.urgency}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Meter & Financials */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end text-xs font-semibold text-slate-600">
                      <span>{percentRaised}% raised</span>
                      <span>Goal: ${project.goalAmount.toLocaleString()}</span>
                    </div>
                    {/* Meter bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${percentRaised}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                      <span className="font-semibold text-emerald-600">${project.raisedAmount.toLocaleString()} given</span>
                      <span className="font-mono text-[10px]">{project.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "Confidence In Your Contribution" Pillar Modules */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
              Confidence in your contribution.
            </h2>
            <p className="text-slate-500">
              Unlike traditional donation platforms that keep you in the dark, Kindred is engineered from the ground up for radical oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Traced Dollars</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We assign unique identifier logs to every backed amount, generating automatic, visual flowcharts detailing field spending, logistics, and capital distribution.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Landmark className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Verified Local Partners</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We coordinate only with registered, legal grassroots community co-ops. They provide real-time updates directly from ground zero using mobile mesh hubs.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Milestone className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">Milestone-Based Capital Releases</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Funds are held securely and released in tranches only when active milestones are met, cataloged, and signed off by independent auditors.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Clean CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-lg">
          {/* Subtle backgrounds */}
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500 to-emerald-700 opacity-60 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
              Ready to be the catalyst for change?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Join thousands of transparent, global impact donors backing verified grassroots leaders. Start tracking your direct, local impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => setPage('browse')}
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Browse Active Projects
              </button>
              <button
                onClick={() => setPage('auth')}
                className="bg-emerald-700/60 hover:bg-emerald-700/80 text-white font-semibold border border-emerald-400/30 px-6 py-3.5 rounded-xl text-sm transition-all active:scale-98 cursor-pointer"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
