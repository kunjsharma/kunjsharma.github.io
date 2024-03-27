/**
 * @author Kunj.Sharma
 */
function init() {
	
}
//Below 2 functions use by menu to show rollover effect
function onMenuRollover(p_oThis) {
	p_oThis.style.background = "#ffffff";
	p_oThis.style.color = "#000000";
}
function onMenuRollout(p_oThis) {
	p_oThis.style.background = "#666666";
	p_oThis.style.color = "#ffffff";
}
//Instruction change function
var defaultInstruction = "Select <b>Next</b> to continue.";
var appHotspotInstruction = "Select each <b>Hotspot</b> to see more information.";
var boxRevealInstruction = "Select each <b>Image</b> to see more information.";
var faqConcertinaInstruction = "Select each <b>Bar</b> to see more information.";
function changeInstruction(p_nId){
	var ins=document.getElementById("instruction");
	if(p_nId == undefined || p_nId==0){
		ins.innerHTML = defaultInstruction;
	}else if (p_nId==1) {
		ins.innerHTML = appHotspotInstruction;
	}else{
		ins.innerHTML = defaultInstruction;
	};
}
//Navigation counter