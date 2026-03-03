import * as fs from 'fs';

const p = 'app/calculator/page.tsx';
const content = fs.readFileSync(p, 'utf8');

const t1 = 'const elecEmission = Number(electricity) * (factors["Electricity (Global Average)"] || 0.45)';
const t2 = 'const petrolEmission = Number(petrol) * (factors["Petrol (Gasoline)"] || 2.31)';
const t3 = 'const dacReduction = Number(dac) * (factors["Direct Air Capture (DAC)"] || 1000.0)';
const t4 = 'const treeReduction = Number(trees) * (factors["Reforestation (Mature Tree)"] || 21)';

console.log("elec matched?", content.includes(t1));
console.log("petrol matched?", content.includes(t2));
console.log("dac matched?", content.includes(t3));
console.log("tree matched?", content.includes(t4));
