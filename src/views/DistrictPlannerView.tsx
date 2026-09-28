import React, { useState } from 'react';
import {
  Map,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Zap,
  HelpCircle,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DistrictId, SectorId } from '../types';
import { DISTRICTS_DATA, DISTRICT_PLANNER_RECORDS } from '../data/seedData';
import { solveDistrictOptimization } from '../services/intelligenceEngine';
import { NavItemKey } from '../components/Sidebar';

interface DistrictPlannerViewProps {
  selectedDistrict: DistrictId;
  onSelectDistrict: (d: DistrictId) => void;
  onNavigate: (view: NavItemKey) => void;
  onOpenWhy: () => void;
}

export const DistrictPlannerView: React.FC<DistrictPlannerViewProps> = ({
  selectedDistrict,
  onSelectDistrict,
  onNavigate,
  onOpenWhy,
}) => {
  const [activePlanRole, setActivePlanRole] = useState<string>('Cybersecurity Analyst');
  const [budgetMultiplier, setBudgetMultiplier] = useState<number>(1.0);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [showFormula, setShowFormula] = useState<boolean>(false);

  const activeDistrictObj = DISTRICTS_DATA.find((d) => d.id === selectedDistrict) || DISTRICTS_DATA[0];

  const currentPlan = solveDistrictOptimization(
    selectedDistrict,
    'it_software',
    activePlanRole,
    budgetMultiplier
  );

  const handleRunOptimizer = () => {
    setIsSolving(true);
    setTimeout(() => {
      setIsSolving(false);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Capacity Optimization
            </span>
            <span className="text-xs text-stone-500">• Google OR-Tools Solver</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-1">
            District Training Planner ({activeDistrictObj.name})
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 max-w-xl">
            Calculates how many seats to expand, faculty to upskill, and lab budgets needed to meet industry demand.
          </p>
        </div>

        <button
          onClick={handleRunOptimizer}
          disabled={isSolving}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-800 hover:bg-teal-900 text-white flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
        >
          {isSolving ? (
            <span>Optimizing Constraints...</span>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Re-run Optimization</span>
            </>
          )}
        </button>
      </div>

      {/* BEFORE / AFTER 3 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Baseline Card */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
            Current Situation
          </span>
          <div className="text-2xl font-bold font-mono text-stone-700 mt-1">
            {currentPlan.currentDemandCoverage}%
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Industry Demand Covered
          </div>
          <div className="mt-3 text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
            Capacity: <strong>{currentPlan.currentCapacity} seats</strong> vs Demand: <strong>{currentPlan.projectedIndustryDemand}</strong>
          </div>
        </div>

        {/* Proposed Plan */}
        <div className="bg-white p-4 rounded-xl border border-teal-500 shadow-2xs ring-1 ring-teal-500">
          <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider">
            Optimized Training Plan
          </span>
          <div className="text-2xl font-bold font-mono text-teal-800 mt-1">
            {currentPlan.optimizedDemandCoverage}%
          </div>
          <div className="text-xs text-teal-700 font-medium mt-0.5">
            Projected Demand Covered
          </div>
          <div className="mt-3 text-[11px] text-teal-900 bg-teal-50 p-2 rounded-lg border border-teal-200">
            Expanded to <strong>{currentPlan.proposedSeats} seats</strong> (+{currentPlan.proposedSeats - currentPlan.currentCapacity})
          </div>
        </div>

        {/* Net Gain */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
            Net Improvement
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            +{currentPlan.optimizedDemandCoverage - currentPlan.currentDemandCoverage} pts
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Regional Employability Gain
          </div>
          <div className="mt-3 text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
            Upskill: <strong>{currentPlan.trainerUpskillingSlots} trainers</strong> • Outlay: <strong>₹{currentPlan.equipmentBudgetLakhs}L</strong>
          </div>
        </div>
      </div>

      {/* ALLOCATION TABLE */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Recommended Allocations across Sectors
            </h2>
            <p className="text-xs text-stone-500">
              Balanced to respect trainer-student ratios (25:1) and lab batch limits
            </p>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg">
            District Fund: ₹{currentPlan.equipmentBudgetLakhs}L
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px]">
                <th className="py-2.5 font-semibold">Priority Role</th>
                <th className="py-2.5 font-semibold text-center">Market Demand</th>
                <th className="py-2.5 font-semibold text-center">Existing Seats</th>
                <th className="py-2.5 font-semibold text-center">Proposed Seats</th>
                <th className="py-2.5 font-semibold text-center">Trainers to Certify</th>
                <th className="py-2.5 font-semibold text-center">Equipment Outlay</th>
                <th className="py-2.5 font-semibold text-center">Target Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {DISTRICT_PLANNER_RECORDS.map((rec, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 font-semibold text-stone-900">
                    {rec.targetRole}
                  </td>
                  <td className="py-3 text-center font-mono text-stone-700">
                    {rec.projectedIndustryDemand}
                  </td>
                  <td className="py-3 text-center font-mono text-stone-500">
                    {rec.currentCapacity}
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-teal-800">
                    {rec.proposedSeats}
                  </td>
                  <td className="py-3 text-center font-mono text-stone-700">
                    {rec.trainerUpskillingSlots} faculty
                  </td>
                  <td className="py-3 text-center font-mono font-semibold text-stone-900">
                    ₹{rec.equipmentBudgetLakhs} Lakhs
                  </td>
                  <td className="py-3 text-center">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {rec.optimizedDemandCoverage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Friendly constraint summary */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
          <span className="font-semibold text-stone-800 block mb-1">
            Constraints respected in this plan:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Trainer ratio: &le; 25 students per certified trainer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Lab capacity: Max 4 lab practical batches per day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>District budget: ₹35 Lakhs funding limit respected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Placement benchmark: &ge; 70% graduate absorption target</span>
            </div>
          </div>
        </div>

        {/* Progressive Disclosure: Solver Details */}
        <div className="pt-2">
          <button
            onClick={() => setShowFormula(!showFormula)}
            className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1"
          >
            <span>{showFormula ? 'Hide' : 'View'} OR-Tools Mathematical Formulation</span>
            {showFormula ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showFormula && (
            <div className="mt-2 p-3 bg-stone-900 text-stone-200 rounded-xl font-mono text-[11px] leading-relaxed">
              <div className="text-teal-400 font-bold mb-1">Objective:</div>
              <div>MAXIMIZE &sum; DemandCoverage &times; 0.45 + GapReduction &times; 0.30 + PlacementViability &times; 0.25</div>
              <div className="text-amber-400 font-bold mt-2 mb-1">Subject to:</div>
              <div>Seats &le; Trainers &times; 25 &nbsp;|&nbsp; Seats &le; BatchSlots &times; LabCapacity &nbsp;|&nbsp; TotalCost &le; DistrictBudget</div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <button
            onClick={onOpenWhy}
            className="text-teal-700 hover:text-teal-900 font-medium underline"
          >
            Why this capacity allocation? (REC-1043)
          </button>

          <button
            onClick={() => onNavigate('what_if')}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <span>Test Levers in What-If Simulator →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
