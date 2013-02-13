var $currTime = 0;
var $displayStartTime = 0;
var $displayStopTime = 0;

var $temp_customer_selected_id = 1;
var $temp_customer_selected_name = 'Kunde';
var $temp_project_selected_id = 1;
var $temp_project_selected_name = 'Projekt';
var $temp_activity_selected_id = 1;
var $temp_activity_selected_name = 'Tätigkeit';

var $temp_customer_single_view_selected_id = 0;
var $temp_customer_single_view_selected_name = '';
var $temp_project_single_view_selected_id = 0;
var $temp_project_single_view_selected_name = '';
var $temp_activity_single_view_selected_id = 0;
var $temp_activity_single_view_selected_name = '';


var $globalSingleViewID = 0;

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

$(document).ready(function() {
	global_timecaptain.init.open();
	global_timecaptain.init.createTable();
	global_timecaptain.init.buildSelectMenu('customers','#select_customer_page_1', 0);
	global_timecaptain.init.buildSelectMenu('projects','#select_project_page_1', 0);
	global_timecaptain.init.buildSelectMenu('activities','#select_activity_page_1', 0);
	global_timecaptain.tools.getAndShowAllRecords();
	
	//$('#start_stop_button').tappable(function() { })
	$.mobile.buttonMarkup.hoverDelay = 0;

	
	//$(function () {$('#test_select').mobiscroll().select({theme: 'ios', lang: 'de', display: 'bubble', mode: 'scroller', inputClass: ' ui-btn-inner ui-btn-corner-all ui-btn-right ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a ui-btn-hover-a ', width: 200 });});
	
	/*$(function(){
	    $('#select_customer_page_1').mobiscroll().select({
			preset:'select',
	        theme: 'ios',
	        lang: 'de',
			label: 'Kunde', 
	        display: 'bubble',
	        mode: 'scroller',
			inputClass: 'ui-btn ui-btn-up-c ui-shadow  ui-btn-inner mobiscroll_selector_width',
	        width: 200
	    });
	});*/
	
	
	
	/*var str = "01.01.2010";
	var dmy = str.split(".");
	var day = dmy[0];
	var month = dmy[1];
	var year = dmy[2];	
	var str = "11:59";
	var mh = str.split(":");
	var minutes = mh[1];
	var hour = mh[0]  - 1;	
	var d = Date.parse(year + '-' + month + '-' + day + 'T' + hour + ':' + minutes);
	alert(d);	
	alert(global_timecaptain.tools.getTimeView(d,2));
	*/	
	//alert(' Minute: ' + minute + ' Stunde: ' + hour + ' Tag: ' + day + ' Monat: ' + month + ' Jahr :' + year)
	//var d = new Date(dmy[2], dmy[1] - 1, dmy[0]);
	

	
	

	$("a[href=#page_3]").live("click", function(e) {
		$globalSingleViewID = $(this).data("single_view_id");   
	});

	$('#clock').simpleClock();
	$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 99" data-direction="up" ></span>').trigger('create');
	$('.counter').counter();
	
	$('#start_stop_button').on('click',function(){
		if ($temp_customer_selected_id == 0) {alert('Bitte wählen Sie einen Kunden aus.');}
		else if ($temp_project_selected_id == 0) {alert('Bitte wählen Sie ein Projekt aus.');}		
		else if ($temp_activity_selected_id == 0) {alert('Bitte wählen Sie eine Tätigkeit aus.');} else {
			if($displayStartTime == 0) {
				$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 59" data-direction="up" ></span>').trigger('create');
				$('.counter').counter();
				$currTime = new Date();
				$displayStartTime = $currTime.getTime();
				$("#start_stop_button .ui-btn-text").html('Stop');
				//$('#start_stop_button').attr('data-theme', 'b').removeClass('ui-body-a').addClass('ui-body-b').trigger('create');
				$('#start_stop_button').addClass('ui-btn-active').trigger('create');

			} else {
				$currTime = new Date();
				$displayStopTime = $currTime.getTime();
				//theBigDay = new Date("10:12:33")
				//alert(theBigDay)
				global_timecaptain.tools.addRecord($displayStartTime, $displayStopTime);
				
				$("#start_stop_button .ui-btn-text").html('Start');
				$('#start_stop_button').removeClass('ui-btn-active').trigger('create');
				$displayStartTime = 0;
				global_timecaptain.tools.getAndShowAllRecords(); 
			}	
		}			
	});

		
	// onClick deleteEvent Handler
	//$('#delete').live("click",function(){
	//	var id = $(this).closest('li').find('#this_id').val();
	//	global_timecaptain.tools.deleteRecord(id);
	//	global_timecaptain.tools.getAllRecords()
	//});
	
	
	$('#delete_all_button').on('click',function(){
		global_timecaptain.tools.deleteAllRecords();	
		$('#list_off_all_records').html('');
	});

	// Auswahl der Listen Kunde, Projekt und Tätigkeit
	$("#select_customer_page_1").change(function() {
		$temp_customer_selected_id = $(this).val();	

		var database_customer_name = global_timecaptain.init.db;
		database_customer_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM customers WHERE ID=?", [$temp_customer_selected_id], function(tx,result){
				$temp_customer_selected_name = result.rows.item(0).name;	
			});
		});
		
	});
						
	$("#select_project_page_1").change(function() {
		$temp_project_selected_id = $(this).val();
		
		var database_project_name = global_timecaptain.init.db;
		database_project_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM projects WHERE ID=?", [$temp_project_selected_id], function(tx,result){
				$temp_project_selected_name = result.rows.item(0).name;	
						//alert($temp_project_selected_name);
			});
		});
		
	});
				
	$("#select_activity_page_1").change(function() {
		$temp_activity_selected_id = $(this).val();
		
		var database_activity_name = global_timecaptain.init.db;
		database_activity_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM activities WHERE ID=?", [$temp_activity_selected_id], function(tx,result){
				$temp_activity_selected_name = result.rows.item(0).name;	
						//alert($temp_activity_selected_name);
			});
		});
		
	});
	
	$("#select_customer_single_view").change(function() {
		$temp_customer_single_view_selected_id = $(this).val();	

		var database_customer_single_view_name = global_timecaptain.init.db;
		database_customer_single_view_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM customers WHERE ID=?", [$temp_customer_single_view_selected_id], function(tx,result){
				$temp_customer_single_view_selected_name = result.rows.item(0).name;	
			});
		});
		
	});
						
	$("#select_project_single_view").change(function() {
		$temp_project_single_view_selected_id = $(this).val();
		
		var database_project_single_view_name = global_timecaptain.init.db;
		database_project_single_view_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM projects WHERE ID=?", [$temp_project_single_view_selected_id], function(tx,result){
				$temp_project_single_view_selected_name = result.rows.item(0).name;	
						//alert($temp_project_selected_name);
			});
		});
		
	});
				
	$("#select_activity_single_view").change(function() {
		$temp_activity_single_view_selected_id = $(this).val();
		
		var database_activity_single_view_name = global_timecaptain.init.db;
		database_activity_single_view_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM activities WHERE ID=?", [$temp_activity_single_view_selected_id], function(tx,result){
				$temp_activity_single_view_selected_name = result.rows.item(0).name;	
						//alert($temp_activity_selected_name);
			});
		});
		
	});
	
	
	
	
	
	
	
	
		
});


$( '#page_3' ).live( 'pagebeforeshow',function(event, ui){	
	//alert('Hallo');
	$('a[href=#page_3]').unbind();
	$('a[href=#page_4]').unbind();
	global_timecaptain.tools.showSingleRecord(); 
});





