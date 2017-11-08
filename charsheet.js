function SaveChar(){
	var cjson = {};
	var charname = document.getElementById("Charname").value;
	var charvars = document.querySelectorAll("input[type=text]");
	var boolvars = document.querySelectorAll("input[type=checkbox]");
	
	for(var i=0; i < charvars.length; i++)
	{
		cjson[charvars[i].id]=charvars[i].value;
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
	a.textContent = "Download";
	
	document.getElementById('DownloadLink').innerHTML=""
	document.getElementById('DownloadLink').appendChild(a);
}
