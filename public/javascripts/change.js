function clickme(id) {
    // alert(id);
    var title =  document.getElementById(id).querySelector("#title");
    var text = document.getElementById(id).querySelector("#text");

    var update = document.getElementById(id).querySelector("#update");
    var edit = document.getElementById(id).querySelector("#edit");
    var cancelButton = document.getElementById(id).querySelector("#cancelButton");

    title.removeAttribute('readonly');
    text.removeAttribute('readonly');
    update.value="Update";
    edit.style.visibility="hidden";
    cancelButton.style.display = 'inline';

  }