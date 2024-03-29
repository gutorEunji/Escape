/*-------------------------------------
	*  jQuery Animated Number
	*  Developers: Arun David, Boobalan
	-------------------------------------*/
	var window_vie = $(window);
	
	window_vie.on("load",function(){
		$(document).scrollzipInit();
		$(document).rollerInit();
	});
	window_vie.on("load scroll resize", function(){
		$('.numscroller').scrollzip({
			showFunction    :   function() {
				numberRoller($(this).attr('data-slno'));
			},
			wholeVisible    :     false,
		});
	});
	$.fn.scrollzipInit=function(){
		$('body').prepend("<div style='position:fixed;top:0;left:0;width:0;height:0;' id='scrollzipPoint'></div>" );
	};
	$.fn.rollerInit=function(){
		var i=0;
		$('.numscroller').each(function() {
			i++;
			$(this).attr('data-slno',i);
			$(this).addClass("roller-title-number-"+i);
		});
	};
	$.fn.scrollzip = function(options){
		var settings = $.extend({
			showFunction    : null,
			hideFunction    : null,
			showShift       : 0,
			wholeVisible    : false,
			hideShift       : 0
		}, options);
		return this.each(function(i,obj){

			var numbers = $('#scrollzipPoint');
			if (numbers.length) {

				$(this).addClass('scrollzip');
				if (!(!$.isFunction(settings.showFunction) || $(this).hasClass('isShown') || window_vie.outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift <= $(this).offset().top + (settings.wholeVisible ? $(this).outerHeight() : 0) || $('#scrollzipPoint').offset().top + (settings.wholeVisible ? $(this).outerHeight() : 0) >= $(this).outerHeight() + $(this).offset().top - settings.showShift)) {
					$(this).addClass('isShown');
					settings.showFunction.call(this);
				}
				if ($.isFunction(settings.hideFunction) && $(this).hasClass('isShown') && (window_vie.outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift < $(this).offset().top + (settings.wholeVisible ? $(this).outerHeight() : 0) || $('#scrollzipPoint').offset().top + (settings.wholeVisible ? $(this).outerHeight() : 0) > $(this).outerHeight() + $(this).offset().top - settings.hideShift)) {
					$(this).removeClass('isShown');
					settings.hideFunction.call(this);
				}
				return this;
			}
		});
	};

	function numberRoller(slno){
		var min=$('.roller-title-number-'+slno).attr('data-min');
		var max=$('.roller-title-number-'+slno).attr('data-max');
		var timediff=$('.roller-title-number-'+slno).attr('data-delay');
		var increment=$('.roller-title-number-'+slno).attr('data-increment');
		var numdiff=max-min;
		var timeout=(timediff*1000)/numdiff;
	
		numberRoll(slno,min,max,increment,timeout);
	}
	function numberRoll(slno,min,max,increment,timeout){//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
		if(min<=max){
			$('.roller-title-number-'+slno).html(min);
			min=parseInt(min, 10)+parseInt(increment, 10)
			setTimeout(function(){numberRoll(eval(slno),eval(min),eval(max),eval(increment),eval(timeout))},timeout);
		}else{
			$('.roller-title-number-'+slno).html(max);
		}
	}
