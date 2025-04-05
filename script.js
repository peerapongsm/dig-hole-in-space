document.addEventListener("DOMContentLoaded", function(e) {
  handleOnClick(6); // initiate medium size map when landed;
});

const nodeTypes = [
  { type: "Rest", probability: 0.1 },
  { type: "Random (?)", probability: 0.1 },
  { type: "Treasure", probability: 0.1 },
  { type: "Monster", probability: 0.2 },
  { type: "Elite", probability: 0.1 },
  { type: "Empty", probability: 0.2 },
  { type: "Deadend", probability: 0.2 },
];

var startNodeIdx = -1;

// Generate a random node based on probabilities
function generateRandomNode() {
  const randomValue = Math.random();
  let accumulatedProbability = 0;

  for (let node of nodeTypes) {
    accumulatedProbability += node.probability;
    if (randomValue <= accumulatedProbability) {
      return node.type;
    }
  }
}

// Generate the map
function generateNodeMap(width, height) {
  const map = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(generateRandomNode());
    }
    map.push(row);
  }
  return map;
}

function insertStartingRow(width) {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("map-row");

  const randomValue = Math.floor(Math.random() * width);
  startNodeIdx = randomValue;
  for (let i = 0; i < width; i++) {
    const nodeDiv = document.createElement("div");
    nodeDiv.classList.add("node");

    if (i == randomValue) {
      // Normal node with value
      nodeDiv.innerText = "Landing";
      nodeDiv.classList.add("start-node");
    } else {
      nodeDiv.classList.add("start-node-edge");
    }

    rowDiv.appendChild(nodeDiv);
  }
  return rowDiv;
}

function insertFinalRow() {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("map-row");
  const nodeDiv = document.createElement("div");
  nodeDiv.classList.add("node");
  nodeDiv.innerText = "Boss";
  nodeDiv.classList.add("final-node");
  rowDiv.appendChild(nodeDiv);
  return rowDiv;
}

// Display the map visually
function displayMap(map) {
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = ""; // Clear previous map
  mapDiv.appendChild(insertStartingRow(map[0].length));
  map.forEach((row, row_idx) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("map-row");

    row.forEach((node, col_idx) => {
      const nodeDiv = document.createElement("div");
      nodeDiv.classList.add("node");

      if (node != "Deadend") {
        // Normal node with value
        nodeDiv.innerText = node;
        // Add classlist for color
        if (node == "Rest") {
          nodeDiv.classList.add("rest-node");
        } else if (node == "Random (?)") {
          nodeDiv.classList.add("random-node");
        } else if (node == "Treasure") {
          nodeDiv.classList.add("treasure-node");
        } else if (node == "Monster") {
          nodeDiv.classList.add("monster-node");
        } else if (node == "Elite") {
          nodeDiv.classList.add("elite-node");
        }
      } else {
        if (row_idx == 0 && col_idx == startNodeIdx) {
          nodeDiv.innerHTML = "Empty";
        } else {
          // Dead end (no value)
          nodeDiv.classList.add("dead-end");
        }
      }

      rowDiv.appendChild(nodeDiv);
    });
    mapDiv.appendChild(rowDiv);
  });
  mapDiv.appendChild(insertFinalRow());
}

function handleOnClick(n) {
  const map = generateNodeMap(n, n);
  displayMap(map);
}