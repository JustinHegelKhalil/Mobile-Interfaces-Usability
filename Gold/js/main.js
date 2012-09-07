var parseFormData = function(data){
	//console.log(data);

};

var resetForm = function($form) {
    $form.find('input:text, input:password, input:file, select, textarea, option').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}

var storer = function(id ,name, model, job, mission, experience, date){
	var data = ("[name:"+name+"] [Model:"+model+"] [Job:"+job+"] [Mission:"+mission+"] [Experience:"+experience+"] [Date:"+date+"]");

	localStorage.setItem(id, data);
	//console.log(JSON.stringify(json));
}

var displayPeople = function(){
	//alert("displayPeople has been clicked");
	//check Localstorage for stuff.
	if (localStorage.length <= 1) {
		alert("localStorage is empty");
		for (var key in json) {
			//var id = Math.floor(Math.random()*10000000000);
			var m = json[key]['date'][0];
			var d = json[key]['date'][1];
			var y = json[key]['date'][2];
			var date = (m+"-"+d+"-"+y);
			var m = m *= 100000;
			var d = d *= 1000;
			var y = y *= 1000000000;
			var name = json[key]['name'][1];
			var model = json[key]['model'][1];
			var job = json[key]['job'][1];
			var mission = json[key]['mission'][1];
			var experience = json[key]['experience'][1];
			var id = (m += d +=y + name);
			//console.log(d);
			//console.log(json[key]['date'][0]);

			storer(id, name, model, job, mission, experience, date);
			//localStorage.setItem(id, JSON.stringify(json[key]));
		}
	}
	// take items from LOCALSTORAGE 
	// create listing for each person, assign each class "listItem"
	// 
	var members = $('#members');
	$('#members').empty('.itemsListed');
	for (var n in localStorage){
		if (localStorage[n].length > 30){
			var member = localStorage[n];
	members.append("<div id="+n+" class='itemsListed'>"+localStorage[n]+"</div>");
	$(".member:last").addClass("itemsListed");
	members.append("<br/>");}

	}

}	

var addPeople = function(){
	alert("addPeople has been clicked");
	
}	

var displayProject = function(){
	alert("viewProject has been clicked");
}


var submitAsset = function(){
resetForm($('#assetAdder'));
alert("asset has been added");
}

$('#checkPeople').click(displayPeople);
$('#addPeople').click(addPeople);
$('#viewProject').click(displayProject);



$(document).bind("pageinit", function() {

	if (localStorage.length <= 1){
		//$('#members').loadJSON(json.js);
	}

	var assetAdder = $('#assetAdder');
	var memberFormErrors = $('#memberFormErrors')

assetAdder.validate({
	invalidHandler: function(form, validator){
		var html = "";
		if (pageupdate === true){
			$('#errorDialog').empty(html);
			$('#errorDialog ul').html("ul");	
			var pageupdate = false;
		}
		
		memberFormErrors.click();
		for (var key in validator.submitted) {
			var label = $('label[for^="' + key + '"]').not('[generated]');
			console.log(label.text());
			console.log($('label[for^="' + key + '"]'));
			var lineInsert = label.text();
			html = (html += '<li>'+ lineInsert + ' Required Field.</li>');
			console.log(lineInsert);
			$('#errorDialog ul').html(html);
			var pageupdate = true;


		
		
		

	}

	},
	submitHandler: function(){
		var date = $('#date').datepicker( "getDate" );
		//var data = assetAdder.serializeArray();
		//data.join(',');
		// datepicker is stupid, and I've already got a bunch of plugins 
		//active, so I'll settle for this inelegant solution to the stupid 
		//extraneous data given by datepicker.
		//data = JSON.stringify(data);
		date = JSON.stringify(date);
		var model = $('#model').val();
		var job = $('#job').val();
		var mission = $('#mission').val();
		var experience = $('#experience').val();
		var name = $('#name').val();
		date.split('-');
		var y1 = date[1];
		var y2 = date[2];
		var y3 = date[3];
		var y4 = date[4];
		var year = (y1+y2+y3+y4);
		//console.log(year);
		var m1 = date[6];
		var m2 = date[7];
		var month = (m1+m2);
		//console.log(month);
		var d1 = date[9];
		var d2 = date[10];
		var day = (d1+d2);
		//console.log(day);
		//console.log(name+model+mission+job);
		parseFormData(data);
		var date = (month+"-"+day+"-"+year);
		
		var m = parseInt(month);
		var d = parseInt(day);
		var y = parseInt(year);
		var m = m *= 100000;
		var d = d *= 1000;
		var y = y *= 1000000000;
		
		var id = (m+d+y+name);
		var data = ("name:"+name+"Model:"+model+"Job:"+job+"Mission:"+mission+"Experience:"+experience+"Date:"+date);
		storer(id, name, model, job, mission, experience, date);
		submitAsset();
	},
});



//initialisation common to all pages
$("#date").datepicker(); 
$.getJSON('js/json.js', function(data) {
$('#resources').data(data);

});
});
