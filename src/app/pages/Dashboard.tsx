import { TrendingUp, Database, GitCompare, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const performanceData = [
  { algorithm: 'GENIE3', score: 0.847 },
  { algorithm: 'GRNBoost2', score: 0.803 },
  { algorithm: 'SCENIC', score: 0.769 },
  { algorithm: 'SINCERITIES', score: 0.734 },
  { algorithm: 'PIDC', score: 0.691 },
  { algorithm: 'PPCOR', score: 0.612 },
];

const recentResults = [
  {
    id: 1,
    dataset: 'HSC_Synthetic_100',
    algorithm: 'GENIE3',
    auroc: '0.847',
    auprc: '0.763',
    status: 'completed',
    date: '2h ago',
  },
  {
    id: 2,
    dataset: 'mESC_hematopoietic',
    algorithm: 'GRNBoost2',
    auroc: '0.803',
    auprc: '0.721',
    status: 'completed',
    date: '5h ago',
  },
  {
    id: 3,
    dataset: 'hESC_definitive_endoderm',
    algorithm: 'SCENIC',
    auroc: '0.769',
    auprc: '0.678',
    status: 'completed',
    date: '1d ago',
  },
];

const algorithmComparison = [
  { algorithm: 'GENIE3', auroc: 0.847, auprc: 0.763, f1: 0.782, runtime: 45 },
  { algorithm: 'GRNBoost2', auroc: 0.803, auprc: 0.721, f1: 0.756, runtime: 38 },
  { algorithm: 'SCENIC', auroc: 0.769, auprc: 0.678, f1: 0.741, runtime: 92 },
  { algorithm: 'SINCERITIES', auroc: 0.734, auprc: 0.638, f1: 0.721, runtime: 156 },
  { algorithm: 'PIDC', auroc: 0.691, auprc: 0.612, f1: 0.668, runtime: 28 },
  { algorithm: 'PPCOR', auroc: 0.612, auprc: 0.553, f1: 0.601, runtime: 21 },
];

export function Dashboard() {
  return (
    <div id="overview" className="min-h-screen py-20 pb-0">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of recent benchmarking results and system metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Total Runs</div>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">1,847</div>
            <div className="text-xs text-secondary mt-1">+12% from last month</div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Datasets</div>
              <Database className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground mt-1">Across 5 organisms</div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Algorithms</div>
              <GitCompare className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground mt-1">Benchmarked methods</div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Avg. AUROC</div>
              <Activity className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-2xl font-bold">0.742</div>
            <div className="text-xs text-secondary mt-1">+0.03 improvement</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div id="performance" className="lg:col-span-2 rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Algorithm Performance</h2>
              <p className="text-sm text-muted-foreground">
                Average AUROC scores across all datasets
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="algorithm"
                    className="text-xs"
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                    domain={[0, 1]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {performanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Results */}
          <div id="recent" className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Recent Results</h2>
              <p className="text-sm text-muted-foreground">Latest benchmark runs</p>
            </div>
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="p-3 rounded-lg border bg-accent/50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">{result.dataset}</div>
                    <div className="text-xs text-muted-foreground">{result.date}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {result.algorithm}
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">AUROC:</span>{' '}
                      <span className="font-medium">{result.auroc}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">AUPRC:</span>{' '}
                      <span className="font-medium">{result.auprc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Algorithm Comparison Table */}
        <div id="comparison" className="mt-6 rounded-lg border bg-card p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Algorithm Comparison</h2>
            <p className="text-sm text-muted-foreground">
              Detailed performance metrics across all benchmarked algorithms
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Algorithm
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    AUROC
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    AUPRC
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    F1 Score
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Runtime (s)
                  </th>
                </tr>
              </thead>
              <tbody>
                {algorithmComparison.map((algo, index) => (
                  <tr key={algo.algorithm} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? 'bg-primary' : 'bg-secondary'
                          }`}
                        />
                        <span className="font-medium">{algo.algorithm}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-sm">
                      {algo.auroc.toFixed(3)}
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-sm">
                      {algo.auprc.toFixed(3)}
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-sm">
                      {algo.f1.toFixed(3)}
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-sm text-muted-foreground">
                      {algo.runtime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* -------------------- LANDINGPAGE FOOTER -------------------- */}
      {/* <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white">WebGenie</div>
                  <div className="text-xs text-gray-400">Benchmarking Platform</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Research-grade GRN inference benchmarking and visualization for evaluating
              gene regulatory network inference algorithms on single-cell data.
              </p>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Platform</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/datasets" className="hover:text-white transition-colors">Datasets</a></li>
                <li><a href="/compare" className="hover:text-white transition-colors">Algorithms</a></li>
                <li><a href="/upload" className="hover:text-white transition-colors">Upload</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/Murali-group/Beeline" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://github.com/ukanduchimeremezejames/WebgenieDark" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Subscribe</h5>
              <p className="text-sm text-gray-400 mb-2">Get updates about new datasets and algorithms</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm" />
                <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg text-white text-sm hover:bg-purple-700 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-sm">
            © 2026 WebGenie | Built on the BEELINE Platform. All rights reserved.
          </div>
        </div>
      </footer> */}

            {/* Footer */}
      <footer className="border-t bg-background mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <p className='text-sm text-muted-foreground'>© 2026 WebGenie Platform. Licensed under MIT. All rights reserved.</p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Built upon the </span>
                    <span className="text-primary">BEELINE</span>
                    <span> GRN Benchmarking Platform </span>
                  </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
