import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  HelpCircle,
  FileText,
  Send,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CourseRecord } from '../types';
import { COURSES_DATA } from '../data/seedData';

interface CurriculumLabViewProps {
  onOpenWhy: () => void;
}

export const CurriculumLabView: React.FC<CurriculumLabViewProps> = ({ onOpenWhy }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('crs_cyber_pune');
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const activeCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  const handleApprove = () => {
    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Syllabus Re-Engineering Workspace
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Curriculum Lab: Evidence-Based Course Modernization
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Module-by-module diff inspection, obsolescence pruning, and alignment mapping for Maharashtra state polytechnics and ITIs.
          </p>
        </div>

        {/* Course Switcher */}
        <div className="flex items-center bg-stone-50 border border-stone-300 rounded px-3 py-1.5 text-xs">
          <span className="text-stone-400 mr-2 text-[11px] font-medium">Select Course:</span>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="bg-transparent font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
          >
            {COURSES_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.institute})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Context Banner */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <div className="text-[10px] font-mono text-stone-400 uppercase">Course Code</div>
          <div className="font-mono font-bold text-stone-900">{activeCourse.code}</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Institution</div>
          <div className="font-semibold text-stone-800">{activeCourse.institute}</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Current Alignment</div>
          <div className="font-mono font-bold text-amber-700">{activeCourse.currentAlignmentPercent}%</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Annual Intake</div>
          <div className="font-mono font-semibold text-stone-800">{activeCourse.annualIntake} Students</div>
        </div>
        <div>
          <div className="text-[10px] text-stone-400 uppercase">Current Placement Rate</div>
          <div className="font-mono font-bold text-teal-800">{activeCourse.placementRatePercent}%</div>
        </div>
      </div>

      {/* THREE-COLUMN WORKSPACE: Current Curriculum vs Proposed Revision */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Current Curriculum (5 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                EXISTING SYLLABUS
              </span>
              <h2 className="text-base font-bold text-stone-900">
                Current Curriculum Modules
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
              {activeCourse.currentModules.length} Modules
            </span>
          </div>

          <div className="space-y-3">
            {activeCourse.currentModules.map((mod, idx) => (
              <div
                key={mod.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  mod.isOutdated
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-stone-50/70 border-stone-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {mod.isOutdated ? (
                      <MinusCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <RefreshCw className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-stone-900">
                      {mod.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 whitespace-nowrap ml-2">
                    {mod.hours} hrs
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {mod.skillsTaught.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        mod.isOutdated
                          ? 'bg-rose-100 text-rose-800 line-through'
                          : 'bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {mod.changeRationale && (
                  <div className="mt-2 text-[11px] text-stone-600 bg-white p-2 rounded border border-stone-200/60 leading-snug">
                    <span className="font-semibold text-stone-700">Audit Finding: </span>
                    {mod.changeRationale}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Proposed Revision (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-semibold">
                RECOMMENDED BY SKILLFORGE
              </span>
              <h2 className="text-base font-bold text-stone-900">
                Proposed Modernized Modules
              </h2>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
              +{activeCourse.proposedModules.length} Modules
            </span>
          </div>

          <div className="space-y-3">
            {activeCourse.proposedModules.map((mod, idx) => (
              <div
                key={mod.id}
                className="p-3.5 bg-teal-50/40 rounded-lg border border-teal-200 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-teal-700 shrink-0" />
                    <span className="text-xs font-bold text-stone-900">
                      {mod.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-800 font-semibold whitespace-nowrap ml-2">
                    {mod.hours} hrs
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {mod.skillsTaught.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-teal-100 text-teal-900 font-medium"
                    >
                      +{skill}
                    </span>
                  ))}
                </div>

                {mod.changeRationale && (
                  <div className="mt-2 text-[11px] text-stone-700 bg-white p-2 rounded border border-teal-200/80 leading-snug">
                    <span className="font-semibold text-teal-800">Evidence Rationale: </span>
                    {mod.changeRationale}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Laboratory & Equipment Requirements */}
          <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
              Prerequisite Lab Hardware / Software Modernization
            </span>
            <ul className="space-y-1 text-xs text-stone-600">
              {activeCourse.labEquipmentDeficit.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              onClick={onOpenWhy}
              className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Inspect Supporting Evidence Data</span>
            </button>

            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Academic Board Review</span>
            </button>
          </div>

          {submissionSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Proposed syllabus revision successfully logged under RFC-2026/CYB-PUNE and queued for academic council review!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
