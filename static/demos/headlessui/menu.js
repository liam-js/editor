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
      }
    },
    {
      type: 'div',
      props: {
        className: 'relative flex flex-col items-center justify-center overflow-hidden  bg-gradient-to-r to-indigo-500 from-purple-500',
        style: {
          height: 378
        }
      },
      children: function () {
        function EditInactiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: {
              type: 'path',
              props: {
                d: 'M4 13V16H7L16 7L13 4L4 13Z',
                fill: '#EDE9FE',
                stroke: '#A78BFA',
                strokeWidth: '2',
              },
            },
          };
        }
    
        function EditActiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: {
              type: 'path',
              props: {
                d: 'M4 13V16H7L16 7L13 4L4 13Z',
                fill: '#8B5CF6',
                stroke: '#C4B5FD',
                strokeWidth: '2',
              },
            },
          };
        }
    
        function DuplicateInactiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'path',
                props: {
                  d: 'M4 4H12V12H4V4Z',
                  fill: '#EDE9FE',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: {
                  d: 'M8 8H16V16H8V8Z',
                  fill: '#EDE9FE',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
            ],
          };
        }
    
        function DuplicateActiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'path',
                props: {
                  d: 'M4 4H12V12H4V4Z',
                  fill: '#8B5CF6',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: {
                  d: 'M8 8H16V16H8V8Z',
                  fill: '#8B5CF6',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
            ],
          };
        }
    
        function ArchiveInactiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'rect',
                props: {
                  x: '5',
                  y: '8',
                  width: '10',
                  height: '8',
                  fill: '#EDE9FE',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
              {
                type: 'rect',
                props: {
                  x: '4',
                  y: '4',
                  width: '12',
                  height: '4',
                  fill: '#EDE9FE',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: { d: 'M8 12H12', stroke: '#A78BFA', strokeWidth: '2' },
              },
            ],
          };
        }
    
        function ArchiveActiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'rect',
                props: {
                  x: '5',
                  y: '8',
                  width: '10',
                  height: '8',
                  fill: '#8B5CF6',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
              {
                type: 'rect',
                props: {
                  x: '4',
                  y: '4',
                  width: '12',
                  height: '4',
                  fill: '#8B5CF6',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: { d: 'M8 12H12', stroke: '#A78BFA', strokeWidth: '2' },
              },
            ],
          };
        }
    
        function MoveInactiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'path',
                props: { d: 'M10 4H16V10', stroke: '#A78BFA', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: { d: 'M16 4L8 12', stroke: '#A78BFA', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: {
                  d: 'M8 6H4V16H14V12',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
            ],
          };
        }
    
        function MoveActiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'path',
                props: { d: 'M10 4H16V10', stroke: '#C4B5FD', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: { d: 'M16 4L8 12', stroke: '#C4B5FD', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: {
                  d: 'M8 6H4V16H14V12',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
            ],
          };
        }
    
        function DeleteInactiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'rect',
                props: {
                  x: '5',
                  y: '6',
                  width: '10',
                  height: '10',
                  fill: '#EDE9FE',
                  stroke: '#A78BFA',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: { d: 'M3 6H17', stroke: '#A78BFA', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: { d: 'M8 6V4H12V6', stroke: '#A78BFA', strokeWidth: '2' },
              },
            ],
          };
        }
    
        function DeleteActiveIcon(props) {
          return {
            type: 'svg',
            props: {
              ...props,
              viewBox: '0 0 20 20',
              fill: 'none',
              xmlns: 'http://www.w3.org/2000/svg',
            },
            children: [
              {
                type: 'rect',
                props: {
                  x: '5',
                  y: '6',
                  width: '10',
                  height: '10',
                  fill: '#8B5CF6',
                  stroke: '#C4B5FD',
                  strokeWidth: '2',
                },
              },
              {
                type: 'path',
                props: { d: 'M3 6H17', stroke: '#C4B5FD', strokeWidth: '2' },
              },
              {
                type: 'path',
                props: { d: 'M8 6V4H12V6', stroke: '#C4B5FD', strokeWidth: '2' },
              },
            ],
          };
        }
    
        return {
          type: 'div',
          props: { className: 'fixed top-16 w-56 text-right' },
          children: {
            type: 'HI#Menu',
            props: { as: 'div', className: 'relative inline-block text-left' },
            children: [
              {
                type: 'div',
                children: {
                  type: 'HI#Menu.Button',
                  props: {
                    className:
                      'inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                  },
                  children: [
                    'Options ',
                    {
                      type: function(){
                        return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                            children: { type: 'path', props: { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" } }
                        }
                      },
                      props: {
                        className:
                          'ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100',
                        'aria-hidden': 'true',
                      },
                    },
                  ],
                },
              },
              {
                type: 'HI#Transition',
                props: {
                  as: React.Fragment,
                  enter: 'transition ease-out duration-100',
                  enterFrom: 'transform opacity-0 scale-95',
                  enterTo: 'transform opacity-100 scale-100',
                  leave: 'transition ease-in duration-75',
                  leaveFrom: 'transform opacity-100 scale-100',
                  leaveTo: 'transform opacity-0 scale-95',
                },
                children: {
                  type: 'HI#Menu.Items',
                  props: {
                    className:
                      'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                  },
                  children: [
                    {
                      type: 'div',
                      props: { className: 'px-1 py-1 ' },
                      children: [
                        {
                          type: 'HI#Menu.Item',
                          children: ({ active }) => ({
                            type: 'button',
                            props: {
                              className: `${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                            },
                            children: [
                              active
                                ? {
                                    type: EditActiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  }
                                : {
                                    type: EditInactiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  },
                              'Edit',
                            ],
                          }),
                          r: 'children'
                        },
                        {
                          type: 'HI#Menu.Item',
                          children: ({ active }) => ({
                            type: 'button',
                            props: {
                              className: `${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                            },
                            children: [
                              active
                                ? {
                                    type: DuplicateActiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  }
                                : {
                                    type: DuplicateInactiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  },
                              'Duplicate',
                            ],
                          }),
                          r: 'children'
                        },
                      ],
                    },
                    {
                      type: 'div',
                      props: { className: 'px-1 py-1' },
                      children: [
                        {
                          type: 'HI#Menu.Item',
                          children: ({ active }) => ({
                            type: 'button',
                            props: {
                              className: `${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                            },
                            children: [
                              active
                                ? {
                                    type: ArchiveActiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  }
                                : {
                                    type: ArchiveInactiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  },
                              'Archive',
                            ],
                          }),
                          r: 'children'
                        },
                        {
                          type: 'HI#Menu.Item',
                          children: ({ active }) => ({
                            type: 'button',
                            props: {
                              className: `${
                                active
                                  ? 'bg-violet-500 text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                            },
                            children: [
                              active
                                ? {
                                    type: MoveActiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  }
                                : {
                                    type: MoveInactiveIcon,
                                    props: {
                                      className: 'mr-2 h-5 w-5',
                                      'aria-hidden': 'true',
                                    },
                                  },
                              'Move',
                            ],
                          }),
                          r: 'children'
                        },
                      ],
                    },
                    {
                      type: 'div',
                      props: { className: 'px-1 py-1' },
                      children: {
                        type: 'HI#Menu.Item',
                        children: ({ active }) => ({
                          type: 'button',
                          props: {
                            className: `${
                              active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
                          },
                          children: [
                            active
                              ? {
                                  type: DeleteActiveIcon,
                                  props: {
                                    className: 'mr-2 h-5 w-5 text-violet-400',
                                    'aria-hidden': 'true',
                                  },
                                }
                              : {
                                  type: DeleteInactiveIcon,
                                  props: {
                                    className: 'mr-2 h-5 w-5 text-violet-400',
                                    'aria-hidden': 'true',
                                  },
                                },
                            'Delete',
                          ],
                        }),
                        r: 'children'
                      },
                    },
                  ],
                },
              },
            ],
          },
        };
      },
    }
    
 
  
]