/**
 * Created by Ghobe on 2017-11-30.
 */
var counter = 0;

functions.loadArchive("diary", function(archive, subMenu) {
    var html = "";
    html = html + "<li class='archive' id="+archive+"><button type='button' class='archiveBtn'>"+archive+"</button></li>";


    $("#sideMenu").append(html);
    for (var i=0;i<subMenu.length; i++){
        $("#"+archive).append("<ul class='archiveSubMenu'><li><button class='subMenuBtn' type='button'>"+ subMenu[i] +"</button></li></ul>");
    }

    $("#"+archive).find(".subMenuBtn").click(function () {
        console.log("click function called");
        var year = $(this).parent().parent().parent().find(".archiveBtn").text().substring(0, 4);
        var mon = $(this).text().substring(0, 2);
        $("#accordion").empty();

        functions.load("diary", year + "/" + mon, function (data) {

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
                    content_title +
                    "</a>" +
                    "</h4>" +
                    "</div>" +
                    "<div id=" + href + " class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">" +
                    "<div class=\"panel-body\">" +
                    content_content +
                    "</div>" +
                    "</div>" +
                    "</div>";

                var restOfchild = "<div class=\"panel panel-default\">" +
                    "<div class=\"panel-heading\" role=\"tab\" id=" + id + ">" +
                    "<h4 class=\"panel-title\">" +
                    "<a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=#" + href + " aria-expanded=\"false\" aria-controls=\""+href+"\">" +
                    content_title +
                    "</a>" +
                    "</h4>" +
                    "</div>" +
                    "<div id=" + href + " class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">" +
                    "<div class=\"panel-body\">" +
                    content_content +
                    "</div>" +
                    "</div>" +
                    "</div>";

                if (i !== 0) {
                    $("#accordion").append(restOfchild);
                }else {
                    $("#accordion").append(firstchild);
                }
            }
        })

    });
});


