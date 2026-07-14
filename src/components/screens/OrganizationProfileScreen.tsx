import { useApp } from '../../context/AppContext';
import { INITIAL_ORGANIZATION } from '../../data';
import { Calendar, ShieldCheck, Trophy, Sparkles, Quote, MapPin } from 'lucide-react';

export default function OrganizationProfileScreen() {
  const { projects, selectProject } = useApp();
  const org = INITIAL_ORGANIZATION;

  // Find projects belonging to this organization
  const orgProjects = projects.filter(p => p.organizationId === org.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="org-profile-screen">
      
      {/* 1. Hero Organization Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-md">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-slate-900 via-slate-950 to-transparent opacity-80" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <img
            src={org.avatar}
            alt={org.name}
            className="h-24 w-24 rounded-2xl object-cover border-2 border-white/20 bg-white"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                VERIFIED PARTNER
              </span>
              <span className="text-xs font-mono text-slate-400">Partner since 2018</span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-none">
              {org.name}
            </h1>
            
            <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
              {org.bio}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Organization Bio Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Bento Box 1: Our Mission */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-display font-extrabold text-sm uppercase tracking-wider">Our Mission & Mandate</h3>
          </div>
          <p className="text-slate-700 font-display font-extrabold text-lg leading-snug">
            "{org.mission}"
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            By partnering with local native tribal structures, we bypass large-scale bureaucratic friction. Our funding feeds direct salaries, native agricultural supplies, and decentralized solar facilities. Every invoice is scanned, compiled, and uploaded.
          </p>
        </div>

        {/* Bento Box 2: Impact Stats */}
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Trophy className="h-4 w-4" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">Verified Pulse Metrics</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-xs">Total Impact Raised:</span>
              <span className="text-2xl font-display font-black text-slate-900">{org.totalImpactRaised}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-xs">Projects Completed:</span>
              <span className="text-2xl font-display font-black text-slate-900">{org.projectsCompleted}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-xs font-semibold text-emerald-600">Audit Success Rate:</span>
              <span className="text-2xl font-display font-black text-emerald-600">{org.successRate}%</span>
            </div>
          </div>
          
          <div className="text-[10px] text-slate-400 leading-tight font-mono">
            Audited quarterly by global nonprofit consensus protocols.
          </div>
        </div>

        {/* Bento Box 3: Tribe/Ambassador Quote Column */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-4">
            <Quote className="h-8 w-8 text-slate-200" />
            <p className="text-slate-600 text-sm italic leading-relaxed">
              "{org.teamQuote}"
            </p>
            <div>
              <p className="text-sm font-bold text-slate-800">{org.teamQuoteAuthor}</p>
              <p className="text-xs text-slate-400 font-medium">{org.teamQuoteRole}</p>
            </div>
          </div>
          <div className="h-48 rounded-xl overflow-hidden bg-slate-100 relative shadow-inner">
            <img
              src={org.teamImage}
              alt="Tribal leaders and volunteers"
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </section>

      {/* 3. Active Projects Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Active Campaigns under Governance
          </h2>
          <p className="text-slate-500 text-sm">
            Support these direct initiatives monitored and coordinated by the {org.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgProjects.map((project) => {
            const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));
            return (
              <div
                key={project.id}
                onClick={() => selectProject(project.id)}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image header */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-800">
                      {project.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${
                      project.urgency === 'Critical' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}>
                      {project.urgency}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-300" />
                      {project.location}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Funding stats bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end text-xs font-semibold text-slate-600">
                      <span>{percentRaised}% Raised</span>
                      <span>Goal: ${project.goalAmount.toLocaleString()}</span>
                    </div>
                    {/* Meter bar */}
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${percentRaised}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="font-semibold text-emerald-600">
                        ${project.raisedAmount.toLocaleString()} funded
                      </span>
                      <span className="font-mono text-[9px]">{project.daysLeft} days left</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
