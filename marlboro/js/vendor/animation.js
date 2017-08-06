jQuery(document).ready(function($) {

	if ($(window).width() < 1024) {
        $('.fade1, .fade2, .fade3, .fade4, .fade5, .fade6, .fade7, .fade8, .fade9, .fade10, .fade11, .fade12, .fade13, .fade14').css('opacity', 1);
	}
    else {
		$('.fade1').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade2 .vertical__text').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade3').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade4 .vertical__text').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade5').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade6 .vertical__text').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade7 .vertical__text').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade8').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade9 .vertical__text').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade10').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade11').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade12').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade13').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});

		$('.fade14').css('opacity', 0).one('inview', function(isInView) {
			if (isInView) {$(this).addClass('animated fadeIn delayp1');}
		});
	}
});