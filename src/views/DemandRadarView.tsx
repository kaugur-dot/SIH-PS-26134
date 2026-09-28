import React, { useState } from 'react';
import {
  Radar,
  TrendingUp,
  MapPin,
  Briefcase,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { DistrictId, SectorId, JobRole } from '../types';
import { JOB_ROLES, DISTRICTS_DATA, SECTORS_DATA, SKILLS_MASTER } from '../data/seedData';
import { NavItemKey } from '../components/Sidebar';

interface DemandRadarViewProps {
  selectedDistrict: DistrictId;
  selectedSector: SectorId;
  onNavigate: (view: NavItemKey) => void;
  onOpenWhy: () => void;
}

export const DemandRadarView: React.FC<DemandRadarViewProps> = ({
  selectedDistrict,
  selectedSector,
  onNavigate,
  onOpenWhy,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('cybersecurity_analyst');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeRole = JOB_ROLES.find((r) => r.id === selectedRoleId) || JOB_ROLES[0];

  // Filter roles based on selectedSector or searchQuery
  const filteredRoles = JOB_ROLES.filter((r) => {
    const matchesSector = selectedSector === 'it_software' ? true : r.sectorId === selectedSector;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Real-time Market Telemetry
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Demand Radar: Maharashtra Job Requisitions
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Aggregating 12,480 observed labour market signals across Maharashtra corporate hubs and industrial corridors.
          </p>
        </div>

        {/* Quick Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search roles or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-teal-600"
            />
          </div>

          <div className="flex items-center bg-stone-50 border border-stone-300 rounded px-2.5 py-1 text-xs">
            <span className="text-stone-400 mr-1 text-[11px]">Experience:</span>
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="bg-transparent font-medium text-stone-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Levels (0-5 yrs)</option>
              <option value="entry">Entry / Freshers (0-1 yr)</option>
              <option value="mid">Associate (2-3 yrs)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Role Selector List (Left 4 cols) & Role Demand Deep-Dive (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Role Cards List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Observed Roles ({filteredRoles.length})
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredRoles.map((role) => {
              const isSelected = role.id === activeRole.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-600 shadow-xs ring-1 ring-teal-500'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-stone-900">
                        {role.title}
                      </h2>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {role.avgSalaryLpa}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ↑ {role.sixMonthGrowthPercent}%
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">
                      Demand Index: <strong className="text-stone-800 font-mono">{role.demandIndex}/100</strong>
                    </span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      {role.openSignals.toLocaleString()} signals
                    </span>
                  </div>

                  {/* Primary districts tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {role.primaryDistricts.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 font-medium capitalize"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Role Breakdown & Skill Bars */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Role Card Header */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  SECTOR: {SECTORS_DATA.find((s) => s.id === activeRole.sectorId)?.name || 'IT & Software'}
                </span>
                <h2 className="text-lg font-bold text-stone-900 mt-1">
                  {activeRole.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    Hubs: {activeRole.primaryDistricts.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(' • ')}
                  </span>
                  <span>•</span>
                  <span>Avg Package: <strong>{activeRole.avgSalaryLpa}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Demand Index</div>
                  <div className="text-2xl font-bold font-mono text-stone-900">
                    {activeRole.demandIndex}<span className="text-xs text-stone-400">/100</span>
                  </div>
                </div>

                <div className="text-right border-l border-stone-200 pl-4">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">6M Growth</div>
                  <div className="text-2xl font-bold font-mono text-emerald-700">
                    +{activeRole.sixMonthGrowthPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Required Skills Frequency & Weight Bars */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Top Required Skills in Employer Requisitions
                </h3>
                <span className="text-[11px] text-stone-400">
                  Frequency weighted from active job postings
                </span>
              </div>

              <div className="space-y-3">
                {activeRole.requiredSkills.map((req, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-900">
                          {req.skillName}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          req.proficiency === 'Advanced'
                            ? 'bg-rose-100 text-rose-800'
                            : req.proficiency === 'Intermediate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}>
                          {req.proficiency}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-800">
                        {req.weight}% frequency
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-stone-800 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${req.weight}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proficiency Standards Panel */}
            <div className="mt-5 pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                Expected Practical Proficiency Thresholds
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeRole.proficiencyRequirements.map((prof, i) => (
                  <div key={i} className="p-2.5 bg-stone-50 rounded border border-stone-200 text-xs">
                    <div className="flex items-center justify-between text-stone-800 font-semibold mb-1">
                      <span>{prof.skillName}</span>
                      <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-1.5 rounded">
                        {prof.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      {prof.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onOpenWhy}
                className="text-xs text-teal-700 hover:text-teal-900 font-medium underline flex items-center gap-1"
              >
                Why this demand assessment? (Evidence Panel)
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('gap_simulator')}
                  className="px-3.5 py-1.5 rounded text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1"
                >
                  Simulate Gaps for this Role →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
