//Custom Rating Plugin
(function($){
 	$.fn.extend({ 
 		//plugin name - ratings
 		ratings: function(options) {
			var defaults = {
			    overall_rating: 3,
           		current_rating: 0,
				disable: 'false',
			};
			for(i=0;i<5;i++){
				var img = $('<img class="rate_star'+i+'">');
				img.attr('src', '');
				img.appendTo(this);
			}
			var options = $.extend(defaults, options);
			var selected_ratings = new Array();
			var grey_star = "images/star_big_grey.png";
			var black_star = "images/star_big_black.png";
			var yellow_star = "images/star_big_yellow.png";
    		return this.each(function() {
				  var o =options;
				  var obj = $(this);				
				  var items = $("img", obj);
				  var parentObj = "#"+this.id;
				  $(items).attr('src',grey_star)
				  $(items).css({"float":"left","padding":"0px 5px 0 0"});
				  for(i=0; i<o.overall_rating; i++){ 
					$(this).children("img.rate_star"+i).attr('src',black_star)					   
				  }
				  $(items).each(function(index){
						if(o.disable=='false'){
							$(items).css({"cursor":"pointer"});
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