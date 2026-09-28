import React from 'react';
import { X, CheckCircle, FileText, Layers, TrendingUp, Users, Cpu, ShieldCheck } from 'lucide-react';
import { AuditRecommendationRecord } from '../types';

interface WhyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  record: AuditRecommendationRecord | null;
  onNavigateToAudit?: () => void;
}

export const WhyPanel: React.FC<WhyPanelProps> = ({
  isOpen,
  onClose,
  record,
  onNavigateToAudit,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-[#191211]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-[#e6dbcb]">
        {/* Header */}
        <div className="p-4 border-b border-[#e6dbcb] flex items-center justify-between bg-[#f4eee4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#eedcca] text-[#351404] border border-[#c39079]">
                {record.recCode}
              </span>
              <span className="text-xs text-[#574844] font-mono">
                {record.generatedDate}
              </span>
            </div>
            <h2 className="text-base font-bold text-[#191211] mt-1">
              Why This Recommendation?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#574844] hover:text-[#191211] rounded-md hover:bg-[#eedcca]/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm flex-1">
          {/* Action Card */}
          <div className="p-3.5 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
            <div className="text-[11px] font-semibold text-[#804237] uppercase tracking-wider">
              Recommended Action
            </div>
            <div className="text-[#191211] font-semibold mt-1">
              {record.actionTitle}
            </div>
            <div className="mt-2 text-xs text-[#574844] flex items-center gap-3">
              <span><strong>Target:</strong> {record.targetEntity}</span>
              <span>•</span>
              <span><strong>District:</strong> {record.districtName}</span>
            </div>
          </div>

          {/* AI Confidence Meter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-[#351404] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#804237]" />
                Algorithm Confidence Score
              </span>
              <span className="text-sm font-bold text-[#804237] font-mono">
                {record.confidenceScorePercent}%
              </span>
            </div>
            <div className="w-full bg-[#eedcca]/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#804237] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${record.confidenceScorePercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-[#574844] mt-1">
              Confidence derived from multi-signal triangulation across job postings, employer consultations, and regional placement reports.
            </p>
          </div>

          {/* 5-Factor Evidence Weights */}
          <div>
            <h3 className="text-xs font-semibold text-[#191211] uppercase tracking-wider mb-2.5">
              5-Factor Evidence Composition
            </h3>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#574844] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#804237]" />
                    Job Posting Signals (Observed Demand)
                  </span>
                  <span className="font-mono font-semibold text-[#191211]">
                    {record.evidenceFactors.jobPostingSignalsPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#eedcca]/60 rounded-full h-1.5">
                  <div
                    className="bg-[#191211] h-1.5 rounded-full"
                    style={{ width: `${record.evidenceFactors.jobPostingSignalsPercent * 2}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#574844] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#804237]" />
                    Employer Validation Consensus
                  </span>
                  <span className="font-mono font-semibold text-[#191211]">
                    {record.evidenceFactors.employerValidationPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#eedcca]/60 rounded-full h-1.5">
                  <div
                    className="bg-[#804237] h-1.5 rounded-full"
                    style={{ width: `${record.evidenceFactors.employerValidationPercent * 2.5}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#574844] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#804237]" />
                    Sector Growth & Industrial Trajectory
                  </span>
                  <span className="font-mono font-semibold text-[#191211]">
                    {record.evidenceFactors.sectorGrowthPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#eedcca]/60 rounded-full h-1.5">
                  <div
                    className="bg-[#351404] h-1.5 rounded-full"
                    style={{ width: `${record.evidenceFactors.sectorGrowthPercent * 3.5}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#574844] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#804237]" />
                    Placement Outcomes & Employer Absorption
                  </span>
                  <span className="font-mono font-semibold text-[#191211]">
                    {record.evidenceFactors.placementOutcomesPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#eedcca]/60 rounded-full h-1.5">
                  <div
                    className="bg-[#c39079] h-1.5 rounded-full"
                    style={{ width: `${record.evidenceFactors.placementOutcomesPercent * 4}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#574844] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#804237]" />
                    Emerging Tech Trend Benchmark
                  </span>
                  <span className="font-mono font-semibold text-[#191211]">
                    {record.evidenceFactors.emergingTechTrendPercent}%
                  </span>
                </div>
                <div className="w-full bg-[#eedcca]/60 rounded-full h-1.5">
                  <div
                    className="bg-[#574844] h-1.5 rounded-full"
                    style={{ width: `${record.evidenceFactors.emergingTechTrendPercent * 6}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Reasoning & Evidence Observations */}
          <div>
            <h3 className="text-xs font-semibold text-[#191211] uppercase tracking-wider mb-2">
              Empirical Evidence Observations
            </h3>
            <ul className="space-y-2">
              {record.reasoningNotes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-[#574844] bg-[#f9f6f0] p-2.5 rounded-lg border border-[#e6dbcb]"
                >
                  <CheckCircle className="w-4 h-4 text-[#804237] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e6dbcb] bg-[#f4eee4] flex items-center justify-between">
          <div className="text-xs text-[#574844] font-mono">
            Model: Deterministic Triangulation v2.4
          </div>
          <button
            onClick={() => {
              onClose();
              if (onNavigateToAudit) onNavigateToAudit();
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#804237] text-white hover:bg-[#351404]"
          >
            Inspect in Full Audit Log →
          </button>
        </div>
      </div>
    </div>
  );
};
