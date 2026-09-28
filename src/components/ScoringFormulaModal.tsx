import React, { useState } from 'react';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { DEFAULT_WEIGHTS, AlignmentWeights, calculateAlignmentScore } from '../services/intelligenceEngine';

interface ScoringFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScoringFormulaModal: React.FC<ScoringFormulaModalProps> = ({ isOpen, onClose }) => {
  const [weights, setWeights] = useState<AlignmentWeights>(DEFAULT_WEIGHTS);

  const [sampleInputs] = useState({
    skillCoverage: 58,
    proficiencyMatch: 70,
    industryDemand: 88,
    locationRelevance: 80,
    courseCoverage: 45,
    placementEvidence: 62,
  });

  if (!isOpen) return null;

  const currentResult = calculateAlignmentScore(sampleInputs, weights);

  const handleReset = () => {
    setWeights(DEFAULT_WEIGHTS);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#191211]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-[#e6dbcb] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#f4eee4] border-b border-[#e6dbcb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#eedcca] text-[#351404] rounded-lg border border-[#c39079]">
              <Sliders className="w-4 h-4 text-[#804237]" />
            </div>
            <div>
              <h3 className="font-bold text-[#191211] text-base">
                Alignment Scoring Architecture
              </h3>
              <p className="text-xs text-[#574844]">
                Transparent linear multi-factor weighting model (PS 26134 Requirement)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#574844] hover:text-[#191211] rounded-md hover:bg-[#eedcca]/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 text-xs text-[#574844]">
          {/* Formula Display */}
          <div className="p-3.5 bg-[#191211] text-[#eedcca] rounded-xl font-mono text-[11px] leading-relaxed shadow-inner border border-[#351404]">
            <div className="text-[#c39079] text-[10px] uppercase tracking-wider mb-1 font-sans font-semibold">
              Mathematical Specification:
            </div>
            <div>
              <span className="text-[#eedcca] font-bold">Alignment Score</span> = <br />
              &nbsp;&nbsp;(&mu;<sub>skill</sub> &times; <span className="text-[#c39079]">{(weights.skillCoverage).toFixed(2)}</span>) +
              &nbsp;&nbsp;(&mu;<sub>prof</sub> &times; <span className="text-[#c39079]">{(weights.proficiencyMatch).toFixed(2)}</span>) + <br />
              &nbsp;&nbsp;(&mu;<sub>demand</sub> &times; <span className="text-[#c39079]">{(weights.industryDemand).toFixed(2)}</span>) +
              &nbsp;&nbsp;(&mu;<sub>loc</sub> &times; <span className="text-[#c39079]">{(weights.locationRelevance).toFixed(2)}</span>) + <br />
              &nbsp;&nbsp;(&mu;<sub>course</sub> &times; <span className="text-[#c39079]">{(weights.courseCoverage).toFixed(2)}</span>) +
              &nbsp;&nbsp;(&mu;<sub>placement</sub> &times; <span className="text-[#c39079]">{(weights.placementEvidence).toFixed(2)}</span>)
            </div>
          </div>

          {/* Interactive Weight Sliders */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-[#191211] uppercase tracking-wider text-[11px]">
                Configurable Component Weights (Sum = 1.00)
              </span>
              <button
                onClick={handleReset}
                className="text-[#804237] hover:text-[#351404] text-[11px] font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Skill Coverage (&mu;<sub>skill</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.skillCoverage * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.60"
                  step="0.05"
                  value={weights.skillCoverage}
                  onChange={(e) => setWeights({ ...weights, skillCoverage: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Proficiency Match (&mu;<sub>prof</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.proficiencyMatch * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.40"
                  step="0.05"
                  value={weights.proficiencyMatch}
                  onChange={(e) => setWeights({ ...weights, proficiencyMatch: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Industry Demand (&mu;<sub>demand</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.industryDemand * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.30"
                  step="0.05"
                  value={weights.industryDemand}
                  onChange={(e) => setWeights({ ...weights, industryDemand: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Location Relevance (&mu;<sub>loc</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.locationRelevance * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.25"
                  step="0.05"
                  value={weights.locationRelevance}
                  onChange={(e) => setWeights({ ...weights, locationRelevance: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Course Coverage (&mu;<sub>course</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.courseCoverage * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.25"
                  step="0.05"
                  value={weights.courseCoverage}
                  onChange={(e) => setWeights({ ...weights, courseCoverage: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <div className="flex justify-between mb-1">
                  <span>Placement Evidence (&mu;<sub>placement</sub>)</span>
                  <span className="font-mono font-semibold text-[#191211]">{weights.placementEvidence * 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.20"
                  step="0.01"
                  value={weights.placementEvidence}
                  onChange={(e) => setWeights({ ...weights, placementEvidence: parseFloat(e.target.value) })}
                  className="w-full accent-[#804237] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Live Calculated Output */}
          <div className="p-3.5 bg-[#eedcca]/40 border border-[#c39079] rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-[#351404] uppercase">
                Simulated Output on Sample Profile
              </div>
              <div className="text-xs text-[#574844] mt-0.5">
                Formula result dynamically reflects active policy weights.
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-mono text-[#804237]">
                {currentResult.overallScore}%
              </span>
              <span className="block text-[10px] text-[#351404] uppercase font-semibold">
                Alignment Index
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#f4eee4] border-t border-[#e6dbcb] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#804237] hover:bg-[#351404] text-white rounded-lg text-xs font-semibold"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
