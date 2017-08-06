$(document).ready(function(){
    function setFooterHeight() {
        var $footer = $('.hw'),
            innerHeight = $(window).innerHeight();
        $footer.height(innerHeight*0.11);
        var globalPadding = $('.js-footer').outerHeight();
        $('.global').css('padding-bottom', globalPadding)
    }
    setFooterHeight();
    $(window).resize(function(){
        setFooterHeight();
    });

    $('.js-mmbtn').click(function(){
        $('.js-mm').toggleClass('opened');
        $(this).toggleClass('opened');
    });

    var $foot = $('.fade14');

    $(window).scroll(function(){
        var offsetTop = $('body').scrollTop();

        if (offsetTop > 0) {
            $foot.addClass('scrolled');
        }
        else {
            $foot.removeClass('scrolled');
        }

    });
});