[
  {
    type: 'css',
    props: {
      css: `
        .float-action-button{
          position: fixed;
          right: 10px;
          bottom: 10px;
          opacity: .5;
          padding: 10px;
          border:1px solid #ddd;
          border-radius: 5px;
          background: #eee;
          z-index: 9999
        }
        .float-action-button:hover{
          opacity: 1;
        }
        .float-action-button button{
          border-radius: none;
          border-width: 1px solid #ddd;
          margin: 5px;
          cursor: pointer;
        }
      `,
    },
  },
  {
    type: 'div',
    props: {
      className: 'float-action-button',
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      },
    },
    children: [
      {
        type: 'url#https://e.sinaimg.cn/ssfe/unpkg/react-copy-to-clipboard/build/react-copy-to-clipboard.js#CopyToClipboard',
        props: {
          text: text,
          onCopy: function () {
            Liam.set('copyButton', '已复制');
            setTimeout(function () {
              Liam.set('copyButton', '复制');
            }, 2e3);
          },
        },
        children: {
          type: 'button',
          children: {
            type: function () {
              return Liam.get('copyButton') || '复制';
            },
            s: ['copyButton'],
          },
        },
      },
      {
        type: 'js',
        props: {
          js: function () {
            const eventId = Liam.on('open-liam-editor', function () {
              requirejs.config({
                context: 'liam',
              })(
                ['//e.sinaimg.cn/ssfe/liam/js/editor/windowMessageManager.js'],
                function (WindowMessageManager) {
                  const MM2 = new WindowMessageManager('https://dc.sina.com.cn/git/liam/sample/editor.html', {
                    name: '_blank',
                    newTag: true,
                    widthRatio: 1,
                    heightRatio: 1,
                    crossOriginAlert: false,
                    autoFocus: true,
                  });
                  MM2.post({
                    type: 'edit',
                    data: text,
                  });
                }
              );
            });

            return function () {
              Liam.offById(eventId);
            };
          },
        },
      },
      {
        type: 'button',
        props: {
          onClick: function () {
            Liam.trigger('open-liam-editor', text);
          },
        },
        children: '在 Liam 编辑器中打开',
      },
    ],
  },
];
