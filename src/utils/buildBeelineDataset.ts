export interface BeelineEdge {
  source: string;
  target: string;
  type: "activation" | "repression";
}

// export interface BeelineNode {
//   id: string;
//   label: string;
//   importance: number;
// }

export interface BeelineNode {
  id: string;
  label: string;
  importance: number;
  inDegree: number;
  outDegree: number;
  degree: number;
  neighbors: string[];
  activators: string[];
  repressors: string[];
  bestAlgo?: string;
  bestMean?: number;
}


// export function buildBeelineDataset(edges: BeelineEdge[]) {
//   const nodeMap = new Map<string, number>();

//   edges.forEach((edge) => {
//     nodeMap.set(edge.source, (nodeMap.get(edge.source) ?? 0) + 1);
//     nodeMap.set(edge.target, (nodeMap.get(edge.target) ?? 0) + 1);
//   });

//   const nodes: BeelineNode[] = Array.from(nodeMap.entries()).map(
//     ([id, degree]) => ({
//       id,
//       label: id,
//       importance: degree
//     })
//   );

//   return {
//     nodes,
//     edges
//   };
// }


export function buildBeelineDataset(edges: BeelineEdge[]) {
  const nodeMap = new Map<string, BeelineNode>();

  function ensureNode(id: string) {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        label: id,
        importance: 0,
        inDegree: 0,
        outDegree: 0,
        degree: 0,
        neighbors: [],
        activators: [],
        repressors: []
      });
    }
    return nodeMap.get(id)!;
  }

  edges.forEach(edge => {
    const source = ensureNode(edge.source);
    const target = ensureNode(edge.target);

    // Degrees
    source.outDegree++;
    target.inDegree++;

    // Neighbor tracking
    source.neighbors.push(target.id);
    target.neighbors.push(source.id);

    // Edge type tracking
    if (edge.type === "activation") {
      target.activators.push(source.id);
    } else {
      target.repressors.push(source.id);
    }
  });

  // Final calculations
  nodeMap.forEach(node => {
    node.degree = node.inDegree + node.outDegree;
    node.importance = node.degree; // or replace with centrality later
  });

  return {
    nodes: Array.from(nodeMap.values()),
    edges
  };
}
