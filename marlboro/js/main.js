function load__resize() {
    var body__h = $(window).height();
    var body__w = $(window).width();



    
    if (body__w > 736) {
        $('.banner1').css({'height': body__h + 'px'});
        $('.banner1').css({'line-height': body__h + 'px'});
    } else if ((body__w > 480) && (body__w < 736)) {
        $('.banner1').css({'height': '700px'});
        $('.banner1').css({'line-height': '0px'});
    } else {
        $('.banner1').css({'height': '350px'});
        $('.banner1').css({'line-height': '0px'});
    }
    
    
    
    if ($(window).width() > 1440) {
        var img_to_replace = jQuery( 'img' ).get();
        var str = "@2x";
        
        for (var i = 0, l = img_to_replace.length; i < l; i++) {
            var src = img_to_replace[i].src;
            
            if((src.indexOf(str)) == '-1') {
                src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
                img_to_replace[i].src = src;
            }
        };
    } else if (($(window).width() < 1440) && ($(window).width() > 736)) {
        var img_to_replace = jQuery( 'img' ).get();
        
        for (var i = 0, l = img_to_replace.length; i < l; i++) {
            var src = img_to_replace[i].src;
            src = src.replace(new RegExp("@2x",'g'),'');
            img_to_replace[i].src = src;
        }
    }
}


$(document).ready(function () {
    var isInitialized = false,
        popupOpen = false,
        currentPage = 1;

    function paginationInit (perPage, startPage){
        $("div.holder").jPages({
            containerID  : "itemContainer",
            perPage      : perPage,
            startPage    : startPage,
            startRange   : 1,
            // midRange     : 5,
            // endRange     : 1,
            callback    : function( pages, items ){
                currentPage = pages.current;
                $("#legend1").html("Page " + pages.current + " of " + pages.count);
                $("#legend2").html(items.range.start + " - " + items.range.end + " / " + items.count + " фотографий");
                isInitialized = true;
            }
        }).addClass('pagination-initialized');
    }

    $("body").queryLoader2({
        percentage: true,
        barHeight: 1,
        deepSearch: true,
        onProgress: function(percentage, imagesLoaded, totalImages){

        },
        onComplete: function(){
            $("#preloader").hide();
        }
    });


    function videoStop(video, playBtn) {
        video.parent().removeClass('open');
        video.removeClass('open');
        playBtn.show();
    }

    $('.play').on('click', function(e) {
        e.preventDefault();
        var video = $(this).next(),
            $this = $(this);
        video.parent('video').addClass('open');
        video.addClass('open');
        $this.hide();
        video.get(0).play();
        if ($(window).width() > 1024) {
            video.get(0).onended = function() {
                videoStop(video, $this);
            };
        }
        if ($.isFunction(video.get(0).webkitEnterFullscreen) && $(window).width() < 1024) {
            video.get(0).webkitRequestFullScreen();
        }
    });




        $('video').bind('webkitfullscreenchange', function(e) {

            var state = document.webkitIsFullScreen;
            var event = state ? 'FullscreenOn' : 'FullscreenOff';

            if (event == 'FullscreenOn') {
                $('.js-footer').hide();
                $('.main-menu_btn').hide();
                $('.vertical__text').hide();
            }
            else {
                if ($(window).width() > 1024) {
                    $('.js-footer').show();
                    $('.main-menu_btn').show();
                }
            }
        });





    $(window).on('mousewheel', function(){
        $.each($('#video2, #video4, #video6'), function(index, element){
            var $element = $(element);
            if($element.length) $element.get(0).pause();
        });
    });


    load__resize();


    // $(window).load(function () {
    //     var pgwBrowser = $.pgwBrowser();
    //     $('html').addClass(pgwBrowser.browser.name + ' ' + pgwBrowser.os.name);

    //     if (($('html').hasClass('Windows')) && (pgwBrowser.browser.name == 'Internet Explorer')) {
    //         var vers = pgwBrowser.os.name;
    //         vers = vers.replace(/Windows /g, '');
    //         vers = vers[0];
    //         if (vers == 8) {
    //             $('.banner1, .banner2, .banner3, .banner4, .banner5, .banner6, .banner7, .banner8, .banner9, .banner10').addClass('no__fixed');
    //         }
    //         $(window).scroll(function(){
    //             if ($(window).scrollTop() > 0) {
    //                 $('.js-footer').css('background', '#fff !important');
    //             }
    //             else {
    //                 $('.js-footer').css('background', 'none !important');
    //             }
    //         })

    //     }
    // });

    $(window).resize(function () {
        load__resize();
    });
    $('.like').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            var video_id = $(this).data('video-id');
            $(this).find('.img12').hide();
            $(this).find('.img12-hover').removeClass('img12-hover').addClass('img12').show();
            $(this).removeClass('like').unbind();
            $.post(Routing.generate('marlboro_web_mainpage_ajax_set_video_like', {'videoId': video_id }))
                .done(function (res) {

                });
        }
    });

    $('.subscribe').click(function(){
        $.post(Routing.generate('marlboro_web_mainpage_ajax_subscribe'))
            .done(function (res) {

            });
        $(this).html('СПАСИБО').addClass('active');

        setTimeout(function(){
            $('.subscribe').fadeOut(500);
        }, 2000)
    });

    var $sliderWrapper = $('.photo_list_wrap');
    var $listCounter = $sliderWrapper.find('.photo_list-counter');
    var $slider = $sliderWrapper.find('.photo_list');
    var slickSettings = {
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1,
        speed:100,
        variableWidth: true
    };

    $('.photo_list-nav').on('click', '[data-slide]', function(event) {
        var $this = $(event.currentTarget);
        var dir = $this.data('slide');
        $slider.slick(dir);
    });

    function updateCounter(event, slick) {
        if(popupOpen){
            $listCounter.text(slick.currentSlide + 1 + ' из ' + slick.slideCount);
        } else {
            $listCounter.text(slick.currentSlide + 1 + '/' + slick.slideCount);
        }
    }

    function checkSlider(windowWidth) {

        if (windowWidth < 768) {

            if ($("div.holder").hasClass('pagination-initialized')) {
                $("div.holder").jPages("destroy").removeClass('pagination-initialized');
            }

            if(popupOpen){
                var currentSlide = $slider.slick('slickCurrentSlide');

                closeBigSlick();

                if(!$slider.hasClass('slick-initialized')) {
                    $slider.slick(slickSettings);
                    $slider.slick('slickGoTo', currentSlide );
                }
                $slider.find('li').attr('style', '');
                popupOpen = false;
                return;
            }

            if(!$slider.hasClass('slick-initialized')) {
                $slider.slick(slickSettings);
            }

            setTimeout(function() {
                $slider.find('li').attr('style', '');
            }, 500);
        } else {

            if(popupOpen){
                return;
            }

            if($slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }

            if( isInitialized ){
              $("div.holder").jPages("destroy").removeClass('pagination-initialized');
            }

            updatePagination();
        }

    }

    function updatePagination() {
        var windowWidth = $(window).get(0).innerWidth;

        if( $("div.holder").length ) {
            if (windowWidth > 768 && windowWidth < 992) {
                paginationInit(12, currentPage);
            } else {
                paginationInit(18, currentPage);
            }
        }
    }



    $('.photo_list a').on('click', function(e){
        e.preventDefault();
        var windowWidth = $(window).get(0).innerWidth,
            index = $(this).closest('li').index();
        
        if(!popupOpen && windowWidth > 768){
            changeImgUrl(true);
        }
        if (windowWidth > 768) { 
            if( isInitialized ){
              $("div.holder").jPages("destroy").removeClass('pagination-initialized').closest('.container').addClass('popup_block');
            }

            if(!$slider.hasClass('slick-initialized')) {
                $('.photo_list-close-btn').show();

                $slider.slick({
                    arrows: true,
                    slidesToShow: 1,
                    speed: 0,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Назад</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Вперед</button>',
                });
                $slider.slick('slickGoTo', index);
                popupOpen = true;
            }
        }
    });

    $('.photo_list-close-btn').on('click', function(){
        closeBigSlick();
        updatePagination();
    });

    function closeBigSlick() {
        if($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
            $('.photo_list-close-btn').hide();
            $("div.holder").closest('.container').removeClass('popup_block');
            changeImgUrl(false);
            popupOpen = false;
        }     
    }

    function changeImgUrl(desktop) {

        if(desktop){
            $slider.find('img').each(function(){
                var url = $(this).attr('src');
                    postFix = '-big',
                    position = url.lastIndexOf('.');

                $(this).attr('src', [url.slice(0, position), postFix, url.slice(position)].join('') );
            });          
        } else {
            $slider.find('img').each(function(){
                var url = $(this).attr('src');
                $(this).attr('src', url.replace('-big',''));
            });        
        }
    }

    $slider
        .on('init', updateCounter)
        .on('afterChange', updateCounter);

    var resizeTimer;
    $(window).on('resize', function(e) {
        var $this = $(this);
        var windowWidth = $this[0].innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            checkSlider(windowWidth);       
        }, 250);
    });

    checkSlider($(window).get(0).innerWidth);
});