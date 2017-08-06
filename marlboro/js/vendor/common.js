$(document).ready(function () {

    var $footer = $('.js-footer');

    $(window).scroll(function () {
        var offsetTop = $('body').scrollTop();
        if (offsetTop > 0) {
            $footer.addClass('scrolled');
        }
        else {
            $footer.removeClass('scrolled');
        }
    });

    $('.js-mobile-header_back').click(function() {
        window.history.back();
    });

    if ($('.custom-select').length) {
        $('.custom-select').fancySelect();
    }

    $('.js-popup-close').click(function () {
        $('.js-popup').fadeOut();
    });

    showPopup = function ($html) {
        $('#popup_text').empty().html($html);
        $('#popup').show();
    };

    showPopupWithOkButton = function ($html, $ok_button_url) {


        $('#popup_text').empty().html($html);
        $("#popup_text").append($("<div></div>").addClass('popup_button-box').append($('<a id="popup_ok_a"></a>').append($("<button id='popup_ok_button'>ok</button>").addClass('button popup-button'))));



        if (typeof($ok_button_url)!=='undefined') {
            $('#popup_ok_a').attr('href', $ok_button_url );
        }else{
            $('#popup_ok_button').click(function () {
                $('.js-popup').fadeOut();
            });
        }
        $('#popup').show();
    };

    showPopupUnsubscribe=function($html){
        $('#popup_text').empty().html($html);
        $("#popup_text").append($("<div></div>").addClass('popup_button-box').append(
            $("<button id='popup_ok_button'></button>").addClass('button popup-button').append($('<a>ok</a>'))
        ).append(
                $("<button id='popup_cancel_button'></button>").addClass('button popup-button').append($('<a>Отмена</a>')))
        );

        $('#popup_ok_button').click(function(e){
            //e.preventDefault();
            $('#popup').hide();
            $.post(Routing.generate('las_user_ajax_unsubscribe'))
                .done(function (res) {
                    $('#unsubscribe').hide();
                    $('#subscribe').show();

                });
        });



        $('#popup_cancel_button').click(function () {
            $('.js-popup').fadeOut();
        });
        $('#popup').show();
    }

});