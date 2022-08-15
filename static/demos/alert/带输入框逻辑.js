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
          swal({
            text: 'Search for a movie. e.g. "La La Land".',
            content: 'input',
            button: {
              text: 'Search!',
              closeModal: false,
            },
          })
            .then((name) => {
              if (!name) throw null;

              return fetch(
                `https://itunes.apple.com/search?term=${name}&entity=movie`
              );
            })
            .then((results) => {
              return results.json();
            })
            .then((json) => {
              const movie = json.results[0];

              if (!movie) {
                return swal('No movie was found!');
              }

              const name = movie.trackName;
              const imageURL = movie.artworkUrl100;

              swal({
                title: 'Top result:',
                text: name,
                icon: imageURL,
              });
            })
            .catch((err) => {
              if (err) {
                swal('Oh noes!', 'The AJAX request failed!', 'error');
              } else {
                swal.stopLoading();
                swal.close();
              }
            });
        });
      },
    },
    h: '预览',
  },
];
