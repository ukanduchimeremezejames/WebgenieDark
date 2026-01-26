import { Dataset, Algorithm, PerformanceMetrics, Job, NetworkData } from './types';

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

// [
//   {
//     id: 'ds1',
//     name: 'hESC',
//     organism: 'Human',
//     type: 'scRNA-seq',
//     genes: 1500,
//     cells: 758,
//     edges: 1250,
//     lastUpdated: '2025-12-15',
//     description: 'Human embryonic stem cells single-cell RNA-seq dataset'
//   },
//   {
//     id: 'ds2',
//     name: 'mDC',
//     organism: 'Mouse',
//     type: 'scRNA-seq',
//     genes: 1833,
//     cells: 383,
//     edges: 1543,
//     lastUpdated: '2025-12-10',
//     description: 'Mouse dendritic cells differentiation time series'
//   },
//   {
//     id: 'ds3',
//     name: 'HSC',
//     organism: 'Mouse',
//     type: 'scRNA-seq',
//     genes: 2126,
//     cells: 1095,
//     edges: 1802,
//     lastUpdated: '2025-12-08',
//     description: 'Hematopoietic stem cell differentiation'
//   },
//   {
//     id: 'ds4',
//     name: 'DREAM',
//     organism: 'Yeast',
//     type: 'bulk RNA-seq',
//     genes: 2500,
//     cells: 0,
//     edges: 3200,
//     lastUpdated: '2025-11-28',
//     description: 'DREAM challenge yeast dataset'
//   },
//   {
//     id: 'ds5',
//     name: 'GeneNetWeaver',
//     organism: 'Synthetic',
//     type: 'synthetic',
//     genes: 1000,
//     cells: 500,
//     edges: 800,
//     lastUpdated: '2025-12-01',
//     description: 'Synthetic network generated by GeneNetWeaver'
//   },
//   {
//     id: 'ds6',
//     name: 'mESC',
//     organism: 'Mouse',
//     type: 'scRNA-seq',
//     genes: 1987,
//     cells: 933,
//     edges: 1667,
//     lastUpdated: '2025-12-05',
//     description: 'Mouse embryonic stem cell differentiation'
//   }
// ];

// export interface Algorithm {
//   id: string;
//   name: string;
//   version: string;
//   description: string;
//   category: string;
//   lastCommitMessage: string;
//   lastCommitDate: string;
// }

export const mockAlgorithms: Algorithm[] = [
  {
    id: 'alg1',
    name: 'ARBORETO',
    version: '1.0',
    description: 'Tree-based network inference using random forests',
    category: 'Ensemble',
    lastCommitMessage: 'Yiqi dockerfiles pull',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg2',
    name: 'BTR',
    version: '1.0',
    description: 'Boolean network inference with BTR',
    category: 'Boolean',
    lastCommitMessage: 'Added BoolTraineR.',
    lastCommitDate: '7 years ago'
  },
  {
    id: 'alg3',
    name: 'GRISLI',
    version: '1.0',
    description: 'Gene regulatory inference using single-cell time series',
    category: 'Time Series',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg4',
    name: 'GRNVBEM',
    version: '1.0',
    description: 'Variational Bayesian EM for network inference',
    category: 'Bayesian',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg5',
    name: 'JUMP3',
    version: '1.0',
    description: 'Time-series network inference',
    category: 'Time Series',
    lastCommitMessage: 'tried to run the time command',
    lastCommitDate: '7 years ago'
  },
  {
    id: 'alg6',
    name: 'LEAP',
    version: '1.2',
    description: 'Lag-based expression association for pseudotime',
    category: 'Time Series',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg7',
    name: 'PIDC',
    version: '2.1',
    description: 'Partial Information Decomposition and Context',
    category: 'Information Theory',
    lastCommitMessage: 'Yiqi dockerfiles pull',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg8',
    name: 'PNI',
    version: '1.0',
    description: 'Pseudo-time network inference',
    category: 'Time Series',
    lastCommitMessage: 'Added time module to each of the dockers.',
    lastCommitDate: '7 years ago'
  },
  {
    id: 'alg9',
    name: 'PPCOR',
    version: '1.0',
    description: 'Partial correlation based network inference',
    category: 'Correlation',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg10',
    name: 'SCINGE',
    version: '1.0',
    description: 'Single-cell network inference with time series',
    category: 'Single Cell',
    lastCommitMessage: 'Set user to avoid permission issues',
    lastCommitDate: '5 years ago'
  },
  {
    id: 'alg11',
    name: 'SCNS',
    version: '1.0',
    description: 'Single-cell network inference',
    category: 'Single Cell',
    lastCommitMessage: 'scns dockerfile fix',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg12',
    name: 'SCODE',
    version: '1.0',
    description: 'Network inference from single-cell expression data',
    category: 'Single Cell',
    lastCommitMessage: 'Add README markdown files for algorithms integration',
    lastCommitDate: '3 years ago'
  },
  {
    id: 'alg13',
    name: 'SCRIBE',
    version: '1.0',
    description: 'Single-cell trajectory network inference',
    category: 'Single Cell',
    lastCommitMessage: 'bioclite is depreceated - moved monocle to biocmanager',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg14',
    name: 'SCSGL',
    version: '1.0',
    description: 'Single-cell sparse gene network learning',
    category: 'Single Cell',
    lastCommitMessage: 'Merge pull request #106 from Murali-group/dockerfileupdates',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg15',
    name: 'SINCERITIES',
    version: '1.5',
    description: 'Temporally informed network inference',
    category: 'Time Series',
    lastCommitMessage: 'scribe - added new mirror to sources',
    lastCommitDate: '2 years ago'
  },
  {
    id: 'alg16',
    name: 'SINGE',
    version: '1.0',
    description: 'Single-cell network inference',
    category: 'Single Cell',
    lastCommitMessage: 'fixed singe support - patch fix by allowing all certificates',
    lastCommitDate: '2 years ago'
  }
];


// export const mockPerformanceMetrics: PerformanceMetrics[] = [
//   {
//     algorithmId: 'alg1',
//     algorithmName: 'GENIE3',
//     precision: 0.68,
//     recall: 0.72,
//     f1Score: 0.70,
//     auroc: 0.82,
//     auprc: 0.75,
//     earlyPrecision: 0.65,
//     runtime: 125.4,
//     memoryUsage: 2048
//   },
//   {
//     algorithmId: 'alg2',
//     algorithmName: 'PIDC',
//     precision: 0.71,
//     recall: 0.68,
//     f1Score: 0.69,
//     auroc: 0.80,
//     auprc: 0.73,
//     earlyPrecision: 0.70,
//     runtime: 98.2,
//     memoryUsage: 1536
//   },
//   {
//     algorithmId: 'alg3',
//     algorithmName: 'GRNBoost2',
//     precision: 0.74,
//     recall: 0.76,
//     f1Score: 0.75,
//     auroc: 0.85,
//     auprc: 0.78,
//     earlyPrecision: 0.72,
//     runtime: 87.6,
//     memoryUsage: 1792
//   },
//   {
//     algorithmId: 'alg4',
//     algorithmName: 'PPCOR',
//     precision: 0.62,
//     recall: 0.65,
//     f1Score: 0.63,
//     auroc: 0.74,
//     auprc: 0.68,
//     earlyPrecision: 0.58,
//     runtime: 156.8,
//     memoryUsage: 2560
//   },
//   {
//     algorithmId: 'alg5',
//     algorithmName: 'SINCERITIES',
//     precision: 0.66,
//     recall: 0.70,
//     f1Score: 0.68,
//     auroc: 0.78,
//     auprc: 0.71,
//     earlyPrecision: 0.63,
//     runtime: 198.5,
//     memoryUsage: 3072
//   },
//   {
//     algorithmId: 'alg6',
//     algorithmName: 'LEAP',
//     precision: 0.69,
//     recall: 0.73,
//     f1Score: 0.71,
//     auroc: 0.81,
//     auprc: 0.74,
//     earlyPrecision: 0.67,
//     runtime: 143.2,
//     memoryUsage: 2304
//   },
//   {
//     algorithmId: 'alg7',
//     algorithmName: 'SCENIC',
//     precision: 0.70,
//     recall: 0.69,
//     f1Score: 0.69,
//     auroc: 0.79,
//     auprc: 0.72,
//     earlyPrecision: 0.68,
//     runtime: 215.7,
//     memoryUsage: 3328
//   },
//   {
//     algorithmId: 'alg8',
//     algorithmName: 'GRNVBEM',
//     precision: 0.65,
//     recall: 0.67,
//     f1Score: 0.66,
//     auroc: 0.76,
//     auprc: 0.69,
//     earlyPrecision: 0.61,
//     runtime: 178.3,
//     memoryUsage: 2816
//   }
// ];

export const mockPerformanceMetrics: PerformanceMetrics[] = [
  {
    algorithmId: 'alg1',
    algorithmName: 'ARBORETO',
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
    algorithmName: 'BTR',
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
    algorithmName: 'GRISLI',
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
    algorithmName: 'GRNVBEM',
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
    algorithmName: 'JUMP3',
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
    algorithmName: 'LEAP',
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
    algorithmName: 'PIDC',
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
    algorithmName: 'PNI',
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
    algorithmName: 'PPCOR',
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
    algorithmName: 'SCINGE',
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
    algorithmName: 'SCNS',
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
    algorithmName: 'SCODE',
    precision: 0.65,
    recall: 0.68,
    f1Score: 0.66,
    auroc: 0.76,
    auprc: 0.70,
    earlyPrecision: 0.61,
    runtime: 168.3,
    memoryUsage: 2450
  },
  {
    algorithmId: 'alg13',
    algorithmName: 'SCRIBE',
    precision: 0.73,
    recall: 0.70,
    f1Score: 0.71,
    auroc: 0.83,
    auprc: 0.76,
    earlyPrecision: 0.69,
    runtime: 142.6,
    memoryUsage: 2250
  },
  {
    algorithmId: 'alg14',
    algorithmName: 'SCSGL',
    precision: 0.60,
    recall: 0.64,
    f1Score: 0.62,
    auroc: 0.72,
    auprc: 0.66,
    earlyPrecision: 0.56,
    runtime: 209.5,
    memoryUsage: 2500
  },
  {
    algorithmId: 'alg15',
    algorithmName: 'SINCERITIES',
    precision: 0.66,
    recall: 0.70,
    f1Score: 0.68,
    auroc: 0.78,
    auprc: 0.71,
    earlyPrecision: 0.63,
    runtime: 198.5,
    memoryUsage: 3072
  },
  {
    algorithmId: 'alg16',
    algorithmName: 'SINGE',
    precision: 0.69,
    recall: 0.66,
    f1Score: 0.67,
    auroc: 0.79,
    auprc: 0.72,
    earlyPrecision: 0.64,
    runtime: 188.2,
    memoryUsage: 2890
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
    startTime: '2025-12-20T10:30:00',
    endTime: '2025-12-20T10:31:27'
  },
  {
    id: 'job2',
    datasetId: 'ds2',
    datasetName: 'mDC',
    algorithmId: 'alg1',
    algorithmName: 'GENIE3',
    status: 'running',
    progress: 67,
    startTime: '2025-12-20T11:15:00'
  },
  {
    id: 'job3',
    datasetId: 'ds3',
    datasetName: 'HSC',
    algorithmId: 'alg7',
    algorithmName: 'SCENIC',
    status: 'pending',
    progress: 0,
    startTime: '2025-12-20T11:30:00'
  },
  {
    id: 'job4',
    datasetId: 'ds4',
    datasetName: 'DREAM',
    algorithmId: 'alg2',
    algorithmName: 'PIDC',
    status: 'failed',
    progress: 45,
    startTime: '2025-12-20T09:45:00',
    endTime: '2025-12-20T09:50:12',
    error: 'Memory allocation failed: insufficient resources'
  }
];

export const mockNetworkData: NetworkData = {
  nodes: [
    { id: 'GENE1', label: 'NANOG', score: 0.95 },
    { id: 'GENE2', label: 'OCT4', score: 0.92 },
    { id: 'GENE3', label: 'SOX2', score: 0.89 },
    { id: 'GENE4', label: 'KLF4', score: 0.85 },
    { id: 'GENE5', label: 'MYC', score: 0.82 },
    { id: 'GENE6', label: 'ESRRB', score: 0.78 },
    { id: 'GENE7', label: 'TBX3', score: 0.75 },
    { id: 'GENE8', label: 'ZFP42', score: 0.72 },
    { id: 'GENE9', label: 'STAT3', score: 0.70 },
    { id: 'GENE10', label: 'PRDM14', score: 0.68 }
  ],
  edges: [
    { source: 'GENE1', target: 'GENE2', weight: 0.9, type: 'activation' },
    { source: 'GENE1', target: 'GENE3', weight: 0.85, type: 'activation' },
    { source: 'GENE2', target: 'GENE3', weight: 0.82, type: 'activation' },
    { source: 'GENE3', target: 'GENE4', weight: 0.78, type: 'activation' },
    { source: 'GENE2', target: 'GENE5', weight: 0.75, type: 'repression' },
    { source: 'GENE4', target: 'GENE6', weight: 0.72, type: 'activation' },
    { source: 'GENE5', target: 'GENE7', weight: 0.68, type: 'unknown' },
    { source: 'GENE6', target: 'GENE8', weight: 0.65, type: 'activation' },
    { source: 'GENE7', target: 'GENE9', weight: 0.62, type: 'repression' },
    { source: 'GENE8', target: 'GENE10', weight: 0.58, type: 'activation' },
    { source: 'GENE9', target: 'GENE1', weight: 0.70, type: 'activation' },
    { source: 'GENE10', target: 'GENE4', weight: 0.55, type: 'unknown' }
  ]
};

// Helper functions for generating mock data
export function getAUPRCDistributionData() {
  return mockPerformanceMetrics.map(m => ({
    name: m.algorithmName,
    auprc: m.auprc,
    auroc: m.auroc
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
