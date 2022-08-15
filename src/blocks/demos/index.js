import React from 'react';
import Liam from '@liam-js/liam';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import './index.css';

const urlInstance = new URL(window.location.href);

Liam.config({
  states: {
    'current-category': 'layout',
  },
});
class DemosTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  render() {
    const props = this.props;
    const data = props.data;
    const handleChange = (event, newValue) => {
      this.setState(
        {
          value: newValue,
        },
        function () {
          Liam.set('current-category', data.categories[newValue]);
        }
      );
    };

    return {
      type: Box,
      props: { bgcolor: 'background.paper' },
      children: {
        type: Tabs,
        props: {
          value: this.state.value,
          onChange: handleChange,
          variant: 'scrollable',
          scrollButtons: 'auto',
          'aria-label': '组件分类',
        },
        // { type: Tab, props: { label: 'Item One' } },
        children: data.categories.map(function (item) {
          return { type: Tab, props: { label: item } };
        }),
      },
    };
  }
}

class CopyCodeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyButton: '复制代码',
    };
  }
  render() {
    const self = this;
    const props = this.props;
    return {
      type: CopyToClipboard,
      props: {
        text: props.text,
        onCopy: function () {
          self.setState({
            copyButton: '复制成功',
          });
          // if (window.opener) {
          //   setTimeout(function(){
          //     window.close();
          //   },1e3);
          // } else {
            setTimeout(function () {
              self.setState({
                copyButton: '复制代码',
              });
            }, 2e3);
          // }
        },
      },
      children: [
        {
          type: 'span',
          children: this.state.copyButton,
        },
      ],
    };
  }
}

const LiamJSON = [
  {
    type: 'js',
    props: {
      js: function () {
        const eventId = Liam.on('open-liam-editor', function (text) {
          import('../../js/windowMessageManager').then(function (
            WindowMessageManager
          ) {
            urlInstance.pathname = '/editor';

            const MM2 = new WindowMessageManager.default(urlInstance.toString(), {
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
          });
        });

        return function () {
          Liam.offById(eventId);
        };
      },
    },
  },
  new Promise(function (resolve) {
    import('./data').then(function (data) {
      resolve([
        {
          type: function () {
            return {
              type: Stack,
              props: {
                spacing: 2,
              },
              children: {
                type: Autocomplete,
                props: {
                  id: 'search-input',
                  freeSolo: true,
                  options: data.components.map(function (item) {
                    return item.title;
                  }),
                  renderInput: (params) => {
                    return {
                      type: TextField,
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
            data,
          },
        },

        {
          type: function () {
            const getIframe = function (id, text, time) {
              text = text.replace(/`/g, '\\`').replace(/\${/g, '\\${');
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
                      if (!iframeDocument) {
                        return;
                      }
                      var bodyHeight =
                        iframeDocument.documentElement.offsetHeight;

                      // 弹窗特殊处理
                      if (currentCategory === 'alert') {
                        bodyHeight = Math.max(bodyHeight, 500);
                      }
                      if (bodyHeight !== lastBodyHeight) {
                        iframe.style.height = 'auto';
                        iframe.style.height = Math.max(bodyHeight, 100) + 'px';
                        lastBodyHeight = bodyHeight;
                        count++;
                        if (count < 5) {
                          setTimeout(setHeight, count * 1.5 * 500);
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
              urlInstance.pathname = process.env.PUBLIC_URL+'/static/demos/' + currentCategory + '/' + _ + '.js';
              return fetch( urlInstance.toString() ).then(function (response) {
                return response.text();
                
              }).then(function(text){
                console.log('没拿到内容',text);
                return {
                  type: Card,
                  props: {
                    sx: {
                      minWidth: 275,
                      margin: '10px',
                      boxShadow: 1,
                      overflow: 'visible',
                    },
                    variant: 'outlined',
                  },
                  children: [
                    {
                      type: CardContent,
                      children: [
                        {
                          type: Typography,
                          props: {
                            variant: 'h5',
                          },
                          children: _,
                        },
                        getIframe('j_' + _, text),
                      ],
                    },

                    {
                      type: CardActions,
                      children: [
                        {
                          type: Button,
                          props: { size: 'small' },

                          children: {
                            type: CopyCodeButton,
                            props: {
                              text,
                            },
                          },
                        },
                        {
                          type: Button,
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
              });
            });
          },
          s: 'current-category',
        },
      ]);
    });
  }),
];
export default LiamJSON;
