import React, { useState } from 'react';
import {
  Calculator,
  Sliders,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Users,
  GraduationCap,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { WhatIfScenarioInput, DistrictId } from '../types';
import { runWhatIfSimulation } from '../services/intelligenceEngine';
import { DISTRICTS_DATA } from '../data/seedData';
import { NavItemKey } from '../components/Sidebar';

interface WhatIfSimulatorViewProps {
  selectedDistrict: DistrictId;
  onNavigate: (view: NavItemKey) => void;
  onOpenWhy: () => void;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  selectedDistrict,
  onNavigate,
  onOpenWhy,
}) => {
  const activeDistrictObj = DISTRICTS_DATA.find((d) => d.id === selectedDistrict) || DISTRICTS_DATA[0];

  // Default sliders
  const defaultScenario: WhatIfScenarioInput = {
    additionalTrainers: 10,
    additionalSeats: 200,
    equipmentBudgetLakhs: 18,
    newCoursesAdded: 2,
  };

  const [scenario, setScenario] = useState<WhatIfScenarioInput>(defaultScenario);

  const baseline = {
    coverage: 61,
    gap: 39,
  };

  const result = runWhatIfSimulation(baseline, scenario);

  const handleReset = () => {
    setScenario({
      additionalTrainers: 0,
      additionalSeats: 0,
      equipmentBudgetLakhs: 0,
      newCoursesAdded: 0,
    });
  };

  const handleSetPresetAggressive = () => {
    setScenario({
      additionalTrainers: 16,
      additionalSeats: 350,
      equipmentBudgetLakhs: 30,
      newCoursesAdded: 4,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Strategic Decision Support Engine
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            What-If Policy Simulator: {activeDistrictObj.name} District
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Test policy levers (+seats, +faculty, +lab capital, +specialized courses) to project real-time ROI and demand coverage before committing public funds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSetPresetAggressive}
            className="px-3 py-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
          >
            Load Aggressive Growth Scenario
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-600"
            title="Reset Sliders to Baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BEFORE vs SIMULATED COMPARISON BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Baseline Demand Coverage */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
            CURRENT PLAN
          </span>
          <div className="text-2xl font-bold font-mono text-stone-800 mt-1">
            {result.baselineCoverage}%
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Baseline Demand Coverage
          </div>
          <div className="mt-2 text-[11px] text-stone-500">
            Unmet Skill Gap: <strong className="text-rose-700 font-mono">{result.baselineGap}%</strong>
          </div>
        </div>

        {/* Simulated Demand Coverage */}
        <div className="bg-white p-4 rounded-xl border border-teal-500 shadow-xs ring-1 ring-teal-500">
          <span className="text-[10px] font-mono text-teal-700 uppercase font-semibold">
            SIMULATED OUTCOME
          </span>
          <div className="text-2xl font-bold font-mono text-teal-800 mt-1">
            {result.simulatedCoverage}%
          </div>
          <div className="text-xs text-teal-700 font-medium mt-0.5">
            Simulated Demand Coverage
          </div>
          <div className="mt-2 text-[11px] text-teal-900 font-medium">
            Gain: <strong className="font-mono text-emerald-700">+{result.simulatedCoverage - result.baselineCoverage} percentage points</strong>
          </div>
        </div>

        {/* Residual Gap */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
            RESIDUAL SKILL GAP
          </span>
          <div className="text-2xl font-bold font-mono text-stone-800 mt-1">
            {result.simulatedGap}%
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Remaining Deficit Post-Intervention
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium">
            Reduced by -{result.baselineGap - result.simulatedGap} points
          </div>
        </div>

        {/* Estimated Job-Ready Graduates */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <span className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
            JOB-READY COHORT
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">
            +{result.estimatedGraduatesJobReady}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            Graduates Ready for Industry Absorption
          </div>
          <div className="mt-2 text-[11px] text-stone-500">
            Simulated Policy ROI Score: <strong className="font-mono text-stone-800">{result.roiScore}</strong>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CONTROLS & DELTA BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-stone-900">
              Interactive Policy Levers
            </h2>
            <span className="text-[11px] text-stone-400">
              Drag to recompute live system impact
            </span>
          </div>

          {/* Lever 1: Additional Trainers */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-700" />
                Additional Certified Master Trainers:
              </span>
              <span className="text-sm font-bold font-mono text-teal-800">
                +{scenario.additionalTrainers} faculty
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={scenario.additionalTrainers}
              onChange={(e) => setScenario({ ...scenario, additionalTrainers: parseInt(e.target.value) })}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>0 trainers</span>
              <span>12 (recommended)</span>
              <span>25 trainers</span>
            </div>
          </div>

          {/* Lever 2: Additional Seats */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-teal-700" />
                Additional Polytechnic & ITI Seats:
              </span>
              <span className="text-sm font-bold font-mono text-teal-800">
                +{scenario.additionalSeats} student seats
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="20"
              value={scenario.additionalSeats}
              onChange={(e) => setScenario({ ...scenario, additionalSeats: parseInt(e.target.value) })}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>0 seats</span>
              <span>200 (optimal)</span>
              <span>500 seats</span>
            </div>
          </div>

          {/* Lever 3: Equipment Budget */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-600" />
                Capital Equipment & Lab Budget:
              </span>
              <span className="text-sm font-bold font-mono text-amber-800">
                +₹{scenario.equipmentBudgetLakhs} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              value={scenario.equipmentBudgetLakhs}
              onChange={(e) => setScenario({ ...scenario, equipmentBudgetLakhs: parseInt(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>₹0L</span>
              <span>₹24L (budget cap)</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* Lever 4: New Courses Added */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                New Industry-Aligned Courses Commissioned:
              </span>
              <span className="text-sm font-bold font-mono text-indigo-800">
                +{scenario.newCoursesAdded} courses
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={scenario.newCoursesAdded}
              onChange={(e) => setScenario({ ...scenario, newCoursesAdded: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
              <span>0 courses</span>
              <span>2 courses</span>
              <span>6 courses</span>
            </div>
          </div>
        </div>

        {/* Marginal Gains Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-stone-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                ATTRIBUTION ANALYSIS
              </span>
              <h2 className="text-base font-bold text-stone-900">
                Marginal Gains Breakdown
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                How each policy lever contributes to the net +{result.simulatedCoverage - result.baselineCoverage}% coverage gain.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-700">Trainers Upskilling Contribution</span>
                  <span className="font-mono font-bold text-teal-800">+{result.breakdown.trainerContribution}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-700 h-2 rounded-full" style={{ width: `${result.breakdown.trainerContribution * 4}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-700">Seat Capacity Expansion Contribution</span>
                  <span className="font-mono font-bold text-teal-800">+{result.breakdown.seatsContribution}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-stone-800 h-2 rounded-full" style={{ width: `${result.breakdown.seatsContribution * 4}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-700">Equipment Lab Modernization Contribution</span>
                  <span className="font-mono font-bold text-teal-800">+{result.breakdown.budgetContribution}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${result.breakdown.budgetContribution * 4}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-700">New Specialized Courses Contribution</span>
                  <span className="font-mono font-bold text-teal-800">+{result.breakdown.courseContribution}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${result.breakdown.courseContribution * 4}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 space-y-2">
            <button
              onClick={onOpenWhy}
              className="w-full py-2 px-3 text-xs text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 font-medium"
            >
              Why are these coefficients modeled this way?
            </button>
            <button
              onClick={() => onNavigate('district_planner')}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg flex items-center justify-center gap-1.5"
            >
              <span>Commit Scenario to District Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
