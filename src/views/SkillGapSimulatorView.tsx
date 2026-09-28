import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Play,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { DistrictId, SectorId, GapAnalysisReport } from '../types';
import { DISTRICTS_DATA, SECTORS_DATA, JOB_ROLES, COURSES_DATA } from '../data/seedData';
import { runSkillGapAnalysis } from '../services/intelligenceEngine';
import { NavItemKey } from '../components/Sidebar';

interface SkillGapSimulatorViewProps {
  selectedDistrict: DistrictId;
  onSelectDistrict: (d: DistrictId) => void;
  selectedSector: SectorId;
  onSelectSector: (s: SectorId) => void;
  onNavigate: (view: NavItemKey) => void;
  onOpenWhy: () => void;
}

export const SkillGapSimulatorView: React.FC<SkillGapSimulatorViewProps> = ({
  selectedDistrict,
  onSelectDistrict,
  selectedSector,
  onSelectSector,
  onNavigate,
  onOpenWhy,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('cybersecurity_analyst');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('crs_cyber_pune');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [report, setReport] = useState<GapAnalysisReport>(
    runSkillGapAnalysis(selectedDistrict, selectedSector, 'cybersecurity_analyst', 'crs_cyber_pune')
  );

  const availableRoles = JOB_ROLES.filter((r) => r.sectorId === selectedSector || selectedSector === 'it_software');
  const availableCourses = COURSES_DATA.filter((c) => c.districtId === selectedDistrict || c.sectorId === selectedSector);

  // Quick Preset Helper
  const handleSelectPreset = (roleId: string, courseId: string, dist: DistrictId, sec: SectorId) => {
    setSelectedRoleId(roleId);
    setSelectedCourseId(courseId);
    onSelectDistrict(dist);
    onSelectSector(sec);
    const newReport = runSkillGapAnalysis(dist, sec, roleId, courseId);
    setReport(newReport);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const newReport = runSkillGapAnalysis(selectedDistrict, selectedSector, selectedRoleId, selectedCourseId);
      setReport(newReport);
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#e6dbcb] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#351404] uppercase tracking-wider bg-[#eedcca] px-2 py-0.5 rounded border border-[#c39079]">
              Signature Tool
            </span>
            <span className="text-xs text-[#574844]">• PS 26134 Alignment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191211] tracking-tight mt-1">
            Skill Gap Simulator
          </h1>
          <p className="text-xs text-[#574844] mt-1 max-w-xl">
            Pick a job role and current polytechnic course to instantly diagnose which critical competencies are missing from the curriculum.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#804237] hover:bg-[#351404] text-white flex items-center gap-2 shadow-xs transition-all self-start md:self-auto"
        >
          {isAnalyzing ? (
            <span>Computing Gaps...</span>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-[#eedcca]" />
              <span>Analyze Alignment</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Quick Presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#804237] font-semibold text-[11px]">Quick Scenarios:</span>
        <button
          onClick={() => handleSelectPreset('cybersecurity_analyst', 'crs_cyber_pune', 'pune', 'it_software')}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
            selectedRoleId === 'cybersecurity_analyst'
              ? 'bg-[#eedcca] border-[#804237] text-[#351404] font-semibold shadow-2xs'
              : 'bg-white border-[#e6dbcb] text-[#574844] hover:bg-[#f9f6f0]'
          }`}
        >
          🛡️ Pune: Cybersecurity Analyst (Govt Poly)
        </button>
        <button
          onClick={() => handleSelectPreset('full_stack_dev', 'crs_web_pune', 'pune', 'it_software')}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
            selectedRoleId === 'full_stack_dev'
              ? 'bg-[#eedcca] border-[#804237] text-[#351404] font-semibold shadow-2xs'
              : 'bg-white border-[#e6dbcb] text-[#574844] hover:bg-[#f9f6f0]'
          }`}
        >
          💻 Pune: Full Stack Developer (Web Diploma)
        </button>
        <button
          onClick={() => handleSelectPreset('ev_technician', 'crs_ev_nashik', 'nashik', 'automotive_ev')}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
            selectedRoleId === 'ev_technician'
              ? 'bg-[#eedcca] border-[#804237] text-[#351404] font-semibold shadow-2xs'
              : 'bg-white border-[#e6dbcb] text-[#574844] hover:bg-[#f9f6f0]'
          }`}
        >
          ⚡ Nashik: EV Powertrain Tech (Govt ITI)
        </button>
      </div>

      {/* 3. High-Level Alignment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-[#574844]">Current Course Alignment</div>
            <div className="text-2xl font-bold font-mono text-[#191211] mt-1">
              {report.overallAlignmentPercent}%
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2 py-1 rounded bg-[#eedcca] text-[#804237] border border-[#c39079]">
            Needs Modernization
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs flex items-center justify-between border-l-4 border-l-[#804237]">
          <div>
            <div className="text-[11px] font-medium text-[#574844]">Critical Gaps Detected</div>
            <div className="text-2xl font-bold font-mono text-[#804237] mt-1">
              {report.criticalGaps.length} Skills
            </div>
          </div>
          <span className="text-[10px] text-[#574844]">
            Under-taught in syllabus
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e6dbcb] shadow-2xs flex items-center justify-between border-l-4 border-l-[#351404]">
          <div>
            <div className="text-[11px] font-medium text-[#574844]">Projected Alignment Gain</div>
            <div className="text-2xl font-bold font-mono text-[#351404] mt-1">
              +{report.estimatedAlignmentGain}%
            </div>
          </div>
          <span className="text-[10px] text-[#351404] font-medium bg-[#eedcca] px-2 py-0.5 rounded border border-[#c39079]">
            Post-Revision
          </span>
        </div>
      </div>

      {/* 4. Main Two-Column View: Gaps Table & Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Gaps List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#e6dbcb] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6dbcb]/60">
            <div>
              <h2 className="text-sm font-bold text-[#191211]">
                Skill-by-Skill Gap Breakdown
              </h2>
              <p className="text-xs text-[#574844]">
                Industry hiring need compared to what this course actually covers
              </p>
            </div>
            <span className="text-[11px] text-[#574844]">
              {report.metrics.length} Competencies
            </span>
          </div>

          <div className="space-y-2.5">
            {report.metrics.map((m) => (
              <div
                key={m.skillId}
                className="p-3 bg-[#f9f6f0] hover:bg-[#eedcca]/20 rounded-xl border border-[#e6dbcb] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#191211]">
                      {m.skillName}
                    </span>
                    {m.severity === 'critical' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#804237]/15 text-[#804237] border border-[#804237]/30 uppercase">
                        Critical Gap
                      </span>
                    ) : m.severity === 'warning' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#c39079]/20 text-[#351404] border border-[#c39079] uppercase">
                        Moderate
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eedcca] text-[#351404] border border-[#c39079] uppercase">
                        Aligned
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    m.gap >= 40
                      ? 'bg-[#804237] text-white'
                      : m.gap >= 20
                      ? 'bg-[#c39079] text-[#191211]'
                      : 'bg-[#eedcca] text-[#351404]'
                  }`}>
                    -{m.gap} deficit
                  </span>
                </div>

                {/* Comparative Mini-Bars */}
                <div className="mt-2.5 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#574844] mb-0.5">
                      <span>Industry Need</span>
                      <span className="font-mono font-semibold">{m.industryDemand}%</span>
                    </div>
                    <div className="w-full bg-[#e6dbcb]/60 rounded-full h-1.5">
                      <div className="bg-[#191211] h-1.5 rounded-full" style={{ width: `${m.industryDemand}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-[#574844] mb-0.5">
                      <span>Course Coverage</span>
                      <span className="font-mono font-semibold text-[#804237]">{m.curriculumCoverage}%</span>
                    </div>
                    <div className="w-full bg-[#e6dbcb]/60 rounded-full h-1.5">
                      <div className="bg-[#804237] h-1.5 rounded-full" style={{ width: `${m.curriculumCoverage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actionable Interventions (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#e6dbcb] shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#e6dbcb]/60">
              <span className="text-[10px] font-bold text-[#351404] uppercase tracking-wider bg-[#eedcca] px-2 py-0.5 rounded border border-[#c39079]">
                Action Plan
              </span>
              <h2 className="text-sm font-bold text-[#191211] mt-1">
                Recommended Interventions
              </h2>
              <p className="text-xs text-[#574844]">
                Concrete steps for the Directorate of Technical Education
              </p>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              {/* Modules to add */}
              <div className="p-3 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <span className="font-bold text-[#191211] block mb-1">
                  1. Add to Syllabus:
                </span>
                <ul className="space-y-1 text-[#574844] list-disc list-inside text-[11px]">
                  {report.recommendedModules.slice(0, 3).map((m, idx) => (
                    <li key={idx} className="truncate">{m}</li>
                  ))}
                </ul>
              </div>

              {/* Lab hardware */}
              <div className="p-3 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <span className="font-bold text-[#191211] block mb-1">
                  2. Required Lab Setup:
                </span>
                <p className="text-[#574844] text-[11px]">
                  {report.equipmentRequirements[0] || 'Virtual Cyber Range & Managed Network Rigs'}
                </p>
              </div>

              {/* Faculty training */}
              <div className="p-3 bg-[#f9f6f0] rounded-xl border border-[#e6dbcb]">
                <span className="font-bold text-[#191211] block mb-1">
                  3. Trainer Upskilling:
                </span>
                <p className="text-[#574844] text-[11px]">
                  {report.trainerUpskillingNeeded[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[#e6dbcb]/60 space-y-2">
            <button
              onClick={onOpenWhy}
              className="w-full py-2 px-3 text-xs text-[#351404] bg-[#eedcca]/60 hover:bg-[#eedcca] rounded-lg border border-[#c39079] font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#804237]" />
              <span>Why this recommendation? (Evidence)</span>
            </button>

            <button
              onClick={() => onNavigate('curriculum_lab')}
              className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#804237] hover:bg-[#351404] rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Open in Curriculum Lab →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
