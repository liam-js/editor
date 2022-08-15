[
  (function () {
    Liam.on('alert', function (data) {
      // 在有弹出请求时，再加载资源
      liamRequire(
        ['//e.sinaimg.cn/ssfe/unpkg/sweetalert/dist/sweetalert.min.js'],
        function (swal) {
          if (typeof data == 'function') {
            data(swal);
          }
        }
      );
    });
  })(),
  {
    type: 'button',
    props: {
      onClick: function () {
        Liam.trigger('alert', function (swal) {
          swal('A wild Pikachu appeared! What do you want to do?', {
            buttons: {
              cancel: 'Run away!',
              catch: {
                text: 'Throw Pokéball!',
                value: 'catch',
              },
              defeat: true,
            },
          }).then((value) => {
            switch (value) {
              case 'defeat':
                swal('Pikachu fainted! You gained 500 XP!');
                break;

              case 'catch':
                swal('Gotcha!', 'Pikachu was caught!', 'success');
                break;

              default:
                swal('Got away safely!');
            }
          });
        });
      },
    },
    h: '预览',
  },
];
