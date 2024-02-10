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
    const reviewSlider = new Swiper(".js-review-slider", {
        speed: 700,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: 'true',
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><b></b></span>';
            },
        },
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
});

$(() => {
    if ($('.js-range-slider.mdc-slider').parents('html').length > 0) {
        const rangeSlider = new mdc.slider.MDCSlider(document.querySelector('.js-range-slider.mdc-slider'));
        rangeSlider.root.addEventListener('MDCSlider:change', (e) => {
            $('.js-range-input-from').val(e.detail.value);
        });

        $('.js-range-input-from').on('input', function (e) {
            rangeSlider.setValue($(this).val());
        });
    }
})

$(window).on('load', function () {
    function initHeader() {
        if ($(window).width() < 1300) {
            $('.header-nav').appendTo('.header-menu__nav');
            $('.header-messenger__list').appendTo('.header-menu__messengers');
        } else {
            $('.header-nav').appendTo('.header-nav__wrapper');
            $('.header-messenger__list').appendTo('.header-messenger__wrapper');
        }
    }

    function initSelects() {
        if ($(window).width() > 1300) {
            $(".js-select").select2({
                language: 'ru',
                minimumResultsForSearch: -1,
                width: '100%'
            });
            $(".js-select-auto-width").select2({
                language: 'ru',
                minimumResultsForSearch: -1,
                width: 'auto'
            });
            $(".js-select-year").select2({
                language: 'ru',
                minimumResultsForSearch: -1,
                width: '113px'
            });
            $(".js-select-month").select2({
                language: 'ru',
                minimumResultsForSearch: -1,
                width: '143px'
            });
        } else {
            $('js-select').select2('destroy');
            $('js-select-auto-width').select2('destroy');
            $('js-select-year').select2('destroy');
            $('js-select-month').select2('destroy');
        };
    }

    initHeader();
    initSelects();

    var oldWidth = $(window).width();
    $(window).bind('resize', function () {
        var nw = $(window).width();
        if (oldWidth !== nw) {
            initHeader();
            initSelects();
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

        if ($(this).hasClass('active')) {
            $('.js-toggle-dropdown').removeClass('active');
            $('.header-nav__dropdown').hide();
        }
    });

    $('.js-toggle-dropdown').on('click', function () {
        if ($(window).width() < 1300) {
            $(this)
                .toggleClass('active')
                .next('.header-nav__dropdown')
                .slideToggle();
        }
    });
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
    $('.js-toggle-content').on('click', function () {
        $(this)
            .parents('.toggle')
            .toggleClass('active')
            .find('.toggle__content')
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
    $.fn.select2.amd.define('select2/i18n/ru',[],function () {
        // Russian
        return {
            errorLoading: function () {
                return 'Результат не может быть загружен.';
            },
            inputTooLong: function (args) {
                var overChars = args.input.length - args.maximum;
                var message = 'Пожалуйста, удалите ' + overChars + ' символ';
                if (overChars >= 2 && overChars <= 4) {
                    message += 'а';
                } else if (overChars >= 5) {
                    message += 'ов';
                }
                return message;
            },
            inputTooShort: function (args) {
                var remainingChars = args.minimum - args.input.length;

                var message = 'Пожалуйста, введите ' + remainingChars + ' или более символов';

                return message;
            },
            loadingMore: function () {
                return 'Загружаем ещё ресурсы…';
            },
            maximumSelected: function (args) {
                var message = 'Вы можете выбрать ' + args.maximum + ' элемент';

                if (args.maximum  >= 2 && args.maximum <= 4) {
                    message += 'а';
                } else if (args.maximum >= 5) {
                    message += 'ов';
                }

                return message;
            },
            noResults: function () {
                return 'Ничего не найдено';
            },
            searching: function () {
                return 'Поиск…';
            }
        };
    });

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
