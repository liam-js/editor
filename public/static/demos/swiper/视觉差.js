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
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "手嗣幕人 1" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "忧挟王非几姑锐轻" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "手嗣幕人，了心要则的见老的居忧挟王非几姑锐轻，千慨子知落在书竟县秦作程尤的给韩的相，骨不瞠内前助范你，有变才嗣太一韩为气派名才畴弄见兮学燕玉，陀斯陈同于帝尽沾，杨要只仆他自惜啦，锐厅罪从什也上尹希举郭略人兴一骂台，介死恼使谷生商里朗修俭得承又，人日奔，胜。" }
                }]
            },
            {
                type: 'swiper#SwiperSlide',
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "手嗣幕人 2" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "忧挟王非几姑锐轻" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "手嗣幕人，了心要则的见老的居忧挟王非几姑锐轻，千慨子知落在书竟县秦作程尤的给韩的相，骨不瞠内前助范你，有变才嗣太一韩为气派名才畴弄见兮学燕玉，陀斯陈同于帝尽沾，杨要只仆他自惜啦，锐厅罪从什也上尹希举郭略人兴一骂台，介死恼使谷生商里朗修俭得承又，人日奔，胜。" }
                }]
            },
            {
                type: 'swiper#SwiperSlide',
                children: [{ type: 'div', props: { className: "title", 'data-swiper-parallax': "-300" }, children: "手嗣幕人 3" },
                { type: 'div', props: { className: "subtitle", 'data-swiper-parallax': "-200" }, children: "忧挟王非几姑锐轻" },
                {
                    type: 'div', props: { className: "text", 'data-swiper-parallax': "-100" },
                    children: { type: 'p', children: "手嗣幕人，了心要则的见老的居忧挟王非几姑锐轻，千慨子知落在书竟县秦作程尤的给韩的相，骨不瞠内前助范你，有变才嗣太一韩为气派名才畴弄见兮学燕玉，陀斯陈同于帝尽沾，杨要只仆他自惜啦，锐厅罪从什也上尹希举郭略人兴一骂台，介死恼使谷生商里朗修俭得承又，人日奔，胜。" }
                }]
            }]
        }
    },

]