export type UserRole = 'government' | 'institute' | 'candidate';

export type DistrictId =
  | 'pune'
  | 'mumbai'
  | 'nagpur'
  | 'nashik'
  | 'chhatrapati_sambhajinagar'
  | 'thane'
  | 'kolhapur'
  | 'satara';

export type SectorId =
  | 'it_software'
  | 'automotive_ev'
  | 'renewable_energy'
  | 'healthcare'
  | 'manufacturing'
  | 'bfsi';

export interface DistrictInfo {
  id: DistrictId;
  name: string;
  marathiName: string;
  region: string;
  demandIndex: number; // 0 - 100
  trainingCapacity: number; // 0 - 100
  gapScore: number; // demand - capacity
  topSectors: SectorId[];
  activeInstitutes: number;
  annualGraduates: number;
  openJobSignals: number;
}

export interface SectorInfo {
  id: SectorId;
  name: string;
  code: string;
  growthRatePercent: number;
  signalCount: number;
  primaryDistricts: DistrictId[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'framework' | 'tool' | 'infrastructure' | 'domain';
  sectorId: SectorId;
  aliases: string[];
  demandScore: number; // 0 - 100
  sixMonthGrowthPercent: number;
  requiredByRoles: string[];
  commonlyPairedWith: string[];
  taughtInCourses: string[];
  primaryDistricts: DistrictId[];
}

export interface JobRole {
  id: string;
  title: string;
  sectorId: SectorId;
  demandIndex: number;
  sixMonthGrowthPercent: number;
  openSignals: number;
  avgSalaryLpa: string;
  primaryDistricts: DistrictId[];
  requiredSkills: { skillId: string; skillName: string; weight: number; proficiency: 'Beginner' | 'Intermediate' | 'Advanced' }[];
  proficiencyRequirements: {
    skillName: string;
    level: string;
    description: string;
  }[];
}

export interface CourseModule {
  id: string;
  title: string;
  hours: number;
  skillsTaught: string[];
  isOutdated?: boolean;
  isProposed?: boolean;
  status: 'retained' | 'reduced' | 'added' | 'updated';
  changeRationale?: string;
}

export interface CourseRecord {
  id: string;
  code: string;
  title: string;
  institute: string;
  districtId: DistrictId;
  sectorId: SectorId;
  targetRoleId: string;
  durationMonths: number;
  currentAlignmentPercent: number;
  annualIntake: number;
  placementRatePercent: number;
  currentModules: CourseModule[];
  proposedModules: CourseModule[];
  trainerShortageCount: number;
  labEquipmentDeficit: string[];
}

export interface SkillGapMetric {
  skillId: string;
  skillName: string;
  industryDemand: number;
  curriculumCoverage: number;
  gap: number;
  severity: 'aligned' | 'warning' | 'critical';
  trend: 'up' | 'stable' | 'down';
  employerNeedPercent: number;
}

export interface GapAnalysisReport {
  districtId: DistrictId;
  sectorId: SectorId;
  roleId: string;
  courseId: string;
  overallAlignmentPercent: number;
  metrics: SkillGapMetric[];
  criticalGaps: string[];
  recommendedModules: string[];
  equipmentRequirements: string[];
  trainerUpskillingNeeded: string[];
  estimatedAlignmentGain: number;
}

export interface EmployerValidationRecord {
  id: string;
  employerName: string;
  type: 'Tier-1 Enterprise' | 'MSME' | 'Industry Consortium' | 'Tech MNC';
  sectorId: SectorId;
  districtId: DistrictId;
  verifiedRoles: string[];
  topRequestedSkills: { skillName: string; percentage: number }[];
  observedGraduateGaps: string[];
  surveySampleSize: number;
  validationTimestamp: string;
}

export interface DistrictPlannerRecord {
  districtId: DistrictId;
  sectorId: SectorId;
  targetRole: string;
  currentCapacity: number;
  projectedIndustryDemand: number;
  currentDemandCoverage: number;
  proposedSeats: number;
  trainerUpskillingSlots: number;
  equipmentBudgetLakhs: number;
  optimizedDemandCoverage: number;
  solverMethod: string;
  constraintsSummary: string[];
}

export interface WhatIfScenarioInput {
  additionalTrainers: number;
  additionalSeats: number;
  equipmentBudgetLakhs: number;
  newCoursesAdded: number;
}

export interface WhatIfScenarioResult {
  baselineCoverage: number;
  baselineGap: number;
  simulatedCoverage: number;
  simulatedGap: number;
  estimatedGraduatesJobReady: number;
  roiScore: number;
  breakdown: {
    trainerContribution: number;
    seatsContribution: number;
    budgetContribution: number;
    courseContribution: number;
  };
}

export interface CandidatePathwayNode {
  id: string;
  label: string;
  status: 'acquired' | 'next_step' | 'target_goal' | 'future';
  type: 'skill' | 'milestone' | 'course' | 'role';
  skills: string[];
  description: string;
  durationEstimate?: string;
  recommendedCourse?: string;
  demandIndex?: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  qualification: string;
  currentInstitute: string;
  district: DistrictId;
  skillsAcquired: string[];
  interests: SectorId[];
  targetRole: string;
  targetDistricts: DistrictId[];
  careerReadinessScore: number; // 0 - 100
  recommendedNextSkills: {
    skillName: string;
    gapSeverity: 'high' | 'medium' | 'low';
    reason: string;
    availableCourse: string;
  }[];
}

export interface AnomalyReport {
  id: string;
  type: 'Duplicate Postings' | 'Impossible Salary Outlier' | 'Spam Employer Submission' | 'Sudden Skill Spike';
  description: string;
  affectedRecordsCount: number;
  confidencePercent: number;
  sourceFeed: string;
  detectedAt: string;
  status: 'quarantined' | 'investigating' | 'resolved';
}

export interface AuditRecommendationRecord {
  id: string;
  recCode: string;
  actionTitle: string;
  targetEntity: string;
  districtName: string;
  category: 'Curriculum Update' | 'Seat Expansion' | 'Trainer Upskilling' | 'Lab Modernization';
  generatedDate: string;
  confidenceScorePercent: number;
  evidenceFactors: {
    jobPostingSignalsPercent: number;
    employerValidationPercent: number;
    sectorGrowthPercent: number;
    placementOutcomesPercent: number;
    emergingTechTrendPercent: number;
  };
  reasoningNotes: string[];
  status: 'Approved' | 'Pending Review' | 'In Progress';
}
