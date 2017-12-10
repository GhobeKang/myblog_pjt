/**
 * Created by Ghobe on 2017-11-29.
 */
$("#commitBtn").click(function() {
    var date = $("#inputDate").val();
    var year = date.substring(0,4);
    var month = date.substring(5,7);
    var title = $("#inputTitle").val();
    var content = quill.root.innerHTML; //it is returned to Delta type data(with format and objects)

    functions.addDiary("diary", year+"/"+month, title, date, content);

    $("#writeModal").modal('hide');
    $("#writeModal").on('hide.bs.modal', function () {
        alert('The modal is about to be hidden.');
    });

});