/**
 * Created by mkahn on 9/26/17.
 */

function clampRads( input, limit ) {
    if ( input > 0 && input > limit )
        return limit;

    if ( input < 0 && input < (-limit) )
        return -limit;

    return input;

}

function treeSpriteScene() {
    var scene = new BABYLON.Scene( engine );

    // Change the scene background color to green.
    //scene.clearColor = new BABYLON.Color3( 1, 1, 0 );

    // Create camera and light
    var light = new BABYLON.PointLight( "Point", new BABYLON.Vector3( 5, 10, 5 ), scene );

    //var camera = new BABYLON.ArcRotateCamera( "Camera", 0.1, 0.1, 8, new BABYLON.Vector3( 0, 0, 0 ), scene );
    var camera = new BABYLON.FreeCamera( "camera", new BABYLON.Vector3( 0, 0, -10 ), scene );

    camera.attachControl( canvas, true );
    camera.inertia = 0.9;
    // Clamp the camera before render
    scene.registerBeforeRender( function () {
        console.log( camera.rotation );
        camera.rotation.x = clampRads( camera.rotation.x, 0.25 );
        camera.rotation.y = clampRads( camera.rotation.y, 0.5 );
        camera.rotation.z = clampRads( camera.rotation.z, 0.5 );

    } );

    // Put down the floor
    var ground = BABYLON.Mesh.CreateGround( "ground1", 6, 6, 2, scene );


    // This creates a light - aimed 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight( "light1",
        new BABYLON.Vector3( 0, 1, 0 ), scene );

    // Dim the light a small amount
    light.intensity = .5;

    // Our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere( "sphere1", 16, 2, scene );

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    makeSprites(scene);

    return scene;
}

function makeSprites( scene ) {

    // Create a sprite manager to optimize GPU ressources
    // Parameters : name, imgUrl, capacity, cellSize, scene
    var spriteManagerTrees = new BABYLON.SpriteManager( "treesManager", "app/assets/textures/palm.png", 2000, 800, scene );

    //We create 2000 trees at random positions
    for ( var i = 0; i < 200; i++ ) {
        var tree = new BABYLON.Sprite( "tree", spriteManagerTrees );
        tree.position.x = Math.random() * 10 - 5;
        tree.position.z = Math.random() * 10 - 5;
        tree.isPickable = true;

        //Some "dead" trees
        if ( Math.round( Math.random() * 5 ) === 0 ) {
            tree.angle = Math.PI * 90 / 180;
            tree.position.y = -0.3;
        }
    }

    //Create a manager for the player's sprite animation
    var spriteManagerPlayer = new BABYLON.SpriteManager( "playerManager", "app/assets/textures/player.png", 2, 64, scene );

    // First animated player
    var player = new BABYLON.Sprite( "player", spriteManagerPlayer );
    player.playAnimation( 0, 40, true, 100 );
    player.position.y = -0.3;
    player.size = 0.3;
    player.isPickable = true;

    // Second standing player
    var player2 = new BABYLON.Sprite( "player2", spriteManagerPlayer );
    player2.stopAnimation(); // Not animated
    player2.cellIndex = 2; // Going to frame number 2
    player2.position.y = -0.3;
    player2.position.x = 1;
    player2.size = 0.3;
    player2.invertU = -1; //Change orientation
    player2.isPickable = true;


    // Picking
    //spriteManagerTrees.isPickable = true;
    spriteManagerPlayer.isPickable = true;

    scene.onPointerDown = function ( evt ) {
        var pickResult = scene.pickSprite( this.pointerX, this.pointerY );
        if ( pickResult.hit ) {
            pickResult.pickedSprite.angle += 0.5;
        }
    };

}