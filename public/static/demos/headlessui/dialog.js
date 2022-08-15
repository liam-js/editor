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
      let [isOpen, setIsOpen] = React.useState(true);

      function closeModal() {
        setIsOpen(false);
      }

      function openModal() {
        setIsOpen(true);
      }

      return {
        type: React.Fragment,
        children: [
          {
            type: 'div',
            props: {
              className: 'fixed inset-0 flex items-center justify-center',
            },
            children: {
              type: 'button',
              props: {
                type: 'button',
                onClick: openModal,
                className:
                  'rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
              },
              children: 'Open dialog',
            },
          },

          {
            type: 'HI#Transition',
            props: { appear: true, show: isOpen, as: React.Fragment },
            children: {
              type: 'HI#Dialog',
              props: {
                as: 'div',
                className: 'relative z-10',
                onClose: closeModal,
              },
              children: [
                {
                  type: 'HI#Transition.Child',
                  props: {
                    as: React.Fragment,
                    enter: 'ease-out duration-300',
                    enterFrom: 'opacity-0',
                    enterTo: 'opacity-100',
                    leave: 'ease-in duration-200',
                    leaveFrom: 'opacity-100',
                    leaveTo: 'opacity-0',
                  },
                  children: {
                    type: 'div',
                    props: {
                      className: 'fixed inset-0 bg-black bg-opacity-25',
                    },
                  },
                },

                {
                  type: 'div',
                  props: { className: 'fixed inset-0 overflow-y-auto' },
                  children: {
                    type: 'div',
                    props: {
                      className:
                        'flex min-h-full items-center justify-center p-4 text-center',
                    },
                    children: {
                      type: 'HI#Transition.Child',
                      props: {
                        as: React.Fragment,
                        enter: 'ease-out duration-300',
                        enterFrom: 'opacity-0 scale-95',
                        enterTo: 'opacity-100 scale-100',
                        leave: 'ease-in duration-200',
                        leaveFrom: 'opacity-100 scale-100',
                        leaveTo: 'opacity-0 scale-95',
                      },
                      children: {
                        type: 'HI#Dialog.Panel',
                        props: {
                          className:
                            'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                        },
                        children: [
                          {
                            type: 'HI#Dialog.Title',
                            props: {
                              as: 'h3',
                              className:
                                'text-lg font-medium leading-6 text-gray-900',
                            },
                            children: 'Payment successful',
                          },
                          {
                            type: 'div',
                            props: { className: 'mt-2' },
                            children: {
                              type: 'p',
                              props: { className: 'text-sm text-gray-500' },
                              children:
                                'Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.',
                            },
                          },

                          {
                            type: 'div',
                            props: { className: 'mt-4' },
                            children: {
                              type: 'button',
                              props: {
                                type: 'button',
                                className:
                                  'inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                                onClick: closeModal,
                              },
                              children: 'Got it, thanks!',
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      };
    },
  },
];
