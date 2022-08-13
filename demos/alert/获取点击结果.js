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
                swal("Click on either the button or outside the modal.")
                    .then((value) => {
                        swal('alert', `The returned value is: `+value)
                    });
            });

        }
    },
    h: '预览',
  },
];
