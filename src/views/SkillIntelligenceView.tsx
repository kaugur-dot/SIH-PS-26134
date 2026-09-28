import React, { useState } from 'react';
import {
  Network,
  Share2,
  ArrowRight,
  Search,
  CheckCircle,
  Sparkles,
  GitBranch,
  Layers,
  MapPin,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { SkillItem, DistrictId } from '../types';
import { SKILLS_MASTER, DISTRICTS_DATA } from '../data/seedData';
import { normalizeSkill } from '../services/intelligenceEngine';

export const SkillIntelligenceView: React.FC = () => {
  const [selectedSkillId, setSelectedSkillId] = useState<string>('sk_react');
  const [rawTestInput, setRawTestInput] = useState<string>('ReactJS 18.2');
  const [normalizationResult, setNormalizationResult] = useState(normalizeSkill('ReactJS 18.2'));

  const activeSkill = SKILLS_MASTER.find((s) => s.id === selectedSkillId) || SKILLS_MASTER[0];

  const handleTestNormalize = (val: string) => {
    setRawTestInput(val);
    setNormalizationResult(normalizeSkill(val));
  };

  const sampleAliases = [
    'ReactJS',
    'React.js runtime',
    'Docker Containers',
    'Linux CLI / Ubuntu',
    'Splunk SIEM',
    'AWS Cloud Architect',
    'Lithium-Ion BMS diagnostics',
    'Siemens PLC Ladder',
    'PVSyst Solar Design',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Knowledge Graph & Taxonomy
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Skill Intelligence & Normalization Engine
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Resolving heterogeneous job posting vocabularies into 2,846 canonical competencies and semantic relationship graphs.
          </p>
        </div>

        <span className="text-xs font-mono bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded">
          Canonical Entity Resolution: 99.4% Precision
        </span>
      </div>

      {/* TOP: LIVE NORMALIZATION TEST BENCH */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
        <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-teal-700" />
          Interactive Normalization Test Bench
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          Type any messy raw text or click sample employer variants to see the ontology resolver map them to the canonical skill entity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5">
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Raw Input (From Scraped Requisition):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={rawTestInput}
                onChange={(e) => handleTestNormalize(e.target.value)}
                placeholder="e.g. ReactJS or Express.js"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs font-mono text-stone-900 focus:outline-hidden focus:border-teal-600"
              />
            </div>
            {/* Quick Chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {sampleAliases.slice(0, 5).map((alias) => (
                <button
                  key={alias}
                  onClick={() => handleTestNormalize(alias)}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200"
                >
                  {alias}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center text-stone-400">
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-teal-700" />
          </div>

          <div className="md:col-span-5 bg-teal-50/70 p-3.5 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                Canonical Entity Resolved
              </span>
              <span className="text-[10px] font-mono bg-teal-100 text-teal-900 px-2 py-0.5 rounded font-semibold">
                Confidence: {(normalizationResult.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-base font-bold text-stone-900 mt-1">
              {normalizationResult.normalizedName}
            </div>
            <div className="text-xs text-stone-600 mt-0.5">
              Category: <span className="font-semibold capitalize">{normalizationResult.category || 'Core Skill'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN KNOWLEDGE GRAPH & RELATIONSHIP MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Skill Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Canonical Skills ({SKILLS_MASTER.length})
            </span>
            <span className="text-[11px] text-stone-400">Click to explore graph</span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {SKILLS_MASTER.map((skill) => {
              const isSelected = skill.id === activeSkill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`p-2.5 rounded-md border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? 'bg-teal-50 border-teal-600 shadow-2xs font-semibold text-teal-900'
                      : 'bg-stone-50/50 border-stone-200 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{skill.name}</span>
                    <span className="text-[10px] font-mono font-bold text-stone-500">
                      Demand: {skill.demandScore}
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1 truncate">
                    Aliases: {skill.aliases.slice(0, 3).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Skill Graph (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                ACTIVE SKILL ENTITY
              </span>
              <h2 className="text-xl font-bold text-stone-900 mt-1">
                {activeSkill.name}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Demand Score</div>
              <div className="text-xl font-bold font-mono text-teal-800">
                {activeSkill.demandScore}/100
              </div>
            </div>
          </div>

          {/* Known Aliases / Synonyms */}
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
              Normalized Aliases & Linguistic Variants:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {activeSkill.aliases.map((alias) => (
                <span
                  key={alias}
                  className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-stone-300 text-stone-800"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Interactive Ontology Graph Layout */}
          <div className="bg-stone-950 text-stone-200 p-6 rounded-xl border border-stone-800 relative overflow-hidden">
            <div className="text-[10px] uppercase font-mono tracking-widest text-teal-400 mb-4">
              SEMANTIC KNOWLEDGE GRAPH CONNECTIONS
            </div>

            {/* Central Node and Rays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch 1: Required By Job Roles */}
              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Required By Roles</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {activeSkill.requiredByRoles.map((r, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Branch 2: Commonly Paired Skills */}
              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Frequently Paired With</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.commonlyPairedWith.map((paired, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-stone-800 text-teal-300 px-2 py-0.5 rounded border border-stone-700"
                    >
                      {paired}
                    </span>
                  ))}
                </div>
              </div>

              {/* Branch 3: Taught In Courses */}
              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Taught In Current Courses</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {activeSkill.taughtInCourses.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Branch 4: Primary Demand Districts */}
              <div className="bg-stone-900/90 p-3.5 rounded-lg border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>High Demand Hubs</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSkill.primaryDistricts.map((d, i) => (
                    <span
                      key={i}
                      className="text-[11px] capitalize bg-stone-800 text-emerald-300 px-2 py-0.5 rounded border border-stone-700 font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
