#!/usr/bin/env node
'use strict';

require('codemod-cli').runTransform(
  __dirname,
  'main' /* transform name */,
  process.argv.slice(2) /* paths or globs */,
  'hbs' /* extensions to transform */
);
