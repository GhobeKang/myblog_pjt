/**
 * Created by Ghobe on 2017-12-02.
 */
var image_resizing = function(className){

    var cur_width = $(this).width();
    var cur_height = $(this).height();
    var res_width = $(className).width();
    var res_height = $(className).height();

    console.log(cur_height, cur_width, res_height, res_width);
    if (cur_width > res_width) {
        var ratio = cur_width / cur_height;
        $(this).attr("width",res_width);
        $(this).attr("height",res_height);
    }
};