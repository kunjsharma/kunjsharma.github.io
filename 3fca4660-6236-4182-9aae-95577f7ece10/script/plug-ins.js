//________________________________________________________________________________ Easing
/*
 * easing.js
 * https://github.com/danheberden/easing.js
 *
 * Copyright (c) 2012 Dan Heberden
 * Licensed under the MIT license.
 */
(function( window ){
  var easing = window.easing = function( type, amount, start, end ) {

      // what kind of easing fn?
      var parse = /(InOut|In|Out)(\w+)?/.exec( type ),
          easingFn = easy.In,
          map, kind;
      start = start || 0;
      end = end || 1;


      if ( parse ) {
        // get our easing mappings
        kind = parse[2];
        map = mappings[ kind ];

        // kind of easing function
        easingFn = easy[ parse[1] ];
      }

      map = map || [];

      // look up type in the easing object or default to linear
      // if it wasn't a custom function passed in
      if ( !type.call ) {
        type = map[0] || easing.easings[ type ] || function( p ){ return p; };
      }

      return amount <= 0 ? start : amount >= 1 ? end : easingFn( type, amount, map[1], map[2] ) * ( end - start ) + start;
    },

    easy = {
      In: function( fn, p, a, b) {
        return fn( p, a, b );
      },
      Out: function( fn, p, a, b ) {
        return 1 - fn( 1-p, a, b );
      },
      InOut: function( fn, p, a, b ) {
        return p < 0.5 ?
                 fn( p * 2, a, b ) / 2 :
                 fn( p * -2 + 2, a, b ) / -2 + 1;
      }
    },

     base = {
      s: function( p, amount, smooth ) {
        return 1 - Math.pow( Math.sqrt( 1 - Math.pow( p, amount || 2 ) ), smooth || 2 );
      },
      e: function( p, amount ) {
        return Math.sin( ( Math.PI * 2 ) - p * ( Math.PI * ( amount + amount - 0.5 ) ) ) * ( base.s( p, 2, 1 ) * 0.97 );
      },
      b: function( p, amount ) {
        var limit = 4 / 7 + amount / 50,
            mod = 1 + p / ( limit / ( Math.pow( 2, amount )-1 )),
            bounce = ~~( Math.log( mod ) / Math.log( 2 ) );
        if ( p > limit ){
          return 1 - base.s( 1 - ( -limit + p ) / ( 1 - limit ), 2 );
        } else {
          return Math.sqrt( 1 - Math.pow( 2 * ( mod / Math.pow( 2, bounce ) - 1 ) - 1 ,2) ) * base.s( ( ( bounce + 1 ) / amount ) * limit, 3 );
        }
      },
      back: function( p ) {
        return p * p * ( 3 * p - 2 );
      }
    },

    mappings = easing.mappings = {
      Quad : [ base.s, 2  ],
      Cubic : [ base.s, 3  ],
      Quart : [ base.s, 4  ],
      Quint : [ base.s, 5 ],
      Expo : [ base.s, 6, 1 ],
      Sine : [ base.s, 2 ],
      Circ : [ base.s, 2, 1 ],
      Elastic : [ base.e, 3 ],
      Bounce : [ base.b, 3 ],
      Back: [ base.back ]
    },

    $ = window.jQuery;

  // add easier to remember easing functions - easeIn1, easeInOut2, etc
  for ( var i = 1; i < 7; i++ ) {
    mappings[i] = [ base.s, i + 1, i > 4 ? 1 : 2 ];
  }

  easing.easings = {};

  if ( $ ) {
    // all the jqueries
    $.each( mappings, function( n ){
      $.each( easy, function( type ) {
        var name = "ease" + type + n;

        // make a jq version
        $.easing[name] = function( x, t, b, c, d ) {
          return easing( name, t/d, b, c-b );
        };
      });
    });
  }

}( this ));

//________________________________________________________________________________ Path
/*
 * jQuery css bezier animation support -- Jonah Fox
 * version 0.0.1
 * Released under the MIT license.
 */
/*
  var path = $.path.bezier({
    start: {x:10, y:10, angle: 20, length: 0.3},
    end:   {x:20, y:30, angle: -20, length: 0.2}
  })
  $("myobj").animate({path: path}, duration)

*/

;(function($){

  $.path = {};

  var V = {
    rotate: function(p, degrees) {
      var radians = degrees * Math.PI / 180,
        c = Math.cos(radians),
        s = Math.sin(radians);
      return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
    },
    scale: function(p, n) {
      return [n*p[0], n*p[1]];
    },
    add: function(a, b) {
      return [a[0]+b[0], a[1]+b[1]];
    },
    minus: function(a, b) {
      return [a[0]-b[0], a[1]-b[1]];
    }
  };

  $.path.bezier = function( params, rotate ) {
    params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
    params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];

    var v14 = V.minus( this.p4, this.p1 ),
      v12 = V.scale( v14, params.start.length ),
      v41 = V.scale( v14, -1 ),
      v43 = V.scale( v41, params.end.length );

    v12 = V.rotate( v12, params.start.angle );
    this.p2 = V.add( this.p1, v12 );

    v43 = V.rotate(v43, params.end.angle );
    this.p3 = V.add( this.p4, v43 );

    this.f1 = function(t) { return (t*t*t); };
    this.f2 = function(t) { return (3*t*t*(1-t)); };
    this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
    this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

    /* p from 0 to 1 */
    this.css = function(p) {
      var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
      css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.path.arc = function(params, rotate) {
    for ( var i in params ) {
      this[i] = params[i];
    }

    this.dir = this.dir || 1;

    while ( this.start > this.end && this.dir > 0 ) {
      this.start -= 360;
    }

    while ( this.start < this.end && this.dir < 0 ) {
      this.start += 360;
    }

    this.css = function(p) {
      var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
        css = {};

      if (rotate) {
        css.prevX = this.x;
        css.prevY = this.y;
      }
      css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
      css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
      css.left = css.x + "px";
      css.top = css.y + "px";
      return css;
    };
  };

  $.fx.step.path = function(fx) {
    var css = fx.end.css( 1 - fx.pos );
    if ( css.prevX != null ) {
      $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
    }
    fx.elem.style.top = css.top;
    fx.elem.style.left = css.left;
  };

})(jQuery);

//________________________________________________________________________________ Pie

// Generated by CoffeeScript 1.6.3
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.5

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/

(function($) {
  $.easyPieChart = function(el, options) {
    var addScaleLine, animateLine, drawLine, easeInOutQuad, rAF, renderBackground, renderScale, renderTrack,
      _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function() {
      var percent, scaleBy;
      _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
      percent = parseInt(_this.$el.data('percent'), 10);
      _this.percentage = 0;
      _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
      _this.$el.append(_this.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
        G_vmlCanvasManager.initElement(_this.canvas);
      }
      _this.ctx = _this.canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        $(_this.canvas).css({
          width: _this.options.size,
          height: _this.options.size
        });
        _this.canvas.width *= scaleBy;
        _this.canvas.height *= scaleBy;
        _this.ctx.scale(scaleBy, scaleBy);
      }
      _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
      _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
      _this.$el.addClass('easyPieChart');
      _this.$el.css({
        width: _this.options.size,
        height: _this.options.size,
        lineHeight: "" + _this.options.size + "px"
      });
      _this.update(percent);
      return _this;
    };
    this.update = function(percent) {
      percent = parseFloat(percent) || 0;
      if (_this.options.animate === false) {
        drawLine(percent);
      } else {
        if (_this.options.delay) {
          animateLine(_this.percentage, 0);
          setTimeout(function() {
            return animateLine(_this.percentage, percent);
          }, _this.options.delay);
        } else {
          animateLine(_this.percentage, percent);
        }
      }
      return _this;
    };
    renderScale = function() {
      var i, _i, _results;
      _this.ctx.fillStyle = _this.options.scaleColor;
      _this.ctx.lineWidth = 1;
      _results = [];
      for (i = _i = 0; _i <= 24; i = ++_i) {
        _results.push(addScaleLine(i));
      }
      return _results;
    };
    addScaleLine = function(i) {
      var offset;
      offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
      _this.ctx.save();
      _this.ctx.rotate(i * Math.PI / 12);
      _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
      _this.ctx.restore();
    };
    renderTrack = function() {
      var offset;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.strokeStyle = _this.options.trackColor;
      _this.ctx.lineWidth = _this.options.lineWidth;
      _this.ctx.stroke();
    };
    renderBackground = function() {
      if (_this.options.scaleColor !== false) {
        renderScale();
      }
      if (_this.options.trackColor !== false) {
        renderTrack();
      }
    };
    drawLine = function(percent) {
      var offset;
      renderBackground();
      _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
      _this.ctx.lineCap = _this.options.lineCap;
      _this.ctx.lineWidth = _this.options.lineWidth;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.save();
      _this.ctx.rotate(-Math.PI / 2);
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
      _this.ctx.stroke();
      _this.ctx.restore();
    };
    rAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    animateLine = function(from, to) {
      var anim, startTime;
      _this.options.onStart.call(_this);
      _this.percentage = to;
      Date.now || (Date.now = function() {
        return +(new Date);
      });
      startTime = Date.now();
      anim = function() {
        var currentValue, process;
        process = Math.min(Date.now() - startTime, _this.options.animate);
        _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
        renderBackground.call(_this);
        currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
        _this.options.onStep.call(_this, currentValue);
        drawLine.call(_this, currentValue);
        if (process >= _this.options.animate) {
          return _this.options.onStop.call(_this, currentValue, to);
        } else {
          return rAF(anim);
        }
      };
      rAF(anim);
    };
    easeInOutQuad = function(t, b, c, d) {
      var easeIn, easing;
      easeIn = function(t) {
        return Math.pow(t, 2);
      };
      easing = function(t) {
        if (t < 1) {
          return easeIn(t);
        } else {
          return 2 - easeIn((t / 2) * -2 + 2);
        }
      };
      t /= d / 2;
      return c / 2 * easing(t) + b;
    };
    return this.init();
  };
  $.easyPieChart.defaultOptions = {
    barColor: '#ef1e25',
    trackColor: '#f2f2f2',
    scaleColor: '#dfe0e0',
    lineCap: 'round',
    rotate: 0,
    size: 110,
    lineWidth: 3,
    animate: false,
    delay: false,
    onStart: $.noop,
    onStop: $.noop,
    onStep: $.noop
  };
  $.fn.easyPieChart = function(options) {
    return $.each(this, function(i, el) {
      var $el, instanceOptions;
      $el = $(el);
      if (!$el.data('easyPieChart')) {
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
      }
    });
  };
  return void 0;
})(jQuery);

//________________________________________________________________________________ Rating
var selected_ratings = new Array();
(function($){
 	$.fn.extend({ 
 		//plugin name - ratings
 		ratings: function(options) {
			var defaults = {
			    overall_rating: 3,
           		current_rating: 0,
				disable: 'false',
				type:'large',
				rated:'true',
			};
			$(this).empty();
			for(i=0;i<5;i++){
				var img = $('<img class="rate_star'+i+'">');
				img.attr('src', '');
				img.appendTo(this);
			}
			var options = $.extend(defaults, options);
    		return this.each(function() {
				  var o =options;
				  var obj = $(this);				
				  var items = $("img", obj);
				  var parentObj = "#"+this.id;
					if(o.type=="small"){
					  var grey_star = "images/star_small_grey.png";
					  var black_star = "images/star_small_black.png";
					  var yellow_star = "images/star_small_yellow.png";
					}else{
					  var grey_star = "images/star_big_grey.png";
					  var black_star = "images/star_big_black.png";
					  var yellow_star = "images/star_big_yellow.png";	
					}
				  $(items).attr('src',grey_star)
				  if(o.type=="small"){
				  	$(items).css({"float":"left","padding":"2px 2px 3px 0","display":"block"});
				  }else{
					$(items).css({"float":"left","padding":"0px 5px 0 0","display":"block"});  
				  }
				  for(i=0; i<o.overall_rating; i++){ 
					$(this).children("img.rate_star"+i).attr('src',black_star)					   
				  }
				  $(items).each(function(index){
						if(o.disable=='false'){
							$(items).css({"cursor":"pointer"});
							if(o.rated=='true'){
								for(i=0; i<o.current_rating; i++){ 
									$(this).children("img.rate_star"+i).attr('src',yellow_star)					   
								}
							}
							$(this).mouseover(function(){					   
								$(items).attr('src',grey_star)								   
								for(i=0; i<o.overall_rating; i++){ 
									$(parentObj+" img.rate_star"+i).attr('src',black_star)					   
								}
								for(i=0; i<=index; i++){					   
									$(parentObj+" img.rate_star"+i).attr('src',yellow_star)					   
								}
							})
							$(this).mouseout(function(){				  
								if(selected_ratings.length!=0){
									$(items).attr('src',grey_star)
									for(i=0; i<o.overall_rating; i++){ 
										$(parentObj+" img.rate_star"+i).attr('src',black_star)					   
									}
									jQuery.each(selected_ratings, function() {
										$(parentObj+" img.rate_star"+this).attr('src',yellow_star)										   
									})
									
								}else{
									$(items).attr('src',grey_star)
									for(i=0; i<o.overall_rating; i++){ 
										$(parentObj+" img.rate_star"+i).attr('src',black_star)					   
									}
									for(i=0; i<o.overall_rating;i++){
										$(parentObj+" img.rate_star"+i).attr('src',black_star)	
									}
								}
							})
							$(this).click(function(){
								selected_ratings=[];				   
								for(i=0; i<=index; i++){
									$(parentObj+" img.rate_star"+i).attr('src',yellow_star);
									selected_ratings[i]=i;
								}
							})
						}
				  })
    		});
    	}
	});
})(jQuery);

//________________________________________________________________________________ Check scrollbar
(function($) {
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	}
})(jQuery); 
//________________________________________________________________________________ Add more here
$.fn.ellipsis = function()
{
	return this.each(function()
	{
		var el = $(this);

		if(el.css("overflow") == "hidden")
		{
			var text = el.html();
			var multiline = el.hasClass('multiline');
			var t = $(this.cloneNode(true))
				.hide()
				.css('position', 'absolute')
				.css('overflow', 'visible')
				.width(multiline ? el.width() : 'auto')
				.height(multiline ? 'auto' : el.height())
				;

			el.after(t);
			
			//
			console.log('plug-ins: t.width(): ' + t.width() + ' text: '+ text);
			console.log('plug-ins: t.height(): ' + t.height());
			
			function height() { return t.height() > el.height(); };
			function width() { return (t.width()+2) > el.width(); };

			var func = multiline ? height : width;

			while (text.length > 0 && func())
			{
				text = text.substr(0, text.length - 1);
				t.html(text + "...");
			}

			el.html(t.html());
			t.remove();
		}
	});
};
