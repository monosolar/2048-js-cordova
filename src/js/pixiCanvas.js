//import {PIXI} from './libs/pixi.min';

var stage = new PIXI.Stage(0x66FF99);

var renderer = PIXI.autoDetectRenderer(400, 300);

document.body.appendChild(renderer.view);

//requestAnimFrame( animate );

var texture = PIXI.Texture.fromImage("bunny.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

function animate() {

    requestAnimFrame( animate );

    // just for fun, lets rotate mr rabbit a little
    bunny.rotation += 0.1;

    // render the stage
    renderer.render(stage);
}