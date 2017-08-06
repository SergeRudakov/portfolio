$( document ).ready(function() {
    var $dropdownWrap = $(".bio-dropdown"),
    	$dropdownCurrent = $dropdownWrap.find(".bio-dropdown--curent"),
    	$backgroundOvarlay = $(".background-overlay"),
		$galarySlider = $(".galary-slider"),
		$galarySliderLeft = $(".galary-slider.left"),
		$galarySliderRight = $(".galary-slider.right"),
		$closeSlider = $backgroundOvarlay.find(".close"),
        $bioItems = $('.bio-dropdown--list li');

	$dropdownCurrent.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		$(this).closest($dropdownWrap).toggleClass('active');
	});

    $('html').click(function (event) {
        if ($(event.target).closest('.bio-dropdown').length === 0) {
            $dropdownWrap.removeClass('active');
        }
    });

    $bioItems.on('click', function(event){
        event.preventDefault();

        var $this = $(this),
            value = $this.find('.bio-dropdown--item-text').html();


        if(value != $dropdownCurrent.find('a').text() ){
            $this.addClass('active').siblings().removeClass('active');
            $dropdownCurrent.find('a').text(value);
            $dropdownWrap.removeClass('active');
        }
    });



	var Slider = function(options) {
	    var settings = $.extend(true, {}, options);
	    var self = this;

        var wrapper = $(settings.wrapper),
            next = wrapper.find(".js-next"),
            prev = wrapper.find(".js-prev"),
            list = wrapper.find(".js-slides"),
            images = list.find('img'),
            currentImage = wrapper.find(".js-image-container img"),
            currentDesc = wrapper.find(".small-galary--desc"),
            slideCount = list.find("li").length,
            slideWidth = list.find("li").width(),
            slideHeight = list.find("li").height(),
            sliderUlWidth = slideCount * slideWidth,
            curSlide = settings.startIndex;

        if (slideCount > 1) {
            prev.show();
            next.show();
        }

        if (!slideCount)
            return;

        prev.on('click', function(e) {
            e.preventDefault();
            self.movePrev();
        });

        next.on('click', function(e) {
            e.preventDefault();
            self.moveNext();
        });

        $( window ).resize(function() {
            self.checkImg();
        });

        this.init =  function() {
        	self.selectSlide(curSlide);
        }

        this.selectSlide = function(index) {
            if (!settings.loop && index < 0 || index > slideCount)
                return;

            curSlide = index;
            currentImage.attr('src', images.eq(index).attr('src'));

            self.buttonsUpdate(index);
            self.descUpdate(index);
            self.checkImg();
        }

        this.buttonsUpdate = function(index){
        	var prevImg = images.eq(index - 1).attr('src'),
        		nextImg = images.eq(index + 1).length ? images.eq(index + 1).attr('src') : images.eq(0).attr('src');

        	prev.find('img').attr('src', prevImg);
        	next.find('img').attr('src', nextImg);
        }

        this.descUpdate = function(index){
        	var currentImgDesc = list.find("li").eq(index).data('desc');
        	
        	currentDesc.text(currentImgDesc);
        }

        this.moveNext = function() {
            if (settings.loop && (curSlide + 1) == slideCount) {
                self.selectSlide(0);
            } else {
                self.selectSlide(curSlide + 1);
            }
        }

        this.movePrev = function() {

            if (settings.loop && curSlide == 0) {
                self.selectSlide(slideCount - 1);
            } else {
                self.selectSlide(curSlide - 1);
            }
        }

        this.checkImg = function() {
            var $imgBox = $('.js-image-container'),
                $img = $('img', $imgBox);

            console.log('img: ' + $img.height() + ' box: ' + $galarySlider.height());

            if( $img.height() >= $galarySlider.height() ) {
                $galarySlider.addClass('small-img');
            } else {
                $galarySlider.removeClass('small-img');
            }
        } 

        this.init();
       
	}


	var sliderHorizontal = new Slider({
		wrapper: '.galary-slider',
		loop: true,
		startIndex: 0
	});

	var sliderLeft = new Slider({
		wrapper: '.galary-slider.left',
		loop: true,
		startIndex: 0
	});

	var sliderRight = new Slider({
		wrapper: '.galary-slider.right',
		loop: true,
		startIndex: 0
	});

	$(".story-galary li").on('click', function(e) {
		var currentIndex = $(this).index(),
            $prev = $(this).closest('body').find('.js-prev'),
            $next = $(this).closest('body').find('.js-next');

		sliderHorizontal.selectSlide(currentIndex);

		$backgroundOvarlay.addClass('active');
		$galarySlider.addClass('active');
        sliderHorizontal.checkImg();
	});

	$(".small-galary.left li").on('click', function(e) {
		var currentIndex = $(this).index();

		sliderLeft.selectSlide(currentIndex);

		$backgroundOvarlay.addClass('active');
		$galarySliderLeft.addClass('active');
	})

	$(".small-galary.right li").on('click', function(e) {
		var currentIndex = $(this).index();

		sliderRight.selectSlide(currentIndex);

		$backgroundOvarlay.addClass('active');
		$galarySliderRight.addClass('active');
	})


	$closeSlider.on('click', function(e){
		e.preventDefault();

		$backgroundOvarlay.removeClass('active');
		$galarySlider.removeClass('active');
	});

});