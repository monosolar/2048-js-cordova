define(function () {
    function testClass() {
    }

    testClass.prototype = {
        setBreak: function (message) {
            console.log("►", message);
        }

    };

    return new testClass();
});

/*define(['./Base'], function (Base) {
    var c1 = new Base('Controller 1');
    return c1;
});*/

