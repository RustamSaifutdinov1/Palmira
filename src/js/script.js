$(document).ready(function () {
    /*
        Баннер на главной странице
     */
    if (window.innerWidth > 768) {
        SwiperMainPage = new Swiper(".main-page-banner", {
            effect: "fade",
            crossFade: "true",
            autoplay: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: "true",
            },
        });
    }
    $(window).on("resize", function (event) {
        if (window.innerWidth > 768) {
            SwiperMainPage = new Swiper(".main-page-banner", {
                effect: "fade",
                crossFade: "true",
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: "true",
                },
            });
        }else{
            SwiperMainPage.destroy()
        }
    })
});