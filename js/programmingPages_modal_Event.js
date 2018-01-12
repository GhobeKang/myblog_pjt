/**
 * Created by Ghobe on 2017-11-29.
 */
$("#commitBtn").click(function() {
    var category = $("#inputCategory").val();
    var title = $("#inputTitle").val();
    var content = quill.root.innerHTML; //it is returned to Delta type data(with format and objects)
    var contentTextOnly = quill.getText(0,quill.getLength());
    functions.add("programming",category,title,content,contentTextOnly, function() {

        window.location.reload();

    });

    $("#writeModal").modal('hide');
    $("#writeModal").on('hide.bs.modal', function () {
        alert('The modal is about to be hidden.');
    });

});