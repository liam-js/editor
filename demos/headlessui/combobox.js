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
      const people = [
        { id: 1, name: 'Wade Cooper' },
        { id: 2, name: 'Arlene Mccoy' },
        { id: 3, name: 'Devon Webb' },
        { id: 4, name: 'Tom Cook' },
        { id: 5, name: 'Tanya Fox' },
        { id: 6, name: 'Hellen Schmidt' },
      ];

      return function() {
        const [selected, setSelected] = React.useState(people[0]);
        const [query, setQuery] = React.useState('');

        const filteredPeople =
          query === ''
            ? people
            : people.filter((person) =>
                person.name
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .includes(query.toLowerCase().replace(/\s+/g, ''))
              );

        return {
          type: 'div',
          props: { className: 'fixed top-16 w-72' },
          children: {
            type: 'HI#Combobox',
            props: { value: selected, onChange: setSelected },
            children: {
              type: 'div',
              props: { className: 'relative mt-1' },
              children: [
                {
                  type: 'div',
                  props: {
                    className:
                      'relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm',
                  },
                  children: [
                    {
                      type: 'HI#Combobox.Input',
                      props: {
                        className:
                          'w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0',
                        displayValue: (person) => person.name,
                        onChange: (event) => setQuery(event.target.value),
                      },
                    },
                    {
                      type: 'HI#Combobox.Button',
                      props: {
                        className:
                          'absolute inset-y-0 right-0 flex items-center pr-2',
                      },
                      children: {
                        type: function(){
                            return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                            children: { type: 'path', props: { fillRule: "evenodd", d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" } }
                          };
                        },
                        props: {
                          className: 'h-5 w-5 text-gray-400',
                          'aria-hidden': 'true',
                        },
                      },
                    },
                  ],
                },
                {
                  type: 'HI#Transition',
                  props: {
                    as: React.Fragment,
                    leave: 'transition ease-in duration-100',
                    leaveFrom: 'opacity-100',
                    leaveTo: 'opacity-0',
                    afterLeave: () => setQuery(''),
                  },
                  children: {
                    type: 'HI#Combobox.Options',
                    props: {
                      className:
                        'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                    },
                    children:
                      filteredPeople.length === 0 && query !== ''
                        ? {
                            type: 'div',
                            props: {
                              className:
                                'relative cursor-default select-none py-2 px-4 text-gray-700',
                            },
                            children: 'Nothing found.',
                          }
                        : filteredPeople.map((person) => ({
                            type: 'HI#Combobox.Option',
                            props: {
                              key: person.id,
                              className: ({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-teal-600 text-white'
                                    : 'text-gray-900'
                                }`,
                              value: person,
                            },
                            children: ({ selected, active }) => ({
                              type: React.Fragment,
                              children: [
                                {
                                  type: 'span',
                                  props: {
                                    className: `block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`,
                                  },
                                  children: person.name,
                                },
                                selected
                                  ? {
                                      type: 'span',
                                      props: {
                                        className: `absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? 'text-white'
                                            : 'text-teal-600'
                                        }`,
                                      },
                                      children: {
                                        type: function(){
                                            return { type: 'svg', props: { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
                                                children: { type: 'path', props: { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" } }
                                            }
                                        },
                                        props: {
                                          className: 'h-5 w-5',
                                          'aria-hidden': 'true',
                                        },
                                      },
                                    }
                                  : null,
                              ],
                            }),
                            r: 'children'
                          })),
                  },
                },
              ],
            },
          },
        };
      }
    },
  },
];
