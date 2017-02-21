define(function (require) {
    //var $ = require('jquery');
    //var lib = require('./lib');

    var testClass = require('./TestClass');

    var pcKeys = require('./pcKeybindings');
    var gameScene = require('./pixiGameScene');

    pcKeys.setTurnMethod(function (direction) {
        console.log("► DIRECT", direction);
    });



    //var gameScene = require('.pixiGameScene');

    //A fabricated API to show interaction of
    //common and specific pieces.
    //pcKeys.onTest();

    /*$(function () {
        controller.render(lib.getBody());
    });*/

});
