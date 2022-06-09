import "./reset.css";
import "./style.css";

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

function showTowers(): string {
  let asString = " \n";

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
    asString += row + "\n";
  }

  asString += base(towers.numLayers, towers.numTowers) + "\n";

  console.log(asString);

  return asString;
}

function solve(layers: number, towers = 3): string {
  initTowers(layers, towers);
  return showTowers();
}

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Towers of Hanoi</h1>
  <textarea class="">${solve(5)}</textarea>
`;
