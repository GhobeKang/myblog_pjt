/**
 * Created by Ghobe on 2017-12-03.
 */
//prev, next button event listener
var pageName = $(".pagename").text();
var currentPageNumber = $(".pagination").find(".active").text();
//check prev, next button is available or not

var checkButtonIsAvailable = function() {
    pagenation.getTotalContentNumber(pageName,function(total) {
        console.log(currentPageNumber);
        if (currentPageNumber == "1"){
            $(".glyphicon-menu-left").unbind("click", function() {
                console.log("left button will be disabled");
            }).addClass("disabled");
        }else if(currentPageNumber == total) {
            $(".glyphicon-menu-right").unbind("click", function() {
                console.log("right button will be disabled");
            }).addClass("disabled");
        }
    });
};

$(".glyphicon-menu-left").click(function() {

    checkButtonIsAvailable();

    var beActive = $(".active").parent().prev().find(".pagenation_num");
    $(".active").removeClass("active");
    beActive.addClass("active");

    functions.load("programming",pageName,function(totalData) {
        var targetData = totalData[currentPageNumber-2];

        $(".page-header h2").empty().append(targetData.title);
        $(".page-header small").empty().append(targetData.created_time);
        $(".col-md-8 .contentPart").empty().append(targetData.content);

    });
});

$(".glyphicon-menu-right").click(function() {

    checkButtonIsAvailable();

    currentPageNumber = $(".pagination").find(".active").text();

    var beActive = $(".active").parent().next().find(".pagenation_num");
    $(".active").removeClass("active");
    beActive.addClass("active");

    functions.load("programming",pageName,function(totalData) {
        var targetData = totalData[currentPageNumber];

        $(".page-header h2").empty().append(targetData.title);
        $(".page-header small").empty().append(targetData.created_time);
        $(".col-md-8 .contentPart").empty().append(targetData.content);

    });
});

