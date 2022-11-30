function clickme(id) {
    // alert(id);
    var title =  document.getElementById(id).querySelector("#title");
    var text = document.getElementById(id).querySelector("#text");
    var update = document.getElementById(id).querySelector("#update");
    var edit = document.getElementById(id).querySelector("#edit");

    title.removeAttribute('readonly');
    text.removeAttribute('readonly');
    update.type="submit";
    edit.style.visibility="hidden";
  }