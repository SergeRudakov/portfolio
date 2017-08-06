function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {

    //Subscribe button animations
    var animationTimeoutId;
    var isToggleSubscribeHovered = false;
    var interval = 5000;
    var $toggleSubscribe = $('#subscribe');

    $toggleSubscribe.addClass('c-anim-ripple-s');

    $toggleSubscribe.hover(function () {
        $toggleSubscribe
                .addClass('hvr-shadow-radial')
                .removeClass('c-anim-ripple-s');
        isToggleSubscribeHovered = true;
    }, function () {
        $toggleSubscribe
                .removeClass('hvr-shadow-radial')
                .addClass('c-anim-ripple-s');
        isToggleSubscribeHovered = false;
    });

    function toggleSubscribeClass() {
        if (isToggleSubscribeHovered) {
            return;
        }

        $toggleSubscribe.addClass('c-anim-ripple')
        animationTimeoutId = setTimeout(function () {
            $toggleSubscribe.removeClass('c-anim-ripple');
            interval = randomIntFromInterval(5000, 12000);
            setTimeout(toggleSubscribeClass, interval);
        }, 500);
    }

    animationTimeoutId = setTimeout(toggleSubscribeClass, interval);

    // Slide infographic
    var $toggleInfographic = $('#toggle-infographic-button');
    var $firstSlide = $('.layout__step--list li').first();
    var height = $firstSlide.outerHeight();

    var $toggleInfographicTop = $('#toggle-infographic-top');
    var decorHeight = $('.decor-top-main').height();
    var headerHeight = $('header').height();
    var stepSecondPosTop = Math.round($firstSlide.next().offset().top);

    $toggleInfographic.on('click', function (event) {
        event.preventDefault();

        // if (!$toggleInfographic.hasClass('up')) {
        //     $firstSlide.animate({
        //         'margin-top': -height + 50 // magic numbers yay!
        //     }, 800, 'easeOutQuart', function () {
        //         $toggleInfographic.removeClass('c-anim-hang-s c-anim-hang');
        //         $toggleInfographic.addClass('up');
        //     });
        // } else {
        //     $firstSlide.animate({
        //         'margin-top': 0 // magic numbers yay!
        //     }, 800, 'easeOutQuart', function () {
        //         $toggleInfographic.addClass('c-anim-hang-s c-anim-hang');
        //         $toggleInfographic.removeClass('up');
        //     });
        // }

        changePosition(-1);
    });

    $toggleInfographicTop.on('click', function (event) {
        event.preventDefault();

        changePosition(1);
    });

    function checkScrollPositionTop() {
        if ($(window).scrollTop() == 0) {
            $toggleInfographicTop.addClass('hide');
        } else {
            $toggleInfographicTop.removeClass('hide');
        }
    }
    ;

    checkScrollPositionTop();

    $(window).scroll(function () {
        checkScrollPositionTop();

        if ($(this).scrollTop() + $(window).height() == $(document).height()) {
            $toggleInfographic.addClass('hide');
            $('.arrow_wrap').addClass('arrow_wrap--bottom');
        } else {
            $toggleInfographic.removeClass('hide');
            $('.arrow_wrap').removeClass('arrow_wrap--bottom');
        }

        if ($(this).scrollTop() > stepSecondPosTop - headerHeight - decorHeight) {
            $toggleInfographic.addClass('down-page');
        } else {
            $toggleInfographic.removeClass('down-page');
        }

        if ($(this).scrollTop() == 0) {
            $('.arrow_wrap').addClass('arrow_wrap--top');
        } else {
            $('.arrow_wrap').removeClass('arrow_wrap--top');
        }
    });

    var offset = [];
    var position = 0;
    var lastAnimation = 0;
    var quietPeriod = 500;

    $('.scrolling').each(function (index, element) {
        offset.push($(element).offset().top - $('header').height())
    });

    $(window).on('resize', function(){
        changeOffset();
    });

    function changeOffset(offset) {
        var offset = [];

        $('.scrolling').each(function (index, element) {
            offset.push($(element).offset().top - $('header').height())
        });

        return offset;
    }

    function changePosition(delta) {
        var offset = changeOffset();
        if (delta < 0 && position !== 3) {
            position += 1;
        }
        if (delta >= 0 && position !== 0){
            position -= 1;
        }
        $('html, body').stop(true, false).animate({
            scrollTop: offset[position]
        }, 1000);
    }

    window.init_scroll = function (event, delta) {
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if (timeNow - lastAnimation < quietPeriod + 500) {
            event.preventDefault();
            return;
        }

        changePosition(delta);

        lastAnimation = timeNow;
    };

    $(document).each(function () {
        var $this = $(this);

        $this.on('mousewheel DOMMouseScroll', function () {
            $(document).bind('mousewheel DOMMouseScroll', function (event) {
                event.preventDefault();
                var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                init_scroll(event, delta);
            });
            return false;
        });
    });

    // $(document).bind('mousewheel DOMMouseScroll', function(e){
    //     if(e.originalEvent.wheelDelta /120 > 0) {
    //         console.log('scrolling up !');
    //         changePosition(1);
    //     }
    //     else{
    //         console.log('scrolling down !');
    //         changePosition(-1);
    //     }
    // });

    //Sticky header enabling
    $('.header').headtacular({scrollPoint: 5});

    //start mail validation
    var $mailField = $('.js-mail');

    function validationMail($field) {

        if (!(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test($field.val()))) {
            // alert("Ошибка в E-mail!");
            $field.focus();
            $field.addClass('error_validation').removeClass('complete');
            // $field.closest('form').find('.js-btn-sub').attr('disabled', true);
            return false;
        } else {
            $field.removeClass('error_validation').addClass('complete');
            // $field.closest('form').find('.js-btn-sub').prop("disabled", false);
        }
    };

    $mailField.on('change', function () {
        var $this = $(this);

        validationMail($this);

        if ($this.val() == '') {
            $this.removeClass('error_validation');
        }
    });

    $mailField.on('keyup', function () {
        var $this = $(this);

        $this.removeClass('error_validation');
    });

    var $formSubscribe = $('#form-subscribe');
    var $subscribeText = $('#subscribe span');
    var initialMailField = {
        'width': $mailField.css('width'),
        'padding-left': $mailField.css('padding-left'),
        'padding-right': $mailField.css('padding-right'),
        'border-left-width': $mailField.css('border-left-width'),
        'border-right-width': $mailField.css('border-right-width')
    }

    function formAnimationSuccess () {
        $formSubscribe.addClass('email-send');
        $mailField.animate({
            'width': 0,
            'padding-left': 0,
            'padding-right': 0,
            'border-left-width': 0,
            'border-right-width': 0
        }, 500, 'easeOutQuart', function () {
            $(this)
                .css('display', 'none')
                .val('');
        });
        $subscribeText.fadeOut(250, function () {
            $subscribeText.html('Subscribe more');
            $subscribeText.fadeIn(250);
        });
    }

    function formAnimationMore () {
        $formSubscribe.removeClass('email-send');

        $mailField.css('display', 'inline-block').animate({
            'width': initialMailField['width'],
            'padding-left': initialMailField['padding-left'],
            'padding-right': initialMailField['padding-right'],
            'border-left-width': initialMailField['border-left-width'],
            'border-right-width': initialMailField['border-right-width']
        }, 500, 'easeOutQuart');
        $subscribeText.fadeOut(250, function () {
            $subscribeText.html('Subscribe');
            $subscribeText.fadeIn(250);
        });
    }

    $formSubscribe.on('submit', function (event) {
        event.preventDefault();

        var $self = $(this),
                btnSubscribe = $self.find('.js-btn-sub'),
                btnSubWrap = $self.find('.btn-subscribe-wrap'),
                subText = btnSubscribe.data('more'),
                inputValue = $self.find('.js-mail').val(),
                speed = 800;

        // btnSubscribe.find('span').text(subText).addClass('animated flipInY');

        // $.ajax({
        //     url: '',
        //     type: 'POST',
        //     data: inputValue,
        //     success: function(data){
        //         $self.find('.js-mail').val('');
        //         setTimeout(function () {
        //             btnSubscribe.find('span').text(subText).removeClass('animated flipInY');
        //         }, speed);
        //         $mailField.closest('form').find('.js-btn-sub').attr('disabled', true);
        //     }
        // });

        if ($mailField.val() != '') {
            validationMail($mailField);
        }

        if(!$formSubscribe.hasClass('email-send')) {
            if ($mailField.hasClass('complete')) {
                $.ajax({
                    url: 'subscribe.php',
                    type: 'POST',
                    data: 'email=' + inputValue,
                    success: formAnimationSuccess
                    // success: function (data) {
                        // $mailField.closest('form').animate({
                        //     'opacity': 0
                        // }, speed, function () {
                        //     $self.find('.js-mail').val('');
                        //     btnSubscribe.find('span').text(subText);
                        //     $mailField.closest('form').animate({
                        //         'opacity': 1
                        //     }, speed);
                        // });
                    // }
                });

                // $mailField.closest('form').animate({
                //     'opacity': 0
                // }, speed, function(){
                //     $self.find('.js-mail').val('');
                //     btnSubscribe.find('span').text(subText);
                //     $mailField.closest('form').animate({
                //         'opacity': 1
                //     }, speed);
                // });
            }
        } else {
            formAnimationMore();
        }

        // setTimeout(function () {
        //     $self.find('.js-mail').val('');
        //     btnSubscribe.find('span').text(subText).removeClass('animated flipInY');
        //     $mailField.closest('form').find('.js-btn-sub').prop("disabled", false);
        // }, speed);
    });
    //end mail validation
});