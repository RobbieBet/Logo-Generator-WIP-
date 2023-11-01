//pulling in inquirer which will be used for prompting 
//const inquirer = require('inquirer');

const inquirer = require('inquirer');
const SVG = require('svg.js');
const fs = require('fs');

//this will handle asking user for preferences
function promptUser() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Select a shape:',
      choices: ['Circle', 'Square', 'Triangle']
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter a color for the logo (in HEX format, e.g., #FF0000):'
    },
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo:'
    }
  ]);
}

//depending on user's choices, generates accordingly
function generateSVG(answers) {
  const { shape, color, text } = answers;

  const svg = SVG().size(500, 500);

  let shapeElement;
  if (shape === 'Circle') {
    shapeElement = svg.circle(100).fill(color).center(250, 250);
  } else if (shape === 'Square') {
    shapeElement = svg.rect(150, 150).fill(color).center(250, 250);
  } else if (shape === 'Triangle') {
    shapeElement = svg.polygon('250,100 150,300 350,300').fill(color);
  }

  svg.text(text).fill('#000').move(200, 400).font({ size: 30 });

  return svg.svg();
}

//should handle making the svg file (researched many different methods, not sure really)
function writeSVGFile(content) {
  fs.writeFile('logo.svg', content, err => {
    if (err) {
      console.error('Error writing SVG file:', err);
    } else {
      console.log('SVG file generated successfully as logo.svg');
    }
  });
}

promptUser()
  .then(answers => {
    const svgContent = generateSVG(answers);
    writeSVGFile(svgContent);
  })
  .catch(error => {
    console.error('Error:', error);
  });

