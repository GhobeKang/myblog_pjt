/**
 * Created by Ghobe on 2017-11-14.
 */
var count = 0;
    const config = {
        // "apiKey": "AIzaSyCXkzibbjQo0fXXgAoB3dUtP2z7IUpvQqA",
        // "authDomain": "mywebpage-bb417.firebaseapp.com",
        "databaseURL": "https://mywebpage-bb417.firebaseio.com",
        "projectId": "mywebpage-bb417",
        "storageBucket": "mywebpage-bb417.appspot.com",
        "messagingSenderId": "179234169065"
    };
    const DefaultFuntionApp = firebase.initializeApp(config, "DefualtFunction");

var functions = {

    addDiary : function (categories, subCategory, title, date, content, callback) {
        const defaultApp = DefaultFuntionApp;
        const d = new Date();
        const createTime = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        var location_category = defaultApp.database().ref("/" + categories+"/"+subCategory);
        var newPostKey = location_category.push().key;
        location_category.once("value")
            .then(function (snapshot) {
                var seqNum = snapshot.numChildren() + 1;
                location_category.child(newPostKey).set({
                    seqNum: seqNum,
                    title: title,
                    content: content,
                    registered_time: date,
                    created_time: createTime
                });
            })
            .then(function() {
                console.log("saving a data to DB is successed!!");
                location.reload();
            })
    },

    add : function (categories, subCategory, title, content, contentTextOnly, callback) {
        const defaultApp = DefaultFuntionApp;
        const d = new Date();
        const createTime = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        var location_category = defaultApp.database().ref("/" + categories+"/"+subCategory);
        var location_recent = defaultApp.database().ref("/recent");
        var newPostKey = location_category.push().key;
        location_category.once("value")
            .then(function (snapshot) {
                var seqNum = snapshot.numChildren() + 1;
                location_category.child(newPostKey).set({
                    category: subCategory,
                    seqNum: seqNum,
                    title: title,
                    content: content,
                    textOnly: contentTextOnly,
                    created_time: createTime
                });
            })
            .then(function() {
                if (typeof callback === 'function') {
                    callback();
                }
                console.log("saving a data to DB is successed!!");
            });
        location_recent.push().set({
            Rtitle : title,
            Rcontent : content
        });

    },

    load : function (categories, subCategory, callback) {
        count = count+1;
        const defaultApp = DefaultFuntionApp;
        const location = defaultApp.database().ref("/" + categories + "/" + subCategory);


        location.once('value').then(function (snapshot) {
            //key of snapshot is 'categories'
            //when the event is 'value', key is returned to 'categories', and otherwise, when event is 'child_added'
            //key is returned 'push key'

            var eachResult = [];
            snapshot.forEach(function(eachsnapshot) {
                eachResult.push(eachsnapshot.val());
            });
            if (typeof callback === 'function') {
                callback(eachResult);
            }
        })
    },
    loadRecentContents : function(category, limitTo, callback) {
        const defaultApp = DefaultFuntionApp;
        const location = defaultApp.database().ref("/recent");

        location.limitToLast(limitTo).on('value', function(snapshot){
            snapshot.forEach(function(eachdata) {
                var data = "<p class=\"list-group-item\">"+eachdata.val().Rtitle+"</p>";
                if (typeof callback === 'function') {
                    callback(data);
                }
            });

            // snapshot.forEach(function(each) {
            //     var data = "<a href=\"#\" class=\"list-group-item\">"+each.val().title+"&nbsp&nbsp"+each.val().created_time+"</a>";
            //     if (typeof callback === 'function') {
            //         callback(data);
            //     }
            // });
        })
    },

    loadArchive: function(category, callback) {

        const initApp = DefaultFuntionApp;
        const rootLocation = initApp.database().ref("/"+category);
        rootLocation.once('value').then(function(snapshot) {
            snapshot.forEach(function(yearSnapshot){
                var archive;
                var subMenu = [];
                archive = yearSnapshot.key;
                yearSnapshot.forEach(function(monthSnapshot){
                    subMenu.push(monthSnapshot.key);
                });
                if (typeof callback === 'function') {
                    callback(archive, subMenu);
                }
            });
        });

    },

    loadForSearch: function(searchFor, callback) {
        const initApp = DefaultFuntionApp;
        const SPointForSearch = initApp.database().ref("/programming");

        SPointForSearch.once('value').then(function(snapshot) {
            snapshot.forEach(function(subcategory) {
                SPointForSearch.child(subcategory.key).once('value')
                    .then(function(data) {
                        data.forEach(function(eachData) {
                            var resultOfSearch = [];
                            var content;
                            console.log(eachData.val());
                            if (eachData.hasChild('textOnly')) {
                                content = eachData.val().textOnly;

                                if (eachData.val().title.search(searchFor) !== -1) {
                                    var result = {
                                        data: eachData.val(),
                                        whereHit: "title",
                                        indexOf: eachData.val().title.search(searchFor)
                                    };
                                    resultOfSearch.push(result);

                                } else if (content.search(searchFor) !== -1) {
                                    var result = {
                                        data: eachData.val(),
                                        whereHit: "content",
                                        indexOf: content.search(searchFor)
                                    };
                                    resultOfSearch.push(result);

                                } else {
                                    console.log("not found");
                                }
                                if (typeof callback === 'function') {
                                    callback(resultOfSearch);
                                }
                            }

                        })
                })
            })
        })
    },
    loadContentsNum: function(callback) {
        const initApp = DefaultFuntionApp;
        const database = initApp.database();
        const defaultpathofDatabase = database.ref('/programming');
        defaultpathofDatabase.on('value', function(snap) {
            snap.forEach(function(contentTitle) {
                var category = contentTitle.key;
                var numbers = contentTitle.numChildren();
                if (typeof callback === 'function') {
                    var result = {
                        category : category,
                        numbers : numbers
                    };
                    callback(result)
                }
            })
        })
    }
};