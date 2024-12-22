$(document).ready(function () {
    /*
        Баннер на главной странице
     */
    var SwiperMainPage = new Swiper(".main-page-banner", {
        effect: "fade",
        crossFade: "true",
        pagination: {
            el: ".swiper-pagination",
            clickable: "true",
        },
    });
});