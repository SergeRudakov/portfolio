$(document).ready(function () {
    var $self = $(this),
        $badgeClose = $('.badge .js-close'),
        $playVideo = $('.js-play_video', $self),
        $imgInp = $('.imgInp', $self),
        $formSubmit = $('.form_submit', $self),
        $stepNext = $('.js-step-next', $self),
        $stepPrev = $('.js-step-prev', $self),
        $counterOptions = $('.js-counter-options', $self),
        $questionItem = $('.question__item', $self),
        $testStart = $('.test__start', $self),
        $testSteps = $('.test__step'),
        $testWrap = $('.test_wrap'),
        $footer = $('.js-footer'),
        $bgImg = $testWrap.find('.js-bg_img'),
        $bgImgBot = $testWrap.find('.test__intermediate-wrap'),
        $videoTag = $('.js-video'),
        speed = 400,
        video = document.getElementById("quiz_video"),
        timeLineArr = [1.5, 2, 2.5, 4, 6, 7, 8, 8.5, 10.5, 12.5, 13.5, 14.5, 15, 16.5, 18.5, 20.5, 21, 21.5, 23, 25, 25.5],
        videoSpeedInterval = 0.5,
        videoTime = 0,
        testStepPos = 0,
        countRed = 0,
        countWhite = 0,
        imageCheck = false;

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (event) {
                $('.badge__img').css({
                    'background': 'url(' + event.target.result + ')  no-repeat 0px 0px',
                    'background-size': 'contain'
                });
            };

            reader.readAsDataURL(input.files[0]);
            imageCheck = true;
        }
    }

    function playVideo() {
        video.play();
        timeLineVideo();
    }

    function pauseVideo() {
        video.pause();
    }

    function pickTheTeam(check) {
        var className = (check) ? '.test__done__red' : '.test__done__white';
        $testWrap.find(className).addClass('video_pause').siblings().removeClass('video_pause');
    }

    function timeLineVideo() {

        var timer = setInterval(function () {
            videoTime += videoSpeedInterval;

            for (var i = 0; i < timeLineArr.length; i++) {
                if (timeLineArr[i] == videoTime) {
                    testStepPos++;
                    var $nextStep = $testSteps.eq(testStepPos);
                    $nextStep.addClass('video_pause').siblings().removeClass('video_pause video_animate');

                    if ($nextStep.hasClass('test_video_fade')) {
                        setTimeout(function () {
                            $bgImg.addClass('bg-show');
                            $bgImgBot.removeClass('bg-show');
                            $testSteps.eq(testStepPos).addClass('video_fade');
                        }, 30);
                    } else if ($nextStep.hasClass('test__selection')) {
                        $bgImg.removeClass('bg-show');
                        $bgImgBot.removeClass('bg-show');
                        setTimeout(function () {
                            $testSteps.eq(testStepPos).addClass('video_animate');
                        }, 30);

                    }

                    if ($nextStep.hasClass('js-text-bottom')) {
                        $nextStep.find('.test__intermediate-text').addClass('test__intermediate-animate');
                        $bgImgBot.addClass('bg-show');
                        changeTopPos();
                    }

                    pauseVideo();
                    clearInterval(timer);
                }
            }

            if ($testSteps.eq(testStepPos).hasClass('test__step__last')) {
                pauseVideo();
                clearInterval(timer);

                pickTheTeam(countRed >= countWhite);
            }

            if ($testSteps.eq(testStepPos).data('pausetime')) {
                setTimeout(function () {
                    playVideo();
                    clearInterval(timer);
                }, $testSteps.eq(testStepPos).data('pausetime'))
            }

            if ($testSteps.eq(testStepPos).hasClass('js-test_intermediate')) {
                playVideo();
                clearInterval(timer);
            }

        }, 1000);


    }


    $imgInp.on('change', function () {
        var $this = $(this),
            $imgWrap = $this.closest('.badge__img-wrap');

        readURL(this);
        $imgWrap.addClass('js-valid');
        $this.siblings('img').fadeIn(speed);
        $formSubmit.find('button[type="submit"]').prop('disabled', false);
        $badgeClose.css('opacity', 1);
    });

    $formSubmit.on('submit', function (event) {
        var $this = $(this),
            $imgWrap = $this.find('.badge__img-wrap');

        if (!$imgWrap.hasClass('js-valid')) event.preventDefault();
    });

    $playVideo.on('click', function (event) {
        event.preventDefault();
        var $this = $(this);

        playVideo();

        if (!$this.closest('.test__step').hasClass('video_animate')) {
            $this.closest('.test__step').addClass('step__hide');
        }

        $this.closest('.test__step').removeClass('video_animate video_fade');
        $bgImg.removeClass('bg-show');

    });

    $badgeClose.on('click', function () {
        var $imgWrap = $('.badge__img-wrap');

        if ($imgWrap.find('img').length) {
            $badgeClose.css('opacity', 0);
            $imgWrap.removeClass('js-valid').find('.badge__img').css('background', '');
            $formSubmit.find('button[type="submit"]').prop('disabled', true);
        }
    });

    $testWrap
        .on('click', '[data-counter]', function () {
            var $this = $(this);

            ($this.data('counter') == 'red') ? countRed++ : countWhite++;
        }).on('click', '[data-pickteam]', function () {
            var $this = $(this);

            pickTheTeam($this.data('pickteam') == 'red');
        });

    if ($(window).width() < 762) {

        $stepNext.on('click', function () {
            var $this = $(this),
                $testStep = $this.closest('.quiz_mobile__item');

            $testStep.next().addClass('active').siblings().removeClass('active');
        });

        $stepPrev.on('click', function () {
            var $this = $(this),
                $testStep = $this.closest('.quiz_mobile__item'),
                $radio_counters = $testStep.prev().find('.radio_counter');

            $testStep.prev().addClass('active').siblings().removeClass('active');

            $radio_counters.each(function () {
                $(this).removeAttr('checked');
            });

            $questionItem.removeClass('check');
            countRed = 0;

        });

        $questionItem.on('click', function () {
            var $this = $(this),
                $wrapQuiestion = $this.closest('.quiestion__list'),
                $radioCounter = $wrapQuiestion.find('.radio_counter');

            $this.toggleClass('check');

            if ($this.hasClass('color-red')) {
                $radioCounter.click().change();
            } else {
                $radioCounter.removeAttr('checked', false);
            }

        });

        $counterOptions.on('click', function () {
            var $this = $(this),
                $testStep = $this.closest('.quiz_mobile__item'),
                $radio_counters = $testStep.find('.radio_counter');

            $radio_counters.each(function () {
                if ($(this).is(':checked')) {
                    countRed++;
                }
            });

            pickTheTeam(countRed >= $radio_counters.length / 2);
        });
    }

    $testStart.on('click', function () {
        $(this).addClass('step__hide');
    });

    function changeTopPos() {
        var height = $footer.height();

        $('.test__step__last').css('padding-bottom', height + 'px');
    }

    $(window).resize(changeTopPos);

    function toggleControls(video) {
      if (video.hasAttribute("controls")) {
         video.removeAttribute("controls")   
      } else {
         video.setAttribute("controls", "controls")
      }
    }

    $videoTag.each(function () {
        $(this).bind("ended", function () {
            $(this).closest('.video').find('.play').show();
        });
    });

    $videoTag.on('play', function () {
        $(this).closest('.video')
                        .find('video').addClass('active')
                        .end()
                        .find('.play').hide();

        toggleControls(this);
    });

    $videoTag.on('pause', function () {
        $(this).closest('.video').find('.play').show();
        toggleControls(this);
    });

    $videoTag.on('ended', function () {
        $(this).closest('.video').find('video').removeClass('active');
    });

});