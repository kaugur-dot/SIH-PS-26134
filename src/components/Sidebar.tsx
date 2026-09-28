import React, { useState } from 'react';
import {
  LayoutDashboard,
  Radar,
  SlidersHorizontal,
  FlaskConical,
  Map,
  Calculator,
  UserCheck,
  Network,
  FileCheck2,
  Building,
  ShieldAlert,
  ClipboardList,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

export type NavItemKey =
  | 'overview'
  | 'demand_radar'
  | 'gap_simulator'
  | 'curriculum_lab'
  | 'district_planner'
  | 'what_if'
  | 'candidate_pathway'
  | 'skill_intelligence'
  | 'course_alignment'
  | 'employer_validation'
  | 'data_integrity'
  | 'audit';

interface SidebarProps {
  activeView: NavItemKey;
  onSelectView: (view: NavItemKey) => void;
  currentRole: UserRole;
  isJudgeDemoActive: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  currentRole,
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Primary User Workflows
  const primaryItems: {
    key: NavItemKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    tag?: string;
  }[] = [
    {
      key: 'overview',
      label: 'Overview Dashboard',
      icon: LayoutDashboard,
    },
    {
      key: 'demand_radar',
      label: 'Demand Radar',
      icon: Radar,
    },
    {
      key: 'gap_simulator',
      label: 'Skill Gap Simulator',
      icon: SlidersHorizontal,
      highlight: true,
      tag: 'Core Demo',
    },
    {
      key: 'curriculum_lab',
      label: 'Curriculum Lab',
      icon: FlaskConical,
    },
    {
      key: 'district_planner',
      label: 'District Planner',
      icon: Map,
    },
    {
      key: 'what_if',
      label: 'What-If Simulator',
      icon: Calculator,
      tag: 'Sandbox',
    },
    {
      key: 'candidate_pathway',
      label: 'Candidate Guidance',
      icon: UserCheck,
    },
  ];

  // Secondary Tools & Governance
  const secondaryItems: {
    key: NavItemKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      key: 'skill_intelligence',
      label: 'Skill Knowledge Graph',
      icon: Network,
    },
    {
      key: 'course_alignment',
      label: 'Course Register',
      icon: FileCheck2,
    },
    {
      key: 'employer_validation',
      label: 'Employer Validation',
      icon: Building,
    },
    {
      key: 'data_integrity',
      label: 'Data Integrity Audit',
      icon: ShieldAlert,
    },
    {
      key: 'audit',
      label: 'Audit & REC Logs',
      icon: ClipboardList,
    },
  ];

  const isAdvancedActive = secondaryItems.some((item) => item.key === activeView);

  return (
    <aside className="w-60 bg-white border-r border-[#e6dbcb] shrink-0 hidden md:flex flex-col justify-between h-[calc(100vh-6.5rem)] sticky top-20 overflow-y-auto rounded-r-lg">
      <div className="p-3">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#804237] uppercase">
          Core Workflows
        </div>

        <nav className="space-y-1">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onSelectView(item.key)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#eedcca]/60 text-[#351404] font-semibold border-l-3 border-[#804237] shadow-2xs'
                    : 'text-[#574844] hover:bg-[#f9f6f0] hover:text-[#191211]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#804237]' : 'text-[#c39079]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.tag && (
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                      item.highlight
                        ? 'bg-[#804237] text-white'
                        : 'bg-[#eedcca] text-[#351404] border border-[#c39079]'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapsible Secondary Tools */}
        <div className="mt-4 pt-3 border-t border-[#e6dbcb]/60">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-bold tracking-wider text-[#804237] uppercase hover:text-[#351404] transition-colors"
          >
            <span>Analytics & Audit</span>
            {showAdvanced || isAdvancedActive ? (
              <ChevronDown className="w-3.5 h-3.5 text-[#c39079]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-[#c39079]" />
            )}
          </button>

          {(showAdvanced || isAdvancedActive) && (
            <div className="mt-1 space-y-1 animate-in fade-in duration-150">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => onSelectView(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg font-medium transition-all text-left ${
                      isActive
                        ? 'bg-[#eedcca]/70 text-[#351404] font-semibold'
                        : 'text-[#574844] hover:bg-[#f9f6f0] hover:text-[#191211]'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-[#804237]' : 'text-[#c39079]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Role Context badge */}
      <div className="p-3 border-t border-[#e6dbcb]/60 bg-[#f9f6f0] text-[11px] text-[#574844] flex items-center justify-between">
        <span>Active Role:</span>
        <span className="font-semibold text-[#351404] capitalize bg-white px-2 py-0.5 rounded border border-[#e6dbcb]">
          {currentRole}
        </span>
      </div>
    </aside>
  );
};
