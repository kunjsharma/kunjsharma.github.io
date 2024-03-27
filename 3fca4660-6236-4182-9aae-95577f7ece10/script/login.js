/**
 * @author Kunj.Sharma
 */
function Main() {
	var m_nCommunities = 5;
	var m_oClickedCommunity;
	var m_nCurrentCommunityId = 3;
	var m_sCommunityPrefix = 'w_oComBtn';
	var m_aCommTitles = [];
	var m_nRadius = 330;
	var m_nAxis = 260;
	var m_nGap = -22;
	var m_nStartDegree = 147;
	var m_nShowTime = 1500;
	var m_nLogoPosition = 2;
	var m_oLRoot = this;
	var m_oCommunityData = {
		"community":[{
			"id" : "0",
			"title" : "Nokia Way",
			"data2" : ""
		},
		{
			"id" : "1",
			"title" : "Personal Effectiveness",
			"data2" : ""
		},
		{
			"id" : "2",
			"title" : "Asha",
			"data2" : ""
		},
		{
			"id" : "3",
			"title" : "Windows Phone",
			"data2" : ""
		},
		{
			"id" : "4",
			"title" : "Mobile Tech Basics",
			"data2" : ""
		}
		]
	}
	/**
	 * 
	 */
	$( document ).ready( function( ) {
		processData();
		//hideAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nEndDegree, p_nDir, p_nTime)
		//hideAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, 0, 160, -1, 0);
		//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, 30, 220, -1);
		//drawOnCircumfrence(332, 'w_oCircle01C', 'w_oCircle01', -1.20, 16);
		animateDOMObjects();
	});
	/**
	 * Description: 
	 * 
	 */
	function processData() {
		m_nCommunities = m_oCommunityData.community.length;
		m_aCommTitles = [];
		for(var j in m_oCommunityData.community) {
			m_aCommTitles.push(m_oCommunityData.community[j].title);
		}
		//manageGap();
		//createDomElements();
	}
	/**
	 * Description:	0 - left
	 * 				1 - center
	 * 				2 - right 
	 */
	function setLogoPosition(p_nPos) {
		var _oLC = $('#w_oLogoContainer');
		//Fixed height of logo
		_oLC.find('img').css('height', '103px');
		switch (p_nPos) {
			case 0:
				_oLC.css({
					'text-align': 'left'
				});
				break;
			case 1:
				_oLC.css({
					'text-align': 'center',
					'padding-right': '106px'
				});
				break;
			case 2:
				/*
				var _nLCWidth = _oLC.width();
				var _nLogoWidth = Math.round(_oLC.find('img').width());
				var _nPL = (_nLCWidth - _nLogoWidth - 55);
				_oLC.css({
					'padding-left': _nPL
				});
				*/
				_oLC.css({
					'text-align': 'right',
					'padding-right': '55px'
				});
				break;
			default:
				_oLC.css({
					'text-align': 'left'
				});
				break;
		}
	}
	/**
	 * 
	 */
	function manageGap() {
		if(m_nCommunities>14 && m_nGap<=-22) {
			m_nGap = - 280/m_nCommunities;
		}
	}
	function movePointer() {
		$('#w_Link1').click(function(){
			//$('#w_oData6').removeClass('w_oLayout08B w_oLayout08C').addClass('w_oLayout08A');									 
			$('#w_oData6').switchClass( "w_oLayout08B w_oLayout08C", "w_oLayout08A", 100, "easeInOutQuad");
			$('div.w_oSignInBlock').show();
			$('div.w_oForgotPassInBlock').hide();
			$('div.w_oRegisterInBlock').hide();
		});
		$('#w_Link2').click(function(){
			//$('#w_oData6').removeClass('w_oLayout08A w_oLayout08C').addClass('w_oLayout08B');
			$('#w_oData6').switchClass( "w_oLayout08A w_oLayout08C", "w_oLayout08B", 100, "easeInOutQuad");
			$('div.w_oSignInBlock').hide();
			$('div.w_oForgotPassInBlock').show();
			$('div.w_oRegisterInBlock').hide();
		});
		$('#w_Link3').click(function(){
			//$('#w_oData6').removeClass('w_oLayout08A w_oLayout08B').addClass('w_oLayout08C');
			$('#w_oData6').switchClass( "w_oLayout08A w_oLayout08B", "w_oLayout08C", 100, "easeInOutQuad");
			$('div.w_oSignInBlock').hide();
			$('div.w_oForgotPassInBlock').hide();
			$('div.w_oRegisterInBlock').show();
		});
		$('.w_oButton2').click(function(){
			window.location.href="home.htm";
		});
	}
	/**
	 * Description: 
	 * 
	 */
	function createDomElements() {
		removeElements(m_sCommunityPrefix, 1, m_nCommunities);
		for (var k=0; k < m_nCommunities; k++) {
			if(k==0) $('#'+m_sCommunityPrefix+k +' p').text(m_aCommTitles[k]);
			else $('#w_oCommsHolder').append("<div id="+ m_sCommunityPrefix+ k + " class='w_cComBtn'><p class='w_cComBtnData'>"+ m_aCommTitles[k]+"</p></div>");
		};
	}
	/**
	 * Description: 
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 * @param {Object} p_nEndDegree
	 * @param {Object} p_nDir
	 * @param {Object} p_nTime
	 *
	 */
	function hideAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nEndDegree, p_nDir, p_nTime) {
		var done = false;
		for (var i = p_nFrom; i < p_nTo; i++) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : p_nEndDegree,
					dir : p_nDir
				})
			}, p_nTime, "easeOutQuad", function() {
				if (!done) {
					console.log('...hideAllCommunities');
					done = true;
					//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
					//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, -22, 160, -1);
				}
			});
		}
	}
	/**
	 * Description: 
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 * @param {Object} p_nStartDegree
	 * @param {Object} p_nDir
	 *
	 */
	function showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir) {
		var _nStep = p_nStartDegree;
		for (var i = p_nFrom; i < p_nTo; i++) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : _nStep,
					dir : p_nDir
				})
			}, m_nShowTime, "easeOutQuad", function() {
				
			});
			_nStep = _nStep + p_nGap;
		}
	}
	/**
	 * 
	 */
	function addButtonEvents() {
		for (var i = 0; i < m_nCommunities; i++) {
			//Bind events on community circles
			$('#' + m_sCommunityPrefix + i).bind('click', onCommunityButtonClick);
		};
		$('#w_oLaunchButton').bind('click', onLaunchButtonClick);
		$('#w_oLaunchButton').bind('click', onLaunchButtonClick);
	}
	/**
	 * 
	 */
	function onLaunchButtonClick() {
		if(window.console) console.log('onLaunchButtonClick');
	}
	/**
	 * 
	 */
	function onCommunityButtonClick(e) {
		m_oClickedCommunity = e.currentTarget.id;
		m_nCurrentCommunityId = m_oClickedCommunity.substr(m_sCommunityPrefix.length, m_oClickedCommunity.length);
		window.open('home.htm?communityId='+m_nCurrentCommunityId, '_self');
	}
	/**
	 * 
	 */
	function drawOnCircumfrence(p_nRadius, p_oElement, p_oContainer, p_nAngle, p_nStep) {
		var _nRadius = p_nRadius;
		var _oElement = $( '.'+p_oElement );
		var _oContainer = $( '#'+p_oContainer );
		var _nWidth = _oContainer.width( )
		var _nHeight = _oContainer.height( );
		var _nAngle = p_nAngle;
		//var step = ( 2 * Math.PI ) / _oElement.length;
		var _nStep = ( 2 * Math.PI ) / p_nStep;
		var startX = 0;
		var startY=0;
		var firstStep = true;
		_oElement.each( function( ) {
			var x = Math.round( _nWidth / 2 + _nRadius * Math.cos( _nAngle ) - $( this ).width( ) / 2 );
			var y = Math.round( _nHeight / 2 + _nRadius * Math.sin( _nAngle ) - $( this ).height( ) / 2 );
			
			if( window.console ) console.log( $( this ).text( ), x, y );
			
			if(firstStep) {
				startX = x;
				startY = y;
				firstStep = false;
			}
			$( this ).css( {
				left: x + 'px',
				top: y + 'px'
			} );
			_nAngle += _nStep;
		} );
	}
	$('.w_oInput2').bind('focus', showPasswordSecurityPopup);
	$('.w_oInput2').bind('blur', hidePasswordSecurityPopup);
	//$('.w_oInput2').bind('click', m_oLRoot.showPasswordSecurityPopup);
	//m_oLRoot.showPasswordSecurityPopup = function(e) {
	function showPasswordSecurityPopup(e) {
		$('#w_oPSPopup').show();
		$('#w_oPSPopup div').show();
		var _oPSPopup = $('#w_oPSPopup');
		var _oTarget = $('#'+ e.currentTarget.id);
		//Sets position
		var _oTargetX = _oTarget.offset().left + _oTarget.width() + 19;
		var _oTargetY = _oTarget.offset().top - 30;
		_oPSPopup.css('top', _oTargetY);
		_oPSPopup.css('left', _oTargetX);
		_oPSPopup.show();
		//$('#w_oPSPopup, #w_oPSPopup div').show();
		console.log('>>>>>>>>>>>>>> _oTargetX: ' + _oTargetX);
	}
	/////////////////////////////////////////////////////////////////////// This function uses in login controller by app team
	/*
	function showErrorMessage(){
		ErroMessage = "<ul>";
		if (IsLength == true) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.Msg10Char</li>";
		else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.Msg10Char</li>";

		if (IsRepeat == true) ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgRepeat3</li>";
		else ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgRepeat3</li>";
		
		if (ContainUserName == true) ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgIncUserName</li>";
		else ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgIncUserName</li>";

		if (Conditioncount <= 2) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgContains</li>";
		else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgContains</li>";
		
			//Sub bullets list start from here
			ErroMessage += "<ul>";
			
			if (pUpper == true) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgUpper</li>";
			else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgUpper</li>";
			
			if (pLower == true) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgLower</li>";
			else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgLower</li>";
			
			if (pNumber == true) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgDigit</li>";
			else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgDigit</li>";
			
			if (pSpecial == true) ErroMessage += "<li class='w_cCorrectIcon'>@BlenderResources.LoginResx.Login.MsgSpecial</li>";
			else ErroMessage += "<li class='w_cAlertIcon'>@BlenderResources.LoginResx.Login.MsgSpecial</li>";
			
        	//Sub bullets list end here
        	ErroMessage += "</ul>";
        ErroMessage += "</ul>";
        return ErroMessage;
	}
	*/
	
	
	
	
	
	/////////////////////////////////////////////////////////////
	function hidePasswordSecurityPopup() {
		$('#w_oPSPopup').hide();
	}
	/**
	 * Description: 
	 * 
	 */
	function animateDOMObjects() {
		var _oElement = "div.w_oAni";
		var _nTotalElements = $(_oElement).length;
		var _nCurrentElement = 0;
		var _nTime = 300;
		var _nInterval = setInterval(animateObjects, _nTime);
		var _nSlideAniFrom = 0;
		var _nSlideAniTo = 0;
		var _nStaticElement = 0;
		function animateObjects() {
			if (_nCurrentElement < _nTotalElements) {
				if (_nCurrentElement >= _nSlideAniFrom && _nCurrentElement <= _nSlideAniTo) {
					var _oCurrentElement = $(_oElement + ":eq(" + _nCurrentElement + ")");
					var _oStaticElement = $(_oElement + ":eq(" + _nStaticElement + ")");
					_oStaticElement.show();
					_oCurrentElement.show();
	
					var startY = _oStaticElement.position().top;
					var endY = _oCurrentElement.position().top;
					_oCurrentElement.css({
						'top' : startY
					})
	
					var startX = _oStaticElement.position().left;
					var endX = _oCurrentElement.position().left;
					_oCurrentElement.css({
						'left' : startX
					})
					//log("endX: " + endX + " endY: " + endY);
					_oCurrentElement.animate({
						'top' : endY,
						'left' : endX
					}, 10);
				} else {
					$(_oElement + ":eq(" + _nCurrentElement + ")").fadeIn(300);
				}
				_nCurrentElement++;
				console.log("_nCurrentElement: " + _nCurrentElement);
			} else {
				clearInterval(_nInterval);
				//$('div').show();
				
				//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
				//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, m_nGap, m_nStartDegree, -1);
				//addButtonEvents();
				$('img, input, label').not('.regular-checkbox').show();
				movePointer();
				setLogoPosition(m_nLogoPosition);
				return false;
			}
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function removeElements(p_sPrefix, p_nFrom, p_nTo) {
		for (var i=p_nFrom; i < p_nTo; i++) {
			$('#'+p_sPrefix + i).remove();
		};
	}
	
	function showError(){
		$("#error_alert div").show()
	}
		
}
var main = new Main();

function showMessage(p_nID) {
	$().toastmessage('showAlert', "<div class=\"error_text\">We didn't recognise the email address. Please try again and didn't recognise the email addressand didn't recognise the email address. Please try again.</div><div class=\"error_text\">We didn�t recognise the email address. Please try again.</div>");
	if(p_nID==0 || p_nID==undefined || p_nID>2) {
		//Do nothing
	} else {
		less.modifyVars({
			'@ERR_BOX0_COLOR1':'@ERR_BOX'+p_nID+'_COLOR1',
			'@ERR_BOX0_COLOR2':'@ERR_BOX'+p_nID+'_COLOR2',
			'@ERR_BOX0_OUTLINE':'@ERR_BOX'+p_nID+'_OUTLINE',
			'@ERR_BOX0_FONT':'@ERR_BOX'+p_nID+'_FONT',
			'@ERR_BOX0_ICON':'@ERR_BOX'+p_nID+'_ICON',
			'@ERR_BOX0_INN_COLOR1':'@ERR_BOX'+p_nID+'_INN_COLOR1',
			'@ERR_BOX0_INN_COLOR2':'@ERR_BOX'+p_nID+'_INN_COLOR2',
			'@ERR_BOX0_INN_OUTLINE':'@ERR_BOX'+p_nID+'_INN_OUTLINE'
		});
	}
	
}