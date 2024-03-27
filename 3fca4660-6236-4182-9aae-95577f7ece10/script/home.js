/**
 * @author Kunj.Sharma
 */
function Main(){
	//Debug
	//var log = Function.prototype.bind.call(((window.console)?console.log:undefined) , console);
	//log.apply(console, []);
	Debug = true;
	//
	m_oCRoot = this;
	//Variable data, changes when a community change.
	var m_nIconCircles = 4;							//Icon circles at the top left side of outer circle
	var m_nNanos = 8;								//Number of Nanos in a community
	var m_nCommunities = 0;
	var m_nCurrentCommunityId = isNaN(getUrlVars()["communityId"])?3:getUrlVars()["communityId"];
	//
	var m_nVisitedNanos = 3;						//Visited nanos in a community
	var m_nLearningPercent;
	var m_nAvgLearningPercent;
	
	//Sets limit of icon and nanos. Update limit requires updation of holders in html as well 
	var m_nMaxNanos = 21;
	var m_nMaxIcons = 10;
	
	//Static values, works evenly with all community circles
	var m_nGap = -19;
	var m_nCommOuterGap = -7;
	var m_nAwayFromAxis = 97;
	//var m_nStartDegreeOfCom = 144;				
	var m_nStartDegreeOfCom = 154;
	var m_nShowTime = 2000;
	var m_nRadiusCom = 344;
	var m_nXAxisCom = 365;
	var m_nYAxisCom = 365;
	
	var m_sNanoPrefix = 'w_oCircle';
	var m_sCommunityPrefix = 'w_oComBtn';
	var m_sUserIconsPrefix = 'w_oUIcoBtn';
	var m_oClickedCommunity = m_sCommunityPrefix+m_nCurrentCommunityId;
	var m_nDegree = (2 * Math.PI) / 360;			//Ref
	var m_nRadius = 313;							//Radius of nano circles
	var m_nAxis = 313;								//Axis of nano circles
	var m_nStartDegOfNormalNanos = 180;
	var m_nStartDegOfVisitedNanos = 226;
	var m_nLastZ = 0;
	var m_nOverZ = 0;
	var m_oClickedNano = "";
	var m_oLastClickedNano ="";
	
	var m_nClickNanoId = "";
	var m_nCurrNanoId = "";
	
	var m_oCurrentNano = "";
	var m_sCurrentNanoStatus="c";					//'n' Not started
													//'s' Started
													//'c' Completed
	
	var m_sLogoPosition = 'left';
	var m_nNormalNanoGap = 15;						//Nanos at right gap in degree
	var m_nVisitedNanoGap = 7;						//Visited Nanos at left gap in degree
	var m_nFinalDegree = 0;
	var m_nVisitedCount = 0;
	//var m_nDrawInterval = 0;
	var m_nCurrentNanoZ = 0;
	
	var m_nAnimationCount = 0;
	var m_nShrinkDegree = 204;						//Degree toward all Nanos move to hide
	var m_nAnimationCount = 0;
	var m_nBadgeCounter = 1;
	var m_nBadges = 0;
	
	var m_nNanoAniSpeed = 300;						//Animation completion time in ms
	var m_nNanoSlideAniSpeed = 500;
	var m_nLDouAniTime = 500;
	var m_nLPieAniTime = 500;
	var m_nALDouAniTime = 1500;
	var m_nALPieAniTime = 500;
	var m_nSwapSpeed=100;
	
	var m_bDisplayWelcomeScreen = true;
	var m_bDisplayWelcomeScreenDD = false;
	var m_bFirstRun = true;
	var m_bButtonClicked = false;
	var m_bAllVNanoHide = false;					//To check for left and right animation have been comepleted
	var m_bAllNNanoHide = false;					//To check for left and right animation have been comepleted
	var m_bDocInit = false;
	var m_nFirstComClicked = true;
	var m_bSwitchFromHome = true;
	var m_bLaunchThroughButton = false;
	
	var m_bIsHomeView = true;
	var m_bIsCommunityView = false;
	var m_bIsLaunchView = false;
	var m_bNanoOnceClicked = false;
	
	var m_bIsVideoPopupOpen = false;
	var m_bIsPersonalProfileViewOpen = false;
	var m_bIsNoCommunityAssigned = false;
	var m_bDocumentOpened = false;
	var m_bBadgeExtended = false;
	var m_bIsIE9 = false;
	
	var m_nDataChangeInterval = 0;
	var m_nLaunchInterval=0;
	var m_nPopBlockerClickInterval = 0;
	var m_nTooltipInterval=0;
	var m_nTooltipDelay=500;
	var m_nTooltipFadeTime=200;
	
	var m_sCommunityTitle;
	
	var m_aCommDeg = [];
	var m_aCommHomeX = [];
	var m_aCommHomeY = [];
	var m_aNanoIds = [];
	var m_aNanoTitles = [];
	var m_aNanoStatus = [];
	var m_aCommTitles = [];
	
	var m_nLangId = 3;
	
	var m_oLearningPieColor = '#E343AF';
	var m_oLearningPieTrackColor = '#D3D3D3';
	var m_oAvgLearningPieColor = '#00318D';
	var m_oAvgLearningPieTrackColor = '#D3D3D3';
	
	var m_oLearningDoughnutColor = '#9575B4';
	var m_oLearningDoughnutTrackColor = false;
	var m_oAvgLearningDoughnutColor = '#58C0CD';
	var m_oAvgLearningDoughnutTrackColor = false;
	
	/**
	 * JSON Object. TBI from web object.
	 */
	var m_oCommunityData = {
		"community":[{
			"id" : "0",
			"title" : "Nokia Brand Ambassadorship",
			"status" : "n",
			"data3" : "false",
			"nanoList" : [{
				"id" : "0",
				"title" : "Nokia Way for care",
				"status" : "n",
				"data4" : "false"
			}],
			"membersIconList" : [{
				"id" : "0",
				"title" : "",
				"image_url" : "images/ico-user-014.png",
				"data4" : "false"
			}]
		},
		{
			"id" : "1",
			"title" : "Personal & Team Effectiveness",
			"status" : "n",
			"data3" : "false",
			"nanoList" : [{
				"id" : "0",
				"title" : "Personal & Team Effectiveness 1",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "1",
				"title" : "Personal & Team Effectiveness 2",
				"status" : "n",
				"data4" : "false"
			}],
			"membersIconList" : [{
				"id" : "0",
				"title" : "",
				"image_url" : "images/ico-user-015.png",
				"data4" : "false"
			},
			{
				"id" : "1",
				"title" : "",
				"image_url" : "images/ico-user-014.png",
				"data4" : "false"
			},
			{
				"id" : "2",
				"title" : "",
				"image_url" : "images/ico-user-017.png",
				"data4" : "false"
			},
			{
				"id" : "3",
				"title" : "",
				"image_url" : "images/ico-user-016.png",
				"data4" : "false"
			}]
		},
		{
			"id" : "2",
			"title" : "Industry Knowledge",
			"status" : "n",
			"data3" : "false",
			"nanoList" : [{
				"id" : "0",
				"title" : "Industry Knowledge 1",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "1",
				"title" : "Industry Knowledge 2",
				"status" : "s",
				"data4" : "false"
			}, {
				"id" : "2",
				"title" : "Industry Knowledge 3",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "3",
				"title" : "Industry Knowledge 4",
				"status" : "n",
				"data4" : "false"
			}],
			"membersIconList" : [{
				"id" : "0",
				"title" : "",
				"image_url" : "images/ico-user-017.png",
				"data4" : "false"
			},
			{
				"id" : "1",
				"title" : "",
				"image_url" : "images/ico-user-015.png",
				"data4" : "false"
			},
			{
				"id" : "2",
				"title" : "",
				"image_url" : "images/ico-user-016.png",
				"data4" : "false"
			}]
		},
		{
			"id" : "3",
			"title" : "Nokia Devices & Solutions Expertise",
			"status" : "n",
			"data3" : "false",
			"nanoList" : [{
				"id" : "0",
				"title" : "Nokia Lumia Windows Phone Devices",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "1",
				"title" : "Nokia Asha Devices",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "2",
				"title" : "Nokia Symbian and Mobile Phone Devices",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "3",
				"title" : "Nokia Devices & Solutions Expertise Quiz",
				"status" : "n",
				"data4" : "false"
			}],
			"membersIconList" : [{
				"id" : "0",
				"title" : "",
				"image_url" : "images/ico-user-014.png",
				"data4" : "false"
			},
			{
				"id" : "1",
				"title" : "",
				"image_url" : "images/ico-user-015.png",
				"data4" : "false"
			},
			{
				"id" : "2",
				"title" : "",
				"image_url" : "images/ico-user-016.png",
				"data4" : "false"
			},
			{
				"id" : "3",
				"title" : "",
				"image_url" : "images/ico-user-017.png",
				"data4" : "false"
			}]
		},
		{
			"id" : "4",
			"title" : "Services & Software Expertise",
			"status" : "n",
			"data3" : "false",
			"nanoList" : [{
				"id" : "0",
				"title" : "Services & Software Expertise 1",
				"status" : "n",
				"data4" : "false"
			}, {
				"id" : "1",
				"title" : "Services & Software Expertise 2",
				"status" : "n",
				"data4" : "false"
			}],
			"membersIconList" : [{
				"id" : "0",
				"title" : "",
				"image_url" : "images/ico-user-016.png",
				"data4" : "false"
			},
			{
				"id" : "1",
				"title" : "",
				"image_url" : "images/ico-user-015.png",
				"data4" : "false"
			},
			{
				"id" : "2",
				"title" : "",
				"image_url" : "images/ico-user-014.png",
				"data4" : "false"
			}]
		}
		]
	};
	/**
	 * Description: 
	 * 
	 */
	$(document).ready(function() {
		//Checks whether JSON object has no community
		$.isEmptyObject( m_oCommunityData )== true?m_bIsNoCommunityAssigned = true:m_bIsNoCommunityAssigned = false;
		processData();
		//hideAllNormalNanoElements(m_sNanoPrefix, 0, m_nNanos, undefined, m_nShrinkDegree, 1, 0);
		//This hides remaining nanos
		//hideAllNormalNanoElements(m_sNanoPrefix, m_nNanos, m_nMaxNanos, undefined, m_nShrinkDegree, 1, 0);
		hideAllNormalNanoElements(m_sNanoPrefix, 0, m_nMaxNanos, undefined, m_nShrinkDegree, 1, 0);
		//drawOnCircumfrenceV2(m_sNanoPrefix, m_nVisitedNanos, m_nNanos);
		//drawOnCircumfrenceV3(m_sCommunityPrefix, m_nCommunities, m_nRadius + 120, 144, 350, 350, 11, 1);
		//Fix set of icon holders.
		//drawOnCircumfrenceV3('w_oUIcoBtn', m_nIconCircles, m_nRadius + 62, 227, 372, 372, 6, -1);
		//drawOnCircumfrenceV3(p_sObjPrefix, p_nTotalCircles, p_nRadius, p_nFrom, p_nCenterX, p_nCenterY, p_nGap, p_nDir)
		drawOnCircumfrenceV3(m_sUserIconsPrefix, m_nMaxIcons, m_nRadius + 54, 227, 372, 372, 6, -1);
	
		//m_nDrawInterval = setInterval('drawOnCircumfrence()', 1000)
		//m_nDrawInterval = setInterval(function() {}, 10);
		$(document).bind('EVENT_ANIMATION_COMPLETE', onAnimationComplete);
		$(document).bind('EVENT_ANIMATION_COMPLETE2', onAnimationComplete2);
		$(document).bind('WELCOME_POPUP_HIDES', onWelcomePopupHide);
		$('#w_oLaunchButton').unbind('click').bind('click', onLaunchButtonClick);
		$('#w_oHRecentActivityMoreButton').unbind('click').bind('click', onHRecenctActivity); // Recent Activity Blocker
		$('#w_oPRecentActivityMoreButton').unbind('click').bind('click', onPRecentActivityLoadData); // Recent Activity Blocker
		$('#w_oODPMoreButton').unbind('click').bind('click', onODPLoadData); // Recent Activity Blocker
		//Adds initial selected class
		//$('#'+m_sCommunityPrefix+m_nCurrentCommunityId).addClass('w_cComBtnSelected');
		////
		hideAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, 0, 170, -1, 0);
		////
		displayWelcomeScreen();
		////
		animateDOMObjects();
		preventDefaultClick(true);
		log('$(document).ready: preventDefaultClicked');
		addRating();
		initBadge();
		setupLogoPosition();
		updatePieAndDoughnutColors();
		//$('#w_oPopupContainer').load('people3.htm');
	});
	/**
	 * Description: 
	 * 
	 */
	function processData() {
		if(m_bIsNoCommunityAssigned) {
			log('processData: No community assigned to the user');
		} else {
			//m_nCurrentCommunityId = m_oCommunityData.community[m_nCurrentCommunityId].id;
			m_nCommunities = m_oCommunityData.community.length;
			m_sCommunityTitle = m_oCommunityData.community[m_nCurrentCommunityId].title;
			log("processData - m_nCurrentCommunityId: " + m_nCurrentCommunityId);
			m_aNanoIds = [];
			m_aNanoTitles = [];
			m_aNanoStatus = [];
			m_aCommTitles = [];
			var _nVisitedNanos=0;
			m_oClickedNano = "";
			/*for (var i in m_oCommunityData.community[m_nCurrentCommunityId].nanoList) {
				m_aNanoIds.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].id);
				m_aNanoTitles.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].title);
				m_aNanoStatus.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status);
				if(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status == "c") _nVisitedNanos++;
			}*/
			for (var i in m_oCommunityData.community[m_nCurrentCommunityId].nanoList) {
				if(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status == "c"){
					m_aNanoIds.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].id);
					m_aNanoTitles.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].title);
					m_aNanoStatus.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status);
					_nVisitedNanos++;
				}
			}
			for (var i in m_oCommunityData.community[m_nCurrentCommunityId].nanoList) {
				if(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status == "n" || m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status == "s"){
					m_aNanoIds.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].id);
					m_aNanoTitles.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].title);
					m_aNanoStatus.push(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status);
				}
			}
			m_nNanos = m_oCommunityData.community[m_nCurrentCommunityId].nanoList.length;
			m_nIconCircles = m_oCommunityData.community[m_nCurrentCommunityId].membersIconList.length;
			m_nVisitedNanos = _nVisitedNanos;
			/*log('m_sCommunityTitle: ' + m_sCommunityTitle);
			log('m_aNanoIds: ' + m_aNanoIds);
			log('m_aNanoTitles: ' + m_aNanoTitles);
			log('m_aNanoStatus: ' + m_aNanoStatus);*/
			for(var j in m_oCommunityData.community) {
				m_aCommTitles.push(m_oCommunityData.community[j].title);
			}
		}
		createDomElements();
	}
	/**
	 * Description: 
	 * 
	 */
	function createDomElements() {
		//Create Community Nanos
		//manageGap();
		if(!m_bDocInit) {
			removeElements(m_sCommunityPrefix, 1, m_nCommunities);
			var _sCommEleList="";
			for (var k=0; k < m_nCommunities; k++) {
				if(k==0) $('#'+m_sCommunityPrefix+k +' p').text(m_aCommTitles[k]);
				//else $('#w_oCommsHolder').append("<div id="+ m_sCommunityPrefix+ k + " class='w_oAni w_cComBtnH'><p class='w_cComBtnDataH'>"+ m_aCommTitles[k]+"</p></div>");
				//ALT003: Above block of comment appends DOM element on each step wheereas below stores in a list and appends after loop completes.
				else _sCommEleList += ("<div id="+ m_sCommunityPrefix+ k + " class='w_cComBtnH'><p class='w_cComBtnDataH'>"+ m_aCommTitles[k]+"</p></div>");
				///ALT003
			};
			$('#w_oCommsHolder').append(_sCommEleList);
			m_bDocInit = true;
		}
		//Create Normal Nanos from N towards NE and visited at from NW. 
		//$('#w_oNanoHolder').empty();
		//removeElements(m_sNanoPrefix, 1, m_nNanos);
		//ALT001: Fill text in nanos which holder already created in html.
		for (var i=0; i < m_nNanos; i++) {
			//$('#w_oNanoHolder').append("<div id="+ m_sNanoPrefix+ i + " class='w_oAni w_cNanoBtn'><p class='w_oData'>"+ m_aNanoTitles[i]+"</p></div>");
			$('#'+m_sNanoPrefix+i +' p').text(m_aNanoTitles[i]);
			$('#'+m_sNanoPrefix+i).unbind('click');
			$('#'+m_sNanoPrefix+i).unbind('mouseover');
			$('#'+m_sNanoPrefix+i).unbind('mouseout');
			//Bind each nano to select randomly.
			//Uncomment this 'if' block if initially completed nano click event not required.
			//if(i>=m_nVisitedNanos){
				$('#'+m_sNanoPrefix+i).bind('click', onButtonClick);
				//if(m_nNanos>21) {
					$('#'+m_sNanoPrefix+i).bind('mouseover', functionOver1);
					$('#'+m_sNanoPrefix+i).bind('mouseout', functionOut1);
					//TODO: Magnet Repulse
				//}
				
			//}
			////
			$('#'+m_sNanoPrefix+i).attr("data-id", m_aNanoIds[i]);
			////
		};
		
		for (var l=m_nNanos; l < m_nMaxNanos; l++) {
			$('#'+m_sNanoPrefix+l +' p').text("");
			$('#'+m_sNanoPrefix+l).unbind('click');
		};
		///ALT001
		//ALT002: Append nanos in DOM.
		/*
		var _sNanoEleList =""
		for (var i=0; i < m_nNanos; i++) {
			if(i==0) $('#'+m_sNanoPrefix+i +' p').text(m_aNanoTitles[i]);
			else _sNanoEleList += ("<div id="+ m_sNanoPrefix+ i + " class='w_cNanoBtn'><p class='w_oData'>"+ m_aNanoTitles[i]+"</p></div>");
			
		};
		$('#w_oNanoHolder').append(_sNanoEleList);
		*/
		///ALT002
		//Create icon circles at NW
		var _nIconCount=0;
		if(m_bIsNoCommunityAssigned) {
			log('createDomElements: No community assigned to the user.');
		} else {
			_nIconCount = m_oCommunityData.community[m_nCurrentCommunityId].membersIconList.length;
		}
		//$('#w_oUserIconsHolder').empty();
		/* replaces image sources.
		for (var j=0; j < _nIconCount; j++) {
			//$('#w_oUserIconsHolder').append("<div id="+ m_sUserIconsPrefix+ j + " class='w_cUIco'><img src='"+m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url+"'/></div>");
			//$('#'+w_oUserIconsHolder+i).src(m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url);
			//$('#w_oUserIconsHolder'+ ' ' +m_sUserIconsPrefix+ j + ' img').attr( "src", m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url );
			$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j+' img').attr( "src", m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url );
		};
		for (var j=_nIconCount; j < m_nMaxIcons; j++) {
			$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j+' img').attr( "src", "" );
		};
		*/
		//Appends image tag. This code has been added to resolve IE9 issue in which the default image icon shows in empty image sources.
		if(m_bIsNoCommunityAssigned) {
			log('createDomElements: No community assigned to the user.');
		} else {
			for (var j=0; j < _nIconCount; j++) {
				//$('#w_oUserIconsHolder').append("<div id="+ m_sUserIconsPrefix+ j + " class='w_cUIco'><img src='"+m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url+"'/></div>");
				//$('#'+w_oUserIconsHolder+i).src(m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url);
				//$('#w_oUserIconsHolder'+ ' ' +m_sUserIconsPrefix+ j + ' img').attr( "src", m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url );
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).empty();
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).append( "<img src='"+m_oCommunityData.community[m_nCurrentCommunityId].membersIconList[j].image_url+"'/>");
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).unbind('click').bind('click', onUserIconClick);
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).css('cursor', 'pointer');
				//$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).css('z-index', '999');
			};
			for (var j=_nIconCount; j < m_nMaxIcons; j++) {
				//$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j+' img').attr( "src", "" );
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).empty();
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).unbind('click');
				$('#w_oUserIconsHolder #'+m_sUserIconsPrefix+ j).css('cursor', 'default');
			};
		}
		////Tooltip
		$('.w_cTooltip').unbind('mouseover').bind('mouseover', onTooltipOver);
		$('.w_cTooltip').unbind('click').bind('click', onTooltipOver);
		$('.w_cTooltip').unbind('mouseout').bind('mouseout', onTooltipOut);
		////OthersPopup
		$('.w_cOthersPopup').unbind('mouseover').bind('mouseover', onOthersPopupOver);
		$('.w_cOthersPopup').unbind('click').bind('click', onOthersPopupOver);
		$('.w_cOthersPopup').unbind('mouseout').bind('mouseout', onOthersPopupOut);
		//Password security popup
		/*$('.w_oInput2').unbind('focus').bind('focus', showPasswordSecurityPopup);
		$('.w_oInput2').unbind('blur').bind('blur', hidePasswordSecurityPopup);
		$('.w_oInput2').unbind('click').bind('click', hidePasswordSecurityPopup);*/
	}
	function initBadge() {
		var _nBadgeCount = $('#w_oCNABarSlider ul li').length;
		var _nBadgeWidth = $('#w_oCNABarSlider ul li').width();
		var _nBadgeHeight = $('#w_oCNABarSlider ul li').height();
		var _nBadgesWidth = _nBadgeCount * _nBadgeWidth;
		var _bLoop = false;
		var _nBadgeLeft=0;
		var _hideButtons = true;
		$('#w_oCNABarSlider').css({
			width : _nBadgeWidth,
			height : _nBadgeHeight
		});

		$('#w_oCNABarSlider ul').css({
			width : _nBadgesWidth
			//marginLeft : -_nBadgeWidth
		});
		
		//$('#w_oCNABarSlider ul li:last-child').prependTo('#w_oCNABarSlider ul');
		if(_hideButtons){
			$('#w_oCNABarSlideBack').hide();
			$('#w_oCNABarSlideNext').hide();
			$('#w_oCNABarSlider').css({'padding-left':'20px'});
		}
		if(_nBadgeCount>1){
			$('#w_oCNABarSlideBack').unbind('click').bind('click', moveLeft);
			$('#w_oCNABarSlideNext').unbind('click').bind('click', moveRight).show();
		} else {
			$('#w_oCNABarSlideBack, #w_oCNABarSlideNext').css({
				'opacity': '0',
				'cursor':'default'
			});
		}
		
		
		function moveLeft() {
			if(_hideButtons){
				$('#w_oCNABarSlideBack').show();
				$('#w_oCNABarSlideNext').show();
				$('#w_oCNABarSlider').css({'padding-left':'0px'});
			}
			if(_nBadgeLeft>=0){
				if(_hideButtons){
					$('#w_oCNABarSlideBack').hide();
				}
				return;
			}
			else _nBadgeLeft = _nBadgeLeft + _nBadgeWidth;
			$('#w_oCNABarSlider ul').animate({
				left : _nBadgeLeft
			}, 200, function() {
				if(_hideButtons){
					if(_nBadgeLeft>=0){
						$('#w_oCNABarSlideBack').hide();
						$('#w_oCNABarSlider').css({'padding-left':'20px'});
					}
				}
			});
			m_nBadgeCounter--;
			updateCNABarSlider();
		};
		function moveRight() {
			if(_hideButtons) {
				$('#w_oCNABarSlideBack').show();
				$('#w_oCNABarSlideNext').show();
				$('#w_oCNABarSlider').css({'padding-left':'0px'});
			}
			
			if(_nBadgeLeft<=(-(_nBadgeCount-1) * _nBadgeWidth)){
				if(_hideButtons){
					$('#w_oCNABarSlideNext').hide();
				}
				return;
			}
			else _nBadgeLeft = _nBadgeLeft - _nBadgeWidth;
			$('#w_oCNABarSlider ul').animate({
				left : _nBadgeLeft
			}, 200, function() {
				if(_hideButtons) {
					if(_nBadgeLeft<=(-(_nBadgeCount-1) * _nBadgeWidth)){
						$('#w_oCNABarSlideNext').hide();
					}
				}
			});
			m_nBadgeCounter++;
			updateCNABarSlider();
		};
		/**
		 * Uncomment for loop
		 */
		/*function moveLeft() {
			log('moveLeft left: ' + _nBadgeWidth);
			$('#w_oCNABarSlider ul').animate({
				left : +_nBadgeWidth
			}, 200, function() {
				//$('#w_oCNABarSlider ul li:last-child').prependTo('#w_oCNABarSlider ul');
				//$('#w_oCNABarSlider ul').css('left', '');
			});
		};
		function moveRight() {
			log('moveRight left: ' + _nBadgeWidth);
			$('#w_oCNABarSlider ul').animate({
				left : -_nBadgeWidth
			}, 200, function() {
				$('#w_oCNABarSlider ul li:first-child').appendTo('#w_oCNABarSlider ul');
				$('#w_oCNABarSlider ul').css('left', '');
			});
		};*/
		$('#w_oCNABarExpandButton').bind('click', onCNABarExpandButtonClick);
		updateProgressBar(60, 100);
		updateCNABarExpandButton();
	}
	function updateProgressBar(p_nAchieved, p_nTotal) {
		var _nPercent = (p_nAchieved / p_nTotal) * 100;
		if (isNaN(_nPercent) || _nPercent > 100) return;
		_nPercent = _nPercent + "%";
		//Without animation
		//$('#w_oProgressBar').css('width', _nPercent);
		//With animation
		$("#w_oProgressBar").animate({width : _nPercent}, 500);
	}
	function updateCNABarExpandButton(){
		var _oObj = $('#w_oCNABar');
		var _oPos = _oObj.position();
		var _nY = _oPos.top;
		var _nX = _oPos.left;
		var _nWidth = _oObj.width();
		var _nHeight = _oObj.height();
		$('#w_oCNABarExpandButton').css('top', (_nY + _nHeight));
		$('#w_oCNABarExpandButton').css('left', (_nX + (_nWidth/2))-37);
		//
		if(m_bBadgeExtended) {
			//$('#w_oCNABarExpandButton').html('<i class="fa fa-chevron-up fa-w"></i>');
			$('#w_oCNABarExpandButton').find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		} else {
			//$('#w_oCNABarExpandButton').html('<i class="fa fa-chevron-down fa-w"></i>');
			$('#w_oCNABarExpandButton').find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		}
	}
	function onCNABarExpandButtonClick() {
		log('m_bBadgeExtended: ' + m_bBadgeExtended);
		if(m_bBadgeExtended) {
			$(".w_cCNABarText1").css('white-space','nowrap');
			$(".w_cCNABarText1").css('overflow','hidden');
			$(".w_cCNABarText1").ellipsis();
			
			$(".w_cCNABarText2").css('white-space','nowrap');
			$(".w_cCNABarText2").css('overflow','hidden');
			$(".w_cCNABarText2").ellipsis();
			m_bBadgeExtended = false;
		} else {
			$(".w_cCNABarText1").html(function(){ return $(this).data('orig');});
			$(".w_cCNABarText1").css('white-space','normal');
			$(".w_cCNABarText1").css('overflow','visible');
			
			$(".w_cCNABarText2").html(function(){ return $(this).data('orig');});
			$(".w_cCNABarText2").css('white-space','normal');
			$(".w_cCNABarText2").css('overflow','visible');
			$("#w_oCNABarSlider ul li").css('height','auto');
			m_bBadgeExtended = true;
		}
		updateCNABarSlider();
	}
	function updateCNABarSlider(){
		//$('#w_oCNABarSlider ul li:nth-child('+m_nBadgeCounter+') .w_cCNABarText1');
		
		
		var _oObj = $('#w_oCNABarSlider');
		//var _nObj1H = $(".w_cCNABarText1").height();
		var _nObj1H = $('#w_oCNABarSlider ul li:nth-child('+m_nBadgeCounter+') .w_cCNABarText1').height();
		//var _nObj2H = $(".w_cCNABarText2").height();
		var _nObj2H = $('#w_oCNABarSlider ul li:nth-child('+m_nBadgeCounter+') .w_cCNABarText2').height();
		log('m_nBadgeCounter : ' + m_nBadgeCounter);
		log('_nObj1H+_nObj2H : ' + (_nObj1H+_nObj2H));
		if((_nObj1H+_nObj2H)>45) {
			$('#w_oCNABarSlider').height(_nObj1H+_nObj2H+13);
		} else {
			$('#w_oCNABarSlider').height('46px');
		}
		if((_nObj1H+_nObj2H)>45 && m_bBadgeExtended) {
			//$('#w_oCNABarExpandButton').show();
		} else {
			//$('#w_oCNABarExpandButton').hide();
		}
		updateCNABarExpandButton();
		setCNABarExpandButtonVisibility();
	}
	function setCNABarExpandButtonVisibility(){
		var _oObj = $('#w_oCNABarSlider');
		var _nObj1T = $('#w_oCNABarSlider ul li:nth-child('+m_nBadgeCounter+') .w_cCNABarText1').text();
		var _nObj2T = $('#w_oCNABarSlider ul li:nth-child('+m_nBadgeCounter+') .w_cCNABarText2').text();
		log('1 setCNABarExpandButtonVisibility : m_bBadgeExtended ' + m_bBadgeExtended);
		log("1a setCNABarExpandButtonVisibility :  $('#w_oCNABarSlider').height() "+ $('#w_oCNABarSlider').height());
		if(m_bBadgeExtended) {
			if($('#w_oCNABarSlider').height()<=46) {
				log('2 setCNABarExpandButtonVisibility : m_bBadgeExtended ' + m_bBadgeExtended);
				$('#w_oCNABarExpandButton').hide();
			} else {
				log('3 setCNABarExpandButtonVisibility : m_bBadgeExtended ' + m_bBadgeExtended);
				$('#w_oCNABarExpandButton').show();
			}
		} else {
			log('3a setCNABarExpandButtonVisibility : _nObj1T.indexOf(...) != -1) ' + (_nObj1T.indexOf("...") != -1));
			log('3b setCNABarExpandButtonVisibility : _nObj2T.indexOf(...) != -1) ' + (_nObj2T.indexOf("...") != -1));
			if((_nObj1T.indexOf("...") != -1) ||  (_nObj2T.indexOf("...") != -1)) {
				log('4 setCNABarExpandButtonVisibility : m_bBadgeExtended ' + m_bBadgeExtended);
				$('#w_oCNABarExpandButton').show();
			} else {
				log('5 setCNABarExpandButtonVisibility : m_bBadgeExtended ' + m_bBadgeExtended);
				$('#w_oCNABarExpandButton').hide();
			}
		}
	}
	function storeBadgeData() {
		$("div.w_cCNABarText1").each(function(){
		    $(this).data('orig', $(this).html());
		}).ellipsis();
		$("div.w_cCNABarText2").each(function(){
		    $(this).data('orig', $(this).html());
		}).ellipsis();
	}
	//////////////////////////////////////////////
	function onTooltipOver(e) {
		clearInterval(m_nTooltipInterval);
		var _oTooltip = $('#w_oTooltip');
		var _oTarget = $('#'+ e.currentTarget.id);
		//Sets position
		var _oTargetX = _oTarget.offset().left;
		var _oTargetY = _oTarget.offset().top;
		if(_oTargetY<=_oTooltip.height()) {
			_oTooltip.css('top', _oTargetY + _oTarget.height());
			$('#w_oTooltipUpArrow').css('margin-left', 20).show();
			$('#w_oTooltipDownArrow').hide();
		} else {
			_oTooltip.css('top', _oTargetY - _oTooltip.height()-2);
			$('#w_oTooltipDownArrow').css('margin-left', 20).show();
			$('#w_oTooltipUpArrow').hide();
			$('#w_oTooltipDownArrow').show();
		}
		if(_oTarget.hasClass('w_cUIco')) {
			_oTooltip.css('left', (_oTargetX - 19));
		} else {
			_oTooltip.css('left', _oTargetX);
		}
		//Left position
		var _nScreenWidth = $(document).width();
		//var _nScreenWidth = 200;
		var _nTooltipWidth = _oTooltip.width();
		log('_nScreenWidth: ' + _nScreenWidth);
		log('_nTooltipWidth: ' + _nTooltipWidth);
		log('_oTargetX: ' + _oTargetX);
		//if(TODO: Add closure to check if target overs on a small image icon) {
			if((_oTargetX+_nTooltipWidth)>_nScreenWidth) {
				_oTooltip.css('left', (_oTargetX - _nTooltipWidth)+_oTarget.width());
				$('.w_cTooltipC1U').css('margin-left', 312);
				$('.w_cTooltipC1').css('margin-left', 312);
			} else {
				$('.w_cTooltipC1').css('margin-left', 6);
				$('.w_cTooltipC1U').css('margin-left', 6);
			}
		//}
		//
		//TODO: Data
		$('#w_oTooltipDetails01').html(_oTarget.html());
		//$('#w_oTooltipDetails02').html($(this).attr("class"));
		//$('#w_oTooltipDetails03').html(_oTarget.html());
		//$('#w_oTooltipDetails04').html(_oTarget.html());
		_oTooltip.stop().delay(m_nTooltipDelay).fadeIn(m_nTooltipFadeTime);
		//
		$('#w_oTooltipButtonSendMessage').unbind('click').bind('click', onTooltipSendMsgClick);
		$('#w_oTooltipButtonFollow').unbind('click').bind('click', onTooltipFollowClick);
		$('#w_oTooltipPhoto').unbind('click').bind('click',{target: _oTarget } , onPersonalProfileClick);
		$('#w_oTooltipDetails01').unbind('click').bind('click',{target: _oTarget } , onPersonalProfileClick);
		e.stopPropagation();
	}
	function onTooltipOut() {
		log('out');
		var _oTooltip = $('#w_oTooltip');
		log("_oTooltip.is(':visible'): " + _oTooltip.is(':visible'));
		if(_oTooltip.is(':visible')) {
			clearInterval(m_nTooltipInterval);
			//m_nTooltipInterval = setInterval(fadeOutTooltip, 200);
			_oTooltip.delay(m_nTooltipDelay).fadeOut(m_nTooltipFadeTime);
		} else {
			_oTooltip.stop().hide();
		}
		// clearInterval(m_nTooltipInterval);
		// m_nTooltipInterval = setInterval(fadeOutTooltip, 200);
		//_oTooltip.stop().fadeOut(50);
		//$('#w_oTooltipButtonSendMessage').unbind('click');
		//$('#w_oTooltipButtonFollow').unbind('click');
	}
	function fadeOutTooltip() {
		//var _oTooltip = $('#w_oTooltip');
		if($('#w_oTooltip').is(':hover')) {
			log('Hold the tooltip; mouse is over on it.');
		} else {
			$('#w_oTooltip').fadeOut().hide();
			clearInterval(m_nTooltipInterval);
		}
		
	}
	function onTooltipSendMsgClick(e) {
		log('onTooltipSendMsgClick');
	}
	function onTooltipFollowClick(e) {
		log('onTooltipFollowClick');
	}
	//////////////////////////////////////////////////////////
	function onOthersPopupOver(e) {
		var _oOthersPopup = $('#w_oOthersPopup');
		var _oTarget = $('#'+ e.currentTarget.id);
		//Sets position
		var _oTargetX = _oTarget.offset().left;
		var _oTargetY = _oTarget.offset().top;
		if(_oTargetY<=_oOthersPopup.height()) {
			_oOthersPopup.css('top', _oTargetY + _oTarget.height());
			$('#w_oOthersPopupUpArrow').show();
			$('#w_oOthersPopupDownArrow').hide();
		} else {
			_oOthersPopup.css('top', _oTargetY - _oOthersPopup.height()-2);
			$('#w_oOthersPopupUpArrow').hide();
			$('#w_oOthersPopupDownArrow').show();
		}
		_oOthersPopup.css('left', _oTargetX);
		
		//TODO: Data
		$('#w_oOthersPopupDetails01').html(_oTarget.html());
		//$('#w_oOthersPopupDetails02').html($(this).attr("class"));
		//$('#w_oOthersPopupDetails03').html(_oTarget.html());
		//$('#w_oOthersPopupDetails04').html(_oTarget.html());
		_oOthersPopup.stop().fadeIn();
		//
		e.stopPropagation();
	}
	function onOthersPopupOut() {
		log('out');
		var _oOthersPopup = $('#w_oOthersPopup');
		_oOthersPopup.stop().fadeOut(50);
	}
	//////////////////////////////////////////////////////////
	function showPasswordSecurityPopup(e) {
		var _oPSPopup = $('#w_oPSPopup');
		var _oTarget = $('#'+ e.currentTarget.id);
		//Sets position
		var _oTargetX = _oTarget.offset().left + _oTarget.width() + 19;
		var _oTargetY = _oTarget.offset().top - 30;
		_oPSPopup.css('top', _oTargetY);
		_oPSPopup.css('left', _oTargetX);
		_oPSPopup.show();
	}
	function hidePasswordSecurityPopup() {
		$('#w_oPSPopup').hide();
	}
	//////////////////////////////////////////////////////////
	function displayWelcomeScreen() {
		if(m_bDisplayWelcomeScreen) {
			$('#w_oGetStartedButton').unbind('click').bind('click', onGetStartedClick);
			$('#w_oWelcomePopupBlocker').show();
			$("#w_oWelcomePopupRight").change(function () {
				adjustWelcomeScreen();
			});
			//adjustWelcomeScreen();
			setBlockerAsDocHeight('#w_oWelcomePopupBlocker');
			//var _nDocHeight = $(document).height();
			var _nDocHeight = $(window).height();
			var _nPopHeight = $('#w_oWelcomePopup').height();
			$('#w_oWelcomePopup').css('top', _nDocHeight/2 - _nPopHeight/2);
			$('#w_oLogoContainer').css('z-index', '1001');
		}
	}
	function adjustWelcomeScreen() {
		var _nleftH = $('#w_oWelcomePopupLeft').css('height');
		var _nRightH = $('#w_oWelcomePopupRight').css('height');
		var _nMaxH = _nleftH>_nRightH?_nMaxH=_nleftH:_nMaxH=_nRightH;
		$('#w_oWelcomePopupRight').css('height', _nMaxH);
		$('#w_oWelcomePopupLeft').css('height', _nMaxH);
		setBlockerAsDocHeight('#w_oWelcomePopupBlocker');
		//var _nDocHeight = $(document).height();
		var _nDocHeight = $(window).height();
		var _nPopHeight = $('#w_oWelcomePopup').height();
		log('AAAAAA>_nPopHeight ' + _nPopHeight);
		$('#w_oWelcomePopup').css('top', _nDocHeight/2 - _nPopHeight/2);
		$('#w_oLogoContainer').css('z-index', '1001');
	}
	function onGetStartedClick() {
		$('#w_oWelcomePopupBlocker').hide();
		if(m_bDisplayWelcomeScreenDD==false) $(document).trigger('WELCOME_POPUP_HIDES');
		else $('#w_oLogoContainer').css('z-index', '998');
		m_bDisplayWelcomeScreenDD = false;
		//TODO: Use below functions at init
		updateCNABarExpandButton();
		storeBadgeData();
		setCNABarExpandButtonVisibility();
	}
	function onWelcomePopupHide() {
		showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, m_nGap, m_nStartDegreeOfCom, -1);
		$('#w_oLogoContainer').css('z-index', '998');
	}
	////////////////////////
	/**
	 * 
	 */
	 m_oCRoot.displayCertificatePopup = function() {
		$('#w_oCertificatePopupBlocker').show();
		setBlockerAsDocHeight('#w_oCertificatePopupBlocker');
		var _nDocHeight = $(document).height();
		var _nPopHeight = $('#w_oCertificatePopup').height();
		$('#w_oCertificatePopup').css('top', _nDocHeight/2 - _nPopHeight/2);
		$('#w_oLogoContainer').css('z-index', '1001');
	};
	m_oCRoot.PrintCertificate = function() {
		var _nH = $('#w_oCertificatePopup').height();
		var _nW = $('#w_oCertificatePopup').width();
		var mywindow = window.open('','_blank', 'width=' + _nW + ', height=' + _nH);
		mywindow.document.write('<html><head>');
		mywindow.document.write('<link rel="stylesheet" type="text/css" href="style/print.css"/>');
		//mywindow.document.write('<link rel="stylesheet/less" href="style/home.less" type="text/css" />');
		//mywindow.document.write('<script src="script/less-1.3.3.min.js"><//script>');
		mywindow.document.write('</head><body>');
		mywindow.document.write($('#w_oCertificatePopupBlocker').html());
		mywindow.document.write('</body></html>');
		
		mywindow.print();
		//mywindow.close();

		//return true;
	};
	//////////////////////////
	function onUserIconClick(e){
		log(e.currentTarget.id);
	}
	function functionOver1(){
		m_nOverZ = $(this).css("z-index");
		$(this).css({"z-index":"999"});
	}
	function functionOut1(){
		$(this).css({"z-index":m_nOverZ});
	}
	/**
	 * Description: This function arranges DOM elements on a circumfrence of given radius
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nVisited
	 * @param {Object} p_nTotalCircles
	 * NU
	 */
	function drawOnCircumfrenceV2(p_sObjPrefix, p_nVisited, p_nTotalCircles) {
		//clearInterval(m_nDrawInterval);
		log('drawOnCircumfrenceV2');
		//Create circles
		/*
		for (var i = 0; i < m_nNanos; i++) {
		var cir = String("w_oCircle" + i);
		var obj = $('#' + cir);
		var cir = String("w_oCircle" + i);
		$('#container').append("<div class='w_oCircle' id='" + cir + "'>" + i + "</div>");
		};
		*/
		//arrange visited circles
		var _nTotalCircles = p_nTotalCircles;
		var _nVisited = p_nVisited;
		var _nStart = m_nStartDegOfVisitedNanos;
		var _nEnd = _nStart;
		for (var i = (_nVisited - 1); i >= 0; i--) {
			var _s = String(p_sObjPrefix + i);
			var _oObj = $('#' + _s);
			//Change z order
			var _nZIndex = parseInt(_oObj.css("z-index"), 10);
			$(_oObj).css('z-index', _nZIndex - i);
			//
			_oObj.removeClass('w_cNanoBtn').addClass('w_oCircle03C');
			//Nano status css shape
			_oObj.children('.w_oData').removeClass('w_oData').addClass('w_oDataV');
			_oObj.children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeV');
			_oObj.children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-check"></i>').addClass('w_cNSIconV');
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nStart,
					end : _nStart,
					dir : 1
				})
			}, 1, "swing", function() {
			});
			_nStart = _nStart + m_nVisitedNanoGap;
		};
		//Arrange normal cirles
		_nStart = m_nStartDegOfNormalNanos;
		for (var i = _nVisited; i <= p_nTotalCircles; i++) {
			var _s = String(p_sObjPrefix + i);
			var _oObj = $('#' + _s);
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nStart,
					end : _nStart,
					dir : 1
				})
			}, 1, "swing", function() {
				//if(i>=p_nTotalCircles && _s == (p_sObjPrefix + p_nTotalCircles)) log('....drawOnCircumfrenceV2 Done')
			});
			_nStart = _nStart - m_nNormalNanoGap;
			//_oObj.bind('click', onButtonClick);
		};
		m_oCurrentNano = m_sNanoPrefix + m_nVisitedNanos;
		$('#' + m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		//Nano status css shape
		$('#' + m_oCurrentNano).children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeC');
		$('#' + m_oCurrentNano).children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-chevron-right"></i>');
		
		$('#' + m_oCurrentNano).bind('click', onButtonClick);
		//////
		var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
		$('#w_oLaunchTitle').html(_sLaunchTitle);
		//setLaunchButtonY();
	}
	function setLaunchButtonY() {
		var aa = $( ".w_oLayout03 li:nth-child(2)").height();
		log('>>>>>>>>>>>>>>>>>>>>>>>>>>setLaunchButtonY ' + aa + '.');
		$( ".w_oLayout03 li:nth-child(3)").height($( ".w_oLayout03 li:nth-child(2)").height());
		//$('#w_oLaunchButton').css
	};
	/**
	 * Description: 
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nTotalCircles
	 * @param {Object} p_nRadius
	 * @param {Object} p_nFrom
	 * @param {Object} p_nCenterX
	 * @param {Object} p_nCenterY
	 * @param {Object} p_nGap
	 * @param {Object} p_nDir
	 *
	 */
	function drawOnCircumfrenceV3(p_sObjPrefix, p_nTotalCircles, p_nRadius, p_nFrom, p_nCenterX, p_nCenterY, p_nGap, p_nDir) {
	
		log('drawOnCircumfrenceV3');
		//Create circles
		/*
		 for (var i = 0; i < m_nNanos; i++) {
		 var cir = String("w_oCircle" + i);
		 var obj = $('#' + cir);
		 var cir = String("w_oCircle" + i);
		 $('#container').append("<div class='w_oCircle' id='" + cir + "'>" + i + "</div>");
		 };
		 */
		var _nStart = p_nFrom;
		for (var i = 0; i < p_nTotalCircles; i++) {
			var _s = String(p_sObjPrefix + i);
			var _oObj = $('#' + _s);
			$(_oObj).animate({
				path : new $.path.arc({
					center : [p_nCenterX, p_nCenterY],
					radius : p_nRadius,
					start : _nStart,
					end : _nStart,
					dir : 1
				})
			}, 10, "swing", function() {
	
			});
			_nStart = _nStart - p_nGap * p_nDir;
		};
	}
	/**
	 * Description:
	 * Color value in string e.g.: '#c0c0c0'
	 * If color has no value, use false. 
	 */
	function updatePieAndDoughnutColors() {
		/*
		m_oLearningPieColor = 
		m_oLearningPieTrackColor = 
		m_oAvgLearningPieColor = 
		m_oAvgLearningPieTrackColor = 
		
		m_oLearningDoughnutColor = 
		m_oLearningDoughnutTrackColor = 
		m_oAvgLearningDoughnutColor = 
		m_oAvgLearningDoughnutTrackColor =
		*/ 
	}
	/*
	 * Description:	
	 */
	function setupLogoPosition() {
		//Sets fixed height of logo
		$('#w_oNCLogo').find('img').css('height', '114px');
		if(m_sLogoPosition == 'right') {
			$('#w_oNCLogo').css('right',0);
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function drawLearningDoughnut() {
		$('.w_oLearningDoughnut').easyPieChart({
			barColor : m_oLearningDoughnutColor,
			trackColor : m_oLearningDoughnutTrackColor,
			scaleColor : false,
			lineCap : 'butt',
			rotate : 0,
			size : 526 + 12,
			lineWidth : 6,
			animate : m_nLDouAniTime,
			onStep : function(value) {
				$('.w_oPink').text(~~value + '%');
			},
			onStop : function() {
				drawAvgLearningDoughnut();
			}
		});
		$('.w_oLearningDoughnut').css('line-height', '0px');
	};
	/**
	 * Description: 
	 * 
	 */
	function drawLearningPie() {
		$('.w_oLearningPie').easyPieChart({
			barColor : m_oLearningPieColor,
			trackColor : m_oLearningPieTrackColor,
			scaleColor : false,
			lineCap : 'butt',
			rotate : 0,
			size : 60,
			lineWidth : 30,
			animate : m_nLPieAniTime,
			onStep : function(value) {
			},
			onStop : function() {
				//drawAvgLearningPie();
			}
		});
		$('.w_oLearningDoughnut').css('line-height', '0px');
	};
	/**
	 * Description: 
	 * 
	 */	
	function drawAvgLearningPie() {
		$('.w_oAvgLearningPie').easyPieChart({
			barColor : m_oAvgLearningPieColor,
			trackColor : m_oAvgLearningPieTrackColor,
			scaleColor : false,
			lineCap : 'butt',
			rotate : 0,
			size : 60,
			lineWidth : 30,
			animate : m_nALPieAniTime,
			onStep : function(value) {
			},
			onStop : function() {
				preventDefaultClick(false);
				log('drawAvgLearningPie: preventDefaultClicked');
				addCommunityButtonEvents();
			}
		});
		$('.w_oLearningDoughnut').css('line-height', '0px');
	};
	/**
	 * Description: 
	 * 
	 */
	function drawAvgLearningDoughnut() {
		$('.w_oAvgLearningDoughnut').easyPieChart({
			barColor : m_oAvgLearningDoughnutColor,
			trackColor : m_oAvgLearningDoughnutTrackColor,
			scaleColor : false,
			lineCap : 'butt',
			rotate : 0,
			size : 722,
			lineWidth : 7,
			animate : m_nALDouAniTime,
			onStep : function(value) {
				$('.w_oBlue').text(~~value + '%');
			},
			onStop : function() {
				drawAvgLearningPie();
				drawLearningPie();
				//Changed in phase I as it not showing learing pies on community view.
				//When uncommented, move preventDefaultClick and addCommunityButtonEvents
				//functions to drawAvgLearningPie or drawLearningPie.
				//preventDefaultClick(false);
				//log('drawAvgLearningDoughnut: preventDefaultClick');
				//addCommunityButtonEvents();
			}
		});
		$('.w_oAvgLearningDoughnut').css({'line-height':'0px'});
	};
	/**
	 * Description: 
	 * 
	 */
	function addCommunityButtonEvents() {
		var _nZIndex = parseInt($('.w_oAvgLearningDoughnut').css("z-index"), 10) + 99;
		for (var i = 0; i < m_nCommunities; i++) {
			//Bind events on community circles
			//if (i != m_nCurrentCommunityId)
				$('#' + m_sCommunityPrefix + i).bind('click', homeRoot.onCommunityButtonClick).css('cursor', 'pointer');
			//$('#' + m_sCommunityPrefix + i).css('z-index', _nZIndex + i);
		};
		$('#w_oCommsHolder').css('z-index', _nZIndex + 1);
	}
	
	/**
	 * Description: 
	 * @param {Object}	e
	 * 
	 */
	var homeRoot = this;
	homeRoot.onCommunityButtonClick = function(e){
		if(m_bBadgeExtended) onCNABarExpandButtonClick();
		if(m_bSwitchFromHome) {
			$('#w_oHomeButton').unbind('click');
			comAwayFromAxis();
			//Expands nano track circle.
			$( '#w_oCircle02HomeI2' ).fadeIn(0).switchClass( "w_oCircle02Home2", "w_oCircle02HomeEx2", 300, "easeInOutQuad", function(){} ).fadeOut(0);
			//
			$( '#w_oCircle02HomeI' ).switchClass( "w_oCircle02Home", "w_oCircle02HomeEx", 300, "easeInOutQuad", function(){
				
				initCommunityView();
			} ).fadeOut(0);
			$('#w_oCommTitle').removeClass('w_oCommTitleBg');
			$(".w_oCircleWrapper").addClass('hidden');
			m_bSwitchFromHome = false;
			m_bIsHomeView = false;
			m_bIsCommunityView = true;
			m_bIsLaunchView = false;
		}
		removeSelectedNanoClass();
		switchToCommunityView();
		//
		//m_oClickedCommunity = e.target.id;
		m_oClickedCommunity = e.currentTarget.id;
		m_nCurrentCommunityId = m_oClickedCommunity.substr(m_sCommunityPrefix.length, m_oClickedCommunity.length);
		clearInterval(m_nDataChangeInterval);
		m_nAnimationCount = 0;
		m_bAllVNanoHide = false;
		m_bAllNNanoHide = false;
		activateCommButtons();
		freezeCommButtons(true);
		log('onCommunityButtonClick' + this.id);
		//animateAllNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap)
		if(m_nFirstComClicked) {
			m_nFirstComClicked = false;
			//TODO: Other operations
			processData();
			m_nDataChangeInterval = setInterval('changeCommunityData()', 1500);
			
		}else {
			hideAllNormalNanoElements(m_sNanoPrefix, 0, m_nVisitedNanos, undefined, m_nShrinkDegree, -1, 1000);
			hideAllVisitedNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, undefined, m_nShrinkDegree, 1, 1000);
		}
		updateLearningDoughnuts();
		if (this.id == 'w_oComBtn0') {
			//TODO: This code expands the nano elements. Will be implemented after getting modified data.
			//showAllNormalNanoElements(m_sNanoPrefix, 0, m_nVisitedNanos, m_nVisitedNanoGap, m_nStartDegOfVisitedNanos, 1)
			//showAllNormalNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, (-1)*m_nNormalNanoGap, m_nStartDegOfNormalNanos, -1)
		}
	
		$('#'+m_oClickedCommunity).addClass('w_cComBtnSelected', 300);
		//$(this).stop().animate( getClassContent('w_cComBtnSelected'), {duration:500});
		$('#'+m_oClickedCommunity).unbind('click', homeRoot.onCommunityButtonClick);
	};
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
	function hideAllNormalNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nEndDegree, p_nDir, p_nTime) {
		preventDefaultClick(true);
		log('hideAllNormalNanoElements: preventDefaultClicked');
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
				m_nAnimationCount++;
				if (!done) {
					log('...hideAllNormalNanoElements m_nAnimationCount' + m_nAnimationCount);
					done = true;
					m_bAllNNanoHide = true;
					onHideAllNanoElements();
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
	 * @param {Object} p_nEndDegree
	 * @param {Object} p_nDir
	 * @param {Object} p_nTime
	 *
	 */
	function hideAllVisitedNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nEndDegree, p_nDir, p_nTime) {
		preventDefaultClick(true);
		log('hideAllVisitedNanoElements: preventDefaultClicked');
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
				m_nAnimationCount++;
				if (!done) {
					done = true;
					m_bAllVNanoHide = true;
					onHideAllNanoElements();
				}
			});
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function onHideAllNanoElements() {
		m_nAnimationCount = 0;
		clearInterval(m_nDataChangeInterval);
		log('onHideAllNanoElements - m_bAllVNanoHide: ' + m_bAllVNanoHide);
		log('onHideAllNanoElements - m_bAllNNanoHide: ' + m_bAllNNanoHide);
		if (((m_nVisitedNanos == m_nNanos) || m_bAllVNanoHide) && ((m_nVisitedNanos == 0	) || m_bAllNNanoHide)) {
			//TODO: Data modification
			if(m_bIsHomeView) {
				
			} else {
				processData();
				
				m_nDataChangeInterval = setInterval('changeCommunityData()', 1000);
				changeTitleOfDBCircle();
			}
			m_nAnimationCount = 0;
			m_bAllVNanoHide = false;
			m_bAllNNanoHide = false;
		}
		
	}
	/**
	 * Description: 
	 * 
	 */
	function changeTitleOfDBCircle() {
		//Change title of large dark blue circle
		var _sCT = $('#' + m_oClickedCommunity).children('.w_cComBtnData').text();
		//&shy; (soft hyphen)
		var _nFS=16;
		var _nCTLen = _sCT.length;
		if(_nCTLen>18) _nFS = 16 - Math.floor(_nCTLen/12);
		var _nLW = findLongestWord(_sCT);
		if(_nLW>14) _nFS = 12 - Math.floor((_nLW-12)/2);
		
		$('#w_oCommTitle').fadeOut(function(){
			$('.w_oData1').css('font-size',_nFS);
			$('#w_oCommTitle').html(_sCT).fadeIn();
		});
	}
	/**
	 * Description: 
	 * 
	 */
	changeCommunityData = function() {
		updateLearningDoughnuts();
		clearInterval(m_nDataChangeInterval);
		//changeZIndex(m_sNanoPrefix, m_nVisitedNanos, 0);
		changeZIndex(m_sNanoPrefix, m_nNanos - 1, 0);
		changeNanoStates();
		//Calculate nano gaps
		if(m_nNanos<=21) {
			m_nNormalNanoGap = 16.5;
			m_nVisitedNanoGap = 7;
		} else {
			m_nNormalNanoGap = 16.5 - (m_nNanos/20)*3.6;
			m_nVisitedNanoGap = 7 - (m_nNanos/20)*1.2;
		}
		showAllVisitedNanoElements(m_sNanoPrefix, m_nVisitedNanos - 1, 0, m_nVisitedNanoGap, m_nStartDegOfVisitedNanos, 1);
		showAllNormalNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, (-1) * m_nNormalNanoGap, m_nStartDegOfNormalNanos, -1);
		//This fraction of code will use to click on nano to launch the course.
		/*
		 m_bButtonClicked = false;
		 m_nAnimationCount = 0;
		 m_oCurrentNano = m_sNanoPrefix+m_nVisitedNanos;
		 $('#'+m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		 $('#'+m_oCurrentNano).unbind('click', onButtonClick).bind('click', onButtonClick);
		 $('#'+m_oCurrentNano).children('.w_oDataC').removeClass('w_oDataC').addClass('w_oData');
		 $('#w_oAvgLearningDoughnut').css('z-index', '-20');
		 $('#w_oCircle02').css('z-index', '-20');
		 $('#'+m_oCurrentNano).css('z-index', '999');
		 */
		freezeCommButtons(false);
	};
	
	/**
	 * Description: 
	 * 
	 */
	function activateCommButtons() {
		for (var i = 0; i < m_nCommunities; i++) {
			//if($(m_sCommunityPrefix+i).data('events').click) {
			$('#' + m_sCommunityPrefix + i).unbind('click', homeRoot.onCommunityButtonClick).bind('click', homeRoot.onCommunityButtonClick);
			$('#' + m_sCommunityPrefix + i).removeClass('w_cComBtnSelected');
		};
	}
	/**
	 * Description: 
	 * @param {Object} p_bTrue
	 */
	function freezeCommButtons(p_bTrue) {
		for (var i = 0; i < m_nCommunities; i++) {
			if (p_bTrue) {
				$('#' + m_sCommunityPrefix + i).unbind('click', homeRoot.onCommunityButtonClick);
				$('#' + m_sCommunityPrefix + i).removeClass('w_oCursorPointer').addClass('w_oCursorDefault');
			} else {
				if (i != m_nCurrentCommunityId) {
					$('#' + m_sCommunityPrefix + i).unbind('click', homeRoot.onCommunityButtonClick).bind('click', homeRoot.onCommunityButtonClick);
					$('#' + m_sCommunityPrefix + i).removeClass('w_oCursorDefault').addClass('w_oCursorPointer');
				}
			}
		}
	}
	/**
	 * Description: 
	 * @param {Object} p_bTrue
	 */
	function freezeNanoButtons(p_bTrue) {
		//for (var i = m_nVisitedNanos ; i < m_nNanos; i++) {
		//Activates all buttons including completed buttons
		for (var i = 0 ; i < m_nNanos; i++) {
			if(!p_bTrue) {
				$('#'+m_sNanoPrefix+i).unbind('click').bind('click', onButtonClick);
			}else {
				$('#'+m_sNanoPrefix+i).unbind('click');
			}
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
	function showAllNormalNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir) {
		preventDefaultClick(true);
		log('showAllNormalNanoElements: preventDefaultClicked 0');
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
			}, 1000, "easeOutQuad", function() {
				preventDefaultClick(false);
				log('showAllNormalNanoElements: preventDefaultClicked 1');
				//freezeNanoButtons(false);
			});
			_nStep = _nStep + p_nGap;
		}
		changeNanoStates();
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
	function showAllVisitedNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir) {
		preventDefaultClick(true);
		log('showAllVisitedNanoElements: preventDefaultClicked');
		var _nStep = p_nStartDegree;
		for (var i = p_nFrom; i >= p_nTo; i--) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			/////////
			//Change z order
			var _nZIndex = parseInt(_oObj.css("z-index"), 10);
			$(_oObj).css('z-index', _nZIndex - i);
			/////////
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : _nStep,
					dir : p_nDir
				})
			}, 1000, "easeOutQuad", function() {
	
			});
			_nStep = _nStep + p_nGap;
		}
		changeNanoStates();
	}
	/**
	 * Description: 
	 * 
	 */
	function changeNanoStates() {
		log("changeClass: m_nVisitedNanos - " + m_nVisitedNanos);
		var _oTmpObj="";
		for (var i=0; i < m_nVisitedNanos; i++) {
			_oTmpObj = $('#'+m_sNanoPrefix+i);
			_oTmpObj.removeClass('w_cNanoBtn').addClass('w_oCircle03C');
			_oTmpObj.children('.w_oData').removeClass('w_oData').addClass('w_oDataV');
			_oTmpObj.children('.w_oDataC').removeClass('w_oDataC').addClass('w_oDataV');
			//Nano status css shape
			_oTmpObj.children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeV');
			_oTmpObj.children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShapeC').addClass('w_cNSShapeV');
			_oTmpObj.children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-check"></i>').addClass('w_cNSIconV');
		};
		_oTmpObj="";
		for (var j=m_nVisitedNanos; j < m_nNanos; j++) {
			_oTmpObj = $('#'+m_sNanoPrefix+j);
			if(m_aNanoStatus[j]=='n') {
				_oTmpObj.removeClass('w_oCircle03C').addClass('w_cNanoBtn');
				_oTmpObj.children('.w_oDataV').removeClass('w_oDataV').addClass('w_oData');
				_oTmpObj.children('.w_oDataC').removeClass('w_oDataC').addClass('w_oData');
				//Nano status css shape
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSShapeV').removeClass('w_cNSShapeV').addClass('w_cNSShape');
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShapeC').addClass('w_cNSShape');
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-minus"></i>');
			} else {
				_oTmpObj.removeClass('w_oCircle03C').addClass('w_cNanoBtn');
				_oTmpObj.children('.w_oDataV').removeClass('w_oDataV').addClass('w_oDataC');
				_oTmpObj.children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
				//Nano status css shape
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSShapeV').removeClass('w_cNSShapeV').addClass('w_cNSShapeC');
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeC');
				_oTmpObj.children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-chevron-right"></i>');
			}
		};
		//
		m_oCurrentNano = m_sNanoPrefix + m_nVisitedNanos;
		m_oClickedNano = m_oCurrentNano;
		//$('#' + m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		$('#' + m_oCurrentNano).bind('click', onButtonClick);
		//////
		var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
		$('#w_oLaunchTitle').html(_sLaunchTitle);
		//setLaunchButtonY();
		removeSelectedNanoClass();
	}
	/**
	 * Description: 
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 */
	function changeZIndex(p_sObjPrefix, p_nFrom, p_nTo) {
		for (var i = p_nFrom; i >= p_nTo; i--) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			//Reset Z-Index
			$(_oObj).css('z-index', '0');
			var _nZIndex = parseInt($('#w_oCircle03C04').css("z-index"), 10) - (p_nTo + 1);
			$(_oObj).css('z-index', _nZIndex - i);
			log('changeZIndex, _nZIndex: ' + _nZIndex + '. i: ' + i + '- Z: ' + _oObj.css("z-index"));
			//
		}
		$('#w_oCircle03C04').css('z-index', '0');
		//log('changeZIndex, $(#w_oCircle03C04).css(z-index: '+ $('#w_oCircle03C04').css("z-index"));
	}
	
	/**
	 * Description: 
	 * 
	 */
	function onAnimationComplete() {
		//log('onAnimationComplete');
		//$('#'+m_oCurrentNano).removeClass('w_cNanoBtn').addClass('w_oCircle03C');
		//log('onAnimationComplete: m_oCurrentNano - ' + m_oCurrentNano);
		//$('#' + m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		if (m_bButtonClicked) {
			//$('#' + m_oCurrentNano).bind('click', onButtonClick);
			//if (m_nVisitedNanos > 1) animateNanoElements(m_sNanoPrefix, 0, m_nVisitedNanos-1, m_nVisitedNanoGap);
			if (m_nVisitedNanos > 1)
				animateAllNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, m_nNormalNanoGap);
			m_bButtonClicked = false;
			log('onAnimationComplete - m_bButtonClicked: ' + m_bButtonClicked);
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function onAnimationComplete2() {
		if (m_bButtonClicked) {
			if (m_nVisitedNanos > 1) {
				m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
				m_nCurrNanoId = m_oCurrentNano.substr(m_sNanoPrefix.length, m_oCurrentNano.length);
				if(m_nClickNanoId == m_nVisitedNanos-1) {
					animateAllNanoElementsV3(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, m_nNormalNanoGap);
				} else {
					animateAllNanoElementsV3(m_sNanoPrefix, (Number(m_nClickNanoId)+1), m_nNanos, m_nNormalNanoGap);
				}
				
			}
			m_bButtonClicked = false;
			//if(m_oClickedNano == m_oCurrentNano) {
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function onLaunchButtonClick() {
		m_bLaunchThroughButton = true;
		clearInterval(m_nLaunchInterval);
		clearInterval(m_nPopBlockerClickInterval);
	
		m_bButtonClicked = true;
		m_nAnimationCount = 0;
		log('onLaunchButtonClick');
		//_oObj = $('#' + m_oCurrentNano);
		
		/*_oObj = $('#' + m_oClickedNano);
		_oObj.unbind('click');*/
		
		preventDefaultClick(true);
		log('onLaunchButtonClick: preventDefaultClicked 0');
		
		if (m_nVisitedNanos >= m_nNanos) {
			//$('#w_oLaunchButton').unbind('click', onLaunchButtonClick);
			if($('#'+m_oClickedNano).hasClass('w_oCircle03C')) {
				onButtonClick();
			} else {
				preventDefaultClick(true);
				log('onLaunchButtonClick: preventDefaultClicked 1');
			}
			
		} else
			//m_nLaunchInterval = setInterval(onButtonClick, 500);
			onButtonClick();
	}
	
	
	/**
	 * Description: 
	 * 
	 */
	function onButtonClick(e) {
		$('#w_oActivityTypeIconsHolder').hide();
		//log('setPointer from >>> onButtonClick');
		//setPointer($("#w_CurrentNanoHomeLink2").position().left, $("#w_CurrentNanoHomeLink2").width());
		if(m_bBadgeExtended) onCNABarExpandButtonClick();
		//if(!m_bLaunchThroughButton && m_bIsCommunityView && (e.currentTarget.id == m_oCurrentNano)) {
			//switchToLaunchViewV2();
			//return;
		//}
		showNRAElements();
		log("onButtonClick >>>>>>>>>>>>>>>>>>>m_oClickedNano: " + m_oClickedNano);
		if(e == undefined){
			if(m_bLaunchThroughButton) {
				if(m_bNanoOnceClicked==false) {
					m_oClickedNano = m_oCurrentNano;
				} else {
					m_oClickedNano = m_oLastClickedNano;
				}
				//m_oClickedNano = m_oCurrentNano;
			}
			
		} else {
			m_oClickedNano = e.currentTarget.id;
			if($('#'+m_oClickedNano).hasClass('w_oCircle03C')) {
				//log('Completed Nano clicked.');
				//preventDefaultClick(false);
				//return;
			}
			//if(m_bLaunchThroughButton) m_oClickedNano = m_oCurrentNano;
			//if(m_oClickedNano != m_oCurrentNano) {
			////////
			removeSelectedNanoClass();
			if($('#'+m_oClickedNano).hasClass('w_cNanoBtn') || $('#'+m_oClickedNano).hasClass('w_oCircle03C')) {
				$('#'+m_oClickedNano).addClass("w_cNanoBtnNSelected");
			}
			////////
			if(!m_bNanoOnceClicked || (m_oLastClickedNano=="" || m_oLastClickedNano!=m_oClickedNano)) {
				//swapNanoElements();
				//stackNanoElements();
				if(m_bIsLaunchView && (m_oClickedNano==m_oCurrentNano) && !m_bNanoOnceClicked) {
					//This condition is when click on current nano and its detail is already available on launch page.
				}else {
					switchToLaunchViewV2();
					m_bNanoOnceClicked = true;
					m_oLastClickedNano = m_oClickedNano;
					return;
				}
			}
		}
		//Update video popup data///////////////////////////////////////////////////////
		//Nano title
		var _sLaunchTitle = $('#' + m_oClickedNano).children('p').html();
		$('#w_oLaunchTitleV').html(_sLaunchTitle);
		//Others TODO
		//End of update video popup data////////////////////////////////////////////////
		//This function has been separated completeNanoActivity from here. 
		//completeNanoActivity()
		$('#w_oPopupBlocker').show();
		//freezeNanoButtons(true);
		showVideoRecommend();
		setBlockerAsDocHeight('#w_oPopupBlocker');
		//2013100715171 This change done as WAWA amend in which the learning will show started when it launched.
		$('#'+m_oClickedNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		//Nano status css shape
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeC');
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-chevron-right"></i>');
		m_bIsVideoPopupOpen = true;
		m_bNanoOnceClicked = false;
		m_oLastClickedNano = m_oClickedNano;
		updateLaunchPopup(3, '');
	}
	function updateLaunchPopup(p_sDocType, p_sThumbUrl) {
		//Document type to set icon
		if(p_sDocType==undefined || p_sDocType>3) p_sDocType=0;
		/*
		log('p_sDocType ' + p_sDocType);
		less.modifyVars({'@DOC_ICON_DEFAULT_URL': '@DOC_ICON_'+p_sDocType+'_URL'});
    	*/
    	switch(p_sDocType)
		{
		case 0:
			$('#m_oDownloadIconImage').attr('src', 'images/ico-doc-default.png');
			break;
		case 1:
			$('#m_oDownloadIconImage').attr('src', 'images/ico-doc-word.png');
			break;
		case 2:
			$('#m_oDownloadIconImage').attr('src', 'images/ico-doc-pdf.png');
			break;
		case 3:
			$('#m_oDownloadIconImage').attr('src', 'images/ico-doc-ppt.png');
			break;
		default:
			$('#m_oDownloadIconImage').attr('src', 'images/ico-doc-default.png');
		}
		//Thumbnail url
		if(p_sThumbUrl==undefined || p_sThumbUrl=="") p_sThumbUrl='images/tn-default.jpg';
		$('#m_oDownloadThumbnailImage').attr('src', p_sThumbUrl);
	}
	/**
	 * Description:
	 * 	● Changes Nano layout from current to visited state
	 * 	● Change z - order of current nano
	 *  ● Moves current nano to NW
	 *  ● animateAllNanoElements to fill empty space
	 *	● Updates learning doughnut
	 *	● Change status to 'completed' in data.
	 */
	function completeNanoActivity() {
		clearInterval(m_nLaunchInterval);
		if(m_sCurrentNanoStatus=='s'){
			modifyData();
			//m_oCurrentNano = m_sNanoPrefix + m_nVisitedNanos;	
			//setCurrentNanoData();
			m_bNanoOnceClicked = true;
			preventDefaultClick(false);
			log('completeNanoActivity: preventDefaultClicked 0');
			freezeNanoButtons(false);
			return;
		}
		m_bButtonClicked = true;
		m_nAnimationCount = 0;
		
		preventDefaultClick(true);
		log('completeNanoActivity: preventDefaultClicked 1');
		freezeNanoButtons(true);
		var _oObj;
		//if(m_oCurrentNano==undefined) _oObj = $(this);
		//else _oObj = $('#'+m_oCurrentNano);
		_oObj = $('#' + m_oClickedNano);
		/////////////
		_oObj.removeClass('w_cNanoBtn').addClass('w_oCircle03C');
		_oObj.children('.w_oData').removeClass('w_oData').addClass('w_oDataV');
		_oObj.children('.w_oDataC').removeClass('w_oData').addClass('w_oDataV');
		//Nano status css shape
		_oObj.children('.w_cNSHolder').find('.w_cNSShape').removeClass('w_cNSShape').addClass('w_cNSShapeV');
		_oObj.children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShape').addClass('w_cNSShapeV');
		_oObj.children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-check"></i>').addClass('w_cNSIconV');
				
		_oObj.removeClass("w_cNanoBtnNSelected");
		//////////////////////////////////////////////////////////////////
		modifyData();
		/////////////////////////////////////////////////////////////////
		//Change z order of current object.
		/*
		var _nCurrentNanoZ = parseInt($('#' + m_oCurrentNano).css("z-index"), 10);
		$(_oObj).css('z-index', _nCurrentNanoZ);
		if(m_nVisitedNanos>1) {
			var _oPreObject = m_sNanoPrefix + (m_nVisitedNanos - 1);
			var _nPreZIndex = parseInt($('#' + _oPreObject).css("z-index"), 10);
			$(_oObj).css('z-index', _nPreZIndex - 1);
		} else {
			var _oPreObject = m_sNanoPrefix + (m_nVisitedNanos);
			var _nPreZIndex = parseInt($('#' + _oPreObject).css("z-index"), 10);
			$(_oObj).css('z-index', _nPreZIndex - 1);
		}
		*/
		for(var i=0;i<m_nNanos ;i++ ) {
			$('#'+m_sNanoPrefix+i).css('z-index', -i);
		}
		
		//log(Math.atan2(_oObj.position().top -m_nRadius, _oObj.position().left-m_nRadius)*57.295);
		var _nStart = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
		m_nFinalDegree = _nStart;
		//log('onButtonClick: m_nFinalDegree - '+ m_nFinalDegree);
		var _nVCG = 0;
		m_nVisitedNanos == 0 ? _nVCG = 0 : _nVCG = m_nVisitedNanoGap;
		//Sets speed of movement
		m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
		m_nCurrNanoId = m_oCurrentNano.substr(m_sNanoPrefix.length, m_oCurrentNano.length);
		var _nCompSpeed = m_nNanoSlideAniSpeed;
		var _nDiff = m_nClickNanoId-m_nCurrNanoId;
		(_nDiff>=0 && _nDiff<20)?_nCompSpeed = m_nNanoSlideAniSpeed + (_nDiff*50):_nCompSpeed = 1500;
		//
		_oObj.animate({
			path : new $.path.arc({
				center : [m_nAxis, m_nAxis],
				radius : m_nRadius,
				start : _nStart,
				end : m_nStartDegOfVisitedNanos - _nVCG,
				dir : 1
			})
		}, _nCompSpeed, "easeOutQuad", function() {
			m_nVisitedNanos++;
			//animateNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, m_nNormalNanoGap);
			//Unbind commented to make clickable the completed nanos
			_oObj.unbind('click');
			log('completeNanoActivity - _oObj unbind -: ' + m_oClickedNano);
			///////////////////////////////// Change Ids
			if(m_oClickedNano == m_oCurrentNano) {
				
			} else {
				m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
				$('#'+m_sNanoPrefix+(m_nVisitedNanos-1)).attr("id", 'AAA');
				$('#'+m_oClickedNano).attr("id", m_sNanoPrefix+ (m_nVisitedNanos-1));
				for(var i=m_nVisitedNanos+1;i<=m_nClickNanoId;i++ ) {
					$('#'+m_sNanoPrefix+(i-1)).attr("id", "temp"+(i+1));
				}
				$('#'+'AAA').attr("id", (m_sNanoPrefix+ m_nVisitedNanos));
				for(var i=m_nVisitedNanos+1;i<=m_nClickNanoId;i++ ) {
					$('#'+"temp"+(i+1)).attr("id", (m_sNanoPrefix+(i)));
				}
				/*
				var m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
				$('#'+m_sNanoPrefix+(m_nVisitedNanos-1)).attr("id", 'AAA');
				$('#'+m_oClickedNano).attr("id", m_sNanoPrefix+ (m_nVisitedNanos-1));
				for(var i=m_nVisitedNanos+1;i<m_nNanos;i++ ) {
					$('#'+m_sNanoPrefix+(i-1)).attr("id", "temp"+(i+1));
				}
				$('#'+'AAA').attr("id", (m_sNanoPrefix+ m_nVisitedNanos));
				for(var i=m_nVisitedNanos+1;i<m_nNanos;i++ ) {
					$('#'+"temp"+(i+1)).attr("id", (m_sNanoPrefix+(i)));
				}
				*/
			}
			//////////////////////////////////////////////
			if (m_nVisitedNanos > 1) {
				//animateAllNanoElements(m_sNanoPrefix, 0, m_nVisitedNanos, m_nVisitedNanoGap);
				animateAllNanoElementsV3(m_sNanoPrefix, 0, m_nVisitedNanos, m_nVisitedNanoGap);
			} else {
				//All logics are for first click only
				if(m_oClickedNano == m_oCurrentNano) {
					//log('completeNanoActivity - Clicked nano is the current nano.');
					animateAllNanoElementsV3(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, m_nNormalNanoGap);
					if(m_nClickNanoId==(m_nNanos-1)) {
						//This is the state if community has only a learing.
						
						m_oCurrentNano = m_sNanoPrefix + m_nVisitedNanos;
						setCurrentNanoData();
						freezeNanoButtons(false);
						log("This is the state if community has only a learing." + m_oCurrentNano);
					}
				} else {
					//log('completeNanoActivity - not clicked nano the current nano.');
					//log('completeNanoActivity - m_nClickNanoId ' + m_nClickNanoId);
					//log('completeNanoActivity - m_nNanos-1 ' + (m_nNanos-1));
					if(m_nClickNanoId==(m_nNanos-1)) {
						log('completeNanoActivity - Do nothing because it is last nano. ');
						//////
						m_oCurrentNano = m_sNanoPrefix + m_nVisitedNanos;
						
						setCurrentNanoData();
						
						preventDefaultClick(false);
						log('completeNanoActivity: preventDefaultClicked 2');
						freezeNanoButtons(false);
						//
					} else {
						//log('completeNanoActivity - Animate from ' + m_nClickNanoId + ' to ' + m_nNanos);
						animateAllNanoElementsV3(m_sNanoPrefix, (Number(m_nClickNanoId)+1), m_nNanos, m_nNormalNanoGap);
					}
				}
			}
			//Update doughnut.
			updateLearningDoughnuts();
			m_bLaunchThroughButton = false;
		});
	}
	
	/*
	 * Description: Global method
	 * Call method: parent*.main**.openPopup()***;
	 * 				*	Window
	 * 				**	Object
	 * 				***	Method
	 */
	this.openPopup = function(p_oThis) {
		log('openPopup: ' + p_oThis);
		$('#w_oPopupBlocker').show();
	};
	/**
	 * 
	 *  
	 */
	function setCurrentNanoData() {
		var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
		if(m_bIsLaunchView) $('#w_oLaunchTitle').html("");
		else $('#w_oLaunchTitle').html(_sLaunchTitle);
		$('#w_oLaunchTitleLV').html(_sLaunchTitle + "&nbsp;");
		setLaunchViewTitle();
		//setLaunchButtonY();
	}
	/**
	 * 
	 */
	function modifyData() {
		//Modify JSON data
		//Modify current learing
		var _sNonoId = "";
		var _sCurrNanoDataId = "";
		for (var i in m_oCommunityData.community[m_nCurrentCommunityId].nanoList) {
			_sNonoId = m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].id;
			_sCurrNanoDataId = $('#'+m_oClickedNano).attr("data-id");
			if(_sNonoId == _sCurrNanoDataId){
				m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status = m_sCurrentNanoStatus;
				break;
			}
		}
		//Modify current community
		var _bCommCompleted = false;
		for (var i in m_oCommunityData.community[m_nCurrentCommunityId].nanoList) {
			if(m_oCommunityData.community[m_nCurrentCommunityId].nanoList[i].status == "c"){
				_bCommCompleted = true;
			}else {
				_bCommCompleted = false;
				break;
			}
		}
		if(_bCommCompleted) m_oCommunityData.community[m_nCurrentCommunityId].status = "c";
		//TODO: Modify the view and move community data to NW
	}
	/**
	 * Description: This function swaps the current nano with randomly clicked Nano 
	 * 
	 */
	function swapNanoElements() {
		freezeNanoButtons(true);
		var _oObj;
		_oObj = $('#' + m_oClickedNano);
		var _nStart = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
		var _oCNano;
		_oCNano = $('#' + m_oCurrentNano);
		var _nEnd = 90 - Math.atan2(_oCNano.position().top - m_nRadius, _oCNano.position().left - m_nRadius) * 57.295;
		_oObj.animate({
			path : new $.path.arc({
				center : [m_nAxis, m_nAxis],
				radius : m_nRadius,
				start : _nStart,
				end : _nEnd,
				dir : 1
			})
		}, m_nNanoSlideAniSpeed, "easeOutQuad", function() {
			
		});
		
		_oCNano.animate({
			path : new $.path.arc({
				center : [m_nAxis, m_nAxis],
				radius : m_nRadius,
				start : _nEnd,
				end : _nStart,
				dir : -1
			})
		}, m_nNanoSlideAniSpeed, "easeOutQuad", function() {
			freezeNanoButtons(false);
		});
		
		m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
		m_nCurrNanoId = m_oCurrentNano.substr(m_sNanoPrefix.length, m_oCurrentNano.length);
		$('#'+m_oCurrentNano).attr("id", "temp");
		$('#'+m_oClickedNano).attr("id", m_sNanoPrefix+ m_nCurrNanoId);
		$('#temp').attr("id", m_sNanoPrefix+ m_nClickNanoId);
		$('#'+m_oClickedNano).children('.w_oDataC').removeClass('w_oDataC').addClass('w_oData');
		//$('#'+m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		//Nano status css shape
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShapeC').addClass('w_cNSShape');
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-chevron-right"></i>');
		//
		setCurrentNanoData();
	}
	/**
	 * Description: This function shifts the nano array till clicked Nano and shifts clicked nano at launch. 
	 * 
	 */
	function stackNanoElements() {
		freezeNanoButtons(true);
		var _oObj;
		_oObj = $('#' + m_oClickedNano);
		var _nStart = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
		var _oCNano;
		_oCNano = $('#' + m_sNanoPrefix+m_nVisitedNanos);
		var _nEnd = 90 - Math.atan2(_oCNano.position().top - m_nRadius, _oCNano.position().left - m_nRadius) * 57.295;
		//
		m_nClickNanoId = m_oClickedNano.substr(m_sNanoPrefix.length, m_oClickedNano.length);
		m_nCurrNanoId = m_oCurrentNano.substr(m_sNanoPrefix.length, m_oCurrentNano.length);
		m_nCurrentNanoZ = $('#'+m_oCurrentNano).css('z-index');
		$('#'+m_oClickedNano).css('z-index', m_nCurrentNanoZ);

		//Sets speed of swap
		var _nDiff = m_nClickNanoId-m_nCurrNanoId;
		(_nDiff>0 && _nDiff<20)?m_nSwapSpeed = 300 + (_nDiff*40):m_nSwapSpeed = 1200;
		//
		_oObj.animate({
			path : new $.path.arc({
				center : [m_nAxis, m_nAxis],
				radius : m_nRadius,
				start : _nStart,
				end : _nEnd,
				dir : 1
			})
		}, m_nSwapSpeed, "easeOutQuad", function() {
				
		});
		
		animateAllNanoElements2(m_sNanoPrefix, m_nVisitedNanos, m_nClickNanoId, m_nNormalNanoGap, -1);
		
		for(var i=m_nVisitedNanos;i<m_nClickNanoId;i++ ) {
			$('#'+m_sNanoPrefix+i).attr("id", "temp"+(i+1));
		}
		$('#'+m_oClickedNano).attr("id", m_sNanoPrefix+ m_nVisitedNanos);
		for(var i=m_nVisitedNanos;i<m_nClickNanoId;i++ ) {
			$('#'+'temp'+(i+1)).attr("id", m_sNanoPrefix+(i+1));
		}
		
		$('#'+m_oClickedNano).children('.w_oDataC').removeClass('w_oDataC').addClass('w_oData');
		//$('#'+m_oCurrentNano).children('.w_oData').removeClass('w_oData').addClass('w_oDataC');
		//Nano status css shape
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShapeC').addClass('w_cNSShape');
		$('#'+m_oClickedNano).children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-minus"></i>');
		
		setCurrentNanoData();
		for(var i=m_nVisitedNanos+1;i<m_nClickNanoId;i++ ) {
			//if($('#'+'temp'+(i+1)).hasClass('w_oDataC')) {
				$('#'+m_sNanoPrefix+i).children('.w_oDataC').removeClass('w_oDataC').addClass('w_oData');
				//Nano status css shape
				$('#'+m_sNanoPrefix+i).children('.w_cNSHolder').find('.w_cNSShapeC').removeClass('w_cNSShapeC').addClass('w_cNSShape');
				$('#'+m_sNanoPrefix+i).children('.w_cNSHolder').find('.w_cNSIcon').html('<i class="fa fa-minus"></i>');
			//}
		}
		for(var i=m_nVisitedNanos+1;i<m_nNanos;i++ ) {
			$('#'+m_sNanoPrefix+i).css('z-index', (m_nCurrentNanoZ-i));
		}
	}
	/**
	 *
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 * NU
	 */
	function animateNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap) {
		var _nCount = p_nFrom;
		var _s = String(p_sObjPrefix + (_nCount));
		var _oObj = $('#' + _s);
		if (_nCount >= p_nTo)
			return;
		log('animateNanoElements');
		//m_nFinalDegree = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295 + p_nGap;
		var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
		$(_oObj).animate({
			path : new $.path.arc({
				center : [m_nAxis, m_nAxis],
				radius : m_nRadius,
				start : _nS,
				end : _nS + p_nGap,
				dir : 1
			})
		}, m_nNanoAniSpeed, "easeOutQuad", function() {
			_nCount++;
			//m_nFinalDegree = _nS;
			if (_nCount == p_nTo) {
				//if(p_nFrom==p_nTo)
				m_oCurrentNano = p_sObjPrefix + m_nVisitedNanos;
				$(document).trigger('EVENT_ANIMATION_COMPLETE');
				m_nVisitedCount = _nCount;
				_nCount = 0;
				//////
				var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
				$('#w_oLaunchTitle').html(_sLaunchTitle);
				//
				return;
			} else
				animateNanoElements(p_sObjPrefix, _nCount, p_nTo, p_nGap);
		});
	}
	/**
	 *
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 */
	function animateAllNanoElementsV3(p_sObjPrefix, p_nFrom, p_nTo, p_nGap) {
		preventDefaultClick(true);
		log('animateAllNanoElementsV3: preventDefaultClicked 0');
		var _nCount = p_nFrom;
		if (_nCount >= p_nTo) {
			log('animateAllNanoElements - Returned as it is final nano and no nano is available to animate now.');
			//
			switchToCommunityView();
			return;
		}
			
		log('animateAllNanoElements - m_bButtonClicked' + m_bButtonClicked);
		for (var i = _nCount; i < p_nTo; i++) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : _nS + p_nGap,
					dir : 1
				})
			}, m_nNanoAniSpeed, "easeOutQuad", function() {
				if (i == p_nTo) {
					m_oCurrentNano = p_sObjPrefix + m_nVisitedNanos;
					$(document).trigger('EVENT_ANIMATION_COMPLETE2');
					
					m_nAnimationCount++;
					//log('m_nAnimationCount  - ' + m_nAnimationCount)
					//if (m_nAnimationCount == (m_nNanos - 1))
					preventDefaultClick(false);
					log('animateAllNanoElementsV3: preventDefaultClicked 1');
					freezeNanoButtons(false);
					//if (m_nAnimationCount == (m_nClickNanoId - 1)) preventDefaultClick(false);
					if (m_nVisitedNanos >= m_nNanos) {
						preventDefaultClick(true);
						log('animateAllNanoElementsV3: preventDefaultClicked 2');
						$('#w_oHomeButton').unbind('click').bind('click', onHomeButtonClick);
						$('#w_oCNavIconHome').unbind('click').bind('click', onHomeButtonClick);
					}
					//////
					setCurrentNanoData();
					//
				}
			});
		}
	}
	/**
	 *
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 */
	function animateAllNanoElements(p_sObjPrefix, p_nFrom, p_nTo, p_nGap) {
		preventDefaultClick(true);
		log('animateAllNanoElements: preventDefaultClicked 0');
		var _nCount = p_nFrom;
		if (_nCount >= p_nTo)
			return;
		log('animateAllNanoElements - m_bButtonClicked' + m_bButtonClicked);
		for (var i = _nCount; i < p_nTo; i++) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : _nS + p_nGap,
					dir : 1
				})
			}, m_nNanoAniSpeed, "easeOutQuad", function() {
				if (i == p_nTo) {
					m_oCurrentNano = p_sObjPrefix + m_nVisitedNanos;
					$(document).trigger('EVENT_ANIMATION_COMPLETE');
	
					m_nAnimationCount++;
					//log('m_nAnimationCount  - ' + m_nAnimationCount)
					if (m_nAnimationCount == (m_nNanos - 1))
						preventDefaultClick(false);
						log('animateAllNanoElements: preventDefaultClicked 1');
					if (m_nVisitedNanos >= m_nNanos) {
						preventDefaultClick(true);
						log('animateAllNanoElements: preventDefaultClicked 2');
					}
					//
					setCurrentNanoData();
					//
				}
			});
		}
	}
	/**
	 *
	 * @param {Object} p_sObjPrefix
	 * @param {Object} p_nFrom
	 * @param {Object} p_nTo
	 * @param {Object} p_nGap
	 */
	function animateAllNanoElements2(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nDir) {
		preventDefaultClick(true);
		log('animateAllNanoElements: animateAllNanoElements2 0');
		var _nCount = p_nFrom;
		if (_nCount >= p_nTo) return;
		for (var i = _nCount; i < p_nTo; i++) {
			var _s = String(p_sObjPrefix + (i));
			var _oObj = $('#' + _s);
			var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
			$(_oObj).animate({
				path : new $.path.arc({
					center : [m_nAxis, m_nAxis],
					radius : m_nRadius,
					start : _nS,
					end : _nS - p_nGap,
					dir : p_nDir
				})
			}, m_nSwapSpeed, "easeOutQuad", function() {
				freezeNanoButtons(false);
				preventDefaultClick(false);
				log('animateAllNanoElements: animateAllNanoElements2 1');
			});
		}
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
		if(p_nTo==0 || p_nTo == undefined) {
			log('hideAllCommunities: No community available to hide.');
		} else {
			for (var i = p_nFrom; i < p_nTo; i++) {
				var _s = String(p_sObjPrefix + (i));
				var _oObj = $('#' + _s);
				var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
				$(_oObj).animate({
					path : new $.path.arc({
						center : [m_nXAxisCom, m_nYAxisCom],
						radius : m_nRadiusCom,
						start : _nS,
						end : p_nEndDegree,
						dir : p_nDir
					})
				}, p_nTime, "easeOutQuad", function() {
					if (!done) {
						log('...hideAllCommunities');
						done = true;
						
						//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
						//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, -22, 160, -1);
					}
				});
				$(_oObj).fadeOut(200);
			}
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
		if(p_nTo==0 || p_nTo==undefined) {
			log('showAllCommunities: No community available to show.');
			var _s = String(p_sObjPrefix + 0);
			var _oObj = $('#' + _s);
			_oObj.hide();
		} else {
			var _nStep = p_nStartDegree;
			for (var i = p_nFrom; i < p_nTo; i++) {
				var _s = String(p_sObjPrefix + (i));
				var _oObj = $('#' + _s);
				
				var _nS = 90 - Math.atan2(_oObj.position().top - m_nRadius, _oObj.position().left - m_nRadius) * 57.295;
				$(_oObj).animate({
					path : new $.path.arc({
						center : [m_nXAxisCom, m_nYAxisCom],
						radius : m_nRadiusCom,
						start : _nS,
						end : _nStep,
						dir : p_nDir
					})
				}, m_nShowTime, "easeOutQuad", function() {
					
				});
				m_aCommDeg.push(_nStep);
				_nStep = _nStep + p_nGap;
				$(_oObj).fadeIn(200);
			}
		}
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
					});
	
					var startX = _oStaticElement.position().left;
					var endX = _oCurrentElement.position().left;
					_oCurrentElement.css({
						'left' : startX
					});
					//log("endX: " + endX + " endY: " + endY);
					_oCurrentElement.animate({
						'top' : endY,
						'left' : endX
					}, 10);
				} else {
					$(_oElement + ":eq(" + _nCurrentElement + ")").fadeIn(100);
				}
				_nCurrentElement++;
			} else {
				clearInterval(_nInterval);
				$('div').not('#w_oPopupBlocker, .w_oAvgLearningDoughnut, .w_oLearningDoughnut, #w_oCommData, #w_oPraiseHomeView, #w_oProfileFrame, #w_oComView02, #w_oRecomandNanoHomeView, #w_oRecomandNanoCommView, #w_oCShareUpdateCommView, #w_oRecentActivityLaunch, #w_oComLaunchViewLinks, #w_oRateNanoLaunchView, #w_oRecomandNanoLaunchView, #w_oCircle02HomeI2, #w_oRecentActivityBlocker, #w_oTooltip, #w_oOthersPopup, #w_oCertificatePopupBlocker').show(); // Recent activity
				if(!m_bDisplayWelcomeScreen) {
					$('#w_oWelcomePopupBlocker').hide();
					$(document).trigger('WELCOME_POPUP_HIDES');
				}
				drawLearningDoughnut();
				updateLearningDoughnuts();
				//This part of code animate nanos initially. If not required then comment and uncomment drawOnCircumfrenceV2 function from document ready.
				//showAllVisitedNanoElements(m_sNanoPrefix, m_nVisitedNanos - 1, 0, m_nVisitedNanoGap, m_nStartDegOfVisitedNanos, 1);
				//showAllNormalNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, (-1) * m_nNormalNanoGap, m_nStartDegOfNormalNanos, -1);
				//
				$('#w_oUserIconsHolder').hide();
				$('#w_oCommsHolder').css('z-index', 999);
				//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
				//This function has been moved to 'onWelcomePopupHide'. Communities show when welcome screen hides
				//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, m_nGap, m_nStartDegreeOfCom, -1);
				//
				
				addProfileDDEvent();
				addNotifyDDEvent();
				addAdminDDEvent(); // Admin Menu
				
				addEventOnPopup();
				addEventOnProfileFrame();
				addEventsOnHomeViewLinks();
				addEventsOnCommViewLinks();
				addEventsOnCommLaunchViewLinks();
				addEventsOnIcons();
				//$('img, textarea, input, video, source').not('#w_oHRecomendTxt2, #w_oHRecomendTxt3').show();
				$('img, textarea, input, video, source').not('#w_oHRecomendTxt2, #w_oHRecomendTxt3, #w_oCRecomendTxt2, #w_oCRecomendTxt3, #w_oPRecentActivitySpinner, #w_oODPMoreButtonSpinner').show(); //Recent activity
				addEventFormCom(); 
				addDocumentClickEvent();
				if(m_bDisplayWelcomeScreen) {
					adjustWelcomeScreen();
					setBlockerAsDocHeight('#w_oWelcomePopupBlocker');
				}
				log('setPointer from >>> animateDOMObjects');
				setPointer($("#w_oShareUpdateHomeLink").position().left, $("#w_oShareUpdateHomeLink").width());
				
				log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>window: ' + $(window).height())
				log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>document: ' + $(document).height())
				$('.w_cBodyBgContainer').height($(document).height());
				
				return false;
			}
		}
	}
	
	//Deep Code Starts Here
	function showNRAElements(){
		$('#w_oHRecentActivityMoreButtonN').unbind('click').bind('click', onNRecenctActivity); // Recent Activity Blocker
		$("#w_oRecentActivityCMoreButton").hide();
		$("#w_oRecentActivityLaunchMoreButton").show();
		$("#w_oRecentActivityCommunity").hide();
		$("#w_oRecentActivityLaunch").show();
	}
	function showCRAElements(){
		$("#w_oRecentActivityCMoreButton").show();
		$("#w_oRecentActivityLaunchMoreButton").hide();
		$('#w_oCommActCommView').hide();
		$('#w_oRecentActivityCommunity').show();
	}
	function showCurrLearCRAElements(){
		$("#w_oRecentActivityCMoreButton").hide();
		$("#w_oRecentActivityLaunchMoreButton").hide();
		$('#w_oRecomandNanoLaunchView').hide();
		$('#w_oRecentActivityCommunity').hide();
	}
	
	var m_bIsNanoRecommend = false;
	var m_bIsComRecommend = false;
	function showRecentActivity(view){
		//alert("Deep")
		//alert(view)
		noPost = false;
		exceedPost = false;	
		var totalHeight = $("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").height()+$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").height();
		showRecentActivityData(false,view)
		//alert(view)
		//alert(totalHeight)
		if(totalHeight>175){
			$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").show();
			if(!m_bIsNanoRecommend){
				$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child(4)").show();
				$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child(4) .w_oTableCell").css("height","auto")
				$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child(4) p.w_oLayout11").css("padding-top","5px")
			}
			
		}else{
			$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").show();
			//alert(m_bIsNanoRecommend)
			if(!m_bIsNanoRecommend){
				$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").show();
			}else{
				$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide();	
			}
			//alert("!!!!!!!!!m_bIsComRecommend :: " + m_bIsComRecommend)	
			
		}
		
		if(noPost==true){
			$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child(3)").show();
		}
		if(exceedPost==true){
			$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child(4)").show();
		}
		if($("#w_oRecomandNanoLaunchView").css("display")!="block"){
			m_bIsNanoRecommend = false;
		}
		if($("#w_oCRecomendTxt2").css("display")!="inline-block"){
			m_bIsComRecommend = false;
			//alert("m_bIsComRecommend :: " + m_bIsComRecommend)
		}
		
	}
	function showRecentActivityData(show,view){	
		for(i=2;i<6;i++){
			if(show){
				$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child("+i+")").show();
				$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child("+i+")").show();
				
			}else{
				$("#w_oRecentActivity"+view+" .w_oTableRow:nth-child("+i+")").hide();
				$("#w_oRecentActivity"+view+" .w_oTableRowNewDiv .w_oTableRow1:nth-child("+i+")").hide();
			}
		}
	}
	function expandForm(view){
		showRecentActivityData(false,view)
		$("#w_oRecentActivity"+view).css("height","83px"); // New post function
	}
	
	function collapseForm(view){
		$("#w_oRecentActivity"+view).css("height","204px"); // New post function
		showRecentActivity(view)
	}
	
	
	function addEventFormCom(){
		//Home View - Share Updates
		$("#w_oShareUpdateTable").on("click", function(e) {								 
			e.stopPropagation();
		});
		$("#w_oHShareTxt1").on("click", function(e) {
			e.stopPropagation();
			onHShareFormClick();
		});
		$("#token-input-w_oHShareTxt2").on("click", function(e) {
			e.stopPropagation();
			onHShareFormClick();
		});
		
		$('#w_oHShareTxt1').unbind('focus').bind('focus', onHShareFormClick);
		$('#w_oHShareTxt1').unbind('focus').bind('focus', m_oCRoot.onHShareFormKeyPress);
		$('#token-input-w_oHShareTxt2').unbind('focus').bind('focus', onHShareFormClick);
		$('#token-input-w_oHShareTxt2').unbind('focus').bind('focus', m_oCRoot.onHShareFormKeyPress);
		$('#w_oHShareTxt1').unbind('keypress').bind('keypress', m_oCRoot.onHShareFormKeyPress);
		$('#token-input-w_oHShareTxt2').unbind('keypress').bind('keypress', m_oCRoot.onHShareFormKeyPress);
		$('#w_oHShareTxt1').unbind('keyup').bind('keyup', m_oCRoot.onHShareFormKeyPress);
		$('#token-input-w_oHShareTxt2').unbind('keyup').bind('keyup', m_oCRoot.onHShareFormKeyPress);
		
		$('#w_oHShareButton').unbind('focus').unbind('click');
		
		
		//Home View - Praise someone bind events
		$("#w_oHPraiseTable").on("click", function(e) {								 
			e.stopPropagation();
		});
		$("#token-input-w_oHPraiseTxt1").on("click", function(e) {
			e.stopPropagation();
			onHPraiseFormClick();
		});
		$("#w_oHPraiseTxt2").on("click", function(e) {
			e.stopPropagation();
			onHPraiseFormClick();
		});
		$("#token-input-w_oHPraiseTxt3").on("click", function(e) {
			e.stopPropagation();
			onHPraiseFormClick();
		});
		
		$('#token-input-w_oHPraiseTxt1').unbind('focus').bind('focus', onHPraiseFormClick());
		$('#token-input-w_oHPraiseTxt1').unbind('focus').bind('focus', m_oCRoot.onHPraiseFormKeyPress());
		$('#w_oHPraiseTxt2').unbind('focus').bind('focus', onHPraiseFormClick());
		$('#token-input-w_oHPraiseTxt3').unbind('focus').bind('focus', onHPraiseFormClick());
		$('#token-input-w_oHPraiseTxt3').unbind('focus').bind('focus', m_oCRoot.onHPraiseFormKeyPress());
		$('#token-input-w_oHPraiseTxt1').unbind('keypress').bind('keypress', m_oCRoot.onHPraiseFormKeyPress());
		$('#w_oHPraiseTxt2').unbind('keypress').bind('keypress', m_oCRoot.onHPraiseFormKeyPress());
		$('#token-input-w_oHPraiseTxt3').unbind('keypress').bind('keypress', m_oCRoot.onHPraiseFormKeyPress());
		$('#token-input-w_oHPraiseTxt1').unbind('keyup').bind('keyup', m_oCRoot.onHPraiseFormKeyPress());
		$('#w_oHPraiseTxt2').unbind('keyup').bind('keyup', m_oCRoot.onHPraiseFormKeyPress());
		$('#token-input-w_oHPraiseTxt3').unbind('keyup').bind('keyup', m_oCRoot.onHPraiseFormKeyPress());
		
		$('#w_oHPraiseButton').unbind('focus').unbind('click');
		
		//Home View - Recomend a nano bind events
		$("#w_oComRecomendTable").on("click", function(e) {								 
			e.stopPropagation();
		});
		$("#token-input-w_oHRecomendTxt1").on("click", function(e) {
			e.stopPropagation();
			onHUserFormClick();
		});
		$("#w_oHRecomendTxt2").on("click", function(e) {
			e.stopPropagation();
			onHUserFormClick();
		});
		$("#token-input-w_oHRecomendTxt3").on("click", function(e) {
			e.stopPropagation();
			onHUserFormClick();
		});
		
		$('#token-input-w_oHRecomendTxt1').unbind('focus').bind('focus', onHUserFormClick);
		$('#token-input-w_oHRecomendTxt1').unbind('focus').bind('focus', m_oCRoot.onHUserFormKeyPress);
		$('#w_oHRecomendTxt2').unbind('focus').bind('focus', onHUserFormClick);
		$('#token-input-w_oHRecomendTxt3').unbind('focus').bind('focus', onHUserFormClick);
		$('#token-input-w_oHRecomendTxt3').unbind('focus').bind('focus', m_oCRoot.onHUserFormKeyPress);
		$('#token-input-w_oHRecomendTxt1').unbind('keypress').bind('keypress', m_oCRoot.onHUserFormKeyPress);
		$('#w_oHRecomendTxt2').unbind('keypress').bind('keypress', m_oCRoot.onHUserFormKeyPress);
		$('#token-input-w_oHRecomendTxt3').unbind('keypress').bind('keypress', m_oCRoot.onHUserFormKeyPress);
		$('#token-input-w_oHRecomendTxt1').unbind('keyup').bind('keyup', m_oCRoot.onHUserFormKeyPress);
		$('#w_oHRecomendTxt2').unbind('keyup').bind('keyup', m_oCRoot.onHUserFormKeyPress);
		$('#token-input-w_oHRecomendTxt3').unbind('keyup').bind('keyup', m_oCRoot.onHUserFormKeyPress);
		
		$('#w_oHRecommendButton').unbind('focus').unbind('click');
		
		//Com view - Recomend a Nano
		$("#w_oCRecomendTable").on("click", function(e) {
			e.stopPropagation();
		});
		$("#token-input-w_oCRecomendTxt1").on("click", function(e) {
			e.stopPropagation();
			onCUserFormClick();
		});
		$("#w_oCRecomendTxt2").on("click", function(e) {
			e.stopPropagation();
			onCUserFormClick();
		});
		$("#token-input-w_oCRecomendTxt3").on("click", function(e) {
			e.stopPropagation();
			onCUserFormClick();
		});
		
		$('#token-input-w_oCRecomendTxt1').unbind('focus').bind('focus', onCUserFormClick);
		$('#token-input-w_oCRecomendTxt1').unbind('focus').bind('focus', m_oCRoot.onCUserFormKeyPress);
		$('#w_oCRecomendTxt2').unbind('focus').bind('focus', onCUserFormClick);
		$('#token-input-w_oCRecomendTxt3').unbind('focus').bind('focus', onCUserFormClick);
		$('#token-input-w_oCRecomendTxt3').unbind('focus').bind('focus', m_oCRoot.onCUserFormKeyPress);
		$('#token-input-w_oCRecomendTxt1').unbind('keypress').bind('keypress', m_oCRoot.onCUserFormKeyPress);
		$('#w_oCRecomendTxt2').unbind('keypress').bind('keypress', m_oCRoot.onCUserFormKeyPress);
		$('#token-input-w_oCRecomendTxt3').unbind('keypress').bind('keypress', m_oCRoot.onCUserFormKeyPress);
		$('#token-input-w_oCRecomendTxt1').unbind('keyup').bind('keyup', m_oCRoot.onCUserFormKeyPress);
		$('#w_oCRecomendTxt2').unbind('keyup').bind('keyup', m_oCRoot.onCUserFormKeyPress);
		$('#token-input-w_oCRecomendTxt3').unbind('keyup').bind('keyup', m_oCRoot.onCUserFormKeyPress);
		$('#w_oCRecommendButton').unbind('click').unbind('click');
		
		//Com View - Share Update
		$("#w_oCShareUpdateTable").on("click", function(e) {								 
			e.stopPropagation();
		});
		$("#w_oCShareTxt1").on("click", function(e) {
			e.stopPropagation();
			onCShareFormClick();
		});
		$("#token-input-w_oCShareTxt2").on("click", function(e) {
			e.stopPropagation();
			onCShareFormClick();
		});
		
		$('#w_oCShareTxt1').unbind('focus').bind('focus', onCShareFormClick);
		$('#w_oCShareTxt1').unbind('focus').bind('focus', m_oCRoot.onCShareFormKeyPress);
		$('#token-input-w_oCShareTxt2').unbind('focus').bind('focus', onCShareFormClick);
		$('#token-input-w_oCShareTxt2').unbind('focus').bind('focus', m_oCRoot.onCShareFormKeyPress);
		$('#w_oCShareTxt1').unbind('keypress').bind('keypress', m_oCRoot.onCShareFormKeyPress);
		$('#token-input-w_oCShareTxt2').unbind('keypress').bind('keypress', m_oCRoot.onCShareFormKeyPress);
		$('#w_oCShareTxt1').unbind('keyup').bind('keyup', m_oCRoot.onCShareFormKeyPress);
		$('#token-input-w_oCShareTxt2').unbind('keyup').bind('keyup', m_oCRoot.onCShareFormKeyPress);
		$('#w_oCShareButton').unbind('focus').unbind('click');
		
		//Nano form bind events
		$("#w_oNRecomendTable").on("click", function(e) {
			e.stopPropagation();
		});
		$("#w_oNRecomendTxt1").on("click", function(e) {
			e.stopPropagation();
			onNUserFormClick();
		});
		$("#token-input-w_oNRecomendTxt2").on("click", function(e) {
			e.stopPropagation();
			onNUserFormClick();
		});
		
		$('#w_oNRecomendTxt1').unbind('focus').bind('focus', onNUserFormClick);
		$('#token-input-w_oNRecomendTxt2').unbind('focus').bind('focus', onNUserFormClick);
		$('#token-input-w_oNRecomendTxt2').unbind('focus').bind('focus', m_oCRoot.onNUserFormKeyPress);
		$('#w_oNRecomendTxt1').unbind('keypress').bind('keypress', m_oCRoot.onNUserFormKeyPress);
		$('#token-input-w_oNRecomendTxt2').unbind('keypress').bind('keypress', m_oCRoot.onNUserFormKeyPress);
		$('#w_oNRecomendTxt1').unbind('keyup').bind('keyup', m_oCRoot.onNUserFormKeyPress);
		$('#token-input-w_oNRecomendTxt2').unbind('keyup').bind('keyup', m_oCRoot.onNUserFormKeyPress);
		$('#w_oNRecommendButton').unbind('click').unbind('click');
		
		//Video form bind events
		$("#w_oVideoRecomendTable").on("click", function(e) {
			e.stopPropagation();
		});
		$("#w_oVRecomendTxt1").on("click", function(e) {
			e.stopPropagation();
			onVUserFormClick();
		});
		$("#token-input-w_oVRecomendTxt2").on("click", function(e) {
			e.stopPropagation();
			onVUserFormClick();
		});
		
		$('#w_oVRecomendTxt1').bind('focus', onVUserFormClick);
		$('#token-input-w_oVRecomendTxt2').bind('focus', onVUserFormClick);
		$('#token-input-w_oVRecomendTxt2').bind('focus', m_oCRoot.onVUserFormKeyPress);
		$('#w_oVRecomendTxt1').bind('keypress', m_oCRoot);
		$('#token-input-w_oVRecomendTxt2').bind('keypress', m_oCRoot.onVUserFormKeyPress);
		$('#w_oVRecomendTxt1').bind('keyup', m_oCRoot.onVUserFormKeyPress);
		$('#token-input-w_oVRecomendTxt2').bind('keyup', m_oCRoot.onVUserFormKeyPress);
		$('#w_oVRecommendButton').unbind('click');
	}
	
	//Home Form Function
	
	//Share Updates Form Function
	function onHShareFormClick(){
		expandForm("Home") // Home form - Expand		
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide();
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide();	
		$('#w_oShareUpdateTxtWrapper').animate({"height":"83px","overflow":"none"},"fast");
		$('.w_oHShareExpandFormWrapper').css({"height":"auto","overflow":"auto"})
		$('#w_oHShareUpdateFirstField').css({"width":"346px"});
		$('#w_oHShareTxt1').css({"width":"346px"});
		$('#w_oHShareArtficialButton').hide();
		$('.w_oHRecomendPost1').css({"min-height":"50px"});
		$('#w_oHShareTxt2').show();
		$('#w_oHShareButton').show();
	}
	
	m_oCRoot.onHShareFormKeyPress=function(){
		if($("#w_oHShareTxt1").val()!="" || $("#w_oHShareTxt2").val()!=""){
			$('#w_oHShareButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oHShareButton').unbind('click').bind('click', onHShareFormHide);
		}
		if(($("#w_oHShareTxt1").val()=="") || ($("#w_oHShareTxt2").val()=="")){
			$('#w_oHShareButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oHShareButton').unbind('click');
		}
	}
	
	function onHShareFormHide(){	
		$("#w_oHShareTxt1").val('');
		$("#w_oHShareTxt2").val('');
		$("#w_oHShareTxt2").tokenInput("clear",{focus:false});
		$("#w_oHShareTxt2").hide();
		$('#w_oShareUpdateTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast",function(){
			collapseForm("Home") // Home form - Expand																									 
		});
		$('.w_oHShareExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
		$('#w_oHShareButton').hide();
		$('#w_oHShareUpdateFirstField').css({"width":"223px"});
		$('#w_oHShareTxt1').css({"width":"213px"});
		$('#w_oHShareArtficialButton').show();
		$('.w_oHRecomendPost1').css({"min-height":"188px"});
		//
		$("#w_oHShareUpdatePostTo").show();
		$(".w_cPostToDD ul.token-input-list-style2").hide();
		
	}
	
	function onHShareFormDocHide(){
		if(($("#w_oHShareTxt1").val()=="") && ($("#w_oHShareTxt2").val()=="")){	
			$("#w_oHShareTxt1").val('');
			$("#w_oHShareTxt2").val('');
			$("#w_oHShareTxt2").tokenInput("clear",{focus:false});
			$("#w_oHShareTxt2").hide();
			$('#w_oShareUpdateTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
				collapseForm("Home") // Home form - Expand																								  
			});
			$('.w_oHShareExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
			$('#w_oHShareButton').hide();
			$('#w_oHShareUpdateFirstField').css({"width":"223px"});
			$('#w_oHShareTxt1').css({"width":"213px"});
			$('#w_oHShareArtficialButton').show();
			$('.w_oHRecomendPost1').css({"min-height":"188px"});
			//
			$("#w_oHShareUpdatePostTo").show();
			$("#w_oHShareTxt3").tokenInput("clear");
			$(".w_cPostToDD ul.token-input-list-style2").hide();
		}
	}
	
	//Praise Someone Form
	function onHPraiseFormClick(){
		expandForm("Home") // Home form - Expand
		/*$("#w_oRecentActivityHome .w_oTableRow:nth-child(4)").show();
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) .w_oTableCell").css({"height":"auto",})
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) p.w_oLayout11").css({"padding-top":"5px"})
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) p.w_oLayout12").css({"padding-top":"0px"})*/
		
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide();
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide();

		$('#w_oPraiseTxtWrapper').animate({"height":"141px","overflow":"none"},"fast");
		$('.w_oHPraiseFormWrapper').css({"height":"auto","overflow":"auto"})
		$('#w_oHPraiseFirstField').css({"width":"346px"});
		$('#w_oHPraiseArtficialButton').hide();
		$('.w_oHRecomendPost1').css({"min-height":"50px"});
		$('#w_oHPraiseTxt2').show();
		$('#w_oHPraiseTxt3').show();
		$('#w_oHPraiseButton').show();
	}
	
	m_oCRoot.onHPraiseFormKeyPress=function(){
		if($("#w_oHPraiseTxt1").val()!="" || $("#w_oHPraiseTxt2").val()!="" || $("#w_oHPraiseTxt3").val()!=""){
			$('#w_oHPraiseButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oHPraiseButton').unbind('click').bind('click', onHPraiseFormHide);
		}
		if(($("#w_oHPraiseTxt1").val()=="") || ($("#w_oHPraiseTxt2").val()=="") || ($("#w_oHPraiseTxt3").val()=="")){
			$('#w_oHPraiseButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oHPraiseButton').unbind('click');
		}
	}
	
	function onHPraiseFormHide(){	
		$("#w_oHPraiseTxt1").val('');
		$("#w_oHPraiseTxt2").val('');
		$("#w_oHPraiseTxt3").val('');
		$("#w_oHPraiseTxt1").tokenInput("clear",{focus:false});
		$("#w_oHPraiseTxt3").tokenInput("clear",{focus:false});
		$("#w_oHPraiseTxt4").tokenInput("clear",{focus:false});
		$("#w_oHPraiseTxt2").hide();
		$("#w_oHPraiseTxt3").hide();
		$('#w_oPraiseTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast",function(){
			collapseForm("Home") // Home form - Expand																									 
		});
		$('.w_oHPraiseFormWrapper').css({"height":"20px","overflow":"hidden"})
		$('#w_oHPraiseButton').hide();
		$('#w_oHPraiseFirstField').css({"width":"213px"});
		$('#w_oHPraiseArtficialButton').show();
		$('.w_oHRecomendPost1').css({"min-height":"188px"});
		//
		$("#w_oHPraisePostTo").show();
		$(".w_cPostToDD ul.token-input-list-style2").hide();
		
	}
	
	function onHPraiseFormDocHide(){
		if(($("#w_oHPraiseTxt1").val()=="") && ($("#w_oHPraiseTxt2").val()=="") && ($("#w_oHPraiseTxt3").val()=="")){	
			$("#w_oHPraiseTxt1").val('');
			$("#w_oHPraiseTxt2").val('');
			$("#w_oHPraiseTxt3").val('');
			$("#w_oHPraiseTxt1").tokenInput("clear",{focus:false});
			$("#w_oHPraiseTxt3").tokenInput("clear",{focus:false});
			$("#w_oHPraiseTxt4").tokenInput("clear",{focus:false});
			$("#w_oHPraiseTxt2").hide();
			$("#w_oHPraiseTxt3").hide();
			$('#w_oPraiseTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
				collapseForm("Home") // Home form - Expand																								  
			});
			$('.w_oHPraiseFormWrapper').css({"height":"20px","overflow":"hidden"})
			$('#w_oHPraiseButton').hide();
			$('#w_oHPraiseFirstField').css({"width":"213px"});																				  
			$('#w_oHPraiseArtficialButton').show();
			$('.w_oHRecomendPost1').css({"min-height":"188px"});
			//
			$("#w_oHPraisePostTo").show();
			$("#w_oHPraiseTxt4").tokenInput("clear");
			$(".w_cPostToDD ul.token-input-list-style2").hide();
		}
	}
	
	//Recomend Nano Form
	function onHUserFormClick(){
		expandForm("Home") // Home form - Expand
		/*$("#w_oRecentActivityHome .w_oTableRow:nth-child(4)").show();
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) .w_oTableCell").css({"height":"auto",})
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) p.w_oLayout11").css({"padding-top":"5px"})
		$("#w_oRecentActivityHome .w_oTableRow:nth-child(4) p.w_oLayout12").css({"padding-top":"0px"})*/
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide();
		$("#w_oRecentActivityHome .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide();
		
		$('#w_oComRecomendTxtWrapper').animate({"height":"141px","overflow":"none"},"fast");
		$('.w_oHExpandFormWrapper').css({"height":"auto","overflow":"auto"})
		$('#w_oHFirstField').css({"width":"346px"});
		$('#w_oHRecommendArtficialButton').hide();
		$('.w_oHRecomendPost1').css({"min-height":"50px"});
		$('#w_oHRecomendTxt2').show();
		$('#w_oHRecomendTxt3').show();
		$('#w_oHRecommendButton').show();
	}
	
	m_oCRoot.onHUserFormKeyPress=function(){
		if($("#w_oHRecomendTxt1").val()!="" && $("#w_oHRecomendTxt2").val()!="" && $("#w_oHRecomendTxt3").val()!=""){
			$('#w_oHRecommendButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oHRecommendButton').unbind('click').bind('click', onHUserFormHide);
		}
		if(($("#w_oHRecomendTxt1").val()=="") && ($("#w_oHRecomendTxt2").val()=="") && ($("#w_oHRecomendTxt3").val()=="")){
			$('#w_oHRecommendButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oHRecommendButton').unbind('click');
		}
	}
	
	function onHUserFormHide(){	
		$("#w_oHRecomendTxt1").val('');
		$("#w_oHRecomendTxt2").val('');
		$("#w_oHRecomendTxt3").val('');
		$("#w_oHRecomendTxt1").tokenInput("clear",{focus:false});
		$("#w_oHRecomendTxt3").tokenInput("clear",{focus:false});
		$("#w_oHRecomendTxt4").tokenInput("clear",{focus:false});
		$("#w_oHRecomendTxt2").hide();
		$("#w_oHRecomendTxt3").hide();
		$("#token-input-w_oHRecomendTxt1").focus();
		$('#w_oComRecomendTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast",function(){
			collapseForm("Home") // Home form - Expand																									 
		});
		$('.w_oHExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
		$('#w_oHRecommendButton').hide();
		$('#w_oHFirstField').css({"width":"213px"});
		$('#w_oHRecommendArtficialButton').show();
		$('.w_oHRecomendPost1').css({"min-height":"188px"});
		//
		$("#w_oHPostTo").show();
		$(".w_cPostToDD ul.token-input-list-style2").hide();
		
	}
	
	function onHUserFormDocHide(){
		if(($("#w_oHRecomendTxt1").val()=="") && ($("#w_oHRecomendTxt2").val()=="") && ($("#w_oHRecomendTxt3").val()=="")){	
			$("#w_oHRecomendTxt1").val('');
			$("#w_oHRecomendTxt2").val('');
			$("#w_oHRecomendTxt3").val('');
			$("#w_oHRecomendTxt1").tokenInput("clear",{focus:false});
			$("#w_oHRecomendTxt3").tokenInput("clear",{focus:false});
			$("#w_oHRecomendTxt4").tokenInput("clear",{focus:false});
			$("#w_oHRecomendTxt2").hide();
			$("#w_oHRecomendTxt3").hide();
			$('#w_oComRecomendTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
				collapseForm("Home") // Home form - Expand																								  
			});
			$('.w_oHExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
			$('#w_oHRecommendButton').hide();
			$('#w_oHFirstField').css({"width":"213px"});																				  
			$('#w_oHRecommendArtficialButton').show();
			$('.w_oHRecomendPost1').css({"min-height":"188px"});
			//
			$("#w_oHPostTo").show();
			$("#w_oHRecomendTxt4").tokenInput("clear");
			$(".w_cPostToDD ul.token-input-list-style2").hide();
		}
	}
	
	
	//Com View - Recomend a Nano - Form Function
	function onCUserFormClick(){
		expandForm("Community") // Home form - Expand
		
		$("#w_oRecentActivityCommunity .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide(); //New code to hide Recent Activity
		$("#w_oRecentActivityCommunity .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide(); //New code to hide Recent Activity
		
		$('#w_oNanoRecomendTxtWrapper').animate({"height":"141px","overflow":"none"},"fast", function(){
			$('.w_oCExpandFormWrapper').css({"height":"auto","overflow":"auto"})																									
			$('#w_oCRecomendTxt2').show();
			$('#w_oCRecomendTxt3').show();
			$('#w_oCRecommendButton').show();
		});
		$('#w_oCFirstField').css({"width":"346px"});
		$('#w_oCRecommendArtficialButton').hide();
		$('#w_oNanoRecomendPost2').hide();
		
		
		
	}
	
	m_oCRoot.onCUserFormKeyPress = function(){
		if($("#w_oCRecomendTxt1").val()!="" && $("#w_oCRecomendTxt2").val()!="" && $("#w_oCRecomendTxt3").val()!=""){
			$('#w_oCRecommendButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oCRecommendButton').unbind('click').bind('click', onCUserFormHide);
		}
		if(($("#w_oCRecomendTxt1").val()=="") || ($("#w_oCRecomendTxt2").val()=="") || ($("#w_oCRecomendTxt3").val()=="")){
			$('#w_oCRecommendButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oCRecommendButton').unbind('click');
		}
	}
	
	
	function onCUserFormHide(){
		$("#w_oCRecomendTxt1").val('');
		$("#w_oCRecomendTxt2").val('');
		$("#w_oCRecomendTxt3").val('');
		$("#w_oCRecomendTxt2").hide();
		$("#w_oCRecomendTxt3").hide();
		$("#w_oCRecomendTxt1").tokenInput("clear",{focus:false});
		$("#w_oCRecomendTxt3").tokenInput("clear",{focus:false});
		//$("#token-input-w_oCRecomendTxt1").focus();
		$('#w_oNanoRecomendTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
			collapseForm("Community");																									   
		});
		$('.w_oCExpandFormWrapper').css({"height":"20px","overflow":"hidden"});
		$('#w_oCFirstField').css({"width":"213px"});
		$('#w_oCRecommendButton').hide();
		$('#w_oCRecommendArtficialButton').show();
	}
	
	function onCUserFormDocHide(){
		if(($("#w_oCRecomendTxt1").val()=="") && ($("#w_oCRecomendTxt2").val()=="") && ($("#w_oCRecomendTxt3").val()=="")){
			$("#w_oCRecomendTxt1").val('');
			$("#w_oCRecomendTxt2").val('');
			$("#w_oCRecomendTxt3").val('');
			$("#w_oCRecomendTxt1").tokenInput("clear",{focus:false});
			$("#w_oCRecomendTxt3").tokenInput("clear",{focus:false});
			$("#w_oCRecomendTxt2").hide();
			$("#w_oCRecomendTxt3").hide();
			$('#w_oNanoRecomendTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
				collapseForm("Community");
			});
			$('.w_oCExpandFormWrapper').css({"height":"20px","overflow":"hidden"});
			$('#w_oCFirstField').css({"width":"213px"});
			$('#w_oCRecommendButton').hide();
			$('#w_oCRecommendArtficialButton').show();		
		}
	}
	//Com View - Share Update 
	
	//Share Updates Form Function
	function onCShareFormClick(){
		expandForm("Community") // Home form - Expand		
		$("#w_oRecentActivityCommunity .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide(); //New code to hide Recent Activity
		$("#w_oRecentActivityCommunity .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide(); //New code to hide Recent Activity
		
		$('#w_oCShareUpdateTxtWrapper').animate({"height":"83px","overflow":"none"},"fast");
		$('.w_oCShareExpandFormWrapper').css({"height":"auto","overflow":"auto"})
		$('#w_oCShareUpdateFirstField').css({"width":"346px"});
		$('#w_oCShareTxt1').css({"width":"346px"});
		$('#w_oCShareArtficialButton').hide();
		$('.w_oCRecomendPost1').css({"min-height":"50px"});
		$('#w_oCShareTxt2').show();
		$('#w_oCShareButton').show();
	}
	
	m_oCRoot.onCShareFormKeyPress=function(){
		if($("#w_oCShareTxt1").val()!="" || $("#w_oCShareTxt2").val()!=""){
			$('#w_oCShareButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oCShareButton').unbind('click').bind('click', onCShareFormHide);
		}
		if(($("#w_oCShareTxt1").val()=="") || ($("#w_oCShareTxt2").val()=="")){
			$('#w_oCShareButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oCShareButton').unbind('click');
		}
	}
	
	function onCShareFormHide(){
		$("#w_oCShareTxt1").val('');
		$("#w_oCShareTxt2").val('');
		$("#w_oCShareTxt2").tokenInput("clear",{focus:false});
		$("#w_oCShareTxt2").hide();
		$('#w_oCShareUpdateTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast",function(){
			collapseForm("Community") // Home form - Expand	
		});
		$('.w_oCShareExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
		$('#w_oCShareButton').hide();
		$('#w_oCShareUpdateFirstField').css({"width":"223px"});
		$('#w_oCShareTxt1').css({"width":"213px"});
		$('#w_oCShareArtficialButton').show();
		$('.w_oCRecomendPost1').css({"min-height":"188px"});
		$("#w_oCShareUpdatePostTo").show();
		$(".w_cPostToDD ul.token-input-list-style2").hide();
		////////////////////////////////////
	}
	
	function onCShareFormDocHide(){		
		if(($("#w_oCShareTxt1").val()=="") && ($("#w_oCShareTxt2").val()=="")){	
			$("#w_oCShareTxt1").val('');
			$("#w_oCShareTxt2").val('');
			$("#w_oCShareTxt2").tokenInput("clear",{focus:false});
			$("#w_oCShareTxt2").hide();
			$('#w_oCShareUpdateTxtWrapper').animate({"height":"20px","overflow":"hidden"},"fast", function(){
				collapseForm("Community") // Home form - Expand																								
			});
			$('.w_oCShareExpandFormWrapper').css({"height":"20px","overflow":"hidden"})
			$('#w_oCShareButton').hide();
			$('#w_oCShareUpdateFirstField').css({"width":"223px"});
			$('#w_oCShareTxt1').css({"width":"213px"});
			$('#w_oCShareArtficialButton').show();
			$('.w_oCRecomendPost1').css({"min-height":"188px"});
			$("#w_oCShareUpdatePostTo").show();
			$("#w_oCShareTxt3").tokenInput("clear");
			$(".w_cPostToDD ul.token-input-list-style2").hide();
		}else{
			if($("#w_oCShareUpdatePostTo").css('display')=="none"){
				$("#w_oCShareUpdatePost ul.token-input-list-style2").show();
			}else{
				$("#w_oCShareUpdatePostTo").show();
			}
		}
	}
	
	//Nano Form Function
	function onNUserFormClick(){
		expandForm("Launch") // Home form - Expand
		$("#w_oRecentActivityLaunch .w_oTableRowNewDiv .w_oTableRow1:nth-child(1)").hide(); //New code to hide Recent Activity
		$("#w_oRecentActivityLaunch .w_oTableRowNewDiv .w_oTableRow1:nth-child(2)").hide(); //New code to hide Recent Activity
		
		$('#w_oNSecondField').show();
		$('#w_oNRecomendSpan').animate({"height":"110px"},"fast");
		$('#w_oNRecomendPointerScroll').css({"padding-top":"10px"});
		$('.w_oNExpandFormWrapper').css({"height":"auto","overflow":"auto"})
	}
	
	m_oCRoot.onNUserFormKeyPress = function(){
		if($("#w_oNRecomendTxt1").val()!="" && $("#w_oNRecomendTxt2").val()!=""){
			$('#w_oNRecommendButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oNRecommendButton').unbind('click').bind('click', onNUserFormHide);
		}
		if(($("#w_oNRecomendTxt1").val()=="") || ($("#w_oNRecomendTxt2").val()=="")){
			$('#w_oNRecommendButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oNRecommendButton').unbind('click');
		}
	}
	function onNUserFormHide(){
		$("#w_oNRecomendTxt1").val('');
		$("#w_oNRecomendTxt2").val('');
		$("#w_oNRecomendTxt2").tokenInput("clear",{focus:false});
		$("#w_oNSecondField").hide();
		//$("#w_oNRecomendTxt1").focus();
		$('#w_oNRecomendPointerScroll').css({"padding-top":"41px"});
		$('#w_oNRecomendSpan').animate({"height":"79px"},"fast", function(){
			collapseForm("Launch") // Launch form - Collapse
		});
		$('.w_oNExpandFormWrapper').css({"height":"79px","overflow":"hidden"});
	}
	function onNUserFormDocHide(){
		if(($("#w_oNRecomendTxt1").val()=="") && ($("#w_oNRecomendTxt2").val()=="")){
			$("#w_oNRecomendTxt1").val('');
			$("#w_oNRecomendTxt2").val('');
			$("#w_oNRecomendTxt2").tokenInput("clear",{focus:false});
			$("#w_oNSecondField").hide();
			$('#w_oNRecomendPointerScroll').css({"padding-top":"41px"});
			$('#w_oNRecomendSpan').animate({"height":"79px"},"fast", function(){
				collapseForm("Launch") // Launch form - Collapse																			  
			});
			$('.w_oNExpandFormWrapper').css({"height":"79px","overflow":"hidden"});
		}
	}
	
	//Video Form Function
	function onVUserFormClick(){
		$('#w_oVideoRecomend').css({"overflow":"none !important"})
		$('#w_oVSecondField').show();
		$("#w_oVRecomendPost").css("visibility","visible")
		$('#w_oVideoRecomend').animate({"min-height":"110px"},"fast");
	}
	
	m_oCRoot.onVUserFormKeyPress = function(){
		if($("#w_oVRecomendTxt1").val()!="" && $("#w_oVRecomendTxt2").val()!=""){
			$('#w_oVRecommendButton').removeClass('w_oButtonDisabled3').addClass('w_oButton3');
			$('#w_oVRecommendButton').bind('click', onVUserFormHide);
		}
		if(($("#w_oVRecomendTxt1").val()=="") || ($("#w_oVRecomendTxt2").val()=="")){
			$('#w_oVRecommendButton').removeClass('w_oButton3').addClass('w_oButtonDisabled3');
			$('#w_oVRecommendButton').unbind('click');
		}
	}
	function onVUserFormHide(){
		$("#w_oVRecomendTxt1").val('');
		$("#w_oVRecomendTxt2").val('');
		$("#w_oVSecondField").hide();
		$("#w_oVRecomendTxt1").focus();
		$("#w_oVRecomendPost").css("visibility","hidden")
		$('#w_oVideoRecomend').animate({"min-height":"79px"},"fast");
	}
	function onVUserFormDocHide(){
		if(($("#w_oVRecomendTxt1").val()=="") && ($("#w_oVRecomendTxt2").val()=="")){
			$("#w_oVRecomendTxt1").val('');
			$("#w_oVRecomendTxt2").val('');
			$("#w_oVSecondField").hide();
			$("#w_oVRecomendPost").css("visibility","hidden")
			$('#w_oVideoRecomend').animate({"min-height":"79px"},"fast");
		}
	}
	/***/
	//Deep Code Ends Here
	
	function addEventOnUsePhotoCircle() {
		$('#w_oCircle03C04').bind('click', onUserPhotoCircleClick);
		$('#w_oCircle03C04').css('cursor', 'pointer');
	}
	function onUserPhotoCircleClick() {
		log('onUserPhotoCircleClick');
		switchToCommunityView();
	}
	/**
	 * Description: This function changes -
	 * 	● community to launch view,
	 * 	● hides community links and show launch view links,
	 * 	● launch view nano title,
	 * 	● TODO: Other data changes (e.g.: Learning activity),
	 * 	● activates current community displays circle event
	 * when switch to community to launch view.
	 */
	function switchToLaunchViewV2(){
		//setPointer($("#w_CurrentNanoHomeLink2").position().left, $(this).width());
		//$("#w_oComLaunchViewLinks").css("background-position","34px 29px");
		m_bIsLaunchView = true;
		m_bIsCommunityView = false;
		m_bLaunchThroughButton = true;
		//
		var _oHD = $('#w_oComView01');
		var _oCD = $('#w_oComView02');
		if(_oHD.is(':visible')) {
			if(WebKitAndOS() == "ChromeButNotXP" || WebKitAndOS() == "Safari") {
				_oHD.hide();
				_oCD.show(function(){
					log('setPointer from >>> switchToLaunchViewV2 WebKitAndOS');
					setPointer($("#w_CurrentNanoHomeLink2").position().left, $("#w_CurrentNanoHomeLink2").width());
				});
				
			} else {
				_oHD.fadeOut(function(){
					_oCD.fadeIn(function(){
						updateActivityTypeIcon();
						log('setPointer from >>> switchToLaunchViewV2');
						setPointer($("#w_CurrentNanoHomeLink2").position().left, $("#w_CurrentNanoHomeLink2").width());
					});
				});
			}
		}
		///
		$('#w_oComViewLinks').hide();
		$('#w_oComLaunchViewLinks').show();
		////
		var _sLaunchTitle = $('#' + m_oClickedNano).children('p').html();
		$('#w_oLaunchTitleLV').html(_sLaunchTitle + "&nbsp;");
		setLaunchViewTitle();
		//$('#w_oLaunchTitle').html("");
		//TODO Show result based on score
		var _nScore = 90;
		var _sResult = _nScore>=80?'Passed':'Failed';
		//var _sIconUrl = _nScore>=80?"<img id='w_oCScoIcon' src='images/ico-completed-nano.png' />":"<img id='w_oCScoIcon' src='images/ico-current-nano.png' />";
		var _sIconUrl = _nScore>=80?"<div class='w_cNSHolderScore' style='z-index:0; position:relative !important;'><div class='w_cNSShape' style='position:absolute !important;'></div><div class='w_cNSIcon' style='position:absolute !important;'><i class='fa fa-check'></i></div></div>":"<div class='w_cNSHolderScore' style='z-index:0; position:relative !important;'><div class='w_cNSShape' style='position:absolute !important;'></div><div class='w_cNSIcon' style='position:absolute !important;'><i class='fa fa-chevron-right'></i></div></div>";
		var _sLaunchHTML = "<div>"+_sIconUrl+"</div><div id='w_oCScoText'><b id='w_oTScoResult'>"+_sResult+"</b><b id='w_oCScoScore'>"+_nScore+"</b><b id='w_oCScoP'>%</b></div>";
		if(_nScore>0) $('#w_oCSco').html(_sLaunchHTML);
		else $('#w_oCSco').html("");
		$('#w_oLaunchTitle').html("");
		//
		addEventOnUsePhotoCircle();
		onCurrentNanoCommLink2();
	}
	/**
	 * Description:  
	 */
	function updateActivityTypeIcon() {
		var _oATIHolder = $('#w_oActivityTypeIconsHolder');
		if(m_bIsLaunchView) {
			var _oEle = $('#w_oPlaceHolder');
			var _oOffset = _oEle.offset();
			//Uncomment 'if' if activity type icon doesn't show when animate
			/*if(WebKitAndOS() == "ChromeButNotXP" || WebKitAndOS() == "Safari") {
				_oATIHolder.show();
				_oATIHolder.offset({top:_oOffset.top});
			} else {*/
				_oATIHolder.show();
				_oATIHolder.width('1px');
				_oATIHolder.css('opacity', 0);
				//var _oEle = $('#w_oPlaceHolder');
				//var _oOffset = _oEle.offset();
				//_oATIHolder.show("slide", { direction: "left" }, 1000);
				//_oATIHolder.animate({"width": "20px"}, "fast");
				/*_oATIHolder.animate({
			       width: '20px'
			    }, { duration: 200, queue: false });
			    _oATIHolder.animate({
			       opacity: 1
			    }, { duration: 200, queue: false });*/
			    _oATIHolder.animate({ width: "20px", opacity: 1 }, { duration: 300, queue: false }); 
				//_oATIHolder.fadeIn(200);
				_oATIHolder.offset({top:_oOffset.top});
			//}
		} else {
			_oATIHolder.hide();
		}
	}
	/**
	 * 
	 */
	function swithToLaunchView() {
		m_bIsLaunchView = true;
		m_bIsCommunityView = false;
		m_bLaunchThroughButton = true;
		//
		var _oHD = $('#w_oComView01');
		var _oCD = $('#w_oComView02');
		if(_oHD.is(':visible')) {
			_oHD.fadeOut(function(){
				_oCD.fadeIn();
			});
		}
		///
		$('#w_oComViewLinks').hide();
		$('#w_oComLaunchViewLinks').show();
		////
		var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
		$('#w_oLaunchTitleLV').html(_sLaunchTitle + "&nbsp;");
		setLaunchViewTitle();
		$('#w_oLaunchTitle').html("");
		//
		addEventOnUsePhotoCircle();
		onCurrentNanoCommLink();
	}
	/**
	 * 
	 */
	function switchToCommunityView() {
		m_bIsLaunchView = false;
		m_bIsCommunityView = true;
		m_bLaunchThroughButton = false;
		m_bNanoOnceClicked = false;
		m_oLastClickedNano = "";
		m_oClickedNano = "";
		//Change core data view
		var _oHD = $('#w_oHomeData');
		var _oCD = $('#w_oCommData');
		if(_oHD.is(':visible')) {
			if(WebKitAndOS() == "ChromeButNotXP" || WebKitAndOS() == "Safari") {
				_oHD.hide();
				_oCD.show();
			} else {
				_oHD.fadeOut(function(){
					_oCD.fadeIn();
					log('setPointer from >>> switchToCommunityView');
					//Set pointer for Community View
					setPointer($("#w_CurrentNanoHomeLink").position().left, $("#w_CurrentNanoHomeLink").width());
				});
			}
			
		}
		///
		$('#w_oComViewLinks').show();
		$('#w_oComLaunchViewLinks').hide();
		///
		var _oCVD = $('#w_oComView02');
		//if(_oCVD.is(':visible')) {
			if(WebKitAndOS() == "ChromeButNotXP" || WebKitAndOS() == "Safari") {
				_oCVD.hide();
				$('#w_oComView01').show();
			} else {
				_oCVD.fadeOut(function(){
					$('#w_oComView01').fadeIn();
				});
			}
			
		//}
		var _sLaunchTitle = $('#' + m_oCurrentNano).children('p').html();
		$('#w_oLaunchTitle').html(_sLaunchTitle);
		$('#w_oCircle03C04').unbind('click');
		$('#w_oCircle03C04').css('cursor', 'default');
		removeSelectedNanoClass();
		onCurrentNanoCommLink();
		updateActivityTypeIcon();
	}
	/**
	 * 
	 */
	function comAwayFromAxis() {
		$('#w_oCNABar').hide();
		var _nComBOutOffset = m_nCommOuterGap;
		//ALT008: This switch is not requires if the initial comm button size and size at community view comm button size are the same.
		$('#w_oCommsHolder').switchClass( "w_cCommsHolderH", "w_cCommsHolder", 100, "easeInOutQuad", function(){});
		//ALT008
		for (var i=0; i < m_nCommunities; i++) {
			var _s = String(m_sCommunityPrefix + (i));
			var _oObj = $('#' + _s);
			var _nOldX = _oObj.position().left;
			var _nOldY = _oObj.position().top;
			m_aCommHomeX[i] = _nOldX;
			m_aCommHomeY[i] = _nOldY;
			//var _nD = Math.atan2(_nOldY,_nOldX)* 57.295;
			if(i==0) {
				var _nNewX = m_nXAxisCom + ((m_nRadiusCom+m_nAwayFromAxis)*Math.sin((m_aCommDeg[i])*0.017));
				var _nNewY = m_nYAxisCom + ((m_nRadiusCom+m_nAwayFromAxis)*Math.cos((m_aCommDeg[i])*0.017));
			} else {
				var _nNewX = m_nXAxisCom + ((m_nRadiusCom+m_nAwayFromAxis)*Math.sin((m_aCommDeg[i]-_nComBOutOffset)*0.017));
				var _nNewY = m_nYAxisCom + ((m_nRadiusCom+m_nAwayFromAxis)*Math.cos((m_aCommDeg[i]-_nComBOutOffset)*0.017));
				_nComBOutOffset = _nComBOutOffset + m_nCommOuterGap;
			}
			$(_oObj).animate({
				top: _nNewY,
				left: _nNewX,
				width:'84px',
				height:'84px'
				}, 500, function() {
				// Animation complete.
			});
			$('#' + _s + " p").animate({
				width:'80px',
				height:'80px'
				}, 500, function() {
				changeCommLayout();
			});
		};
	}
	/**
	 * 
	 */
	function changeCommLayout() {
		for (var i=0; i < m_nCommunities; i++) {
			var _s = String(m_sCommunityPrefix + (i));
			var _oObj = $('#' + _s);
			_oObj.addClass("w_cComBtn").fadeIn(1000);
			$('#' + _s + " p").switchClass( "w_cComBtnDataH", "w_cComBtnData", 500, "easeInOutQuad", function(){
				changeTitleOfDBCircle();
			});
		}
		$('.w_oAvgLearningDoughnut').show();
		$('.w_oLearningDoughnut').show();
		updateLearningDoughnuts();
		
		$('#w_oCircle03').switchClass( "w_cCircle03H", "w_cCircle03", 500, "easeInOutQuad", function(){
			$('#w_oHomeButton').unbind('click').bind('click', onHomeButtonClick);
		});
		//Bind event on icons
		$('#w_oCNavIconHome').unbind('click').bind('click', onHomeButtonClick);
		$('#w_oHNavIconHome').unbind('click');
		//$('#w_oNCLogo').css('top','873px');
		$('#w_oNCLogo').css('top','854px');
	}
	/**
	 * 
	 */
	function comTowardsAxis() {
		//$('#w_oCNABar').show();
		$('#w_oCNABar').hide();
		var _nComBOutOffset = m_nCommOuterGap;
		//ALT008: This switch is not requires if the initial comm button size and size at community view comm button size are the same.
		$('#w_oCommsHolder').switchClass( "w_cCommsHolder", "w_cCommsHolderH", 100, "easeInOutQuad", function(){});
		//ALT008
		for (var i=0; i < m_nCommunities; i++) {
			var _s = String(m_sCommunityPrefix + (i));
			var _oObj = $('#' + _s);
			$(_oObj).animate({
				top: m_aCommHomeY[i],
				left: m_aCommHomeX[i],
				width:'96px',
				height:'96px'
				}, 300, function() {
				// Animation complete.
			});
			$('#' + _s + " p").animate({
				width:'90px',
				height:'90px'
				}, 300, function() {
				restoreCommLayout();
			});
		};
	}
	/**
	 * 
	 */
	function restoreCommLayout() {
		$('#w_oCircle03').switchClass( "w_cCircle03", "w_cCircle03H", 500, "easeInOutQuad", function(){});
		//$('#w_oNCLogo').css('top','796px');
		$('#w_oNCLogo').css('top','772px');
	}
	function removeSelectedNanoClass() {
		for (var i= 0 ; i < m_nNanos; i++) {
			$('#'+m_sNanoPrefix+i ).removeClass("w_cNanoBtnNSelected");
		};
	}
	/**
	 * 
	 */
	function initCommunityView() {
		$( '#w_oCircle02' ).switchClass( "w_oCircle02Hidden", "w_oCircle02", 0, "easeInOutQuad" );
		$( '#w_oCircle01' ).switchClass( "w_oCircle01Hidden", "w_oCircle01", 0, "easeInOutQuad" );
		$('#w_oUserIconsHolder').show();
		$('#w_oCommsHolder').show();
		//showAllVisitedNanoElements(m_sNanoPrefix, m_nVisitedNanos - 1, 0, m_nVisitedNanoGap, m_nStartDegOfVisitedNanos, 1);
		//showAllNormalNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, (-1) * m_nNormalNanoGap, m_nStartDegOfNormalNanos, -1);
		//showAllCommunities(p_sObjPrefix, p_nFrom, p_nTo, p_nGap, p_nStartDegree, p_nDir)
		
		//showAllCommunities(m_sCommunityPrefix, 0, m_nCommunities, m_nGap, m_nStartDegreeOfCom, -1);
	}
	/**
	 * 
	 */
	function addEventsOnIcons() {
		$('#w_oHNavIconPP, #w_oCNavIconPP').bind('click', onPersonalProfileClick);
		$('#w_oHNavIconNotify, #w_oCNavIconNotify').bind('click', onNotifyIconClick);
	}
	/**
	 * 
	 */
	function addEventOnPopup() {
		$('#w_oPopupBlocker').bind('click', onPopupBlockerClick);
		$('.w_cExitPopupButton').bind('click', onPopupBlockerClick);
		$('#w_oCertificatePopupBlocker').bind('click', onCretificateBlockerClick);
		$('.w_cExitCertificateButton').bind('click', onCretificateBlockerClick);
		//$('.m_oDownloadButton').bind('click', function(){m_bDocumentOpened=true;});
		$('#w_Link1').bind('click', showVideoRecommend);
		$('#w_Link2').bind('click', showRateRecommend);
		$('#w_oPopup').bind('click', onPopupClick);
		$('#w_oCertificatePopup').bind('click', onPopupClick);
		$('#w_oVideoFrame').attr("poster", "images/vid-dummy-frame.jpg");
		// Recent activity popup code starts
		$('#w_oRecentActivityBlocker').bind('click', onRecentActivityBlockerClick); 
		$('#w_oOthersDescPopupBlocker').bind('click', onOthersDescPopupBlockerClick); 
		$('.w_cExitRecentActivityBlocker').bind('click', onRecentActivityBlockerClick); 
		$('.w_cExitODPBlocker').bind('click', onOthersDescPopupBlockerClick); 
		$('#w_oRecentActivityDiv').bind('click', onPopupClick); 
		$('#w_oOthersDescPopupDiv').bind('click', onPopupClick); 
		// Recent activity popup code ends
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				if(m_bIsVideoPopupOpen) onPopupBlockerClick();
			}
		});
	}
	
	//Recent Activity Popup
	function onRecentActivityBlockerClick(e) {
		$('#w_oRecentActivityBlocker').hide();
	}
	function onOthersDescPopupBlockerClick(e) {
		$('#w_oOthersDescPopupBlocker').hide();
	}
	function onCretificateBlockerClick(e) {
		$('#w_oCertificatePopupBlocker').hide();
		$('#w_oLogoContainer').css('z-index', '998');
	}
	function onHRecenctActivity(){
		setBlockerAsDocHeight('#w_oRecentActivityBlocker');
		$("#w_oRecentActivityBlocker").show();
		resetScrollTo();
	}
	function onCRecenctActivity(){
		setBlockerAsDocHeight('#w_oRecentActivityBlocker');
		$("#w_oRecentActivityBlocker").show();
		resetScrollTo();
	}
	function onNRecenctActivity(){
		setBlockerAsDocHeight('#w_oRecentActivityBlocker');
		$("#w_oRecentActivityBlocker").show();
		resetScrollTo();
	}
	function onPRecentActivityLoadData(){
		var element = $(this);
		var msg = element.attr("id");
		$("#w_oPRecentActivityMoreButton").hide();
		$("#w_oPRecentActivitySpinner").show();
		$.ajax({	   
			type: "GET",
			url: "",
			data: "lastmsg="+ msg,
			dataType: "json",
			success: function (data) {
				$(".w_cRActCC").append(data);
				$("#w_oPRecentActivityMoreButton").show();
				$("#w_oPRecentActivitySpinner").hide();
			},
			error: function (data) {
			}
		});
		resetScrollTo(element.offset().top);
	}
	function onODPLoadData(){
		var element = $(this);
		var msg = element.attr("id");
		$("#w_oODPMoreButton").hide();
		$("#w_oODPMoreButtonSpinner").show();
		log('>>>>>>>>>>>>>>>');
		$.ajax({	   
			type: "GET",
			url: "",
			data: "lastmsg="+ msg,
			dataType: "json",
			success: function (data) {
				$(".w_cODPCC").append(data);
				$("#w_oODPMoreButton").show();
				$("#w_oODPMoreButtonSpinner").hide();
			},
			error: function (data) {
			}
		});
		resetScrollTo(element.offset().top);
	}
	/**
	
	 * 
	 */
	 function showRateRecommend(){
		$('#w_oVideoRecomend').hide();
		$('#w_oVideoRate').show();
		setPointer2($(this).position().left, $(this).width());
		//$('#w_oData7').switchClass( "w_oLayout08FA", "w_oLayout08FB", 100, "easeInOutQuad");
	 }
	 function showVideoRecommend(){
		$('#w_oVideoRecomend').show();
		$('#w_oVideoRate').hide();
		//setPointer2($(this).position().left, $(this).width());
		//Fixed, as it calls when click on any learning from 'onButtonClick' as well as click on Recommand
		setPointer2($('#w_Link1').position().left, $('#w_Link1').width());
		//$('#w_oData7').switchClass( "w_oLayout08FB", "w_oLayout08FA", 100, "easeInOutQuad");
	 }
	 
	function addEventOnProfileFrame() {
		$('#w_oProfileFrame').bind('click', onProfileFrameClick);
	}
	/**
	 * 
	 */
	function addEventsOnHomeViewLinks() {
		$('#w_oShareUpdateHomeLink').bind('click', onShareUpdateHomeLinkClick);
		$('#w_PraiseHomeLink').bind('click', onPraiseHomeLink);
		$('#w_oRecomandNanoHomeLink').bind('click', onRecomandNanoHomeLink);
		
		$('#w_oHomeLinkPP').bind('click', onPersonalProfileClick);
		$('#w_oNavDDLinkPP').bind('click', onPersonalProfileClick);
		$('#w_oNavDDLinkWS').bind('click', onWelcomeScreenClick);
		$('#w_oNavDDLinkVP').bind('click', onViewPeopleClick);
		$('#w_oNavDDLinkL').bind('click', onLangDDClick);
		
		initLangDDItems(m_nLangId);
		addEvtOnLangDDItems();
	}
	/**
	 * 
	 */
	function addEventsOnCommViewLinks() {
		$('#w_oRecomandNanoCommLink').bind('click', onRecomandNanoCommLink);
		$('#w_oRecomandNanoCommLink2').bind('click', onRecomandNanoCommLink2);
		$('#w_CurrentNanoHomeLink').bind('click', onCurrentNanoCommLink);
		$('#w_CurrentNanoHomeLink2').bind('click', onCurrentNanoCommLink2);
		$('#w_oShareUpdateCommLink').bind('click', onShareUpdateCommLink);
	}
	/**
	 * 
	 */
	function addEventsOnCommLaunchViewLinks() {
		$('#w_oRateCommLaunchLink').bind('click', onRateCommLaunchLink);
	}
	/**
	 * Description: Sets pointer for home, community and launch view.
	 */
	function setPointer(p_nPos, p_nWidth) {
		log("p_nPos :: " + p_nPos + "p_nWidth :: " + p_nWidth)
		var _nPointerLeft = (p_nPos + ((p_nWidth/2) - 14));
		_nPointerLeft= _nPointerLeft -104;
		// -104 to remove left positon for background image pointer
		//log("_nPointerLeft :: " + _nPointerLeft)
		$('.w_oData6').css('background-position', _nPointerLeft+"px 29px");
	}
	/**
	 * Description: Sets pointer for launch popup
	 */
	function setPointer2(p_nPos, p_nWidth) {
		//log("p_nPos :: " + p_nPos + "p_nWidth :: " + p_nWidth)
		var _nPointerLeft = (p_nPos + ((p_nWidth/2) - 14));
		_nPointerLeft= _nPointerLeft +2;
		// -104 to remove left positon for background image pointer
		//log("_nPointerLeft :: " + _nPointerLeft)
		$('#w_oData7').css('background-position', _nPointerLeft+"px 29px");
	}
	/*
	 * 
	 */
	function onShareUpdateHomeLinkClick () {
		log('setPointer from >>> onShareUpdateHomeLinkClick');
		setPointer($(this).position().left, $(this).width());
		$('#w_oShareUpdateHomeView').show();
		$('#w_oPraiseHomeView').hide();
		$('#w_oRecomandNanoHomeView').hide();
		$('#w_oRecentActivityHome').show();
	}
	/**
	 * 
	 */
	function onPraiseHomeLink () {
		log('setPointer from >>> onPraiseHomeLink');
		setPointer($(this).position().left, $(this).width());
		$('#w_oShareUpdateHomeView').hide();
		$('#w_oPraiseHomeView').show();
		$('#w_oRecomandNanoHomeView').hide();
		$('#w_oRecentActivityHome').show();
	}
	/**
	 * 
	 */
	function onRecomandNanoHomeLink () {
		$('#w_oShareUpdateHomeView').hide();
		$('#w_oPraiseHomeView').hide();
		$('#w_oRecomandNanoHomeView').show();
		log('setPointer from >>> onRecomandNanoHomeLink');
		setPointer($(this).position().left, $(this).width());
		$('#w_oRecentActivityHome').show();
	}
	function onRecomandNanoCommLink () {
		showCRAElements()
		$('#w_oRateNanoLaunchView').hide();
		$('#w_oLaunchCommView').hide();
		$('#w_oRecomandNanoCommView').show();
		$('#w_oRecomandNanoLaunchView').hide();
		$('#w_oRecentActivityLaunch').hide();
		$('#w_oCShareUpdateCommView').hide();
		//$('#w_oCommActCommView').show();
		$('#w_oRecomandNanoLaunchView').hide();
		/*$('.w_oData6').switchClass( "w_oLayout08A", "w_oLayout08B", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08B", 100, "easeInOutQuad");*/
		log('setPointer from >>> onRecomandNanoCommLink');
		setPointer($(this).position().left, $(this).width());
	}
	
	function onShareUpdateCommLink () {
		showCRAElements()
		$('#w_oRateNanoLaunchView').hide();
		$('#w_oLaunchCommView').hide();
		$('#w_oCShareUpdateCommView').show();
		$('#w_oRecomandNanoCommView').hide();
		$('#w_oRecomandNanoLaunchView').hide();
		$('#w_oRecentActivityLaunch').hide();
		//$('#w_oCommActCommView').show();
		$('#w_oRecomandNanoLaunchView').hide();
		/*$('.w_oData6').switchClass( "w_oLayout08A", "w_oLayout08B", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08B", 100, "easeInOutQuad");*/
		log('setPointer from >>> onShareUpdateCommLink');
		setPointer($(this).position().left, $(this).width());
	}
	
	function onRecomandNanoCommLink2 () {
		$('#w_oRateNanoLaunchView').hide();
		$('#w_oLaunchCommView').hide();
		$('#w_oRecomandNanoCommView').hide();
		$('#w_oCShareUpdateCommView').hide();
		$('#w_oRecomandNanoLaunchView').show();
		$('#w_oRecentActivityLaunch').show();
		$('#w_oCommActCommView').hide();
		log('setPointer from >>> onRecomandNanoCommLink2');
		setPointer($(this).position().left, $(this).width());
		/*$('.w_oData6').switchClass( "w_oLayout08A", "w_oLayout08BB", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08BB", 100, "easeInOutQuad");*/
		m_bIsNanoRecommend = true;
		//alert("m_bIsNanoRecommend :: " + m_bIsNanoRecommend)
	}
	
	function onRateCommLaunchLink() {
		$('#w_oRecomandNanoCommView').hide();
		$('#w_oLaunchCommView').hide();
		$('#w_oRateNanoLaunchView').show();
		$('#w_oCommActCommView').hide();
		$('#w_oRecentActivityLaunch').show();
		$('#w_oRecomandNanoLaunchView').hide();
		log('setPointer from >>> onRateCommLaunchLink');
		setPointer($(this).position().left, $(this).width());
		/*$('.w_oData6').switchClass( "w_oLayout08A", "w_oLayout08G", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08B", "w_oLayout08G", 100, "easeInOutQuad");*/
	}
	
	function onCurrentNanoCommLink () {
		//alert("Test 123")
		//$("#w_oComViewLinks").css("background-position","30px 29px");
		$('#w_oRateNanoLaunchView').hide();
		$('#w_oLaunchCommView').show();
		$('#w_oRecomandNanoCommView').hide();
		$('#w_oCommActCommView').show();
		$('#w_oRecentActivityLaunch').hide();
		$('#w_oCShareUpdateCommView').hide();
		showCurrLearCRAElements();
		if(m_bIsLaunchView) {
			$('#w_oCommActCommView').hide();
			$('#w_oRecentActivityLaunch').show();
		}
		//alert($("#w_CurrentNanoHomeLink").position().left)
		log('setPointer from >>> onCurrentNanoCommLink');
		setPointer($("#w_CurrentNanoHomeLink").position().left, $("#w_CurrentNanoHomeLink").width());
		
		//$("#w_CurrentNanoHomeLink").trigger("click");
		//alert("hi")
		//if($('.w_oData6').hasClass('w_oLayout08AA')){
			//
		//} else {
			//TODO: correct this repeating issue.
			/*$('.w_oData6').switchClass( "w_oLayout08B", "w_oLayout08AA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08BB", "w_oLayout08AA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08AA", "w_oLayout08AA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08AAA", "w_oLayout08AA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08AA", 0, "easeInOutQuad");*/
		//}	
	}
	
	function onCurrentNanoCommLink2 () {
		$('#w_oRateNanoLaunchView').hide();
		$('#w_oLaunchCommView').show();
		$('#w_oRecomandNanoCommView').hide();
		$('#w_oCommActCommView').show();
		$('#w_oRecomandNanoLaunchView').hide();
		if(m_bIsLaunchView) {
			$('#w_oCommActCommView').hide();
			$('#w_oRecentActivityLaunch').show();
		}
		//if(!$('.w_oData6').hasClass('w_oLayout08AAA')){
			//TODO: correct this repeating issue.
			log('setPointer from >>> onCurrentNanoCommLink2');
			//setPointer($(this).position().left, $(this).width());
			setPointer($('#w_CurrentNanoHomeLink2').position().left, $('#w_CurrentNanoHomeLink2').width());
			/*$('.w_oData6').switchClass( "w_oLayout08B", "w_oLayout08AAA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08BB", "w_oLayout08AAA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08AA", "w_oLayout08AAA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08AAA", "w_oLayout08AAA", 0, "easeInOutQuad");
			$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08AAA", 0, "easeInOutQuad");*/
		//}
		
	}
	/**
	 * 
	 */ 
	function onHomeButtonClick() {
		clearInterval(m_nDataChangeInterval);
		log('onHomeButtonClick');
		$('#w_oHomeButton').unbind('click', onHomeButtonClick);
		$('#w_oCNavIconHome, #w_oHNavIconHome').unbind('click');
		removeSelectedNanoClass();
		m_bSwitchFromHome = true;
		m_bIsHomeView = true;
		m_bIsCommunityView = false;
		m_bIsLaunchView = false;
		m_nFirstComClicked = true;
		hideAllNormalNanoElements(m_sNanoPrefix, 0, m_nVisitedNanos, undefined, m_nShrinkDegree, -1, 1000);
		hideAllVisitedNanoElements(m_sNanoPrefix, m_nVisitedNanos, m_nNanos, undefined, m_nShrinkDegree, 1, 1000);
		
		$('#w_oCommTitle').fadeOut(function(){
			$('#w_oCommTitle').addClass('w_oCommTitleBg').html("").fadeIn();
			$(".w_oCircleWrapper").removeClass('hidden');
		});
		
		$('#w_oUserIconsHolder').hide();
		$('.w_oAvgLearningDoughnut').hide();
		$('.w_oLearningDoughnut').hide();
		
		for (var i=0; i < m_nCommunities; i++) {
			var _s = String(m_sCommunityPrefix + (i));
			var _oObj = $('#' + _s);
			_oObj.switchClass( "w_cComBtn", "w_cComBtnH", 500, "easeInOutQuad", function(){});
			$('#' + _s + " p").switchClass( "w_cComBtnData", "w_cComBtnDataH", 500, "easeInOutQuad", function(){
				activateCommButtons();
			});
		}
		
		$( '#w_oCircle02' ).switchClass( "w_oCircle02", "w_oCircle02Hidden", 600, "easeInOutQuad", function(){
			$( '#w_oCircle02HomeI2' ).fadeIn(0);
			$( '#w_oCircle01' ).switchClass( "w_oCircle01", "w_oCircle01Hidden", 300, "easeInOutQuad", function(){
				
				$( '#w_oCircle02HomeI' ).fadeIn(0).switchClass( "w_oCircle02HomeEx", "w_oCircle02Home", 300, "easeInQuart", function(){
				
				});
				//Fades nano track circle.
				//$( '#w_oCircle02HomeI2' ).fadeOut(0).switchClass( "w_oCircle02HomeEx2", "w_oCircle02Home2", 300, "easeInOutQuad", function(){}).fadeOut(0);
				//Contracts nano track circle.
				$( '#w_oCircle02HomeI2' ).switchClass( "w_oCircle02HomeEx2", "w_oCircle02Home2", 300, "easeInQuart", function(){}).fadeOut(0);
				comTowardsAxis();
			});
		});
		///Change core data view
		var _oHD = $('#w_oHomeData');
		var _oCD = $('#w_oCommData');
		if(WebKitAndOS() == "ChromeButNotXP" || WebKitAndOS() == "Safari") {
			_oCD.hide();
			_oHD.show(function(){
				log('setPointer from >>> onHomeButtonClick WKandOSXP');
				//Set pointer for Community View
				setPointer($("#w_oShareUpdateHomeLink").position().left, $("#w_oShareUpdateHomeLink").width());
			});
		} else {
			_oCD.fadeOut(function(){
				_oHD.fadeIn();
				log('setPointer from >>> onHomeButtonClick');
				//Set pointer for Community View
				setPointer($("#w_oShareUpdateHomeLink").position().left, $("#w_oShareUpdateHomeLink").width());
			});
		}
		
		/*$('.w_oData6').switchClass( "w_oLayout08B", "w_oLayout08A", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08BB", "w_oLayout08A", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08AA", "w_oLayout08A", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08AAA", "w_oLayout08A", 100, "easeInOutQuad");
		$('.w_oData6').switchClass( "w_oLayout08G", "w_oLayout08A", 100, "easeInOutQuad");*/
		
		collapseForm("Home")
	}
	/**
	 * 
	 */
	function onPersonalProfileClick(e) {
		var _oOverTarget = "";
		//log('onPersonalProfileClick: p_nId - ' + e.data.target.text());
		//log('onPersonalProfileClick:  - ' + $('#w_oTooltip').is(':visible'));
		if($('#w_oTooltip').is(':visible')){
			$('#w_oTooltip').hide();
			_oOverTarget = e.data.target;
		}
		resetScrollTo();
		log('onPersonalProfileClick');
		$('#w_oProfileFrame').show();
		setBlockerAsDocHeight('#w_oProfileFrame');
		$('#w_oProfile').attr('src', 'profile.htm', function(){});
		//TODO: Not working. Will be implemented in profile js.
		//$('#w_oProfile').contents().find("#w_oProfileCloseButton").bind('click', onProfileFrameClick);
		m_bIsPersonalProfileViewOpen = true;
	}
	/**
	 *  Description:	Displays welcome popup when click on 'View welcome message'
	 * 					from drop down menu at top bar.
	 */
	function onWelcomeScreenClick() {
		m_bDisplayWelcomeScreenDD = true;
		m_bDisplayWelcomeScreen = true;
		displayWelcomeScreen();
	}
	
	function onViewPeopleClick() {
		//Add View profile click function
	}
	/**
	 * Description:	 
	 */
	function onLangDDClick(e) {
		if ($(this).hasClass("open")) {
			//$(this).parent().find("ul li a span").css("color", "#ff0000");
			$(this).removeClass("open");
			//$(this).find(".span1 img").attr('src', 'images/ico-right-arrow-m.png');
			$(this).find(".span1").html('<i class="fa fa-chevron-right fa-c-dd"></i>');
			$(this).parent().find("ul").slideUp("fast");
		} else {
			//$(this).parent().find("ul li a span").css("color", "#ff00ff");
			$(this).addClass("open");
			//$(this).find(".span1 img").attr('src', 'images/ico-down-arrow-m.png');
			$(this).find(".span1").html('<i class="fa fa-chevron-down fa-c-dd"></i>');
			$(this).parent().find("ul").slideDown("slow");	
		}
		e.stopPropagation();
		//e.preventDefault();
	}
	/**
	 * Description:	
	 *  
	 */
	function addEvtOnLangDDItems() {
		$('#w_oProfileMenu > ul > li > ul > li a').each(function(){
			$( this ).bind('click', onLangDDItemClick);
		});
	}
	/**
	 * Description:	
	 *  
	 */
	function onLangDDItemClick(e) {
		//Remove 'selected' class from previously selected language dd item
		$(this).parent().parent().children().each(function(){
			if($(this).find('a').hasClass('selected')) {
				$(this).find('a').removeClass('selected');
				//$(this).find('.span1 img').hide();
				$(this).find('.span1').html('');
			}
		});
		//Set selected the language dd item clicked
		$(this).addClass('selected');
		$(this).find('.span1').html('<i class="fa fa-check"></i>');
		//$(this).find('.span1 img').attr('src', 'images/ico-tick-m.png');
		
		//Slide up the language sub menu when click on any language
		var _oL = $('#w_oNavDDLinkL');
		_oL.removeClass("open");
		_oL.parent().find("ul").delay(500).slideUp("slow", function(){
			_oL.find(".span1 img").attr('src', 'images/ico-right-arrow-m.png');
		});
		
		
		//Action code when click on any language
		
		
		//
		e.stopPropagation();
	}
	/**
	 * Description: 
	 * 
	 */
	function initLangDDItems(p_nLangId) {
		var _nCount = 0;
		$('#w_oProfileMenu >ul > li > ul >li a').each(function () {
			if(_nCount == p_nLangId) {
				$('#w_oProfileMenu >ul > li > ul >li a').eq(_nCount).addClass('selected');
				$('#w_oProfileMenu >ul > li > ul >li a .span1').eq(_nCount).html('<i class="fa fa-check"></i>');
			}
			_nCount++;
		});
	}
	/**
	 * 
	 */
	function onNotifyIconClick() {
		log('onNotifyIconClick');
	}
	/**
	 * 
	 */
	function onPopupBlockerClick(e) {
		//TODO: Add Nono status through with server object //////////////////////
		//Currently it is using remommend textarea input 
		var _sStatus = $('#w_oVRecomendTxt1').val();
		_sStatus!=""?m_sCurrentNanoStatus = _sStatus:m_sCurrentNanoStatus = "c";
		/////////////////////////////////////////////////////////////////////////
		if(m_bIsVideoPopupOpen) {
			if($('#'+m_oClickedNano).hasClass('w_oCircle03C')) {
				//removeSelectedNanoClass();
				//log('Visited Nano clicked.');
				if(m_nVisitedNanos!= m_nNanos) {
					preventDefaultClick(false);
					log('onPopupBlockerClick: preventDefaultClicked 0');
					setCurrentNanoData();
				} else {
					preventDefaultClick(true);
					log('onPopupBlockerClick: preventDefaultClicked 1');
					if(m_bIsLaunchView && m_bNanoOnceClicked) {
						///preventDefaultClick(false);
					}
					log('This state shows that all nonos has been completed of this community and..');
					switchToCommunityView();
				}
				freezeNanoButtons(false);
				m_bLaunchThroughButton = false;
				//modifyData();
				//setCurrentNanoData();
				//
			} else {
				m_nLaunchInterval = setInterval(completeNanoActivity, 500);
			}
			$('#w_oPopupBlocker').hide();
			onVUserFormHide(); //Deep function for reset form on Video Page.
			removeSelectedNanoClass();
			//setCurrentNanoData();
			m_bIsVideoPopupOpen = false;
		} else {
			//This block hides popup blocker only
			//Used to hide popup when it opens by other window i.e: iframe. 
			$('#w_oPopupBlocker').hide();
			m_bIsVideoPopupOpen = false;
		}
	}
	/**
	 *	Description: 
	 *	 
	 */
	m_oCRoot.onMoreDescClick = function() {
		log('onMoreDescClick');
		//$('#w_oVideoDesc').html('Learn all about why the Lumia 920 Camera is the best smartphone camera available. With PureView technology and Carl Zeiss lens the Lumia 920 Camera is the best smartphone camera available. Learn all about why the Lumia 920 Camera is the best smartphone camera available. <a href="javascript:main.onLessDescClick();">Read less</a>');
		$('#w_oVideoDesc').html('Learn all about why the Lumia 920 Camera is the best smartphone camera available. With PureView technology and Carl Zeiss lens the Lumia 920 Camera is the best smartphone camera available. Learn all about why the Lumia 920 Camera is the best smartphone camera available.');
	};
	/**
	 *	Description: 
	 *	 
	 */
	m_oCRoot.onLessDescClick = function() {
		log('onLessDescClick');
		//$('#w_oVideoDesc').html('Learn all about why the Lumia 920 Camera is the best smartphone camera available. With PureView technology and Carl... <a href="javascript:main.onMoreDescClick();">Read more</a>');
		$('#w_oVideoDesc').html('Learn all about why the Lumia 920 Camera is the best smartphone camera available. With PureView technology and Carl Zeiss... <a href="javascript:main.onMoreDescClick();">more</a>');
	};
	/**
	 *	Description: 
	 *	 
	 */
	$('#w_oVideoDesc').bind('click', function(e){
		e.stopPropagation();
	});
	
	onProfileFrameClick = function(e) {
		$('#w_oProfileFrame').hide();
		m_bIsPersonalProfileViewOpen = false;
	};
	/**
	 * 
	 */
	function onPopupClick(e) {
		e.stopPropagation();
	}
	/**
	 * 
	 */
	function updateLearningDoughnuts() {
		var _nLearningDataPercent = (m_nVisitedNanos/m_nNanos)*100;
		$('.w_oLearningDoughnut').data('easyPieChart').update(Math.round(_nLearningDataPercent));
		//TODO: Average learning percentage will be added by web object
		//$('.w_oAvgLearningDoughnut').data('easyPieChart').update(Math.round(_nLearningDataPercent));
		//
	}
	function addRating() {
		$('#raty1').ratings({
			overall_rating: 3, 
			current_rating:0,
			disable:'true'
		});
		
		$('#raty2').ratings({
			overall_rating: 3, 
			current_rating:0,
			disable:'false'
		});
		$('#w_oVideoDescRating').ratings({
			overall_rating: 3, 
			current_rating:0,
			disable:'true',
			type:'small'
		});
		$('#w_oNanoRatingLaunchView').ratings({
			overall_rating: 3, 
			current_rating:0,
			disable:'false',
			rated:'true',
		});
	}
	
	/*function addRating1() {
		$.fn.raty.defaults.path = 'images';
		$('#raty2').raty({ 
			 score: 3,
			 width: 400,
			 starOff  : 'star_big_grey.png',
		  	 starOn   : 'star_big_yellow.png',
			 click: function(score, evt) {
				 alert('hi')
       		 	//$(this).find('img').unbind('click');
    		},
			mouseover: function(score, evt){
				//$(this).find('img').attr('src','images/star_big_yellow.png');
			},
			mouseout: function(score, evt){
				//$(this).find('img').unbind('click');
			}
		});
	}*/
	/**
	 * 
	 * Description:
	 */
	function adjustProfileMenu() {
		var _nMaxWidth = 0;
		var _nIconWidth= 0;
		var _nBleed = 21;
		var _nMaxIndex=0;
		$('#w_oProfileMenu ul li a .span1').each(function() {
			if($( this ).width()>_nIconWidth) {
				_nIconWidth = $( this ).outerWidth();
			}
		});
		$('#w_oProfileMenu ul li a .span2').each(function(p_nKey, p_nVal) {
			if($( this ).width()>_nMaxWidth) {
				_nMaxWidth = $( this ).outerWidth();
				_nMaxIndex = p_nKey;
			}
		});
		if(_nMaxWidth>0) {
			var _nTW = (_nMaxWidth + _nIconWidth + _nBleed);
			if(_nTW>175) {
				$('#w_oProfileMenu ul').width(_nTW);
			} else {
				$('#w_oProfileMenu ul').width(175);
			}	
		}
	}
	/**
	 * 
	 * Description:
	 */
	function adjustAdminMenu() {
		var _nMaxWidth = 0;
		var _nBleed = 22;
		var _nMaxIndex=0;
		$('#w_oAdminMenu ul li a .span1').each(function(p_nKey, p_nVal) {
			if($( this ).width()>_nMaxWidth) {
				_nMaxWidth = $( this ).outerWidth();
				_nMaxIndex = p_nKey;
			}
		});
		if(_nMaxWidth>0) {
			var _nTW = (_nMaxWidth + _nBleed);
			if(_nTW>221) {
				$('#w_oAdminMenu ul').width(_nTW);
			} else {
				$('#w_oAdminMenu ul').width(221);
			}	
		}
	}
	/**
	 * Description: 
	 * 
	 */
	function addProfileDDEvent() {
		$("#w_oProfileMenu").on("click", function(e) {
			e.stopPropagation();
			//e.preventDefault();
			
			//This block hides language sub dropdown items when click again on profile 
			$(this).find('ul>li>ul').css('display', 'none');
			if ($(this).find('ul>li>a').hasClass("open")) {
				$(this).find('ul>li>a').removeClass("open");
				$(this).find("#w_oNavDDLinkL .span1 img").attr('src', 'images/ico-right-arrow-m.png');
			}
			//
			
			$("#w_oNavAssetsHolder").css('z-index','999');
			$("#w_oCNABar").css('z-index','-53');
			if ($(this).hasClass("open")) {
				$(this).removeClass("open");
				$("span.w_cProfileDDPointer").css("display","none");
				$(this).children("ul").slideUp("fast");
			} else {
				$(this).addClass("open");
				$(this).children("ul").slideDown("fast",function(){
					$("span.w_cProfileDDPointer").css("display","block");										 
				});
			}
			///
			if ($("#w_oProfileMenu2").hasClass("open")) {
				$("#w_oProfileMenu2").removeClass("open");
				$("span.w_cProfileDDPointer2").css("display","none");
				$("#w_oProfileMenu2").children("ul").slideUp("fast");
			}
			
			if ($("#w_oAdminMenu").hasClass("open")) {
				$("#w_oAdminMenu").removeClass("open");
				$("span.w_cAdminDDPointer").css("display","none");
				$("#w_oAdminMenu").children("ul").slideUp("fast");
			}
			adjustProfileMenu();
		});
	}
	// Function for Admin Menu
	function addAdminDDEvent() {
		$("#w_oAdminMenu").on("click", function(e) {
			e.stopPropagation();
			//e.preventDefault();
			$("#w_oNavAssetsHolder").css('z-index','999');
			$("#w_oCNABar").css('z-index','-53');
			if ($(this).hasClass("open")) {
				$(this).removeClass("open");
				$("span.w_cAdminDDPointer").css("display","none");
				$(this).children("ul").slideUp("fast");
			} else {
				$(this).addClass("open");
				$(this).children("ul").slideDown("fast",function(){
					$("span.w_cAdminDDPointer").css("display","block");										 
				});
			}
			///
			if ($("#w_oProfileMenu").hasClass("open")) {
				$("#w_oProfileMenu").removeClass("open");
				$("span.w_cProfileDDPointer").css("display","none");
				$("#w_oProfileMenu").children("ul").slideUp("fast");
			}
			if ($("#w_oProfileMenu2").hasClass("open")) {
				$("#w_oProfileMenu2").removeClass("open");
				$("span.w_cProfileDDPointer2").css("display","none");
				$("#w_oProfileMenu2").children("ul").slideUp("fast");
			}
			adjustAdminMenu();
		});
	}
	/**
	 * Description: 
	 * 
	 */
	function addNotifyDDEvent() {
		$("#w_oProfileMenu2").on("click", function(e) {
			e.stopPropagation();
			//e.preventDefault();

			if ($(this).hasClass("open")) {
				$(this).removeClass("open");
				$("span.w_cProfileDDPointer2").css("display","none");
				$(this).children("ul").slideUp("fast");
			} else {
				$(this).addClass("open");
				$(this).children("ul").slideDown("fast",function(){
					$("span.w_cProfileDDPointer2").css("display","block");
					$("#w_oProfileMenu2 ul").css('overflow-y','auto');
					if($("#w_oProfileMenu2 ul").hasScrollBar()==true){
						$("#w_oProfileMenu2 ul li .w_cNotificationText").css('width','190px');
					}else{
						$("#w_oProfileMenu2 ul li .w_cNotificationText").css('width','208px');
					}
				});
			}
			
			$("#w_oNavAssetsHolder").css('z-index','999');
			$("#w_oCNABar").css('z-index','-53');
			////
			if ($("#w_oProfileMenu").hasClass("open")) {
				$("#w_oProfileMenu").removeClass("open");
				$("span.w_cProfileDDPointer").css("display","none");
				$("#w_oProfileMenu").children("ul").slideUp("fast");
			}
			//Code for Admin Menu
			if ($("#w_oAdminMenu").hasClass("open")) {
				$("#w_oAdminMenu").removeClass("open");
				$("span.w_cAdminDDPointer").css("display","none");
				$("#w_oAdminMenu").children("ul").slideUp("fast");
			}
		});
		$("#w_oProfileMenu2 ul").on("click", function(e) {
			e.stopPropagation();
		});
	}
	
	function addDocumentClickEvent() {
		$(document).click(function(e) {
			if ($('#w_oProfileMenu').hasClass("open")) {
				$('#w_oProfileMenu').removeClass("open");
				$("span.w_cProfileDDPointer").css("display","none");
				$('#w_oProfileMenu').children("ul").slideUp("fast");
			}
			if ($('#w_oProfileMenu2').hasClass("open")) {
				$('#w_oProfileMenu2').removeClass("open");
				$("span.w_cProfileDDPointer2").css("display","none");
				$('#w_oProfileMenu2').children("ul").slideUp("fast");
			}
			//Code for Admin Menu
			if ($('#w_oAdminMenu').hasClass("open")) {
				$('#w_oAdminMenu').removeClass("open");
				$("span.w_cAdminDDPointer").css("display","none");
				$('#w_oAdminMenu').children("ul").slideUp("fast");
			}
			if($('#w_oShareUpdateHomeView').css('display')=="block"){
				if($('#w_oHShareTxt2').show()){
					onHShareFormDocHide();
				}
			}
			if($('#w_oPraiseHomeView').css('display')=="block"){
				if($('#w_oHPraiseTxt2').show()){
					onHPraiseFormDocHide();
				}
			}
			if($('#w_oRecomandNanoHomeView').css('display')=="block"){
				if($('#w_oHRecomendTxt2').show()){
					onHUserFormDocHide();
				}
			}
			if($('#w_oRecomandNanoCommView').css('display')=="block"){
				if($('#w_oCRecomendTxt2').show()){
					onCUserFormDocHide();
				}
			}
			if($('#w_oCShareUpdateCommView').css('display')=="block"){
				if($('#w_oCShareTxt2').show()){
					onCShareFormDocHide();
				}
			}
			if($('#w_oNSecondField').show()){
				onNUserFormDocHide();
			}
			if($('#w_oVSecondField').show()){
				onVUserFormDocHide();
			}
			
			onTooltipOut();
			m_oCRoot.onLessDescClick();

		});
		$("#w_oPopup").click(function(e){
			if($('#w_oVRecomendTxt2').show()){
				onVUserFormDocHide();
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
	/**
	 * Description: 
	 * @param {Object} p_bVal
	 */
	function preventDefaultClick(p_bVal) {
		log('preventDefaultClick - ' + p_bVal);
		var _oObj;
		_oObj = $('#' + m_oCurrentNano);
		//_oObj = $('#' + m_oClickedNano);
		if (p_bVal == true) {
			_oObj.unbind('click');
			$('#w_oLaunchButton').unbind('click', onLaunchButtonClick);
			$('#w_oLaunchButton').removeClass('w_oButton2').addClass('w_oButtonDisabled2');
			///
			$('#w_oHomeButton').unbind('click', onHomeButtonClick);
			$('#w_oCNavIconHome').unbind('click', onHomeButtonClick);
		} else {
			_oObj.unbind('click', onButtonClick).bind('click', onButtonClick);
			$('#w_oLaunchButton').unbind('click').bind('click', onLaunchButtonClick);
			$('#w_oLaunchButton').removeClass('w_oButtonDisabled2').addClass('w_oButton2');
			///
			$('#w_oHomeButton').unbind('click').bind('click', onHomeButtonClick);
			$('#w_oCNavIconHome').unbind('click').bind('click', onHomeButtonClick);
		}
	}
	/**
	 * 
	 */
	function getUrlVars() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	/**
	 * Description:	Find longest word in given string
	 * @param {Object} p_sSentence
	 */
	function findLongestWord(p_sSentence) {
		var _aWords = p_sSentence.split(" ");
		var _nLength = 0;
		var _sWord = null;
		for (var i = 0; i < _aWords.length; i++) {
			var _sTmp = "";
			for (var j = 0; j < _aWords[i].length; j++) {
				if (/[a-zA-Z]/.test(_aWords[i][j])) {
					_sTmp += _aWords[i][j];
				}
			}
			if (_nLength < _sTmp.length) {
				_nLength = _sTmp.length;
				_sWord = _sTmp;
			}
		}
		return _nLength; //Retutns logest word length
		//return _sWord; //Returns longest word
	}
	function manageGap() {
		if(m_nCommunities>14 && m_nGap<=-22) {
			m_nGap = - 280/m_nCommunities;
		}
	}
	function setLaunchViewTitle() {
		var _sTitle = $('#w_oLaunchTitleLV').html();
		if(_sTitle.length>35) {
			$('#w_oLaunchTitleLV').switchClass( "w_oLayout09Default", "w_oLayout09Reduced", 200, "easeInOutQuad", function(){
				updateActivityTypeIcon();
			});
		} else {
			$('#w_oLaunchTitleLV').switchClass( "w_oLayout09Reduced", "w_oLayout09Default", 200, "easeInOutQuad", function(){
				updateActivityTypeIcon();
			});
		}
	}
	/**
	 * Description: Sets blocker height same as document height
	 * @param {Object} p_oBlocker
	 */
	function setBlockerAsDocHeight(p_oBlocker) {
		var _oDocHeight = $(document).height();
		//log('setBlockerAsDocHeight: _oDocHeight - ' + _oDocHeight);
		$(p_oBlocker).css('height',_oDocHeight);
	}
	/**
	 * Description: Detects Webkits and OS.
	 * Fixes overflow hidden elements spill issue during animation.
	 * TODO: Remove this function if 'overflow:hidden' respected by webkit.
	 * @return 	_sNavAndOS	1. ChromeButNotXP	- Chrome not running on Windows XP
	 * 						2. Safari			- Safari browser
	 */
	function WebKitAndOS() {
		var _sOS="";
		var _sNavAndOS = "";
		//if (navigator.appVersion.indexOf("Windows NT 6.2")!=-1) _sOS="Windows 8";
		//if (navigator.appVersion.indexOf("Windows NT 6.1")!=-1) _sOS="Windows 7";
		//if (navigator.appVersion.indexOf("Windows NT 6.0")!=-1) _sOS="Windows Vista";
		if (navigator.appVersion.indexOf("Windows NT 5.1")!=-1) _sOS="Windows XP";
		//if (navigator.appVersion.indexOf("Windows NT 5.0")!=-1) _sOS="Windows 2000";
		//if (navigator.appVersion.indexOf("Mac")!=-1) _sOS="Mac/iOS";
		//if (navigator.appVersion.indexOf("X11")!=-1) _sOS="UNIX";
		//if (navigator.appVersion.indexOf("Linux")!=-1) _sOS="Linux";
		
		//log('OS: '+_sOS);
		
		var _bIsChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
		var _bIsSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
		if(_bIsChrome){
			if(_sOS != 'Windows XP') _sNavAndOS = "ChromeButNotXP";
		}
		else if(_bIsSafari){
			_sNavAndOS = "Safari";
		}
		else {
			_sNavAndOS = "";
		}
		//log('WebKitAndOS: _sNavAndOS - ' + _sNavAndOS);
		return _sNavAndOS;
	}
	/**
	 * Detects IE9 version.
	 * Works when ie9 class added in html element by conditional comments
	 */
	(function($) {"use strict";
		if ($('html').is('.ie9')) {
			m_bIsIE9 = true;
		}
	}(jQuery));
	/**
	 * Description: Resets page scroll
	 * @param {Object} p_nTop
	 */
	function resetScrollTo(p_nTop,p_oObj) {
		if(p_nTop==undefined) p_nTop = 0;
		(p_oObj==undefined)? p_oObj = $("body, html"):p_oObj=$('#'+p_oObj);
		var _nObjTop = $(document).scrollTop();
		if (_nObjTop != 0) {
			p_oObj.animate({
				scrollTop : p_nTop
			}, '200', function() {
				//
			});
		}
	}
	/**
	 * Description: Console log
 	 * @param {Object} p_sMessage
	 */
	/*function log(p_sMessage) {
	    if(!Debug) { return; }
	    else { if(window.console) { console.log(p_sMessage); }}
	}*/
	var log = Debug && window.console ? window.console.log.bind(window.console) : function() {};
	/**
	 * Description: public method 
	 */
	this.pubMethod = function() {
		log("public method");
	};
	
}
var main = new Main();
//Use public method
//main.pubMethod();
onProfileFrameClick = function(e) {
	$('#w_oProfileFrame').hide();
	m_bIsPersonalProfileViewOpen = false;
};

//This is dummy data for input token. Will be altered by App dev team.
$(document).ready(function(){
	//Home View - Share Update			   
	$("#w_oHShareTxt2").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oHShareTxt2"});
	$("#w_oHShareTxt3").tokenInput([
		{id: 1, name: "Everyone"},											   
		{id: 2, name: "Nokia Way"},
		{id: 3, name: "Personal Effectiveness"},
		{id: 4, name: "Asha"},
		{id: 5, name: "WIndows Phone"}
	],{theme:"style2",hintFieldText:"Post to (type a coounity name)...", hintText: "Type to search for results",tokenLimit:1,selectDropDownField:true});	
	$("#w_oHShareUpdatePostTo").click(function(){
		$(this).hide();
		$("#w_oHShareUpdatePost ul.token-input-list-style2").show();
		$("#w_oHShareUpdatePost ul.token-input-list-style2 input").focus();					
	})
	
	//Home View - Praise someone					   
	$("#w_oHPraiseTxt1").tokenInput([
		{id: 1, name: "Nano 1"},											   
		{id: 2, name: "Nano 2"},
		{id: 3, name: "Nano 3"},
		{id: 4, name: "Nano 4"},
		{id: 5, name: "Nano 5"},
		{id: 6, name: "Nano 6"},
		{id: 7, name: "Nano 7"}
	],{theme:"style0", instance:"w_oHPraiseTxt1", hintFieldText:"Who deserves praise?"});						   
	$("#w_oHPraiseTxt3").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oHPraiseTxt3"});
	$("#w_oHPraiseTxt4").tokenInput([
		{id: 1, name: "Everyone"},											   
		{id: 2, name: "Nokia Way"},
		{id: 3, name: "Personal Effectiveness"},
		{id: 4, name: "Asha"},
		{id: 5, name: "WIndows Phone"}
	],{theme:"style2",hintFieldText:"Post to (type a comunity name)...", hintText: "Type to search for results",tokenLimit:1,selectDropDownField:true});	
	$("#w_oHPraisePostTo").click(function(){
		$(this).hide();
		$("#w_oHPraisePost ul.token-input-list-style2").show();
		$("#w_oHPraisePost ul.token-input-list-style2 input").focus();					
	})
						   
	//Home View - Recomend a Nano					   
	$("#w_oHRecomendTxt1").tokenInput([
		{id: 1, name: "Nano 1"},											   
		{id: 2, name: "Nano 2"},
		{id: 3, name: "Nano 3"},
		{id: 4, name: "Nano 4"},
		{id: 5, name: "Nano 5"},
		{id: 6, name: "Nano 6"},
		{id: 7, name: "Nano 7"}
	],{theme:"style0", instance:"w_oHRecomendTxt1", hintFieldText:"What&rsquo;s worth seeing?"});						   
	$("#w_oHRecomendTxt3").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oHRecomendTxt3"});
	$("#w_oHRecomendTxt4").tokenInput([
			{id: 1, name: "Everyone"},											   
			{id: 2, name: "Nokia Way"},
			{id: 3, name: "Personal Effectiveness"},
			{id: 4, name: "Asha"},
			{id: 5, name: "WIndows Phone"}
		],{theme:"style2",hintFieldText:"Post to (type a coounity name)...", hintText: "Type to search for results",tokenLimit:1,selectDropDownField:true});	
	$("#w_oHPostTo").click(function(){
			$(this).hide();
			$(".w_cPostToDD ul.token-input-list-style2").show();
			$(".w_cPostToDD ul.token-input-list-style2 input").focus();					
	})
	
	//Community View - Recomend a Nano
	$("#w_oCRecomendTxt1").tokenInput([
		{id: 1, name: "Nano 1"},											   
		{id: 2, name: "Nano 2"},
		{id: 3, name: "Nano 3"},
		{id: 4, name: "Nano 4"},
		{id: 5, name: "Nano 5"},
		{id: 6, name: "Nano 6"},
		{id: 7, name: "Nano 7"}
	],{theme:"style0", instance:"w_oCRecomendTxt1", hintFieldText:"What&rsquo;s worth seeing?"});						   
	$("#w_oCRecomendTxt3").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oCRecomendTxt3"});
	
	$("#w_oNRecomendTxt2").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oNRecomendTxt2"});
	
	//Community View - Share Update
		$("#w_oCShareTxt2").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oCShareTxt2"});
	$("#w_oCShareTxt3").tokenInput([
		{id: 1, name: "Everyone"},											   
		{id: 2, name: "Nokia Way"},
		{id: 3, name: "Personal Effectiveness"},
		{id: 4, name: "Asha"},
		{id: 5, name: "WIndows Phone"}
	],{theme:"style2",hintFieldText:"Post to (type a coounity name)...", hintText: "Type to search for results",tokenLimit:1,selectDropDownField:true});	
	$("#w_oCShareUpdatePostTo").click(function(){
		$(this).hide();
		$("#w_oCShareUpdatePost ul.token-input-list-style2").show();
		$("#w_oCShareUpdatePost ul.token-input-list-style2 input").focus();					
	})
	
	$("#w_oVRecomendTxt2").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style1", instance:"w_oVRecomendTxt2"});
	
	$("#w_oVRecomendTxt3").tokenInput([
		{id: 1, name: "Helen Goodband"},											   
		{id: 2, name: "James Williams"},
		{id: 3, name: "Dipender Singh"},
		{id: 4, name: "Kunjbihari Sharma"},
		{id: 5, name: "Ravi Pandey"},
		{id: 6, name: "Jay Bhardwal"},
		{id: 7, name: "Vipul Mamtora"}
	],{theme:"style2",hintFieldText:"Post to (type a coounity name)...", hintText: "Type to search for results",tokenLimit:1,selectDropDownField:true});	
	
	$("#w_oVPostTo").click(function(){
			$(this).hide();
			$("#w_oVRecomendPost ul.token-input-list-style2").show();
			$("#w_oVRecomendPost ul.token-input-list-style2 input").focus();					
	})
	//$("#w_oNSecondField").hide();
	
	$(".w_cPostToDD ul.token-input-list-style1").hide();	
	$(".w_cPostToDD ul.token-input-list-style2").hide();
});

function autoSize(ele){
	ele.style.overflow = 'hidden';
	ele.style.overflowY = 'auto';
	ele.scroll='no';
	ele.style.height='auto';
	ele.style.height=ele.scrollHeight+'px';
   	var newHeight = (ele.scrollHeight > 49 ? ele.scrollHeight : 49);
	//ele.style.height = newHeight+"px";
	//$(ele).css({"min-height": newHeight+"px"})
    ele.style.height = newHeight.toString() + 'px';
	$(ele).keypress(function(event) {
        if (event.keyCode == 13) {
			//ele.style.height=ele.scrollHeight+5+"px";
            ele.style.overflowY = 'hidden';
			if(ele.scrollHeight > 53){
				ele.style.height="";
				ele.style.height=(ele.scrollHeight+12)+'px';
			}else{
			}
        }
    });
}


function iframeLoaded() {
	var iFrameID = document.getElementById('w_oProfile');
	if(iFrameID) {
		// here you can make the height, I delete it first, then I make it again
		iFrameID.height = "";
		iFrameID.height = iFrameID.contentWindow.document.body.scrollHeight + "px";
		//setBlockerAsDocHeight('#w_oRecentActivityBlocker');
		var body = iFrameID.contentWindow.document.body, html = iFrameID.contentWindow.document.documentElement;
		var _oDocHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		//alert("_oDocHeight" + _oDocHeight);
		//console.log('setBlockerAsDocHeight: _oDocHeight - ' + _oDocHeight);
		$("#w_oProfile").css('height', _oDocHeight);
		//iFrameID.contentWindow.document.getElementById('w_oProfileFrame').style.height(_oDocHeight);
		//console.log('setBlockerAsDocHeight: $("#w_oProfileFrame").css(height) - ' + $("#w_oProfile").css('height'));
	} 
}




