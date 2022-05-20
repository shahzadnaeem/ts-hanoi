import "./reset.css";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

// Now we solve the puzzle!

interface Towers {
  numLayers: number;
  numTowers: number;
  towers: number[][];
}

const towers: Towers = {
  numLayers: 0,
  numTowers: 0,
  towers: [],
};

function initTowers(layers: number, numTowers: number) {
  towers.numLayers = layers;
  towers.numTowers = numTowers;

  for (let i = 0; i < numTowers; i++) {
    towers.towers.push([]);
  }

  for (let i = layers; i > 0; i--) {
    towers.towers[0].push(i);
  }
}

function centredLayer(layerSize: number, maxSize: number) {
  const disc = "*".repeat(layerSize);
  const padding = " ".repeat(maxSize - layerSize + 2);

  return padding + disc + "|" + disc + padding;
}

function base(numDiscs: number, numTowers: number) {
  return (" " + "=".repeat(numDiscs * 2 + 3) + " ").repeat(numTowers);
}

function showTowers() {
  const highestTower = towers.towers.reduce<number>((max, curr) => {
    return curr.length > max ? curr.length : max;
  }, 0);

  for (let disc = highestTower - 1; disc >= 0; disc--) {
    let row = "";

    for (let n = 0; n < towers.numTowers; n++) {
      const towerLength = towers.towers[n].length;
      const index = disc - (highestTower - towerLength);

      if (index >= 0) {
        row += centredLayer(towers.towers[n][index], towers.numLayers);
      } else {
        row += centredLayer(0, towers.numLayers);
      }
    }
    console.log(row);
  }
  console.log(base(towers.numLayers, towers.numTowers));
}

function solve(layers: number, towers = 3) {
  initTowers(layers, towers);
  showTowers();
}

solve(3);
