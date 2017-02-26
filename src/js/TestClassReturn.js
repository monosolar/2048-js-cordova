define(function () {


    var tt = {rr:66, oo:99}

    function testClassRet() {
        return tt;
    }

    testClassRet.prototype = {
        setBreak: function (message) {
            console.log("►", message);
        }

    };

    return testClassRet();
});


