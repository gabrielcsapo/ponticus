/* eslint-disable eqeqeq */
import ASTUtil from "./ASTUtil.js";

import ExpressionPrecedence from "./ExpressionPrecedence.js";

let ArrayExpression,
  BinaryExpression,
  ForInStatement,
  FunctionDeclaration,
  Property,
  RestElement;

export default {
  Program(node: any, state: any) {
    const { lineEnd, output } = state;
    const indent = state.indent.repeat(state.indentLevel);
    const statements = node.body;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      output.write(indent);

      (this as any)[statement.type](statement, state);

      output.write(lineEnd);
    }
  },

  BlockStatement(node: any, state: any) {
    const { lineEnd, output } = state;
    const indent = state.indent.repeat(state.indentLevel++);
    const statementIndent = indent + state.indent;

    output.write("{");

    const statements = node.body;

    if (statements != null && statements.length > 0) {
      output.write(lineEnd);

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];

        output.write(statementIndent);

        (this as any)[statement.type](statement, state);

        output.write(lineEnd);
      }
      output.write(indent);
    }

    output.write("}");
    state.indentLevel--;
  },

  EmptyStatement(node: any, state: any) {
    state.output.write(";");
  },

  ExpressionStatement(
    node: { expression: { type: string | number; left: { type: string[] } } },
    state: { output: any }
  ) {
    const { output } = state;
    const precedence = ExpressionPrecedence[node.expression.type];

    if (
      precedence === 17 ||
      (precedence === 3 && node.expression.left.type[0] === "O")
    ) {
      // Should always have parentheses or is an AssignmentExpression to an ObjectPattern
      output.write("(");
      (this as any)[node.expression.type](node.expression, state);
      output.write(")");
    } else {
      (this as any)[node.expression.type](node.expression, state);
    }

    output.write(";");
  },

  IfStatement(
    node: {
      test: { type: string | number };
      consequent: { type: string | number };
      alternate: { type: string | number } | null;
    },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("if (");
    output.operators.push("if");

    (this as any)[node.test.type](node.test, state);

    output.write(") ");

    (this as any)[node.consequent.type](node.consequent, state);

    if (node.alternate != null) {
      output.write(" else ");
      output.operators.push("else");

      (this as any)[node.alternate.type](node.alternate, state);
    }
  },

  LabeledStatement(
    node: { label: { type: string | number }; body: { type: string | number } },
    state: { output: { write: (arg0: string) => void } }
  ) {
    (this as any)[node.label.type](node.label, state);
    state.output.write(": ");
    (this as any)[node.body.type](node.body, state);
  },

  BreakStatement(
    node: { label: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("break");
    output.operators.push("break");

    if (node.label) {
      output.write(" ");
      (this as any)[node.label.type](node.label, state);
    }
    output.write(";");
  },

  ContinueStatement(
    node: { label: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("continue");
    output.operators.push("continue");

    if (node.label) {
      output.write(" ");
      (this as any)[node.label.type](node.label, state);
    }

    output.write(";");
  },

  WithStatement(
    node: {
      object: { type: string | number };
      body: { type: string | number };
    },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("with (");
    output.operators.push("with");

    (this as any)[node.object.type](node.object, state);

    output.write(") ");

    (this as any)[node.body.type](node.body, state);
  },

  SwitchStatement(
    node: { discriminant?: any; cases?: any },
    state: { indent?: any; indentLevel?: any; lineEnd?: any; output?: any }
  ) {
    const { lineEnd, output } = state;
    const indent = state.indent.repeat(state.indentLevel++);

    state.indentLevel++;

    const caseIndent = indent + state.indent;
    const statementIndent = caseIndent + state.indent;

    output.write("switch (");
    output.operators.push("switch");

    (this as any)[node.discriminant.type](node.discriminant, state);

    output.write(`) {${lineEnd}`);

    const { cases: occurences } = node;
    const { length: occurencesCount } = occurences;

    for (let i = 0; i < occurencesCount; i++) {
      const occurence = occurences[i];

      if (occurence.test) {
        output.write(`${caseIndent}case `);
        output.operators.push("case");

        (this as any)[occurence.test.type](occurence.test, state);

        output.write(`:${lineEnd}`);
      } else {
        output.write(`${caseIndent}default:${lineEnd}`);
        output.operators.push("default");
      }

      const { consequent } = occurence;
      const { length: consequentCount } = consequent;

      for (let j = 0; j < consequentCount; j++) {
        const statement = consequent[j];

        output.write(statementIndent);

        (this as any)[statement.type](statement, state);

        output.write(lineEnd);
      }
    }

    state.indentLevel -= 2;

    output.write(`${indent}}`);
  },

  ReturnStatement(
    node: { argument: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("return");
    output.operators.push("return");

    if (node.argument) {
      output.write(" ");

      (this as any)[node.argument.type](node.argument, state);
    }

    output.write(";");
  },

  ThrowStatement(
    node: { argument: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("throw ");
    output.operators.push("throw");

    (this as any)[node.argument.type](node.argument, state);

    output.write(";");
  },

  TryStatement(
    node: { block?: any; handler: any; finalizer?: any },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("try ");
    output.operators.push("try");

    (this as any)[node.block.type](node.block, state);

    if (node.handler) {
      const { handler } = node;

      output.write(" catch (");
      output.operators.push("catch");

      (this as any)[handler.param.type](handler.param, state);

      output.write(") ");

      (this as any)[handler.body.type](handler.body, state);
    }

    if (node.finalizer) {
      output.write(" finally ");
      output.operators.push("finally");

      (this as any)[node.finalizer.type](node.finalizer, state);
    }
  },

  WhileStatement(
    node: { test: { type: string | number }; body: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.operators.push("while");
    output.write("while (");

    (this as any)[node.test.type](node.test, state);

    output.write(") ");

    (this as any)[node.body.type](node.body, state);
  },

  DoWhileStatement(
    node: { body: { type: string | number }; test: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.operators.push("dowhile");
    output.write("do ");

    (this as any)[node.body.type](node.body, state);

    output.write(" while (");

    (this as any)[node.test.type](node.test, state);

    output.write(");");
  },

  ForStatement(
    node: {
      init: { type: string | number } | null;
      test: { type: string | number };
      update: { type: string | number };
      body: { type: string | number };
    },
    state: { noTrailingSemicolon?: any; output?: any }
  ) {
    const { output } = state;

    output.write("for (");
    output.operators.push("for");

    if (node.init != null) {
      state.noTrailingSemicolon = true;

      (this as any)[node.init.type](node.init, state);

      state.noTrailingSemicolon = false;
    }

    output.write("; ");

    if (node.test) {
      (this as any)[node.test.type](node.test, state);
    }

    output.write("; ");

    if (node.update) {
      (this as any)[node.update.type](node.update, state);
    }

    output.write(") ");

    (this as any)[node.body.type](node.body, state);
  },

  ForInStatement: (ForInStatement = function (
    node: { type?: any; right?: any; body?: any; left?: any },
    state: { noTrailingSemicolon?: any; output?: any }
  ) {
    const { output } = state;

    output.write("for (");

    const { left } = node,
      { type } = left;

    state.noTrailingSemicolon = true;

    // @ts-ignore
    (this as any)[type](left, state);

    state.noTrailingSemicolon = false;

    // Identifying whether node.type is `ForInStatement` or `ForOfStatement`
    output.write(node.type[3] === "I" ? " in " : " of ");
    output.operators.push(node.type[3] === "I" ? "forin" : "forof");

    // @ts-ignore
    (this as any)[node.right.type](node.right, state);

    output.write(") ");

    // @ts-ignore
    (this as any)[node.body.type](node.body, state);
  }),

  ForOfStatement: ForInStatement,

  DebuggerStatement(
    node: any,
    state: { output: { write: (arg0: string) => void }; lineEnd: any }
  ) {
    state.output.write(`debugger;${state.lineEnd}`);
  },

  FunctionDeclaration: (FunctionDeclaration = function (
    node: {
      generator: any;
      id: { name: any };
      params: object[];
      body: { type: string | number };
    },
    state: any
  ) {
    const { output } = state;

    output.write(node.generator ? "function* " : "function ");
    output.operators.push(node.generator ? "function*" : "function");

    if (node.id) {
      output.write(node.id.name);
      output.operands.push(node.id.name);
    }

    // @ts-ignore
    ASTUtil.formatSequence(node.params, state, this);

    output.write(" ");

    // @ts-ignore
    (this as any)[node.body.type](node.body, state);
  }),

  FunctionExpression: FunctionDeclaration,

  VariableDeclaration(node: any, state: any) {
    const { output } = state;
    const { declarations } = node;

    output.write(`${node.kind} `);
    output.operators.push(node.kind);

    const { length } = declarations;

    if (length > 0) {
      this.VariableDeclarator(declarations[0], state);

      for (let i = 1; i < length; i++) {
        output.write(", ");

        this.VariableDeclarator(declarations[i], state);
      }
    }

    if (state.noTrailingSemicolon !== true) {
      output.write(";");
    }
  },

  VariableDeclarator(node: any, state: any) {
    const { output } = state;

    (this as any)[node.id.type](node.id, state);

    if (node.init != null) {
      output.write(" = ");
      output.operators.push("=");

      (this as any)[node.init.type](node.init, state);
    }
  },

  ClassDeclaration(node: any, state: any) {
    const { output } = state;

    output.write("class ");
    output.operators.push("class");

    if (node.id) {
      output.write(`${node.id.name} `);
    }

    if (node.superClass) {
      output.write("extends ");
      output.operators.push("extends");

      (this as any)[node.superClass.type](node.superClass, state);

      output.write(" ");
    }

    this.BlockStatement(node.body, state);
  },

  ImportDeclaration(
    node: { source?: any; specifiers?: any },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("import ");
    output.operators.push("import");

    const { specifiers } = node;
    const { length } = specifiers;

    if (length > 0) {
      let i = 0,
        specifier;
      while (i < length) {
        if (i > 0) {
          output.write(", ");
        }

        specifier = specifiers[i];
        const type = specifier.type[6];

        if (type === "D") {
          output.write(specifier.local.name); // ImportDefaultSpecifier
          i++;
        } else if (type === "N") {
          output.write(`* as ${specifier.local.name}`); // ImportNamespaceSpecifier
          i++;
        } else {
          break; // ImportSpecifier
        }
      }

      if (i < length) {
        output.write("{");

        for (;;) {
          specifier = specifiers[i];
          const { name } = specifier.imported;

          output.write(name);

          if (name !== specifier.local.name) {
            output.write(` as ${specifier.local.name}`);
          }

          if (++i < length) {
            output.write(", ");
          } else {
            break;
          }
        }

        output.write("}");
      }

      output.write(" from ");
      output.operators.push("from");
    }

    this.Literal(node.source, state);

    output.write(";");
  },

  ExportDefaultDeclaration(
    node: { declaration: { type: string } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("export default ");
    output.operators.push("export");
    output.operators.push("default");

    (this as any)[node.declaration.type](node.declaration, state);

    // All expression nodes except `FunctionExpression`
    if (
      ExpressionPrecedence[node.declaration.type] &&
      node.declaration.type[0] !== "F"
    ) {
      output.write(";");
    }
  },

  ExportNamedDeclaration(
    node: { declaration?: any; source?: any; specifiers?: any },
    state: { output: any }
  ) {
    const { output } = state;

    output.write("export ");
    output.operators.push("export");

    if (node.declaration) {
      (this as any)[node.declaration.type](node.declaration, state);
    } else {
      output.write("{");
      output.operators.push("{}");

      const { specifiers } = node,
        { length } = specifiers;

      if (length > 0) {
        for (let i = 0; ; ) {
          const specifier = specifiers[i];
          const { name } = specifier.local;

          output.write(name);

          if (name !== specifier.exported.name) {
            output.write(` as ${specifier.exported.name}`);
          }

          if (++i < length) {
            output.write(", ");
          } else {
            break;
          }
        }
      }

      output.write("}");

      if (node.source) {
        output.write(" from ");

        this.Literal(node.source, state);
      }

      output.write(";");
    }
  },

  ExportAllDeclaration(node: { source: any }, state: { output: any }) {
    const { output } = state;

    output.write("export * from ");
    output.operators.push("export");
    output.operators.push("*");

    this.Literal(node.source, state);

    output.write(";");
  },

  MethodDefinition(node: any, state: any) {
    const { output } = state;

    if (node.static) {
      output.write("static ");
      output.operators.push("static");
    }

    switch (node.kind[0]) {
      case "g": // `get`
      case "s": // `set`
        output.write(`${node.kind} `);
        output.operators.push(node.kind);
        break;
    }

    if (node.value.generator) {
      output.write("*");
    }

    if (node.computed) {
      output.write("[");

      (this as any)[node.key.type](node.key, state);

      output.write("]");
    } else {
      (this as any)[node.key.type](node.key, state);
    }

    ASTUtil.formatSequence(node.value.params, state, this);

    output.write(" ");

    (this as any)[node.value.body.type](node.value.body, state);
  },

  ClassExpression(node: any, state: any) {
    this.ClassDeclaration(node, state);
  },

  ArrowFunctionExpression(node: any, state: any) {
    const { output } = state;
    const { params } = node;

    if (params != null) {
      // If params[0].type[0] starts with 'I', it can't be `ImportDeclaration` nor `IfStatement` and thus is
      // `Identifier`
      if (params.length === 1 && params[0].type[0] === "I") {
        output.write(params[0].name);
      } else {
        ASTUtil.formatSequence(node.params, state, this);
      }
    }

    output.write(" => ");
    output.operators.push("function=>");

    if (node.body.type[0] === "O") {
      output.write("(");

      this.ObjectExpression(node.body, state);

      output.write(")");
    } else {
      (this as any)[node.body.type](node.body, state);
    }
  },

  ThisExpression(
    node: any,
    state: { output: { write: (arg0: string) => void; operators: string[] } }
  ) {
    state.output.write("this");
    state.output.operators.push("this");
  },

  Super(
    node: any,
    state: { output: { write: (arg0: string) => void; operators: string[] } }
  ) {
    state.output.write("super");
    state.output.operators.push("super");
  },

  // @ts-ignore
  RestElement: (RestElement = function (
    node: { argument: { type: string | number } },
    state: { output: { write: (arg0: string) => void; operators: string[] } }
  ) {
    state.output.write("...");
    state.output.operators.push("... (rest)");

    // @ts-ignore
    (this as any)[node.argument.type](node.argument, state);
  }),

  SpreadElement(
    node: { argument: { type: string | number } },
    state: { output: { write: (arg0: string) => void; operators: string[] } }
  ) {
    state.output.write("...");
    state.output.operators.push("... (spread)");

    (this as any)[node.argument.type](node.argument, state);
  },

  YieldExpression(
    node: { delegate: any; argument: { type: string | number } },
    state: { output: any }
  ) {
    const { output } = state;

    output.write(node.delegate ? "yield*" : "yield");
    output.operators.push(node.delegate ? "yield*" : "yield");

    if (node.argument) {
      output.write(" ");

      (this as any)[node.argument.type](node.argument, state);
    }
  },

  TemplateLiteral(
    node: { quasis: any; expressions: any },
    state: { output: any }
  ) {
    const { output } = state;
    const { quasis, expressions } = node;
    const { length } = expressions;

    output.write("`");

    for (let i = 0; i < length; i++) {
      const expression = expressions[i];

      output.write(quasis[i].value.raw);
      output.write("${");

      (this as any)[expression.type](expression, state);

      output.write("}");
    }

    output.write(quasis[quasis.length - 1].value.raw);
    output.write("`");
  },

  TaggedTemplateExpression(
    node: { tag: { type: string | number }; quasi: { type: string | number } },
    state: any
  ) {
    (this as any)[node.tag.type](node.tag, state);
    (this as any)[node.quasi.type](node.quasi, state);
  },

  // @ts-ignore
  ArrayExpression: (ArrayExpression = function (
    node: { elements: any },
    state: { output: any }
  ) {
    const { output } = state;

    output.operators.push("[]");
    output.write("[");

    if (node.elements.length > 0) {
      const { elements } = node,
        { length } = elements;

      for (let i = 0; ; ) {
        const element = elements[i];

        if (element != null) {
          // @ts-ignore
          (this as any)[element.type](element, state);
        }

        if (++i < length) {
          output.write(", ");
          output.operators.push(",");
        } else {
          if (element == null) {
            output.write(", ");
            output.operators.push(",");
          }
          break;
        }
      }
    }

    output.write("]");
  }),

  ArrayPattern: ArrayExpression,

  ObjectExpression(node: any, state: any) {
    const { lineEnd, output } = state;
    const indent = state.indent.repeat(state.indentLevel++);
    const propertyIndent = indent + state.indent;

    output.operators.push("{}");
    output.write("{");

    if (node.properties.length > 0) {
      output.write(lineEnd);

      const comma = `,${lineEnd}`,
        { properties } = node,
        { length } = properties;

      for (let i = 0; ; ) {
        const property = properties[i];

        output.write(propertyIndent);

        this.Property(property, state);

        if (++i < length) {
          output.write(comma);
        } else {
          break;
        }
      }

      output.write(lineEnd);
      output.write(`${indent}}`);
    } else {
      output.write("}");
    }

    state.indentLevel--;
  },

  // @ts-ignore
  Property: (Property = function (
    node: {
      method: any;
      kind: string[];
      shorthand: any;
      computed: any;
      key: { type: string | number };
      value: { type: string | number };
    },
    state: { output: any }
  ) {
    if (node.method || (node.kind && node.kind[0] !== "i")) {
      // @ts-ignore
      this.MethodDefinition(node, state); // Either a method or of kind `set` or `get` (not `init`)
    } else {
      const { output } = state;

      if (!node.shorthand) {
        if (node.computed) {
          output.operators.push("[]");
          output.write("[");

          // @ts-ignore
          (this as any)[node.key.type](node.key, state);

          output.write("]");
        } else {
          // @ts-ignore
          (this as any)[node.key.type](node.key, state);
        }

        output.operators.push(":");
        output.write(": ");
      }

      // @ts-ignore
      (this as any)[node.value.type](node.value, state);
    }
  }),

  ObjectPattern(node: { properties: any }, state: { output: any }) {
    const { output } = state;

    output.operators.push("{}");
    output.write("{");

    if (node.properties.length > 0) {
      const { properties } = node,
        { length } = properties;

      for (let i = 0; ; ) {
        (this as any)[properties[i].type](properties[i], state);

        if (++i < length) {
          output.write(", ");
        } else {
          break;
        }
      }
    }
    output.write("}");
  },

  SequenceExpression(node: { expressions: object[] }, state: object) {
    ASTUtil.formatSequence(node.expressions, state, this);
  },

  UnaryExpression(
    node: {
      operator: string | any[];
      prefix: any;
      argument: { type: string | number };
    },
    state: { output: any }
  ) {
    const { output } = state;

    output.operators.push(
      `${node.operator} (${node.prefix ? "pre" : "post"}fix)`
    );

    if (node.prefix) {
      output.write(node.operator);

      if (node.operator.length > 1) {
        output.write(" ");
      }

      if (
        ExpressionPrecedence[node.argument.type] <
        ExpressionPrecedence.UnaryExpression
      ) {
        output.write("(");

        (this as any)[node.argument.type](node.argument, state);

        output.write(")");
      } else {
        (this as any)[node.argument.type](node.argument, state);
      }
    } else {
      // FIXME: This case never occurs
      (this as any)[node.argument.type](node.argument, state);

      state.output.write(node.operator);
    }
  },

  UpdateExpression(
    node: { operator: any; prefix: any; argument: { type: string | number } },
    state: { output: { operators: string[]; write: (arg0: any) => void } }
  ) {
    // Always applied to identifiers or members, no parenthesis check needed
    state.output.operators.push(
      `${node.operator} (${node.prefix ? "pre" : "post"}fix)`
    );

    if (node.prefix) {
      state.output.write(node.operator);

      (this as any)[node.argument.type](node.argument, state);
    } else {
      (this as any)[node.argument.type](node.argument, state);

      state.output.write(node.operator);
    }
  },

  AssignmentExpression(
    node: {
      left: { type: string | number };
      operator: any;
      right: { type: string | number };
    },
    state: { output: { write: (arg0: string) => void; operators: any[] } }
  ) {
    (this as any)[node.left.type](node.left, state);

    state.output.write(` ${node.operator} `);

    (this as any)[node.right.type](node.right, state);

    state.output.operators.push(node.operator);
  },

  AssignmentPattern(
    node: { left: { type: string | number }; right: { type: string | number } },
    state: { output: { write: (arg0: string) => void; operators: string[] } }
  ) {
    (this as any)[node.left.type](node.left, state);

    state.output.write(" = ");

    (this as any)[node.right.type](node.right, state);

    state.output.operators.push("=");
  },

  // @ts-ignore
  BinaryExpression: (BinaryExpression = function (node: any, state: any) {
    const { output } = state;

    output.operators.push(node.operator);

    if (node.operator === "in") {
      // Avoids confusion in `for` loops initializers
      output.write("(");

      // @ts-ignore
      ASTUtil.formatBinaryExpressionPart(node.left, node, false, state, this);

      output.write(` ${node.operator} `);

      // @ts-ignore
      ASTUtil.formatBinaryExpressionPart(node.right, node, true, state, this);

      output.write(")");
    } else {
      // @ts-ignore
      ASTUtil.formatBinaryExpressionPart(node.left, node, false, state, this);

      output.write(` ${node.operator} `);

      // @ts-ignore
      ASTUtil.formatBinaryExpressionPart(node.right, node, true, state, this);
    }
  }),

  LogicalExpression: BinaryExpression,

  ConditionalExpression(node: any, state: any) {
    const { output } = state;

    if (
      ExpressionPrecedence[node.test.type] >
      ExpressionPrecedence.ConditionalExpression
    ) {
      (this as any)[node.test.type](node.test, state);
    } else {
      output.operators.push("()");
      output.write("(");

      (this as any)[node.test.type](node.test, state);

      output.write(")");
    }

    output.write(" ? ");

    (this as any)[node.consequent.type](node.consequent, state);

    output.write(" : ");

    (this as any)[node.alternate.type](node.alternate, state);

    output.operators.push(":?");
  },

  NewExpression(node: any, state: any) {
    const { output } = state;

    output.write("new ");
    output.operators.push("new");

    if (
      ExpressionPrecedence[node.callee.type] <
        ExpressionPrecedence.CallExpression ||
      ASTUtil.hasCallExpression(node.callee)
    ) {
      output.write("(");

      (this as any)[node.callee.type](node.callee, state);

      output.write(")");

      output.operators.push("()");
    } else {
      (this as any)[node.callee.type](node.callee, state);
    }

    ASTUtil.formatSequence(node["arguments"], state, this);
  },

  CallExpression(node: any, state: any) {
    const { output } = state;

    if (
      ExpressionPrecedence[node.callee.type] <
      ExpressionPrecedence.CallExpression
    ) {
      output.write("(");

      (this as any)[node.callee.type](node.callee, state);

      output.write(")");
      output.operators.push("()");
    } else {
      (this as any)[node.callee.type](node.callee, state);
    }

    ASTUtil.formatSequence(node["arguments"], state, this);
  },

  MemberExpression(
    node: {
      object: { type: string | number };
      computed: any;
      property: { type: string | number };
    },
    state: { output: any }
  ) {
    const { output } = state;

    if (
      ExpressionPrecedence[node.object.type] <
      ExpressionPrecedence.MemberExpression
    ) {
      output.write("(");

      (this as any)[node.object.type](node.object, state);

      output.write(")");
      output.operators.push("()");
    } else {
      (this as any)[node.object.type](node.object, state);
    }

    if (node.computed) {
      output.write("[");

      (this as any)[node.property.type](node.property, state);

      output.write("]");

      output.operators.push("[]");
    } else {
      output.write(".");
      output.operators.push(".");

      (this as any)[node.property.type](node.property, state);
    }
  },

  MetaProperty(
    node: { meta: { name: any }; property: { name: any } },
    state: {
      output: {
        write: (arg0: string) => void;
        operators: string[];
        operands: any[];
      };
    }
  ) {
    state.output.write(`${node.meta.name}.${node.property.name}`);

    state.output.operators.push(".");
    state.output.operands.push(node.meta.name);
    state.output.operands.push(node.property.name);
  },

  Identifier(
    node: { name: any },
    state: { output: { write: (arg0: any) => void; operands: any[] } }
  ) {
    state.output.write(node.name);
    state.output.operands.push(node.name);
  },

  Literal(
    node: { raw: null; regex: null; value: any },
    state: { output: { write: (arg0: string) => void; operands: any[] } }
  ) {
    if (node.raw != null) {
      state.output.write(node.raw);
      state.output.operands.push(node.raw);
    } else if (node.regex != null) {
      this.RegExpLiteral(node, state);
    } else {
      state.output.write(JSON.stringify(node.value));
    }
  },

  RegExpLiteral(
    node: { regex: any },
    state: { output: { write: (arg0: string) => void } }
  ) {
    const { regex } = node;

    state.output.write(
      `new RegExp(${JSON.stringify(regex.pattern)}, ${JSON.stringify(
        regex.flags
      )})`
    );
  },

  // Babylon AST nodes ---------------------------------------------------------------------------------------------

  ObjectProperty: Property,

  RestProperty: RestElement,

  BooleanLiteral(
    node: { value: any },
    state: { output: { write: (arg0: any) => void; operands: string[] } }
  ) {
    state.output.write(node.value);
    state.output.operands.push(JSON.stringify(node.value));
  },

  DirectiveLiteral(
    node: { value: any },
    state: { output: { write: (arg0: any) => void; operands: string[] } }
  ) {
    state.output.write(node.value);
    state.output.operands.push(JSON.stringify(node.value));
  },

  NullLiteral(
    node: any,
    state: { output: { write: (arg0: string) => void; operands: string[] } }
  ) {
    state.output.write("null");
    state.output.operands.push("null");
  },

  NumericLiteral(
    node: { value: any },
    state: { output: { write: (arg0: any) => void; operands: string[] } }
  ) {
    state.output.write(node.value);
    state.output.operands.push(JSON.stringify(node.value));
  },

  StringLiteral(
    node: { extra: { raw: null } | null; value: any },
    state: { output: { write: (arg0: string) => void; operands: string[] } }
  ) {
    if (node.extra != null && node.extra.raw != null) {
      state.output.write(node.extra.raw);
      state.output.operands.push(node.extra.raw);
    } else {
      state.output.write(JSON.stringify(node.value));
      state.output.operands.push(JSON.stringify(node.value));
    }
  },
};
