/**
 * Created by Ghobe on 2017-11-30.
 */
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
if (month < 10 ) {
    month = "0" + month;
}
var counter= 0;

functions.load("diary", year + "/" + month, function (data) {
    for (var i = 0; i < data.length; i++) {
        counter = counter + 1;

        var content_date = data[i].registered_time;
        var content_title = data[i].title;
        var content_content = data[i].content;
        var id = "heading" + counter;
        var href = "collapse" + counter;

        var firstchild = "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\" role=\"tab\" id=" + id + ">" +
            "<h4 class=\"panel-title\">" +
            "<a data-toggle=\"collapse\" data-parent=\"#accordion\" href=#" + href + " aria-expanded=\"true\" aria-controls=\""+ href +"\">" +
            "<strong>"+ content_date + "</strong>"+ "&emsp;" + content_title  +
            "</a>" +
            "</h4>" +
            "</div>" +
            "<div id=" + href + " class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">" +
            "<div class=\"panel-body\">" +
            content_content +
            "</div>" +
            "</div>" +
            "</div>";

        var restOfchild = "<div class=\"panel panel-default\">" +
            "<div class=\"panel-heading\" role=\"tab\" id=" + id + ">" +
            "<h4 class=\"panel-title\">" +
            "<a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=#" + href + " aria-expanded=\"false\" aria-controls=\""+href+"\">" +
            "<strong>"+ content_date + "</strong>"+ "&emsp;" + content_title +
            "</a>" +
            "</h4>" +
            "</div>" +
            "<div id=" + href + " class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">" +
            "<div class=\"panel-body\">" +
            content_content +
            "</div>" +
            "</div>" +
            "</div>";

        if (i >0) {
            $("#accordion").prepend(restOfchild);
        }else {
            $("#accordion").append(firstchild);
        }
        if (data.length === counter) {
            $("#"+href).addClass("in")
        }
    }
});

