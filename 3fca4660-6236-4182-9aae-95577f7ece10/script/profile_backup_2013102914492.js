/**
 * @author Kunj.Sharma
 */
function Profile(){
	//Variables
	m_bIsEditButton = true;
	m_bIsSaveButton = false;
	/**
	 * Description: 
	 * 
	 */
	$(document).ready(function() {
		$('#w_oEdit').bind('click', onButtonClick);
	});
	/**
	 * Description: 
	 * 
	 */
	function onButtonClick() {
		var _sUser = "";
		var _sUserRole = "";
		var _sUserDesc = "";
		if(m_bIsEditButton) {
			//$('#w_oUser').unwrap().wrap();
			//User name
			_sUser = $('#w_oUser').text();
			$('#w_oUser').replaceWith("<p id='w_oUser'><input id='w_oUserInput' type='text' value='"+_sUser+"'/></p>");
			//User role
			_sUserRole = $('#w_oUserRole').text();
			$('#w_oUserRole').replaceWith("<p id='w_oUserRole'><input id='w_oUserRoleInput' type='text' value='"+_sUserRole+"'/></p>");
			//User description
			_sUserDesc = $('#w_oUserDesc').text();
			$('#w_oUserDesc').replaceWith("<p id='w_oUserDesc'><textarea id='w_oUserDescInput' type='text'>"+_sUserDesc+"</textarea></p>");
			
			$('#w_oUserInput').focus();
			$('#w_oEdit').attr("value", "SAVE");
			m_bIsEditButton = false;
			m_bIsSaveButton = true;
		} else {
			$('#w_oEdit').attr("value", "EDIT");
			m_bIsEditButton = true;
			m_bIsSaveButton = false;
		}
	}
}
var profile = new Profile();
	