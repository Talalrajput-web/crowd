import { useState, FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Users, Calendar, ArrowLeft, Heart, MessageSquare, Landmark, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailScreen() {
  const {
    projects,
    selectedProjectId,
    setPage,
    prepareDonation,
    currentUser,
    addComment,
    contributions
  } = useApp();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];

  const [activeTab, setActiveTab] = useState<'story' | 'updates' | 'comments' | 'transparency'>('story');
  
  // Donation Selection State
  const [selectedPreset, setSelectedPreset] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  
  // New Comment state
  const [commentText, setCommentText] = useState<string>('');

  const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));

  const handlePresetSelect = (val: number) => {
    setSelectedPreset(val);
    setCustomAmount('');
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedPreset(0);
  };

  const getDonationAmount = (): number => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedPreset;
  };

  const handleDonateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalAmount = getDonationAmount();
    if (finalAmount <= 0) {
      alert('Please select or input a valid donation amount.');
      return;
    }
    // Prepare donation draft and redirect to checkout
    prepareDonation(project.id, finalAmount, isRecurring);
  };

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(project.id, commentText);
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="project-detail-screen">
      
      {/* Navigation Breadcrumb */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage('browse')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </button>
        <span className="text-xs font-mono text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1">
          Project ID: {project.id}
        </span>
      </div>

      {/* Main Title Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border">
            {project.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs ${
            project.urgency === 'Critical' ? 'bg-red-500' : 'bg-emerald-500'
          }`}>
            {project.urgency}
          </span>
        </div>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
          {project.title}
        </h1>

        {/* Organization detail bar */}
        <div className="flex flex-wrap items-center gap-4 py-2">
          <div
            onClick={() => setPage('org-profile')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={project.organizationAvatar}
              alt={project.organizationName}
              className="h-9 w-9 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                {project.organizationName}
                {project.verified && (
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded-sm">
                    ✓ Verified
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-400">{project.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Image Gallery */}
      {project.images && project.images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 aspect-video md:aspect-[3/1.2] rounded-3xl overflow-hidden shadow-xs">
          {/* Main Hero Photo */}
          <div className="md:col-span-2 relative h-full w-full bg-slate-100">
            <img
              src={project.images[0]}
              alt={`${project.title} detail`}
              className="h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Split Right Side Square Photos */}
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="flex-1 relative bg-slate-100 overflow-hidden">
              <img
                src={project.images[1] || project.image}
                alt="Incubating tree"
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 relative bg-slate-100 overflow-hidden">
              <img
                src={project.images[2] || project.image}
                alt="Community work"
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                <span className="text-white text-xs font-display font-extrabold uppercase tracking-widest">
                  View All 24 Photos
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-100 relative">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Core 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Thirds: Tabs, Story, Updates, Comments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom Tabs Navigation */}
          <div className="border-b border-slate-100 flex gap-4 overflow-x-auto pb-px">
            {(['story', 'updates', 'comments', 'transparency'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 text-sm font-semibold border-b-2 transition-all shrink-0 capitalize cursor-pointer ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'transparency' ? 'Transparency Report' : tab}
                {tab === 'comments' && ` (${project.comments.length})`}
                {tab === 'updates' && ` (${project.updates.length})`}
              </button>
            ))}
          </div>

          {/* Tab Content Panels */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl min-h-[300px]">
            
            {/* Tab: Story */}
            {activeTab === 'story' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-lg text-slate-900">The Challenge</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{project.challenge}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-lg text-slate-900">Our Approach</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{project.fullStory}</p>
                </div>

                {/* Transparency Promise Box */}
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100/60 flex gap-3">
                  <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-emerald-900">Our Radical Transparency Promise</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed mt-1">
                      Kindred audits every single dollar. This campaign operates under a milestone-based fund release model. Capital is sent to regional organizers only once active milestones are photographed and signed off.
                    </p>
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-sm text-slate-800 uppercase tracking-wider">How Your Support Works</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Fund solar temperature storage and construction supplies for regional seed vaults.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Provide organic agricultural training and fair salaries to native community co-ops.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                      <span>Finance smart, low-power GPS tags to monitor tree survival rates for 5 years.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Updates */}
            {activeTab === 'updates' && (
              <div className="space-y-6">
                {project.updates && project.updates.length > 0 ? (
                  project.updates.map((update) => (
                    <div key={update.id} className="p-4 bg-slate-50 border rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/60 text-slate-700">
                          {update.tag}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{update.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900">{update.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{update.content}</p>
                      
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                        <img src={update.avatar} alt={update.author} className="h-6 w-6 rounded-full object-cover border" />
                        <span className="text-xs font-semibold text-slate-500">Posted by {update.author}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 space-y-2">
                    <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
                    <p className="text-slate-600 font-semibold">No updates posted yet</p>
                    <p className="text-slate-400 text-xs">The project team will upload active progress updates once initial targets are reached.</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Comments */}
            {activeTab === 'comments' && (
              <div className="space-y-6">
                {/* Comment Form */}
                {currentUser ? (
                  <form onSubmit={handlePostComment} className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a message of support..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 flex items-center justify-center cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-3 bg-slate-50 border rounded-xl text-center text-xs text-slate-400">
                    Please <button onClick={() => setPage('auth')} className="text-emerald-600 font-semibold hover:underline">sign in</button> to write a message of support.
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {project.comments && project.comments.length > 0 ? (
                    project.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                        <img
                          src={comment.userAvatar}
                          alt={comment.userName}
                          className="h-8 w-8 rounded-full object-cover border"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-slate-800">{comment.userName}</span>
                              {comment.amountDonated > 0 && (
                                <span className="inline-flex items-center text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-sm border border-emerald-100">
                                  Verified Backer • ${comment.amountDonated.toFixed(0)}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{comment.date}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 space-y-2 text-slate-400">
                      <MessageSquare className="h-10 w-10 text-slate-300 mx-auto" />
                      <p className="font-semibold text-sm">No messages yet</p>
                      <p className="text-xs">Be the first to leave an encouraging comment.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Transparency Report */}
            {activeTab === 'transparency' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg text-slate-900">Transparency Budget Allocations</h3>
                  <p className="text-sm text-slate-500">
                    We strictly split all collected funds to guarantee that administrative and overhead costs remain tiny, dedicating the vast majority to actual field deployment.
                  </p>
                </div>

                {/* Chart representation */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Field Operations ({project.dollarDistribution.field}%)</span>
                      <span className="font-mono text-emerald-600">${Math.round(project.raisedAmount * (project.dollarDistribution.field / 100)).toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${project.dollarDistribution.field}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400">Salaries, native seeds, physical storage vaults, off-grid hardware, local training logistics.</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Strategic Reserves ({project.dollarDistribution.reserves}%)</span>
                      <span className="font-mono text-blue-600">${Math.round(project.raisedAmount * (project.dollarDistribution.reserves / 100)).toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${project.dollarDistribution.reserves}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400">Emergency climatic buffers, ecological technical support, seasonal contingencies.</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Administrative & Audits ({project.dollarDistribution.admin}%)</span>
                      <span className="font-mono text-slate-600">${Math.round(project.raisedAmount * (project.dollarDistribution.admin / 100)).toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400" style={{ width: `${project.dollarDistribution.admin}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400">Auditing certifications, processing fees, digital security maintenance.</p>
                  </div>
                </div>

                {/* Simulated Bank/Audit Logs */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <h4 className="font-display font-extrabold text-sm text-slate-800 uppercase tracking-wider">Verified expenditure audit history</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-600">
                          <th className="p-3">Reference ID</th>
                          <th className="p-3">Item Description</th>
                          <th className="p-3">Category</th>
                          <th className="p-3 text-right">Amount Out</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-slate-600">
                        <tr>
                          <td className="p-3">TX-AUD-104</td>
                          <td className="p-3">Solar Panels & Power Inverters</td>
                          <td className="p-3 font-sans text-blue-600">Field Hardware</td>
                          <td className="p-3 text-right font-semibold">$8,450.00</td>
                        </tr>
                        <tr>
                          <td className="p-3">TX-AUD-103</td>
                          <td className="p-3">Elders Co-op Direct Compensations</td>
                          <td className="p-3 font-sans text-emerald-600">Local Salaries</td>
                          <td className="p-3 text-right font-semibold">$12,000.00</td>
                        </tr>
                        <tr>
                          <td className="p-3">TX-AUD-102</td>
                          <td className="p-3">50,000 GPS Mesh Sensors</td>
                          <td className="p-3 font-sans text-purple-600">Monitoring</td>
                          <td className="p-3 text-right font-semibold">$6,200.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Right Third: Donation Actions Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs space-y-6">
            
            {/* Funding stats gauge */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-2xl font-display font-black text-slate-900">
                    ${project.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    raised of ${project.goalAmount.toLocaleString()} goal
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1">
                  {percentRaised}% Funded
                </span>
              </div>

              {/* Meter bar */}
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${percentRaised}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-50">
                <div>
                  <span className="block text-sm font-extrabold text-slate-800">{project.donorCount}</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Backers</span>
                </div>
                <div className="border-x border-slate-100">
                  <span className="block text-sm font-extrabold text-slate-800">{project.daysLeft}</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Days Left</span>
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-800">98%</span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Audited</span>
                </div>
              </div>
            </div>

            {/* Donation Selector Form */}
            <form onSubmit={handleDonateSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Backing Tier
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedPreset === preset
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Or Custom Amount ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    min="5"
                    placeholder="Other amount..."
                    value={customAmount}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-800 font-semibold placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Recurring Switch */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-slate-700">Make Recurring?</span>
                  <span className="block text-[10px] text-slate-400 leading-none">Charge this amount monthly</span>
                </div>
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Donate Now
              </button>
            </form>

            {/* Secures and tax disclosure */}
            <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl text-center space-y-1.5">
              <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                Your backing is processed securely. Kindred is a registered 501(c)(3). Receipts generated automatically to tax file records.
              </p>
            </div>

            {/* Recent donors timeline */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-display font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                Recent Contributions
              </h4>
              <div className="space-y-3">
                {project.comments.filter(c => c.amountDonated > 0).slice(0, 3).map((comment) => (
                  <div key={comment.id} className="flex items-center gap-2.5 text-xs">
                    <img src={comment.userAvatar} alt="" className="h-7 w-7 rounded-full object-cover border" />
                    <div className="flex-1 truncate">
                      <p className="font-bold text-slate-800 truncate">{comment.userName}</p>
                      <p className="text-[10px] text-slate-400">Backed with <span className="font-semibold text-emerald-600">${comment.amountDonated.toFixed(0)}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
