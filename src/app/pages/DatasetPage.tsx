import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Badge2 } from './Badge';
import { Button2 } from './Button';
import { MetricCard } from './MetricCard';

import { 
  Download, Activity, FileText, TrendingUp, ArrowLeft 
} from 'lucide-react';

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// import { allDatasets } from '../data/datasets'; // <-- ensure correct path

const allDatasets = [
  {
    id: 'hESC',
    name: 'hESC',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 1872,
    cells: 758,
    edges: 3289,
    source: 'curated' as const,
    lastUpdated: '2024-11-15',
    sparklineData: [34, 45, 52, 48, 61, 73, 68, 82, 91, 78]
  },
  {
    id: 'mDC',
    name: 'mDC',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1547,
    cells: 383,
    edges: 2456,
    source: 'real' as const,
    lastUpdated: '2024-10-28',
    sparklineData: [28, 31, 39, 42, 38, 51, 58, 64, 59, 71]
  },
  {
    id: 'mESC',
    name: 'mESC',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1654,
    cells: 421,
    edges: 2891,
    source: 'curated' as const,
    lastUpdated: '2024-11-08',
    sparklineData: [22, 35, 41, 48, 44, 59, 62, 71, 68, 75]
  },
  {
    id: 'hHep',
    name: 'hHep',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 1985,
    cells: 642,
    edges: 3567,
    source: 'synthetic' as const,
    lastUpdated: '2024-09-22',
    sparklineData: [31, 38, 42, 49, 55, 62, 58, 69, 77, 82]
  },
  {
    id: 'VSC',
    name: 'VSC',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1432,
    cells: 564,
    edges: 2234,
    source: 'curated' as const,
    lastUpdated: '2024-10-12',
    sparklineData: [19, 28, 34, 41, 48, 52, 59, 65, 71, 68]
  },
  {
    id: 'hHSPC',
    name: 'hHSPC',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 2145,
    cells: 823,
    edges: 4156,
    source: 'real' as const,
    lastUpdated: '2024-09-05',
    sparklineData: [42, 51, 58, 62, 69, 75, 81, 88, 92, 89]
  },
  {
    id: 'mHSC-E',
    name: 'mHSC-E',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1789,
    cells: 645,
    edges: 3012,
    source: 'curated' as const,
    lastUpdated: '2024-11-01',
    sparklineData: [25, 33, 39, 46, 53, 61, 68, 74, 79, 85]
  },
  {
    id: 'mHSC-L',
    name: 'mHSC-L',
    organism: 'Mouse',
    type: 'scRNA-seq',
    genes: 1823,
    cells: 712,
    edges: 3178,
    source: 'curated' as const,
    lastUpdated: '2024-10-29',
    sparklineData: [28, 36, 43, 49, 56, 64, 71, 77, 82, 88]
  },
  {
    id: 'Synthetic-1',
    name: 'Synthetic-1',
    organism: 'Synthetic',
    type: 'scRNA-seq',
    genes: 1500,
    cells: 500,
    edges: 2500,
    source: 'synthetic' as const,
    lastUpdated: '2024-08-15',
    sparklineData: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
  },
  {
    id: 'Synthetic-2',
    name: 'Synthetic-2',
    organism: 'Synthetic',
    type: 'scRNA-seq',
    genes: 2000,
    cells: 750,
    edges: 3500,
    source: 'synthetic' as const,
    lastUpdated: '2024-08-20',
    sparklineData: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
  },
  {
    id: 'yeast-1',
    name: 'Yeast Network 1',
    organism: 'Yeast',
    type: 'Bulk RNA-seq',
    genes: 987,
    cells: 234,
    edges: 1456,
    source: 'real' as const,
    lastUpdated: '2024-07-10',
    sparklineData: [18, 24, 31, 37, 44, 51, 57, 63, 68, 72]
  },
  {
    id: 'yeast-2',
    name: 'Yeast Network 2',
    organism: 'Yeast',
    type: 'Bulk RNA-seq',
    genes: 1123,
    cells: 298,
    edges: 1789,
    source: 'real' as const,
    lastUpdated: '2024-07-22',
    sparklineData: [21, 27, 34, 40, 47, 54, 60, 66, 71, 75]
  }
];

export function DatasetPage() {

  const location = useLocation();
  const navigate = useNavigate();

  // Extract dataset ID dynamically
  const datasetId = location.pathname.substring(9);       // "/dataset/<id>"
  const ds = allDatasets.find(d => d.id === datasetId);   // Resolve dataset

  if (!ds) {
    return (
      <div className="p-20 text-center text-xl text-red-500">
        Dataset "{datasetId}" not found.
      </div>
    );
  }

  // ---- Dynamic substitutions ----

  const dynamicGeneDist = ds.sparklineData.map((v, i) => ({
    range: `Bin ${i + 1}`,
    count: v
  }));

  const dynamicCellTypes = [
    { name: "Cluster A", value: Math.round(ds.cells * 0.32), color: '#5B2C6F' },
    { name: "Cluster B", value: Math.round(ds.cells * 0.26), color: '#7A3A94' },
    { name: "Cluster C", value: Math.round(ds.cells * 0.20), color: '#9B5BB5' },
    { name: "Cluster D", value: Math.round(ds.cells * 0.16), color: '#BB7CD6' },
  ];

  const lastUpdatedDate = new Date(ds.lastUpdated);

  const formatNumber = (n: number) =>
    Intl.NumberFormat('en-US').format(n);



  

// ---------------- Backend Integrated Logic ----------------

const API_BASE = "http://localhost:8000";

const [isRunning, setIsRunning] = useState(false);
const [taskId, setTaskId] = useState<string | null>(null);
const [progress, setProgress] = useState<number>(0);
const [runResult, setRunResult] = useState<any | null>(null);
const [showResult, setShowResult] = useState(false);


// POLLING INTERVAL
const POLL_INTERVAL = 1500;

// ---------------- Start Benchmark + Receive Celery Task ID ----------------
async function handleRunBenchmark() {
  setIsRunning(true);
  setProgress(0);
  setRunResult(null);
  setTaskId(null);

  try {
    const res = await fetch(`${API_BASE}/benchmark/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset_id: datasetId }),
    });

    const data = await res.json();
    setTaskId(data.task_id);

    pollTaskStatus(data.task_id);
  } catch (err) {
    alert("Failed to start benchmark.");
    setIsRunning(false);
  }
}

// ---------------- POLL CELERY TASK STATUS ----------------
async function pollTaskStatus(taskId: string) {
  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${API_BASE}/benchmark/status/${taskId}`);
      const data = await res.json();

      setProgress(data.progress ?? 0);

      // DONE
      if (data.state === "SUCCESS") {
        clearInterval(interval);
        setRunResult(data.result);
        setShowResult(true);
        setIsRunning(false);
      }

      // ERROR
      if (data.state === "FAILURE") {
        clearInterval(interval);
        alert("Benchmark failed.");
        setIsRunning(false);
      }
    } catch (err) {
      clearInterval(interval);
      setIsRunning(false);
    }
  }, POLL_INTERVAL);
}


// ---------------- Download Ground Truth ----------------
async function handleDownloadGroundTruth() {
  try {
    const res = await fetch(`${API_BASE}/datasets/${datasetId}/ground-truth`, {
      method: "GET",
    });

    if (!res.ok) {
      alert("Failed to download ground truth.");
      return;
    }

    // Get filename from headers or fallback
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    const contentDisp = res.headers.get("Content-Disposition");
    const fileName = contentDisp?.split("filename=")[1]?.replace(/"/g, "") 
      || `${datasetId}_ground_truth.csv`;

    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error downloading ground truth.");
  }
}

// ---------------- Run Benchmark ----------------
// async function handleRunBenchmark() {
//   setIsRunning(true);

//   try {
//     const res = await fetch(`${API_BASE}/benchmark/run`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ dataset_id: datasetId }),
//     });

//     if (!res.ok) {
//       alert("Benchmark failed.");
//       setIsRunning(false);
//       return;
//     }

//     const data = await res.json();
//     setRunResult(data);
//     setShowResult(true);
//   } catch (err) {
//     alert("Benchmark execution failed.");
//   } finally {
//     setIsRunning(false);
//   }
// }

  return (
    <div className="mt-15 max-w-[1600px] mx-auto px-6 py-8">

      {/* Back Button */}
      <Button2 
        variant="ghost"
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/datasets')}
        className="mb-6"
      >
        Back to Dataset Lists
      </Button2>

      {/* Header */}
      <div className="bg-card rounded-lg p-6 border border-border mb-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">

          {/* Icon + Title */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-card-foreground font-semibold text-xlg">
                  {ds.name} Dataset
                </h1>

                <Badge2 variant="success">Validated</Badge2>
                <Badge2 variant="info">{ds.type}</Badge2>
              </div>

              <p className="text-muted-foreground mb-3 text-lg">
                {ds.organism} dataset — {ds.type} expression profile
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Organism:</span>
                  <span className="text-card-foreground">{ds.organism}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Modality:</span>
                  <span className="text-card-foreground">{ds.type}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Edges:</span>
                  <span className="text-card-foreground">{formatNumber(ds.edges)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="text-card-foreground">{ds.lastUpdated}</span>
                </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button2 
              variant="secondary" 
              icon={<Download className="w-4 h-4"/>}
              onClick={handleDownloadGroundTruth}
            >
              Download Ground Truth
            </Button2>

            <Button2 
              variant="primary" 
              onClick={handleRunBenchmark}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Run Benchmark"}
            </Button2>
          </div>
        </div>


        {/* Metadata */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-card-foreground mb-4 font-semibold">Dataset Metadata</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Source */}
            <div className="p-4 rounded-lg border border-purple-100 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700">
              <p className="text-xs text-purple-600 dark:text-purple-300 mb-1">Source</p>
              <p className="text-card-foreground capitalize">{ds.source}</p>
              <p className="text-xs text-muted-foreground mt-1">Dataset origin</p>
            </div>

            {/* Size */}
            <div className="p-4 rounded-lg border border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
              <p className="text-xs text-blue-600 dark:text-blue-300 mb-1">Size</p>
              <p className="text-card-foreground">{formatNumber(ds.genes)} genes</p>
              <p className="text-xs text-muted-foreground mt-1">{formatNumber(ds.cells)} samples</p>
            </div>

            {/* Last updated */}
            <div className="p-4 rounded-lg border border-green-100 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
              <p className="text-xs text-green-600 dark:text-green-300 mb-1">Last Updated</p>
              <p className="text-card-foreground">{ds.lastUpdated}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {lastUpdatedDate.toDateString()}
              </p>
            </div>

            {/* Version (dynamic placeholder) */}
            <div className="p-4 rounded-lg border border-orange-100 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700">
              <p className="text-xs text-orange-600 dark:text-orange-300 mb-1">Version</p>
              <p className="text-card-foreground">v1.0.{Math.floor(Math.random() * 9)}</p>
              <p className="text-xs text-muted-foreground mt-1">Autogenerated</p>
            </div>
          </div>
        </div>
      </div>


      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          label="Total Genes" 
          value={formatNumber(ds.genes)} 
          icon={<FileText className="w-6 h-6" />} 
        />

        <MetricCard 
          label="Known Edges" 
          value={formatNumber(ds.edges)} 
          icon={<TrendingUp className="w-6 h-6" />} 
        />

        <MetricCard 
          label="Total Samples" 
          value={formatNumber(ds.cells)} 
          icon={<Activity className="w-6 h-6" />} 
        />

        <MetricCard 
          label="Sparsity" 
          value={`${(1 - ds.edges / (ds.genes * ds.genes)).toFixed(2)}%`}
          icon={<Activity className="w-6 h-6" />} 
        />
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Gene Distribution */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-card-foreground mb-1 font-semibold">Gene Expression Distribution</h3>
          <p className="text-muted-foreground text-sm mb-6">Sparkline-derived synthetic distribution</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dynamicGeneDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cell Types */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-card-foreground mb-1 font-semibold">Cell Type Composition</h3>
          <p className="text-muted-foreground text-sm mb-6">Synthetic cell population distribution</p>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie 
                data={dynamicCellTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {dynamicCellTypes.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {dynamicCellTypes.map(t => (
              <div key={t.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-sm text-card-foreground">{t.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Quality Metrics — placeholder dynamic */}
      <div className="bg-card rounded-lg p-6 border border-border mb-8">
        <h3 className="text-card-foreground mb-1 font-semibold">Quality Control Metrics</h3>
        <p className="text-muted-foreground text-sm mb-6">Autogenerated QC metrics</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-xs text-muted-foreground mb-1">Mean UMI Count</p>
            <p className="text-2xl text-card-foreground">{formatNumber(ds.genes * 2)}</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-xs text-muted-foreground mb-1">Median Genes/Cell</p>
            <p className="text-2xl text-card-foreground">{formatNumber(Math.floor(ds.genes / 2))}</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-xs text-muted-foreground mb-1">Mitochondrial %</p>
            <p className="text-2xl text-card-foreground">{(Math.random() * 5).toFixed(1)}%</p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <p className="text-xs text-muted-foreground mb-1">Doublet Rate</p>
            <p className="text-2xl text-card-foreground">{(Math.random() * 3).toFixed(1)}%</p>
          </div>

        </div>
      </div>


      {/* Footer Actions */}
      <div className="flex flex-wrap gap-4">
        <Button2 variant="primary" onClick={() => navigate('/compare')}>
          Compare Algorithms on this Dataset
        </Button2>

        <Button2 variant="secondary" onClick={() => navigate(`/upload/recent`)}>
          View All Runs
        </Button2>

        <Button2 variant="secondary" onClick={() => navigate('/upload')}>
          Upload New Predictions
        </Button2>
      </div>

      {isRunning && (
        <div className="mt-6 w-full">
          <div className="text-sm text-muted-foreground mb-2">
            Benchmark Running… {progress}%
          </div>
          <div className="w-full h-3 bg-muted rounded-lg overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}


      {showResult && runResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg border border-border max-w-lg w-full">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Benchmark Completed
            </h2>

            <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(runResult, null, 2)}
            </pre>

            <div className="mt-6 flex justify-end">
              <Button2 variant="primary" onClick={() => setShowResult(false)}>
                Close
              </Button2>
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <footer className="border-t bg-background mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2026 WebGenie Platform. MIT License.
            </p>

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built upon</span>
              <span className="text-primary">BEELINE</span>
              <span>Benchmarking Platform</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
