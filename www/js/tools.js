// tools.js
// Hier stehen Funktionen die während der Runtime benötigt werden.
// Aufgerufen werden diese von main.js
// global_timecaptain.tools.getAllRecords
// global_timecaptain.tools.addRecord
// global_timecaptain.tools.deleteRecord
// global_timecaptain.tools.deleteAllRecords


global_timecaptain.tools = {}



	
// FUNCTION GET AND SHOW ALL RECORDS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get all records from the database and bulid the listview	
//var $temp_message = '';
global_timecaptain.tools.getAndShowAllRecords = function($temp_message){
	$('#list_off_all_records').html('');
	//alert($temp_message);
	var database = global_timecaptain.init.db;	
	database.transaction(function(tx){
		tx.executeSql("SELECT * FROM records", [], function(tx,result){
			//alert('Anzahl: ' + result.rows.length);
			for (var i=0; i < result.rows.length; i++) {							
				var temp_id = result.rows.item(i).ID;
				var temp_start_time = result.rows.item(i).start_time;
				var temp_stop_time = result.rows.item(i).stop_time;
				var temp_customer = result.rows.item(i).customer;
				var temp_customer_name = result.rows.item(i).customer_name;
				var temp_project = result.rows.item(i).project;
				var temp_project_name = result.rows.item(i).project_name;
				var temp_activity = result.rows.item(i).activity;
				var temp_activity_name = result.rows.item(i).activity_name;
				
				temp_view_start_time = global_timecaptain.tools.getTimeView(temp_start_time,1);
				temp_view_stop_time = global_timecaptain.tools.getTimeView(temp_stop_time,2);
				//alert(temp_id);
				$('#list_off_all_records').append(
					'<li><a style="font-size: 12px !important; font-weight: normal !important;" data-icon="arrow-r" data-iconpos="right" data-transition="none" href="#page_3" data-single_view_id="' + temp_id + '">' +
					'<b>Start:</b> ' + temp_view_start_time + ' ' +
					'<b>Stop:</b> ' + temp_view_stop_time + '<br>' +
					'<b>Kunde:</b> ' + temp_customer_name  + '<br>' +
					'<b>Projekt:</b> ' + temp_project_name + '<br> ' +
					'<b>Tätigkeit:</b>' + temp_activity_name + ' ' +
					'</a></li>');	
			}
			$('#list_off_all_records').listview('refresh');
		});
	});
}
	

// FUNCTION ADD RECORD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// adding record
// $displayStartTime, $displayStopTime, $Test_Customer, $Test_Project, $Test_Function
	global_timecaptain.tools.addRecord = function(temp_start_time, temp_stop_time){		
		//alert('addRecord');
		
		
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO records (start_time,stop_time,customer,customer_name,project,project_name,activity,activity_name) VALUES (?,?,?,?,?,?,?,?)", [temp_start_time,temp_stop_time,$temp_customer_selected_id,$temp_customer_selected_name,$temp_project_selected_id,$temp_project_selected_name,$temp_activity_selected_id,$temp_activity_selected_name]);
			//tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES ('55','66','77','88','99')", []);
			//alert('addRecord');
		});
		
		
		/*var temp_view_start_time = global_timecaptain.tools.getTimeView(temp_start_time);
		var temp_view_stop_time = global_timecaptain.tools.getTimeView(temp_stop_time);
		
		 	$('#list_off_all_records').append(
				'<li><a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="flip" href="#page_2" data-single_view_id="' + temp_id + '">' +
				'Start: ' + temp_view_start_time + ' ' +
				'Stop: ' + temp_view_stop_time + '<br>' +
				'Kunde: ' + $temp_customer_selected_name  + ' ' +
				'Projekt: ' + $temp_project_selected_name + ' ' +
				'Tätigkeit: ' + $temp_activity_selected_name + ' ' +
				'</a></li>');
		$('#list_off_all_records').delay(0).listview('refresh');*/
		
	}
// FUNCTION ADD RECORD END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION SAVE EDITED RECORD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// save record after editing in SingleView
	global_timecaptain.tools.saveRecord = function(){		
		//alert('addRecord');
		
		
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO records (start_time,stop_time,customer,customer_name,project,project_name,activity,activity_name) VALUES (?,?,?,?,?,?,?,?)", [temp_start_time,temp_stop_time,$temp_customer_selected_id,$temp_customer_selected_name,$temp_project_selected_id,$temp_project_selected_name,$temp_activity_selected_id,$temp_activity_selected_name]);
			//tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES ('55','66','77','88','99')", []);
			alert('saveRecord');
		});

		
	}
// FUNCTION SAVE EDITED RECORD END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		
		
// FUNCTION DELETE SINGLE RECORD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// deleting a record 
	global_timecaptain.tools.deleteRecord = function(id){
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("DELETE FROM records WHERE ID=?",[id]);
		});
	}
// FUNCTION DELETE SINGLE RECORD END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	
// FUNCTION DELETE ALL RECORDS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// deleting all records
	global_timecaptain.tools.deleteAllRecords = function(){
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			//tx.executeSql("DROP TABLE IF EXISTS records", []);
			tx.executeSql("DELETE FROM records", []);			
		});
	}
// FUNCTION DELETE ALL RECORDS END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION GET TIME VIEWS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// generate a normal view of the time entries in seconds since 1070
	global_timecaptain.tools.getTimeView = function(temp_time,temp_time_day_flag){	

									
					var newTime = new Date(temp_time);
					var temp_view_month = newTime.getMonth() + 1;
					if (temp_view_month < 10) {temp_view_month = '0' + temp_view_month}
					var temp_view_day = newTime.getDate();
					if (temp_view_day < 10) {temp_view_day = '0' + temp_view_day}					
					var temp_view_year = newTime.getFullYear();
					var temp_view_hours = newTime.getHours();
					if (temp_view_hours < 10) {temp_view_hours = '0' + temp_view_hours}
					var temp_view_minutes = newTime.getMinutes();
					if (temp_view_minutes < 10) {temp_view_minutes = '0' + temp_view_minutes}
					var temp_view_seconds = newTime.getSeconds();
					if (temp_view_seconds < 10) {temp_view_seconds = '0' + temp_view_seconds}

					if (temp_time_day_flag == 1) {
						var temp_view_time = temp_view_hours + ':' + temp_view_minutes + ':' + temp_view_seconds;					
						return temp_view_time;
					} else {
						var temp_view_day = temp_view_day + '.' + temp_view_month + '.' + temp_view_year;					
						return temp_view_day;
					}

	}
// FUNCTION GET TIME VIEWS END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// FUNCTION SHOW SINGLE RECORD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// show a single record
global_timecaptain.tools.showSingleRecord = function(){

	//alert('call showSingleRecord!!')
	$('#single_view').html('');
	
	var database = global_timecaptain.init.db;
	database.transaction(function(tx){
		tx.executeSql("SELECT * FROM records WHERE id=?", [$globalSingleViewID], function(tx,result){
			for (var i=0; i < result.rows.length; i++) {
				var temp_id = result.rows.item(i).ID;
				var temp_start_time = result.rows.item(i).start_time;
				var temp_stop_time = result.rows.item(i).stop_time;
				var temp_customer = result.rows.item(i).customer;
				var temp_customer_name = result.rows.item(i).customer_name;
				var temp_project = result.rows.item(i).project;
				var temp_project_name = result.rows.item(i).project_name;
				var temp_activity = result.rows.item(i).activity;
				var temp_activity_name = result.rows.item(i).activity_name;
				
				var temp_view_start_time = global_timecaptain.tools.getTimeView(temp_start_time,1);
				var temp_view_start_day = global_timecaptain.tools.getTimeView(temp_start_time,2);

				var temp_view_stop_time = global_timecaptain.tools.getTimeView(temp_stop_time,1);
				var temp_view_stop_day = global_timecaptain.tools.getTimeView(temp_stop_time,2);
				
				$temp_customer_single_view_selected_id = temp_customer;
				$temp_customer_single_view_selected_name = temp_customer_name;
				$temp_project_single_view_selected_id = temp_project;
				$temp_project_single_view_selected_name = temp_project_name;
				$temp_activity_single_view_selected_id = temp_activity;
				$temp_activity_single_view_selected_name = temp_activity_name;
								
				$('#single_view').append(
					'<div style="font-size: 20px;">' +
					'<form id="start_stop_time">' +
					'<table>' +
					'<tr><td><b>Start:</b>&nbsp;</td>' +
					'<td><input type="text" name="start_time" style="width: 100px !important;" id="start_time" value="' + temp_view_start_time + '&nbsp;&nbsp;"/></td>' +
					'<td><input type="text" name="start_day" style="width: 100px !important;" id="start_day"  value="' + temp_view_start_day + '"/></td></tr>' +
					'<tr><td><b>Stop:</b>&nbsp;</td>' +
					'<td><input type="text" name="stop_time" style="width: 100px !important;" id="stop_time" value="' + temp_view_stop_time + '&nbsp;&nbsp;"/></td>' +
					'<td><input type="text" name="stop_day" style="width: 100px !important;" id="stop_day"  value="' + temp_view_stop_day + '"/></td></tr>' +
					'</table>' +
					'</form>'
					//<b>Start:</b> ' + temp_view_start_time + '<br>' +					
					//'<input name="demo" id="demo" class="i-txt" />' +				
					//'<b>Stop:</b> ' + temp_view_stop_time + '<br>' +
					//'<b>Kunde:</b> ' + temp_customer_name  + ' ' +
					//'<b>Projekt:</b> ' + temp_project_name + '</div>'
					);
				
					
				$(function(){$('#start_time').mobiscroll().time({theme: 'ios', lang: 'de', display: 'bubble', mode: 'scroller', timeFormat: 'hh:ii:ss', timeWheels: 'hhiiss' });});
				$(function(){$('#start_day').mobiscroll().date({theme: 'ios', lang: 'de', display: 'bubble', mode: 'scroller', dateOrder: 'DMM ddyy', endYear: '2020'});});
				
				$(function(){$('#stop_time').mobiscroll().time({theme: 'ios', lang: 'de', display: 'bubble', mode: 'scroller', timeFormat: 'hh:ii:ss', timeWheels: 'hhiiss',});});	
				$(function(){$('#stop_day').mobiscroll().date({theme: 'ios', lang: 'de', display: 'bubble', mode: 'scroller', dateOrder: 'DMM ddyy', endYear: '2020'});});
				
				$('#single_view').trigger('create');

				global_timecaptain.init.buildSelectMenu('customers','#select_customer_single_view', temp_customer);
				global_timecaptain.init.buildSelectMenu('projects','#select_project_single_view', temp_project);
				global_timecaptain.init.buildSelectMenu('activities','#select_activity_single_view', temp_activity);	

			}
			

		});
		

		

		
			
	});
		
		
		
		//$('#single_view').append('<a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="flip" href="#page_4" data-edit_id="' + $globalSingleViewID + ' data-edit_name="' + temp_name +'">Ändern</a><br>');

		//$('#single_view').append('<a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="flip" href="#page_4">Ändern</a><br>');
		//$('#single_view').trigger('create');

		$('a[href=#page_4]').unbind();
		$("a[href=#page_4]").bind("click", function(e) {	
			//alert('call showEditRecord!!')
			global_timecaptain.tools.showEditRecord(temp_name);              
		});	
		
		

 
 
	
}
// FUNCTION SHOW SINGLE RECORD END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





		

/*global_timecaptain.tools.showEditRecord = function(temp_edit_name){

	$('#edit_form').html('');
	$('#edit_form').append(
		'<input type="text" id="id" value="' + $globalSingleViewID + '"</>' +
		'<input type="text" id="name" value="' + temp_edit_name + '"</>' +
		'<input type="submit" id="save_record" value="Sichern" class="button"/>'
	);

	$('#save_record').unbind();
	$('#save_record').bind("click", function(e) {
		global_timecaptain.tools.saveRecord();
		//alert('call saveRecord!!')
		});
	$('#edit_form').trigger('create');
}*/


/*global_timecaptain.tools.saveRecord = function(){
	 
	var temp_save_id = $('#id').val();
	var temp_save_name = $('#name').val();

	var database = timecaptain.init.db;	
	database.transaction(function(tx){		

		tx.executeSql("UPDATE customers set ID=?, customer_name=? where ID=?;", [ temp_save_id, temp_save_name, $globalSingleViewID ]);
		
		$globalSingleViewID = temp_save_id;
		//alert($globalSingleViewID);
	});*/














// TOOL FUNCTIONS END //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





