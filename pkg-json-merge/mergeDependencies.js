#!/usr/bin/env node
const fs = require('fs');

const projectAPath = process.argv[2];
const projectBPath = process.argv[3];

if (!projectAPath || !projectBPath) {
  console.error('Usage: node mergeDependencies.js path_to_projectA_package.json path_to_projectB_package.json');
  process.exit(1);
}

const projectAContent = fs.readFileSync(projectAPath, 'utf8');
const projectAData = JSON.parse(projectAContent);

const projectBContent = fs.readFileSync(projectBPath, 'utf8');
const projectBData = JSON.parse(projectBContent);

// Merge dependencies from Project B to Project A
projectAData.dependencies = {
  ...projectAData.dependencies,
  ...Object.keys(projectBData.dependencies || {}).reduce((acc, dep) => {
    if (!projectAData.dependencies[dep]) {
      acc[dep] = projectBData.dependencies[dep];
    }
    return acc;
  }, {}),
};

// Merge peerDependencies from Project B to Project A
if (!projectAData.peerDependencies) {
  projectAData.peerDependencies = {};
}
projectAData.peerDependencies = {
  ...projectAData.peerDependencies,
  ...Object.keys(projectBData.peerDependencies || {}).reduce((acc, dep) => {
    if (!projectAData.peerDependencies[dep]) {
      acc[dep] = projectBData.peerDependencies[dep];
    }
    return acc;
  }, {}),
};

fs.writeFileSync(projectAPath, JSON.stringify(projectAData, null, 2), 'utf8');

console.log('Dependencies merged successfully!');
