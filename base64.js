/**
 * Created by Amio, 2013.09.12
 * Repository: http://github.com/amio/base64
 * Credit to Ole Morten Didriksen
 */

(function () {
  'use strict';

  function $(selecterString) {
    return document.querySelector(selecterString);
  }

  var eWrapper = $('#wrapper'),
    eTextInput = $('#textInput'),
    eFileInput = $('#fileInput'),
    eDropMask = $('#dropMask'),
    eBase64 = $('#textBase64');

  if (!hasRequiredFunctionality()) {
    eWrapper.innerHTML = 'Your browser does not support atob, btoa or FileReader.<br />\
    As this website only aims to use this functionality (not replace it), you\
    should look for what you need elsewhere.<br />Or you can use a newer browser.';
    return;
  }

  eTextInput.oninput = handleTextInput;
  eFileInput.onchange = handleFileInput;

  document.body.ondragover = FileDragHover;
  document.body.onclick = FileDragHover; // clear drop mask while click
  document.body.ondrop = onFileDropped;

  eBase64.oninput = handleBase64Input;

  function hasRequiredFunctionality() {
    return typeof atob != "undefined" && typeof btoa != "undefined" && typeof FileReader != "undefined";
  }

  // file drag hover
  function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    document.body.className = (e.type == "dragover" ? "dragover" : "");
  }

  function onFileDropped(e) {
    // cancel event and hover styling
    FileDragHover(e);

    var files = e.target.files || e['dataTransfer'].files;
    eTextInput.value = '';
    encodeFile(files[0]);
  }

  function handleTextInput() {
    var input = eTextInput.value;
    var result;
    try{
      result = btoa(input);
    }catch(e){
      result = '';
      console.log(e.message);
    }
    eBase64.value = result;
  }

  function handleFileInput() {
    var files = event.target.files;
    if ( files && files.length == 1 ){
      eTextInput.value = '';
      encodeFile(files[0]);
    }
  }

  function encodeFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      eBase64.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleBase64Input() {
    var result;
    try{
      result = atob(eBase64.value);
    }catch(e){
      result = '';
      console.log(e.message);
    }
    eTextInput.value = result;
  }

}());
