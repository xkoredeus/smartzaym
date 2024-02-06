$(window).on('load', function () {
    $('.preloader__wrapper').fadeOut();
    $('body').removeClass('is-loading');
});

$(() => {
    const sampleSlider = new Swiper(".js-sample-slider", {
        speed: 700,
        initialSlide: 1,
        navigation: {
            nextEl: ".js-sample-slider-next",
            prevEl: ".js-sample-slider-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 8,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            976: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1300: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
    });
});

$(() => {
    const rangeSlider = new mdc.slider.MDCSlider(document.querySelector('.js-range-slider.mdc-slider'));
    rangeSlider.root.addEventListener('MDCSlider:change', (e) => {
        $('.js-range-input-from').val(e.detail.value);
    });

    $('.js-range-input-from').on('input', function (e) {
        rangeSlider.setValue($(this).val());
    })
})

$(window).on('load', function () {
    function initHeader() {
        if ($(window).width() + 15 < 1300) {
            $('.header-nav').appendTo('.header-menu__nav');
            $('.header-messenger__list').appendTo('.header-menu__messengers');
        } else {
            $('.header-nav').appendTo('.header-nav__wrapper');
            $('.header-messenger__list').appendTo('.header-messenger__wrapper');
        }
    }

    initHeader();

    var oldWidth = $(window).width();
    $(window).bind('resize', function () {
        var nw = $(window).width();
        if (oldWidth !== nw) {
            initHeader();
        }
        oldWidth = nw;
    });

});


$(() => {
    $('.js-menu-toggle').on('click', function () {
        $(this)
            .toggleClass('active')
            .parents('body')
            .toggleClass('is-loading')
            .find('.header-menu')
            .toggleClass('active');
    });

    $('.js-toggle-dropdown').on('click', function () {
        if ($(window).width() + 15 < 1300) {
            $(this)
                .toggleClass('active')
                .next('.header-nav__dropdown')
                .slideToggle();
        }
    })
})

$(() => {
    $('.js-toggle-question').on('click', function () {
        $(this)
            .parents('.question')
            .toggleClass('active')
            .find('.question-content')
            .slideToggle();
    });
});

$(() => {
    $(".js-button-anchor").click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("data-to");
        $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
    });
});

$(() => {
    $('.js-location-input').on('input', function (e) {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value.length) {
            $(this).parent('.form-field--search').addClass('form-field--search--with-value');
        } else {
            $(this).parent('.form-field--search').removeClass('form-field--search--with-value')
        };
    });

    $('.js-clear-location-input').on('click', function () {
        $('.js-location-input').val('');
        $('.form-field--search').removeClass('form-field--search--with-value');
    })
});

$(() => {
    $('.js-tel').mask("+7 (999) 999-99-99");
});

$(() => {
    $('[data-fancybox]').fancybox({
        animationDuration: 600,
        animationEffect: 'slide-in-in',
        touch: false,
        scrolling: true,
    });

    $('.js-close-fancybox').on('click', function () {
        $.fancybox.close();
    });
});

$(() => {
    $(".js-set-cookies").on('click', function() {
        localStorage.setItem('ZaymCookies', true);
        $('.cookies').hide();
    });
});

$(() => {
    setTimeout(() => {
        if (!localStorage.getItem('ZaymCookies')) {
            $('.cookies').show();
        }
    }, 3000)

});
