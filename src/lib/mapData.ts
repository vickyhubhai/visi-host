// Coordinates represent [longitude, latitude]
export const CONTINENTS = [
  // North America
  [[-168, 65], [-120, 75], [-80, 75], [-60, 50], [-55, 40], [-75, 20], [-90, 15], [-110, 20], [-125, 45], [-140, 60]],
  // Greenland
  [[-70, 70], [-60, 80], [-30, 80], [-40, 60]],
  // South America
  [[-80, 12], [-70, 10], [-50, -5], [-35, -6], [-40, -20], [-60, -45], [-72, -55], [-75, -50], [-70, -35], [-80, -10]],
  // Africa
  [[-17, 32], [-5, 36], [10, 37], [25, 32], [33, 30], [51, 11], [46, -4], [34, -34], [20, -35], [10, -10], [8, 5], [-13, 5]],
  // Eurasia (Europe + Asia)
  [[-10, 60], [10, 65], [30, 70], [60, 75], [90, 75], [120, 75], [160, 70], [170, 60], [140, 30], [120, 10], [100, 5], [80, 8], [60, 10], [40, 25], [30, 30], [15, 35], [5, 45]],
  // India
  [[68, 24], [78, 30], [88, 26], [78, 8]],
  // Indochina
  [[95, 20], [110, 20], [110, 10], [100, 1]],
  // Australia
  [[113, -26], [115, -35], [135, -38], [150, -34], [152, -22], [142, -10], [130, -12], [114, -20]],
  // Great Britain + Ireland
  [[-10, 50], [2, 58], [-4, 58]]
];

export function isLand(lng: number, lat: number): boolean {
  // Ray-casting algorithm for polygon containment
  for (let c = 0; c < CONTINENTS.length; c++) {
    const vs = CONTINENTS[c];
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0], yi = vs[i][1];
      const xj = vs[j][0], yj = vs[j][1];
      const intersect = ((yi > lat) !== (yj > lat))
          && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    if (inside) return true;
  }
  return false;
}
