import React, { useState } from 'react';
import { DistrictId, SectorId, UserRole, AuditRecommendationRecord } from './types';
import { AUDIT_RECOMMENDATIONS } from './data/seedData';
import { Header } from './components/Header';
import { Sidebar, NavItemKey } from './components/Sidebar';
import { JudgeDemoBar, DEMO_STEPS } from './components/JudgeDemoBar';
import { WhyPanel } from './components/WhyPanel';
import { ScoringFormulaModal } from './components/ScoringFormulaModal';

// Views
import { OverviewView } from './views/OverviewView';
import { DemandRadarView } from './views/DemandRadarView';
import { SkillIntelligenceView } from './views/SkillIntelligenceView';
import { SkillGapSimulatorView } from './views/SkillGapSimulatorView';
import { CourseAlignmentView } from './views/CourseAlignmentView';
import { CurriculumLabView } from './views/CurriculumLabView';
import { DistrictPlannerView } from './views/DistrictPlannerView';
import { WhatIfSimulatorView } from './views/WhatIfSimulatorView';
import { EmployerValidationView } from './views/EmployerValidationView';
import { CandidatePathwayView } from './views/CandidatePathwayView';
import { DataIntegrityView } from './views/DataIntegrityView';
import { AuditExplainabilityView } from './views/AuditExplainabilityView';

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('pune');
  const [selectedSector, setSelectedSector] = useState<SectorId>('it_software');
  const [currentRole, setCurrentRole] = useState<UserRole>('government');
  const [activeView, setActiveView] = useState<NavItemKey>('overview');

  // Judge Demo Mode State
  const [isJudgeDemoActive, setIsJudgeDemoActive] = useState<boolean>(false);
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);

  // Explainability & Formula Modals
  const [isWhyPanelOpen, setIsWhyPanelOpen] = useState<boolean>(false);
  const [activeWhyRecord, setActiveWhyRecord] = useState<AuditRecommendationRecord | null>(AUDIT_RECOMMENDATIONS[0]);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);

  // Sync state to Judge Demo Step
  const applyDemoStep = (stepIndex: number) => {
    const step = DEMO_STEPS[stepIndex];
    if (!step) return;
    setDemoStepIndex(stepIndex);
    setSelectedDistrict(step.districtId);
    setSelectedSector(step.sectorId);
    setCurrentRole(step.userRole);
    setActiveView(step.targetView as NavItemKey);
  };

  const handleStartJudgeDemo = () => {
    if (isJudgeDemoActive) {
      // Toggle off
      setIsJudgeDemoActive(false);
    } else {
      setIsJudgeDemoActive(true);
      applyDemoStep(0);
    }
  };

  const handleNextDemoStep = () => {
    if (demoStepIndex < DEMO_STEPS.length - 1) {
      applyDemoStep(demoStepIndex + 1);
    }
  };

  const handlePrevDemoStep = () => {
    if (demoStepIndex > 0) {
      applyDemoStep(demoStepIndex - 1);
    }
  };

  const handleOpenWhy = (record?: AuditRecommendationRecord) => {
    setActiveWhyRecord(record || AUDIT_RECOMMENDATIONS[0]);
    setIsWhyPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f9f6f0] text-[#191211] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
        selectedSector={selectedSector}
        onSelectSector={setSelectedSector}
        currentRole={currentRole}
        onChangeRole={(role) => {
          setCurrentRole(role);
          if (role === 'candidate') {
            setActiveView('candidate_pathway');
          } else if (role === 'institute') {
            setActiveView('course_alignment');
          }
        }}
        onStartJudgeDemo={handleStartJudgeDemo}
        isJudgeDemoActive={isJudgeDemoActive}
        onOpenFormulaModal={() => setIsFormulaModalOpen(true)}
        onNavigateToAnomalies={() => setActiveView('data_integrity')}
      />

      {/* Guided Judge Demo Controller Bar (Pinned when active) */}
      <JudgeDemoBar
        currentStepIndex={demoStepIndex}
        isActive={isJudgeDemoActive}
        onClose={() => setIsJudgeDemoActive(false)}
        onNext={handleNextDemoStep}
        onPrev={handlePrevDemoStep}
        onSelectStep={applyDemoStep}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 flex-1 flex gap-6">
        {/* Left Desktop Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          currentRole={currentRole}
          isJudgeDemoActive={isJudgeDemoActive}
        />

        {/* Dynamic Center View Canvas */}
        <main className="flex-1 min-w-0 pb-12">
          {activeView === 'overview' && (
            <OverviewView
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              onNavigate={setActiveView}
              onOpenWhy={() => handleOpenWhy()}
            />
          )}

          {activeView === 'demand_radar' && (
            <DemandRadarView
              selectedDistrict={selectedDistrict}
              selectedSector={selectedSector}
              onNavigate={setActiveView}
              onOpenWhy={() => handleOpenWhy()}
            />
          )}

          {activeView === 'skill_intelligence' && <SkillIntelligenceView />}

          {activeView === 'gap_simulator' && (
            <SkillGapSimulatorView
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              selectedSector={selectedSector}
              onSelectSector={setSelectedSector}
              onNavigate={setActiveView}
              onOpenWhy={() => handleOpenWhy()}
            />
          )}

          {activeView === 'course_alignment' && (
            <CourseAlignmentView
              selectedDistrict={selectedDistrict}
              onNavigate={setActiveView}
            />
          )}

          {activeView === 'curriculum_lab' && (
            <CurriculumLabView onOpenWhy={() => handleOpenWhy()} />
          )}

          {activeView === 'district_planner' && (
            <DistrictPlannerView
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              onNavigate={setActiveView}
              onOpenWhy={() => handleOpenWhy(AUDIT_RECOMMENDATIONS[1])}
            />
          )}

          {activeView === 'what_if' && (
            <WhatIfSimulatorView
              selectedDistrict={selectedDistrict}
              onNavigate={setActiveView}
              onOpenWhy={() => handleOpenWhy()}
            />
          )}

          {activeView === 'employer_validation' && <EmployerValidationView />}

          {activeView === 'candidate_pathway' && (
            <CandidatePathwayView onOpenWhy={() => handleOpenWhy()} />
          )}

          {activeView === 'data_integrity' && <DataIntegrityView />}

          {activeView === 'audit' && (
            <AuditExplainabilityView
              onSelectWhyRecord={(rec) => {
                setActiveWhyRecord(rec);
                setIsWhyPanelOpen(true);
              }}
            />
          )}
        </main>
      </div>

      {/* Slide-over Explainability "Why?" Panel */}
      <WhyPanel
        isOpen={isWhyPanelOpen}
        onClose={() => setIsWhyPanelOpen(false)}
        record={activeWhyRecord}
        onNavigateToAudit={() => {
          setIsWhyPanelOpen(false);
          setActiveView('audit');
        }}
      />

      {/* Scoring Formula Modal */}
      <ScoringFormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />

      {/* Mobile Responsive Navigation Strip */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e6dbcb] px-2 py-1.5 flex items-center justify-around text-[10px] font-medium z-30 shadow-lg">
        <button
          onClick={() => setActiveView('overview')}
          className={`p-1.5 rounded flex flex-col items-center ${activeView === 'overview' ? 'text-[#804237] font-bold' : 'text-[#574844]'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveView('gap_simulator')}
          className={`p-1.5 rounded flex flex-col items-center ${activeView === 'gap_simulator' ? 'text-[#804237] font-bold' : 'text-[#574844]'}`}
        >
          Gap Sim
        </button>
        <button
          onClick={() => setActiveView('district_planner')}
          className={`p-1.5 rounded flex flex-col items-center ${activeView === 'district_planner' ? 'text-[#804237] font-bold' : 'text-[#574844]'}`}
        >
          Planner
        </button>
        <button
          onClick={() => setActiveView('what_if')}
          className={`p-1.5 rounded flex flex-col items-center ${activeView === 'what_if' ? 'text-[#804237] font-bold' : 'text-[#574844]'}`}
        >
          What-If
        </button>
        <button
          onClick={() => setActiveView('candidate_pathway')}
          className={`p-1.5 rounded flex flex-col items-center ${activeView === 'candidate_pathway' ? 'text-[#804237] font-bold' : 'text-[#574844]'}`}
        >
          Candidate
        </button>
      </div>
    </div>
  );
}
