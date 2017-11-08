function AttachListeners(){
	var inputs = document.getElementsByTagName("input");
	var areas = document.getElementsByTagName("textarea");
	for(var i=0; i < inputs.length; i++)
	{
		inputs[i].addEventListener("change", UpdateDLLink);
	}
	
	for(var i=0; i < areas.length; i++)
	{
		areas[i].addEventListener("change", UpdateDLLink);
	}
	
}

function LoadFile(){
	loadbox=document.getElementById('inputfile');
	var file=loadbox.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.onloadend = function(e) {
		var contents = JSON.parse(e.target.result);
		for (const [ key, value ] of Object.entries(contents)) {
			thing = document.getElementById(key);
			if(thing.type && thing.type == 'checkbox' && value == true)
				thing.checked = true;
			else
				thing.value=value;
		}
	};
	reader.readAsText(file);
}

function UpdateDLLink(){
	var cjson = {};
	var charname = document.getElementById("Charname").value;
	var charvars = document.querySelectorAll("input[type=text]");
	var longvars = document.getElementsByTagName("textarea");
	var boolvars = document.querySelectorAll("input[type=checkbox]");
	
	for(var i=0; i < charvars.length; i++)
	{
		cjson[charvars[i].id]=charvars[i].value;
	}
	
	for(var i=0; i < longvars.length; i++)
	{
		cjson[longvars[i].id]=longvars[i].value;
	}
	
	for(var i=0; i < boolvars.length; i++)
	{
		if(boolvars[i].checked)
		{
			cjson[boolvars[i].id]=true;
		}
	}
	
	var cstring=JSON.stringify(cjson);
	var charblob = new Blob([cstring], {type: "application/json"});
	var url = URL.createObjectURL(charblob);
	
	var a = document.createElement('a');
	a.download    = charname+".json";
	a.href        = url;
	a.textContent = "Export";
		
	document.getElementById('DownloadLink').innerHTML=""
	document.getElementById('DownloadLink').appendChild(a);
}
