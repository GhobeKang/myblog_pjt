/**
 * Created by Ghobe on 2017-12-03.
 */
var getImagesList = function(callback) {
    $.getJSON("./jsons/images.json", function(data) {
        var duplicationCheck;
        var picked_images = [];
        for (var i=0; i < 7; i++) {
            var random_tmp = parseInt(Math.random()*Object.keys(data).length);
            if (duplicationCheck !== random_tmp) {
                picked_images.push(data[random_tmp]);
            }
            duplicationCheck = random_tmp;
        }

        if (typeof callback === 'function') {
            callback(picked_images);
        }

    })
};

