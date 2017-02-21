

/** TODO:
 - Provide here CSS
 - Make ES6 classes
 - Make rows and cols amount dynamically
 - Connect Ease JS
 - Make linear array
 - Cells graphic to aanchor
 - Delete notEmptyCellsArray
 */








//init













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

    notEmptyCellsArray.push({i:row,j:col});

    cellContainer.addChild(cellGraphics);
    cellContainer.addChild(richText);

    gridContainer.addChild(cellContainer);

}

function shiftFingeringOperation( start_i, inc_i, loop_cond_i,
                                  start_j, inc_j, loop_cond_j,
                                  start_k, inc_k, loop_cond_k )
{
    var turnPerformed;

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

                if (positionSameValue != -1 || positionToMove != -1)
                    turnPerformed = true;

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

    return turnPerformed;
}

function makeShift(direction) {

    if (['turnRight','turnLeft','turnUp','turnDown'].indexOf(direction) == -1)
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

        case 'turnRight':

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

        case 'turnLeft':

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

        case 'turnUp':

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

        case 'turnDown':

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

    if ( shiftFingeringOperation( start_i, inc_i, loop_cond_i,
            start_j, inc_j, loop_cond_j,
            start_k, inc_k, loop_cond_k ) )
    {
        turnAddCells();
    }


}

function turnAddCells() {

    const amount = Math.random() > 0.5 ? 1 : 2;
    const emptyCellsArray = [];

    for (var i = 0; i<4; i++)
        for (var j = 0; j<4; j++)
            if (gridCellsArray[i][j].value == 0)
                emptyCellsArray.push({i:i, j:j});

    if (emptyCellsArray.length == 0) return; // END OF GAME!!!!!!!

    for (i = 0; i < amount; i++)
    {
        const randomIdx = parseInt(Math.random()*emptyCellsArray.length);

        const valueToAdd = Math.random() > 0.5 ? 2 : 4;

        addCell(valueToAdd,emptyCellsArray[randomIdx].i,emptyCellsArray[randomIdx].j)

        emptyCellsArray.splice(randomIdx,1);
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

        notEmptyCellsArray.push({i:toCol,j:toRow});
    }

    gridCellsArray[fromCol][fromRow].cell = null;
    gridCellsArray[fromCol][fromRow].value = 0;

    notEmptyCellsArray.slice(notEmptyCellsArray.indexOf({}))
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

}

/*// row3
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
 addCell(2,3,3);*/

turnAddCells();

animate();

/*function propertyFromStylesheet(selector, attribute) {
 var value;

 [].some.call(document.styleSheets, function (sheet) {
 return [].some.call(sheet.rules, function (rule) {
 if (selector === rule.selectorText) {
 return [].some.call(rule.style, function (style) {
 if (attribute === style) {
 value = rule.style.getPropertyValue(attribute);
 return true;
 }

 return false;
 });
 }

 return false;
 });
 });

 return value;
 }

 console.log("► prop",propertyFromStylesheet(".heading", "clear"));*/

/*function getStyle(className) {
 var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
 for (var x = 0; x < classes.length; x++) {
 if (classes[x].selectorText == className) {
 (classes[x].cssText) ? alert(classes[x].cssText) : alert(classes[x].style.cssText);
 }
 }
 }

 console.log("► prop",getStyle(".heading"));*/


