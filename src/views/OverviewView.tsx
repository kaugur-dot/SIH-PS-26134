import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  Map,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { DistrictId } from '../types';
import { DISTRICTS_DATA } from '../data/seedData';
import { NavItemKey } from '../components/Sidebar';

interface OverviewViewProps {
  selectedDistrict: DistrictId;
  onSelectDistrict: (d: DistrictId) => void;
  onNavigate: (view: NavItemKey) => void;
  onOpenWhy: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onNavigate,
  onOpenWhy,
}) => {
  const [activeTab, setActiveTab] = useState<'demand' | 'districts'>('demand');

  const topGrowthDemands = [
    { skill: 'Cybersecurity & Threat Triage', growth: '+38%', index: 82, roles: 'SOC Analyst, Security Eng', location: 'Pune, Mumbai', hot: true },
    { skill: 'Cloud Architecture & DevOps', growth: '+41%', index: 90, roles: 'Cloud Engineer, DevOps', location: 'Pune, Mumbai, Nagpur' },
    { skill: 'Battery Management Systems (EV)', growth: '+44%', index: 87, roles: 'EV Powertrain Tech', location: 'Pune, Nashik' },
    { skill: 'Full Stack Web (React & Node)', growth: '+27%', index: 88, roles: 'Full Stack Dev', location: 'Pune, Mumbai, Thane' },
  ];

  const activeDistrict = DISTRICTS_DATA.find((d) => d.id === selectedDistrict) || DISTRICTS_DATA[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Welcoming Hero Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#e6dbcb] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#804237]"></span>
            <span className="text-[11px] font-bold text-[#351404] uppercase tracking-wider">
              Maharashtra Labour Market Intelligence
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191211] tracking-tight mt-1">
            SkillForge Dashboard
          </h1>
          <p className="text-xs text-[#574844] mt-1 max-w-xl">
            Connecting industry hiring demand directly with polytechnic curriculums and district training capacity.
          </p>
        </div>

        {/* Quick Launch CTA */}
        <button
          onClick={() => onNavigate('gap_simulator')}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#804237] hover:bg-[#351404] text-white flex items-center gap-2 shadow-xs transition-all self-start md:self-auto"
        >
          <span>Run Skill Gap Simulator</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#eedcca]" />
        </button>
      </div>

      {/* 2. Top 4 Digestible Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs">
          <div className="text-[11px] font-medium text-[#574844]">Industry Signals</div>
          <div className="text-2xl font-bold text-[#191211] font-mono mt-1">12,480</div>
          <div className="text-[11px] text-[#804237] font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#804237]" />
            +18% growth
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs border-l-4 border-l-[#804237]">
          <div className="text-[11px] font-medium text-[#574844]">Active Skill Gaps</div>
          <div className="text-2xl font-bold text-[#804237] font-mono mt-1">137</div>
          <div className="text-[11px] text-[#804237] mt-1">Requiring syllabus updates</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs">
          <div className="text-[11px] font-medium text-[#574844]">Districts Monitored</div>
          <div className="text-2xl font-bold text-[#191211] font-mono mt-1">36</div>
          <div className="text-[11px] text-[#574844] mt-1">100% state coverage</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs border-l-4 border-l-[#351404]">
          <div className="text-[11px] font-medium text-[#574844]">Employer Endorsements</div>
          <div className="text-2xl font-bold text-[#351404] font-mono mt-1">214</div>
          <div className="text-[11px] text-[#574844] mt-1">Industry partners</div>
        </div>
      </div>

      {/* 3. Three Clean, Action-Oriented Cards */}
      <div>
        <div className="text-xs font-bold text-[#804237] uppercase tracking-wider mb-2.5 px-1">
          Recommended Workflows
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => onNavigate('gap_simulator')}
            className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs hover:border-[#804237] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#eedcca] text-[#351404] flex items-center justify-center mb-2.5 group-hover:bg-[#804237] group-hover:text-white transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold text-[#191211] group-hover:text-[#804237] flex items-center justify-between">
              <span>1. Detect Course Skill Gaps</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#c39079] group-hover:translate-x-0.5 transition-transform" />
            </h2>
            <p className="text-[11px] text-[#574844] mt-1 leading-snug">
              Compare job demand against existing polytechnic courses like Cybersecurity or Web Dev.
            </p>
          </div>

          <div
            onClick={() => onNavigate('district_planner')}
            className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs hover:border-[#804237] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#eedcca] text-[#351404] flex items-center justify-center mb-2.5 group-hover:bg-[#804237] group-hover:text-white transition-colors">
              <Map className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold text-[#191211] group-hover:text-[#804237] flex items-center justify-between">
              <span>2. Plan Training Capacity</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#c39079] group-hover:translate-x-0.5 transition-transform" />
            </h2>
            <p className="text-[11px] text-[#574844] mt-1 leading-snug">
              Optimize seat allocations, trainer upskilling quotas, and lab budgets with OR-Tools.
            </p>
          </div>

          <div
            onClick={() => onNavigate('candidate_pathway')}
            className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs hover:border-[#804237] hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#eedcca] text-[#351404] flex items-center justify-center mb-2.5 group-hover:bg-[#804237] group-hover:text-white transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold text-[#191211] group-hover:text-[#804237] flex items-center justify-between">
              <span>3. Guide Student Pathways</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#c39079] group-hover:translate-x-0.5 transition-transform" />
            </h2>
            <p className="text-[11px] text-[#574844] mt-1 leading-snug">
              Give candidates a personalized roadmap with exact skills and local subsidized courses.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Segmented Intelligence View */}
      <div className="bg-white rounded-2xl border border-[#e6dbcb] shadow-xs p-5 space-y-4">
        {/* Clean Pill Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6dbcb]/60">
          <div>
            <h2 className="text-sm font-bold text-[#191211]">
              State Intelligence Highlights
            </h2>
            <p className="text-xs text-[#574844]">
              Select what you want to explore first
            </p>
          </div>

          <div className="flex items-center bg-[#eedcca]/40 p-1 rounded-lg border border-[#e6dbcb] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('demand')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'demand'
                  ? 'bg-[#351404] text-[#eedcca] shadow-2xs font-semibold'
                  : 'text-[#574844] hover:text-[#191211]'
              }`}
            >
              Top In-Demand Skills
            </button>
            <button
              onClick={() => setActiveTab('districts')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'districts'
                  ? 'bg-[#351404] text-[#eedcca] shadow-2xs font-semibold'
                  : 'text-[#574844] hover:text-[#191211]'
              }`}
            >
              Regional Gaps by District
            </button>
          </div>
        </div>

        {/* TAB 1: DEMAND */}
        {activeTab === 'demand' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topGrowthDemands.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.hot
                      ? 'bg-[#eedcca]/30 border-[#c39079]'
                      : 'bg-[#f9f6f0] border-[#e6dbcb]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#191211]">
                          {item.skill}
                        </span>
                        {item.hot && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eedcca] text-[#351404] border border-[#c39079] uppercase">
                            Focus
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#574844] mt-1">
                        Roles: {item.roles}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#804237] bg-[#eedcca]/60 px-2 py-0.5 rounded border border-[#c39079] shrink-0">
                      ↑ {item.growth}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-[#e6dbcb]/60 rounded-full h-1.5 mt-3">
                    <div
                      className={`h-1.5 rounded-full ${item.hot ? 'bg-[#804237]' : 'bg-[#351404]'}`}
                      style={{ width: `${item.index}%` }}
                    ></div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-[#574844]">
                    <span>Demand Index: <strong className="text-[#191211] font-mono">{item.index}/100</strong></span>
                    <span>Hubs: {item.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigate('demand_radar')}
                className="text-xs font-semibold text-[#804237] hover:text-[#351404] flex items-center gap-1"
              >
                <span>Explore all roles in Demand Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DISTRICTS */}
        {activeTab === 'districts' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {DISTRICTS_DATA.map((dist) => {
                const isSelected = selectedDistrict === dist.id;
                return (
                  <div
                    key={dist.id}
                    onClick={() => onSelectDistrict(dist.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#eedcca]/50 border-[#804237] ring-2 ring-[#804237]/30'
                        : 'bg-[#f9f6f0] border-[#e6dbcb] hover:bg-[#eedcca]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191211]">
                        {dist.name}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        dist.gapScore > 20
                          ? 'bg-[#804237] text-white'
                          : 'bg-[#eedcca] text-[#351404] border border-[#c39079]'
                      }`}>
                        -{dist.gapScore} pts
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-[#574844] space-y-1">
                      <div className="flex justify-between">
                        <span>Industry Demand:</span>
                        <strong className="font-mono text-[#191211]">{dist.demandIndex}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Training Seats:</span>
                        <strong className="font-mono text-[#804237]">{dist.trainingCapacity}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#574844] text-[11px]">
                Selected District: <strong className="text-[#191211]">{activeDistrict.name}</strong>
              </span>
              <button
                onClick={() => onNavigate('district_planner')}
                className="font-semibold text-[#804237] hover:text-[#351404] flex items-center gap-1"
              >
                <span>Launch District Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
