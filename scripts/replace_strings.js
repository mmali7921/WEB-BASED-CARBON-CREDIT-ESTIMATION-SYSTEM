const fs = require('fs');
const path = require('path');

const targetStr = `
  const [factors, setFactors] = useState<{ [key: string]: number }>({
    Electricity: 0.82,
    Petrol: 2.31,
    Diesel: 2.68,
    LPG: 1.51,
    "Reforestation (Mature Tree)": 21.00,
    "Direct Air Capture (DAC)": 1.0,
    "Carbon Capture & Storage (CCS)": 1.0,
  })
`;

const replaceStr = `
  const [factors, setFactors] = useState<{ [key: string]: number }>({
    "Electricity (Global Average)": 0.45,
    "Petrol (Gasoline)": 2.31,
    Diesel: 2.68,
    LPG: 1.51,
    "Reforestation (Mature Tree)": 21.00,
    "Direct Air Capture (DAC)": 1000.0,
    "Carbon Capture & Storage (CCS)": 1.0,
  })
`;

function replaceInFile(filepath) {
   let content = fs.readFileSync(filepath, 'utf8');
   let found = content.includes('const elecEmission = Number(electricity) * (factors["Electricity"]');
   if(found) {
       console.log('Replacing calculation lines...');
       content = content.replace(
         'const elecEmission = Number(electricity) * (factors["Electricity"] || 0.82)',
         'const elecEmission = Number(electricity) * (factors["Electricity (Global Average)"] || 0.45)'
       );
       content = content.replace(
         'const petrolEmission = Number(petrol) * (factors["Petrol"] || 2.31)',
         'const petrolEmission = Number(petrol) * (factors["Petrol (Gasoline)"] || 2.31)'
       );
       content = content.replace(
         'const solarReduction = Number(solar) * (factors["Electricity"] || 0.82)',
         'const solarReduction = Number(solar) * (factors["Electricity (Global Average)"] || 0.45)'
       );
       content = content.replace(
         'const treeReduction = Number(trees) * (factors["Tree Absorption"] || 21)',
         'const treeReduction = Number(trees) * (factors["Reforestation (Mature Tree)"] || 21)'
       );
       content = content.replace(
         'const dacReduction = Number(dac) * (factors["Direct Air Capture (DAC)"] || 1.0)',
         'const dacReduction = Number(dac) * (factors["Direct Air Capture (DAC)"] || 1000.0)'
       );
       fs.writeFileSync(filepath, content);
       console.log('File replacements made!');
   }
}

replaceInFile('app/calculator/page.tsx');
