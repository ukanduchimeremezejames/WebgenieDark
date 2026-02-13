import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";

import {
  computeDegrees,
  computeInfluence,
  computeModulesPure,
  applyNodeStyles,
  highlightNeighbors,
  DegreeMap,
  InfluenceMap,
  ModuleMap,
  Edge
} from "../analytics/analytics";

import { ZoomIn, ZoomOut, Maximize2, Download, Share2, Network } from "lucide-react";

// --------------------------------------------------
// Mock Data (replace with backend later)
// --------------------------------------------------
const mockEdges: Edge[] = [
  { source: "A", target: "B", type: "activation" },
  { source: "B", target: "C", type: "repression" },
  { source: "A", target: "C" },
  { source: "D", target: "E" }
];

const mockNodes = [...new Set(mockEdges.flatMap(e => [e.source, e.target]))];

export function Explorer() {
  const cyRef = useRef<any>(null);

  const [degrees, setDegrees] = useState<DegreeMap>({});
  const [influence, setInfluence] = useState<InfluenceMap>({});
  const [modules, setModules] = useState<ModuleMap>({});
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [hopDepth, setHopDepth] = useState<number>(1);

  // -----------------------------------------------
  // Cytoscape Stylesheet — NO TYPE ERRORS
  // -----------------------------------------------
  const cytoscapeStylesheet = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-valign": "center",
        "text-halign": "center",
        "background-color": "#5B2C6F",
        width: "30px",
        height: "30px",
        color: "#000",
        "font-size": "10px"
      }
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier"
      }
    },
    {
      selector: 'edge[type="activation"]',
      style: {
        "line-color": "#28A745",
        "target-arrow-color": "#28A745"
      }
    },
    {
      selector: 'edge[type="repression"]',
      style: {
        "line-color": "#EF4444",
        "target-arrow-color": "#EF4444"
      }
    },
    {
      selector: "node.faded",
      style: {
        opacity: 0.2
      }
    },
    {
      selector: "edge.faded",
      style: {
        opacity: 0.2
      }
    }
  ];

  // -----------------------------------------------
  // Prepare elements for Cytoscape
  // -----------------------------------------------
  const elements = [
    ...mockNodes.map((id) => ({ data: { id, label: id } })),
    ...mockEdges.map((e) => ({
      data: {
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        type: e.type || "default"
      }
    }))
  ];

  // -----------------------------------------------
  // Initial computation (only ONCE after mount)
  // -----------------------------------------------
  useEffect(() => {
    const deg = computeDegrees(mockEdges);
    const inf = computeInfluence(deg);
    const mods = computeModulesPure(mockNodes, mockEdges);

    setDegrees(deg);
    setInfluence(inf);
    setModules(mods);

    if (cyRef.current) {
      applyNodeStyles(cyRef.current, deg, inf, mods);
    }
  }, []);

  // -----------------------------------------------
  // Setup Cytoscape bindings AFTER cy mounts
  // -----------------------------------------------
  const bindCyCallbacks = (cy: any) => {
    cyRef.current = cy;

    cy.on("tap", "node", (evt: any) => {
      const id = evt.target.id();
      setSelectedNode(evt.target.data());
      highlightNeighbors(cy, id, hopDepth);
    });
  };

  // -----------------------------------------------
  // Handlers: zoom, fit, export
  // -----------------------------------------------
  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() + 0.2);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() - 0.2);
  const handleFit = () => cyRef.current?.fit();

  const handleExportPNG = () => {
    const png = cyRef.current.png({ full: true });
    const link = document.createElement("a");
    link.href = png;
    link.download = "network.png";
    link.click();
  };

  const handleShare = () => alert("Sharing not implemented.");

  // -----------------------------------------------
  // Recompute Modules Button
  // -----------------------------------------------
  const recomputeModules = () => {
    const m = computeModulesPure(mockNodes, mockEdges);
    setModules(m);
    applyNodeStyles(cyRef.current, degrees, influence, m);
  };

  // -----------------------------------------------
  // Render
  // -----------------------------------------------
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Network className="w-5 h-5" />
        GRN Explorer
      </h2>

      <div className="mt-3 flex gap-3">
        <span className="px-2 py-1 text-sm bg-gray-100 rounded">
          Dataset: hESC v2.1.0
        </span>
        <span className="px-2 py-1 text-sm bg-gray-100 rounded">
          Algorithm: GENIE3 v1.12.0
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg">Network Visualization</h3>

          <div className="flex gap-2">
            <button onClick={handleZoomIn} className="px-2 py-1 bg-gray-200 rounded">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={handleZoomOut} className="px-2 py-1 bg-gray-200 rounded">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={handleFit} className="px-2 py-1 bg-gray-200 rounded">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={handleExportPNG} className="px-2 py-1 bg-gray-200 rounded">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={handleShare} className="px-2 py-1 bg-gray-200 rounded">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="border rounded bg-white">
          <CytoscapeComponent
            cy={bindCyCallbacks}
            elements={elements}
            layout={{ name: "cose" }}
            style={{ width: "100%", height: "600px" }}
            stylesheet={cytoscapeStylesheet as any}
          />
        </div>
      </div>

      {selectedNode && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Node Details</h3>

          <div className="space-y-1">
            <p><strong>ID:</strong> {selectedNode.id}</p>
            <p><strong>Degree:</strong> {degrees[selectedNode.id]}</p>
            <p><strong>Influence:</strong> {influence[selectedNode.id]?.toFixed(3)}</p>
            <p><strong>Module:</strong> {modules[selectedNode.id]}</p>
          </div>
        </div>
      )}

      <button
        className="mt-6 px-3 py-2 bg-gray-800 text-white rounded"
        onClick={recomputeModules}
      >
        Recompute Modules
      </button>
    </div>
  );
}
