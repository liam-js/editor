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
        Liam.trigger('alert', function (sawl) {
          swal('Good job!', 'You clicked the button!', 'success');
        });
      },
    },
    h: '预览',
  },
];
