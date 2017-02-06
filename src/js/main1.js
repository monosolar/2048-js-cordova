define(function (require) {
    /** TODO:
     - Provide here CSS
     - Make ES6 classes
     - Connect Ease JS
     - Make linear array
     - Cells graphic to aanchor
    */
    const PIXI = require('libs/pixi.min');

    const domDivContainer = document.getElementById("pixiDiv");


    const renderer = PIXI.autoDetectRenderer(
                            parseInt(domDivContainer.style.minWidth),
                            parseInt(domDivContainer.style.minHeight),
                            {backgroundColor : 0xEEEEEE}   );


    document.getElementById("pixiDiv").appendChild(renderer.view);

    var stage = new PIXI.Stage();
    stage.interactive = true;

    //init

    const gridContainer = new PIXI.Container();
    const gridWidth = 500;
    const gridHeight = 500;

    stage.addChild(gridContainer);

    gridContainer.x = 150;
    gridContainer.y = 50;

    var gridBGGraphics = new PIXI.Graphics();

    gridBGGraphics.beginFill(0xbbada0);
    gridBGGraphics.drawRoundedRect(0, 0, gridWidth, gridHeight, 6);
    gridBGGraphics.endFill();

    gridContainer.addChild(gridBGGraphics);

    const gridCellsArray = [];

    var gridTileBGGraphics;

    for (var i = 0; i < 4; i++){
        gridCellsArray.push([]);
        for (var j = 0; j< 4; j++){
            //gridPositionsArray[i][j] =

            const gap = 10;
            const cellSize = (500/4) - gap*1.33;

            gridTileBGGraphics = new PIXI.Graphics();

            gridTileBGGraphics.beginFill(0xeee4da);
            gridTileBGGraphics.drawRoundedRect(0, 0, cellSize, cellSize, 3);
            gridTileBGGraphics.endFill();

            gridTileBGGraphics.x = gap + (cellSize+gap) * i;
            gridTileBGGraphics.y = gap + (cellSize+gap) * j;

            new PIXI.Point(gridTileBGGraphics.x,gridTileBGGraphics.y)

            gridCellsArray[i][j] =
                {
                    position:{x:gridTileBGGraphics.x , y:gridTileBGGraphics.y},
                    value:0,
                    cell:null
                }

            gridContainer.addChild(gridTileBGGraphics);

        }
    }

    document.addEventListener("keydown", function (event) {
        makeShift(event.key);

    });

    function addCell(value,row,col) {

        var cellContainer = new PIXI.Container()
        var cellGraphics = new PIXI.Graphics();

        const gap = 10;
        const cellSize = (500/4) - gap * 1.33;

        cellGraphics.beginFill(0xede0c8);
        cellGraphics.drawRoundedRect(0, 0, cellSize, cellSize, 3);
        cellGraphics.endFill();


        var style = {
            fontFamily : "Arial",
            fontSize : '55px',
            fontWeight : 'bold',
            fill : '#776E65'
        };

        var richText = new PIXI.Text(String(value),style);
        richText.anchor.set(0.5, 0.5);
        richText.x = cellSize/2;
        richText.y = cellSize/2;

        cellContainer.x = gridCellsArray[row][col].position.x;
        cellContainer.y = gridCellsArray[row][col].position.y;

        gridCellsArray[row][col].value = value;
        gridCellsArray[row][col].cell = cellContainer;

        cellContainer.addChild(cellGraphics);
        cellContainer.addChild(richText);

        cellContainer.fedor = "ыыы";

        gridContainer.addChild(cellContainer);

    }

    function makeShift(direction) {
        switch (direction){
            case 'ArrowRight':
                for (var i = 2; i >= 0; i--) {  // cols
                    for (var j = 0; j < 4; j++) { // rows

                        if(gridCellsArray[i][j].value != 0)
                        {

                            var positionToMove = -1;
                            var positionSameValue = -1;

                            for (var k = i+1; k < 4; k++) {  //rows

                                if (gridCellsArray[k][j].value == gridCellsArray[i][j].value &&
                                    positionSameValue == -1)
                                {
                                    positionSameValue = k;
                                }

                                if (gridCellsArray[k][j].value == 0)
                                {
                                    positionToMove = k;
                                }


                                // TODO: make one if
                                if (gridCellsArray[k][j].value != 0 &&
                                    gridCellsArray[k][j].value != gridCellsArray[i][j].value)
                                {
                                    break;
                                }

                            }


                            // concat:
                            if (positionSameValue != -1)
                            {
                                console.log("► positionSameValue:",positionSameValue,", positionToMove:",positionToMove);

                                if (positionToMove != -1)
                                    concatEqualCells(i,j,positionSameValue,j,positionToMove,j)
                                else
                                    concatEqualCells(i,j,positionSameValue,j);
                            }

                            else

                            // move:
                            if (positionToMove != -1)
                            {
                                moveCell(i,j,positionToMove,j);
                            }



                        }
                    }
                }

                break;
            case 'ArrowLeft':

                /*for (var i = 1; i < 4; i++) {  // cols
                    for (var j = 0; j < 4; j++) { // rows

                        if(gridCellsArray[i][j].value !== 0)
                        {

                            var positionToMove;
                            for (var k = i-1; k >= 0; k--) {  //rows


                                if (gridCellsArray[k][j].value == 0)
                                    positionToMove = k;
                            }


                            // swap:

                            swapFromTo(i,j,positionToMove,j);

                        }
                    }
                }*/

                break;
            case 'ArrowUp':
                break;
            case 'ArrowDown':
                console.log("►",event);
                break;
        }
    }

    function moveCell(fromCol, fromRow, toCol, toRow, deleteAfter) {

        // TODO: ease
        gridCellsArray[fromCol][fromRow].cell.x = gridCellsArray[toCol][toRow].position.x;
        gridCellsArray[fromCol][fromRow].cell.y = gridCellsArray[toCol][toRow].position.y;

        if (deleteAfter)
        {
            gridContainer.removeChild(gridCellsArray[fromCol][fromRow].cell);
        }
        else
        {
            gridCellsArray[toCol][toRow].cell = gridCellsArray[fromCol][fromRow].cell;
            gridCellsArray[toCol][toRow].value = gridCellsArray[fromCol][fromRow].value;
        }

        gridCellsArray[fromCol][fromRow].cell = null;
        gridCellsArray[fromCol][fromRow].value = 0;
    }

    function concatEqualCells(firstCellCol, firstCellRow,
                              secondCellCol, secondCellRow,
                              moveToCol, moveToRow) {

        const value = gridCellsArray[firstCellCol][firstCellRow].value


        if (moveToCol == undefined && moveToRow == undefined)
        {
            moveToCol = secondCellCol;
            moveToRow = secondCellRow;
        }

        moveCell(firstCellCol, firstCellRow, moveToCol, moveToRow);
        moveCell(secondCellCol, secondCellRow, moveToCol, moveToRow);



        //addCell(value * 2, moveToCol, moveToRow);

        // console.log("► con",firstCellCol, firstCellRow, secondCellCol, secondCellRow);

    }

    addCell(4,0,2);
    addCell(4,2,2);

    addCell(2,1,0);
    addCell(2,1,3);

    function tempCompare(tempArray, celIdx){

        var positionToMove = -1;
        var positionSameValue = -1;

        for (var k = celIdx+1; k < 4; k++) {  //rows

            if (tempArray[k] == tempArray[celIdx] &&
                positionSameValue == -1)
            {
                positionSameValue = k;
            }

            if (tempArray[k] == 0)
            {
                positionToMove = k;
            }


            // TODO: make one if
            if (tempArray[k] != 0 &&
                tempArray[k] !== tempArray[celIdx])
            {
                break;
            }
        }

        console.log("☼ array: ",tempArray);
        console.log("► positionSameValue: ",positionSameValue,", positionToMove:",positionToMove,"\n \n \n _");

    }

    /*tempCompare([2,0,0,2],0);
    tempCompare([2,8,0,2],0);
    tempCompare([0,2,8,2],1);
    tempCompare([0,0,2,0],2);*/
    tempCompare([0,2,2,0],1);

    /*console.log("► start");
    for (var ii = 0; ii < 8; ii++) {  //rows
        console.log("► iteration ",ii);
        if (ii === 5) break;
    }
    console.log("► finish");*/

    animate();

    function animate() {

        renderer.render(stage);
        requestAnimationFrame( animate );
    }

});
