/**
 * Created by Ghobe on 2017-11-25.
 */
const config2 = {
    "apiKey": "AIzaSyCXkzibbjQo0fXXgAoB3dUtP2z7IUpvQqA",
    "authDomain": "mywebpage-bb417.firebaseapp.com",
    "databaseURL": "https://mywebpage-bb417.firebaseio.com",
    "projectId": "mywebpage-bb417",
    "storageBucket": "mywebpage-bb417.appspot.com",
    "messagingSenderId": "179234169065"
};
const pagenationApp = firebase.initializeApp(config2, "pagenationApp");

const pagenation = {
    find_content : function(seqnum, category, callback) {
        if (seqnum == null) {
            seqnum = 1;
        }
        var initDatabase = pagenationApp;

        const findPath = initDatabase.database().ref("/programming"+"/"+category);
        findPath.once('value')
            .then(function (snapshot) {
                snapshot.forEach(function(eachSnapshot){
                    var targetObj = eachSnapshot.val();
                    if (Number(seqnum) === targetObj.seqNum){
                        console.log("find!! "+seqnum+targetObj.seqNum);
                        if (typeof callback === 'function') {
                            callback(targetObj);
                        }
                    }
                })
        })
    },

    getTotalContentNumber : function(category, callback) {
        var defaultApp = pagenationApp;
        const location = defaultApp.database().ref("/programming" + "/" + category);
        var totalContents = 0;

        location.once('value').then(function (snapshot) {
            //key of snapshot is 'categories'
            //when the event is 'value', key is returned to 'categories', and otherwise, when event is 'child_added'
            //key is returned 'push key'
            totalContents = snapshot.numChildren();

            if (typeof callback === 'function') {
                callback(totalContents);
            }

        })

    }
}