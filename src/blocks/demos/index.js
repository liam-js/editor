import * as React from 'react';
import Liam from '@liam-js/liam';
import './index.css';

console.log(React,'拿不到');
Liam.config({
  states: {
    'current-category': 'layout',
  },
  componentMap: {
    mui: 'url#https://e.sinaimg.cn/ssfe/unpkg/@mui/material@5.8.3/umd/material-ui.production.min.js',
  },
});
class DemosTab extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0
    }
  }
  render(){
    const props = this.props;
    const data = props.data;
    const handleChange = (event, newValue) => {
      this.setState({
        value: newValue
      },function(){
        Liam.set('current-category', data.categories[newValue]);
      });
      
    };
  
    return {
      type: 'mui#Box',
      props: { bgcolor: 'background.paper' },
      children: {
        type: 'mui#Tabs',
        props: {
          value: this.state.value,
          onChange: handleChange,
          variant: 'scrollable',
          scrollButtons: 'auto',
          'aria-label': '组件分类',
        },
        // { type: 'mui#Tab', props: { label: 'Item One' } },
        children: data.categories.map(function (item) {
          return { type: 'mui#Tab', props: { label: item } };
        }),
      },
    };
  }
}
// const DemosTab =  function (props) {
//   const data = props.data;
//   const [value, setValue] = React.useState(0);

  
// };
class CopyCodeButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      copyButton: '复制代码'
    }
  }
  render(){
    const self = this;
    const props = this.props;
    return {
      type: 'url#https://e.sinaimg.cn/ssfe/unpkg/react-copy-to-clipboard/build/react-copy-to-clipboard.js#CopyToClipboard',
      props: {
        text: props.text,
        onCopy: function () {
          self.setState({
            copyButton: '复制成功'
          });
          if (window.opener) {
            window.close();
          } else {
            setTimeout(function () {
              self.setState({
                copyButton: '复制代码'
              });
            }, 2e3);
          }
        },
      },
      children: [
        {
          type: 'span',
          children:  this.state.copyButton,
        },
      ],
    };
  }
}
// const CopyCodeButton = function (props) {
//   const [copyButton, setCopyButton] =
//     React.useState('复制代码');
 
// };
const liamJson = [

  {
    type: 'js',
    props: {
      js: function () {
        const eventId = Liam.on('open-liam-editor', function (text) {
          Liam.require(
            ['//e.sinaimg.cn/ssfe/liam/js/editor/windowMessageManager.js'],
            function (WindowMessageManager) {
              const MM2 = new WindowMessageManager(
                'https://dc.sina.com.cn/git/liam/sample/editor.html',
                {
                  name: '_blank',
                  newTag: true,
                  widthRatio: 1,
                  heightRatio: 1,
                  crossOriginAlert: false,
                  autoFocus: true,
                }
              );
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
  new Promise(function(resolve){
    import('./data').then(function(data){
      resolve([
        {
          type: function () {
            return {
              type: 'mui#Stack',
              props: {
                spacing: 2,
              },
              children: {
                type: 'mui#Autocomplete',
                props: {
                  id: 'search-input',
                  freeSolo: true,
                  options: data.components.map(function (item) {
                    return item.title;
                  }),
                  renderInput: (params) => {
                    return {
                      type: 'mui#TextField',
                      props: {
                        ...params,
                        label: '搜索组件',
                      },
                    };
                  },
                },
                r: 'renderInput',
              },
            };
          },
        },
        {
          type: DemosTab,
          props: {
            data
          }
        },

        {
          type: function () {
            const getIframe = function (id, text, time) {
              text = text.replace(/`/g, '\\`').replace(/\${/g,'\\${');
              let srcDoc = `
              <div id="root"></div>
              <script src="https://e.sinaimg.cn/ssfe/lima/js/app.js?v=1.0.6"></script>
              <script>
                  liamRequire(['liam'],function(Liam){
                    setTimeout(function(){
                      const text = \`${text}\`;
                      const js = Liam.toJs(text.trim());
                      Liam.render(js, document.querySelector('#root'));
                    }, 0);
                  })
              </script>
              `;
              
              return {
                type: 'iframe',
                props: {
                  id: id,
                  frameBorder: 0,
                  // sandbox: 'allow-same-origin allow-scripts',
                  srcDoc,
                  style: {
                    transition: 'all 0.3s linear',
                    width: '100%',
                    // height: '200px'
                  },
                  __didMount: function () {
                    const currentCategory = Liam.get('current-category');

                    var iframe = document.getElementById(id);
                    var count = 0;
                    var lastBodyHeight = 0;
                    var setHeight = function () {
                      var iframeDocument = iframe.contentDocument;
                      if(!iframeDocument){
                        return;
                      }
                      var bodyHeight =
                        iframeDocument.documentElement.offsetHeight;

                        // 弹窗特殊处理
                      if(currentCategory === 'alert'){
                        bodyHeight = Math.max(bodyHeight, 500);
                      }
                      if (bodyHeight !== lastBodyHeight) {
                        iframe.style.height = 'auto';
                        iframe.style.height = Math.max(bodyHeight, 100) + 'px';
                        lastBodyHeight = bodyHeight;
                        count++;
                        if (count < 5) {
                          setTimeout(setHeight, count*1.5 * 500);
                        }
                      }
                    };
                    setHeight();
                  },
                },
              };
            };
            const currentCategory = Liam.get('current-category');
            

            return data.all[currentCategory].map((_, index) => {

              return {
                type: 'require',
                props: {
                  deps: [
                    'text!demos/' + currentCategory + '/' + _ + '.js',
                  ],
                  key: index,
                },
                children: function (text) {
                  return {
                    type: 'mui#Card',
                    props: {
                      sx: { minWidth: 275, margin: '10px', boxShadow: 1, overflow: 'visible' },
                      variant: 'outlined',
                    },
                    children: [
                      {
                        type: 'mui#CardContent',
                        children: [
                          {
                            type: 'mui#Typography',
                            props: {
                              variant: 'h5',
                            },
                            children: _,
                          },
                          getIframe('j_' + _, text),
                        ],
                      },

                      {
                        type: 'mui#CardActions',
                        children: [
                          {
                            type: 'mui#Button',
                            props: { size: 'small' },

                            children: {
                              type: CopyCodeButton,
                              props: {
                                text
                              }
                            },
                          },
                          {
                            type: 'mui#Button',
                            children: {
                              type: 'span',
                              props: {
                                onClick: function () {
                                  Liam.trigger('open-liam-editor', text);
                                },
                              },
                              children: '编辑代码',
                            },
                          },
                        ],
                      },
                    ],
                  };
                },
                r: 'children',
              };
            });
          },
          s: 'current-category',
        },
      ])
    })
  }),
];
export default liamJson;
