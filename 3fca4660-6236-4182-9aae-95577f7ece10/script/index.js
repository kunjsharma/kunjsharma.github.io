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
		hideAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, 0, 160, -1, 0);
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
		manageGap();
		createDomElements();
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
		$('#w_Link1').hover(function(){
			$('#w_oData6').removeClass('w_oLayout08B w_oLayout08C').addClass('w_oLayout08A');
		});
		$('#w_Link2').hover(function(){
			$('#w_oData6').removeClass('w_oLayout08A w_oLayout08C').addClass('w_oLayout08B');
		});
		$('#w_Link3').hover(function(){
			$('#w_oData6').removeClass('w_oLayout08A w_oLayout08B').addClass('w_oLayout08C');
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
					if( window.console ) console.log('...hideAllCommunities');
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
	/**
	 * Description: 
	 * 
	 */
	function animateDOMObjects() {
		var _oElement = "div.w_oAni";
		var _nTotalElements = $(_oElement).length;
		var _nCurrentElement = 0;
		var _nTime = 100;
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
					$(_oElement + ":eq(" + _nCurrentElement + ")").fadeIn(100);
				}
				_nCurrentElement++;
				if( window.console ) console.log("_nCurrentElement: " + _nCurrentElement);
			} else {
				clearInterval(_nInterval);
				$('div').show();
				//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
				showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, m_nGap, m_nStartDegree, -1);
				addButtonEvents();
				addProfileMenuEvent();
				addDocumentClickEvent();
				//movePointer();
				return false;
			}
		}
	}
	function addProfileMenuEvent() {
		$("#w_oProfileMenu").on("click", function(e) {
			e.stopPropagation();
			//e.preventDefault();

			if ($(this).hasClass("open")) {
				$(this).removeClass("open");
				$(this).children("ul").slideUp("fast");
			} else {
				$(this).addClass("open");
				$(this).children("ul").slideDown("fast");
			}
		});
		
	}
	function addDocumentClickEvent() {
		$(document).click(function(e) {
			if ($('#w_oProfileMenu').hasClass("open")) {
				$('#w_oProfileMenu').removeClass("open");
				$('#w_oProfileMenu').children("ul").slideUp("fast");
			}
		});
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
}
var main = new Main();