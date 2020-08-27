#!/usr/bin/env node
'use strict';

const transformName = process.argv[2];
const paths = process.argv.slice(3);

if (transformName === 'ensure-template-only-has-backing-class') {
  require('../transforms/ensure-template-only-has-backing-class/index')();
} else {
  require('codemod-cli').runTransform(__dirname, transformName, paths);
}
