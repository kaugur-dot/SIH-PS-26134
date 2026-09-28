import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Layers,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { AnomalyReport } from '../types';
import { ANOMALIES_DATA } from '../data/seedData';

export const DataIntegrityView: React.FC = () => {
  const [alerts, setAlerts] = useState<AnomalyReport[]>(ANOMALIES_DATA);
  const [selectedAlertId, setSelectedAlertId] = useState<string>(ANOMALIES_DATA[0].id);
  const [scanRunning, setScanRunning] = useState<boolean>(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const activeAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const handleResolveAlert = (id: string, action: 'quarantined' | 'resolved') => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, status: action } : a))
    );
    setSuccessBanner(`Record #${id} successfully marked as ${action.toUpperCase()}`);
    setTimeout(() => setSuccessBanner(null), 3500);
  };

  const handleRunScan = () => {
    setScanRunning(true);
    setTimeout(() => {
      setScanRunning(false);
      setSuccessBanner('Data Integrity Engine scanned 12,480 job postings & 214 employer records: 4 active anomalies isolated.');
      setTimeout(() => setSuccessBanner(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider font-mono">
              Integrity & Anomaly Protection Layer
            </span>
          </div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
            Data Quality & Telemetry Audit Engine
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Statistical screening to sanitize scraped job postings, eliminate duplicate corporate submissions, and prevent hallucinatory labour demand distortions.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={scanRunning}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
        >
          {scanRunning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Auditing Signals...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              <span>Run Live Integrity Audit</span>
            </>
          )}
        </button>
      </div>

      {successBanner && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Main Grid: Alerts List & Detail Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Alerts List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            Active Anomaly Detections ({alerts.length})
          </div>

          <div className="space-y-2">
            {alerts.map((alert) => {
              const isSelected = alert.id === activeAlert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-500'
                      : 'bg-white border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      {alert.type}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase font-semibold ${
                      alert.status === 'quarantined'
                        ? 'bg-rose-100 text-rose-800'
                        : alert.status === 'investigating'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {alert.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                    {alert.description}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-stone-500">
                    <span>Impact: <strong>{alert.affectedRecordsCount} records</strong></span>
                    <span className="font-mono text-stone-400">Confidence: {alert.confidencePercent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Incident Card (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                DATA QUALITY ALERT #{activeAlert.id.toUpperCase()}
              </span>
              <h2 className="text-base font-bold text-stone-900 mt-1">
                {activeAlert.type}
              </h2>
              <div className="text-xs text-stone-500 mt-0.5">
                Feed: <strong>{activeAlert.sourceFeed}</strong> • Detected: {activeAlert.detectedAt}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Anomaly Confidence</div>
              <div className="text-2xl font-bold font-mono text-amber-700">
                {activeAlert.confidencePercent}%
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
            <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
              Diagnosis & Statistical Evidence
            </span>
            <p className="text-stone-800 leading-relaxed">
              {activeAlert.description}
            </p>
          </div>

          {/* Affected Metrics Impact */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase block">Affected Records</span>
              <span className="text-base font-bold font-mono text-stone-900 mt-0.5 block">
                {activeAlert.affectedRecordsCount}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase block">Current Status</span>
              <span className="text-xs font-bold font-mono uppercase text-amber-800 mt-0.5 block">
                {activeAlert.status}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase block">Mitigation Rule</span>
              <span className="text-xs font-semibold text-teal-800 mt-0.5 block">
                Excluded from Demand Weights
              </span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Action: Quarantine isolates records from state-wide polytechnic planning models.
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleResolveAlert(activeAlert.id, 'quarantined')}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-rose-700 hover:bg-rose-800 text-white flex items-center gap-1 shadow-2xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Confirm Quarantine</span>
              </button>

              <button
                onClick={() => handleResolveAlert(activeAlert.id, 'resolved')}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Whitelist & Resolve</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
