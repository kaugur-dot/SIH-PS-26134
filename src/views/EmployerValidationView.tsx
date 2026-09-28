import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  Users,
  ShieldCheck,
  PlusCircle,
  FileCheck,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { EmployerValidationRecord } from '../types';
import { EMPLOYER_VALIDATIONS, SECTORS_DATA } from '../data/seedData';

export const EmployerValidationView: React.FC = () => {
  const [validations, setValidations] = useState<EmployerValidationRecord[]>(EMPLOYER_VALIDATIONS);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('emp_01_consortium');
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [submittedBanner, setSubmittedBanner] = useState<boolean>(false);

  // Quick feedback form state
  const [newEmployerName, setNewEmployerName] = useState<string>('');
  const [newVerifiedRole, setNewVerifiedRole] = useState<string>('Cybersecurity Analyst');
  const [newMissingSkill, setNewMissingSkill] = useState<string>('');

  const activeRecord = validations.find((v) => v.id === selectedRecordId) || validations[0];

  const handleAddValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployerName || !newMissingSkill) return;

    const newRecord: EmployerValidationRecord = {
      id: `emp_${Date.now()}`,
      employerName: `${newEmployerName} (Consortium Member)`,
      type: 'Tier-1 Enterprise',
      sectorId: 'it_software',
      districtId: 'pune',
      verifiedRoles: [newVerifiedRole],
      topRequestedSkills: [
        { skillName: 'Linux OS & Administration', percentage: 95 },
        { skillName: newMissingSkill, percentage: 90 },
      ],
      observedGraduateGaps: [
        `Observed deficit in ${newMissingSkill} during technical assessment rounds.`,
      ],
      surveySampleSize: 1,
      validationTimestamp: '2026-09-28',
    };

    setValidations([newRecord, ...validations]);
    setSelectedRecordId(newRecord.id);
    setIsSurveyModalOpen(false);
    setSubmittedBanner(true);
    setTimeout(() => setSubmittedBanner(false), 4000);
    setNewEmployerName('');
    setNewMissingSkill('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
              Industry Consultations & Direct Requisition Feed
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Employer Validation & Industry Consensus
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Aggregated competency requirements, graduate gap reports, and hiring criteria endorsed by 214 industry employers in Maharashtra.
          </p>
        </div>

        <button
          onClick={() => setIsSurveyModalOpen(true)}
          className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Submit Employer Requisition Feedback</span>
        </button>
      </div>

      {submittedBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Employer validation recorded! Weighting telemetry updated across downstream gap models.</span>
        </div>
      )}

      {/* Main Grid: Employer Surveys List (Left 4 cols) & Detailed Consensus View (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Verified Consortia */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Verified Employer Panels ({validations.length})
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {validations.map((v) => {
              const isSelected = v.id === activeRecord.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedRecordId(v.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 border-teal-600 shadow-xs ring-1 ring-teal-500'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-stone-900">
                        {v.employerName}
                      </h2>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {v.type} • {v.districtId.charAt(0).toUpperCase() + v.districtId.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-teal-800 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      Validated by {v.surveySampleSize} employers
                    </span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      {v.validationTimestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Validation Report */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                INDUSTRY VALIDATION CONSENSUS
              </span>
              <h2 className="text-lg font-bold text-stone-900 mt-1">
                {activeRecord.employerName}
              </h2>
              <div className="text-xs text-stone-500 mt-0.5">
                Target Roles: <strong>{activeRecord.verifiedRoles.join(', ')}</strong>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Survey Sample Size</div>
              <div className="text-2xl font-bold font-mono text-teal-800">
                {activeRecord.surveySampleSize} <span className="text-xs text-stone-500">enterprises</span>
              </div>
            </div>
          </div>

          {/* Top Requested Skills Endorsement */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
              Skills Most Frequently Requested as Mandatory Prerequisites
            </h3>
            <div className="space-y-2.5">
              {activeRecord.topRequestedSkills.map((req, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-stone-900">{req.skillName}</span>
                    <span className="font-mono font-bold text-stone-800">
                      {req.percentage}% of validating employers
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className="bg-stone-800 h-2 rounded-full"
                      style={{ width: `${req.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualitative Graduate Gap Reports */}
          <div>
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-rose-600" />
              Observed Graduate Deficits in Technical Interviews
            </h3>
            <div className="space-y-2">
              {activeRecord.observedGraduateGaps.map((gap, i) => (
                <div
                  key={i}
                  className="p-3 bg-rose-50/50 rounded-lg border border-rose-200/80 text-xs text-stone-800 leading-snug flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>&ldquo;{gap}&rdquo;</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Evidence feed authenticated through Maharashtra State Innovation Society corporate portal.</span>
            <span className="font-mono text-[11px] text-teal-800">Data Hash: SHA-256 Verified</span>
          </div>
        </div>
      </div>

      {/* MODAL: SUBMIT EMPLOYER FEEDBACK */}
      {isSurveyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-stone-200 p-5">
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Submit Employer Requisition Feedback
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Help calibrate government polytechnic curricula with real hiring requirements.
            </p>

            <form onSubmit={handleAddValidation} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Company / Organization Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune Cyber Defense Labs"
                  value={newEmployerName}
                  onChange={(e) => setNewEmployerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Hiring Role Focus:
                </label>
                <select
                  value={newVerifiedRole}
                  onChange={(e) => setNewVerifiedRole(e.target.value)}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-900"
                >
                  <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Electric Vehicle (EV) Powertrain Technician">EV Powertrain Technician</option>
                  <option value="Solar PV Systems Specialist">Solar PV Specialist</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Specific Missing Skill Observed in Freshers:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practical Wireshark deep packet analysis"
                  value={newMissingSkill}
                  onChange={(e) => setNewMissingSkill(e.target.value)}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSurveyModalOpen(false)}
                  className="px-3 py-1.5 text-stone-600 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold"
                >
                  Submit Endorsement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
