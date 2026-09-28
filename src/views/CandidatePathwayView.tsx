import React, { useState } from 'react';
import {
  UserCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Plus,
  BookOpen,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';
import { DEMO_CANDIDATE, SKILLS_MASTER } from '../data/seedData';
import { CandidateProfile } from '../types';

interface CandidatePathwayViewProps {
  onOpenWhy: () => void;
}

export const CandidatePathwayView: React.FC<CandidatePathwayViewProps> = ({ onOpenWhy }) => {
  const [candidate, setCandidate] = useState<CandidateProfile>(DEMO_CANDIDATE);
  const [selectedPathwayNode, setSelectedPathwayNode] = useState<string>('node_net');
  const [newSkillToAdd, setNewSkillToAdd] = useState<string>('');
  const [showSkillAddedBanner, setShowSkillAddedBanner] = useState<boolean>(false);

  // Skill readiness by career track
  const readinessTracks = [
    { track: 'Software Development', score: 72, color: 'bg-stone-800' },
    { track: 'Cybersecurity Analyst (Target)', score: candidate.careerReadinessScore, color: 'bg-teal-700', highlight: true },
    { track: 'Cloud Infrastructure', score: 35, color: 'bg-amber-600' },
    { track: 'Data Analytics & ML', score: 28, color: 'bg-indigo-600' },
  ];

  // Career pathway sequence nodes
  const pathwayNodes = [
    {
      id: 'node_curr',
      title: 'Current Foundations',
      subtitle: 'Python, C++, SQL, HTML/CSS',
      status: 'completed',
      stepNumber: 1,
      skills: ['Python', 'C++', 'SQL & Database Systems'],
      demand: 'Acquired',
      districts: 'Pune',
      recommendedCourse: 'Completed at Degree College',
    },
    {
      id: 'node_net',
      title: 'Enterprise Networking & TCP/IP',
      subtitle: 'Subnetting, Wireshark, Packet Analysis',
      status: 'active_target',
      stepNumber: 2,
      skills: ['Networking & TCP/IP', 'Wireshark', 'Routing'],
      demand: 'Index 91/100 (High)',
      districts: 'Pune, Mumbai, Nagpur',
      recommendedCourse: 'Govt Polytechnic Pune: Advanced Network Defense Module (Free MSIS Hybrid)',
    },
    {
      id: 'node_linux',
      title: 'Linux Systems & Hardening',
      subtitle: 'Bash automation, permissions, audit logs',
      status: 'upcoming',
      stepNumber: 3,
      skills: ['Linux OS & Administration', 'Bash'],
      demand: 'Index 88/100 (High)',
      districts: 'Pune, Mumbai',
      recommendedCourse: 'MSIS Skill Center Pune: Linux CLI & SysAdmin Lab',
    },
    {
      id: 'node_siem',
      title: 'SIEM & SOC Threat Analysis',
      subtitle: 'Splunk, Elastic, Alert Triage',
      status: 'upcoming',
      stepNumber: 4,
      skills: ['SIEM & Threat Analysis', 'Incident Triage'],
      demand: 'Index 84/100 (High Growth +38%)',
      districts: 'Pune, Mumbai',
      recommendedCourse: 'Virtual Cyber Range Simulation Cohort',
    },
    {
      id: 'node_cloudsec',
      title: 'Cloud Security & IAM Governance',
      subtitle: 'AWS Security, IAM least privilege',
      status: 'upcoming',
      stepNumber: 5,
      skills: ['Cloud Security', 'AWS IAM'],
      demand: 'Index 86/100 (Emerging)',
      districts: 'Pune, Mumbai, Nagpur',
      recommendedCourse: 'AWS Certified Cloud Security Cohort',
    },
    {
      id: 'node_goal',
      title: 'Industry Ready: Cybersecurity Analyst',
      subtitle: 'Average Package: ₹6.5 - ₹12 LPA',
      status: 'goal',
      stepNumber: 6,
      skills: ['Full SOC Ready Portfolio', 'Capstone Project'],
      demand: '1,840 Open Vacancies',
      districts: 'Maharashtra State Hubs',
      recommendedCourse: 'Direct Placement Drives via MSInS Portal',
    },
  ];

  const activeNode = pathwayNodes.find((n) => n.id === selectedPathwayNode) || pathwayNodes[1];

  const handleAddSkill = () => {
    if (!newSkillToAdd) return;
    if (!candidate.skillsAcquired.includes(newSkillToAdd)) {
      setCandidate({
        ...candidate,
        skillsAcquired: [...candidate.skillsAcquired, newSkillToAdd],
        careerReadinessScore: Math.min(95, candidate.careerReadinessScore + 12),
      });
      setShowSkillAddedBanner(true);
      setTimeout(() => setShowSkillAddedBanner(false), 3000);
      setNewSkillToAdd('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Candidate Pathway & Personalized Guidance
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Candidate Career Roadmap: {candidate.name}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {candidate.qualification} • {candidate.currentInstitute} ({candidate.district.toUpperCase()})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 uppercase font-semibold">Target Readiness</span>
            <div className="text-2xl font-bold font-mono text-teal-800">
              {candidate.careerReadinessScore}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-teal-700 flex items-center justify-center font-bold text-xs bg-teal-50 text-teal-900">
            {candidate.careerReadinessScore}%
          </div>
        </div>
      </div>

      {showSkillAddedBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Skill profile updated! Readiness score surged to {candidate.careerReadinessScore}%.</span>
        </div>
      )}

      {/* TOP: CANDIDATE PROFILE SUMMARY & READINESS RADAR/BARS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Acquired Skills & Interactive Add (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Acquired Qualifications & Skills ({candidate.skillsAcquired.length})
            </h2>
            <span className="text-[10px] font-mono text-stone-400">Verified Credentials</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {candidate.skillsAcquired.map((skill) => (
              <span
                key={skill}
                className="text-xs font-medium px-2.5 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                {skill}
              </span>
            ))}
          </div>

          {/* Interactive Skill Builder */}
          <div className="pt-3 border-t border-stone-100">
            <label className="block text-[11px] font-semibold text-stone-600 mb-1.5">
              Simulate Acquiring a New Skill:
            </label>
            <div className="flex gap-2">
              <select
                value={newSkillToAdd}
                onChange={(e) => setNewSkillToAdd(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-hidden"
              >
                <option value="">Select skill to simulate...</option>
                <option value="Networking & TCP/IP">Networking & TCP/IP</option>
                <option value="Linux OS & Administration">Linux OS & Administration</option>
                <option value="SIEM & Threat Analysis">SIEM & Threat Analysis</option>
                <option value="Cloud Security">Cloud Security</option>
                <option value="Git & Version Control">Git & Version Control</option>
              </select>
              <button
                onClick={handleAddSkill}
                disabled={!newSkillToAdd}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold disabled:opacity-40"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Readiness Across Regional Career Tracks (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                BENCHMARK AGAINST ROLES
              </span>
              <h2 className="text-base font-bold text-stone-900">
                Your Regional Skill Alignment by Pathway
              </h2>
            </div>
            <span className="text-xs text-stone-400">Target: Pune Hub</span>
          </div>

          <div className="space-y-3.5">
            {readinessTracks.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  item.highlight
                    ? 'bg-teal-50/70 border-teal-300'
                    : 'bg-stone-50/60 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-stone-900">
                    {item.track}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-800">
                    {item.score}% Readiness
                  </span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIGNATURE SECTION: INTERACTIVE CAREER PATHWAY GRAPH */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              STEP-BY-STEP CAREER TRAJECTORY
            </span>
            <h2 className="text-base font-bold text-stone-900 mt-1">
              Optimized Sequential Pathway to Cybersecurity Analyst
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any milestone node to inspect competency requirements, local subsidized courses, and regional vacancy demand.
            </p>
          </div>
        </div>

        {/* Stepper / Sequential Node Timeline */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {pathwayNodes.map((node) => {
            const isSelected = node.id === activeNode.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedPathwayNode(node.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/40 shadow-xs'
                    : node.status === 'completed'
                    ? 'bg-stone-50 border-stone-300'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      node.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSelected
                        ? 'bg-teal-800 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}>
                      Step {node.stepNumber}
                    </span>
                    {node.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>

                  <h3 className="text-xs font-bold text-stone-900 mt-2 line-clamp-2">
                    {node.title}
                  </h3>
                </div>

                <div className="text-[10px] text-stone-400 mt-2 truncate">
                  {node.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Node Detail Card */}
        <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                ACTIVE MILESTONE DETAILS
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-1">
                {activeNode.title}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                {activeNode.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-stone-400 text-[10px] uppercase block">Regional Demand</span>
                <span className="font-semibold text-stone-800">{activeNode.demand}</span>
              </div>
              <div className="border-l border-stone-300 pl-4">
                <span className="text-stone-400 text-[10px] uppercase block">Target Hubs</span>
                <span className="font-semibold text-stone-800">{activeNode.districts}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-stone-800 block mb-1">
                Recommended Maharashtra Subsidized Course:
              </span>
              <div className="p-2.5 bg-white rounded border border-stone-200 text-stone-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-700 shrink-0" />
                <span className="text-xs">{activeNode.recommendedCourse}</span>
              </div>
            </div>

            <div>
              <span className="font-semibold text-stone-800 block mb-1">
                Why this recommendation?
              </span>
              <div className="p-2.5 bg-white rounded border border-stone-200 text-[11px] text-stone-600 leading-snug">
                This skill is frequently required by 95% of junior cybersecurity roles in Pune and forms an essential prerequisite for higher-level cloud security competencies.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 5 NEXT SKILLS TO BUILD (With individual "Why?" explainers) */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
        <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            Top Priority Skills to Close Your Personal Career Gap
          </h2>
          <button
            onClick={onOpenWhy}
            className="text-xs text-teal-700 hover:text-teal-900 font-medium underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explain Algorithm Logic</span>
          </button>
        </div>

        <div className="space-y-3">
          {candidate.recommendedNextSkills.map((rec, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-500 w-5">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-stone-900">
                    {rec.skillName}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    rec.gapSeverity === 'high'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {rec.gapSeverity.toUpperCase()} DEFICIT
                  </span>
                </div>

                <span className="text-[11px] text-stone-500 font-mono">
                  {rec.availableCourse.split('—')[0]}
                </span>
              </div>

              <div className="mt-2 text-xs text-stone-600 bg-white p-2 rounded border border-stone-200/80 leading-snug">
                <strong className="text-teal-800">Why? </strong>
                {rec.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
