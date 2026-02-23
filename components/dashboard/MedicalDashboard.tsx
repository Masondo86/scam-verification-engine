'use client';

import CsvBulkUploadScanner from '@/components/dashboard/CsvBulkUploadScanner';

export default function MedicalDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Medical Review Portal</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <p className="mb-4 font-semibold">Flagged Claim</p>
        <p>Claim ID: CLM001</p>
        <p>ICD: J11</p>
        <p>CPT: 99214</p>
        <p className="mt-4 text-red-600 font-bold">Risk Level: High</p>

        <div className="mt-6 flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Escalate</button>
        </div>
      </div>

      <CsvBulkUploadScanner />
    </div>
  );
}
