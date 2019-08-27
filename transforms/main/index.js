const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');
const templateRecast = require('ember-template-recast');
const { transform } = require('ember-template-recast');

module.exports = function transformer(file, api) {
  let { code } = transform(file.source, env => {
    let { builders: b } = env.syntax;

    return {
      MustacheStatement() {
        return b.mustache(b.path('wat-wat'));
      },
    };
  });

  return code;
};
