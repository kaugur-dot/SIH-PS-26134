import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle,
  FileText,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { AuditRecommendationRecord } from '../types';
import { AUDIT_RECOMMENDATIONS } from '../data/seedData';

interface AuditExplainabilityViewProps {
  onSelectWhyRecord: (r: AuditRecommendationRecord) => void;
}

export const AuditExplainabilityView: React.FC<AuditExplainabilityViewProps> = ({
  onSelectWhyRecord,
}) => {
  const [recommendations, setRecommendations] = useState<AuditRecommendationRecord[]>(AUDIT_RECOMMENDATIONS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRecId, setSelectedRecId] = useState<string>(AUDIT_RECOMMENDATIONS[0].id);

  const activeRecord = recommendations.find((r) => r.id === selectedRecId) || recommendations[0];

  const handleUpdateStatus = (id: string, newStatus: 'Approved' | 'Pending Review' | 'In Progress') => {
    setRecommendations(
      recommendations.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredRecs = recommendations.filter((r) => {
    const matchesSearch =
      r.recCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.actionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.targetEntity.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && r.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Public Sector Governance & Transparency
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Audit Trail & Algorithmic Explainability Ledger
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Immutable log of all system-generated curriculum updates, seat expansions, and capital equipment authorizations with 5-factor mathematical evidence breakdowns.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Search REC code or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-800 focus:outline-hidden focus:border-teal-600"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-800 focus:outline-hidden"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending review">Pending Review</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Audit List & Detailed Audit Certificate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recommendations List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Logged Recommendations ({filteredRecs.length})
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredRecs.map((rec) => {
              const isSelected = rec.id === activeRecord.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecId(rec.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-600 shadow-xs ring-1 ring-teal-500'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                      {rec.recCode}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      rec.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-stone-900 mt-2 line-clamp-2">
                    {rec.actionTitle}
                  </h3>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{rec.category} • {rec.districtName}</span>
                    <span className="font-mono font-bold text-teal-800">
                      Confidence: {rec.confidenceScorePercent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Official Certificate View (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
                  {activeRecord.recCode}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Logged: {activeRecord.generatedDate}
                </span>
              </div>
              <h2 className="text-base font-bold text-stone-900 mt-1.5">
                {activeRecord.actionTitle}
              </h2>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Algorithm Confidence</div>
              <div className="text-2xl font-bold font-mono text-teal-800">
                {activeRecord.confidenceScorePercent}%
              </div>
            </div>
          </div>

          {/* Target & Scope Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase block">Target Institution / Cluster</span>
              <span className="font-semibold text-stone-800 mt-0.5 block">{activeRecord.targetEntity}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase block">Intervention Category</span>
              <span className="font-semibold text-stone-800 mt-0.5 block">{activeRecord.category}</span>
            </div>
          </div>

          {/* 5-Factor Evidence Composition */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
              Empirical Evidence Weight Allocation
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] text-stone-500 block">Job Signals</span>
                <span className="font-mono font-bold text-stone-900 mt-0.5 block">
                  {activeRecord.evidenceFactors.jobPostingSignalsPercent}%
                </span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] text-stone-500 block">Employers</span>
                <span className="font-mono font-bold text-stone-900 mt-0.5 block">
                  {activeRecord.evidenceFactors.employerValidationPercent}%
                </span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] text-stone-500 block">Sector Growth</span>
                <span className="font-mono font-bold text-stone-900 mt-0.5 block">
                  {activeRecord.evidenceFactors.sectorGrowthPercent}%
                </span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] text-stone-500 block">Placements</span>
                <span className="font-mono font-bold text-stone-900 mt-0.5 block">
                  {activeRecord.evidenceFactors.placementOutcomesPercent}%
                </span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                <span className="text-[10px] text-stone-500 block">Tech Trends</span>
                <span className="font-mono font-bold text-stone-900 mt-0.5 block">
                  {activeRecord.evidenceFactors.emergingTechTrendPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Reasoning observations */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              Specific Evidentiary Findings
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {activeRecord.reasoningNotes.map((note, i) => (
                <li key={i} className="p-2.5 bg-stone-50 rounded border border-stone-200 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Governance Controls */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onSelectWhyRecord(activeRecord)}
              className="text-xs text-teal-700 hover:text-teal-900 font-medium underline"
            >
              Open Full Explainability Drawer →
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(activeRecord.id, 'Approved')}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold shadow-2xs"
              >
                Approve Recommendation
              </button>
              <button
                onClick={() => handleUpdateStatus(activeRecord.id, 'In Progress')}
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium border border-stone-300"
              >
                Mark In Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
