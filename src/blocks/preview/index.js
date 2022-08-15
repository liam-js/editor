// import '@liam-js/liam/dist/app.production.min';
import './index.css';


let __previewErrors = [];
window.addEventListener('error', (event) => {
  let message = event.message;
  if (event.filename) {
    message += '\n' + event.filename.replace(window.location.origin, '');
  }
  if (event.lineno || event.colno) {
    message += ':' + event.lineno + ':' + event.colno;
  }
  // print error stack info
  const hasStack = !!event.error && !!event.error.stack;
  const stack = (hasStack && event.error.stack.toString()) || '';
  __previewErrors.push({
    message: message,
    stack: stack,
  });
});

window.addEventListener(
  'error',
  (event) => {
    const target = event.target;
    // only catch resources error
    if (
      ['link', 'video', 'script', 'img', 'audio'].indexOf(target.localName) > -1
    ) {
      const src = target.href || target.src || target.currentSrc;
      __previewErrors.push({
        message: `GET <${target.localName}> error: ${src}`,
        stack: '',
      });
    }
  },
  true
);
window.addEventListener('unhandledrejection', (e) => {
  let error = e && e.reason;
  const errorName = 'Uncaught (in promise) ';
  let args = {
    message: errorName,
    stack: error,
  };
  if (error instanceof Error) {
    args = {
      message: errorName,
      stack: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    };
  }
  __previewErrors.push(args);
});

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
let textUrl = getParam('url');
textUrl = decodeURIComponent(textUrl);

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
// 用于开发和本地快速测试使用
const isIframe = window.self !== window.top;
const isOpener = !!window.opener;

const urls = [];
if (isIframe || isOpener) {
  urls.push('//e.sinaimg.cn/ssfe/liam/js/editor/popupWindowMessageManager.js');
} else {
  urls.push('text!' + textUrl);
  urls.push('text!https://e.sinaimg.cn/ssfe/liam/js/editor/float-action-button.js');
}
window.t2 = window.liamRequire;
console.log('执行2');

window.liamRequire(['liam'],function(Liam){
  window.liamRequire(
    urls,
    function (PopupWindowMessageManagerOrSchema, floatButtonText) {
      // 使用容器包裹文字，方便定位; 但有些文字处理类的组件，文字包裹后会出错，如动画文字 reat-reveal-text
      Liam.config({
        wrapText: true,
      });
  
      const focusComponent = function (pos, scrollInto) {
        if (Array.isArray(pos)) {
          pos = pos.join('-');
        }
        const focusElement = document.querySelector('.pe-focus');
        const currentElement = document.querySelector('[__loc="' + pos + '"]');
        if (focusElement) {
          focusElement.classList.remove('pe-focus');
        }
        if (currentElement) {
          currentElement.classList.add('pe-focus');
          if (scrollInto) {
            currentElement.scrollIntoView({
              block: 'center',
              inline: 'center',
            });
          }
        }
      };
  
      const render = throttle(200, function (text) {
        try {
          let js = Liam.toJs(text?text.trim():'');
          if (!isIframe || isOpener) {
            js = [
              Liam.toJs(floatButtonText, {
                text: text,
              }),
              js,
            ];
          }
          Liam.render(js, document.querySelector('#root'));
        } catch (error) {
          console.log(error);
        }
      });
  
      if (!isIframe && !isOpener) {
        // 单独打开页面，直接渲染
        render(PopupWindowMessageManagerOrSchema);
      } else {
        const sendError = throttle(1000, function () {
          setTimeout(function () {
            if (__previewErrors.length !== 0) {
              MM1.post({
                type: 'preview-error',
                value: __previewErrors,
              });
              __previewErrors = [];
            }
          }, 0);
        });
        // 预览页错误
        window.addEventListener('error', function () {
          sendError();
        });
        window.addEventListener('unhandledrejection', function () {
          sendError();
        });
  
        // iframe形式打开页面，则等待父页面给数据，再渲染
        var MM1 = new PopupWindowMessageManagerOrSchema(
          isOpener ? window.opener : window.parent
        );
  
        MM1.on(function (data) {
          if (data.type && data.type === 'change') {
            render(data.value);
            sendError();
          }
  
          if (data.type && data.type === 'cursor') {
            focusComponent(data.value, true);
          }
        });
        MM1.post({
          type: 'preview-loaded',
        });
  
        // 点击组件高亮
        document.querySelector('body').addEventListener('click', function (e) {
          let el = e.target;
          while (el && el.getAttribute && !el.getAttribute('__loc')) {
            el = el.parentNode;
          }
          if (el && el.getAttribute) {
            const __loc = el.getAttribute('__loc');
            if (__loc) {
              MM1.post({
                type: 'preview-click',
                value: __loc,
              });
              focusComponent(__loc);
            }
          }
        });
      }
    }
  );
});

