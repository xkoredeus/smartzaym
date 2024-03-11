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
            // $('.header-messenger__list').appendTo('.header-menu__messengers');

            $('.profile-header__tel').appendTo('.profile-header__menu-in');
        } else {
            $('.header-nav').appendTo('.header-nav__wrapper');
            // $('.header-messenger__list').appendTo('.header-messenger__wrapper');

            $('.profile-header__tel').appendTo('.profile-header__tel-wrapper');
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

        var $selects = $('.js-common-select');

        $selects.each(function(i,el){
            $(el).select2({
                language: 'ru',
                placeholder: function(){
                    $(this).data('placeholder');
                },
                minimumResultsForSearch: -1,
                width: '100%',
                dropdownParent: $(el).parents('.select__wrapper--common'),
            }).on('select2:select', function () {
                $(this)
                    .next('.select2').addClass('select2-filled')
                    .parents('.select__wrapper--common')
                    .find('.select__wrapper--common__label')
                    .addClass('active');
            });

            if ($(el).val()) {
                $(el)
                    .next('.select2').addClass('select2-filled')
                    .parents('.select__wrapper--common')
                    .find('.select__wrapper--common__label')
                    .addClass('active');
            };

        })
    }

    function initHeaderSticky() {
        if ($(this).scrollTop() > 5){
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    }


    //sticky header
    $(window).scroll(function() {
        initHeaderSticky();
    });

    initHeader();
    initSelects();
    initHeaderSticky();

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
            .parents('header')
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

    $('.js-profile-menu-toggle').on('click', function () {
        $(this)
            .toggleClass('active')
            .parents('.profile-header')
            .toggleClass('active')
            .parents('body')
            .toggleClass('is-loading')
    });

    $('.js-toggle-dropdown').on('click', function () {
        if ($(window).width() < 1300) {
            $(this)
                .toggleClass('active')
                .next('.header-nav__dropdown')
                .slideToggle();
        }
    });

    $('.is-loading').on('click', '.profile-layout__in', function (){
        if ($('.profile-header').hasClass('active')) {
            $('.is-loading')
                .removeClass('is-loading')
                .find('.profile-header')
                .removeClass('active')
                .find('.js-profile-menu-toggle')
                .removeClass('active')

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


    $('.js-toggle-checkbox-group').on('click', function (e) {
        e.preventDefault();
        $(this)
            .toggleClass('active')
            .parents('.checkbox-group')
            .find('.checkbox-group__content')
            .slideToggle();
    });

    $('.js-set-checked-checkbox-group').on('change', function (e) {
        if (e.currentTarget.checked) {
            const checkboxes = $(this)
                .parents('.checkbox-group')
                .find('.js-checkbox-group-list').children();

            checkboxes.each(function(i,el){
                $(el).find('input').attr('checked', true);
            });
        }
    });

    $('.js-checkbox-group-list').on('change', 'input', function (e) {
        if (!e.currentTarget.checked) {
            const checkboxParent = $(this).parents('.checkbox-group').find('.checkbox-group__top').find('input')[0];
            console.log(checkboxParent, checkboxParent.checked);
            if (checkboxParent.checked) {
                checkboxParent.checked = false;
            }
        }
    })
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
    $('.js-tel').mask("+7 999 999-99-99");
    $('.js-mask-code').mask("9999");
    $('.js-mask-card').mask("9999 9999 9999 9999");
    $('.js-mask-year').mask("99 / 99");
    $('.js-mask-cvv').mask("999");
});

$(() => {
    $('.js-validate-card').on('click', function () {
        $(this)
            .attr('disabled', true)
            .parents('.popup-call__in')
            .find('.popup-card__spinner-wrapper')
            .addClass('active');

        setTimeout(() => {
            $(this)
                .attr('disabled', false)
                .parents('.popup-call__in')
                .find('.popup-card__spinner-wrapper')
                .removeClass('active');
            $.fancybox.close();


            setTimeout(() => {
                $('.snack').addClass('active');

                setTimeout(() => {
                    $('.snack').removeClass('active');
                }, [3000])
            }, [1000])
        }, 1500)
    });
});

var fancyOpts = {
    animationDuration: 600,
    // animationEffect: 'slide-in-in',
    touch: false,
    scrolling: true,
    clickOutside: false,
    helpers : {
        overlay : {closeClick: false}
    },
}

$(() => {
    $('.js-toggle-popover').on('click', function () {
        $('.popup-photo__popover').toggleClass('active');
    });
    $('.js-close-popover').on('click', function () {
        $('.popup-photo__popover').removeClass('active');
    });

    $('.js-close-photo-modal').on('click', function () {
        $.fancybox.close();
        $('.popup-photo__popover').removeClass('active');
    });



    const options = {
        ...fancyOpts,
        clickSlide: false,
        clickOutside: false,
    }

    $('.js-toggle-popup-photo').on('click', function () {
        var src;

        if ($(window).width() < 1300) {
            src = '#popup-mobile-photo-2'
        } else {
            src = '#popup-photo-1'
        }

        $.fancybox.open({
            src: src,
            type: 'inline',
            opts: options,
        });
    });

    $('.js-toggle-instruction').on('click', function () {
        $.fancybox.open({
            src: '#popup-mobile-photo-info',
            type: 'inline',
            opts: {
                animationDuration: 600,
                // animationEffect: 'slide-in-in',
                touch: false,
                scrolling: true,
                baseClass: "popup__wrapper--info-container",
            },
        });
    })


    /// steps
    $('.js-photo-step-2').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-2',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });
    $('.js-photo-step-3').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-3',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });
    $('.js-photo-step-4').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-4',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });
    $('.js-photo-step-5').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-5',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });
    $('.js-photo-step-6').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-6',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });
    $('.js-photo-step-7').on('click', function (){
        $.fancybox.close();
        setTimeout(() => {
            $.fancybox.open({
                src: '#popup-photo-7',
                type: 'inline',
                opts: options,
            });
        }, [900])
    });

});

$(() => {
    $('.popup__wrapper-prevent-close').on('click', '.fancybox-close-small', function (e){
        e.stopPropagation();

        $.fancybox.open({
            src: '#popup-mobile-photo-cancel',
            type: 'inline',
            opts: fancyOpts,
        });
    });

    $('.js-close-photo-cancel').on('click', function (){
        $.fancybox.close(true);
    });
})

$(() => {

    function countdown( elementName, minutes, seconds )
    {
        var element, endTime, hours, mins, msLeft, time;

        function twoDigits( n )
        {
            return (n <= 9 ? "0" + n : n);
        }

        function updateTimer()
        {
            msLeft = endTime - (+new Date);
            if ( msLeft < 1000 ) {
                element.innerHTML = "Время вышло!";
            } else {
                time = new Date( msLeft );
                hours = time.getUTCHours();
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }

        element = document.getElementById( elementName );
        endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
        updateTimer();
    }

    if ($('#js-count').parents('html').length > 0) {
        countdown( "js-count", 10, 0 );
    }

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
    $('[data-fancybox]').fancybox(fancyOpts);

    $('.js-close-fancybox').on('click', function () {
        $.fancybox.close();
    });
});

$(() => {
    if ($('.mdc-tooltip-1').parents('html').length > 0) {
        const tooltip1 = new mdc.tooltip.MDCTooltip(document.querySelector('.mdc-tooltip-1'));
    }
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


$(() => {
    $.fn.textWidth = function(text, font) {

        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);

        $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));

        return $.fn.textWidth.fakeEl.width();
    };

    const inputs = $('.width-dynamic');

    inputs.each(function(i,el){
        $(el).on('input', function() {
            $(this).val(function(index, value){
                return value
                    .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, " ");
            });

            var inputWidth = $(this).textWidth();
            $(this).css({
                width: inputWidth
            })
        }).trigger('input');

        $(el).on('keypress', function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        });

        $(el).css({
            width: $(el).textWidth()
        })
    });
});