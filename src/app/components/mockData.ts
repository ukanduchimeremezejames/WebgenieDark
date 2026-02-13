import { Dataset, Algorithm, PerformanceMetrics, Job, NetworkData } from './types';

// export const mockInferenceData = {
//   genes: [
//     { id: "SOX2", label: "SOX2" },
//     { id: "OCT4", label: "OCT4" },
//     { id: "NANOG", label: "NANOG" },
//     { id: "MYC", label: "MYC" },
//     { id: "KLF4", label: "KLF4" }
//   ],

//   algorithms: ["GENIE3", "GRNBoost2", "PIDC", "SCENIC"],

//   edges: [
//     {
//       id: "SOX2_OCT4",
//       source: "SOX2",
//       target: "OCT4",
//       type: "activation",
//       scores: {
//         GENIE3: 0.89,
//         GRNBoost2: 0.83,
//         PIDC: 0.72
//       }
//     },
//     {
//       id: "OCT4_NANOG",
//       source: "OCT4",
//       target: "NANOG",
//       type: "activation",
//       scores: {
//         GENIE3: 0.91,
//         SCENIC: 0.77
//       }
//     },
//     {
//       id: "MYC_KLF4",
//       source: "MYC",
//       target: "KLF4",
//       type: "repression",
//       scores: {
//         GRNBoost2: 0.68
//       }
//     }
//   ]
// };

export const mockInferenceData = {
  genes: [
    "SOX2","OCT4","NANOG","MYC","KLF4",
    "ESRRB","TBX3","ZFP42","STAT3","PRDM14",
    "GATA6","FOXA2","SMAD2","SMAD3","CTNNB1",
    "LEFTY1","LEFTY2","FGF4","DPPA4","LIN28A",
    "SALL4","TET1","TET2","DNMT3B","POU5F1"
  ].map(g => ({ id: g, label: g })),

  algorithms: ["GENIE3", "GRNBoost2", "PIDC", "SCENIC"],

  edges: [
    // Core pluripotency loop
    { id:"SOX2_OCT4", source:"SOX2", target:"OCT4", type:"activation",
      scores:{ GENIE3:0.89, GRNBoost2:0.83, PIDC:0.72 } },

    { id:"OCT4_NANOG", source:"OCT4", target:"NANOG", type:"activation",
      scores:{ GENIE3:0.91, SCENIC:0.77 } },

    { id:"NANOG_SOX2", source:"NANOG", target:"SOX2", type:"activation",
      scores:{ GENIE3:0.88, PIDC:0.74 } },

    // Secondary regulators
    { id:"MYC_KLF4", source:"MYC", target:"KLF4", type:"repression",
      scores:{ GRNBoost2:0.68, PIDC:0.60 } },

    { id:"KLF4_ESRRB", source:"KLF4", target:"ESRRB", type:"activation",
      scores:{ GENIE3:0.79, SCENIC:0.71 } },

    { id:"ESRRB_TBX3", source:"ESRRB", target:"TBX3", type:"activation",
      scores:{ GENIE3:0.75 } },

    { id:"TBX3_STAT3", source:"TBX3", target:"STAT3", type:"activation",
      scores:{ PIDC:0.66 } },

    { id:"STAT3_PRDM14", source:"STAT3", target:"PRDM14", type:"activation",
      scores:{ GRNBoost2:0.73 } },

    { id:"PRDM14_ZFP42", source:"PRDM14", target:"ZFP42", type:"activation",
      scores:{ SCENIC:0.70 } },

    // Differentiation branch
    { id:"SMAD2_GATA6", source:"SMAD2", target:"GATA6", type:"activation",
      scores:{ GENIE3:0.81 } },

    { id:"SMAD3_FOXA2", source:"SMAD3", target:"FOXA2", type:"activation",
      scores:{ PIDC:0.76 } },

    { id:"CTNNB1_TCF", source:"CTNNB1", target:"LEFTY1", type:"activation",
      scores:{ GENIE3:0.78 } },

    { id:"LEFTY1_LEFTY2", source:"LEFTY1", target:"LEFTY2", type:"activation",
      scores:{ SCENIC:0.69 } },

    { id:"FGF4_NANOG", source:"FGF4", target:"NANOG", type:"activation",
      scores:{ GENIE3:0.84 } },

    { id:"DPPA4_OCT4", source:"DPPA4", target:"OCT4", type:"activation",
      scores:{ PIDC:0.72 } },

    { id:"LIN28A_MYC", source:"LIN28A", target:"MYC", type:"activation",
      scores:{ GENIE3:0.80 } },

    { id:"SALL4_NANOG", source:"SALL4", target:"NANOG", type:"activation",
      scores:{ GRNBoost2:0.77 } },

    { id:"TET1_DNMT3B", source:"TET1", target:"DNMT3B", type:"repression",
      scores:{ PIDC:0.67 } },

    { id:"TET2_DNMT3B", source:"TET2", target:"DNMT3B", type:"repression",
      scores:{ SCENIC:0.64 } },

    { id:"POU5F1_SOX2", source:"POU5F1", target:"SOX2", type:"activation",
      scores:{ GENIE3:0.88 } },

    // extra edges to exceed 20
    { id:"OCT4_KLF4", source:"OCT4", target:"KLF4", type:"activation",
      scores:{ GENIE3:0.74 } },

    { id:"NANOG_ESRRB", source:"NANOG", target:"ESRRB", type:"activation",
      scores:{ SCENIC:0.73 } },

    { id:"MYC_STAT3", source:"MYC", target:"STAT3", type:"activation",
      scores:{ PIDC:0.71 } },

    { id:"GATA6_FOXA2", source:"GATA6", target:"FOXA2", type:"activation",
      scores:{ GENIE3:0.69 } },

    { id:"SMAD2_SMAD3", source:"SMAD2", target:"SMAD3", type:"activation",
      scores:{ GENIE3:0.82 } }
  ]
};


export const mockDatasets: Dataset[] = [
  {
    id: 'hESC',
    name: 'hESC',
    organism: 'Human',
    type: 'scRNA-seq',
    genes: 1872,
    cells: 758,
    edges: 3289,
    source: 'curated' as const,
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
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
    description: 'Human embryonic stem cells single-cell RNA-seq dataset',
    sparklineData: [21, 27, 34, 40, 47, 54, 60, 66, 71, 75]
  }
];

export const mockAlgorithms: Algorithm[] = [
  {
    id: 'alg1',
    name: 'GENIE3',
    version: '1.0',
    description: 'Tree-based network inference using random forests',
    category: 'Tree-based',
    lastCommitMessage: 'Yiqi dockerfiles pull',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg2',
    name: 'GRNBoost2',
    version: '1.0',
    description: 'Gradient Boosting inference with GRNBoost2',
    category: 'Gradient Boosting',
    lastCommitMessage: 'Added BoolTraineR.',
    lastCommitDate: '7 years ago'
  },
  {
    id: 'alg3',
    name: 'Pearson',
    version: '1.0',
    description: 'Gene regulatory inference using Correlation',
    category: 'Correlation',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg4',
    name: 'Spearman',
    version: '1.0',
    description: 'Beeline Processed Dataset based on Spearman correlation and network inference',
    category: 'Correlation',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg5',
    name: 'ARACNE',
    version: '1.0',
    description: 'Information Theory for network inference',
    category: 'Information Theory',
    lastCommitMessage: 'tried to run the time command',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg6',
    name: 'SINGE',
    version: '1.2',
    description: 'SINGE is a Tree-based algorithm for running and benchmarking datasets',
    category: 'Tree-based',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg7',
    name: 'Probabilistic',
    version: '2.1',
    description: 'Partial Information Decomposition and Context based on probability',
    category: 'Information Theory',
    lastCommitMessage: 'Yiqi dockerfiles pull',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg8',
    name: 'GRISLI',
    version: '1.0',
    description: 'Pseudo-time network inference based on Dynamical Systems',
    category: 'Dynamical Systems',
    lastCommitMessage: 'Added time module to each of the dockers.',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg9',
    name: 'SCODE',
    version: '1.0',
    description: 'Linear Models based network inference',
    category: 'Linear Models',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg10',
    name: 'SCNS',
    version: '1.0',
    description: 'Single-cell network inference with Linear Models',
    category: 'Linear Models',
    lastCommitMessage: 'Set user to avoid permission issues',
    lastCommitDate: '5 years ago'
  },
  {
    id: 'alg11',
    name: 'LEAP',
    version: '1.0',
    description: 'Single-cell network inference based on Regression Analysis',
    category: 'Regression',
    lastCommitMessage: 'leap dockerfile fix',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg12',
    name: 'Arboreto',
    version: '1.0',
    description: 'A Tree-based Network inference from single-cell expression data',
    category: 'Tree-based',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  }
];

export const mockPerformanceMetrics: PerformanceMetrics[] = [
  {
    algorithmId: 'alg1',
    algorithmName: 'GENIE3',
    precision: 0.71,
    recall: 0.69,
    f1Score: 0.70,
    auroc: 0.82,
    auprc: 0.75,
    earlyPrecision: 0.68,
    runtime: 132.4,
    memoryUsage: 2200
  },
  {
    algorithmId: 'alg2',
    algorithmName: 'GRNBoost2',
    precision: 0.63,
    recall: 0.60,
    f1Score: 0.61,
    auroc: 0.74,
    auprc: 0.66,
    earlyPrecision: 0.57,
    runtime: 245.1,
    memoryUsage: 2700
  },
  {
    algorithmId: 'alg3',
    algorithmName: 'Pearson',
    precision: 0.68,
    recall: 0.71,
    f1Score: 0.69,
    auroc: 0.80,
    auprc: 0.72,
    earlyPrecision: 0.66,
    runtime: 154.8,
    memoryUsage: 2400
  },
  {
    algorithmId: 'alg4',
    algorithmName: 'Spearman',
    precision: 0.66,
    recall: 0.67,
    f1Score: 0.66,
    auroc: 0.76,
    auprc: 0.69,
    earlyPrecision: 0.61,
    runtime: 178.3,
    memoryUsage: 2816
  },
  {
    algorithmId: 'alg5',
    algorithmName: 'ARACNE',
    precision: 0.62,
    recall: 0.58,
    f1Score: 0.60,
    auroc: 0.72,
    auprc: 0.64,
    earlyPrecision: 0.55,
    runtime: 268.9,
    memoryUsage: 3000
  },
  {
    algorithmId: 'alg6',
    algorithmName: 'SINGE',
    precision: 0.69,
    recall: 0.73,
    f1Score: 0.71,
    auroc: 0.81,
    auprc: 0.74,
    earlyPrecision: 0.67,
    runtime: 143.2,
    memoryUsage: 2304
  },
  {
    algorithmId: 'alg7',
    algorithmName: 'GRNVBEM',
    precision: 0.71,
    recall: 0.68,
    f1Score: 0.69,
    auroc: 0.80,
    auprc: 0.73,
    earlyPrecision: 0.70,
    runtime: 98.2,
    memoryUsage: 1536
  },
  {
    algorithmId: 'alg8',
    algorithmName: 'GRISLI',
    precision: 0.64,
    recall: 0.63,
    f1Score: 0.63,
    auroc: 0.75,
    auprc: 0.67,
    earlyPrecision: 0.59,
    runtime: 221.5,
    memoryUsage: 2600
  },
  {
    algorithmId: 'alg9',
    algorithmName: 'SCODE',
    precision: 0.62,
    recall: 0.65,
    f1Score: 0.63,
    auroc: 0.74,
    auprc: 0.68,
    earlyPrecision: 0.58,
    runtime: 156.8,
    memoryUsage: 2560
  },
  {
    algorithmId: 'alg10',
    algorithmName: 'SCNS',
    precision: 0.67,
    recall: 0.64,
    f1Score: 0.65,
    auroc: 0.77,
    auprc: 0.70,
    earlyPrecision: 0.62,
    runtime: 285.4,
    memoryUsage: 3100
  },
  {
    algorithmId: 'alg11',
    algorithmName: 'LEAP',
    precision: 0.58,
    recall: 0.62,
    f1Score: 0.60,
    auroc: 0.71,
    auprc: 0.65,
    earlyPrecision: 0.54,
    runtime: 195.7,
    memoryUsage: 2400
  },
  {
    algorithmId: 'alg12',
    algorithmName: 'Arboreto',
    precision: 0.65,
    recall: 0.68,
    f1Score: 0.66,
    auroc: 0.76,
    auprc: 0.70,
    earlyPrecision: 0.61,
    runtime: 168.3,
    memoryUsage: 2450
  }
];

export const mockJobs: Job[] = [
  {
    id: 'job1',
    datasetId: 'ds1',
    datasetName: 'hESC',
    algorithmId: 'alg3',
    algorithmName: 'GRNBoost2',
    status: 'completed',
    progress: 100,
    startTime: '2026-02-04T10:30:00',
    endTime: '2026-02-05T10:31:27'
  },
  {
    id: 'job2',
    datasetId: 'ds2',
    datasetName: 'mDC',
    algorithmId: 'alg1',
    algorithmName: 'GENIE3',
    status: 'running',
    progress: 67,
    startTime: '2026-02-02T11:15:00'
  },
  {
    id: 'job3',
    datasetId: 'ds3',
    datasetName: 'HSC',
    algorithmId: 'alg7',
    algorithmName: 'SCENIC',
    status: 'pending',
    progress: 0,
    startTime: '2026-01-30T11:30:00'
  },
  {
    id: 'job4',
    datasetId: 'ds4',
    datasetName: 'DREAM',
    algorithmId: 'alg2',
    algorithmName: 'PIDC',
    status: 'failed',
    progress: 45,
    startTime: '2026-02-01T09:45:00',
    endTime: '2026-02-05T09:50:12',
    error: 'Memory allocation failed: insufficient resources'
  }
];

// export const mockNetworkData: NetworkData = {
//   nodes: [
//     { id: 'GENE1', label: 'NANOG', score: 0.95 },
//     { id: 'GENE2', label: 'OCT4', score: 0.92 },
//     { id: 'GENE3', label: 'SOX2', score: 0.89 },
//     { id: 'GENE4', label: 'KLF4', score: 0.85 },
//     { id: 'GENE5', label: 'MYC', score: 0.82 },
//     { id: 'GENE6', label: 'ESRRB', score: 0.78 },
//     { id: 'GENE7', label: 'TBX3', score: 0.75 },
//     { id: 'GENE8', label: 'ZFP42', score: 0.72 },
//     { id: 'GENE9', label: 'STAT3', score: 0.70 },
//     { id: 'GENE10', label: 'PRDM14', score: 0.68 }
//   ],
//   edges: [
//     { source: 'GENE1', target: 'GENE2', weight: 0.9, type: 'activation' },
//     { source: 'GENE1', target: 'GENE3', weight: 0.85, type: 'activation' },
//     { source: 'GENE2', target: 'GENE3', weight: 0.82, type: 'activation' },
//     { source: 'GENE3', target: 'GENE4', weight: 0.78, type: 'activation' },
//     { source: 'GENE2', target: 'GENE5', weight: 0.75, type: 'repression' },
//     { source: 'GENE4', target: 'GENE6', weight: 0.72, type: 'activation' },
//     { source: 'GENE5', target: 'GENE7', weight: 0.68, type: 'unknown' },
//     { source: 'GENE6', target: 'GENE8', weight: 0.65, type: 'activation' },
//     { source: 'GENE7', target: 'GENE9', weight: 0.62, type: 'repression' },
//     { source: 'GENE8', target: 'GENE10', weight: 0.58, type: 'activation' },
//     { source: 'GENE9', target: 'GENE1', weight: 0.70, type: 'activation' },
//     { source: 'GENE10', target: 'GENE4', weight: 0.55, type: 'unknown' }
//   ]
// };

// Helper functions for generating mock data

export const mockNetworkData: NetworkData = {
  nodes: mockInferenceData.genes.map(g => ({
    id: g.id,
    label: g.label,
    score: Number((0.6 + Math.random() * 0.4).toFixed(3))
  })),

  edges: mockInferenceData.edges.map(e => ({
    source: e.source,
    target: e.target,
    weight: Math.max(...Object.values(e.scores)),
    type: e.type
  }))
};

export function getAUPRCDistributionData() {
  return mockPerformanceMetrics.map(m => ({
    name: m.algorithmName,
    auprc: m.auprc,
    auroc: m.auroc,
    f1Score: m.f1Score
  }));
}

export function getPRCurveData(algorithmId: string) {
  // Generate mock Precision-Recall curve data
  const points = [];
  for (let recall = 0; recall <= 1; recall += 0.1) {
    const precision = 0.8 - recall * 0.3 + Math.random() * 0.1;
    points.push({ recall: recall, precision: Math.max(0, Math.min(1, precision)) });
  }
  return points;
}

export function getROCCurveData(algorithmId: string) {
  // Generate mock ROC curve data
  const points = [];
  for (let fpr = 0; fpr <= 1; fpr += 0.1) {
    const tpr = fpr + 0.2 + Math.random() * 0.1;
    points.push({ fpr: fpr, tpr: Math.min(1, tpr) });
  }
  return points;
}
