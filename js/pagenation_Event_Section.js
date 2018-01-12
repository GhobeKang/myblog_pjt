/**
 * Created by Ghobe on 2017-11-26.
 */

var pageName = $(".pagename").text();

// display pagenation on UI
var createPagenation = function(startNum, endNum) {
    for (var i=startNum; i<=endNum; i++) {
        $(".end_point").before("<li><a class='pagenation_num'>"+i+"</a></li>");
    }
    $(".pagenation_num:first").addClass("active");

    //register page's Event listener
    $(".pagenation_num").click(function(){
        var pageNumber = $(this).text();
        $(".active").removeClass("active");
        $(this).addClass("active");
        // in order to use a DB finder function, we should get a pagenation's number. (to compare with DB's value)
        // this = clicked button element

        functions.load("programming",pageName,function(totalData) {

            var targetData = totalData[pageNumber-1];

            $(".page-header h2").empty().append(targetData.title);
            $(".page-header small").empty().append(targetData.created_time);
            $(".col-md-8 .contentPart").empty().append(targetData.content);

            window.scrollTo(0,0);
        });
    })
};

// this function(pagenationLoad) is used to get a number of total contents
pagenation.getTotalContentNumber(pageName ,function(totalContentsNumber){
    //initialization page (firstpage), create pagenation tags
    var startNum = 1;
    var endNum = startNum +10;
    if (totalContentsNumber < endNum) {
        endNum = totalContentsNumber;
    }
    if (endNum === 0) {
        endNum = 1;
    }


    createPagenation(startNum, endNum);

    if(totalContentsNumber > endNum) {
        $(".end_point").after("<li><a class='nextpage'>...</a></li>");
        $(".nextpage").click(function() {
            startNum = endNum+1;
            endNum = startNum+10;

            if(totalContentsNumber < endNum) {
                endNum = totalContentsNumber;
                $(".nextpage").remove();
            }
            // remove previous pagenation
            $(".pagenation_num").remove();
            // draw a new pagenation (next pagenation)
            createPagenation(startNum, endNum)
        })
    }

});
//adding a content to inner of page-header tag
functions.load("programming", pageName, function(data) {
    var firstData = data[0];
    console.log(firstData);
    if (firstData == null) {
        $(".col-md-8 .contentPart").empty().append('<img src=../img/images.jpg style="height:500px;margin-bottom: 50px">');
    }else {
        $(".page-header h2").empty().append(firstData.title);
        $(".page-header small").empty().append(firstData.created_time);
        $(".col-md-8 .contentPart").empty().append(firstData.content);
    }
});

