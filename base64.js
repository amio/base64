/**
 * Created by Amio, 2013.09.12
 * Repository: http://github.com/amio/base64
 * Credit to Ole Morten Didriksen
 */

(function () {
  'use strict';

  function $(selecterString) {
    return document.querySelector(selecterString)
  }

  var eWrapper = $('#wrapper'),
    eTextInput = $('#textInput'),
    eFileInput = $('#fileInput'),
    eBase64 = $('#textBase64');

  if (!hasRequiredFunctionality()) {
    eWrapper.innerHTML = 'Your browser does not support atob, btoa or FileReader.<br />\
    As this website only aims to use this functionality (not replace it), you\
    should look for what you need elsewhere.<br />Or you can use a newer browser.';
    return;
  }

  eTextInput.oninput = encodeText;
  eFileInput.onchange = encodeFile;
  eBase64.oninput = decodeBase64;

  var holder = document.body;
  holder.ondragover = function () { this.className = 'dragover' };
  holder.ondragend = function () { this.className = '' };
  holder.ondrop = encodeFileDropped;

  function hasRequiredFunctionality() {
    return typeof atob != "undefined" && typeof btoa != "undefined" && typeof FileReader != "undefined";
  }

  function encodeFileDropped(e) {
    this.className = '';
    e.preventDefault();

    var file = e['dataTransfer'].files[0],
      reader = new FileReader();
    reader.onload = function (event) {
      eBase64.value = event.target.result;
      console.log(event.target.result);
    };
    reader.readAsDataURL(file);

    return false;
  }

  function encodeText() {
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

  function encodeFile() {
    var files = event.target.files;
    if ( !( files && files.length == 1) )
      return;
    var reader = new FileReader();
    reader.onload = (function (file) {
      return function (e) {
        eBase64.value = e.target.result;
      };
    })(files[0]);
    reader.readAsDataURL(files[0]);
  }

  function decodeBase64() {
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
