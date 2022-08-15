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
      const plans = [
        {
          name: 'Startup',
          ram: '12GB',
          cpus: '6 CPUs',
          disk: '160 GB SSD disk',
        },
        {
          name: 'Business',
          ram: '16GB',
          cpus: '8 CPUs',
          disk: '512 GB SSD disk',
        },
        {
          name: 'Enterprise',
          ram: '32GB',
          cpus: '12 CPUs',
          disk: '1024 GB SSD disk',
        },
      ];

      return function () {
        function CheckIcon(props) {
          return {
            type: 'svg',
            props: { ...props, viewBox: '0 0 24 24', fill: 'none' },
            children: [
              {
                type: 'circle',
                props: { cx: 12, cy: 12, r: 12, fill: '#fff', opacity: '0.2' },
              },
              {
                type: 'path',
                props: {
                  d: 'M7 13l3 3 7-7',
                  stroke: '#fff',
                  strokeWidth: 1.5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                },
              },
            ],
          };
        }
        const [selected, setSelected] = React.useState(plans[0]);

        return {
          type: 'div',
          props: { className: 'w-full px-4 py-16' },
          children: {
            type: 'div',
            props: { className: 'mx-auto w-full max-w-md' },
            children: {
              type: 'HI#RadioGroup',
              props: { value: selected, onChange: setSelected },
              children: [
                {
                  type: 'HI#RadioGroup.Label',
                  props: { className: 'sr-only' },
                  children: 'Server size',
                },
                {
                  type: 'div',
                  props: { className: 'space-y-2' },
                  children: plans.map((plan) => ({
                    type: 'HI#RadioGroup.Option',
                    props: {
                      key: plan.name,
                      value: plan,
                      className: ({ active, checked }) =>
                        `${
                          active
                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : ''
                        }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`,
                    },
                    children: ({ active, checked }) => ({
                      type: React.Fragment,
                      children: {
                        type: 'div',
                        props: {
                          className: 'flex w-full items-center justify-between',
                        },
                        children: [
                          {
                            type: 'div',
                            props: { className: 'flex items-center' },
                            children: {
                              type: 'div',
                              props: { className: 'text-sm' },
                              children: [
                                {
                                  type: 'HI#RadioGroup.Label',
                                  props: {
                                    as: 'p',
                                    className: `font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`,
                                  },
                                  children: plan.name,
                                },
                                {
                                  type: 'HI#RadioGroup.Description',
                                  props: {
                                    as: 'span',
                                    className: `inline ${
                                      checked ? 'text-sky-100' : 'text-gray-500'
                                    }`,
                                  },
                                  children: [
                                    {
                                      type: 'span',
                                      children: [plan.ram, '/', plan.cpus],
                                    },
                                    ' ',
                                    {
                                      type: 'span',
                                      props: { 'aria-hidden': 'true' },
                                      children: '·',
                                    },
                                    ' ',
                                    { type: 'span', children: plan.disk },
                                  ],
                                },
                              ],
                            },
                          },
                          checked && {
                            type: 'div',
                            props: { className: 'shrink-0 text-white' },
                            children: {
                              type: CheckIcon,
                              props: { className: 'h-6 w-6' },
                            },
                          },
                        ],
                      },
                    }),
                    r: 'children'
                  })),
                },
              ],
            },
          },
        };
      };
    },
  },
];
