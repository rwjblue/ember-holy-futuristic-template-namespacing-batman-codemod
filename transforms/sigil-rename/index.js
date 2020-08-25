module.exports = function({ source /*, path*/ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, env => {
    let { builders: b } = env.syntax;

    function rewriteOrWrapComponentParam(node, b) {
      if (!node.params.length) {
        return;
      }

      let firstParam = node.params[0];
      if (firstParam.type === 'StringLiteral') {
        node.params[0] = b.string(firstParam.original.replace('::', '$'));
        return;
      }
    }

    return {
      PathExpression(node) {
        if (node.parts.length > 1 || !node.original.includes('::')) {
          return;
        }

        return b.path(node.original.replace('::', '$'));
      },
      ElementNode(node) {
        if (node.tag.indexOf('::') > -1) {
          node.tag = node.tag.replace('::', '$');
        }
      },
      MustacheStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }

        rewriteOrWrapComponentParam(node, b);
      },
      SubExpression(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }

        rewriteOrWrapComponentParam(node, b);
      },
      BlockStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about blocks not using component
          return;
        }

        rewriteOrWrapComponentParam(node, b);
      },
    };
  });
};

module.exports.type = 'hbs';

