/**
 * Created by Ghobe on 2017-12-07.
 */
$.getScript(("../js/contents_add.js"), function(script, textStatus, jqXHR){
    functions.loadContentsNum(function(result) {
        var contentTitle = result.category;
        var contentNum = result.numbers;
        $('#'+contentTitle).append('<span class="badge">'+contentNum+'</span>');
    });
});
$.getScript("../js/pagenation_Event_Section.js", function(script, textStatus, jqXHR){
    console.log("Pagenation_Event_Section.js file loading: "+textStatus);
});
$.getScript(("../js/quillInModal.js"), function(script, textStatus, jqXHR) {
    console.log("quillInModal.js file loading: "+textStatus);
});
$.getScript(("../js/programmingPages_modal_Event.js"), function(script, textStatus, jqXHR) {
    console.log("modal_event.js file loading: "+textStatus);
});
$.getScript(("../js/pagenation_btn_event.js"), function(script, textStatus, jqXHR) {
    console.log("pagenation_btn_event.js file loading: "+textStatus);
});


var calledSeqnum;
$(function() {
    calledSeqnum = window.location.search.substring(1).split('=')[1];
});

setTimeout(function(){if(calledSeqnum !== null){$('.pagenation_num:contains("'+calledSeqnum+'")').trigger('click')}},3000);
