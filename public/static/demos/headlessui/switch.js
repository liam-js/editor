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
      const [enabled, setEnabled] = React.useState(false);

      return {
        type: 'div',
        props: { className: 'py-16' },
        children: {
          type: 'HI#Switch',
          props: {
            checked: enabled,
            onChange: setEnabled,
            className: `${enabled ? 'bg-teal-900' : 'bg-teal-700'}
              relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`,
          },
          children: [
            {
              type: 'span',
              props: { className: 'sr-only' },
              children: 'Use setting',
            },
            {
              type: 'span',
              props: {
                'aria-hidden': 'true',
                className: `${enabled ? 'translate-x-9' : 'translate-x-0'}
                pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
              },
            },
          ],
        },
      };
    },
  },
];
