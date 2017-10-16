/**
 * Created by mkahn on 9/27/17.
 */
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


function parallaxRoom() {

    const pi = 3.14159;

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene( engine );

    // This creates and positions an free camera
    var camera = new BABYLON.DeviceOrientationCamera( "camera1",
        new BABYLON.Vector3( 0, 2, -10 ), scene );

    // This targets the camera to scene origin
    camera.setTarget( new BABYLON.Vector3.Zero() );

    // This attaches the camera to the canvas
    //camera.attachControl( canvas, true );
    camera.angularSensibility = 10000;
    camera.moveSensibility = 10000;

    // This creates a light - aimed 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight( "light1",
        new BABYLON.Vector3( 0, 3, 0 ), scene );

    light.intensity = 2.0;

    // Our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere( "sphere1", 16, 2, scene );

    var materialSphere4 = new BABYLON.StandardMaterial( "texture4", scene );
    materialSphere4.diffuseTexture = new BABYLON.Texture( "app/assets/textures/ornament.jpg", scene );
    materialSphere4.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
    materialSphere4.diffuseTexture.uOffset = 0.4;//Horizontal offset of 40%
    sphere.material = materialSphere4;
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.  Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround( "ground1", 60, 60, 2, scene );

    var materialWood = new BABYLON.StandardMaterial( "wood", scene );
    materialWood.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cartoonwood.jpg", scene );
    materialWood.diffuseTexture.uScale = 20;
    materialWood.diffuseTexture.vScale = 20;

    var materialWoodWall = new BABYLON.StandardMaterial( "woodwall", scene );
    materialWoodWall.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cartoonwoodlt.jpg", scene );
    materialWoodWall.diffuseTexture.uScale = 10;
    materialWoodWall.diffuseTexture.vScale = 10;
    materialWoodWall.diffuseTexture.wAng = -pi / 4;

    var leftWall = BABYLON.Mesh.CreateDisc( "lwall", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    leftWall.rotation.z = pi / 4;
    leftWall.rotation.y = -pi / 2;  // around vertical axis
    leftWall.position.x = -6; // left-right
    leftWall.position.z = 0; // in-out
    leftWall.position.y = 2;
    leftWall.material = materialWoodWall;

    var backWall = BABYLON.Mesh.CreateDisc( "bwall", 10, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    backWall.rotation.z = pi / 4;
    backWall.rotation.y = 0;
    backWall.position.x = 0;
    backWall.position.z = 4;
    backWall.position.y = 2;
    backWall.material = materialWoodWall;

    var rightWall = BABYLON.Mesh.CreateDisc( "rwall", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    rightWall.rotation.z = pi / 4;
    rightWall.rotation.y = pi / 2;
    rightWall.position.x = 6;
    rightWall.position.z = 0;
    rightWall.position.y = 2;
    rightWall.material = materialWoodWall;

    var leftCeil = BABYLON.Mesh.CreateDisc( "lceil", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    leftCeil.rotation.z = pi / 4;
    leftCeil.rotation.y = -pi / 2;  // around vertical axis
    leftCeil.rotation.x = -pi / 4;
    leftCeil.position.x = -6; // left-right
    leftCeil.position.z = 0; // in-out
    leftCeil.position.y = 3; // up-down
    leftCeil.material = materialWood;

    var rtCeil = BABYLON.Mesh.CreateDisc( "rceil", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    rtCeil.rotation.z = pi / 4;
    rtCeil.rotation.y = pi / 2;  // around vertical axis
    rtCeil.rotation.x = -pi / 4;
    rtCeil.position.x = 6; // left-right
    rtCeil.position.z = 0; // in-out
    rtCeil.position.y = 3; // up-down
    rtCeil.material = materialWood;

    ground.material = materialWood;

    var spriteManagerTrees = new BABYLON.SpriteManager( "treesManager", "app/assets/textures/tree.png", 10, 200, scene );

    //We create 2000 trees at random positions
    for ( var i = 0; i < 10; i++ ) {
        var tree = new BABYLON.Sprite( "tree", spriteManagerTrees );
        tree.position.x = Math.random() * 5 - 2.5;
        tree.position.z = Math.random() * 5 - 8;
        tree.position.y = 1;
        tree.isPickable = true;
    }

    var bobManager = new BABYLON.SpriteManager( "bobManager", "app/assets/textures/bob.png", 10, 229, scene );
    var bob = new BABYLON.Sprite( "bob", bobManager );
    bob.position.x = 2
    bob.position.z = 2;
    bob.position.y = 1;
    bob.size = 2.0;
    bob.isPickable = true;

    // camera.attachControl( canvas, true );
    camera.inertia = 0.9;

    var camX = 0.02;
    // Clamp the camera before render
    scene.registerBeforeRender( function () {
        //console.log( camera.rotation );
        camera.rotation.x = clampRads( camera.rotation.x, 0.25 );
        camera.rotation.y = clampRads( camera.rotation.y, 0.5 );
        camera.rotation.z = clampRads( camera.rotation.z, 0.5 );

        camera.position.x += camX;
        if (camera.position.x > 5 || camera.position.x < -5 ) {
            camX *= -1;
        }


    } );

    scene.onPointerDown = function ( evt ) {
        var pickResult = scene.pickSprite( this.pointerX, this.pointerY );
        if ( pickResult.hit ) {
            pickResult.pickedSprite.angle += 0.5;
        }
    };

    return scene;


}

