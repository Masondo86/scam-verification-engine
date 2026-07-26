'use client';

import { useEffect } from 'react';

type DataLeakModalProps = {
  isOpen: boolean;
  onClose: () => void;
  scanType: string;
};

const DFS_URL = 'https://digital-footprint-scanner.vercel.app';

export default function DataLeakModal({ isOpen, onClose, scanType }: DataLeakModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const label = scanType === 'email' ? 'email' : scanType === 'URL' ? 'URL' : scanType === 'phone' ? 'phone' : 'SMS';
  const question = `Did this ${label} come directly to your phone?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Check your digital exposure</h2>
            <p className="mt-2 text-sm text-slate-600">
              We can help you confirm whether your data may have been exposed.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">{question}</p>
          <p className="mt-2">
            If so, it&apos;s important to check if your data was not leaked or your device compromised.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <a
            href={DFS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Yes – Check My Digital Exposure
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
          >
            No, skip this
          </button>
        </div>
      </div>
    </div>
  );
}
