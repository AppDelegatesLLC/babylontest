/**
 * Created by mkahn on 9/25/17.
 */

var canvas = document.getElementById( "renderCanvas" );
var engine = new BABYLON.Engine( canvas, true );


var scene = roomScene3();

engine.runRenderLoop( function () {
    scene.render();
} );

// Resize
window.addEventListener( "resize", function () {
    engine.resize();
} );


