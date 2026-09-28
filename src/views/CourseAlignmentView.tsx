import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  TrendingDown,
  GraduationCap
} from 'lucide-react';
import { CourseRecord, DistrictId, SectorId } from '../types';
import { COURSES_DATA, DISTRICTS_DATA, SECTORS_DATA } from '../data/seedData';
import { NavItemKey } from '../components/Sidebar';

interface CourseAlignmentViewProps {
  selectedDistrict: DistrictId;
  onNavigate: (view: NavItemKey) => void;
}

export const CourseAlignmentView: React.FC<CourseAlignmentViewProps> = ({
  selectedDistrict,
  onNavigate,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'aligned'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.institute.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'critical') return matchesSearch && course.currentAlignmentPercent < 55;
    if (filterType === 'aligned') return matchesSearch && course.currentAlignmentPercent >= 70;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Institutional Program Audits
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Course Alignment & Obsolescence Register
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Systematic benchmarking of 486 polytechnic and ITI courses against real-time industry job requisition standards.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5">
          <input
            type="text"
            placeholder="Search courses or institutes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-800 focus:outline-hidden focus:border-teal-600"
          />

          <div className="flex items-center bg-stone-100 rounded border border-stone-300 p-0.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 py-1 rounded font-medium ${
                filterType === 'all' ? 'bg-white shadow-2xs font-semibold' : 'text-stone-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-2 py-1 rounded font-medium ${
                filterType === 'critical' ? 'bg-rose-50 text-rose-800 font-semibold' : 'text-stone-600'
              }`}
            >
              Low Alignment (&lt;55%)
            </button>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const districtObj = DISTRICTS_DATA.find((d) => d.id === course.districtId);
          const sectorObj = SECTORS_DATA.find((s) => s.id === course.sectorId);

          return (
            <div
              key={course.id}
              className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-stone-300 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-stone-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-stone-500">
                      {course.code}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-teal-800 font-semibold uppercase">
                      {sectorObj?.name}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-stone-500">
                      {districtObj?.name} ({districtObj?.marathiName})
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-stone-900 mt-1">
                    {course.title}
                  </h2>
                  <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-stone-400" />
                    <span>{course.institute}</span>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">
                      Industry Alignment
                    </div>
                    <div className="text-2xl font-bold font-mono text-stone-900">
                      {course.currentAlignmentPercent}%
                    </div>
                  </div>

                  <div className="text-right border-l border-stone-200 pl-4">
                    <div className="text-[10px] text-stone-400 uppercase font-semibold">
                      Placement Rate
                    </div>
                    <div className="text-2xl font-bold font-mono text-teal-800">
                      {course.placementRatePercent}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Gaps summary */}
              <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Annual Capacity & Intake
                  </span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {course.annualIntake} Students / Year ({course.durationMonths} Months)
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Certified Faculty Shortage
                  </span>
                  <div className="font-semibold text-rose-700 mt-0.5">
                    {course.trainerShortageCount} Instructors needed for modern modules
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded border border-stone-200">
                  <span className="text-[10px] font-semibold text-stone-500 uppercase">
                    Lab Deficit
                  </span>
                  <div className="font-medium text-stone-700 mt-0.5 truncate" title={course.labEquipmentDeficit.join(', ')}>
                    {course.labEquipmentDeficit[0]}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">
                  Obsolescence Flag: Contains outdated modules requiring academic restructuring.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('gap_simulator')}
                    className="px-3 py-1.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs flex items-center gap-1"
                  >
                    Simulate Gaps
                  </button>
                  <button
                    onClick={() => onNavigate('curriculum_lab')}
                    className="px-3 py-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs flex items-center gap-1"
                  >
                    Open in Curriculum Lab →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
