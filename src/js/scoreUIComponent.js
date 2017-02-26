define(function (require) {

    const PIXI = require('libs/pixi.min');

    const scoreComponentWidth = 120;
    const scoreComponentHeight = 70;

    var scoreComponentValueRichText;

    var init = function () {

    }

    //constructor
    function scoreUIComponent() {

        /// → Score component:
        const scoreComponent = new PIXI.Container();
        
        const scoreComponentBGGraphic = new PIXI.Graphics();
        scoreComponentBGGraphic.beginFill(0xBBADA0);
        scoreComponentBGGraphic.drawRoundedRect(0, 0, scoreComponentWidth, scoreComponentHeight, 6);
        scoreComponentBGGraphic.endFill();

        scoreComponent.addChild(scoreComponentBGGraphic);

        const scoreComponentLabelRichText = new PIXI.Text("SCORE:",
            {fontFamily : "Arial", fontSize : '14px', fill : '#EEE4CF'});
        scoreComponentLabelRichText.anchor.set(0.5, 0.5);
        scoreComponentLabelRichText.x = scoreComponentWidth/2;
        scoreComponentLabelRichText.y = scoreComponentHeight/3;
        scoreComponent.addChild(scoreComponentLabelRichText);

        scoreComponentValueRichText = new PIXI.Text("1226",
            {fontFamily : "Arial", fontSize : '30px', fontWeight : 'bold', fill : '#FFFFFF'});
        scoreComponentValueRichText.anchor.set(0.5, 0.5);
        scoreComponentValueRichText.x = scoreComponentWidth/2;
        scoreComponentValueRichText.y = scoreComponentHeight/3 * 2;
        scoreComponent.addChild(scoreComponentValueRichText);

        return scoreComponent;
    }

    scoreUIComponent.prototype = {
        increaseScore: function () {
            //scoreComponentValueRichText.textContent = 6;
            console.log("►ind");
        },
        getWidth: function () {
            console.log("►gtw");
            //return scoreComponentWidth;
        },
        getHeight: function () {
            return scoreComponentHeight;
        }
    };

    return new scoreUIComponent();

});