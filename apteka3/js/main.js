$(document).ready(function(){

// Табы
	$('.tabsBox').each(function(){
		var $this = $(this),
			control = $('.tabs_controls a', $this),
			pos = 0;

		$('.tabs_content > li', $this).first().siblings().hide();

		control.click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			pos = $(this).index();
			$('.tabs_content > li', $this).eq(pos).show().siblings().hide();
			return false;
		})
	})

// Промо-блок
	$('.promoBox').each(function(){
		var $this = $(this),
			block = false;

		$('.text', $this).hide();

		$('li', $this).mouseenter(function(){
			if (block) return false; block = true;

			$('.text', $(this)).slideDown(function(){
				block = false;
			});
		})

		$('li', $this).mouseleave(function(){
			$('.text', $(this)).slideUp();
		})

	})

// Скролл
	$('.scroll_box').mCustomScrollbar({
      scrollInertia: 150,
      autoHideScrollbar: true,
       advanced:{
        updateOnContentResize: true
        }
    })

    $('.scroll_box').each(function(){
      $(this).mousewheel(function(event){
         event.preventDefault();
         event.stopPropagation();
      })
    })

    $('.tabsBox').each(function(){
      var $this = $(this),
          scroll = $('.scroll_box', $this),
          scrollTool = $('.mCSB_scrollTools', $this),
          controls = $('.tabs_controls', $this);

      if ($.browser.msie && $.browser.version == 8.0) {

        $this.hover(function(){
          scrollTool.hide();
        })

        scrollTool.hide();

        scroll.mouseover(function(){
          scrollTool.show();
        })

        scroll.add(controls).mouseleave(function(){
          scrollTool.hide();
        })

      }
      
    })

// Скрываем шапку
    $(window).on('scroll',function(){
      var header = $('#header'),
          speed = 400,
          objects = $('.nav, .reg_nav, .phone_box, .search_form, .phone_button, .shadow_header', header);

      if ( $(window).scrollTop() >= 12 || document.documentElement.scrollTop >= 12 ){

        header.on('mouseenter', function(){
	        header.removeClass('fixed');
	        objects.slideDown(speed);
	        header.stop(true, false).animate({
	        	'padding-top': 12
	        },speed, function(){
	        	objects.css('overflow', '');
	        });
    	})

    	header.on('mouseleave', function(){
    		header.addClass('fixed');
	        objects.stop(true, false).slideUp(speed);
	        header.stop(true, false).animate({
	        	'padding-top': 30
	        },speed);
    	})

        header.addClass('fixed');
        objects.stop(true, false).slideUp(speed);
        header.stop(true, false).animate({
        	'padding-top': 30
        },speed);

      } else {
      	header.off('mouseleave');
      	header.off('mouseenter');
        header.removeClass('fixed');
        objects.slideDown(speed);
        header.stop(true, false).animate({
        	'padding-top': 12
        },speed, function(){
        	objects.css('overflow', '');
        });

      }

     });

  // индекс
  // прыгающая корзина
      $(".shopping").mouseup(function(event){
        $(this).css('top', 1);
    }).mousedown(function(event){
        $(this).css('top', 2);
    });
    // Табы
    $('.tabsWrap').each(function(){
      var $this = $(this)
          tabsControls = $('.tabsControls', $this),
          tabsListLi = $('.tabsList > li', $this);

      tabsListLi.first().siblings().hide();

      $('a', tabsControls).click(function(){
        var pos = $(this).parent().index();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.tabsList > li', $this).eq(pos).css('display', 'block').siblings().hide();
        return false;
      })

    })

   // Карусель
    $('.scroll-pane').each(function(){
      var $this = $(this),
          lis = $('.scroll-content li', $this),
          needWidth = 0,
          content = $('.scroll-content', $this),
          prev = $('.prev', $this),
          next = $('.next', $this),
          scrollPane = $this,
          scrollContent = $( ".scroll-content", $this ),
          block = false,
          shift = ($('li', scrollContent).outerWidth(true) * 2),
          maxShift = ($('li', scrollContent).outerWidth(true) * 5);

      for ( var i = 0; i < lis.length; i++){
        needWidth = needWidth + ( lis.eq(i).outerWidth(true) );
      }

      next.click(nextClick);

      function nextClick(){
        var currentMargin = parseInt(content.css('margin-left')),
            currentShift = ( currentMargin - shift);

        if (block) return false; block = true;
        
        if ( currentShift < - (needWidth - maxShift ) ){
          content.animate({'margin-left': - (needWidth - maxShift)}, function(){ block = false; next.removeClass('active'); });

          scrollbar.slider( "value", 100 );

        } else {

          content.animate({'margin-left': (( currentMargin - shift))}, function(){ block = false; next.removeClass('active'); });
          resetValue(( currentMargin - shift ));

        }

        return false;
      }

      prev.click(prevClick);

      function prevClick(){
        var currentMargin = parseInt(content.css('margin-left')),
            currentShift = ( currentMargin - shift);

        if (block) return false; block = true;

        if ( currentShift > - ( maxShift ) ){
          content.animate({'margin-left': 0}, function(){ block = false; prev.removeClass('active'); });

          scrollbar.slider( "value", 0 );

        } else {

          content.animate({'margin-left': (( currentMargin + shift))}, function(){ block = false; prev.removeClass('active'); });
          resetValue(( currentMargin + shift));

       }
        return false;
      }

      scrollContent.mousewheel(function(event, delta) {

        var scrollPaneWidth = scrollContent.closest('.scroll-pane').width(),
            scrollContentWidth = scrollContent.closest('.scroll-content').width();

        event.preventDefault();
        if ( delta == -1 ){

          if ( scrollContent.closest('.scroll-pane').hasClass('move_block') ){
            prevMove( scrollPaneWidth, scrollContentWidth );
          } else {
            prevClick();
            next.removeClass('active');
            prev.addClass('active');
          }
          
        } else {

          if ( scrollContent.closest('.scroll-pane').hasClass('move_block') ){
            nextMove( scrollPaneWidth, scrollContentWidth );
          } else {
            nextClick();
            next.addClass('active');
            prev.removeClass('active');
          }
          
        }
      });

      function nextMove(scrollPaneWidth, scrollContentWidth){
        var currentMargin = parseInt(content.css('margin-left')),
            shift = 100,
            currentShift = ( currentMargin - shift),
            maxShift = (scrollPaneWidth - scrollContentWidth) + shift;

        if (block) return false; block = true;

        if ( currentMargin < (maxShift) ){
          content.animate({'margin-left': (scrollPaneWidth - scrollContentWidth)}, function(){ block = false; });
          scrollbar.slider( "value", 100 );
        } else {
          content.animate({'margin-left': (currentMargin - shift) }, function(){ block = false; })
          resetValue( currentMargin - shift );
        }

        return false;
      }

      function prevMove(scrollPaneWidth, scrollContentWidth){
        var currentMargin = parseInt(content.css('margin-left')),
            shift = 100,
            currentShift = ( currentMargin - shift),
            maxShift = (scrollPaneWidth - scrollContentWidth) + shift;

        if (block) return false; block = true;

        if ( currentShift > ( maxShift ) ){
          content.animate({'margin-left': 0}, function(){ block = false; });
          scrollbar.slider( "value", 0 );
        } else {
          content.animate({'margin-left': (currentMargin + shift) }, function(){ block = false; })
          resetValue( currentMargin + shift );
        }

        return false;
      }

      //scrollpane parts


      if ( $this.hasClass('move_block') ){
        scrollContent.width(needWidth + 53);

        if ( $this.width() > (needWidth + 38) ){
          $('.scroll-bar-wrap', $this).hide();
          $('.fade_help', $this).hide();
        }

      } else if ( $this.hasClass('nav_slider') ){
        scrollContent.width(needWidth + 57);

      } else {
        scrollContent.width(needWidth + 78);
      }


      
      //build slider
      var scrollbar = $( ".scroll-bar", $this ).slider({
        slide: function( event, ui ) {
          if ( scrollContent.width() > scrollPane.width() ) {
            scrollContent.css( "margin-left", Math.round(
              ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
            ) + "px" );
          } else {
            scrollContent.css( "margin-left", 0 );
          }
        }
      })

   
      //append icon to handle
      var handleHelper = scrollbar.find( ".ui-slider-handle" )
      .mousedown(function() {
        scrollbar.width( handleHelper.width() );
      })
      .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
      .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();
   
      //change overflow to hidden now that slider handles the scrolling
      scrollPane.css( "overflow", "hidden" );

      var bigBlock = false;

      $('.nav li').mouseenter(function(){
        var root = $(this);
       
        if( !$(this).find('.scroll-pane').is('div') ) return false;

        // if($('.ui-slider-handle', $this).width()){
          if (bigBlock) return false;   
        // }

        var needWidth = scrollbar.width();
        if( $('.scroll-pane', root).width() == 0 ){
          needWidth = 977;
          $('.scroll-pane', root).width(977);
        }


        var remainder = scrollContent.width() - scrollPane.width();
        var proportion = remainder / scrollContent.width();
        var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
        scrollbar.find( ".ui-slider-handle" ).css({
          width: handleSize,
          "margin-left": -handleSize / 2
        });
        bigBlock = true;        

        handleHelper.width( "" ).width( needWidth - handleSize );

      })
   
      //size scrollbar and handle proportionally to scroll distance
      function sizeScrollbar() {
        var remainder = scrollContent.width() - scrollPane.width();
        var proportion = remainder / scrollContent.width();
        var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
        scrollbar.find( ".ui-slider-handle" ).css({
          width: handleSize,
          "margin-left": -handleSize / 2
        });
        handleHelper.width( "" ).width( scrollbar.width() - handleSize );
      }
   
      //reset slider value based on scroll content position
      function resetValue(needMargin) {
        var remainder = scrollPane.width() - scrollContent.width();

        var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
          parseInt( scrollContent.css( "margin-left" ) );

        var percentage = Math.round( needMargin / remainder * 100 );
        scrollbar.slider( "value", percentage );
      }
   
      //if the slider is 100% and window gets larger, reveal content
      function reflowContent() {
          var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
          var gap = scrollPane.width() - showing;
          if ( gap > 0 ) {
            scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
          }
      }
   
      //change handle position on window resize
      $( window ).resize(function() {
        // resetValue();
        // sizeScrollbar();
        // reflowContent();
      });
      //init scrollbar size
      setTimeout( sizeScrollbar, 10 );//safari wants a timeout


    })

// -----------------------------------------------------Корзина---------------------------------------------------------

    $('.basket_box').each(function(){
      var $this = $(this),
          deletedBox = $('.deletedBox', $this),
          delBut = $('.del', $this),
          delNames = $('.del_name', deletedBox),
          delArr = [],
          delList = $('.deleted_list', $this),
          productName = $('.productName', $this),
          arrow = $('.arrow', $this),
          orderList = $('.order_list', $this),
          scrollBox = $('.orderScroll', $this),
          scrollBoxHeigth = parseInt( $('.orderScroll', $this).css('height') ),
          popup = $('.small_popup', $this);

        deleteItems(delBut);
        showArrow(arrow, delArr, delList);

        $this.mouseenter(function(){
          popup.addClass('open');

          if ( popup.hasClass('open') ){
            showScroll(orderList, scrollBox, scrollBoxHeigth);
          }

        })

        $this.mouseout(function(){
          popup.removeClass('open');
        })

        function deleteItems(target){
          target.off('click');
          target.on('click', function(event){
            event.preventDefault();
            event.stopPropagation();

            var currentHtml = $(this).closest('li').html(),
                currentName = $(this).closest('li').find('.productName').text(),
                maxCount = $(this).closest('li').find('.number'),
                maxCountNum = parseInt(maxCount.text()),
                item_id = $(this).closest('li').attr('itemId');

            var currentNumber = parseInt( maxCount.text() );
            currentNumber--;

            if ( currentNumber == '0' ){
              $(this).closest('li').remove();
            }

            $(this).closest('li').find('.number').text(currentNumber);

            var noPush = false;

            for ( var i = 0; i <= delArr.length -1; i++){

              if ( item_id == delArr[i].itemId ){
                delArr[i].currentCount++;
                noPush = true;
              }
              
            }

            if ( noPush == true ) return false;

            delArr.push(
                {name: currentName,
                maxCount: maxCountNum,
                html: currentHtml,
                itemId : parseInt(item_id),
                currentCount : 1}
              );

            lastDelCheck(delNames, delArr);
            checkLength(delNames, deletedBox);
            createDelList(delList, currentName, item_id);
            returnDeletes();
            showArrow(arrow, delArr, delList);
            showScroll(orderList, scrollBox, scrollBoxHeigth);
            hideLastDelete(delArr);

          })
        }
        
        function returnDeletes(){
          $('li', delList).add(delNames).off('click');
          $('li', delList).add(delNames).on('click', function(){
            var currentPos,
                $this = $(this),
                currentId = parseInt( $(this).attr('itemId') );


            for ( var i = 0; i < delArr.length; i++ ){
              if ( currentId == delArr[i].itemId){
                currentPos = i;
              }
            }
            var block = false;         

            var ordersArr = $('.order_list li');

            // если в списке товаров уже есть товар, который мы возвращаем - увеличиваем колличество этого товара на единицу

            for ( var j = 0; j < ordersArr.length; j++ ){

              if ( currentId == ordersArr.eq(j).attr('itemId')){
                block = true;
                delArr[currentPos].currentCount = parseInt($(ordersArr.eq(j)).find('.number').text()) + 1;
                ordersArr.eq(j).find('.number').text((delArr[currentPos].currentCount));


                if ( delArr[currentPos].maxCount == delArr[currentPos].currentCount ){
                  
                  if ($(this).is('li')) $this.remove();

                  for ( var t = 0; t < $('li', delList).length; t++ ){
                    if ( $('li', delList).eq(t).attr('itemId') == delArr[currentPos].itemId ){
                        $('li', delList).eq(t).remove();
                    }
                  }

                  delArr.splice(currentPos, 1);
                  lastDelCheck(delNames, delArr);
                  deleteItems($('.basket_box .order_list .del'));
                  checkLength(delNames, deletedBox);
                  showArrow(arrow, delArr, delList);
                  showScroll(orderList, scrollBox, scrollBoxHeigth);

                }
              }
            }
            if ( block ) return false;

            // если в списке товаров возвращаемого товара нету - создаем его

            delArr[currentPos].currentCount--;

            $('<li itemId="'+ delArr[currentPos].itemId +'">' + delArr[currentPos].html + '</li>').appendTo(orderList);

            $('.order_list li').each(function(){
              if ($(this).attr('itemId') == currentId){
                $(this).find('.number').text('1');
              }
            })

            showScroll(orderList, scrollBox, scrollBoxHeigth);

            if ( delArr[currentPos].currentCount == '0' ){
              if ($(this).is('li')) $this.remove();

              for ( var t = 0; t < $('li', delList).length; t++ ){
                if ( $('li', delList).eq(t).attr('itemId') == delArr[currentPos].itemId ){
                    $('li', delList).eq(t).remove();
                }
              }

              delArr.splice(currentPos, 1);
              deleteItems($('.basket_box .order_list .del'));
              lastDelCheck(delNames, delArr);
              checkLength(delNames, deletedBox);
              showArrow(arrow, delArr, delList);
            }


          })
        }

        arrow.click(function(event){
          event.preventDefault();
          event.stopPropagation();

          $(this).toggleClass('up');
          delList.toggle();
        })

        deletedBox.mouseleave(function(){
          delList.hide();
          arrow.addClass('up');
        })

    })

    function showArrow(target, array, list){
      if ( array.length - 1 < 1 ){
        target.add(list).hide();
      } else {
        target.show();
      }
    }

    function hideLastDelete(array){
        var delLi = $('.basket_box .deleted_list li');
        delLi.css('display', '');

        for( var i = 0; i < delLi.length; i++ ){
          if ( delLi.eq(i).attr('itemId') == array[array.length-1].itemId ){
            delLi.eq(i).hide();
          }
        }
    }


    function lastDelCheck(target, array){

      if (array.length == 0){
        target.text('');
      } else {

        hideLastDelete(array);

        target.text(array[array.length-1].name);
        target.attr('itemId', array[array.length-1].itemId);
      }
    }

    function createDelList(target, name, id){
      $('<li itemId="' + id + '"><span class="name">' + name + '</span><div class="fade_help"></div></li>').appendTo(target);
    }


    function checkLength(target, eventObj){
      if ( target.text() != '' ){
          eventObj.show();
        } else { 
          eventObj.hide();
          $('.basket_box .arrow').removeClass('up');
          $('.basket_box .deleted_list').hide();
        }
    }

    function showScroll(list, scroll, height){
      var needHeight = 0;
      for (var i = 0; i < $('li', list).length; i++){
        needHeight = needHeight + $('li', list).eq(i).outerHeight(true);
      }
      
      if ( needHeight < height ){
        scroll.css('height', 'auto');
      } else {
        scroll.css('height', height);
      }

    }

    // Селектбокс
    $(function () {
      $("select").selectbox();
    });

    // ----------------------------------------------------КАРТА-------------------------------------------------

    // Как только будет загружен API и готов DOM, выполняем инициализацию
    $('#map').each(function(){
      ymaps.ready(init);
    })

    function init () {
        var myMap = new ymaps.Map('map', {
                // При инициализации карты, обязательно нужно указать ее центр и коэффициент масштабирования
                center: [55.76, 37.64], // Москва
                zoom: 10,
                behaviors: ["default", "scrollZoom"]
            }),
            myCollection = new ymaps.GeoObjectArray();

        function makePlacemarker( number, coordinates, content ){
            return new ymaps.Placemark(coordinates, {
                // Контент балуна
                balloonContentBody: content,
                iconContent: number
            }, {
                // Не скрывать иконку метки при открытии балуна
                hideIconOnBalloonOpen: false,
                // Изображение иконки метки
                iconImageHref: 'ico/marker.png',
                iconImageSize: [28,41],
                // Задаем макет балуна - пользовательская картинка с контентом
                balloonShadow: false,
                balloonOffset: [120, 0]
            });

        }
      
        $('.map_list > li').each(function(){
            var $this = $(this),
                lat = $('.coordsLat', $this).text()*1,
                lng = $('.coordsLng', $this).text()*1,
                coords = [lat, lng],
                title = $('h3', $this).text(),
                bubleContent = $('.mapInfo', $(this)).html();

            myCollection.add( makePlacemarker(  
                            '<b class="markerNum">' + ( $(this).index() + 1)  + '</b>', 
                            coords,
                            '<div class="small_popup">\
                                    <h3 class="title_popup dark">'+ title +'</h3>'
                                    + bubleContent + 
                            ' <div class="small_wrap_shadow"></div>\
                            </div>'
                            ))

        })

        myMap.geoObjects.add(myCollection);

        $('.map_list > li').on('click', function(event) {
          var $this = $(this);

            myCollection.get( $(this).attr('id') ).balloon.open();

        });


        var mapHeight = $('.map_list').height(),
            mapListli = $('.map_list li'),
            mapListLiHeight = $('.map_list li').first().outerHeight(),
            mapScrollHeight =  $('.mapScroll').height(),
            maxScroll = mapHeight - mapScrollHeight,
            dragHeigth = $('.mapScroll .mCSB_dragger').height(),
            maxDrag = mapScrollHeight - dragHeigth;

        myCollection.events.add('click', function(event){

          // var scrollPos = ( '#' + myCollection.indexOf(event.get('target')) );
          // $('.mapScroll').mCustomScrollbar('scrollTo', scrollPos);

          var scrollPos = ( myCollection.indexOf(event.get('target')) );

          if ( (scrollPos * mapListLiHeight) > maxScroll ){
            $('.mapScroll .mCSB_container').animate({
              top: -maxScroll
            })
          } else {
            $('.mapScroll .mCSB_container').animate({
              top: -(scrollPos * mapListLiHeight)
            })
          }

          var dragCoefficient = mapScrollHeight / mapListli.length;

          if ( (scrollPos * dragCoefficient) > maxDrag ){
            $('.mapScroll .mCSB_dragger').animate({
              top: maxDrag
            })
          } else {
            $('.mapScroll .mCSB_dragger').animate({
              top: (scrollPos * dragCoefficient)
            })
          }

        })

        $('body').on('mouseenter', function(event){
          var scrollTool = $('.mapScroll .mCSB_scrollTools');
          if ($.browser.msie && $.browser.version == 8.0) scrollTool.hide();
        })


        $('.mapScroll').each(function(){
          var $this = $(this),
              scrollTool = $('.mCSB_scrollTools', $this);

          if ($.browser.msie && $.browser.version == 8.0){

            $this.mouseenter(function(){
             scrollTool.show();
            })

            $this.mouseleave(function(){
             scrollTool.hide();
            })

          }

        })


        $('.map_list > li .button').on('click', function(event){
          event.stopPropagation();
        })

        myMap.controls
            // Кнопка изменения масштаба
            .add('zoomControl')
            // Список типов карты
            .add('typeSelector')
            // Стандартный набор кнопок
            .add('mapTools'); 

    };

    // ----------------------------------------------------КОНЕЦ КАРТЫ-------------------------------------------------


    /**
     *  табы в поиске по заболеванию
    **/

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

    /**
     *  конец всплывашка в низу поиск по заболеванию
     *  конец табов в поиске по заболеванию
    **/
    /**
     *  исчезновение всплыв инфо по нажатию
     *  
    **/
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
    /**
     *  конец исчезновения всплыв инфо по нажатию
     *  
    **/
    /**
     *  search by disease 
     *  иконка инфо
     **/

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
    /**
     *  КОНЕЦ search by disease 
     *                иконка инфо
     *                крестик
     **/

     $('.results_list > li:nth-child(3n+4)').css('clear', 'left');

    // Радиобатоны для ИЕ

   if ($.browser.msie && $.browser.version < 9.0) {

    function checkInputs(target){
      if ( $('input:radio, input:checkbox', target).attr('checked') == 'checked' ){

          if ( target.parent().hasClass('small_table_title') ){
            target.addClass('checked');
            $('.big_table_wrap .big_table input:checkbox').parent().addClass('checked');
          } else {
            target.addClass('checked').parent().siblings().find('label').removeClass('checked');
          }

       } else {

          if ( target.parent().hasClass('small_table_title') ){
            target.removeClass('checked');
            $('.big_table_wrap .big_table input:checkbox').parent().removeClass('checked');
          } else {
            target.removeClass('checked').parent().siblings().find('label').removeClass('checked');
          }

       }
    }

    checkInputs($('label'));

       $('label').each(function(){

          var $this = $(this);
           var mainCheckbox = $('.small_table_title label input:checkbox');

           $(this).click(function(){
               checkInputs($this);
           })
       })

       $('.radio_style').each(function(){
        var $this = $(this);
          $('li:first-child label', $this).addClass('checked');
       })
   }

    // Главный чекбокс
    $('.big_table_wrap').each(function(){
      var $this = $(this),
          mainCheckbox = $('.small_table_title label input:checkbox', $this);

      mainCheckbox.click(function(){

        if (mainCheckbox.attr('checked') == 'checked'){
          $('.big_table input:checkbox', $this).prop('checked', 'checked');
        } else {
          $('.big_table input:checkbox', $this).prop('checked', '');
        }

      })

    })

    // Редактирование полей ввода
    $('.form_line').each(function(){
      var $this = $(this),
        input = $('input:text, input:password', $this),
        inp_text = $('.inp_text', $this),
        passOne = $('.passOne', $this),
        passTwo = $('.passTwo', $this);

      input.val('');

      inp_text.click(function(){
        $(this).hide().next(input).focus();
      })

      input.focusout(function(){

        if ( $(this).val() == '' ){
          $(this).prev(inp_text).show();
        } else {
          $(this).prev(inp_text).hide();
        }

        if ( passOne.val() == '' || passTwo.val() == '' ) return false;

        if ( passOne.val() != passTwo.val() ){
          passTwo.prev(inp_text).show();
        } else {
          passTwo.prev(inp_text).hide();
        }

      })

      input.focus(function(){

          $(this).prev(inp_text).hide();

      })

    })

    // Поиск
    $('.simple_search').on('click keyup', '.search_button, input[type="text"]', function(event){
        event.preventDefault();
        event.stopPropagation();

        var target = $(event.currentTarget);
        if( (event.type == 'keyup' && event.keyCode !== 13) || (event.type == 'click' && target.attr( 'type' ) == 'text' ) ) return false;

      })

    $('.simple_search').each(function(){

        var $this = $(this),
            input = $('input:text', $this),
            inpVal = input.val();

        input.click(function(){

          if ( $(this).val() == inpVal ){
           input.val('');
          }

        })

        input.focusout(function(){

          if ( $(this).val() == '' ){
            $(this).val(inpVal);
          } 
          
        })
    })

    $('.simple_search .search_popup').each(function(){
      var $this = $(this);
  
      var block = false; if (block) return false;
      $(this).show();
      block = true;
    })

    $('.close_small_popup').click(function(event){

      $(this).closest('.small_popup').fadeOut(400);
      return false;
    })

    $('.article_box .small_popup_box').each(function(){
      var $this = $(this),
          small_popup = $('.small_popup', $this);

      $this.mouseleave(function(){
        small_popup.css('display', '');
      })

    })

    // Валидация форм
    $('.registrationForm').on('change', function(){
      var $this = $(this),
          passOne = $('.passOne', $this),
          passTwo = $('.passTwo', $this),
          passSuccess = $('.pass_sucses', $this);

      if ( (passTwo.val() != '') ){
        passTwo.prev().hide();
        passTwo.prev().text('повторите пароль');
      }

      if ( passOne.val() == '' || passTwo.val() == ''  ){
        passSuccess.hide();
        passTwo.parent().removeClass('no_match_pass');
        passTwo.prev().text('повторите пароль');
        return false;
      }

      if ( passOne.val() == '' || passTwo.val() == '' ) return false;

      if ( passOne.val() == passTwo.val() ){
        passSuccess.show();
        passTwo.parent().removeClass('no_match_pass');
        passTwo.prev().hide().text('повторите пароль');
      } else {
        passSuccess.hide();
        passTwo.parent().addClass('no_match_pass');
        passTwo.prev().text('повторите пароль');
        passTwo.prev().show().text('введенные пароли несовпадают');
      }

    })

// Сортировка
    $('.sortBox').each(function(){
      var $this = $(this),
          sortList = $('.section_list', $this),
          button = $('.up', $this);

      button.click(function() {

        if ( $(this).hasClass('down') ){
          SORTER.sort(sortList, 'desc');
          $(this).removeClass('down');
        } else {
          SORTER.sort(sortList);
          $(this).addClass('down');
        }

        return false;
      });

      var SORTER = {};
      SORTER.sort = function(which, dir) {
        SORTER.dir = (dir == "desc") ? -1 : 1;
        $(which).each(function() {
          // Find the list items and sort them
          var sorted = $(this).find("> li").sort(function(a, b) {
            return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? SORTER.dir : -SORTER.dir; 
          });
          $(this).append(sorted);
        });
      }

    })
    // Скролл

    $(window).scroll(function(){
      var fixHeader = $('.header_fixed'),
          speed = 400,
          popup = $('.fly_block');

      if ( window.pageYOffset > 145 || document.documentElement.scrollTop > 145 ){
        popup.addClass('fixed');
        fixHeader.css('display', 'block');
      } else {
        popup.removeClass('fixed');
        fixHeader.css('display', 'none');
      }

     });

    // Сортировка результатов поиска
    $('.filtrSearch').each(function(){
      var $this = $(this),
          list = $('.section_list', $this);

      $('li:gt(5)', list).hide();

      $('li', $this).each(function(){
        var $this = $(this),
            lis = $('.section_list li', $this);

        if ( $('li', $(this)).length > 6 ){
          $(this).find('.close_all').show();
          $(this).find('.close_all .txt').text('Показать все результаты ('+ (( lis.length ) - 6) +')');
          $('.up', $this).css('display', 'none');
          $('.name_box', $this).removeClass('active');
        }

      })

      $this.on('click', '.up, .close_all, .name', function(event){
        event.preventDefault();
        event.stopPropagation();


        var close = $(this).closest('li'),
            li = $(this).closest('li').find('.section_list li:gt(5)'),
            up = $(this).closest('li').find('.up'),
            listLi = $(this).closest('li').find('.section_list');

        if ( li.is(':hidden') ){
          li.slideDown();
          $('.txt', close).text('Свернуть результаты');
          $('.up', close).css('display', 'inline-block');
          $('.name_box', close).addClass('active');
        } else {
          li.slideUp();
          $('.txt', close).text('Показать все результаты ('+ (( $('li', listLi).length ) - 6) +')');
          $('.up', close).css('display', 'none');
          $('.name_box', close).removeClass('active');
        }

      })


    })

    $(document).on('keyup', function(event) { 
      if (event.keyCode == 27) {
      if ( $('.search_info_disease_wrap').is(":visible") ) return false;

      $('.showBox').fadeOut(400);
      $('.deleted_list').hide();
      $('.deleted_items .arrow').addClass('up');
      } 
    });

    $('body').on('click', function(event){
      $('.showBox').fadeOut(400);
    });
    
    $('.showBox').on('click', function(event){
      event.stopPropagation();
    })

    $('.showBox').each(function(){
      var $this = $(this),
          popup = $('.search_info_disease_wrap', $this);

      $(document).on('keyup', function(event){
        if (event.keyCode == 27) {
          popup.fadeOut(400);
        } 
      })
    })

    // Попап + Слайдер в попапе
    $('.arise_box').each(function(event){
      var $this = $(this),
          close = $('.close_filter', $this),
          speed = 400,
          ariseSlider = $('.ariseSlider', $this),
          ariseSliderLi = $('.slides li', ariseSlider)
          paginator = $('.paginator', $this),
          pos = 0,
          block = false;

      close.click(function(){
        $(this).closest($this).fadeOut(speed);
        return false;
      })

      ariseSliderLi.first().css('position','relative').siblings().hide();

      for ( i = 0; i < ariseSliderLi.length; i++){
        $('<a href="#"></a>').appendTo(paginator);
      }

      $('a', paginator).first().addClass('active');


      $('a', paginator).click(function(){
        pos = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        if (block) return false; block = true;
        ariseSliderLi.eq(pos).fadeIn(speed, function(){block = false}).css('position','relative').siblings().fadeOut(speed).css('position','absolute');
        return false;
      })


    })

    // Избранное
    $('.favorite_box').each(function(){
      var $this = $(this),
          link = $('> a', $this),
          favIco = $('.favorite_ico');

      link.click(function(){

        if ($(this).parent().hasClass('active')){
          $(this).parent().removeClass('active');
          $(this).text('Удалить из Избранного');
          favIco.show();
        } else {
          $(this).parent().addClass('active');
          $(this).text('Добавить в Избранное');
          favIco.hide()
        }

        return false;
      })

    })

    // Аккордеон
    $('.info_list').each(function(){
      var $this = $(this),
          link = $('h3 a', $this),
          block = false;

      $('.text', $this).hide();

      link.click(function(){
        if (block) return false; block = true;
        // $(this).closest('li').addClass('active').siblings().removeClass('active');
        $(this).closest('li').siblings().find('.text').slideUp();
        $(this).closest('li').find('.text').slideDown(function(){
          block = false;
        });
        return false;
      })

    })
     // --------------------------------------------------Модуль выгрузки----------------------------------------------------
    var updateInterval,
        price_id,
        item_id,
        dataArr;


    $('.download_form').each(function(){
      var $this = $(this),
          progressLine = $('.progress_line', $this),
          statusUpload = $('.progress_title', $this),
          button = $('.download_file .button', $this),
          recieve_1 = $('.unload_box_1 .section_list', $this),
          recieve_2 = $('.nomenclature_box .section_list', $this),
          searchForm = $('.search_form', $(this)),
          searchButton = $('.search_button', searchForm),
          searchInp = $('input:text', searchForm),
          searchInpVal = searchInp.val(),
          cancel = $('.cancel_link', $this),
          unbind_but = $('.unbind_but', $this),
          notBindList = $('.not_bind .section_list', $this);

      // Загружаем файл на сервер
      $.ajax_upload(button, {
          action : '../php/priceUpload.php',
          name : 'myfile',
          onSubmit : function(file, ext) {

            this.disable();
            statusUpload.text('Закгрузка ' + file);
            dataArr = [];
            $('li', recieve_1).remove();
            $('li', recieve_2).remove();
            price_id = undefined;
            //updateInterval = setInterval(updateStatus, 500, progressLine);

          },
          onComplete : function(file, response) {
            this.enable();
            statusUpload.text('Закгрузка ' + file + ' завершена');
            outItems('../php/stat.php', $('.unload_box_1 .section_list', $this));
          }
        });

        createEvent(recieve_1);
        bindingItems(recieve_2);
        disBinding(recieve_1);

        // Поиск
        searchForm.on('click keyup', '.search_button, input[type="text"]', function(event){
          event.preventDefault();
          event.stopPropagation();

          var target = $(event.currentTarget);
          if( (event.type == 'keyup' && event.keyCode !== 13) || (event.type == 'click' && target.attr( 'type' ) == 'text' ) ) return false;

          if ( searchInp.val() == currentVal || searchInp.val() == '' ) return false;

          var currentVal = searchInp.val();

          $('.nomenclature_box .section_list li', $this).remove();

          $.get('../php/search.php', {text: currentVal}, function(data){

            for (var i = 0; i < data.items.length; i++){

              $('<li id="' + data.items[i].id + '">\
                      <span class="section_name">' +  data.items[i].name +'</span>\
                      <a class="change" href="#"></a>\
                    </li>').appendTo( recieve_2 );

            }

          }, 'json');

          searchInp.val(searchInpVal);
          
        })
        
        // Отмена перевязки
        cancel.click(function(){
           
          if (price_id == undefined) return false;

          var priceLi = $('.download_form .unload_box_1 .section_list li'),
              block = false;

           for ( var j = 0; j < priceLi.length; j++ ){
            if (priceLi.eq(j).attr('id') == price_id){
              block = true;
            }
           }

           if (block) return false;

          $.post('../php/delink.php', {price_id :price_id, item_id: item_id});

          var lastBind;

           for ( var i = 0; i < dataArr.items.length; i++ ){
            if ( dataArr.items[i].id == price_id ){
              lastBind = dataArr.items[i];
            }
           }

           $('<li id="' + lastBind.id + '">\
                      <span class="section_name">' +  lastBind.name +'</span>\
                      <a class="change" href="#"></a>\
                    </li>').appendTo( recieve_1 );

           if ( $('li', recieve_1).length == 1 ){
            updatePosition();
           }

          return false;
        })

        // Добавляем неперевязанные товары
        unbind_but.click(function(){

          var unbindArr = [],
              lis = $('li', notBindList);

          if (lis.length == 0) return false;

          for (var i = 0; i < lis.length; i++){
            unbindArr.push({
              id: parseInt(lis.eq(i).attr('id')),
              name: lis.eq(i).find('.section_name').text()
            })
          }

          $.post('../php/hold.php', {items: unbindArr});

          lis.remove();
          return false;

        })

        $this.on('submit',function(){
          return false;
        })

      })

    function createEvent(target){

        $('li', target).live('click', function(){

          if ( $(this).hasClass('active') ) return false;

          $(this).addClass('active').siblings().removeClass('active');

          $('.download_form .nomenclature_box .section_list li').remove();

          var currentId = $(this).attr('id');

          var currentObj = searchItem(dataArr, $('.active').attr('id'));
          createLine(currentObj);

        });

    }

    function searchItem(list, id){

      for (var i = 0; i < list.items.length; i++ ){
        if( list.items[i].id == id ) return list.items[i];
      }

    }

    function createLine(currentObj){

      for (var i = 0; i < currentObj.childs.length; i++ ){

        $('<li id="' + currentObj.childs[i].id + '">\
            <span class="section_name">' + currentObj.childs[i].name +'</span>\
            <a class="change" href="#"></a>\
          </li>').appendTo( $('.nomenclature_box .section_list') );

      }

    }

    function updateStatus(target){
       $.get('../php/stat.php', function(data){

          target.animate({width: data.percent + '%'});

          if( data.perсent == 100 ) {
            clearInterval(updateInterval);
          }

        }, 'json');

    }

    function outItems(list, target){

      $.get(list, function(data){

        dataArr = data;

        for (var i = 0; i < data.items.length; i++){

          $('<li id="' + data.items[i].id + '">\
                  <span class="section_name">' +  data.items[i].name +'</span>\
                  <a class="change" href="#"></a>\
                </li>').appendTo( target );

        }

      }, 'json');
    }

    function bindingItems(target){
      target.on('click dblclick', '.change, li', function(event){
          event.preventDefault();
          event.stopPropagation();

          var target = $(event.currentTarget);

          if ( target.is('li') ){
            $(this).addClass('active').siblings().removeClass('active');
          }

          if( (event.type == 'click' && target.attr('class') != 'change') || 
              // (event.type == 'dblclick' && event.currentTarget.localName != 'li') ||
              (event.type == 'dblclick' && event.target.parentNode.tagName != 'LI') ||
              (event.type == 'click' && target.parent().attr('class') != 'active')
          ) return false; 

          price_id = $('.download_form .unload_box_1 .active').attr('id'),
          item_id = $('.download_form .nomenclature_box .active').attr('id');

          $.post('../php/link.php', {price_id :price_id, item_id: item_id});

          updatePosition();

      })
    }

    function disBinding(target){
      $('.change', target).live('click', function(){

        var currentId = $(this).closest('li').attr('id'),
            currentName = $(this).closest('li').find('.section_name').text();

            $('<li id="' + currentId + '">\
                  <span class="section_name">' +  currentName +'</span>\
                </li>').appendTo( $('.download_form .not_bind .section_list') );

        updatePosition();
        return false;
      })

    }

    function updatePosition(){
      var price = $('.download_form .unload_box_1'),
          priceActive = $('.active', price);

        if( priceActive.index() ==  $('ul li', price).length - 1){
          priceActive.hide().prev().addClass('active');
        } else if ( $('ul li', price).length == 1 ){
          $('ul li', price).first().addClass('active')
        } else {
          priceActive.hide().next().addClass('active');
        }

        priceActive.filter(':hidden').remove();
        $('.download_form .nomenclature_box li').remove();

        if ( $('ul li', price).length == 0 ) return false;

        var currentObj = searchItem(dataArr, $('.active', price).attr('id'));
        createLine(currentObj);
    } 

    /**
    *     КОНЕЦ модуля выгрузки
    **/

    // всплыв попап на имени 2
    // $(".hintBoxInfo").each(function() {

    //     var $this = $(this),
    //         ico = $('.name_info.product_name', $this),
    //         popup = $('.content_bg_top.search_popup', $this),
    //         speed = 400,
    //         block = false;

    //     popup.hide();

    //     ico.mouseenter(function(){

    //         if(block) return false;
    //         block = true;

    //         popup.fadeIn(speed, function(){

    //             block = false;
    //         })
    //     })

    //     ico.mouseleave(function(){

    //         popup.fadeOut(speed);
    //     })

    // });
    function popupInfo(){
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
    }
    $('.hintBoxInfo').each(popupInfo);
    $('.product_view').each(popupInfo);
// product_view
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

});