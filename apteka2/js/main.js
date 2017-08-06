$(document).ready(function(){
    var myMap,
        myPlacemark;


    // Дождёмся загрузки API и готовности DOM.
    // ymaps.ready(init);
    $('#newMap').each(function(){
      ymaps.ready(init);
    })

    function init () {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('newMap', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center:[55.76, 37.64], // Москва
            zoom:10
        });

        myPlacemark = new ymaps.Placemark([55.76, 37.64], { 
            // content: 'Москва!', 
            // balloonContent: 'Столица России' 
        }, {
                hideIconOnBalloonOpen: false,
                iconImageHref: 'ico/map_pin.png',
                iconImageSize: [35,46]

        });

        myMap.geoObjects.add(myPlacemark);

    }
// всплыв попап на имени 2
    $(".hintBoxInfo").each(function() {

        var $this = $(this),
            ico = $('.name_info.product_name', $this),
            popup = $('.content_bg_top.search_popup', $this),
            speed = 400,
            block = false;

        popup.hide();

        ico.mouseenter(function(){

            if(block) return false;
            block = true;

            popup.fadeIn(speed, function(){

                block = false;
            })
        })

        ico.mouseleave(function(){

            popup.fadeOut(speed);
        })

    });
// слайдер на продуктах 2
    $('.itemSlider').each(function(){

        var $self = $(this),
            $controlBlock = $('.slides_control', $self),
            $control = $('.slides_control li', $self),
            $viewImgBlock = $('.slides', $self),
            $viewImg = $('.slides li', $self),
            liWidth = $('.slides li', $self).first().width(),
            controlLength = $control.length,
            block = false,
            blockInt = false,
            pos = 0,
            idx = 0,
            count = $('.slider1 .slides_control li').length,
            slides = '',
            flag_moveSpeed = 1000;
            
        $control.first().addClass('active');
        $viewImg.first().addClass('active');      

        $control.click(function(){

            if( block ) return false; 
            block = true;

            pos = $(this).index();

            navigate();

            return false;
        });

        function navigate() {
            $viewImgBlock.animate({
                'margin-left': - liWidth * pos
            }, flag_moveSpeed, 'swing', function(){
                block = false;
            });

            $control
                .eq(pos).addClass('active')
                .siblings('.active').removeClass('active');
            $viewImg
                .eq(pos).addClass('active')
                .siblings('.active').removeClass('active');
        }

        function pressNextTab(){

            if(blockInt == false){
            
                if( pos == controlLength - 1 ) {
                    $control.eq(0).click();    
                } else {
                    $control.eq(pos).next().click();
                }
            }
                  
        }
    
        var int = setInterval(pressNextTab, 5000);

        $self.mouseenter(function(){
             blockInt = true;
        })
        $self.mouseleave(function(){
             blockInt = false;
        })

    });

// search by disease 
    // иконка инфо

    $(".nameBoxInfo").each(function() {

        var $this = $(this),
            ico = $('.name_info', $this),
            popup = $('.search_info_disease_wrap', $this),
            speed = 400,
            block = false;

        popup.hide();

        ico.click(function(){

            if(block) return false;
            block = true;

            popup.fadeToggle(speed, function(){

                block = false;
            })
        })

    });

// крестик
    $(".nameInFo").each(function() {

        var $this = $(this),
        icoClose = $('.close_filter_second.blue', $this),
        popup = $('.search_info_disease_wrap', $this),
        speed = 400,
        block = false;

        icoClose.click(function(){

            if(block) return false;
            block = true;

            popup.fadeOut(speed, function(){

                block = false;
            })
            return false;
        })
    })

// табы в поиске по заболеванию

    $(".tabsBox").each(function() {

        var $this = $(this),
          tabsControls = $('.sort_disease.radio_style.disease', $this),
          tabsListLi = $('.tabsContent > li', $this),
          attentionBoxBottom = $('.attention_box.bottom', $this);

        tabsListLi.first().siblings().hide();
        attentionBoxBottom.hide();

        $('label', tabsControls).click(function(){
            $('input:radio', $(this)).attr('checked', 'checked');

            if ($.browser.msie && $.browser.version < 9.0) {
                if ( $('input:radio, input:checkbox', $(this)).attr('checked') == 'checked' ){
                    $(this).addClass('checked').parent().siblings().find('label').removeClass('checked');
                    } else {
                        $(this).removeClass('checked').parent().siblings().find('label').removeClass('checked');
                    }
                }

            var pos = $(this).parent().index();
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('.tabsContent > li', $this).eq(pos).css('display', 'block').siblings().hide();
            return false;
        })

// всплывашка в низу поиск по заболеванию

        setTimeout(function(){

            attentionBoxBottom.fadeIn(1000)
        }, 2000);

    })

// прыгающая корзина
    $(".shopping").mouseup(function(event){
        $(this).css('top', 1);
    }).mousedown(function(event){
        $(this).css('top', 2);
    });


// исчезновение всплыв инфо по нажатию
    $('.showBox, .search_info_disease_wrap .close_filter_second').on('click', function(event){
        $('.search_info_disease_wrap').fadeOut(400);
    });
    
    $('.search_info_disease_wrap, .name_info').on('click', function(event){
        event.stopPropagation();
    })

    $('.contentAutorization').each(function(){

        var $this = $(this),
            registration = $('.registration_button.reg_but', $this),
            authorization = $('.authorization_button.reg_but', $this),
            authorizationForm = $('.avtorization_form', $this),
            regFromSecond = $('.regFromSecond', $this),
            block = false;
            speed = 400;

        registration.hide();
        authorization.hide();

        authorizationForm.mouseenter(function(){

            if(block) return false;
            block = true;

            authorization.fadeIn(speed, function(){

                block = false;
            })
            return false;
        })
        authorizationForm.mouseleave(function(){

            authorization.fadeOut(speed);
        })

        regFromSecond.mouseenter(function(){

            if(block) return false;
            block = true;

            registration.fadeIn(speed, function(){

                block = false;
            })
            return false;
        });
        regFromSecond.mouseleave(function(){

            registration.fadeOut(speed);
        });

    });
// корзина 2-1 шаг---
    $('.content_bg_wrap').each(function(){

        var $this = $(this),
            deliveryList = $('.deliveryList', $this),
            newMap = $('.newMapSecond', $this),
            $mapShow = $('.mapShow', $this),
            speed = 400;

        // $('label', deliveryList).click(function(){

        //     $(this).parent().addClass('active').siblings().removeClass('active');
        //     var pos = $(this).parent().index();

        //     if(pos==1 && $(this).parent().hasClass('active')){

        //         newMap.fadeIn(speed);
        //     } else{
        //         newMap.fadeOut(speed);
        //     }
            
        // });

        $('label', deliveryList).click(function(){
            $(this).parent().addClass('active').siblings().removeClass('active');

            if ($mapShow.parent().hasClass('active')){
                newMap.fadeIn(speed);
            } else {
                newMap.fadeOut(speed);
            }
        });


    });

// заполнение формы
    
    $('.formReg').each(function(){

        var $this = $(this),
            name = $('.textName', $this),
            mail = $('.textMail', $this),
            phone = $('.textPhone', $this),
            logMail = $('.textLogMail', $this),
            textPassword = $('.textPassword', $this),
            error = 0,
            authorization = $('.authorization_button.reg_but', $this),
            authorizationForm = $('.avtorization_form', $this),
            sendOrder = $('.form_style.small_form.order_form', $this),
            send = $('.sendOrderReg', $this),
            sendBlock = $('.wrap_send_order', $this),
            $wrapSend = $('.wrap_send_box_sec', $this),
            speed = 400,
            block = false;
// скрытие кнопок

        $wrapSend.hide();
        authorization.hide();

        authorizationForm.mouseenter(function(){

            if(block) return false;
            block = true;

            authorization.fadeIn(speed, function(){

                block = false;
            })
            return false;
        });
        authorizationForm.mouseleave(function(){

            authorization.fadeOut(speed);
        });

        sendOrder.mouseenter(function(){

            if(block) return false;
            block = true;

            $wrapSend.fadeIn(speed, function(){

                block = false;
            })
            return false;
        });
        sendOrder.mouseleave(function(){

            $wrapSend.fadeOut(speed);
        });
// рег выражения
        name.on('change blur keyup', function(event){

            (this.value.search(/^[а-я\s]+$/i) === -1 && this.value.search(/^[a-z\s]+$/i) === -1 ) ? $(this).addClass('error') : $(this).removeClass('error');
        });

        mail.on('change blur keyup', function(event){

            (this.value.search(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i) === -1) ? $(this).addClass('error') : $(this).removeClass('error');
        });

        phone.on('change blur keyup', function(event){

            (this.value.search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/) === -1) ? $(this).addClass('error') : $(this).removeClass('error');
        });

        logMail.on('change blur keyup', function(event){


            (this.value.search(/^[a-z\s]+$/i) === -1 && this.value.search(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i) === -1) ? $(this).addClass('error') : $(this).removeClass('error');
            
        });

// блокировка кнопки
        
        sendOrder.find('.send_order').on('click', function(event){
            event.preventDefault();
            var form = $(this).closest('form');

            
            form.find('input').each(function(){
                if (this.value === '') $(this).addClass('error');
            });

            if (form.find('.error').length === 0){                

                form.submit();
            }
            

        })

        sendOrder.on('change', function(event){
            var $arrInput = $('input', sendOrder);

            for(var i = 0; i <= $arrInput.length - 1; i++){

                if( $($arrInput[i]).val() == '' ){
                    return;
                }

            }


             if ( ($(this).find('.error').length == 0) ){
                $('.wrap_send_order').removeClass('disabled');
            }

        })
        

    });

    /* 
    *   СТР ГЛАВНАЯ
    *   промо блоки
    *       начало
    */
    $('.promoBox li').each(function(){
        var $this = $(this),
            promoPopupHeight = $('.promo_popup', $this).css('top').slice(0, -2),
            textPromoHeight = $('.text_promo', $this).outerHeight(),
            speed = 500,
            block = false;

        $this.mouseenter(function(){
            if (block) return false; block = true;

            $('.promo_popup', $this).animate({
                'top': promoPopupHeight - textPromoHeight -8
            }, speed, function(){
                block = false;
            });
        })

        $this.mouseleave(function(){
            $('.promo_popup', $this).animate({
                'top': promoPopupHeight
            }, speed);
        })

    })
    
    /* 
    *   промо блоки
    *       конец
    */
    // меню с задержкой
    $('.product_nav_box').each(function(){

        var timeoutId;
        $('.product_nav tr td').mouseenter(function(){
          var $this = $(this);
          timeoutId = setTimeout(function() {
            $('.arise_box', $this).fadeIn(500);
          },1000);
        });
        $('.product_nav tr td').mouseleave(function(){
          $('.arise_box', this).fadeOut(500);
          clearInterval(timeoutId);
        });
        

      
    });


});


