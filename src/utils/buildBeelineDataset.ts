export interface BeelineEdge {
  source: string;
  target: string;
  type: "activation" | "repression";
}

export interface BeelineNode {
  id: string;
  label: string;
  importance: number;
}

export function buildBeelineDataset(edges: BeelineEdge[]) {
  const nodeMap = new Map<string, number>();

  edges.forEach((edge) => {
    nodeMap.set(edge.source, (nodeMap.get(edge.source) ?? 0) + 1);
    nodeMap.set(edge.target, (nodeMap.get(edge.target) ?? 0) + 1);
  });

  const nodes: BeelineNode[] = Array.from(nodeMap.entries()).map(
    ([id, degree]) => ({
      id,
      label: id,
      importance: degree
    })
  );

  return {
    nodes,
    edges
  };
}
