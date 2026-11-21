import React, { useEffect, useState } from 'react';

const PAGES = [{"path":"/platform","title":"Olymptrade login – Access your trading account","url":"/pages/platform.html","isBaseline":false},{"path":"/regulation","title":"Guarantees – Olymptrade","url":"/pages/regulation.html","isBaseline":false},{"path":"/about","title":"About Olymptrade – Trusted online broker","url":"/pages/about.html","isBaseline":false},{"path":"/statuses","title":"Statuses – Olymptrade","url":"/pages/statuses.html","isBaseline":false},{"path":"/support","title":"Help center and contact – Olymptrade","url":"/pages/support.html","isBaseline":false}];

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(PAGES[0]?.url || '');
  const [viewMode, setViewMode] = useState<'site' | 'artifacts'>('site');
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (viewMode === 'artifacts' && !summary) {
      fetch('/api/reports').then((r) => r.json()).then(setSummary).catch(() => {});
    }
  }, [viewMode, summary]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="h-12 px-4 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <span className="font-semibold text-sm truncate">Olymptrade login – Access your trading account</span>
        <div className="flex items-center gap-2 overflow-x-auto">
          {viewMode === 'site' && PAGES.map((p) => (
            <button
              key={p.url}
              onClick={() => setCurrentUrl(p.url)}
              className={`px-2.5 py-1 text-xs rounded whitespace-nowrap ${currentUrl === p.url ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {p.path}
            </button>
          ))}
          <button
            onClick={() => setViewMode(viewMode === 'site' ? 'artifacts' : 'site')}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 whitespace-nowrap"
          >
            {viewMode === 'site' ? 'Exported Artifacts' : 'Back to Pages'}
          </button>
        </div>
      </header>
      {viewMode === 'artifacts' ? (
        <main className="flex-1 overflow-auto p-6 max-w-5xl mx-auto w-full space-y-4">
          <h2 className="text-base font-semibold">Included Package Outputs & Reports</h2>
          <pre className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs overflow-auto">
            {summary ? JSON.stringify(summary, null, 2) : 'Loading package report summary...'}
          </pre>
        </main>
      ) : currentUrl ? (
        <iframe src={currentUrl} title="Reconstructed Site" className="flex-1 w-full border-0 bg-white" />
      ) : (
        <main className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-2">
            <h1 className="text-lg font-semibold">No Exported Pages Available</h1>
            <p className="text-sm text-slate-400">Run crawl and reconstruction in CloneForge Studio before exporting.</p>
          </div>
        </main>
      )}
    </div>
  );
}
