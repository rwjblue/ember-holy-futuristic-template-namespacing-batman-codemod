const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const walkSync = require('walk-sync');

const ComponentFile = `import Component from '@ember/component';

export default Component.extend({
});
`;

module.exports = function () {
  let pkg = require(path.join(process.cwd(), 'package.json'));
  let isAddon = pkg.keywords && pkg.keywords.includes('ember-addon');

  let root = isAddon ? 'addon' : 'app';

  let templates = [];
  let components = [];

  // Handle "Classic" layout
  let templatesRoot = path.join(root, 'templates/components');

  let templateCandidates = walkSync(templatesRoot, {
    globs: ['**/*.hbs'],
    directories: false,
  });

  templateCandidates.forEach((template) => {
    let templatePath = path.join(templatesRoot, template);

    let jsPath = path.join(`${root}/components`, template.replace(/\.hbs$/, '.js'));
    if (fs.existsSync(jsPath)) {
      return;
    }

    let tsPath = path.join(`${root}/components`, template.replace(/\.hbs$/, '.ts'));
    if (fs.existsSync(tsPath)) {
      return;
    }

    templates.push(templatePath);
    components.push(jsPath); // Always offer to create JS
  });

  if (templates.length === 0) {
    return;
  }

  for (let i = 0; i < components.length; i++) {
    let componentPath = components[i];
    console.log(`  ${chalk.green('create')} ${componentPath}`);

    fs.mkdirSync(path.dirname(componentPath), { recursive: true });

    fs.writeFileSync(componentPath, ComponentFile, {
      encoding: 'UTF-8',
    });
  }
};
