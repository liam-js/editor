[
  (function () {
    Liam.config({
      componentMap: {
        HI: 'url#https://e.sinaimg.cn/u/8/48/503/6947228195741/headlessui.production.min.js',
      },
    });
  })(),
  {
    type: 'require',
    props: {
      deps: [
        'css!https://e.sinaimg.cn/u/8/44/280/6957924819090/1ce3abb3fa088e2e5722.css',
      ],
    },
  },
  {
    type: 'div',
    props: {
      className:
        'relative flex flex-col items-center justify-center overflow-hidden  bg-gradient-to-r to-indigo-500 from-purple-500',
      style: {
        height: 378,
      },
    },
    children: function() {
      return {
        type: 'div',
        props: { className: 'w-full px-4 pt-16' },
        children: {
          type: 'div',
          props: {
            className: 'mx-auto w-full max-w-md rounded-2xl bg-white p-2',
          },
          children: [
            {
              type: 'HI#Disclosure',
              children: ({ open }) => ({
                type: React.Fragment,
                children: [
                  {
                    type: 'HI#Disclosure.Button',
                    props: {
                      className:
                        'flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                    },
                    children: [
                      { type: 'span', children: 'What is your refund policy?' },
                      {
                        type: function(){
                          return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                          children: { type: 'path', props: { fillRule: "evenodd", d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z", clipRule: "evenodd" } }
                        }
                        },
                        props: {
                          className: `${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500`,
                        },
                      },
                    ],
                  },
                  {
                    type: 'HI#Disclosure.Panel',
                    props: {
                      className: 'px-4 pt-4 pb-2 text-sm text-gray-500',
                    },
                    children:
                      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
                  },
                ],
              }),
              r: 'children'
            },
            {
              type: 'HI#Disclosure',
              props: { as: 'div', className: 'mt-2' },
              children: ({ open }) => ({
                type: React.Fragment,
                children: [
                  {
                    type: 'HI#Disclosure.Button',
                    props: {
                      className:
                        'flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                    },
                    children: [
                      {
                        type: 'span',
                        children: 'Do you offer technical support?',
                      },
                      {
                        type: function(){
                          return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                          children: { type: 'path', props: { fillRule: "evenodd", d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z", clipRule: "evenodd" } }
                        }
                        },
                        props: {
                          className: `${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500`,
                        },
                      },
                    ],
                  },
                  {
                    type: 'HI#Disclosure.Panel',
                    props: {
                      className: 'px-4 pt-4 pb-2 text-sm text-gray-500',
                    },
                    children: 'No.',
                  },
                ],
              }),
              r: 'children'
            },
          ],
        },
      };
    },
  },
];
