import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { useEffect, useRef } from "react";

cytoscape.use(fcose);

export default function GRNExplorer({ elements }) {
  const cyRef = useRef(null);

  return (
    <div className="w-full h-[700px] border rounded-lg shadow-md">
      <CytoscapeComponent
        cy={(cy) => {
          cyRef.current = cy;

          cy.on("tap", "node", (evt) => {
            console.log("Selected node:", evt.target.id());
          });

          cy.on("tap", "edge", (evt) => {
            console.log("Selected edge:", evt.target.data());
          });
        }}
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        layout={{
          name: "fcose",
          randomize: true,
          nodeRepulsion: 6000
        }}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "background-color": "#1e90ff",
              "font-size": "10px",
            }
          },
          {
            selector: "edge",
            style: {
              width: "mapData(support_count, 1, 5, 1, 8)",
              "line-color": "mapData(consensus_score, 0.6, 0.9, #d1d5db, #000000)",
              "target-arrow-shape": "triangle",
              "target-arrow-color": "#000",
              "curve-style": "bezier",
            }
          }
        ]}
      />
    </div>
  );
}
