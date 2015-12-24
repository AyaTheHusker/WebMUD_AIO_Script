// *******************************************
// * Chupon's SuperScript (All IN ONE). v8.0 * 
// *******************************************
// Paste in your browser's debug console or chrome cjs addon, and press enter to add this function to WebMUD
//
// NOW INCLUDES Simple Scripting Feature and dropdown paths menu. Next version should have path recording added.
//
// Thanks @ Blorgen for assistance. And some of his code is integrated as well.
//
// Simply Add a new case and path in the same format as below.
// Name the case '#Startroom2Finishroom' to make it easier to follow.
// Modify the #Menu alert message to display the new path command you add. 
// And: Type #Menu for a list of paths to pop-up.
//
// Version 2.0 ** Added many more paths. Beware #Deepwoodtrainer2SouthportTrainer and vice versa are VERY LONG PATHS.
//             **
// Version 3.0 ** 			  Added some of Blorgens code for his reverse paths and path arrays to make making new paths easier.
//             ** Also Added: Double click the mud display screen to display the in-terminal menu. Walk with numlock on with the numpad.
//			   **             Hold Control and Press Enter to send multiple commands from the text window.
//             **             This is particularlyseful for grabbing, getting, selling and buying multiple of the same item.              
// Version 4   **
//             **             Lots of features added, dropdown paths menu, added slightly modified exp/hr function from Blorgens scripts.
//             **             Added Modified Moving Script which allows for updating the flee direction without reloading/editing the script. Also added the ability to disable and re-enable the auto-moving script.     	
//             **
// Version 4.5 **             Added Max/Min Resting Inputs and made the interface a little better looking.
//             **
// Version 5.5 **			  Added Buff and Spell timers! Exp Meter removed to keep it less laggy.
//             **
// Version 6   **			  Fixes to min/max health%s in script functions. Fixes to heal/buff timers. Added paths to the sunken shrine from the ford crossing and back.
//             **
//             **
// Version 7   **             Added multiple directions for run/rest. For more than one direction, use commas. **Example: s,se,ne
//             **             Added Pre-Rest and Post-Rest commands. For more than one command, use commas. **Example: drop 1000 c, drop 500 c, drop 200 s, wear coprolite necklace
//			   **
// Version 8   **
//			   **             Made the healing timer smart! Now healing tests the user's health and mana %s for better efficiency. Added another auto-timer for non spell events. 
//             **             Similar to the pre-rest post-rest inputs, the auto-cmd input can execute multiple commands. Great for grabbing items while afk or adding extra buffs.

//Adds All The Custom Elements>
$('<div><select id="PathDropDown"; style="font-size: 20px; font-weight: bold"; onChange="PathDropDownSelection()"><option selected value="base">&nbsp&nbsp&nbsp&nbspPaths and Commands</select>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>Rest Below</label>&nbsp&nbsp<input type="number" size="1" id="RestMin" value="80" min="1" max="100" onchange="FixRestPercent()" style="width: 3em;"><label>%HP</label>&nbsp&nbsp&nbsp&nbsp&nbsp<label>&nbspMax</label><input type="number" size="1" id="RestMax" value="100" min="1" max="100" onchange="FixRestPercent()" style="width: 3em;"><label>%HP</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input type= "submit" value="Update Settings" onclick="UpdateRunRestDir()"><br /><br /><label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspHeal <= <input type="number" size="1" id="HealBelow" value="90" min="1" max="100" onchange="FixHealPercent()" style="width: 3em;"><label>%HP</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp>= <input type="number" size="1" id="HealMana" value="65" min="1" max="100" onchange="FixManaPercent()" style="width: 3em;"><label>%Mana</label><br /><br /><label>Auto-Script:</label><input type="checkbox" id="EnableScripting" onClick="ScriptingToggle()"><label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAuto-CMD</label><input type="checkbox" id="EnableAutoCommand" onClick="AutoCommandToggle()"><label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRun Dir(s) </label>&nbsp&nbsp<input type="text" size="2" id="RunDirection" value="nw">&nbsp&nbsp&nbsp&nbsp&nbsp<label>PreRest:</label><input type="text" size="2" id="PreRest" value=""><label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPostRest:</label><input type="text" size="2" id="PostRest" value=""><br /><br /><label>Auto-Heal</label><input type="checkbox" id="EnableHealing" onClick="HealingToggle()"><label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspAuto-Buff</label><input type="checkbox" id="EnableBuffing" onClick="BuffingToggle()">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspBuffSpell:</label><input type="text" size="2" id="BuffSpell" value="">&nbsp&nbsp&nbsp&nbsp<label>HealSpell:</label><input type="text" size="2" id="HealSpell" value="">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>Auto-CMD:</label><input type="text" size="2" id="AutoCommand" value=""><br /><br /><label>Buff Interval:</label><input type="number" size="1" id="BuffIntervalControl" value="120" min="1" max="300" onchange="FixIntervals()" style="width: 3em;"><label> Sec</label><br /><label>Heal Interval:</label><input type="number" size="1" id="HealIntervalControl" value="5" min="1" max="400" onchange="FixIntervals()" style="width: 3em;"><label> Sec</label><label>&nbsp&nbsp&nbsp&nbsp&nbspCMD Interval:</label><input type="number" size="1" id="CommandIntervalControl" value="10" min="1" max="400" onchange="FixIntervals()" style="width: 3em;"><label id="CommandIntervalLabel"> Sec</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div><div style="float:left; padding:1em 0 0 1em;"></div></span></div>').insertAfter("#divMainPanel");
var AutoCommandString="";
var HealManaPercent=65;
var HealBelowPercent=90;
var PreRestCmd = "";
var PostRestCmd = "";
var AutoCommandString = "";
var IsScriptingEnabled = document.getElementById('EnableScripting');
var IsHealingEnabled = document.getElementById('EnableHealing');
var IsBuffingEnabled = document.getElementById('EnableBuffing');
var IsAutoCommandEnabled = document.getElementById('EnableAutoCommand');
var MusicString = "";//SoundEmbeds For Future Use
var CmdInterval = 10000; //GLOBALLY Initialize Auto Command Interval
var HealInterval = 5000; //GLOBALLY Initialize Heal Spell Interval
var BuffInterval = 120000; //GLOBALLY Initialize Buff Spell Interval
var AllowNumWalk=1; // Initial setting to allow numlock walking.
var ScriptRunDirection = "nw";
var RestMaxPercent = 100;
var RestMinPercent = 80;
CastHeal();
CastBuff();
PerformAutoCommands();

// DROP DOWN PATHS
var select = document.getElementById("PathDropDown");
var PathArray=["#Ford2Southport", "#Southport2Ford", "#DeepwoodTrainer2SouthportTrainer", "#SouthportTrainer2DeepwoodTrainer", 
	"#Trainer2Graveyard", "#Graveyard2Trainer", "#Trainer2Smithy", "#Smithy2Trainer", "#Trainer2Pit", "#Pit2Trainer", "#Tangle2Trainer",
	"#Trainer2Tangle", "#Dryad2Trainer", "#Ford2SouthTrainer", "#SouthTrainer2Ford", "#Graveyard2Ford", "#Ford2Graveyard", "#SivRaiderLair2Ford",
	"#Ford2SivRaiderLair", "#ShrineStairwell2Ford", "#Ford2ShrineStairwell", "#Dice"];

for(var i = 0; i < PathArray.length; i++) {
    var opt = PathArray[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

function UpdateRunRestDir() { //// This Function Updates 
var UnformattedDirection = ($("#RunDirection").val()); //Grabs Textbox Contents.
var HealSpell = ($("#HealSpell").val());
var BuffSpell = ($("#BuffSpell").val());
IsScriptingEnabled = document.getElementById('EnableScripting');
IsAutoCommandEnabled = document.getElementById('EnableAutoCommand');
IsHealingEnabled = document.getElementById('EnableHealing');
IsBuffingEnabled = document.getElementById('EnableBuffing');
RestMaxPercent = (parseInt($("#RestMax").val()));
RestMinPercent = (parseInt($("#RestMin").val()));
PreRestCmd  = ($("#PreRest").val());
PostRestCmd = ($("#PostRest").val());
AutoCommandString = ($("#AutoCommand").val());
if (RestMaxPercent > 100) {RestMaxPercent=100}
if (RestMaxPercent < 1) {RestMaxPercent=1}
if (RestMinPercent < 1) {RestMinPercent=1}
if (RestMinPercent > 100) {RestMinPercent=100}
if (RestMinPercent > RestMaxPercent) {RestMinPercent = RestMaxPercent}
$('#RestMax').val(RestMaxPercent); 
$('#RestMin').val(RestMinPercent); 
ScriptRunDirection = UnformattedDirection.toLowerCase(); //Converts the text to lowercase and stores it in the variable "PathTriggerCmd"

	if (IsScriptingEnabled.checked) {
$("#mainScreen").append("<span style='color: cyan'>You will now run: </span><span style='color: yellow'>" + ScriptRunDirection + "<span style='color: cyan'> before resting.</span><br />");
$("#mainScreen").append("<span style='color: cyan'>You will now rest if below: </span><span style='color: red'>" + RestMinPercent + "% " + "<span style='color: cyan'>of your total HP.</span><br />");
$("#mainScreen").append("<span style='color: cyan'>You will now rest until reaching: </span><span style='color: green'>" + RestMaxPercent + "% " + "<span style='color: cyan'>of your total HP.</span><br />");
$("#mainScreen").append("<span style='color: cyan'>You will execute these commands before resting: </span><span style='color: orange'>" + PreRestCmd +  "<span style='color: cyan'>.</span><br />");
$("#mainScreen").append("<span style='color: cyan'>You will execute these commands after resting: </span><span style='color: orange'>" + PostRestCmd +  "<span style='color: cyan'>.</span><br />");
	} else {
$("#mainScreen").append("<span style='color: red'>**** MOVE/REST SCRIPTING IS CURRENTLY DISABLED ****</span><br />");		
	}
	

	if (IsHealingEnabled.checked) {
$("#mainScreen").append("<span style='color: cyan'>You will heal by casting: </span><span style='color: green'>" + HealSpell + "<span style='color: cyan'>, when below or equal to </span><span style='color: red'>" + HealBelowPercent + "% </span><span style='color: cyan'>HP, and above or equal to </span><span style='color: yellow'>" + HealManaPercent + "% </span><span style='color: cyan'>mana.</span><br />");
$("#mainScreen").append("<span style='color: cyan'>You will heal, if the above conditions are met, every: </span><span style='color: magenta'>" + (HealInterval / 1000) +  "<span style='color: cyan'> seconds.</span><br />");
	} else {
$("#mainScreen").append("<span style='color: red'>**** AUTO SELF-HEALING IS CURRENTLY DISABLED ****</span><br />");		
	}


	if (IsBuffingEnabled.checked) {
$("#mainScreen").append("<span style='color: cyan'>You will buff yourself with </span><span style='color: green'>" + BuffSpell + ", every <span style='color: cyan'>" + "<span style='color: magenta'>" + (BuffInterval / 1000) +  "<span style='color: cyan'> seconds.</span><br />");
	} else {
$("#mainScreen").append("<span style='color: red'>**** AUTO SELF-BUFFING IS CURRENTLY DISABLED ****</span><br />");		
	}
	

	if (IsAutoCommandEnabled.checked)   {
$("#mainScreen").append("<span style='color: cyan'>You will execute the commands listed below every: </span><span style='color: magenta'>" + (CmdInterval / 1000) +  "<span style='color: cyan'> seconds.</span><br /><span style='color: cyan'>[");
$("#mainScreen").append("<span style='color: orange'>" + AutoCommandString +  "<span style='color: cyan'>].</span><br />");
	} else {
$("#mainScreen").append("<span style='color: red'>**** AUTO MULTI-COMMANDS ARE CURRENTLY DISABLED ****</span><br />");		
	}
	
	
	
		
sendMessageDirect("");
}

function FixRestPercent(){
RestMaxPercent = (parseInt($("#RestMax").val()));
RestMinPercent = (parseInt($("#RestMin").val()));
if (RestMaxPercent > 100) {RestMaxPercent=100}
if (RestMaxPercent < 1) {RestMaxPercent=1}
if (RestMinPercent < 1) {RestMinPercent=1}
if (RestMinPercent > 100) {RestMinPercent=100}
if (RestMinPercent > RestMaxPercent) {RestMinPercent = RestMaxPercent}
$('#RestMax').val(RestMaxPercent); 
$('#RestMin').val(RestMinPercent); 
}

function FixManaPercent(){
HealManaPercent = (parseInt($("#HealMana").val()));
}

function FixHealPercent(){
HealBelowPercent = (parseInt($("#HealBelow").val()));
}


function ScriptingToggle(){
var IsScriptingEnabled = document.getElementById('EnableScripting');
if (IsScriptingEnabled.checked)   {
	$("#mainScreen").append("<span style='color: green'>** Scripting Enabled **</span><br />");
	sendMessageDirect("");
		}
								
else 	{
	$("#mainScreen").append("<span style='color: red'>** Scripting Disabled **</span><br />");
	sendMessageDirect("");	
        }
}

function AutoCommandToggle(){
var IsAutoCommandEnabled = document.getElementById('EnableAutoCommand');
if (IsAutoCommandEnabled.checked)   {
	$("#mainScreen").append("<span style='color: purple'>** Auto Commands Enabled **</span><br />");
	sendMessageDirect("");
		}
								
else 	{
	$("#mainScreen").append("<span style='color: magenta'>** Auto Commands Disabled **</span><br />");
	sendMessageDirect("");	
        }
}
function PathDropDownSelection(){
var DDSelection = "";
DDSelection = document.getElementById("PathDropDown").value;
DDSelection.toLowerCase(); //Converts the text to lowercase and stores it in the variable "PathTriggerCmd"
$('#message').val(DDSelection); 
document.getElementById("PathDropDown").selectedIndex = 0;
$("#message").trigger('input');

 }
//DROP DOWN PATH BLOCKS END








function DelayNumPad(){
AllowNumWalk=1;
}

$("#mainScreen").dblclick(function() {
        $('#message').val("#menu"); // When the user doubleclick's the terminal screen the paths/commands menu is displayed.
        $("#message").trigger('input');
        
});

$("#ExpPerHour").dblclick(function() {
   $("#mainScreen").append("<span style='color: orange'>** Exp/Hr meter reset. **</span><br />");
	sendMessageDirect("");
	$("#ExpPerHour").text("Reset! Calculating...");
	ResetExpPH(); // Calls the ResetExpPH function when you double click the exp label.
    
});

$("#message").bind("keydown",InputBoxKeyChecker); //Binds pressing a key inside the #message box to call the InputBoxKeyChecker function
function InputBoxKeyChecker(e){
    if ((e.ctrlKey) && (e.keyCode == 13)){ //Holding Control + Enter Keys will cause the text in the message input box to be spamable. Great for buying, selling, grabbing and dropping!
        var SpammableCommand = ($("#message").val()); //Grabs MessageBoxText to be used multiple times.
		sendMessageDirect(SpammableCommand);
	}
    
	//NUMPAD WALKING IF NUMLOCK IS ON AND YOU PRESS THE DIRECTIONALS FROM INSIDE THE INPUT MESSAGE BOX

	
			if (e.keyCode==109){   //Walk Down with -
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("D");
						AllowNumWalk=0; 
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			}
			if (e.keyCode==107){ //Numpad + to walk UP
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("U");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==103){ //Numpad 7 to walk NW
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("NW");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==104){ //Numpad 8 to walk N
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("N");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==105){ //Numpad 9 to walk NE
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("NE");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==100){ //Numpad 4 to walk W
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("W");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==102){ //Numpad 6 to walk E
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("E");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			
			}
			if (e.keyCode==97){ //Numpad 1 to walk SW
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("SW");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			}
			if (e.keyCode==98){ //Numpad 2 to walk S.
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("S");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			}
			if (e.keyCode==99){ //Numpad 3 to walk SE.
			$('#message').val(""); //This clears the text box
				if (AllowNumWalk==1){ 
					sendMessageText("SE");
						AllowNumWalk=0;
						setTimeout(DelayNumPad,100);
						$('#message').val(""); //This clears the text box
					}
			}
	}	


function MoveClick(moveValue){
	var movementValue = moveValue;
	sendMessageText(movementValue);
	$('#message').val('').focus();
};

function reverseDirection(dir){ //Blorgen's Direction Reverser, for easier pathmaking.
	var newDir = "";
	for(var i = 0; i < dir.length; i++){
		switch(dir[i]){
		case "n":
			newDir += "s";
			break;
		case "s":
			newDir += "n";
			break;
		case "e":
			newDir += "w";
			break;
		case "w":
			newDir += "e";
			break;
		case "d":
			newDir += "u";
			break;
		case "u":
			newDir += "d";
			break;
		}
	}
	return newDir;
}
//
//Run to places
function RunToFordFromShrineStairwell(){
	var toFord = "u,s,sw,s,sw,s,sw,s,sw,w,nw,s,sw,w,sw,nw,w,nw,nw,w,nw,w,nw,nw,n,ne,n,n,n,n,ne,n,n,ne,n,nw,w,w";  
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toFord.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}	
//Disabled Music
//setTimeout(function(){
//$('<div id="MusicPlayer"><iframe width="300" height="24" src="https://www.youtube.com/embed/jVW22xjrq5A?rel=0&autohide=0&autoplay=1" frameborder="0" allowfullscreen></iframe></div>').insertAfter("#mainDisplay");
//}, 55000);	
//setTimeout(function(){
//$("#MusicPlayer").remove();
//}, 135000);


function RunToShrineStairwellFromFord(){
	var toFord = "u,s,sw,s,sw,s,sw,s,sw,w,nw,s,sw,w,sw,nw,w,nw,nw,w,nw,w,nw,nw,n,ne,n,n,n,n,ne,n,n,ne,n,nw,w,w";  
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toFord.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}
//Disabled Music
//	setTimeout(function(){
//	$('<div id="MusicPlayer"><iframe width="300" height="24" src="https://www.youtube.com/embed/jSlCBmL9ZwE?rel=0&autohide=0&autoplay=1" frameborder="0" allowfullscreen></iframe></div>').insertAfter("#mainDisplay");
//	}, 55000);	
//	setTimeout(function(){
//    $("#MusicPlayer").remove();
//}, 135000);



function RunToBrigandFromTown(){
	var toBrigand = "ne,ne,ne,e,se,e,e,ne,ne,ne,nw,nw,n,ne,ne,n,nw,n,nw,w,nw,n,ne,n,ne,e,se,ne,nw,ne,e,se,e,se,e,ne,e";  
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toBrigand.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}
function RunToCenterOfSouthportFromFordCrossing(){
	var toDocks = "s,s,se,s,s,sw,s,s,s,s,sw,s,s,s,se,se,s,s,se,s,s,s,sw,s,s,s,sw,s,se,s,s,s,s,sw,s,s,s,s,s,s,sw,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,w,u,w,w,w,n,n,u";  
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toDocks.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToFordCrossingFromCenterOfSouthport(){
	var toDocks = "s,s,se,s,s,sw,s,s,s,s,sw,s,s,s,se,se,s,s,se,s,s,s,sw,s,s,s,sw,s,se,s,s,s,s,sw,s,s,s,s,s,s,sw,sw,sw,s,s,s,s,s,s,s,s,s,s,s,s,s,s,w,u,w,w,w,n,n,u";  
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toDocks.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

	function RunToTownFromBrigand(){
	var toTown = "w,sw,w,nw,w,nw,w,sw,se,sw,nw,w,sw,s,sw,s,se,e,se,s,se,s,sw,sw,s,se,se,sw,sw,sw,w,w,nw,w,sw,sw,sw";
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toTown.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");

}

function RunToTownFromTanglewood(){
	var toTown = "s,se,ne,e,u,e,e,ne,ne,ne,e,ne,e,ne,e,se,e,ne,n,nw,n,ne,ne,ne,n,e,ne,ne,n,ne,ne,e,ne,se,se,e,se,se,sw,sw,sw";

	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toTown.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");

}

function RunToTanglewoodFromTown(){
	var toTanglewood = "ne,ne,ne,nw,nw,w,nw,nw,sw,w,sw,sw,s,sw,sw,w,s,sw,sw,sw,s,se,s,sw,w,nw,w,sw,w,sw,w,sw,sw,sw,w,w,d";

	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	toTanglewood.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");

}

function RunToTownFromWolves(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toTown = "e,ne,e,se,e,se,s,sw,w,sw,s,sw,se,s,se,s,sw,se,s,sw,se,s,se,se,sw,sw,sw";
	toTown.split(",").forEach(function (direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToWolvesFromTown(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toWolves = "ne,ne,ne,nw,nw,n,nw,ne,n,nw,ne,n,nw,n,nw,ne,n,ne,e,ne,n,nw,w,nw,w,sw,w";
	toWolves.split(",").forEach(function (direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");

}

function RunToTownFromVerdantBog(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toTown = "s,se,sw,s,sw,nw,n,n,nw,n,n,nw,n,n,n,nw,n,ne,n,ne,ne,n,n,ne,n,n,nw,w,nw,n,ne,n,n,n,n,ne,n,nw,w,nw,w,nw,w,n,nw,n,nw,n,nw,sw,n,nw,n,nw,ne,n,nw,n,n,n,nw,sw,sw,sw,w,w,nw,w,sw,sw,sw";
	toTown.split(",").forEach(function(direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToVerdantBogFromTown(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toTown = "s,se,sw,s,sw,nw,n,n,nw,n,n,nw,n,n,n,nw,n,ne,n,ne,ne,n,n,ne,n,n,nw,w,nw,n,ne,n,n,n,n,ne,n,nw,w,nw,w,nw,w,n,nw,n,nw,n,nw,sw,n,nw,n,nw,ne,n,nw,n,n,n,nw,sw,sw,sw,w,w,nw,w,sw,sw,sw";
	toTown.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToGreenmarshesFromSouthport(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toGreenmarshes = "w,w,w,w,w,w,w,w,w,w,w,w,w,w,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,nw,nw,nw,n,w,w,nw,nw,n,n,n,n,ne,n,ne,n,d,nw,n,e,ne,d,ne,ne,n,n,ne,n,ne,n,ne,se,e";
	toGreenmarshes.split(",").forEach(function(direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToSouthportFromGreenmarshes(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toGreenmarshes = "w,w,w,w,w,w,w,w,w,w,w,w,w,w,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,nw,nw,nw,n,w,w,nw,nw,n,n,n,n,ne,n,ne,n,d,nw,n,e,ne,d,ne,ne,n,n,ne,n,ne,n,ne,se,e";
	toGreenmarshes.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToGreenmarshesFromVerdantBog(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toGreenmarshes = "s,se,sw,s,sw,se,se,s,s,sw,sw,s,w,s,sw,w,sw,nw,w,sw,w,sw,w,nw,sw,w,nw,sw,w,nw,sw,s,sw,sw,s,sw,s,se,e";
	toGreenmarshes.split(",").forEach(function(direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");	
}

function RunToVerdantBogFromGreenmarshes(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toGreenmarshes = "s,se,sw,s,sw,se,se,s,s,sw,sw,s,w,s,sw,w,sw,nw,w,sw,w,sw,w,nw,sw,w,nw,sw,w,nw,sw,s,sw,sw,s,sw,s,se,e";
	toGreenmarshes.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToSivsFromGreenmarshes(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toSivs = "se,e,n,e,ne,se,se,sw,s,sw,w,sw,s,w,nw,w,nw,";
	toSivs.split(",").forEach(function(direction){
		MoveClick(direction);
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToGreenmarshesFromSivs(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toSivs = "se,e,n,e,ne,se,se,sw,s,sw,w,sw,s,w,nw,w,nw,";
	toSivs.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToSivsFromSouthport(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	RunToGreenmarshesFromSouthport();
	RunToSivsFromGreenmarshes();

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToSouthportFromSivs(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	RunToGreenmarshesFromSivs();
	RunToSouthportFromGreenmarshes();

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");	
}

function RunToSivsFromTown(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	RunToVerdantBogFromTown();
	RunToGreenmarshesFromVerdantBog();
	RunToSivsFromGreenmarshes();

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToSouthportFromTown(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	RunToVerdantBogFromTown();
	RunToGreenmarshesFromVerdantBog();
	RunToSouthportFromGreenmarshes();

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToTownFromSouthport(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	RunToGreenmarshesFromSouthport();
	RunToVerdantBogFromGreenmarshes();
	RunToTownFromVerdantBog();

	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToFordCrossingFromVerdantBog(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toCrossroads = "s,se,sw,s,sw,se,se,s,s"; 
	toCrossroads.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToTreasureFromFordCrossing(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toTreasure = "e,e,se,s,sw,s,s,sw,s,s,s,s,sw,s,se,se,e,se,e,se,se,e,se,ne,e,ne,n,se,e,ne,n,ne,n,ne,n,ne,n,d,e,se,se,d,e,e,e,e,e,n,e,n,d,se,e,e,d,n,w,s"; 
	toTreasure.split(",").forEach(function(direction){
		MoveClick(direction);
	});
	
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToFordCrossingFromTreasure(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toTreasure = "e,e,se,s,sw,s,s,sw,s,s,s,s,sw,s,se,se,e,se,e,se,se,e,se,ne,e,ne,n,se,e,ne,n,ne,n,ne,n,ne,n,d,e,se,se,d,e,e,e,e,e,n,e,n,d,se,e,e,d,n,w,s"; 
	toTreasure.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});
	
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

function RunToVerdantBogFromFordCrossing(){
	$('#chkEnableAI').prop( "checked", false );
	sendMessageDirect("DisableAI");

	var toCrossroads = "s,se,sw,s,sw,se,se,s,s"; 
	toCrossroads.split(",").reverse().forEach(function(direction){
		MoveClick(reverseDirection(direction));
	});
	
	$('#chkEnableAI').prop( "checked", true );
	sendMessageDirect("EnableAI");
}

    $("#mainScreen").dblclick(function() {
        $('#message').val("#menu"); // When the user doubleclick's the terminal screen the paths/commands menu is displayed.
        $("#message").trigger('input');
        
    });

 $(function () {
      $("#message").bind('input', function() {
			var UnformattedTrigger = ($("#message").val()); //Grabs Textbox Contents.
			var PathTriggerCmd = UnformattedTrigger.toLowerCase(); //Converts the text to lowercase and stores it in the variable "PathTriggerCmd"
		



		switch (PathTriggerCmd) { //Main Switch. This is where you will add the paths or other commands you can define by #triggers below.
	


	
	case '#menu': //Displays the list of commands in the main mud screen.
	
$('#message').val(""); //This clears the text box after your command is recognized.


$("#mainScreen").append("<br /><span style='color: orange'>******************************************************************************</span><br />");
$("#mainScreen").append("<span style='color: #EDAFDE'>Available Commands:</span><br /><br /><span style='color: #EDC9AF'>#Ford2Southport, #Southport2ford, #DeepwoodTrainer2SouthportTrainer, #SouthportTrainer2DeepwoodTrainer, #Trainer2Graveyard, #Graveyard2Trainer, #Trainer2Smithy, #Smithy2Trainer, #Trainer2Pit, #Pit2Trainer, #Tangle2Trainer, #Trainer2Tangle, #Dryad2Trainer, #Ford2SouthTrainer, #SouthTrainer2Ford, #Graveyard2Ford, #Ford2Graveyard, #SivRaiderLair2Ford, #Ford2SivRaiderLair, #Ford2ShrineStairwell, #ShrineStairwell2Ford, #Dice<br /></span>");
$("#mainScreen").append("<br /><span style='color: orange'>******************************************************************************</span><br /><br />");
sendMessageDirect("");			

			break; // End Of Menu Block

 
	case '#resetscript':
	
$('#message').val(""); //This clears the text box after your command is recognized.	
$('#hp').html('1%'); // Changes HP bar to 1% health to trigger refresh.
count = 1;
$("#mainScreen").append("<br /><br /><span style='color: yellow'>** RESETTING HEALTHBARS TO FIX AUTO COMBAT SCRIPT **</span><br />");
sendMessageDirect("rest");	
	
			break;
	
//	case '#items': 
// Item Counter Currently Disabled (For Future Use)	
//$("#mainScreen").append("<br /><br /><br /><span style='color: white'>******************************************************************************</span><br />");
//$("#mainScreen").append("<span style='color: #EDAFDE'>Collected a total of </span>" + NumItemsCollected + "<span> items.</span><br />");
//$("#mainScreen").append("<br /><span style='color: white'>******************************************************************************</span><br /><br />");
//sendMessageDirect("");		
//			break;
	
        case '#resetexpmeter':
			$('#ExpPerHour').trigger('dblclick'); //triggers exp reset doubleclick
			break;
		case '#town2wolves': 
			$('#message').val("");
			RunToWolvesFromTown();
			break;
		case '#shrinestairwell2ford': 
			$('#message').val("");
			RunToFordFromShrineStairwell();
			break;
		case '#ford2shrinestairwell': 
			$('#message').val("");
			RunToShrineStairwellFromFord();
			break;
		case '#wolves2town': 
			$('#message').val("");
			RunToTownFromWolves();
			break;
		case '#town2verdantbog': 
			$('#message').val("");
			RunToVerdantBogFromTown();
			break;
		case '#verdantbog2town': 
			$('#message').val("");
			RunToTownFromVerdantBog();
			break;
		case '#ford2southport': 
			$('#message').val("");
			RunToCenterOfSouthportFromFordCrossing();
			break;
		case '#southport2ford': 
			$('#message').val("");
			RunToFordCrossingFromCenterOfSouthport();
			break;	
	
	case '#trainer2smithy':  //Start this from the starting town trainer room
	
$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("w");
			
			break;

	case '#smithy2trainer':  //Start this from the smithy shop

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("e");
sendMessageDirect("s");
			
			break;		
	
	case '#pit2trainer': //Start this from the first room with monsters in the fighting pits 

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("u");
sendMessageDirect("s");
sendMessageDirect("s");			
			
			break;

	case '#ford2sivraiderlair': //Start from ford crossing		
$('#message').val(""); //This clears the text box after your command is recognized.			
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("w");


			break;
	
	case '#sivraiderlair2ford': //Starts in the siv raider room.
	
$('#message').val(""); //This clears the text box after your command is recognized.	
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");	

			break;

			
	case '#trainer2pit': //Start this from the starting town trainer room

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("d");	
			
			break;
	
	case '#tangle2trainer': //Start this from the lair room with a south exit in the tanglewood area.

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("u");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");	
			
			break;
			
	case '#trainer2tangle': //Start this from the starting town trainer room

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("d");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("nw");
sendMessageDirect("n");
			
			break;			
					
			
	case '#trainer2graveyard': //Start this from the starting town trainer room

$('#message').val(""); //This clears the text box after your command is recognized.

sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");

			break;
	
	case '#graveyard2trainer': //Start In The first room of the Overgrown Graveyard

$('#message').val(""); //This clears the text box after your command is recognized.

sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");

			break;
	
	case '#dice':
$('#message').val(""); //This clears the text box after your command is recognized.

var DiceRoll = Math.floor(Math.random() * 100) + 1;

sendMessageDirect("Big Money!, then quickly pulls a 100-sided die out of his pocket, and rolls a "+DiceRoll+".");

		break;


		
	case '#dryad2trainer': //Start from dark dryad boss room in Tanglewood

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("nw");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("s");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("nw");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("u");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
		
		break;
		
	case '#ford2southtrainer': //Start this from the natural ford crossing.

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("u");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("u");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");

		break;
		
		
	case '#southtrainer2ford': //Start this from the Southport trainer.

$('#message').val(""); //This clears the text box after your command is recognized.

sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("d");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("d");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");

				break;

	case '#ford2graveyard': //Start this from the Natural Ford Crossing in the river.

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");				
		
		break;

			case '#graveyard2ford': //Start this from the Overgrown Graveyard Entrance Room

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("se");

		break;


	case '#deepwoodtrainer2southporttrainer': //Start this from the starting town trainer room FULL RUN TO SouthportTrainer

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("u");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("u");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("e");
sendMessageDirect("s");

			break;		

	case '#southporttrainer2deepwoodtrainer': //Start this from the Southport trainer. LONG RUN

$('#message').val(""); //This clears the text box after your command is recognized.
sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("s");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("d");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("d");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("se");
sendMessageDirect("se");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("se");
sendMessageDirect("ne");
sendMessageDirect("e");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("e");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("nw");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("se");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("se");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("s");
sendMessageDirect("sw");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("ne");
sendMessageDirect("n");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("w");
sendMessageDirect("nw");
sendMessageDirect("w");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("sw");
sendMessageDirect("s");

			break;
			}
		 });
   });

 //////////////////////////////////////////////////  TIMED EVENTS   S E C T I O N   S T A R T
	
	
	
	function FixIntervals(){
var HealIntervalTemp = (parseInt($("#HealIntervalControl").val()));
var BuffIntervalTemp = (parseInt($("#BuffIntervalControl").val()));
var AutoCommandIntervalTemp =(parseInt($("#CommandIntervalControl").val()));
$('#HealIntervalControl').val(HealIntervalTemp); 
$('#BuffIntervalControl').val(BuffIntervalTemp); 
$('#CommandIntervalControl').val(AutoCommandIntervalTemp);
HealInterval=(1000 * HealIntervalTemp);
BuffInterval=(1000 * BuffIntervalTemp);
CmdInterval=(1000 * AutoCommandIntervalTemp);
}
	
    

	
	function HealingToggle(){
    IsHealingEnabled = document.getElementById('EnableHealing');
if (IsHealingEnabled.checked)  {
	$("#mainScreen").append("<span style='color: green'>** Healing Enabled **</span><br />");
	sendMessageDirect("");
	    
		}
								
else 	{
	$("#mainScreen").append("<span style='color: red'>** Healing Disabled **</span><br />");
	sendMessageDirect("");	
        }
}
	
	function BuffingToggle(){
    IsBuffingEnabled = document.getElementById('EnableBuffing');
if (IsBuffingEnabled.checked)   {
	    $("#mainScreen").append("<span style='color: yellow'>** Buffing Enabled **</span><br />");
		sendMessageDirect("");
		
		}
								
else 	{
	$("#mainScreen").append("<span style='color: red'>** Buffing Disabled **</span><br />");
		sendMessageDirect("");	
        }
}

function CastBuff() {
  
	
    // work out current frame number
    var BuffNow = new Date().getTime();
    var BuffFrame = Math.floor(BuffNow / BuffInterval) % 2; // 0 or 1

    // do your stuff here
	
	IsBuffingEnabled = document.getElementById('EnableBuffing');
    if (IsBuffingEnabled.checked)   {
	var BuffSpell = ($("#BuffSpell").val()); //Grabs Textbox Contents.
	sendMessageDirect (BuffSpell); //Casts the BuffSpell
	sendMessageDirect("");
	}	
	
	$('#BuffFrame').text(BuffFrame);

    // retrigger
    var BuffMS = new Date().getTime() % BuffInterval;
    setTimeout(CastBuff, BuffInterval - BuffMS);
    
	}
	
	
	function PerformAutoCommands() {
  
	
    // work out current frame number
    var CmdNow = new Date().getTime();
    var CmdFrame = Math.floor(CmdNow / CmdInterval) % 2; // 0 or 1

    // do your stuff here
	
	IsAutoCommandEnabled = document.getElementById('EnableAutoCommand');
    if (IsAutoCommandEnabled.checked)   {
	  // Pre Rest Commands
		 AutoCommandString=($("#AutoCommand").val());//Gets Autocommand TextBox
		 AutoCommandString.split(",").forEach(function(AutoCommandsToExecute){
		 MoveClick(AutoCommandsToExecute);	  
		 sendMessageDirect("");
		 });
		 //End Pre Rest Commands	}	
	}
	$('#CmdFrame').text(CmdFrame);

    // retrigger
    var CmdMS = new Date().getTime() % CmdInterval;
    setTimeout(PerformAutoCommands, CmdInterval - CmdMS);
    
	}
	


function CastHeal() {
  
   
    // work out current frame number
    updateHPMABars();
	var HealNow = new Date().getTime();
    var HealFrame = Math.floor(HealNow / HealInterval) % 2; // 0 or 1
	
	//Setup Heal Spell Below
   	
    IsHealingEnabled = document.getElementById('EnableHealing');
    if (IsHealingEnabled.checked)   {
		
		if(String($("#hp").text()).split('%')[0] <= HealBelowPercent) {
			
		
			if (String($("#ma").text()).split('%')[0] >= HealManaPercent)  {
				
				var HealSpell = ($("#HealSpell").val()); //Grabs HealSpell Textbox Contents.
				sendMessageDirect(HealSpell); //Casts the Heal Spell
				sendMessageDirect("");
		}
			}
	}
	
	//End Heal Spell Block
	
	$('#HealFrame').text(HealFrame);

    // retrigger
    var HealMS = new Date().getTime() % HealInterval;
    setTimeout(CastHeal, HealInterval - HealMS);
    }
	
	
	
/////////////////////////////////////////  E N D    TIMED EVENTS SECTION

// Modified simple move and rest when needed script. Changed to use custom inputs from custom controls to make the settings dynamic and per/user.

var count = 0;


$('#hp').bind("DOMSubtreeModified",function(){
   if(String($("#hp").text()).split('%')[0] <= RestMinPercent){
      var IsScriptingEnabled = document.getElementById('EnableScripting');
	  if(resting == false && count == 1 && (IsScriptingEnabled.checked)) {  
          ScriptRunDirection.split(",").forEach(function(Directions){
		MoveClick(Directions);
	});
		  
		  // Pre Rest Commands
		  PreRestCmd.split(",").forEach(function(PreRestCommands){
		 MoveClick(PreRestCommands);	  
		 });
		 //End Pre Rest Commands
		 
		  sendMessageDirect("rest");
		  count -= 1;
		 	
	  }

  }
  else if(String($("#hp").text()).split("%")[0] >= RestMaxPercent){
        var IsScriptingEnabled = document.getElementById('EnableScripting');
		if(count == 0 && (IsScriptingEnabled.checked)) {
            
			
			// Post Rest Commands
		  PostRestCmd.split(",").forEach(function(PostRestCommands){
		 MoveClick(PostRestCommands);	  
		 });
		 //End Post Rest Commands

			
			
			ScriptRunDirection.split(",").reverse().forEach(function(ReturnDirections){
			MoveClick(reverseDirection(ReturnDirections));
	});
			count += 1;
      }
  }
});
