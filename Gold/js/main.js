var parseFormData = function(data){
	//console.log(data);

};

var resetForm = function($form) {
    //$('#assetAdder').find('input:text, inoption').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}

var storer = function(id ,name, model, job, mission, experience, date){
	var data = {}
		data['name'] = ["name", name];
		data['model'] = ["model", model]; 
		data['job'] = ["job", job];
		data['mission'] = ["mission", mission]; 
		data['experience'] = ["experience", experience]; 
		data['date'] = ["date", date];

	localStorage.setItem(id, JSON.stringify(data));
	//console.log(JSON.stringify(json));
}

//var storer = function(id ,name, model, job, mission, experience, date){
//	var data = ("[name:"+name+"] [Model:"+model+"] [Job:"+job+"] [Mission:"+mission+"] [Experience:"+experience+"] [Date:"+date+"]");
//
//	localStorage.setItem(id, data);
//}

var loadDefaultData = function(){
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

var displayPeople = function(){
	//alert("displayPeople has been clicked");
	//check Localstorage for stuff.
	if (localStorage.length <= 1) {
		loadDefaultData();
		alert("localStorage is empty");
		
	}
	// take items from LOCALSTORAGE 
	// create listing for each person, assign each class "listItem"
	// 
	var members = $('#members');
	$('#members').empty('.itemsListed');
	for (var n in localStorage){
		if (localStorage[n].length > 40){
			var thing = localStorage.getItem(n);
			var value = JSON.parse(thing);
			var formStart = ("<div id='"+n+"'>");
			var formEnd = ("</div>");
			//var name = thing['name'][1];
	members.append(formStart);
	var name = value['name'][1];
	var formLineName = ('<label for="name" id="label" style="font-size:small">Name:</label><input type="text" value="'+name+'" data-mini="true" class="required" name="name" id="name" data-mini="true" style="display:block;width:90%"/>');
	var model = value['model'][1];
	var formLineModel = ('<div data-role="fieldcontain"><label for="model" data-mini="true">Role Model:</label><select id="model" name="model" data-mini="true" class="required validate" data-native-menu="true"><option data-placeholder="true" value="'+model+'">Asset\'s current role-model is '+model+'</option><option value="Lean">David Lean</option><option value="Hitchcock">Alfred Hitchcock</option><option value="Welles">Orson Welles</option><option value="Lucas">George Lucas</option><option value="Wilder">Billy Wilder</option><option value="Leone">Sergio Leone</option><option value="Spielberg">Steven Spielberg</option><option value="Akira">Akira Kurasawa</option><option value="Disney">Walt Disney</option><option value="Kubrick">Stanley Kubrick</option></select></div>');
	var job = value['job'][1];
	var formLineJob = ('<div data-role="fieldcontain"><label for="job" data-mini="true">Asset\'s Job:</label><select id="job" name="job" data-mini="true" class="required validate" data-native-menu="true"><option data-placeholder="true" value="'+job+'">Asset\'s current job is '+job+'.</option><option value="Director">Director</option><option value="Writer">Writer</option><option value="Photographer">Photographer</option><option value="Producer">Producer</option><option value="Editor">Editor</option><option value="Composer">Composer</option><option value="Artist">Artist</option></select></div>');
	var experience = value['experience'][1];
	members.append(formLineName);
	members.append(formLineModel);
	members.append(formLineJob);

	members.append(formEnd);	

	//members.append("<div id='"+n+"'</div>");
	//members.append("<div class='itemsListed' data-role='button' data-mini='true'>"+localStorage[n]+"</div>");
	//$(".member:last").addClass("itemsListed");
	//$("#"+n).attr('data-role="button"');
	//$("#members").wrap('data-role="button"');
	// Procedure, identify and assign values to each form field.
	// one variable per item, which is then assigned to the value of the default form field options.
	// submit button not a typical form field submit button. It's a jquery "click" function, which simply 
	// sets the item in localstorage with the values input with the date and names-based key, and deletes
	// the item with the original key if the new key is different from the original.
	members.append("<br/>");

}
	

	}

}	



var addPeople = function(){
	alert("addPeople has been clicked");
	
}	

var displayProject = function(){
	alert("viewProject has been clicked");
}


var submitAsset = function(){
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
		var month = (m1+''+m2);
		//console.log(month);
		var d1 = date[9];
		var d2 = date[10];
		var day = (d1+''+d2);
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
		
		var id = (m += d += y + name);
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
