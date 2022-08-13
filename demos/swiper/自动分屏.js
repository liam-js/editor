[
    (function () {
        Liam.config({
            componentMap: {
                swiper: 'url#https://n.sinaimg.cn/default/7919a7ba/20220618/swiper.production.min.js'
            }
        });
    })(),
    {
        type: 'css',
        props: {
            css: `
            .swiper-b {
                width: 100%;
                height: 100%;
            }

            .swiper-b .swiper-slide {
                width: auto;
                align-items: center;
            }

             .swiper-b .swiper-slide img {
                height: 100%;
                object-fit: cover;
            }
            `
        }
    },
    {
        type: 'div',
        props: {
            style: {
                width: '500px',
                height: '300px'
            }
        },
        children: {
            type: 'swiper#Swiper', props: {
                // 左右导航箭头
                navigation: true,
                // 到尽头是否循环
                loop: true,
                slidesPerView: "auto", spaceBetween: 1, pagination: {
                    clickable: true,
                }, className: "swiper-b"
            },
            children: [{ type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/511/w1080h1031/20220703/72a0-27e0a412a2dd9b20b9fcaee4963b1e63.jpg'
                }
            } },
            { type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/299/w1619h1080/20220703/3b66-0d4b99fbd6f2d8b3d88e387fcc4b66c0.jpg'
                }
            } },
            { type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/59/w1022h637/20220703/97ee-95253d84e0673d2b4690b7cce68ea9de.jpg'
                }
            }  },
            { type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/30/w1080h1350/20220703/8aab-282b7d229d3b60d19e8be30bc18ae74a.jpg'
                }
            }  },
            { type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/571/w1891h1080/20220703/c835-341c8e05b59fec0e41bd8a24ad81a171.jpg'
                }
            }  },
            { type: 'swiper#SwiperSlide', children: {
                type: 'img',
                props: {
                    src: 'https://n.sinaimg.cn/sports/2_img/upload/130c9a33/299/w1619h1080/20220703/3b66-0d4b99fbd6f2d8b3d88e387fcc4b66c0.jpg'
                }
            }  }
            ]
        }
    },

]