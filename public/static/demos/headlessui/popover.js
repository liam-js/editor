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
    children: function () {
      const solutions = [
        {
          name: 'Insights',
          description: 'Measure actions your users take',
          href: '##',
          icon: IconOne,
        },
        {
          name: 'Automations',
          description: 'Create your own targeted content',
          href: '##',
          icon: IconTwo,
        },
        {
          name: 'Reports',
          description: 'Keep track of your growth',
          href: '##',
          icon: IconThree,
        },
      ];
      function IconOne() {
        return {
          type: 'svg',
          props: {
            width: '48',
            height: '48',
            viewBox: '0 0 48 48',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          children: [
            {
              type: 'rect',
              props: { width: '48', height: '48', rx: '8', fill: '#FFEDD5' },
            },
            {
              type: 'path',
              props: {
                d: 'M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z',
                stroke: '#FB923C',
                strokeWidth: '2',
              },
            },
            {
              type: 'path',
              props: {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z',
                stroke: '#FDBA74',
                strokeWidth: '2',
              },
            },
            {
              type: 'path',
              props: {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z',
                stroke: '#FDBA74',
                strokeWidth: '2',
              },
            },
          ],
        };
      }

      function IconTwo() {
        return {
          type: 'svg',
          props: {
            width: '48',
            height: '48',
            viewBox: '0 0 48 48',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          children: [
            {
              type: 'rect',
              props: { width: '48', height: '48', rx: '8', fill: '#FFEDD5' },
            },
            {
              type: 'path',
              props: {
                d: 'M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27',
                stroke: '#FB923C',
                strokeWidth: '2',
              },
            },
            {
              type: 'path',
              props: {
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                d: 'M18.804 30H29.1963L24.0001 21L18.804 30Z',
                stroke: '#FDBA74',
                strokeWidth: '2',
              },
            },
          ],
        };
      }

      function IconThree() {
        return {
          type: 'svg',
          props: {
            width: '48',
            height: '48',
            viewBox: '0 0 48 48',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          children: [
            {
              type: 'rect',
              props: { width: '48', height: '48', rx: '8', fill: '#FFEDD5' },
            },
            {
              type: 'rect',
              props: {
                x: '13',
                y: '32',
                width: '2',
                height: '4',
                fill: '#FDBA74',
              },
            },
            {
              type: 'rect',
              props: {
                x: '17',
                y: '28',
                width: '2',
                height: '8',
                fill: '#FDBA74',
              },
            },
            {
              type: 'rect',
              props: {
                x: '21',
                y: '24',
                width: '2',
                height: '12',
                fill: '#FDBA74',
              },
            },
            {
              type: 'rect',
              props: {
                x: '25',
                y: '20',
                width: '2',
                height: '16',
                fill: '#FDBA74',
              },
            },
            {
              type: 'rect',
              props: {
                x: '29',
                y: '16',
                width: '2',
                height: '20',
                fill: '#FB923C',
              },
            },
            {
              type: 'rect',
              props: {
                x: '33',
                y: '12',
                width: '2',
                height: '24',
                fill: '#FB923C',
              },
            },
          ],
        };
      }

      return function () {
        return {
          type: 'div',
          props: { className: 'fixed top-16 w-full max-w-sm px-4' },
          children: {
            type: 'HI#Popover',
            props: { className: 'relative' },
            children: ({ open }) => ({
              type: React.Fragment,
              children: [
                {
                  type: 'HI#Popover.Button',
                  props: {
                    className: `
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`,
                  },
                  children: [
                    { type: 'span', children: 'Solutions' },
                    {
                      type: function(){
                        return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                        children: { type: 'path', props: { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" } }
                      }
                      },
                      props: {
                        className: `${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`,
                        'aria-hidden': 'true',
                      },
                    },
                  ],
                },
                {
                  type: 'HI#Transition',
                  props: {
                    as: React.Fragment,
                    enter: 'transition ease-out duration-200',
                    enterFrom: 'opacity-0 translate-y-1',
                    enterTo: 'opacity-100 translate-y-0',
                    leave: 'transition ease-in duration-150',
                    leaveFrom: 'opacity-100 translate-y-0',
                    leaveTo: 'opacity-0 translate-y-1',
                  },
                  children: {
                    type: 'HI#Popover.Panel',
                    props: {
                      className:
                        'absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl',
                    },
                    children: {
                      type: 'div',
                      props: {
                        className:
                          'overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            className:
                              'relative grid gap-8 bg-white p-7 lg:grid-cols-2',
                          },
                          children: solutions.map((item) => ({
                            type: 'a',
                            props: {
                              key: item.name,
                              href: item.href,
                              className:
                                '-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50',
                            },
                            children: [
                              {
                                type: 'div',
                                props: {
                                  className:
                                    'flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12',
                                },
                                children: {
                                  type: item.icon,
                                  props: { 'aria-hidden': 'true' },
                                },
                              },
                              {
                                type: 'div',
                                props: { className: 'ml-4' },
                                children: [
                                  {
                                    type: 'p',
                                    props: {
                                      className:
                                        'text-sm font-medium text-gray-900',
                                    },
                                    children: item.name,
                                  },
                                  {
                                    type: 'p',
                                    props: {
                                      className: 'text-sm text-gray-500',
                                    },
                                    children: item.description,
                                  },
                                ],
                              },
                            ],
                          })),
                        },
                        {
                          type: 'div',
                          props: { className: 'bg-gray-50 p-4' },
                          children: {
                            type: 'a',
                            props: {
                              href: '##',
                              className:
                                'flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50',
                            },
                            children: [
                              {
                                type: 'span',
                                props: { className: 'flex items-center' },
                                children: {
                                  type: 'span',
                                  props: {
                                    className:
                                      'text-sm font-medium text-gray-900',
                                  },
                                  children: 'Documentation',
                                },
                              },
                              {
                                type: 'span',
                                props: {
                                  className: 'block text-sm text-gray-500',
                                },
                                children:
                                  'Start integrating products and tools',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            }),
            r: 'children'
          },
        };
      };
    },
  },
];
