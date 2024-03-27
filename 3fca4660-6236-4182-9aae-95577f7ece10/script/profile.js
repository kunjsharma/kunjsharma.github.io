/**
 * @author Jay.Bhardwaj
 */
 function profileMain() {
	 var m_oTabBtn=new Array('w_oLearning-Tab', 'w_oAccreditation-Tab');
	 //, 'w_oCommunity-Tab'
	 var m_oTabArea = new Array('w_oLearning', 'w_oAccreditation');
	 //, 'w_oCommunity'
	 
	 var m_oAccordionData = {
		"community":[{
				"name":"Onboarding",
				"status":"In progress",
				"subSection":[{
					"communityName":"Nokia Brand Ambassadorship",
					"buttonName":"view",
					"accState":"",
					"locked":"false",
					"Percentage":"85%",
					"Learnings":[{
								"name":"Nokia Lumia Windows Phone Devices",
								"type":"video",
								"accState":"",
								"buttonLabel":"Launch",
								"Status":"c",
								"Score":""
								},
								{
								"name":"Nokia Asha Devices",
								"type":"video",
								"accState":"",
								"buttonLabel":"Launch",
								"Status":"s",
								"Score":""
								},
								{
								"name":"Nokia Symbian and Mobile Phone Devices",
								"accState":"",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"n",
								"Score":""
								},
								{
								"name":"Nokia Devices & Solutions Expertise Quiz ",
								"accState":"Achieved",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"c",
								"completionPercent":"90%"
								}]
					
				},
				{
					"communityName":"Nokia Brand Ambassadorship",
					"buttonName":"view",
					"accState":"",
					"locked":"false",
					"Percentage":"85%",
					"Learnings":[{
								"name":"Nokia Lumia Windows Phone Devices",
								"accState":"",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"c",
								"Score":""
								},
								{
								"name":"Nokia Asha Devices",
								"accState":"",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"s",
								"Score":""
								},
								{
								"name":"Nokia Symbian and Mobile Phone Devices",
								"accState":"",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"n",
								"Score":""
								},
								{
								"name":"Nokia Devices & Solutions Expertise Quiz ",
								"accState":"Achieved",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"c",
								"completionPercent":"90%"
								}]
					
				}]
				
			},
			{
				"name":"Advanced",
				"status":"Achieved",
				"subSection":[{
					"communityName":"Nokia Brand Ambassadorship",
					"buttonName":"view",
					"accState":"Achieved",
					"locked":"false",
					"Percentage":"85%",
					"Learnings":[{
								"name":"Nokia Lumia Windows Phone Devices",
								"accState":"",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"c",
								"Score":""
								},
								{
								"name":"Nokia Asha Devices",
								"accState":"",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"s",
								"Score":""
								},
								{
								"name":"Nokia Symbian and Mobile Phone Devices",
								"accState":"",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"n",
								"Score":""
								},
								{
								"name":"Nokia Devices & Solutions Expertise Quiz ",
								"accState":"Achieved",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"c",
								"completionPercent":"90%"
								}]
					
				},
				{
					"communityName":"Nokia Brand Ambassadorship",
					"buttonName":"view",
					"accState":"Required",
					"locked":"true",
					"Percentage":"85%",
					"Learnings":[{
								"name":"Nokia Lumia Windows Phone Devices",
								"accState":"Required",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"c",
								"Score":""
								},
								{
								"name":"Nokia Asha Devices",
								"accState":"Required",
								"type":"video",
								"buttonLabel":"Launch",
								"Status":"s",
								"Score":""
								},
								{
								"name":"Nokia Symbian and Mobile Phone Devices",
								"accState":"Required",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"n",
								"Score":""
								},
								{
								"name":"Nokia Devices & Solutions Expertise Quiz ",
								"accState":"Required",
								"type":"e-Learning",
								"buttonLabel":"Launch",
								"Status":"c",
								"completionPercent":"90%"
								}]
					
				}]
				
			}]

		}
		htmlCode="";
	/**
	 * 
	 */
	$( document ).ready( function() {
		//if(window.console) console.log('document Ready... Profile.JS');
		for(i=0; i<m_oTabBtn.length; i++)
		{
			idBtn=m_oTabBtn[i];
			$("#"+idBtn).bind('click', openTab);
			if(window.console) console.log("Bind... "+idBtn);
		}
		hideOtherTabs()
		
		
		for(k=0; k<m_oAccordionData.community.length; k++){
			if(k==0)
			{
				htmlCode+="<li><a href='#"+k+"' class='active'><div class='w_cLearningsName_0'><span>"+m_oAccordionData.community[k].name+"</span></div>";
			}
			else{
				htmlCode+="<li><a href='#"+k+"'><div class='w_cLearningsName_0'><span>"+m_oAccordionData.community[k].name+"</span></div>";
			}
			htmlCode+="<span class='w_cLearningsStatus_0'>"+m_oAccordionData.community[k].status+"</span></a>";
			if(m_oAccordionData.community[k].status=="Achieved")
			{
				htmlCode+="<span class='w_cLearningsCert' onclick='javascript:parent.main.displayCertificatePopup(); return false;'>Certificate</span>";
			}
			
			htmlCode+="<ul class='w_cInnerUl'>";
			
			for(j=0; j<m_oAccordionData.community[k].subSection.length; j++)
			{
				htmlCode+="<li>";
					htmlCode+="<a href='#"+k+"_"+j+"' style='float:left;'><span class='w_cLearningsName'>"+m_oAccordionData.community[k].subSection[j].communityName+"</span>";
					
						if(m_oAccordionData.community[k].subSection[j].accState==""){
							htmlCode+="<span class='w_cAccState w_cBlank'>&nbsp;</span>";
						}
						if(m_oAccordionData.community[k].subSection[j].accState=="Achieved"){
							htmlCode+="<span class='w_cAccState w_ccolorBlue'>Achieved</span>";
						}
						if(m_oAccordionData.community[k].subSection[j].accState=="Required"){
							htmlCode+="<span class='w_cAccState w_ccolorPink'>Required</span>";
						}
						htmlCode+="</a>"
						if(m_oAccordionData.community[k].subSection[j].locked=="false")
						{
							//htmlCode+="<span class='w_cLearningBtn' >"+m_oAccordionData.community[k].subSection[j].buttonName+"</span>";	
							htmlCode+="<span class='w_cLearningBtn' id='w_oComBtn"+j+"'>"+m_oAccordionData.community[k].subSection[j].buttonName+"</span>";	
						} else {
							//htmlCode+="<span class='w_cLearningBtnDisable'>"+m_oAccordionData.community[k].subSection[j].buttonName+"</span>";	
							htmlCode+="<span class='w_cLearningBtnDisable' id='w_oComBtn"+j+"'>"+m_oAccordionData.community[k].subSection[j].buttonName+"</span>";	
						}
						htmlCode+="<a href='#"+k+"_"+j+"' style='float:left;'><span class='w_cLearningPercentage_0'>"+m_oAccordionData.community[k].subSection[j].Percentage+"</span></a>";
						htmlCode+="<div class='w_cLearningArea'>";
						//htmlCode+="<p>"+m_oAccordionData.community[k].subSection[j].buttonName+"</p>";
							
				
						for(l=0; l<m_oAccordionData.community[k].subSection[j].Learnings.length; l++){
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].type=="video")
							{
								imgSrc='images/profile_video_icon.png';
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].type=="e-Learning")
							{
								imgSrc='images/profile_e-learning_icon.png';
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].type=="disscussion")
							{
								imgSrc='images/profile_disscussion_icon.png';
							}
							htmlCode+="<div class='w_cRowLearning'><img src='"+imgSrc+"' style='float:left;'/>";	
							htmlCode+="<div class='w_cRowLi'><span class='w_cLearningsName_1' style='float:left;'>"+m_oAccordionData.community[k].subSection[j].Learnings[l].name+"</span></div>";
							
							
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].accState==""){
								htmlCode+="<span class='w_cAccState w_cBlank'>&nbsp;</span>";
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].accState=="Achieved"){
								htmlCode+="<span class='w_cAccState w_ccolorBlue'>Achieved</span>";
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].accState=="Required"){
								htmlCode+="<span class='w_cAccState w_ccolorPink'>Required</span>";
							}
							if(m_oAccordionData.community[k].subSection[j].locked=="false")
							{
								htmlCode+="<span class='w_cLearningBtn'>"+m_oAccordionData.community[k].subSection[j].Learnings[l].buttonLabel+"</span>";
								//htmlCode+="<span class='w_cLearningBtn' id='"+l+"'>"+m_oAccordionData.community[k].subSection[j].Learnings[l].buttonLabel+"</span>";	
							} else {
								htmlCode+="<span class='w_cLearningBtnDisable'>"+m_oAccordionData.community[k].subSection[j].Learnings[l].buttonLabel+"</span>";	
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].Status=="n"){
								StatusIconSrc='images/learning_status_n.png';
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].Status=="s"){
								StatusIconSrc='images/learning_status_s.png';
							}
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].Status=="c"){
								StatusIconSrc='images/learning_status_c.png';
							}
							
							htmlCode+="<img src='"+StatusIconSrc+"' style='float:left;'/>";
							
							if(m_oAccordionData.community[k].subSection[j].Learnings[l].completionPercent!=undefined){
								htmlCode+="<span class='w_cLearningPercentage'>"+m_oAccordionData.community[k].subSection[j].Learnings[l].completionPercent+"</span>";
							}
							htmlCode+="</div>";
						}
						htmlCode+="</div>";
				htmlCode+="</li>";
			}
			htmlCode+="</ul></li>";
		}
		$(".accordion").html(htmlCode);
		$('ul').accordion();
		showTab(m_oTabArea[0]);
		
		$("#w_oEdit").click(function(){
			editProfile('edit');
		});
		$("#w_oSave").click(function(){
			editProfile('save');
		});
		$(".w_cEditProfileSettings").click(function(){
			$("#w_oEditSection").slideToggle(function(){
				parent.iframeLoaded();
			});
			$("#w_oPasswordEditSection").hide();
			$("#w_oPasswordEditMessage").hide();
			
		});
		$("#w_oChangePassword").click(function(){
			$("#w_oPasswordEditSection").slideToggle();
			$("#w_oPasswordEditMessage").hide();
		});
		$("#w_oSavePass").click(function(){
			$("#w_oPasswordEditSection").slideUp();
			$("#w_oPasswordEditMessage").fadeIn('slow');
			$("#w_oPasswordEditMessage #w_oMessageText").html("Your Password has beed updated");
			t = setTimeout(function(){$("#w_oPasswordEditMessage").fadeOut('slow')},4000);
		});
		/*$("#ExAll").click(function(){
			expendAll();
		});
		$("#CallAll").click(function(){
			collapseAll();
		});*/
		var isCollapsed = true;
		$('#toggleAll').click(function(){
			if(isCollapsed) {
				$('.toggleAllContLeft').html('<span>HIDE ALL</span>');
				$('.toggleAllContRight').css('background-position','right 0px');
				expendAll();
				isCollapsed = false;
			} else {
				$('.toggleAllContLeft').html('<span>EXPAND ALL</span>');
				$('.toggleAllContRight').css('background-position','right -23px');
				collapseAll();
				isCollapsed = true;
			}
			parent.iframeLoaded();
		});
		/////
		$('.w_cLearningBtn').click(function(e){
			window.parent.main.onCommunityButtonClick(e);
			window.parent.$("#w_oProfileFrame").hide();


		});
		//
		adjustCommHeaders();
	});
	/**
	*
	*
	**/
	(function(jQuery){
	 jQuery.fn.extend({  
		 accordion: function() {       
			return this.each(function() {
				
				var $ul = $(this);
				
				if($ul.data('accordiated'))
					return false;
													
				$.each($ul.find('ul, li>div'), function(){
					$(this).data('accordiated', true);
					$(this).hide();
				});
				
				$.each($ul.find('a'), function(){
					$(this).click(function(e){
						activate(this);
						
						return void(0);
					});
				});
				
				var active = $('.active');
				if(active){
					activate(active, 'toggle');
					
					//$(active).parents().show();
				}
				
				function activate(el, effect){
					if (!effect) {
					  $(el)
					   .toggleClass('active');
					   
					   /* $(el)
					   .toggleClass('active')
					   .parent('li')
					   .siblings()
					   .find('a')
					   .removeClass('active')
					   .parent('li')
					   .children('ul, div')
					   .slideUp('fast');
					   */
					   //alert($(el).hasClass("active"))
					   if($(el).hasClass("active"))
					   {
							$(el).parent('li').css('background-image','url(images/profile_accordion_open.png)')
							$(el).parent('li').css('background-repeat','no-repeat')
							$(el).parent('li').css('background-position','right 9px')
					   }else{
							$(el).parent('li').css('background-image','url(images/profile_accordion_close.png)')
							$(el).parent('li').css('background-repeat','no-repeat')
							$(el).parent('li').css('background-position','right 12px')
					   }
					}
				  $(el).siblings('ul, div')[(effect || 'slideToggle')]((!effect)?'fast':null);
				   if($(el).hasClass("active"))
				   {
						$(el).parent('li').css('background-image','url(images/profile_accordion_open.png)')
						$(el).parent('li').css('background-repeat','no-repeat')
						$(el).parent('li').css('background-position','right 9px')
				   }else{
						$(el).parent('li').css('background-image','url(images/profile_accordion_close.png)')
						$(el).parent('li').css('background-repeat','no-repeat')
						$(el).parent('li').css('background-position','right 12px')
				   }
				}
				
			});
		} 
	}); 
	})(jQuery);

	
	/**
	 * 
	 */
	 function activate_out(el, effect){
		if (!effect) {
		  $(el).toggleClass('active');

		   if($(el).hasClass("active"))
		   {
				$(el).parent('li').css('background-image','url(images/profile_accordion_open.png)')
				$(el).parent('li').css('background-repeat','no-repeat')
				$(el).parent('li').css('background-position','right 9px')
		   }else{
				$(el).parent('li').css('background-image','url(images/profile_accordion_close.png)')
				$(el).parent('li').css('background-repeat','no-repeat')
				$(el).parent('li').css('background-position','right 12px')
		   }
		}
		$(el).siblings('ul, div')[(effect || 'slideToggle')]((!effect)?'fast':null, function(){parent.iframeLoaded()});
	   if($(el).hasClass("active"))
	   {
			$(el).parent('li').css('background-image','url(images/profile_accordion_open.png)')
			$(el).parent('li').css('background-repeat','no-repeat')
			$(el).parent('li').css('background-position','right 9px')
	   }else{
			$(el).parent('li').css('background-image','url(images/profile_accordion_close.png)')
			$(el).parent('li').css('background-repeat','no-repeat')
			$(el).parent('li').css('background-position','right 12px')
	   }
	   //setTimeout(parent.iframeLoaded(), 3000);
	   //alert("Called");
	}
				
	function expendAll()
	{
		$.each($(".accordion").find('a'), function(){
			$(this).addClass('active');
			activate_out($(this), 'slideDown');
		});
		//parent.iframeLoaded();
	}
	function collapseAll()
	{
		$.each($(".accordion").find('a'), function(){
			$(this).removeClass('active');
			activate_out($(this), 'slideUp')
			//parent.iframeLoaded();
		});
	}
	function openTab(){
		//if(window.console) console.log('openTab' + this.id);
		var m_oTabId=this.id;
		m_oTabId=m_oTabId.split("-Tab");
		hideOtherTabs()
		showTab(m_oTabId[0])
	}
	function hideOtherTabs()
	{
		for(i=0; i<m_oTabArea.length; i++)
		{
			id=m_oTabArea[i];
			$("#"+id).hide();
			if(window.console) console.log("hideOtherTabs "+id);
		}
		parent.iframeLoaded()
	}
	function showTab(arg){
		id=String(arg);
		if(window.console) console.log('showTab ' + arg);
		$('#'+id).show();
		setPointer($('#'+id+"-Tab").position().left, $('#'+id+"-Tab").width());
		parent.iframeLoaded();
		$(".w_cLearningsCert").css("left", ($(".w_cLearningsName_0 span").width()+10)+"px");
	}
	function setPointer(p_nPos, p_nWidth) {
		var _nPointerLeft = (p_nPos + ((p_nWidth/2) - 14)-53);
		//alert("Left:"+p_nPos+ " + Width:" +p_nWidth+"="+_nPointerLeft)
		$('.w_cProfileATCHeadingPointer').css('margin-left', _nPointerLeft);
	}
	function editProfile(arg)
	{
		//alert(arg)
		if(arg=="edit"){
			$("#w_oProfileInformation").hide();
			$("#w_oProfileInformationEdit").show();
			$(".fileUpload").show();
			$("#w_oUserName").focus();
			var $field = $("#w_oUserName"),
				oldVal = $field.val();
			$field.focus().val('').val(oldVal);
		}else{
			$("#w_oProfileInformation").show();
			$("#w_oProfileInformationEdit").hide();
			$(".fileUpload").hide();
		}		
	}
	/**
	 * 
	 */
	function adjustCommHeaders() {
		var _nMaxHeight=0;
		$('.w_cTcHeading').each(function() {
		    if($(this).height() >_nMaxHeight) {
		    	_nMaxHeight = $(this).height();
		    }
		});
		$('.w_cTcHeading').height(_nMaxHeight);
	}
	
}
var profileMain = new profileMain();
function PreviewImage() {
	var oFReader = new FileReader();
	oFReader.readAsDataURL(document.getElementById("w_oProfilePicture").files[0]);

	oFReader.onload = function (oFREvent) {
		document.getElementById("w_oUploadPreview").src = oFREvent.target.result;
		document.getElementById("w_oUploadPreview").style.height="160px";
		document.getElementById("w_oUploadPreview").style.width="160px";
	};
};

//Function for Select list added by dipendra
function enableSelectBoxes(){
	$('div.selectBox').each(function(){
		$(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
		$(this).attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
		
		$(this).children('span.selected,span.selectArrow').click(function(e){
			e.stopPropagation();																		  
			if($(this).parent().children('div.selectOptions').css('display') == 'none'){
				$(this).parent().children('div.selectOptions').css('display','block');
			}
			else
			{
				$(this).parent().children('div.selectOptions').css('display','none');
			}
		});
		
		$(this).find('span.selectOption').click(function(e){
			e.stopPropagation();														 
			$(this).parent().css('display','none');
			$(this).closest('div.selectBox').attr('value',$(this).attr('value'));
			$(this).parent().siblings('span.selected').html($(this).html());
		});
															 
	});				
}

$(document).ready(function() {
	enableSelectBoxes();
	$(document).click(function(e) {
		$('div.selectBox').children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
		$('div.selectBox').attr('value',$(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));	
		$('div.selectBox').children('div.selectOptions').css('display','none');
	});	
});