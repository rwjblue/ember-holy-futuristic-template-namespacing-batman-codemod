const CWD = process.cwd();

const execa = require('execa');
const { createTempDir } = require('broccoli-test-helper');
const transform = require('./index');

const componentJS = `import Component from '@ember/component';

export default Component.extend({
});
`;

describe('ensure-template-only-has-backing-class', function () {
  let project;

  function setupAppPackageJSON() {
    project.write({
      'package.json': `{
          "name": "dummy",
          "description": "",
          "version": "0.0.0",
          "devDependencies": {
            "@ember/optional-features": "*",
            "ember-cli": "*",
            "ember-source": "*"
          }
        }`,
    });
  }

  function setupAddonPackageJSON() {
    project.write({
      'package.json': `{
          "name": "dummy",
          "description": "",
          "version": "0.0.0",
          "keywords": ["ember-addon"],
          "devDependencies": {
            "@ember/optional-features": "*",
            "ember-cli": "*",
            "ember-source": "*"
          }
        }`,
    });
  }

  beforeEach(async () => {
    project = await createTempDir();
  });

  afterEach(() => {
    process.chdir(CWD);
  });

  const CLASSIC_BEFORE = {
    components: {
      'not-template-only.js': '/* do not touch */',
      'ts-not-template-only.ts': '/* do not touch */',
    },
    templates: {
      'not-component.hbs': '<!-- route template -->',
      components: {
        'foo-bar.hbs': '<!-- foo-bar -->',
        'another.hbs': '<!-- another -->',
        'not-template-only.hbs': '<!-- not-template-only -->',
        'ts-not-template-only.hbs': '<!-- not-template-only -->',
        'also-not-component.txt': 'This is not a component file.',
      },
    },
  };

  const CLASSIC_AFTER = {
    components: {
      'foo-bar.js': componentJS,
      'another.js': componentJS,
      'not-template-only.js': '/* do not touch */',
      'ts-not-template-only.ts': '/* do not touch */',
    },
    templates: {
      'not-component.hbs': '<!-- route template -->',
      components: {
        'foo-bar.hbs': '<!-- foo-bar -->',
        'another.hbs': '<!-- another -->',
        'not-template-only.hbs': '<!-- not-template-only -->',
        'ts-not-template-only.hbs': '<!-- not-template-only -->',
        'also-not-component.txt': 'This is not a component file.',
      },
    },
  };

  it('adds a backing class for app template only components', function () {
    setupAppPackageJSON();
    project.write({ app: CLASSIC_BEFORE });

    process.chdir(project.path());
    transform();

    expect(project.read('app')).toEqual(CLASSIC_AFTER);
  });

  it('adds a backing class for addon template only components', function () {
    setupAddonPackageJSON();
    project.write({ addon: CLASSIC_BEFORE });

    process.chdir(project.path());
    transform();

    expect(project.read('addon')).toEqual(CLASSIC_AFTER);
  });

  it('works when running the bin script', async function () {
    setupAddonPackageJSON();
    project.write({ addon: CLASSIC_BEFORE });

    process.chdir(project.path());
    await execa('node', [
      require.resolve('../../bin/cli'),
      'ensure-template-only-has-backing-class',
    ]);

    expect(project.read('addon')).toEqual(CLASSIC_AFTER);
  });
});
