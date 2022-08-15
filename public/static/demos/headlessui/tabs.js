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
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
      }

      let [categories] = React.useState({
        Recent: [
          {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
          },
        ],
        Popular: [
          {
            id: 1,
            title: 'Is tech making coffee better or worse?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
          },
        ],
        Trending: [
          {
            id: 1,
            title: 'Ask Me Anything: 10 answers to your questions about coffee',
            date: '2d ago',
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
        ],
      });

      return {
        type: 'div',
        props: { className: 'w-full max-w-md px-2 py-16 sm:px-0' },
        children: {
          type: 'HI#Tab.Group',
          props: {
            as: 'div'
          },
          children: [
            {
              type: 'HI#Tab.List',
              props: {
                className: 'flex space-x-1 rounded-xl bg-blue-900/20 p-1',
              },
              children: Object.keys(categories).map((category) => ({
                type: 'HI#Tab',
                props: {
                  key: category,
                  className: ({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    ),
                },
                children: category,
              })),
            },
            {
              type: 'HI#Tab.Panels',
              props: { className: 'mt-2' },
              children: Object.values(categories).map((posts, idx) => ({
                type: 'HI#Tab.Panel',
                props: {
                  key: idx,
                  className: classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  ),
                },
                children: {
                  type: 'ul',
                  children: posts.map((post) => ({
                    type: 'li',
                    props: {
                      key: post.id,
                      className: 'relative rounded-md p-3 hover:bg-gray-100',
                    },
                    children: [
                      {
                        type: 'h3',
                        props: { className: 'text-sm font-medium leading-5' },
                        children: post.title,
                      },

                      {
                        type: 'ul',
                        props: {
                          className:
                            'mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500',
                        },
                        children: [
                          { type: 'li', children: post.date },
                          { type: 'li', children: '·' },
                          {
                            type: 'li',
                            children: [post.commentCount, ' comments'],
                          },
                          { type: 'li', children: '·' },
                          {
                            type: 'li',
                            children: [post.shareCount, ' shares'],
                          },
                        ],
                      },

                      {
                        type: 'a',
                        props: {
                          href: '#',
                          className: classNames(
                            'absolute inset-0 rounded-md',
                            'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                          ),
                        },
                      },
                    ],
                  })),
                },
              })),
            },
          ],
        },
      };
    },
  },
];
