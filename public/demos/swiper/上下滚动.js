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
            .swiper {
                width: 100%;
                height: 100%;
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
            type: 'swiper#Swiper',
            props: {
                direction: 'vertical',
                // 左右导航箭头
                navigation: true,
                // 到尽头是否循环
                loop: true,
                // 自动播放
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                // 分页
                pagination: {
                    // 可点击
                    clickable: true,
                }
            },
            children: [
                {
                    type: 'swiper#SwiperSlide',
                    children: {
                        type: 'img',
                        props: {
                            style: {
                                width: '100%'
                            },
                            src: 'http://auto4.sinaimg.cn/autoimg/car/78/12/131771278_950.jpg'
                        }
                    },

                },
                {
                    type: 'swiper#SwiperSlide',
                    children: {
                        type: 'img',
                        props: {
                            style: {
                                width: '100%'
                            },
                            src: 'http://auto2.sinaimg.cn/autoimg/car/76/12/131771276_950.jpg'
                        }
                    },

                },

                {
                    type: 'swiper#SwiperSlide',
                    children: {
                        type: 'img',
                        props: {
                            style: {
                                width: '100%'
                            },
                            src: 'http://auto.sinaimg.cn/autoimg/car/80/12/131771280_950.jpg'
                        }
                    },

                },
                {
                    type: 'swiper#SwiperSlide',
                    children: {
                        type: 'img',
                        props: {
                            style: {
                                width: '100%'
                            },
                            src: 'http://auto5.sinaimg.cn/autoimg/car/79/12/131771279_950.jpg'
                        }
                    },

                },
            ]
        }
    },

]