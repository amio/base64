/*
	Created by Ole Morten Didriksen, 2012.08.31
	Repository: http://github.com/oledid/base64
*/

(function(){
	if (typeof oledid == "undefined" || !oledid) oledid = {};
	if (typeof oledid.Base64 == "undefined" || !oledid.Base64) oledid.Base64 ={};
	
	var $wrapper;
	
	var root = oledid.Base64;
	root.Main = function(wrapperSelector)
	{
		$wrapper = $(wrapperSelector);
		$wrapper.find("input[type='file']").change(fileInputChange);
		$wrapper.find(".encode").click(encodeClick);
		$wrapper.find(".decode").click(decodeClick);
		$wrapper.find(".output").click(outputClick);
	};
	
	function fileInputChange(event)
	{
		var files = event.target.files;
		if (files.length != 1)
			return;
		var reader = new FileReader();
		reader.onload = (function(file) {
			return function(e) {
				$wrapper.find(".output").text(e.target.result);
			};
		})(files[0]);
		reader.readAsDataURL(files[0]);
	}
	
	function encodeClick(event)
	{
		var input = $wrapper.find(".input").val();
		var result = btoa(input);
		$wrapper.find(".output").text(result);
	}
	
	function decodeClick(event)
	{
		var input = $wrapper.find(".input").val();
		var result;
		try
		{
			result = atob(input);
		}
		catch (e)
		{
			result = "-errorvalue-";
		}
		$wrapper.find(".output").text(result);
	}
	
	function outputClick(event)
	{
		var $target = $(event.target);
		$target.focus();
		$target.select();
	}
}());