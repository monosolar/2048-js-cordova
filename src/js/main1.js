define(function (require) {
    /** TODO:
     - Provide here CSS
     - Make ES6 classes
     - Connect Ease JS
     - Make linear array
     - Cells graphic to aanchor
    */

    const HORIZONTAL = 'HORIZONTAL';
    const VERTICAL = 'VERTICAL';

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

            const gap = 10;
            const cellSize = (500/4) - gap*1.33;

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

        gridContainer.addChild(cellContainer);

    }

    function shiftFingeringOperation( start_i, inc_i, loop_cond_i,
                                      start_j, inc_j, loop_cond_j,
                                      start_k, inc_k, loop_cond_k )
    {
        var direct = (start_i == 0) ? VERTICAL : HORIZONTAL;

        for (var j = start_j; loop_cond_j(j); j += inc_j) {

            for (var i = start_i; loop_cond_i(i); i += inc_i) {

                if(gridCellsArray[i][j].value != 0)
                {

                    var positionToMove = -1;
                    var positionSameValue = -1;

                    const d_inc = (direct == HORIZONTAL) ? i : j;

                    for ( var k = start_k(d_inc); loop_cond_k(k); k += inc_k ) {

                        const k_cell = (direct == HORIZONTAL) ? gridCellsArray[k][j] : gridCellsArray[i][k];

                        if (k_cell.value == gridCellsArray[i][j].value &&
                            positionSameValue == -1)
                        {
                            positionSameValue = k;
                            positionToMove = k;
                            break;
                        }
                        else

                        if (k_cell.value == 0)
                        {
                            positionToMove = k;
                        }

                        else
                            break;
                    }

                    const positionSameValueDualArray = (direct == HORIZONTAL) ? [positionSameValue,j] :  [i,positionSameValue] ;
                    const positionToMoveDualArray = (direct == HORIZONTAL) ? [positionToMove,j] : [i,positionToMove] ;

                    // concat:
                    if (positionSameValue != -1)
                    {
                        if (positionToMove != -1)
                            concatEqualCells(i,j,positionSameValueDualArray[0],positionSameValueDualArray[1],
                                                 positionToMoveDualArray[0],positionToMoveDualArray[1])
                        else
                            concatEqualCells(i,j,positionSameValueDualArray[0],positionSameValueDualArray[1]);
                    }
                    else
                    // move:
                    if (positionToMove != -1)
                    {
                        moveCell(i,j,positionToMoveDualArray[0],positionToMoveDualArray[1]);
                    }

                }
            }
        }
    }

    function getDirectValue(direction, value) {
        if (direction == HORIZONTAL)
            return -1;
        else
            return value;

    }

    function makeShift(direction) {

        if (['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].indexOf(direction) == -1)
            return;

        var start_i;
        var inc_i;
        var loop_cond_i;

        var start_j;
        var inc_j;
        var loop_cond_j;

        var start_k;
        var inc_k;
        var loop_cond_k;

        switch (direction){

            case 'ArrowRight':

                start_i = 2;
                inc_i = -1;
                loop_cond_i = function(i){ return i >= 0};

                start_j = 0;
                inc_j = 1;
                loop_cond_j = function(j){ return j < 4};

                start_k = function(i){return i+1};
                inc_k = 1;
                loop_cond_k = function(k){return k <4};

                break;

            case 'ArrowLeft':

                start_i = 1;
                inc_i = 1;
                loop_cond_i = function(i){return i < 4};

                start_j = 0;
                inc_j = 1;
                loop_cond_j = function(j){ return j < 4};

                start_k = function(i){return i-1};
                inc_k = -1;
                loop_cond_k = function(k){return k >= 0};

                break;

            case 'ArrowUp':

                start_j = 1;
                inc_j = 1;
                loop_cond_j = function(j){return j < 4};

                start_i = 0;
                inc_i = 1;
                loop_cond_i = function(i){ return i < 4};

                start_k = function(j){return j-1};
                inc_k = -1;
                loop_cond_k = function(k){return k >= 0};

                break;

            case 'ArrowDown':

                start_j = 2;
                inc_j = -1;
                loop_cond_j = function(j){ return j >= 0};

                start_i = 0;
                inc_i = 1;
                loop_cond_i = function(i){ return i < 4};

                start_k = function(i){return i+1};
                inc_k = 1;
                loop_cond_k = function(k){return k <4};

                break;
        }

        shiftFingeringOperation( start_i, inc_i, loop_cond_i,
                                 start_j, inc_j, loop_cond_j,
                                 start_k, inc_k, loop_cond_k )
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

        const concatedValue = gridCellsArray[firstCellCol][firstCellRow].value * 2;


        if (moveToCol == undefined && moveToRow == undefined)
        {
            moveToCol = secondCellCol;
            moveToRow = secondCellRow;
        }

        moveCell(firstCellCol, firstCellRow, moveToCol, moveToRow, true);
        moveCell(secondCellCol, secondCellRow, moveToCol, moveToRow, true);
        addCell(concatedValue,moveToCol,moveToRow);


        //addCell(value * 2, moveToCol, moveToRow);

        // console.log("► con",firstCellCol, firstCellRow, secondCellCol, secondCellRow);

    }

    // row3
    addCell(4,0,2);
    addCell(8,1,2);
    addCell(8,2,2);
    addCell(4,3,2);


    // row1
    addCell(2,0,0);
    addCell(2,1,0);
    addCell(16,2,0);
    addCell(32,3,0);


    // row 4
    addCell(2,0,3);
    addCell(2,1,3);
    //addCell(2,2,3);
    addCell(2,3,3);



    function unitTestCompare(tempArray, celIdx){

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

    }

    /*unitTestCompare([2,0,0,2],0);
     unitTestCompare([2,8,0,2],0);
     unitTestCompare([0,2,8,2],1);
     unitTestCompare([0,0,2,0],2);
     unitTestCompare([0,2,2,0],1);*/

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
