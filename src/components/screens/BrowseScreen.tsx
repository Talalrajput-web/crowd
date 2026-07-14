import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Category, Urgency, Project } from '../../types';
import { Search, MapPin, Grid, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export default function BrowseScreen() {
  const { projects, selectProject } = useApp();

  // State filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categories list
  const categories: string[] = ['All', 'Education', 'Environment', 'Healthcare', 'Human Rights'];

  // Urgencies list
  const urgencies = [
    { id: 'All', label: 'All Urgencies', icon: null },
    { id: 'Critical', label: 'Critical', icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
    { id: 'Trending', label: 'Trending', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
    { id: 'Near Goal', label: 'Near Goal', icon: CheckCircle, color: 'text-blue-500 bg-blue-50' },
  ];

  // Unique locations from project dataset
  const locations = useMemo(() => {
    const list = new Set<string>();
    projects.forEach(p => {
      // Split location and get country (last element after comma)
      const parts = p.location.split(',');
      const country = parts[parts.length - 1].trim();
      list.add(country);
    });
    return ['All', ...Array.from(list)];
  }, [projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 1. Search Query
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.organizationName.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category
      const matchCategory = selectedCategory === 'All' || project.category === selectedCategory;

      // 3. Location (Country match)
      const matchLocation = selectedLocation === 'All' || project.location.includes(selectedLocation);

      // 4. Urgency
      const matchUrgency = selectedUrgency === 'All' || project.urgency === selectedUrgency;

      return matchSearch && matchCategory && matchLocation && matchUrgency;
    });
  }, [projects, searchQuery, selectedCategory, selectedLocation, selectedUrgency]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="browse-screen">
      
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Discover Impact
        </h1>
        <p className="text-slate-500">
          Fund pre-vetted grassroots campaigns with absolute transparency. Track every cent from pledge to field.
        </p>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl space-y-6">
            
            {/* 1. Category filter list */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {cat === 'All' ? 'All Projects' : cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 2. Location Select Dropdown */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                Region / Country
              </h3>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 3. Urgency Checkboxes or Pill Buttons */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                Urgency Status
              </h3>
              <div className="space-y-2">
                {urgencies.map((urg) => {
                  const Icon = urg.icon;
                  const isSelected = selectedUrgency === urg.id;
                  return (
                    <button
                      key={urg.id}
                      onClick={() => setSelectedUrgency(urg.id)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      {Icon && <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />}
                      <span>{urg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Column: Active Projects Catalogue Grid */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Search Bar & Grid Layout Stats */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 p-4 border border-slate-100 rounded-2xl">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, countries, or organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono shrink-0">
              Showing {filteredProjects.length} of {projects.length} Campaigns
            </div>
          </div>

          {/* Grid of Cards */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.goalAmount) * 100));
                return (
                  <div
                    key={project.id}
                    onClick={() => selectProject(project.id)}
                    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Upper Thumbnail Section */}
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold text-white shadow-xs uppercase tracking-wider ${
                          project.urgency === 'Critical' ? 'bg-red-500' : 'bg-emerald-500'
                        }`}>
                          {project.urgency}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-2">
                        {/* Org Banner Row */}
                        <div className="flex items-center gap-1.5">
                          <img
                            src={project.organizationAvatar}
                            alt={project.organizationName}
                            className="h-4 w-4 rounded-full object-cover border border-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs font-semibold text-slate-500 truncate max-w-[150px]">
                            {project.organizationName}
                          </span>
                          {project.verified && (
                            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded-sm flex items-center gap-0.5">
                              ✓ Verified
                            </span>
                          )}
                        </div>

                        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-300 shrink-0" />
                          {project.location}
                        </p>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Financials Gauge */}
                      <div className="space-y-2 pt-2 border-t border-slate-50">
                        <div className="flex justify-between items-end text-xs font-semibold text-slate-600">
                          <span>{percentRaised}% Raised</span>
                          <span>Goal: ${project.goalAmount.toLocaleString()}</span>
                        </div>
                        {/* Meter bar */}
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${percentRaised}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span className="font-semibold text-emerald-600">
                            ${project.raisedAmount.toLocaleString()} funded
                          </span>
                          <span className="font-mono text-[10px]">{project.daysLeft} days left</span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl space-y-3">
              <Grid className="h-12 w-12 text-slate-300 mx-auto" />
              <p className="text-slate-700 font-display font-semibold text-lg">No campaigns found</p>
              <p className="text-slate-400 text-sm max-w-sm mx-auto">
                No active projects match your search keywords or filter values. Try resetting your criteria or searching another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLocation('All');
                  setSelectedUrgency('All');
                  setSearchQuery('');
                }}
                className="bg-slate-900 text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Simple Pagination */}
          <div className="flex justify-center items-center gap-2 pt-4">
            <button className="px-3.5 py-1.5 border border-slate-200 text-xs font-semibold text-slate-500 rounded-lg cursor-not-allowed bg-slate-50">
              Previous
            </button>
            <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg">
              1
            </span>
            <button className="px-3.5 py-1.5 border border-slate-200 text-xs font-semibold text-slate-500 rounded-lg cursor-not-allowed bg-slate-50">
              Next
            </button>
          </div>

        </main>

      </div>

    </div>
  );
}
