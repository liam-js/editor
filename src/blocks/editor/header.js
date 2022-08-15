import Liam from '@liam-js/liam';
import localforage from 'localforage';
import FileSaver from '../../js/fileSaver';

function downloadFile(fileName, content) {
  // 定义触发事件的DOM
  var aLink = document.createElement('a');
  // 定义BLOB对象，声明文件内容
  var blob = new Blob([content]);
  // 判定平台
  var isMac = navigator.userAgent.indexOf('Mac OS') > -1;
  // 定义事件对象
  var evt = document.createEvent(isMac ? 'MouseEvents' : 'HTMLEvents');
  // 初始化事件
  // evt.initEvent("click", false, false);
  evt[isMac ? 'initMouseEvent' : 'initEvent']('click', false, false);
  // 定义下载文件名称
  aLink.download = fileName;
  // 根据上面定义的 BLOB 对象创建文件 dataURL
  aLink.href = URL.createObjectURL(blob);
  // 触发事件下载
  aLink.dispatchEvent(evt);
}

function post(action, data, target) {
  const body = document.getElementsByTagName('body')[0];
  const form = document.createElement('form');
  form.style.display = 'none';
  const attrs = {
    method: 'POST',
    action: action,
    target: target || '_blank',
    innerHTML: (function () {
      const html = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          html.push(
            '<textarea type="hidden" name="' +
              key +
              '" >' +
              data[key] +
              '</textarea>'
          );
        }
      }
      return html.join('');
    })(),
  };
  for (const k in attrs) {
    if (Object.hasOwnProperty.call(attrs, k)) {
      form[k] = attrs[k];
    }
  }
  body.appendChild(form);
  form.submit();
  setTimeout(function () {
    body.removeChild(form);
  }, 100);
}

let project = '';
let projectSaved = '';
let store = null;
let hasProjectChanged = function () {
  if (project !== projectSaved) {
    Liam.set('project-status', 'changed');
  } else {
    Liam.set('project-status', 'saved');
  }
};
let saveProject = function (p, File) {
  const name = File && File.name ? File.name : 'undefined';
  projectSaved = p;
  Liam.set('project-name', name);
  Liam.set('project-status', 'saved');
};
let onOpen = function () {};
let onTogglePreviewMode = function () {};

const getLocalforage = function (cb) {
  if (store) {
    cb();
  } else {
    store = localforage.createInstance({
      name: 'liam-web-db',
    });
    cb();
  }
};

var FSaver = new FileSaver({
  on: function (type, msg) {
    //   console.log(type, msg);
    //   info.innerHTML = type;
  },
});
var getFromLocal = function (cb) {
  var done = function (p) {
    project = p || project;
    cb(project);
  };
  getLocalforage(function () {
    // 本地存储一份
    store.getItem('liam-temp-project', function (err, text) {
      if (!err && text) {
        done(text);
      } else {
        done('');
      }
    });
  });
};
var get = function (cb) {
  var done = function (p, File) {
    project = p || project;
    // 本地存储一份
    getLocalforage(function () {
      store.setItem('liam-temp-project', project);
      cb && cb(project, File);
    });
  };
  // 尝试从本地文件读取
  FSaver.get(function (text) {
    done(text, this.File);
  });
};
var set = function (p, cb, type) {
  // 内存存一份
  project = p;

  // 本地文件存一份
  if (type === 'saveAs') {
    FSaver.saveAs(project, function () {
      cb && cb(this.fileHandle);
    });
  } else {
    FSaver.set(project, function () {
      cb && cb(this.fileHandle);
    });
  }

  getLocalforage(function () {
    // 本地存储一份
    store.setItem('liam-temp-project', project);
  });
};
var open = function (fn) {
  if (FSaver.fileHandle) {
    if (window.confirm('您确定要打开一个新的项目吗？')) {
      FSaver.open(function () {
        get(fn);
      });
    }
  } else {
    FSaver.open(function () {
      get(fn);
    });
  }
};

const getAppHtml = function () {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Liam APP</title>
</head>
<body>
<div id="root"></div>
<script src="https://e.sinaimg.cn/ssfe/lima/js/app.js?v=1.0.5"></script>
<script>
  (function(){
    Liam.require(['liam'],function(Liam, text){
      const js = (function(Liam, React, ReactDOM){
        return ${project.trim()}
      })(Liam, Liam.React, Liam.ReactDOM);
      Liam.render(js, document.querySelector('#root'));
    })
  })();
</script>
</body>
</html>
  `;
};
const getDemoHtml = function () {
  return `
  <div id="root"></div>
  <script src="https://e.sinaimg.cn/ssfe/lima/js/app.js?v=1.0.5"></script>
  <script>
    (function(){
      const text = ${JSON.stringify(project)};
      Liam.require(['liam', 'text!https://e.sinaimg.cn/ssfe/lima/js/float-action-button.js?v=1.0.1'],function(Liam, floatButtonText){
        
          const js = [Liam.toJs(floatButtonText, {
            text: text
          }), Liam.toJs(text.trim())];
          Liam.render(js, document.querySelector('#root'));
        
      })
    })();
  </script>
  `;
};

let previewMode = 'popup';
const getPreviewMode = function () {
  if (previewMode === 'popup') {
    previewMode = 'embed';
  } else {
    previewMode = 'popup';
  }
  return previewMode;
};



const actions = {
  open: function () {
    open(function (project, File) {
      // 第一次打开，文件肯定没有修改过的
      saveProject(project, File);
      onOpen(project);
    });
  },
  save: function () {
    set(project || '', function (File) {
      saveProject(project, File);
    });
  },
  saveAs: function () {
    set(
      project || '',
      function (File) {
        saveProject(project, File);
      },
      'saveAs'
    );
  },
  generate: function () {
    downloadFile('liam.html', getAppHtml());
  },
  toCodepen: function () {
    post('https://codepen.io/pen/define', {
      data: JSON.stringify({
        title: 'Liam Demo',
        description: 'Share From Liam Editor',
        tags: ['liam', 'react', 'json'],
        js_external: '', // 多个用分号快过年隔开
        css_external: '', // 多个用分号快过年隔开
        html: getDemoHtml(),
        js: '',
        editors: '100', // 编辑器侧栏，html/css关闭，js打开
      }),
    });
  },
};
const buttons = [
  [
    'openLocal',
    '打开本地文件',
    actions.open,
  ],
  [
    'saveToLocal',
    '保存',
    actions.save,
  ],
  [
    'saveToLocal',
    '另存',
    actions.saveAs,
  ],
  [
    'generatePage',
    '生成页面',
    actions.generate,
  ],
  [
    'shareToCodepen',
    '分享到 Codepen',
    actions.toCodepen,
  ],
  'hr',
  [
    'togglePreviewMode',
    '弹出预览',
    function () {
      onTogglePreviewMode(getPreviewMode());
    },
  ],
  'hr',
  [
    'disablePreview',
    {
      type: function(props){
        return props.Liam_get_disable_preview
          ? '启用实时预览'
          : '暂停实时预览';
      },
      s: 'disable_preview'
    },
    function () {
      Liam.set('disable_preview', !Liam.get('disable_preview'))
      // onDisablePreview();
    },
  ],
  'hr',
  [
    'select',
    '选择',
    function () {
      Liam.trigger('component-edit', 'select');
    },
  ],
  [
    'delete',
    '删除',
    function () {
      Liam.trigger('component-edit', 'delete');
    },
  ],
  [
    'copy',
    '复制',
    function () {
      Liam.trigger('component-edit', 'copy');
    },
  ],
  [
    'duplicate',
    '重复',
    function () {
      Liam.trigger('component-edit', 'duplicate');
    },
  ],
  [
    'insert',
    '插入',
    function () {
      Liam.trigger('component-edit', 'insert');
    },
  ],
  [
    'prepend',
    '前置',
    function () {
      Liam.trigger('component-edit', 'prepend');
    },
  ],
  [
    'append',
    '后置',
    function () {
      Liam.trigger('component-edit', 'append');
    },
  ],
  [
    'replace',
    '替换',
    function () {
      Liam.trigger('component-edit', 'replace');
    },
  ],
  [
    'toParent',
    '父级',
    function () {
      Liam.trigger('component-edit', 'toParent');
    },
  ],
];

Liam.on('proect-actions',function(type){
  actions[type]();
});

import('mousetrap').then(function(js){
  const Mousetrap = js.default;
  const shortcuts = {
    open: 'mod+o',
    save: 'mod+s',
    saveAs: 'mod+shift+s',
  };
  for (const key in shortcuts) {
    if (Object.hasOwnProperty.call(shortcuts, key)) {
      const shortcut = shortcuts[key];
      Mousetrap.bind(shortcut, function() {
       actions[key]();
    });
    }
  }
});



window.addEventListener('beforeunload', function (event) {
  if (projectSaved !== project) {
    // 显示确认对话框
    event.preventDefault();
    // 为了兼容处理，Chrome需要设置returnValue
    event.returnValue = '';
  }
});

let firstLoad = true;

const LiamJSON = function (props) {
  project = props.project;
  onOpen = props.onOpen || function () {};
  onTogglePreviewMode = props.onTogglePreviewMode || function () {};
  if (firstLoad) {
    firstLoad = false;

    // 作为弹窗时，数据是父级页给的，不用取本地存储数据
    if(!window.opener){
      getFromLocal(function (p) {
        projectSaved = project = p;
        saveProject(p);
        onOpen(p);
      });
    }
    

    onTogglePreviewMode(getPreviewMode());
  } else {
    hasProjectChanged();
  }

  let json = [
    {
      type: 'a',
      props: {
        className: 'logo',
      },
      children: 'LIAM',
    },
  ];
  json = json.concat(
    buttons.map(function (item) {
      if (item === 'hr') {
        return {
          type: 'span',
          props: {
            className: 'divider-a',
          },
        };
      } else {
        return {
          type: 'button',
          children: item[1],
          props: {
            className: 'button-a',
            onClick: item[2],
          },
        };
      }
    })
  );
  return json;
};
export default LiamJSON;
