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
            .swiper-a {
                width: 100%;
                height: 100%;
                color: #fff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            }
            .swiper-a .parallax-bg{
                position: absolute;
                left: 0;
                top: 0;
                width: 130%;
                height: 100%;
                background-size: cover;
            }
            .swiper-a .swiper-slide {
                padding: 50px;
                box-sizing: border-box;
                
            }
            .swiper-a .swiper-slide .title {
                font-size: 41px;
                font-weight: 300;
            }

            .swiper-a .swiper-slide .subtitle {
                font-size: 21px;
            }

            .swiper-a .swiper-slide .text {
                font-size: 14px;
                max-width: 400px;
                line-height: 1.3;
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
                loop: true,
                style: {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }, speed: 600, parallax: true, pagination: {
                    clickable: true,
                }, navigation: true, className: "swiper-a"
            },
            children: [{
                type: 'div', props: {
                    slot: "container-start", className: "parallax-bg", style: {
                        "background-image":
                            "url(https://auto4.sinaimg.cn/autoimg/car/78/12/131771278_950.jpg)",
                    }, 'data-swiper-parallax': "-23%"
                }
            },
            {
                type: 'swiper#SwiperSlide',
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "???????????? 1" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "????????????????????????" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" }
                }]
            },
            {
                type: 'swiper#SwiperSlide',
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "???????????? 2" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "????????????????????????" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" }
                }]
            },
            {
                type: 'swiper#SwiperSlide',
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "???????????? 3" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "????????????????????????" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" }
                }]
            }]
        }
    },

]