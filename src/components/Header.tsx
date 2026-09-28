import React from 'react';
import {
  MapPin,
  Play,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { DistrictId, SectorId, UserRole } from '../types';
import { DISTRICTS_DATA } from '../data/seedData';

interface HeaderProps {
  selectedDistrict: DistrictId;
  onSelectDistrict: (d: DistrictId) => void;
  selectedSector: SectorId;
  onSelectSector: (s: SectorId) => void;
  currentRole: UserRole;
  onChangeRole: (r: UserRole) => void;
  onStartJudgeDemo: () => void;
  isJudgeDemoActive: boolean;
  onOpenFormulaModal: () => void;
  onNavigateToAnomalies: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedDistrict,
  onSelectDistrict,
  currentRole,
  onChangeRole,
  onStartJudgeDemo,
  isJudgeDemoActive,
  onOpenFormulaModal,
}) => {
  return (
    <header className="bg-white border-b border-[#e6dbcb] sticky top-0 z-30 shadow-2xs">
      {/* Top micro-bar with heritage cream tone */}
      <div className="bg-[#f4eee4] border-b border-[#e6dbcb]/80 px-4 sm:px-6 py-1 text-[11px] text-[#574844] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#804237] inline-block"></span>
          <span className="font-semibold text-[#351404]">Govt. of Maharashtra</span>
          <span className="text-[#c39079]">•</span>
          <span className="hidden sm:inline">Maharashtra State Innovation Society (MSInS)</span>
          <span className="text-[#c39079] hidden sm:inline">•</span>
          <span className="font-mono text-[10px] text-[#804237]">SIH PS 26134</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFormulaModal}
            className="text-[#574844] hover:text-[#351404] transition-colors flex items-center gap-1 text-[11px]"
          >
            <HelpCircle className="w-3 h-3 text-[#c39079]" />
            <span>How scoring works</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#351404] text-[#eedcca] flex items-center justify-center font-bold text-sm tracking-tight shadow-xs border border-[#804237]/40">
            SF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#191211] tracking-tight">
                SkillForge Maharashtra
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#eedcca] text-[#351404] border border-[#c39079]">
                Labour Market Intelligence
              </span>
            </div>
            <p className="text-[11px] text-[#574844] hidden sm:block">
              Evidence-based skill alignment & training optimization
            </p>
          </div>
        </div>

        {/* Controls: District Selector, Role Picker, Demo Mode */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* District Selector */}
          <div className="flex items-center bg-[#f9f6f0] hover:bg-[#eedcca]/40 border border-[#e6dbcb] rounded-lg px-2.5 py-1.5 text-xs transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#804237] mr-1.5 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => onSelectDistrict(e.target.value as DistrictId)}
              className="bg-transparent font-medium text-[#191211] focus:outline-hidden cursor-pointer text-xs"
            >
              {DISTRICTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clean Segmented Role Switcher */}
          <div className="hidden md:flex items-center bg-[#eedcca]/50 p-0.5 rounded-lg border border-[#e6dbcb] text-xs">
            <button
              onClick={() => onChangeRole('government')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                currentRole === 'government'
                  ? 'bg-[#351404] text-[#eedcca] shadow-2xs font-semibold'
                  : 'text-[#574844] hover:text-[#191211]'
              }`}
            >
              Government
            </button>
            <button
              onClick={() => onChangeRole('institute')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                currentRole === 'institute'
                  ? 'bg-[#351404] text-[#eedcca] shadow-2xs font-semibold'
                  : 'text-[#574844] hover:text-[#191211]'
              }`}
            >
              Institute
            </button>
            <button
              onClick={() => onChangeRole('candidate')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                currentRole === 'candidate'
                  ? 'bg-[#351404] text-[#eedcca] shadow-2xs font-semibold'
                  : 'text-[#574844] hover:text-[#191211]'
              }`}
            >
              Candidate
            </button>
          </div>

          {/* Start Demo Button in Warm Heritage Rust */}
          <button
            onClick={onStartJudgeDemo}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
              isJudgeDemoActive
                ? 'bg-[#351404] text-[#eedcca] ring-2 ring-[#c39079]'
                : 'bg-[#804237] hover:bg-[#351404] text-white'
            }`}
          >
            <Play className="w-3 h-3 fill-current text-[#eedcca]" />
            <span className="whitespace-nowrap">
              {isJudgeDemoActive ? 'Demo Active' : 'Start Demo Tour'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
