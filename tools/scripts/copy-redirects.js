const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../../_redirects');
const destination = path.resolve(__dirname, '../../dist/apps/frontend/_redirects');

fs.copyFileSync(source, destination);