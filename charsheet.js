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

function ModCapacity(boxnumber)
{
	var boxname = "AmmoCapacity" + boxnumber;
	var capacity = document.getElementById(boxname).value;
	
	if(isNaN(capacity))
		capacity = 20;
	
	for (var i=1; i <= 100; i++)
	{
		box = document.getElementById("AmmoUsed"+boxnumber+"_"+i+"o");
		if(i <= capacity)
			box.classList.remove("invisible");
		else
			box.classList.add("invisible");
	}
}

function PopulateNameAndID()
{
	var charname = document.getElementById("Charname").value;
	var SFSID = document.getElementById("SFSID").value;
	
	document.getElementById("Charname2").value = charname;
	document.getElementById("Charname3").value = charname;
	document.getElementById("Charname4").value = charname;
	
	document.getElementById("SFSID2").value = SFSID;
	document.getElementById("SFSID3").value = SFSID;
	document.getElementById("SFSID4").value = SFSID;
}

function ClearInputs(){
	var charvars = document.querySelectorAll("input[type=text]");
	var longvars = document.getElementsByTagName("textarea");
	var boolvars = document.querySelectorAll("input[type=checkbox]");
	
	for(var i=0; i < charvars.length; i++)
	{
		charvars[i].value = "";
	}
	
	for(var i=0; i < longvars.length; i++)
	{
		longvars[i].value = "";
	}
	
	for(var i=0; i < boolvars.length; i++)
	{
		boolvars[i].checked = false;
	}
	
	document.getElementById("alwaystrue").checked=true;
	document.getElementById("AmmoCapacity1").value=20;
	document.getElementById("AmmoCapacity2").value=20;
	document.getElementById("AmmoCapacity3").value=20;
	document.getElementById("AmmoCapacity4").value=20;
	document.getElementById("AmmoCapacity5").value=20;
}

function LoadFile(){
	loadbox=document.getElementById('inputfile');
	var file=loadbox.files[0];
	if (!file) {
		return;
	}
	ClearInputs();
	var reader = new FileReader();
	reader.onloadend = function(e) {
		var contents = JSON.parse(e.target.result);
		for (const [ key, value ] of Object.entries(contents)) {
			thing = document.getElementById(key);
			if(thing)
			{
				if(thing.type && thing.type == 'checkbox' && value == true)
					thing.checked = true;
				else
					thing.value=value;
			}
		}
		PopulateNameAndID();
		UpdateDLLink();
		ModCapacity(1);
		ModCapacity(2);
		ModCapacity(3);
		ModCapacity(4);
		ModCapacity(5);
	};
	reader.readAsText(file);
}

function UpdateDLLink(){
	var cjson = {};
	var charname = document.getElementById("Charname").value;
	var charvars = document.querySelectorAll("input[type=text]");
	var longvars = document.getElementsByTagName("textarea");
	var boolvars = document.querySelectorAll("input[type=checkbox]");
	
	if(charname=="")
		charname = "Unnamed Character";
	
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
	a.textContent = "Save";
		
	document.getElementById('DownloadLink').innerHTML=""
	document.getElementById('DownloadLink').appendChild(a);
}
