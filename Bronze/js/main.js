var parseFormData = function(data){
	console.log(data);
};

$(document).bind("pageinit", function() {

	if (localStorage.length <= 1){
		$('#members').loadJSON(json.js);
	}

	var assetAdder = $('#assetAdder');

assetAdder.validate({
	invalidHandler: function(form, validator){},
	submitHandler: function(){
		var data = assetAdder.serializeArray();
		parseFormData(data);
		var id = Math.floor(Math.random()*10000000000);
		localStorage.setItem(id, JSON.stringify(data));
	}
});



//initialisation common to all pages
$("#date").datepicker(); 
$.getJSON('js/json.js', function(data) {
$('#resources').data(data);

});
});