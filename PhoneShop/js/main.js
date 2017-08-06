$(document).ready(function(){
	$('.slider').myPlugin();
});

(function( $ ){
	$.fn.myPlugin = function(options) {
   
    	var $this = this,
			list = $('.slider__list', $this),
			listItem = $('.slider__list li', $this),
			control = $('.slider__control li', $this),
			arrow = $('.slider__arrow', this),
			liHeight = $('.slider__control li', $this).first().height(),
			arrowTop = liHeight/2;
			block = false,
            idx = 0;

        var settings = {
	    	'speed': 400,
	    	'fadeSpeed': 500
	    };
	 
	    return this.each(function() {        
	      // если опции существуют, то совмещаем их
	      // со значениями по умолчанию
		    if ( options ) { 
		        $.extend( settings, options ); // при этом важен порядок совмещения
		    }

			listItem.first().addClass('active');
	        control.first().addClass('active');

			control.on('click', function () {
				$(this).addClass('active').siblings().removeClass('active');
				idx = $(this).index();
				arrow.animate({
					'top': idx * liHeight + arrowTop
	            },settings.speed ,function(){
	                block = false;
	            });			
				listItem.eq(idx).addClass('active').siblings('.active').removeClass('active');
			});
 
		});
	};
})( jQuery );

