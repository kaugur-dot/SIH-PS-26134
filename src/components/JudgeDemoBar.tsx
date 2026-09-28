import React from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { DistrictId, SectorId, UserRole } from '../types';

export interface DemoStep {
  stepNumber: number;
  title: string;
  badge: string;
  targetView: string;
  districtId: DistrictId;
  sectorId: SectorId;
  roleId: string;
  courseId: string;
  userRole: UserRole;
  narrative: string;
  keyTakeaway: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Industry Demand Surge',
    badge: 'Signals & Labour Trends',
    targetView: 'demand_radar',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'The engine scans 12,480 job postings and flags a +38% demand spike for Cybersecurity Analysts in Maharashtra.',
    keyTakeaway: 'Automated signal extraction replaces static annual surveys.',
  },
  {
    stepNumber: 2,
    title: 'District Training Deficit',
    badge: 'Regional Imbalance',
    targetView: 'overview',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'Pune shows high industry demand (84) but local training capacity lags at 61, leaving an acute gap of 23 points.',
    keyTakeaway: 'Flags regional talent shortages before industrial bottlenecks emerge.',
  },
  {
    stepNumber: 3,
    title: 'Skill Gap Breakdown',
    badge: 'Signature Feature',
    targetView: 'gap_simulator',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'Deep skill analysis isolates the gap: Linux, Networking, SIEM, and Cloud Security are severely under-taught.',
    keyTakeaway: 'Moves from generic IT training to granular competency-level gap isolation.',
  },
  {
    stepNumber: 4,
    title: 'Course Alignment Analysis',
    badge: 'Curriculum Audit',
    targetView: 'course_alignment',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'institute',
    narrative:
      'Current polytechnic course scored only 54% alignment due to legacy modules like desktop hardware repair.',
    keyTakeaway: 'Transparent scoring explains low placement rates.',
  },
  {
    stepNumber: 5,
    title: 'Curriculum Modernization',
    badge: 'Curriculum Lab',
    targetView: 'curriculum_lab',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'institute',
    narrative:
      'Recommends an actionable 5-module revision: adding Linux hardening, Wireshark, and virtual SIEM cyber range.',
    keyTakeaway: 'Produces ready-to-review syllabus modules mapped to AICTE/MSIS norms.',
  },
  {
    stepNumber: 6,
    title: 'Employer Consensus',
    badge: 'Industry Evidence',
    targetView: 'employer_validation',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      '27 Pune employers confirm that fresh graduates lack practical command-line Linux and SIEM log experience.',
    keyTakeaway: 'Evidence-based consensus aligns public funds with real hiring.',
  },
  {
    stepNumber: 7,
    title: 'District Optimizer (OR-Tools)',
    badge: 'Constraint Optimization',
    targetView: 'district_planner',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'Constraint optimization balances 25:1 trainer ratios, physical labs, and budget to compute optimal seat plans.',
    keyTakeaway: 'Replaces ad-hoc seat distribution with mathematical linear programming.',
  },
  {
    stepNumber: 8,
    title: 'What-If Policy Simulation',
    badge: 'Decision Support',
    targetView: 'what_if',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'Policy makers test scenario levers: +8 trainers and +200 seats boosts demand coverage from 25% to 79%.',
    keyTakeaway: 'Simulate policy ROI before allocating public budgets.',
  },
  {
    stepNumber: 9,
    title: 'Candidate Career Pathway',
    badge: 'Personal Guidance',
    targetView: 'candidate_pathway',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'candidate',
    narrative:
      'For student Aditya, the system assesses his 41% profile and maps the exact 5 skills and local courses to become job-ready.',
    keyTakeaway: 'Connects high-level state planning directly to individual youth career growth.',
  },
  {
    stepNumber: 10,
    title: 'Audit & Explainability',
    badge: 'Governance & Trust',
    targetView: 'audit',
    districtId: 'pune',
    sectorId: 'it_software',
    roleId: 'cybersecurity_analyst',
    courseId: 'crs_cyber_pune',
    userRole: 'government',
    narrative:
      'Every action has an immutable record (REC-1042) with a 5-factor mathematical evidence breakdown and 87% confidence.',
    keyTakeaway: 'Full accountability and transparent evidence meet strict public governance.',
  },
];

interface JudgeDemoBarProps {
  currentStepIndex: number;
  isActive: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectStep: (index: number) => void;
}

export const JudgeDemoBar: React.FC<JudgeDemoBarProps> = ({
  currentStepIndex,
  isActive,
  onClose,
  onNext,
  onPrev,
  onSelectStep,
}) => {
  if (!isActive) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  return (
    <div className="bg-[#191211] text-[#eedcca] border-b border-[#351404] shadow-md sticky top-[49px] z-20 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Left: Step Badge & Narrative */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex items-center gap-1 bg-[#804237]/40 text-[#eedcca] text-[11px] font-semibold px-2 py-0.5 rounded border border-[#c39079]/40 shrink-0">
              <Sparkles className="w-3 h-3 text-[#c39079]" />
              Tour Step {currentStep.stepNumber}/10
            </span>

            <div className="min-w-0">
              <span className="text-xs font-semibold text-white mr-2">
                {currentStep.title}:
              </span>
              <span className="text-xs text-[#eedcca]/80 truncate inline-block max-w-md sm:max-w-lg">
                {currentStep.narrative}
              </span>
            </div>
          </div>

          {/* Right: Step controls */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            {/* Dots */}
            <div className="hidden lg:flex items-center gap-1 mr-2">
              {DEMO_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => onSelectStep(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-4 bg-[#c39079]'
                      : idx < currentStepIndex
                      ? 'bg-[#804237] hover:bg-[#c39079]'
                      : 'bg-[#351404] hover:bg-[#804237]'
                  }`}
                  title={`Step ${s.stepNumber}: ${s.title}`}
                />
              ))}
            </div>

            <button
              onClick={onPrev}
              disabled={currentStepIndex === 0}
              className="px-2.5 py-1 text-xs rounded bg-[#351404] hover:bg-[#804237]/60 disabled:opacity-30 text-[#eedcca] flex items-center gap-1 border border-[#c39079]/30"
            >
              <ChevronLeft className="w-3 h-3" />
              Back
            </button>

            <button
              onClick={onNext}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className="px-3 py-1 text-xs font-semibold rounded bg-[#804237] hover:bg-[#351404] disabled:opacity-30 text-white flex items-center gap-1 shadow-xs border border-[#c39079]/30"
            >
              <span>Next</span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#c39079] hover:text-white rounded hover:bg-[#351404]"
              title="Close tour"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
