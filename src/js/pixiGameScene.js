define(function (require) {

    const HORIZONTAL = 'HORIZONTAL';
    const VERTICAL = 'VERTICAL';

    const PIXI = require('libs/pixi.min');
    const gridContainer = new PIXI.Container();

    const stage = new PIXI.Stage();

    const domDivContainer = document.getElementById("pixiDiv");

    var renderer = PIXI.autoDetectRenderer(
        parseInt(document.body.clientWidth),
        parseInt(document.body.clientHeight),
        {backgroundColor : 0xEEEEEE}   );

    const gridSize = renderer.height;

    const gridCellsArray = [];


    //constructor
    function gameScene() {


        init();
    }

    //////////////
    // private: //
    //////////////

    var init = function () {

        const rendererViewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const rendererViewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        renderer = PIXI.autoDetectRenderer(rendererViewWidth,rendererViewHeight, {backgroundColor : 0xEEEEEE});


        domDivContainer.appendChild(renderer.view);

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        stage.interactive = true;
        stage.addChild(gridContainer);

        gridContainer.x = (renderer.width / 2) - gridSize / 2;
        gridContainer.y = 150;

        const gridBGGraphics = new PIXI.Graphics();
        gridBGGraphics.beginFill(0xbbada0);
        gridBGGraphics.drawRoundedRect(0, 0, gridSize, gridSize, 6);
        gridBGGraphics.endFill();

        gridContainer.addChild(gridBGGraphics);

        ///////////////
        // ↓ IFACE ↓ //
        ///////////////


        const topUIContainer = new PIXI.Container();
        topUIContainer.x = (renderer.width / 2) - gridSize / 2;
        topUIContainer.y = 10;

        stage.addChild(topUIContainer);


        /// → Label:

        var labelRichText = new PIXI.Text("2048",
            {fontFamily : "Arial", fontSize : '70px', fontWeight : 'bold', fill : '#776E65'});
        //labelRichText.anchor.set(0.5, 0.5);
        labelRichText.x = 0;
        labelRichText.y = 0;

        topUIContainer.addChild(labelRichText);

        /// → Score component:
        const scoreComponent = new PIXI.Container();
        const scoreComponentWidth = 120;
        const scoreComponentHeight = 70;

        scoreComponent.x = gridSize - scoreComponentWidth;

        var scoreComponentBGGraphic = new PIXI.Graphics();
        scoreComponentBGGraphic.beginFill(0xBBADA0);
        scoreComponentBGGraphic.drawRoundedRect(0, 0, scoreComponentWidth, scoreComponentHeight, 6);
        scoreComponentBGGraphic.endFill();

        scoreComponent.addChild(scoreComponentBGGraphic);

        var scoreComponentLabelRichText = new PIXI.Text("SCORE:",
            {fontFamily : "Arial", fontSize : '14px', fill : '#EEE4CF'});
        scoreComponentLabelRichText.anchor.set(0.5, 0.5);
        scoreComponentLabelRichText.x = scoreComponentWidth/2;
        scoreComponentLabelRichText.y = scoreComponentHeight/3;
        scoreComponent.addChild(scoreComponentLabelRichText);

        var scoreComponentValueRichText = new PIXI.Text("1226",
            {fontFamily : "Arial", fontSize : '30px', fontWeight : 'bold', fill : '#FFFFFF'});
        scoreComponentValueRichText.anchor.set(0.5, 0.5);
        scoreComponentValueRichText.x = scoreComponentWidth/2;
        scoreComponentValueRichText.y = scoreComponentHeight/3 * 2;
        scoreComponent.addChild(scoreComponentValueRichText);

        topUIContainer.addChild(scoreComponent);

        /// → New game button component:
        const newGameComponent = new PIXI.Container();
        const newGameComponentWidth = 160;
        const newGameComponentHeight = 70;

        newGameComponent.x = gridSize - newGameComponentWidth - 5 - scoreComponentWidth;

        var newGameComponentBGGraphic = new PIXI.Graphics();
        newGameComponentBGGraphic.beginFill(0x8F7A66);
        newGameComponentBGGraphic.drawRoundedRect(0, 0, newGameComponentWidth, newGameComponentHeight, 6);
        newGameComponentBGGraphic.endFill();

        newGameComponent.addChild(newGameComponentBGGraphic);

        var newGameComponentLabelRichText = new PIXI.Text("New Game",
            {fontFamily : "Arial", fontSize : '24px', fontWeight : 'bold', fill : '#FFFFFF'});
        newGameComponentLabelRichText.anchor.set(0.5, 0.5);
        newGameComponentLabelRichText.x = newGameComponentWidth/2;
        newGameComponentLabelRichText.y = newGameComponentHeight/2;
        newGameComponent.addChild(newGameComponentLabelRichText);

        topUIContainer.addChild(newGameComponent);


        // ↑ IFACE ↑ //

        addGrid();

        animate();
    }

    var addGrid = function () {

        var gridTileBGGraphics;
        for (var i = 0; i < 4; i++){
            gridCellsArray.push([]);
            for (var j = 0; j< 4; j++){

                const gap = 10;
                const cellSize = (gridSize/4) - gap*1.33;

                gridTileBGGraphics = new PIXI.Graphics();

                gridTileBGGraphics.beginFill(0xeee4da);
                gridTileBGGraphics.drawRoundedRect(0, 0, cellSize, cellSize, 3);
                gridTileBGGraphics.endFill();

                gridTileBGGraphics.x = gap + (cellSize+gap) * i;
                gridTileBGGraphics.y = gap + (cellSize+gap) * j;

                gridCellsArray[i][j] =
                    {
                        position:{x:gridTileBGGraphics.x , y:gridTileBGGraphics.y},
                        value:0,
                        cell:null
                    }

                gridContainer.addChild(gridTileBGGraphics);

            }
        }
    }

    var animate = function () {

        renderer.render(stage);
        requestAnimationFrame( animate );
    }

    //////////////
    //  public: //
    //////////////

    gameScene.prototype = {

        getRendererView:function () {
            return renderer.view;
        },

        reset: function () {
            //this.model = model;
        }
    };

    return new gameScene();
});


