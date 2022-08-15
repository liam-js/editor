import Liam from '@liam-js/liam';
import liamHeader from './header';
import liamFooter from './footer';
import liamNotice from './notice';
import SplitPane from 'react-split-pane';
import './index.css';

const urlInstance = new URL(window.location.href);

Liam.config({
  wrapText: true
});

// https://github.com/niksy/throttle-debounce
function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }

  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }

  function wrapper() {
    for (
      var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    }

    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.
  return wrapper;
}

var getParam = function (key) {
  var params = window.location.search.split('?')[1];
  if (params) {
    var arr = params.split('&');
    for (var i = 0; i < arr.length; i++) {
      var data = arr[i].split('=');
      if (data[0] === key) {
        return data[1];
      }
    }
  }
};

// 要加载的页面 js
let textUrl = getParam('url');
textUrl = textUrl ? decodeURIComponent(textUrl) : '';



const noop = function () {};
// 获取页面内容，先展示在右侧预览区
const getContent = function (cb) {
  cb = cb || noop;
  if (textUrl) {
    import('../../js/windowMessageManager').then(function(WindowMessageManager){
      fetch(textUrl)
      .then(function (response) {
        return response.text();
      }).then(function(text){

        cb(WindowMessageManager, text);

      }).catch(function (err) {
          console.log(err)
          cb(WindowMessageManager,'');
      })
      
    });
    
  } else {
    import('../../js/windowMessageManager').then(cb);
  }
};

// 获取编辑器，把代码显示到右侧编辑
const getEditor = function (cb) {
  cb = cb || noop;
  import('monaco-editor').then(cb);
  // window.Liam.require(['vs/editor/editor.main'], cb);
};

// 最后加载语法分析
const getAst = function (cb) {
  cb = cb || noop;
  import('../../js/ast').then(cb);
};

// 另外还作为弹窗接收信息
const getPopup = function (cb) {
  cb = cb || noop;
  import('../../js/popupWindowMessageManager').then(cb);
};

console.time('资源');
// 提前加载
getContent();
getEditor();
getAst();

// 获取代码信息，通过 AST 分析，得出各组件的代码位置
const getCodeInfo = (function () {
  let acorn = null,
    acornWalk = null,
    AstTypes = null,
    escodegen = null,
    b = function () {};

  const ready = function (cb) {
    if (acorn) {
      cb();
    } else {
      getAst(function (ast) {
        acorn = ast.acorn;
        acornWalk = ast.acornWalk;
        AstTypes = ast.astTypes;
        escodegen = ast.escodegen;
        b = AstTypes.builders;
        cb();
      });
    }
  };

  const _getCodeInfo = function (code) {
    const ast = [];

    // 对象属性的 key 的值，可能是标识符如 children, 也可能是字面量如 'children'
    const getPropertyKeyName = function (property) {
      // SpreadElement 找不到字段名
      // 不带引号 Identifier 带引与 literal
      if (property.key) {
        if (property.key.type === 'Identifier') {
          return property.key.name;
        }
        if (property.key.type === 'Literal') {
          return property.key.value;
        }
      }

      return '';
    };

    // 因为 __ast 都是数字和字符串， 只处理 prop 为数字的对象的性况，其它能转为字符串就转为字符串，否则都为 null
    const getObjectNode = function (obj) {
      const properties = (function () {
        const props = [];
        for (const key in obj) {
          if (Object.hasOwnProperty.call(obj, key)) {
            const element = obj[key];

            const prototypeString = Object.prototype.toString.call(element);
            let value;
            let node;
              
              if (prototypeString === '[object Object]') {
                // node 类型，不用再转换
                if (element && element.type) {
                  node = element;
                } else {
                  node = getObjectNode(element);
                }
              } else {
                if (prototypeString === '[object Number]') {
                  value = element;
                } else {
                  if (element && typeof element.toString === 'function') {
                    value = element.toString();
                  } else {
                    value = null;
                  }
                }
                node = b.literal(value);
              }
            
            // 声明一个字段
            props.push(b.property('init', b.identifier(key), node));
          }
        }
        return props;
      })();
      return b.objectExpression(properties);
    };
    const wrapWithType = function (node, parentType) {
      let isDebugNode = false;
      const { end, start, loc, type } = node;
      if (type === 'ObjectExpression') {
        // 有属性
        const properties = node.properties;
        // 是否有children字段
        for (let index = 0; index < properties.length; index++) {
          const node1 = properties[index];
          const name = getPropertyKeyName(node1);
          if (name === '__ast') {
            isDebugNode = true;
            break;
          }
        }
      }
      if (isDebugNode) {
        return node;
      }
      // TODO 暂时无法得知，为什么 column 会少1,可能是由于 zero-based column
      const info = {
        end,
        start,
        startLine: loc.start.line,
        startColumn: loc.start.column + 1,
        endLine: loc.end.line,
        endColumn: loc.end.column + 1,
        // parentType 用于后期对该 node 的操作，如 prepend,append,delete 等
        parentType,
      };

      ast.push(info);
      if (type === 'ObjectExpression') {
        // 直接添加一个 __ast 字段即可
        const newNode = getObjectNode({
          __ast: info,
        });
        node.properties = node.properties.concat(newNode.properties);
        return node;
      } else {
        // 其它情况，需要包一下
        return getObjectNode({
          __type: node || null,
          __ast: info,
        });
      }
    };

    const getNodePosition = function (tree) {
      // 获取 node props 字段名数组
      const getNodePropsArray = function (properties, key) {
        // properties 对象的属性
        const nodePropsArray = [];
        properties.forEach(function (node1) {
          // 属性名
          const name = getPropertyKeyName(node1);
          // 属性值
          const value = node1.value;
          // n 和 r 有可能是数组，也有可能是字符串;
          if ([key].indexOf(name) > -1) {
            // 如果是数组
            if (value.type === 'ArrayExpression') {
              value.elements.forEach(function (item) {
                if (item.type === 'Literal') {
                  nodePropsArray.push(item.value);
                }
              });
            } else if (value.type === 'Literal') {
              nodePropsArray.push(value.value);
            }
          }
        });
        return nodePropsArray;
      };

      const isChildNode = function (properties) {
        let isNode = true;
        for (let index1 = 0; index1 < properties.length; index1++) {
          const node1 = properties[index1];
          // 属性名
          const name = getPropertyKeyName(node1);
          // 属性值
          const value = node1.value;

          if (name === 'r') {
            // 如果是数组
            if (value.type === 'ArrayExpression') {
              for (let index = 0; index < value.elements.length; index++) {
                const item = value.elements[index];
                if (item.type === 'Literal') {
                  if (item.value === 'children') {
                    isNode = false;
                    break;
                  }
                }
              }
            } else if (value.type === 'Literal') {
              if (value.value === 'children') {
                isNode = false;
                break;
              }
            }
          }
        }
        return isNode;
      };
      const isFunctionX = function (type) {
        return (
          type === 'FunctionExpression' ||
          type === 'ArrowFunctionExpression' ||
          type === 'ClassExpression'
        );
      };
      const handleFuntionx = function (node) {
        const type = node.type;
        if (
          type === 'FunctionExpression' ||
          type === 'ArrowFunctionExpression'
        ) {
          // 如果是函数，则它返回的值也需要遍历
          const functionsBodyStatements = node.body.body;
          functionsBodyStatements.forEach(function (item) {
            if (item.type === 'ReturnStatement') {
              walk(item);
            }
          });
        } else if (type === 'ClassExpression') {
          // 如果是类，则它的 render 方法的返回的值也需要遍历
          const methods = node.body.body;
          methods.forEach(function (item) {
            const name = item.key.name;
            if (name === 'render') {
              handleFuntionx(item.value);
            }
          });
        }
      };
      // 获取每个 node 的代码位置信息
      const getCodeWithPosition = function (node, parentType) {
        let newNode = node;
        const type = node.type;
        if (type === 'ArrayExpression') {
          // 如果是数组则要继续遍历
          walk(node);
        } else if (type === 'ObjectExpression') {
          // 如果是一个对象，本身要封装，下面可能还有 children 节点，属性节点需要遍历
          // 有属性
          const properties = node.properties;
          // children 是否是 node
          const isNode = isChildNode(properties);

          // 是否有children字段
          properties.forEach(function (node1) {
            const name = getPropertyKeyName(node1);
            const value = node1.value;

            // 有children
            if (name === 'children' && isNode) {
              // 如果 children 在 r 中，则不是 node，不要处理
              walk(node1);
            } else if (name === 'props') {
              // props 中包含node的字段名数组
              const nodePropsArray = getNodePropsArray(properties, 'n');
              const renderPropsArray = getNodePropsArray(properties, 'r');

              // 是否有props 字段
              if (
                value.type === 'ObjectExpression' &&
                nodePropsArray.length > 0
              ) {
                const propProperties = value.properties;
                propProperties.forEach(function (node2) {
                  const name = getPropertyKeyName(node2);
                  // 节点属性
                  if (nodePropsArray.indexOf(name) > -1) {
                    walk(node2);
                  }

                  // 渲染属性，函数执行后返回节点
                  if (renderPropsArray.indexOf(name) > -1) {
                    // 渲染属性不能调用 walk 来包装本身，包装完后就不是函数，不能调用了
                    handleFuntionx(node2.value);
                  }
                });
              }
            } else if (name === 'type') {
              // type 可能直接是一个组件
              if (isFunctionX(node1.value.type)) {
                // type 如果是组件也不能调用 walk 来包装本身，包装完后就不是组件了，不能实例化了
                handleFuntionx(node1.value);
              }
            }
          });

          newNode = wrapWithType(node, parentType);
        } else if (isFunctionX(type)) {
          // 函数组件 类组件
          handleFuntionx(node);
          newNode = wrapWithType(node, parentType);
        } else if (type === 'CallExpression') {
          // 闭包
          handleFuntionx(node.callee);
          newNode = wrapWithType(node, parentType);
        } else {
          newNode = wrapWithType(node, parentType);
        }

        return newNode;
      };

      const walk = function (arrayOrProperty) {
        const type = arrayOrProperty.type;
        // node 一般挂载在数组上（有 elements 属性），或属性上（有 value 属性）
        if (type === 'ArrayExpression') {
          // 数组
          const elements = arrayOrProperty.elements;
          elements.forEach(function (node, index) {
            elements[index] = getCodeWithPosition(node, type);
          });
        } else if (type === 'Property') {
          // 属性
          arrayOrProperty.value = getCodeWithPosition(
            arrayOrProperty.value,
            type
          );
        } else if (type === 'ReturnStatement') {
          // 函数返回值
          arrayOrProperty.argument = getCodeWithPosition(
            arrayOrProperty.argument,
            type
          );
        }
      };

      // 一、找出一级数组下所有元素
      // 从根目录开始 遍历 目前默认根目录都是数组
      if (tree && tree.body && tree.body[0] && tree.body[0].expression) {
        // 顶级数组元素
        const expression = tree.body[0].expression;
        walk(expression);
      }
      return tree;
    };
    const tree = acorn.parse(code, {
      locations: true,
    });

    // 对象：遍历所有对象，带 type 字段的对象，都加上 _ast 字段，_ast 字段包括代码位置等信息
    acornWalk.ancestor(tree, {
      ObjectExpression(node, ancestors) {
        let parent = null;
        let parentType = 'ArrayExpression';
        const properties = node.properties;
        let isNode = false;
        for (let index = 0; index < properties.length; index++) {
          const item = properties[index];
          if (getPropertyKeyName(item) === 'type') {
            isNode = true;
            break;
          }
        }
        if (isNode) {
          if (ancestors.length > 1) {
            parent = ancestors[ancestors.length - 1];
            parentType = parent.type;
          }
          wrapWithType(node, parentType);
        }
      },
    });

    // 非对象，但是 node 节点 schema 的话，也加上 ast 信息，但都嵌套上 { __type:node,__ast:ast} 才能加上 __ast 字段
    const newTree = getNodePosition(tree);

    return {
      code: escodegen.generate(newTree),
      source: ast,
    };
  };

  const getCodeInfo = function (code, callback) {
    ready(function () {
      callback(_getCodeInfo(code));
    });
  };
  return getCodeInfo;
})();

const Ctrl = {
  content: '',
  editor: null,
  editorModel: null,
  wm: null,
};

// 初始化容器通信
const initWindowMessageManager = (function () {
  let WindowMessageManager = null;
  const setMode = (Ctrl.setPreviewMode = function (mode) {
    // embed popup
    if (mode === 'popup') {
      // Ctrl.iframe.style.display = 'none';
      init('_blank');
    } else {
      // Ctrl.iframe.style.display = '';
      init('preview-iframe');
    }
  });

  const init = function (name) {
    if (Ctrl.wm && Ctrl.wm.destory) {
      Ctrl.wm.destory();
    }

    urlInstance.pathname = '/editor/preview.html';
    const MM1 = (Ctrl.wm = new WindowMessageManager.default(urlInstance.toString(), {
      // name 指定打开弹窗的地方，可以是一个 iframe name
      name: name,
      newTag: name === '_blank' ? true : false,
      placement: 'right-center',
      crossOriginAlert: false,
      autoFocus: false,
    }));

    Ctrl.onContentChange && Ctrl.onContentChange();

    MM1.on(function (data) {
      // 接收到预览页的点击事件
      if (data.type && data.type === 'preview-click') {
        // 字符串转数字
        let value = data.value.split('-').map(function (item) {
          return Number(item);
        });
        if (value.length === 4) {
          Ctrl.selectComponent(value, true);
        }
      }
      if (data.type && data.type === 'preview-error') {
        Liam.set('project-notices', data.value);
        if (data.value.length > 0) {
          Liam.set('project-notice-visible', true);
        }
      }
      if (data.type && data.type === 'preview-loaded') {
        Ctrl.onContentChange && Ctrl.onContentChange();
      }
    });
  };
  return function (WM) {
    WindowMessageManager = WM;
    setMode('');
    Liam.on('preview-mode', function (mode) {
      setMode(mode);
    });
  };
})();

// 初始化编辑器
const initEditor = (function () {
  return function (monaco, value) {
    value = value || Ctrl.content;
    // editor 实例参考 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneCodeEditor.html
    // customLiamLanguageTheme(monaco);
    // 编辑器初始化
    const editorNode = document.getElementById('editor');
    editorNode.innerHTML = '';
    const editor =
      (Ctrl.editor =
      window.editor =
        monaco.editor.create(editorNode, {
          // theme: 'liam-theme',
          value: value || '',
          language: 'javascript',
          glyphMargin: true,
          foldingHighlight: true,
          unfoldOnClickAfterEndOfLine: true,
          links: true,
          // wordWrap: 'wordWrapColumn',
          // wordWrapColumn: 40,
          // wordWrapMinified: true,
          // wrappingIndent: 'indent',
        }));

    const editorModel = (Ctrl.editorModel = editor.getModel());

    // 重置宽高
    Ctrl.editorLayout = throttle(100, function () {
      Ctrl.editor.layout();
    });

    let currentRange = [];
    let currentParentType = '';

    // 左侧装饰条
    let decorations = [];

    // 上下空行
    let viewZones = {};

    Ctrl.selectComponent = function (range, reveal, parentType) {
      if (range) {
        // const centerPos = pos.start + parseInt((pos.end - pos.start) / 2);
        if (reveal) {
          editor.revealRangeNearTop(
            new monaco.Range(range[0] - 3, range[1], range[2], range[3] + 3)
          );
        }

        if (currentRange.join('-') === range.join('-')) {
          return;
        }
        currentRange = range;
        currentParentType = parentType;
        // const range = getRangArguments(pos.start,pos.end);
        // editor.deltaDecorations([],[]);
        decorations = editor.deltaDecorations(decorations, [
          {
            range: new monaco.Range(range[0], range[1], range[2], range[2]),
            options: {
              isWholeLine: false,
              className: 'liam-line-content',
              // glyphMarginClassName: 'liam-glyph-margin',
              // linesDecorationsClassName: 'liam-line-decoration',
              minimap: true,
              firstLineDecorationClassName: 'liam-first-line-decoration',
              // inlineClassName: 'liam-inline-decoration'
            },
          },
        ]);

        // 前后加一个空行
        const lines = [range[0] - 1, range[2]];

        const removeViewZone = function (lines) {
          for (const key in viewZones) {
            if (Object.hasOwnProperty.call(viewZones, key)) {
              const viewZoneId = viewZones[key];

              if (lines.indexOf(key) === -1) {
                editor.changeViewZones(function (changeAccessor) {
                  changeAccessor.removeZone(viewZoneId);
                  delete viewZones[key];
                });
              }
            }
          }
        };

        removeViewZone(lines);

        lines.forEach(function (line) {
          if (!viewZones[line]) {
            // 空行没有则添加
            editor.changeViewZones(function (changeAccessor) {
              var domNode = document.createElement('div');
              domNode.className = 'liam-viewzone';
              viewZones[line] = changeAccessor.addZone({
                afterLineNumber: line,
                heightInLines: 1,
                domNode: domNode,
              });
            });
          }
        });
      }
    };

    /* 
      一、select/copy/repace 现在是没问题的，如果 delete 使用 null 来 replace 也是没问题的,
      二、先通过前面有没有冒号，判断该组件是不是一个属性值，不是属性值，肯定是一个数组元素(目前已经在 ast parentType 里得出 currentParentType )
      三、数组元素
        - append: 先判断前面有没有逗号，没有则先加逗号，然后 copyContent+逗号即可
        - prepend: copyContent+逗号即可
        - delete: 判断后面有没有逗号，有则一起删除（目前只 replace 为 null ）
        - insert: 暂不支持
      二、属性值，append, prepend 先加上[],然后其它操作和 数组元素一致 
      
      */

    const componentEdit = (Ctrl.componentEdit = (function () {
      let copyContent = '';
      const getRangeContent = function (range) {
        range = range || currentRange;
        return editorModel.getValueInRange(
          new monaco.Range(range[0], range[1], range[2], range[3])
        );
      };
      const select = function () {
        editor.setSelection(
          new monaco.Range(
            currentRange[0],
            currentRange[1],
            currentRange[2],
            currentRange[3]
          )
        );
      };
      const edit = function (range, text) {
        editor.executeEdits('', [
          {
            range: new monaco.Range(range[0], range[1], range[2], range[3]),
            text: text || copyContent,
          },
        ]);
      };
      // 目前暂用 null 来替换，不用处理 逗号问题
      const del = function () {
        // 先 copy，有剪切功能
        copy();
        edit(currentRange, "''");
      };
      const copy = function () {
        // TODO 同时复制到粘贴板
        copyContent = getRangeContent(currentRange);
      };

      // TODO 需要处理逗号情况
      const append = function () {
        if (currentParentType === 'ArrayExpression') {
          edit(
            [
              currentRange[2],
              currentRange[3],
              currentRange[2],
              currentRange[3],
            ],
            // TODO 判断前面有没有逗号，没有逗号才加逗号；目前不知道为什么逗号没有重复，可能编辑器自己修复了：）
            ', ' + copyContent
          );
        } else {
          // 替换
          edit(
            currentRange,
            '[' + getRangeContent() + ', ' + copyContent + ']'
          );
        }
      };
      const duplicate = function () {
        copy();
        append();
      };

      const prepend = function () {
        if (currentParentType === 'ArrayExpression') {
          edit(
            [
              currentRange[0],
              currentRange[1],
              currentRange[0],
              currentRange[1],
            ],
            copyContent + ', '
          );
        } else {
          // 替换
          edit(
            currentRange,
            '[' + copyContent + ', ' + getRangeContent() + ']'
          );
        }
      };
      const insert = function () {
        alert('暂不支持添加到子节点，可手动添加 children 字段');
      };
      const replace = function () {
        edit(currentRange);
      };
      const toParent = function () {
        selectComponentByRange(currentRange);
      };
      const actions = {
        select,
        delete: del,
        copy,
        append,
        duplicate,
        prepend,
        insert,
        replace,
        toParent,
      };
      return function (type) {
        if (type !== 'select') {
          if (currentParentType === '') {
            alert('请选中一个组件，再进行 ' + type + ' component 操作');
            return;
          }
          if (['append', 'prepend', 'insert', 'replace'].indexOf(type) !== -1) {
            if (!copyContent) {
              alert('请复制一个组件，再进行 ' + type + ' component 操作');
              return;
            }
          }
          if (currentRange.length === 0 || currentParentType === '') {
            alert('请选中一个组件，再进行 ' + type + ' component 操作');
            return;
          }
        }

        if (
          [
            'select',
            'delete',
            'copy',
            'append',
            'duplicate',
            'prepend',
            'insert',
            'replace',
            'toParent',
          ].indexOf(type) === -1 ||
          !actions[type]
        ) {
          alert('暂时不支持 ' + type + ' component 操作');
        } else {
          actions[type]();
          editor.focus();
        }
      };
    })());

    Liam.on('component-edit', function (type) {
      componentEdit(type);
    });

    let debugcodeSource = [];
    // const getCurrentCodeSourceByPosition = function (position) {
    //   let currentCodeSource = {
    //     startLine: 1,
    //     startColumn: 0,
    //     endLine: Infinity,
    //     endColumn: Infinity,
    //     parentType: '',
    //   };
    //   let distance = Infinity;
    //   for (let index = 0; index < debugcodeSource.length; index++) {
    //     const element = debugcodeSource[index];

    //     if (
    //       position.lineNumber > element.startLine - 1 &&
    //       position.lineNumber < element.endLine + 1
    //     ) {
    //       let newDistance = element.endLine - element.startLine;

    //       if (newDistance === 0) {
    //         // 如果只在一行
    //         // 那看位置在谁之间就是
    //         if (
    //           element.startColumn < position.column &&
    //           element.endColumn > position.column
    //         ) {
    //           currentCodeSource = element;
    //           break;
    //         }
    //       } else {
    //         // 如果跨行
    //         if (newDistance < distance) {
    //           distance = newDistance;
    //           currentCodeSource = element;
    //         }
    //       }
    //     }
    //   }

    //   return currentCodeSource;
    // };
    const getParentsByRange = function (range) {
      const parents = [];
      for (let index = 0; index < debugcodeSource.length; index++) {
        const element = debugcodeSource[index];
        if (
          element.startLine < range[0] ||
          (element.startLine === range[0] && element.startColumn < range[1])
        ) {
          // 代码范围在前面
          if (
            element.endLine > range[2] ||
            (element.endLine === range[2] && element.endColumn > range[3])
          ) {
            // 代码范围在后面
            // 包围了，那就是它的父级或祖级
            parents.push(element);
          }
        }
      }
      parents.sort(function (a, b) {
        if (b.startLine === a.startLine) {
          return b.startColumn - a.startColumn;
        } else {
          return b.startLine - a.startLine;
        }
      });
      return parents;
    };

    const selectComponentByRange = function (range) {
      if (range.length === 4) {
        const parents = getParentsByRange(range);
        const parent = parents[0];

        if (parent) {
          const codePos = [
            parent.startLine,
            parent.startColumn,
            parent.endLine,
            parent.endColumn,
          ];
          // console.log(cursorPath,'光标信息',index);

          Ctrl.wm.post({
            type: 'cursor',
            value: codePos,
          });
          Ctrl.selectComponent(codePos, false, parent.parentType);
        }
      }
    };

    // 代码光标位置变化
    const onPositionChange = throttle(500, function (pos) {
      selectComponentByRange([
        pos.lineNumber,
        pos.column,
        pos.lineNumber,
        pos.column,
      ]);
    });

    // 代码变化
    const onContentChange = (Ctrl.onContentChange = throttle(200, function () {
      const value = editor.getValue();
      const disablePreview = Liam.get('disable_preview');
      // getCodeInfo 第一次是异步的
      let isReady = false;
      getCodeInfo(value, function (info) {
        isReady = true;
        debugcodeSource = info.source;

        if (!disablePreview) {
          Ctrl.wm.post({
            type: 'change',
            value: info.code,
          });
        }

        // 代码变化，如果有选中组件，它的位置也会变化
        if (currentRange.length === 4) {
          onPositionChange({
            lineNumber: currentRange[0],
            column: currentRange[1],
          });
        }
      });
      if (!isReady && !disablePreview) {
        Ctrl.wm.post({
          type: 'change',
          value: value,
        });
      }

      Liam.set('project', value);

      Ctrl.content = value;
    }));

    onContentChange();
    editorModel.onDidChangeContent(function () {
      onContentChange();
    });

    editor.onDidChangeCursorPosition(function (e) {
      onPositionChange(e.position);
    });

    (function () {
      const shortcuts = {
        open: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO,
        save: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        saveAs:
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
      };
      for (const key in shortcuts) {
        if (Object.hasOwnProperty.call(shortcuts, key)) {
          const shortcut = shortcuts[key];
          // 自定义全选功能，可以在代码中选中一个组件的代码
          editor.addCommand(shortcut, function () {
            Liam.trigger('proect-actions', key);
          });
        }
      }
    })();

    // 增加右键菜单

    (function () {
      const actions = [
        'select',
        'delete',
        'copy',
        'append',
        'duplicate',
        'prepend',
        'insert',
        'replace',
      ];

      const toFirstUpperCase = function (str) {
        return str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
            index === 0 ? letter.toUpperCase() : letter
          )
          .replace(/\s+/g, '');
      };

      actions.forEach(function (item) {
        editor.addAction({
          // An unique identifier of the contributed action.
          id: 'component-' + item,

          // A label of the action that will be presented to the user.
          label: toFirstUpperCase(item) + ' Component',

          // An optional array of keybindings for the action.
          // keybindings: [
          //   monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
          //   // chord
          //   monaco.KeyMod.chord(
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM
          //   )
          // ],

          // A precondition for this action.
          precondition: null,

          // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
          keybindingContext: null,

          contextMenuGroupId: '0_component',

          contextMenuOrder: 0,

          // Method that will be executed when the action is triggered.
          // @param editor The editor instance is passed in as a convenience
          run: function () {
            componentEdit(item);
          },
        });
      });
    })();

    // 添加代码补全
    (function () {
      function createLiamProposals(range) {
        const keyWords = [
          ['Liam', 'Liam 渲染引擎', 'Liam.'],
          ['states', 'Liam 初始化全局状态', 'states: {${1}},'],
          [
            'componentMap',
            'Liam 组件名缩写映射',
            `componentMap: {
\${1:shortName}: 'url#\${2:https://xxxxxx.com/xxx/xx/xx.js}'
},
          `,
          ],
          [
            'getComponent',
            'Liam 获取组件方法',
            `getComponent: function (ctx, next) {
const { schema } = ctx;
if (schema.type && schema.type === '\${1:Demo}') {
ctx.component = \${2:Demo};
}
next();
},
            `,
          ],
          ['config', 'Liam.config 渲染引擎配置', 'Liam.config({${1}});'],
          ['type', '组件字符串信息', "type: '${1}',"],
          ['props', '组件属性对象', 'props: {${1}},'],
          ['children', '组件字节点', 'children: ${1:[]},'],
          ['s', '该组件依赖的全局状态名', 's: ${1:[]},'],
          ['n', '该组件属于节点的属性名', 'n: ${1:[]},'],
          ['r', '该组件属于渲染属性的属性名', 'r: ${1:[]},'],
          ['__init', '组件 init 时调用', '__init: function(){${1}},'],
          [
            '__didMount',
            '组件 didMount 时调用',
            '__didMount: function(){${1}},',
          ],
          [
            '__didUpdate',
            '组件 didUpdate 时调用',
            '__didUpdate: function(){${1}},',
          ],
          [
            '__willUnmount',
            '组件 willUnmount 时调用',
            '__willUnmount: function(){${1}},',
          ],
          [
            '__didCatch',
            '组件 didCatch 时调用',
            '__didCatch: function(){${1}},',
          ],
          [
            'set',
            'Liam 设置全局状态方法',
            "Liam.set('${1:name}', ${2:value});",
          ],
          ['get', 'Liam 获取全局状态的方法', "Liam.get('${1:name}');"],
          [
            'on',
            'Liam 监听全局事件方法',
            "Liam.on('${1:name}', ${2:function(data){${3}}});",
          ],
          [
            'off',
            'Liam 删除监听全局事件方法',
            "Liam.off('${1:name}', ${2:event});",
          ],
          [
            'trigger',
            'Liam 触发全局事件的方法',
            "Liam.trigger('${1:name}', ${2:data};",
          ],
        ];
        return keyWords.map(function (item) {
          return {
            label: item[0],
            kind: monaco.languages.CompletionItemKind.Function,
            detail: item[1],
            insertText: item[2],
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          };
        });
      }

      monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: function (model, position) {
          // var textUntilPosition = model.getValueInRange({
          //   startLineNumber: 1,
          //   startColumn: 1,
          //   endLineNumber: position.lineNumber,
          //   endColumn: position.column
          // });
          // var inObject = textUntilPosition.match(
          //   /{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/
          // );
          // if (!match) {
          //   return { suggestions: [] };
          // }
          var word = model.getWordUntilPosition(position);
          var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: createLiamProposals(range),
          };
        },
      });
    })();
  };
})();

let readyCount = 0;
const previewReady = function () {
  readyCount++;
  if (readyCount < 2) {
    return;
  }
  getContent(function (WindowMessageManager, content) {
    content = content || '';

    const iframe = (Ctrl.iframe = document.querySelector('#preview-iframe'));

    // 初始化消息通信
    initWindowMessageManager(WindowMessageManager);

    // 不等编辑初始化，最快速度渲染页面
    Ctrl.wm.post({
      type: 'change',
      data: content,
    });

    // 初始化编辑器
    getEditor(function (monaco) {
      initEditor(monaco, content);
    });
  });

  //  作为弹窗接收信息
  if (window.opener) {
    getPopup(function (PopupWindowMessageManager) {

      var MM2 = new PopupWindowMessageManager.default(window.opener);

      MM2.on(function (msg) {
        if (msg.type && msg.type === 'edit') {
          setContent(msg.data);
        }
      });
      MM2.post('popupWindowMessageManager ready');
    });
  }
};
Liam.on('preview-ready', previewReady);

const setContent = throttle(500, function (content) {
  if (Ctrl.editorModel) {
    Ctrl.editorModel.setValue(content);
    setTimeout(function () {
      Ctrl.onContentChange();
    }, 0);
  } else {
    Ctrl.content = content;
  }
});
Liam.on('file-open', setContent);

Liam.on('pane-pointer-events', function (val) {
  Ctrl.iframe.style['pointer-events'] = val;
});

// 监听尺寸变化
Liam.on('pane-resize', function () {
  Ctrl.editor && Ctrl.editor.layout();
});
window.addEventListener('resize', function () {
  Ctrl.editor && Ctrl.editor.layout();
});

const LiamJSON = [
  {
    type: 'div',
    props: {
      key: 'header',
      className: 'liam-header',
    },
    children: {
      type: function () {
        return {
          type: liamHeader,
          props: {
            project: Liam.get('project'),
            onOpen: function (project) {
              Liam.trigger('file-open', project);
            },
            onTogglePreviewMode: function (mode) {
              Liam.trigger('preview-mode', mode);
            },
          },
        };
      },
      s: 'project',
    },
  },
  {
    type: 'div',
    props: {
      key: 'body',
      className: 'liam-body',
    },
    children: [
      {
        type: 'div',
        props: {
          key: 'body-menu',
          className: 'liam-body-menu',
        },
        children: [
          {
            type: 'a',
            props: {
              className: 'item',
              href: '',
              onClick: function (e) {
                let MM1 = Liam.get('component-dialog');
                if (Liam.get('component-dialog')) {
                  MM1.post('');
                } else {
                  import('../../js/windowMessageManager').then(function (WindowMessageManager) {
                    urlInstance.pathname = process.env.PUBLIC_URL+'/demos.html';
                    MM1 = new WindowMessageManager.default(urlInstance.toString(), {
                      name: '',
                      newTag: false,
                      widthRatio: 0.7,
                      heightRatio: 0.7,
                      placement: 'center-center',
                      crossOriginAlert: false,
                      autoFocus: true,
                    });
                    Liam.set('component-dialog', MM1);
                    MM1.post('');
                  });
                }
                e.preventDefault();
              },
            },
            children: '组件',
          },
        ],
      },
      {
        type: 'div',
        props: {
          key: 'body-content',
          className: 'liam-body-content',
        },
        children: {
          type: SplitPane,
          props: {
            split: 'vertical',
            minSize: 50,
            defaultSize:
              parseInt(localStorage.getItem('LIAM-EDITOR-SPLIT-SIZE'), 10) ||
              '50%',
            onChange: function (size) {
              Liam.trigger('pane-resize', size);
              localStorage.setItem('LIAM-EDITOR-SPLIT-SIZE', size);
            },
            onDragStarted: function () {
              Liam.trigger('pane-pointer-events', 'none');
            },
            onDragFinished: function () {
              Liam.trigger('pane-pointer-events', 'inherit');
            },
          },
          children: [
            {
              type: 'div',
              props: {
                id: 'editor',
                __didMount: function () {
                  Liam.trigger('preview-ready');
                },
              },
              h: '<div class="screen-root"><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>',
            },
            {
              type: 'iframe',
              props: {
                id: 'preview-iframe',
                className: 'preview-iframe',
                frameBorder: 0,
                name: 'preview-iframe',
                __didMount: function () {
                  Liam.trigger('preview-ready');
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    type: 'div',
    props: {
      key: 'footer',
      className: 'liam-footer',
    },
    children: [
      {
        type: 'span',
        props: {
          key: 'trigger',
          className: 'trigger',
          onClick: function () {
            Liam.set(
              'project-notice-visible',
              !Liam.get('project-notice-visible')
            );
          },
        },
        children: {
          type: 'svg',
          props: {
            style: { verticalAlign: 'middle' },
            t: '1657877807798',
            className: 'icon',
            viewBox: '0 0 1024 1024',
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            'p-id': '3492',
            xlink: 'http://www.w3.org/1999/xlink',
            width: '20',
            height: '20',
          },
          children: {
            type: 'path',
            props: {
              d: 'M640 832a128 128 0 0 1-255.84 6.4L384 832H192v-32a32 32 0 0 1 32-32h3.264l-1.792-352A286.592 286.592 0 0 1 480 129.76V96a32 32 0 0 1 64 0v33.76c144 15.936 256 138.016 256 286.24l-0.032 352H800a32 32 0 0 1 32 32v32h-192z m-64 0h-128a64 64 0 0 0 127.84 4.8L576 832zM512 192h-1.152a222.528 222.528 0 0 0-221.28 216l-0.096 7.68L291.264 768H736V416a224 224 0 0 0-216.32-223.872L512 192z',
              fill: '#000000',
              fillOpacity: '.65',
              'p-id': '3493',
            },
          },
        },
      },
      {
        type: function () {
          return {
            type: liamFooter,
            props: {
              status: Liam.get('project-status'),
              name: Liam.get('project-name'),
            },
          };
        },
        props: {
          key: 'name',
        },
        s: ['project-status', 'project-name'],
      },
    ],
  },
  {
    type: function () {
      return {
        type: liamNotice,
        props: {
          notices: Liam.get('project-notices') || [],
          visible: Liam.get('project-notice-visible') || false,
        },
      };
    },
    s: ['project-notices', 'project-notice-visible'],
  },
];

export default LiamJSON;
