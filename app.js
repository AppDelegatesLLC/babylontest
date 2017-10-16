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



function ballAndFloorScene() {

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene( engine );

    // This creates and positions an free camera
    var camera = new BABYLON.FreeCamera( "camera1",
        new BABYLON.Vector3( 0, 1, -10 ), scene );

    // This targets the camera to scene origin
    camera.setTarget( new BABYLON.Vector3.Zero() );

    // This attaches the camera to the canvas
    camera.attachControl( canvas, false );

    // This creates a light - aimed 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight( "light1",
        new BABYLON.Vector3( 0, 1, 0 ), scene );

    // Dim the light a small amount
    light.intensity = .5;

    // Our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere( "sphere1", 16, 2, scene );

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.  Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround( "ground1", 60, 60, 2, scene );

    // Leave this function
    return scene;

}

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


function roomScene() {

    const pi = 3.14159;

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene( engine );

    // This creates and positions an free camera
    var camera = new BABYLON.DeviceOrientationCamera( "camera1",
        new BABYLON.Vector3( 0, 2, -10 ), scene );

    // This targets the camera to scene origin
    camera.setTarget( new BABYLON.Vector3.Zero() );

    // This attaches the camera to the canvas
    camera.attachControl( canvas, true );
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
    leftCeil.rotation.x = -pi/4;
    leftCeil.position.x = -6; // left-right
    leftCeil.position.z = 0; // in-out
    leftCeil.position.y = 3; // up-down
    leftCeil.material = materialWood;

    var rtCeil = BABYLON.Mesh.CreateDisc( "rceil", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    rtCeil.rotation.z = pi / 4;
    rtCeil.rotation.y = pi/2;  // around vertical axis
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
    // Clamp the camera before render
    scene.registerBeforeRender( function () {
        //console.log( camera.rotation );
        camera.rotation.x = clampRads( camera.rotation.x, 0.25 );
        camera.rotation.y = clampRads( camera.rotation.y, 0.5 );
        camera.rotation.z = clampRads( camera.rotation.z, 0.5 );

    } );

    scene.onPointerDown = function ( evt ) {
        var pickResult = scene.pickSprite( this.pointerX, this.pointerY );
        if ( pickResult.hit ) {
            pickResult.pickedSprite.angle += 0.5;
        }
    };

    return scene;


}


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


function roomScene2() {

    const pi = 3.14159;

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene( engine );

    // This creates and positions an free camera
    var camera = new BABYLON.DeviceOrientationCamera( "camera1",
        new BABYLON.Vector3( 0, 2, -7 ), scene );

    // var camera = new BABYLON.FreeCamera( "camera1",
    //     new BABYLON.Vector3( 0, 2, -8 ), scene );

    // This targets the camera to scene origin
    camera.setTarget( new BABYLON.Vector3.Zero() );

    // This attaches the camera to the canvas
    camera.attachControl( canvas, true );
    camera.angularSensibility = 10000;
    camera.moveSensibility = 10000;

    // This creates a light - aimed 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight( "light1",
        new BABYLON.Vector3( 0, 3, 0 ), scene );

    light.intensity = 2.0;

    // Our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere( "sphere1", 16, 1, scene );

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

    ground.material = materialWood;

    var materialWoodWall = new BABYLON.StandardMaterial( "woodwall", scene );
    materialWoodWall.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cartoonwoodlt.jpg", scene );
    materialWoodWall.diffuseTexture.uScale = 10;
    materialWoodWall.diffuseTexture.vScale = 10;
    materialWoodWall.diffuseTexture.wAng = -pi / 4;

    var materialWoodWall2 = new BABYLON.StandardMaterial( "woodwall2", scene );
    materialWoodWall2.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cartoonwoodlt.jpg", scene );
    materialWoodWall2.diffuseTexture.uScale = 10;
    materialWoodWall2.diffuseTexture.vScale = 10;
    materialWoodWall2.diffuseTexture.wAng = -pi / 2;
    materialWoodWall2.backFaceCulling = false;


    var leftWall = BABYLON.Mesh.CreateDisc( "lwall", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    leftWall.rotation.z = pi / 4;
    leftWall.rotation.y = -pi / 2;  // around vertical axis
    leftWall.position.x = -6; // left-right
    leftWall.position.z = 0; // in-out
    leftWall.position.y = 2;
    leftWall.material = materialWoodWall;

    // var backWall = BABYLON.Mesh.CreateDisc( "bwall", 10, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    // backWall.rotation.z = pi / 4;
    // backWall.rotation.y = 0;
    // backWall.position.x = 0;
    // backWall.position.z = 4;
    // backWall.position.y = 2;
    // backWall.material = materialWoodWall;

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

    var wmat = new BABYLON.StandardMaterial( "sourceMat", scene );
    wmat.wireframe = true;
    wmat.backFaceCulling = false;

    var wall = BABYLON.Mesh.CreateBox( 'wallLeft', 4, scene );
    wall.scaling.z = 0.25;
    wall.scaling.y = 4;
    wall.scaling.x = 4;
    wall.position.y = 4.5;
    wall.material = wmat;


    var window = BABYLON.Mesh.CreateBox( 'window', 1, scene );
    window.scaling.z = 1;
    window.scaling.y = 2;
    window.scaling.x = 3;
    window.position.y = 2.5;
    window.position.x = -1;
    window.material = wmat;

    var door = BABYLON.Mesh.CreateBox( 'door', 1, scene );
    door.scaling.z = 1;
    door.scaling.y = 3.5;
    door.scaling.x = 2;
    door.position.y = 1.5;
    door.position.x = -3;
    door.material = wmat;

    var wallCSG = BABYLON.CSG.FromMesh( wall );
    var windowCSG = BABYLON.CSG.FromMesh( window );
    var doorCSG = BABYLON.CSG.FromMesh( door );

    var wwwMesh = wallCSG.subtract( windowCSG ).toMesh( 'www', materialWoodWall2, scene );
    wwwMesh.position.z = 8;

    var wwwMeshBack = wallCSG.subtract( doorCSG ).toMesh( 'wwwd', materialWoodWall2, scene );
    wwwMeshBack.position.z = -10;


    wall.dispose();
    window.dispose();
    door.dispose();

    var materialSanta = new BABYLON.StandardMaterial( "coke", scene );
    materialSanta.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cokelore_santa_1951.jpg", scene );
    materialSanta.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
    materialSanta.diffuseTexture.uOffset = 0;//Horizontal offset of 40%

    var painting = BABYLON.Mesh.CreateBox( 'painting', 1, scene );
    painting.scaling.z = 0.1;
    painting.scaling.y = 2;
    painting.scaling.x = 2;
    painting.position.y = 1.5;
    painting.position.x = 6;
    painting.rotation.y = Math.PI / 2;
    painting.material = materialSanta;

    var tkmat = new BABYLON.StandardMaterial( "tk", scene );
    tkmat.diffuseTexture = new BABYLON.Texture( "app/assets/textures/tkincade.jpg", scene );
    tkmat.diffuseTexture.vOffset = 0;//Vertical offset of 10%
    tkmat.diffuseTexture.uOffset = 0;//Horizontal offset of 40%
    var thomas = painting.clone( 'tom' );
    thomas.material = tkmat;
    thomas.rotation.y = -Math.PI / 2;
    thomas.position.x = -6;
    thomas.position.z = 2;

    var mmat = new BABYLON.StandardMaterial( "mm", scene );
    mmat.diffuseTexture = new BABYLON.Texture( "app/assets/textures/metallica.jpg", scene );
    mmat.diffuseTexture.vOffset = 0;//Vertical offset of 10%
    mmat.diffuseTexture.uOffset = 0;//Horizontal offset of 40%
    var met = painting.clone( 'met' );
    met.material = mmat;
    met.rotation.y = Math.PI;
    met.position.x = 3;
    met.position.z = -9.5;


    // Fountain object
    var fountain = BABYLON.Mesh.CreateBox( "foutain", 1.0, scene );
    fountain.position.y = 5;
    fountain.position.z = 10;
    fountain.position.x = -1;

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem( "particles", 2000, scene );

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture( "app/assets/textures/snowflake.png", scene );

    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3( -1, 0, 0 ); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3( 1, 0, 0 ); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4( 0.7, 0.8, 1.0, 1.0 );
    particleSystem.color2 = new BABYLON.Color4( 0.2, 0.5, 1.0, 1.0 );
    particleSystem.colorDead = new BABYLON.Color4( 0, 0, 0.2, 1.0 );

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.35;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 1.3;
    particleSystem.maxLifeTime = 2.5;

    // Emission rate
    particleSystem.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3( 0, -5.81, 0 );

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3( -1, -1, 0 );
    particleSystem.direction2 = new BABYLON.Vector3( 1, -1, 3 );

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();


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
    bob.position.x = -2
    bob.position.z = 3;
    bob.position.y = 1;
    bob.size = 2.5;
    bob.isPickable = true;

    // camera.attachControl( canvas, true );
    camera.inertia = 0.9;
    // Clamp the camera before render
    scene.registerBeforeRender( function () {
        //console.log( camera.rotation );
        camera.rotation.x = clampRads( camera.rotation.x, 0.25 );
        camera.rotation.y = clampRads( camera.rotation.y, 0.5 );
        camera.rotation.z = clampRads( camera.rotation.z, 0.5 );
    } );

    scene.onPointerDown = function ( evt ) {
        var pickResult = scene.pickSprite( this.pointerX, this.pointerY );
        if ( pickResult.hit ) {
            pickResult.pickedSprite.angle += 0.5;
        }
    };

    return scene;


}


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

function makeToySprite( name, scene ) {

    return new BABYLON.SpriteManager( "sm" + name, "app/assets/textures/toy - " + name + ".png", 10, 1024, scene );

}

function roomScene3() {

    const pi = Math.PI;

    // This creates a Babylon Scene object (not a shape/mesh)
    var scene = new BABYLON.Scene( engine );

    // This creates and positions an free camera
    var camera = new BABYLON.DeviceOrientationCamera( "camera1",
        new BABYLON.Vector3( 0, 2, -7 ), scene );

    // var camera = new BABYLON.FreeCamera( "camera1",
    //     new BABYLON.Vector3( 0, 2, -8 ), scene );

    // This targets the camera to scene origin
    camera.setTarget( new BABYLON.Vector3.Zero() );

    // This attaches the camera to the canvas
    camera.attachControl( canvas, true );
    camera.angularSensibility = 10000;
    camera.moveSensibility = 10000;

    // This creates a light - aimed 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight( "light1",
        new BABYLON.Vector3( 0, 3, 0 ), scene );

    light.intensity = 2.0;

    // Our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    // var sphere = BABYLON.Mesh.CreateSphere( "sphere1", 16, 1, scene );
    //
    // var materialSphere4 = new BABYLON.StandardMaterial( "texture4", scene );
    // materialSphere4.diffuseTexture = new BABYLON.Texture( "app/assets/textures/ornament.jpg", scene );
    // materialSphere4.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
    // materialSphere4.diffuseTexture.uOffset = 0.4;//Horizontal offset of 40%
    // sphere.material = materialSphere4;
    // // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape.  Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround( "ground1", 60, 60, 2, scene );

    var materialWood = new BABYLON.StandardMaterial( "wood", scene );
    materialWood.diffuseTexture = new BABYLON.Texture( "app/assets/textures/red wall.png", scene );
    materialWood.diffuseTexture.uScale = 20;
    materialWood.diffuseTexture.vScale = 20;

    ground.material = materialWood;

    var materialWoodWall = new BABYLON.StandardMaterial( "woodwall", scene );
    materialWoodWall.diffuseTexture = new BABYLON.Texture( "app/assets/textures/brown wall.png", scene );
    materialWoodWall.diffuseTexture.uScale = 4;
    materialWoodWall.diffuseTexture.vScale = 4;
    materialWoodWall.diffuseTexture.wAng = -pi / 4;

    var materialWoodWall2 = new BABYLON.StandardMaterial( "woodwall2", scene );
    materialWoodWall2.diffuseTexture = new BABYLON.Texture( "app/assets/textures/brown wall.png", scene );
    materialWoodWall2.diffuseTexture.uScale = 2;
    materialWoodWall2.diffuseTexture.vScale = 2;
    materialWoodWall2.diffuseTexture.wAng = pi;
    materialWoodWall2.backFaceCulling = false;


    var leftWall = BABYLON.Mesh.CreateDisc( "lwall", 16, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    leftWall.rotation.z = pi / 4;
    leftWall.rotation.y = -pi / 2;  // around vertical axis
    leftWall.position.x = -6; // left-right
    leftWall.position.z = 0; // in-out
    leftWall.position.y = 2;
    leftWall.material = materialWoodWall;

    // var backWall = BABYLON.Mesh.CreateDisc( "bwall", 10, 4, scene, false, BABYLON.Mesh.DEFAULTSIDE );
    // backWall.rotation.z = pi / 4;
    // backWall.rotation.y = 0;
    // backWall.position.x = 0;
    // backWall.position.z = 4;
    // backWall.position.y = 2;
    // backWall.material = materialWoodWall;

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

    var wmat = new BABYLON.StandardMaterial( "sourceMat", scene );
    wmat.wireframe = true;
    wmat.backFaceCulling = false;

    var wall = BABYLON.Mesh.CreateBox( 'wallLeft', 4, scene );
    wall.scaling.z = 0.25;
    wall.scaling.y = 4;
    wall.scaling.x = 4;
    wall.position.y = 4.5;
    wall.material = wmat;


    var window = BABYLON.Mesh.CreateBox( 'window', 1, scene );
    window.scaling.z = 1;
    window.scaling.y = 2;
    window.scaling.x = 3;
    window.position.y = 2.5;
    window.position.x = -1;
    window.material = wmat;

    var door = BABYLON.Mesh.CreateBox( 'door', 1, scene );
    door.scaling.z = 1;
    door.scaling.y = 3.5;
    door.scaling.x = 2;
    door.position.y = 1.5;
    door.position.x = -3;
    door.material = wmat;

    var wallCSG = BABYLON.CSG.FromMesh( wall );
    var windowCSG = BABYLON.CSG.FromMesh( window );
    var doorCSG = BABYLON.CSG.FromMesh( door );

    var wwwMesh = wallCSG.subtract( windowCSG ).toMesh( 'www', materialWoodWall2, scene );
    wwwMesh.position.z = 8;

    var wwwMeshBack = wallCSG.subtract( doorCSG ).toMesh( 'wwwd', materialWoodWall2, scene );
    wwwMeshBack.position.z = -10;


    wall.dispose();
    window.dispose();
    door.dispose();

    var materialSanta = new BABYLON.StandardMaterial( "coke", scene );
    materialSanta.diffuseTexture = new BABYLON.Texture( "app/assets/textures/cokelore_santa_1951.jpg", scene );
    materialSanta.diffuseTexture.vOffset = 0.1;//Vertical offset of 10%
    materialSanta.diffuseTexture.uOffset = 0;//Horizontal offset of 40%

    var painting = BABYLON.Mesh.CreateBox( 'painting', 1, scene );
    painting.scaling.z = 0.1;
    painting.scaling.y = 2;
    painting.scaling.x = 2;
    painting.position.y = 1.5;
    painting.position.x = 6;
    painting.rotation.y = Math.PI / 2;
    painting.material = materialSanta;

    var tkmat = new BABYLON.StandardMaterial( "tk", scene );
    tkmat.diffuseTexture = new BABYLON.Texture( "app/assets/textures/red elf.png", scene );
    tkmat.opacityTexture = new BABYLON.Texture( "app/assets/textures/redelfopw.png", scene );
    tkmat.opacityTexture.getAlphaFromRGB = true;
    tkmat.diffuseTexture.vOffset = 0;//Vertical offset of 10%
    tkmat.diffuseTexture.uOffset = 0;//Horizontal offset of 40%
    var thomas = painting.clone( 'tom' );
    thomas.material = tkmat;
    thomas.rotation.y = -Math.PI / 2;
    thomas.position.x = -4;
    thomas.position.z = 2;

    var mmat = new BABYLON.StandardMaterial( "mm", scene );
    mmat.diffuseTexture = new BABYLON.Texture( "app/assets/textures/metallica.jpg", scene );
    mmat.diffuseTexture.vOffset = 0;//Vertical offset of 10%
    mmat.diffuseTexture.uOffset = 0;//Horizontal offset of 40%
    var met = painting.clone( 'met' );
    met.material = mmat;
    met.rotation.y = Math.PI;
    met.position.x = 3;
    met.position.z = -9.5;


    // Fountain object
    var fountain = BABYLON.Mesh.CreateBox( "foutain", 1.0, scene );
    fountain.position.y = 5;
    fountain.position.z = 10;
    fountain.position.x = -1;

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem( "particles", 2000, scene );

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture( "app/assets/textures/snowflake.png", scene );

    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3( -1, 0, 0 ); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3( 1, 0, 0 ); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4( 0.7, 0.8, 1.0, 1.0 );
    particleSystem.color2 = new BABYLON.Color4( 0.2, 0.5, 1.0, 1.0 );
    particleSystem.colorDead = new BABYLON.Color4( 0, 0, 0.2, 1.0 );

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.35;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 1.3;
    particleSystem.maxLifeTime = 2.5;

    // Emission rate
    particleSystem.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3( 0, -5.81, 0 );

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3( -1, -1, 0 );
    particleSystem.direction2 = new BABYLON.Vector3( 1, -1, 3 );

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();


    var spriteManagerTrees = new BABYLON.SpriteManager( "treesManager", "app/assets/textures/tree.png", 10, 200, scene );
    var toys = [ "ball", "doll", "duck", "elf blue", "elf yellow", "helicopter", "top", "train" ];
    var toySMs = toys.map( function ( name ) {
        return makeToySprite( name, scene );
    } );

    var toySprites = [];

    for ( var i = 0; i < 30; i++ ) {
        var t = new BABYLON.Sprite( "t" + i, _.sample( toySMs ) );
        t.position.x = Math.random() * 5;
        t.position.z = Math.random() * 8;
        t.position.y = 0.5;
        t.size = 1.0;
        t.isPickable = true;
        toySprites.push( t );
    }

    for ( var i = 0; i < 10; i++ ) {
        var tree = new BABYLON.Sprite( "tree", spriteManagerTrees );
        tree.position.x = Math.random() * -5;
        tree.position.z = Math.random() * 4.5;
        tree.position.y = 0.5;
        tree.isPickable = true;
    }

    var bobManager = new BABYLON.SpriteManager( "bobManager", "app/assets/textures/reindeerbob.png", 10, 1024, scene );
    var bob = new BABYLON.Sprite( "bob", bobManager );
    bob.position.x = 4;
    bob.position.z = -1;
    bob.position.y = 1;
    bob.size = 2.5;
    bob.isPickable = true;

    var bobManager2 = new BABYLON.SpriteManager( "bobManager2", "app/assets/textures/reindeerbob2.png", 10, 1024, scene );
    var bob2 = new BABYLON.Sprite( "bob2", bobManager2 );
    bob2.position.x = -2;
    bob2.position.z = -1;
    bob2.position.y = 1;
    bob2.size = 2.5;
    bob2.isPickable = true;

    var elfmgr = new BABYLON.SpriteManager( "efmg", "app/assets/textures/elf - yellow.png", 10, 1024, scene );
    var elf = new BABYLON.Sprite( "bob2a", elfmgr );
    elf.position.x = 3;
    elf.position.z = -8;
    elf.position.y = 1.2;
    elf.size = 2.5;
    elf.isPickable = true;

    var elfmgr2 = new BABYLON.SpriteManager( "efmg", "app/assets/textures/red elf.png", 10, 1024, scene );
    var elf2 = new BABYLON.Sprite( "bob2b", elfmgr2 );
    elf2.position.x = -4;
    elf2.position.z = -4;
    elf2.position.y = 1.2;
    elf2.size = 2.5;
    elf2.isPickable = true;

    // camera.attachControl( canvas, true );
    camera.inertia = 0.9;

    var bob2Idx = 0.01;

    // Clamp the camera before render
    scene.registerBeforeRender( function () {
        //console.log( camera.rotation );
        camera.rotation.x = clampRads( camera.rotation.x, 0.25 );
        camera.rotation.y = clampRads( camera.rotation.y, 3.5 );
        camera.rotation.z = clampRads( camera.rotation.z, 0.5 );

        bob2.position.x += bob2Idx;
        if ( bob2.position.x > 3 || bob2.position.x < -4 ) {
            bob2Idx *= -1;
        }

        _.sample( toySprites ).position.x += ( Math.random() * 0.1 - 0.05 );
        _.sample( toySprites ).position.z += ( Math.random() * 0.1 - 0.05 );

    } );

    scene.onPointerDown = function ( evt ) {
        var pickResult = scene.pickSprite( this.pointerX, this.pointerY );
        if ( pickResult.hit ) {
            pickResult.pickedSprite.angle += 0.5;
        }
    };

    return scene;


}


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NhbXBsZS5qcyIsImpzL1NhbXBsZVNjZW5lcy9iYWxsYW5kZmxvb3IuanMiLCJqcy9TYW1wbGVTY2VuZXMvcGFyYWxsYXhSb29tLmpzIiwianMvU2FtcGxlU2NlbmVzL3Jvb21TY2VuZS5qcyIsImpzL1NhbXBsZVNjZW5lcy9yb29tU2NlbmUyLmpzIiwianMvU2FtcGxlU2NlbmVzL3Jvb21TY2VuZTMuanMiLCJqcy9TYW1wbGVTY2VuZXMvdHJlZVNwcml0ZVNjZW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG1rYWhuIG9uIDkvMjUvMTcuXG4gKi9cblxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBcInJlbmRlckNhbnZhc1wiICk7XG52YXIgZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKCBjYW52YXMsIHRydWUgKTtcblxuXG52YXIgc2NlbmUgPSByb29tU2NlbmUzKCk7XG5cbmVuZ2luZS5ydW5SZW5kZXJMb29wKCBmdW5jdGlvbiAoKSB7XG4gICAgc2NlbmUucmVuZGVyKCk7XG59ICk7XG5cbi8vIFJlc2l6ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBlbmdpbmUucmVzaXplKCk7XG59ICk7XG5cblxuIiwiZnVuY3Rpb24gYmFsbEFuZEZsb29yU2NlbmUoKSB7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSBCYWJ5bG9uIFNjZW5lIG9iamVjdCAobm90IGEgc2hhcGUvbWVzaClcbiAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSggZW5naW5lICk7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhbiBmcmVlIGNhbWVyYVxuICAgIHZhciBjYW1lcmEgPSBuZXcgQkFCWUxPTi5GcmVlQ2FtZXJhKCBcImNhbWVyYTFcIixcbiAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMSwgLTEwICksIHNjZW5lICk7XG5cbiAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgICBjYW1lcmEuc2V0VGFyZ2V0KCBuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSApO1xuXG4gICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCggY2FudmFzLCBmYWxzZSApO1xuXG4gICAgLy8gVGhpcyBjcmVhdGVzIGEgbGlnaHQgLSBhaW1lZCAwLDEsMCAtIHRvIHRoZSBza3kuXG4gICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodCggXCJsaWdodDFcIixcbiAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMSwgMCApLCBzY2VuZSApO1xuXG4gICAgLy8gRGltIHRoZSBsaWdodCBhIHNtYWxsIGFtb3VudFxuICAgIGxpZ2h0LmludGVuc2l0eSA9IC41O1xuXG4gICAgLy8gT3VyIGJ1aWx0LWluICdzcGhlcmUnIHNoYXBlLiBQYXJhbXM6IG5hbWUsIHN1YmRpdmlzaW9ucywgc2l6ZSwgc2NlbmVcbiAgICB2YXIgc3BoZXJlID0gQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZSggXCJzcGhlcmUxXCIsIDE2LCAyLCBzY2VuZSApO1xuXG4gICAgLy8gTW92ZSB0aGUgc3BoZXJlIHVwd2FyZCAxLzIgaXRzIGhlaWdodFxuICAgIHNwaGVyZS5wb3NpdGlvbi55ID0gMTtcblxuICAgIC8vIE91ciBidWlsdC1pbiAnZ3JvdW5kJyBzaGFwZS4gIFBhcmFtczogbmFtZSwgd2lkdGgsIGRlcHRoLCBzdWJkaXZzLCBzY2VuZVxuICAgIHZhciBncm91bmQgPSBCQUJZTE9OLk1lc2guQ3JlYXRlR3JvdW5kKCBcImdyb3VuZDFcIiwgNjAsIDYwLCAyLCBzY2VuZSApO1xuXG4gICAgLy8gTGVhdmUgdGhpcyBmdW5jdGlvblxuICAgIHJldHVybiBzY2VuZTtcblxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1rYWhuIG9uIDkvMjcvMTcuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBta2FobiBvbiA5LzI2LzE3LlxuICovXG5cbmZ1bmN0aW9uIGNsYW1wUmFkcyggaW5wdXQsIGxpbWl0ICkge1xuICAgIGlmICggaW5wdXQgPiAwICYmIGlucHV0ID4gbGltaXQgKVxuICAgICAgICByZXR1cm4gbGltaXQ7XG5cbiAgICBpZiAoIGlucHV0IDwgMCAmJiBpbnB1dCA8ICgtbGltaXQpIClcbiAgICAgICAgcmV0dXJuIC1saW1pdDtcblxuICAgIHJldHVybiBpbnB1dDtcblxufVxuXG5cbmZ1bmN0aW9uIHBhcmFsbGF4Um9vbSgpIHtcblxuICAgIGNvbnN0IHBpID0gMy4xNDE1OTtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIEJhYnlsb24gU2NlbmUgb2JqZWN0IChub3QgYSBzaGFwZS9tZXNoKVxuICAgIHZhciBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKCBlbmdpbmUgKTtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhbmQgcG9zaXRpb25zIGFuIGZyZWUgY2FtZXJhXG4gICAgdmFyIGNhbWVyYSA9IG5ldyBCQUJZTE9OLkRldmljZU9yaWVudGF0aW9uQ2FtZXJhKCBcImNhbWVyYTFcIixcbiAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMiwgLTEwICksIHNjZW5lICk7XG5cbiAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgICBjYW1lcmEuc2V0VGFyZ2V0KCBuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSApO1xuXG4gICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgICAvL2NhbWVyYS5hdHRhY2hDb250cm9sKCBjYW52YXMsIHRydWUgKTtcbiAgICBjYW1lcmEuYW5ndWxhclNlbnNpYmlsaXR5ID0gMTAwMDA7XG4gICAgY2FtZXJhLm1vdmVTZW5zaWJpbGl0eSA9IDEwMDAwO1xuXG4gICAgLy8gVGhpcyBjcmVhdGVzIGEgbGlnaHQgLSBhaW1lZCAwLDEsMCAtIHRvIHRoZSBza3kuXG4gICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodCggXCJsaWdodDFcIixcbiAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMywgMCApLCBzY2VuZSApO1xuXG4gICAgbGlnaHQuaW50ZW5zaXR5ID0gMi4wO1xuXG4gICAgLy8gT3VyIGJ1aWx0LWluICdzcGhlcmUnIHNoYXBlLiBQYXJhbXM6IG5hbWUsIHN1YmRpdmlzaW9ucywgc2l6ZSwgc2NlbmVcbiAgICB2YXIgc3BoZXJlID0gQkFCWUxPTi5NZXNoLkNyZWF0ZVNwaGVyZSggXCJzcGhlcmUxXCIsIDE2LCAyLCBzY2VuZSApO1xuXG4gICAgdmFyIG1hdGVyaWFsU3BoZXJlNCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoIFwidGV4dHVyZTRcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFNwaGVyZTQuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvb3JuYW1lbnQuanBnXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxTcGhlcmU0LmRpZmZ1c2VUZXh0dXJlLnZPZmZzZXQgPSAwLjE7Ly9WZXJ0aWNhbCBvZmZzZXQgb2YgMTAlXG4gICAgbWF0ZXJpYWxTcGhlcmU0LmRpZmZ1c2VUZXh0dXJlLnVPZmZzZXQgPSAwLjQ7Ly9Ib3Jpem9udGFsIG9mZnNldCBvZiA0MCVcbiAgICBzcGhlcmUubWF0ZXJpYWwgPSBtYXRlcmlhbFNwaGVyZTQ7XG4gICAgLy8gTW92ZSB0aGUgc3BoZXJlIHVwd2FyZCAxLzIgaXRzIGhlaWdodFxuICAgIHNwaGVyZS5wb3NpdGlvbi55ID0gMTtcblxuICAgIC8vIE91ciBidWlsdC1pbiAnZ3JvdW5kJyBzaGFwZS4gIFBhcmFtczogbmFtZSwgd2lkdGgsIGRlcHRoLCBzdWJkaXZzLCBzY2VuZVxuICAgIHZhciBncm91bmQgPSBCQUJZTE9OLk1lc2guQ3JlYXRlR3JvdW5kKCBcImdyb3VuZDFcIiwgNjAsIDYwLCAyLCBzY2VuZSApO1xuXG4gICAgdmFyIG1hdGVyaWFsV29vZCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoIFwid29vZFwiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy9jYXJ0b29ud29vZC5qcGdcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2QuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMjA7XG4gICAgbWF0ZXJpYWxXb29kLmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDIwO1xuXG4gICAgdmFyIG1hdGVyaWFsV29vZFdhbGwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcIndvb2R3YWxsXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kV2FsbC5kaWZmdXNlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy9jYXJ0b29ud29vZGx0LmpwZ1wiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMTA7XG4gICAgbWF0ZXJpYWxXb29kV2FsbC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAxMDtcbiAgICBtYXRlcmlhbFdvb2RXYWxsLmRpZmZ1c2VUZXh0dXJlLndBbmcgPSAtcGkgLyA0O1xuXG4gICAgdmFyIGxlZnRXYWxsID0gQkFCWUxPTi5NZXNoLkNyZWF0ZURpc2MoIFwibHdhbGxcIiwgMTYsIDQsIHNjZW5lLCBmYWxzZSwgQkFCWUxPTi5NZXNoLkRFRkFVTFRTSURFICk7XG4gICAgbGVmdFdhbGwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBsZWZ0V2FsbC5yb3RhdGlvbi55ID0gLXBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgbGVmdFdhbGwucG9zaXRpb24ueCA9IC02OyAvLyBsZWZ0LXJpZ2h0XG4gICAgbGVmdFdhbGwucG9zaXRpb24ueiA9IDA7IC8vIGluLW91dFxuICAgIGxlZnRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIGxlZnRXYWxsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kV2FsbDtcblxuICAgIHZhciBiYWNrV2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcImJ3YWxsXCIsIDEwLCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIGJhY2tXYWxsLnJvdGF0aW9uLnogPSBwaSAvIDQ7XG4gICAgYmFja1dhbGwucm90YXRpb24ueSA9IDA7XG4gICAgYmFja1dhbGwucG9zaXRpb24ueCA9IDA7XG4gICAgYmFja1dhbGwucG9zaXRpb24ueiA9IDQ7XG4gICAgYmFja1dhbGwucG9zaXRpb24ueSA9IDI7XG4gICAgYmFja1dhbGwubWF0ZXJpYWwgPSBtYXRlcmlhbFdvb2RXYWxsO1xuXG4gICAgdmFyIHJpZ2h0V2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcInJ3YWxsXCIsIDE2LCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi55ID0gcGkgLyAyO1xuICAgIHJpZ2h0V2FsbC5wb3NpdGlvbi54ID0gNjtcbiAgICByaWdodFdhbGwucG9zaXRpb24ueiA9IDA7XG4gICAgcmlnaHRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIHJpZ2h0V2FsbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZFdhbGw7XG5cbiAgICB2YXIgbGVmdENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJsY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIGxlZnRDZWlsLnJvdGF0aW9uLnkgPSAtcGkgLyAyOyAgLy8gYXJvdW5kIHZlcnRpY2FsIGF4aXNcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi54ID0gLXBpIC8gNDtcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi54ID0gLTY7IC8vIGxlZnQtcmlnaHRcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgbGVmdENlaWwucG9zaXRpb24ueSA9IDM7IC8vIHVwLWRvd25cbiAgICBsZWZ0Q2VpbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZDtcblxuICAgIHZhciBydENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJyY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBydENlaWwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBydENlaWwucm90YXRpb24ueSA9IHBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgcnRDZWlsLnJvdGF0aW9uLnggPSAtcGkgLyA0O1xuICAgIHJ0Q2VpbC5wb3NpdGlvbi54ID0gNjsgLy8gbGVmdC1yaWdodFxuICAgIHJ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgcnRDZWlsLnBvc2l0aW9uLnkgPSAzOyAvLyB1cC1kb3duXG4gICAgcnRDZWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgZ3JvdW5kLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgdmFyIHNwcml0ZU1hbmFnZXJUcmVlcyA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwidHJlZXNNYW5hZ2VyXCIsIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy90cmVlLnBuZ1wiLCAxMCwgMjAwLCBzY2VuZSApO1xuXG4gICAgLy9XZSBjcmVhdGUgMjAwMCB0cmVlcyBhdCByYW5kb20gcG9zaXRpb25zXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTA7IGkrKyApIHtcbiAgICAgICAgdmFyIHRyZWUgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwidHJlZVwiLCBzcHJpdGVNYW5hZ2VyVHJlZXMgKTtcbiAgICAgICAgdHJlZS5wb3NpdGlvbi54ID0gTWF0aC5yYW5kb20oKSAqIDUgLSAyLjU7XG4gICAgICAgIHRyZWUucG9zaXRpb24ueiA9IE1hdGgucmFuZG9tKCkgKiA1IC0gODtcbiAgICAgICAgdHJlZS5wb3NpdGlvbi55ID0gMTtcbiAgICAgICAgdHJlZS5pc1BpY2thYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgYm9iTWFuYWdlciA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwiYm9iTWFuYWdlclwiLCBcImFwcC9hc3NldHMvdGV4dHVyZXMvYm9iLnBuZ1wiLCAxMCwgMjI5LCBzY2VuZSApO1xuICAgIHZhciBib2IgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwiYm9iXCIsIGJvYk1hbmFnZXIgKTtcbiAgICBib2IucG9zaXRpb24ueCA9IDJcbiAgICBib2IucG9zaXRpb24ueiA9IDI7XG4gICAgYm9iLnBvc2l0aW9uLnkgPSAxO1xuICAgIGJvYi5zaXplID0gMi4wO1xuICAgIGJvYi5pc1BpY2thYmxlID0gdHJ1ZTtcblxuICAgIC8vIGNhbWVyYS5hdHRhY2hDb250cm9sKCBjYW52YXMsIHRydWUgKTtcbiAgICBjYW1lcmEuaW5lcnRpYSA9IDAuOTtcblxuICAgIHZhciBjYW1YID0gMC4wMjtcbiAgICAvLyBDbGFtcCB0aGUgY2FtZXJhIGJlZm9yZSByZW5kZXJcbiAgICBzY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlciggZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBjYW1lcmEucm90YXRpb24gKTtcbiAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnggPSBjbGFtcFJhZHMoIGNhbWVyYS5yb3RhdGlvbi54LCAwLjI1ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi55ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueSwgMC41ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi56ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueiwgMC41ICk7XG5cbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggKz0gY2FtWDtcbiAgICAgICAgaWYgKGNhbWVyYS5wb3NpdGlvbi54ID4gNSB8fCBjYW1lcmEucG9zaXRpb24ueCA8IC01ICkge1xuICAgICAgICAgICAgY2FtWCAqPSAtMTtcbiAgICAgICAgfVxuXG5cbiAgICB9ICk7XG5cbiAgICBzY2VuZS5vblBvaW50ZXJEb3duID0gZnVuY3Rpb24gKCBldnQgKSB7XG4gICAgICAgIHZhciBwaWNrUmVzdWx0ID0gc2NlbmUucGlja1Nwcml0ZSggdGhpcy5wb2ludGVyWCwgdGhpcy5wb2ludGVyWSApO1xuICAgICAgICBpZiAoIHBpY2tSZXN1bHQuaGl0ICkge1xuICAgICAgICAgICAgcGlja1Jlc3VsdC5waWNrZWRTcHJpdGUuYW5nbGUgKz0gMC41O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzY2VuZTtcblxuXG59XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBta2FobiBvbiA5LzI2LzE3LlxuICovXG5cbmZ1bmN0aW9uIGNsYW1wUmFkcyggaW5wdXQsIGxpbWl0ICkge1xuICAgIGlmICggaW5wdXQgPiAwICYmIGlucHV0ID4gbGltaXQgKVxuICAgICAgICByZXR1cm4gbGltaXQ7XG5cbiAgICBpZiAoIGlucHV0IDwgMCAmJiBpbnB1dCA8ICgtbGltaXQpIClcbiAgICAgICAgcmV0dXJuIC1saW1pdDtcblxuICAgIHJldHVybiBpbnB1dDtcblxufVxuXG5cbmZ1bmN0aW9uIHJvb21TY2VuZSgpIHtcblxuICAgIGNvbnN0IHBpID0gMy4xNDE1OTtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIEJhYnlsb24gU2NlbmUgb2JqZWN0IChub3QgYSBzaGFwZS9tZXNoKVxuICAgIHZhciBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKCBlbmdpbmUgKTtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhbmQgcG9zaXRpb25zIGFuIGZyZWUgY2FtZXJhXG4gICAgdmFyIGNhbWVyYSA9IG5ldyBCQUJZTE9OLkRldmljZU9yaWVudGF0aW9uQ2FtZXJhKCBcImNhbWVyYTFcIixcbiAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMiwgLTEwICksIHNjZW5lICk7XG5cbiAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgICBjYW1lcmEuc2V0VGFyZ2V0KCBuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSApO1xuXG4gICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCggY2FudmFzLCB0cnVlICk7XG4gICAgY2FtZXJhLmFuZ3VsYXJTZW5zaWJpbGl0eSA9IDEwMDAwO1xuICAgIGNhbWVyYS5tb3ZlU2Vuc2liaWxpdHkgPSAxMDAwMDtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIGxpZ2h0IC0gYWltZWQgMCwxLDAgLSB0byB0aGUgc2t5LlxuICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoIFwibGlnaHQxXCIsXG4gICAgICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDMsIDAgKSwgc2NlbmUgKTtcblxuICAgIGxpZ2h0LmludGVuc2l0eSA9IDIuMDtcblxuICAgIC8vIE91ciBidWlsdC1pbiAnc3BoZXJlJyBzaGFwZS4gUGFyYW1zOiBuYW1lLCBzdWJkaXZpc2lvbnMsIHNpemUsIHNjZW5lXG4gICAgdmFyIHNwaGVyZSA9IEJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoIFwic3BoZXJlMVwiLCAxNiwgMiwgc2NlbmUgKTtcblxuICAgIHZhciBtYXRlcmlhbFNwaGVyZTQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInRleHR1cmU0XCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxTcGhlcmU0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL29ybmFtZW50LmpwZ1wiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMC4xOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS51T2Zmc2V0ID0gMC40Oy8vSG9yaXpvbnRhbCBvZmZzZXQgb2YgNDAlXG4gICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxTcGhlcmU0O1xuICAgIC8vIE1vdmUgdGhlIHNwaGVyZSB1cHdhcmQgMS8yIGl0cyBoZWlnaHRcbiAgICBzcGhlcmUucG9zaXRpb24ueSA9IDE7XG5cbiAgICAvLyBPdXIgYnVpbHQtaW4gJ2dyb3VuZCcgc2hhcGUuICBQYXJhbXM6IG5hbWUsIHdpZHRoLCBkZXB0aCwgc3ViZGl2cywgc2NlbmVcbiAgICB2YXIgZ3JvdW5kID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUdyb3VuZCggXCJncm91bmQxXCIsIDYwLCA2MCwgMiwgc2NlbmUgKTtcblxuICAgIHZhciBtYXRlcmlhbFdvb2QgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcIndvb2RcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2QuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvY2FydG9vbndvb2QuanBnXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDIwO1xuICAgIG1hdGVyaWFsV29vZC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAyMDtcblxuICAgIHZhciBtYXRlcmlhbFdvb2RXYWxsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCggXCJ3b29kd2FsbFwiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvY2FydG9vbndvb2RsdC5qcGdcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2RXYWxsLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDEwO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUudlNjYWxlID0gMTA7XG4gICAgbWF0ZXJpYWxXb29kV2FsbC5kaWZmdXNlVGV4dHVyZS53QW5nID0gLXBpIC8gNDtcblxuICAgIHZhciBsZWZ0V2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcImx3YWxsXCIsIDE2LCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIGxlZnRXYWxsLnJvdGF0aW9uLnogPSBwaSAvIDQ7XG4gICAgbGVmdFdhbGwucm90YXRpb24ueSA9IC1waSAvIDI7ICAvLyBhcm91bmQgdmVydGljYWwgYXhpc1xuICAgIGxlZnRXYWxsLnBvc2l0aW9uLnggPSAtNjsgLy8gbGVmdC1yaWdodFxuICAgIGxlZnRXYWxsLnBvc2l0aW9uLnogPSAwOyAvLyBpbi1vdXRcbiAgICBsZWZ0V2FsbC5wb3NpdGlvbi55ID0gMjtcbiAgICBsZWZ0V2FsbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZFdhbGw7XG5cbiAgICB2YXIgYmFja1dhbGwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJid2FsbFwiLCAxMCwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBiYWNrV2FsbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIGJhY2tXYWxsLnJvdGF0aW9uLnkgPSAwO1xuICAgIGJhY2tXYWxsLnBvc2l0aW9uLnggPSAwO1xuICAgIGJhY2tXYWxsLnBvc2l0aW9uLnogPSA0O1xuICAgIGJhY2tXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIGJhY2tXYWxsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kV2FsbDtcblxuICAgIHZhciByaWdodFdhbGwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJyd2FsbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICByaWdodFdhbGwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICByaWdodFdhbGwucm90YXRpb24ueSA9IHBpIC8gMjtcbiAgICByaWdodFdhbGwucG9zaXRpb24ueCA9IDY7XG4gICAgcmlnaHRXYWxsLnBvc2l0aW9uLnogPSAwO1xuICAgIHJpZ2h0V2FsbC5wb3NpdGlvbi55ID0gMjtcbiAgICByaWdodFdhbGwubWF0ZXJpYWwgPSBtYXRlcmlhbFdvb2RXYWxsO1xuXG4gICAgdmFyIGxlZnRDZWlsID0gQkFCWUxPTi5NZXNoLkNyZWF0ZURpc2MoIFwibGNlaWxcIiwgMTYsIDQsIHNjZW5lLCBmYWxzZSwgQkFCWUxPTi5NZXNoLkRFRkFVTFRTSURFICk7XG4gICAgbGVmdENlaWwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi55ID0gLXBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgbGVmdENlaWwucm90YXRpb24ueCA9IC1waS80O1xuICAgIGxlZnRDZWlsLnBvc2l0aW9uLnggPSAtNjsgLy8gbGVmdC1yaWdodFxuICAgIGxlZnRDZWlsLnBvc2l0aW9uLnogPSAwOyAvLyBpbi1vdXRcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi55ID0gMzsgLy8gdXAtZG93blxuICAgIGxlZnRDZWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgdmFyIHJ0Q2VpbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcInJjZWlsXCIsIDE2LCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIHJ0Q2VpbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIHJ0Q2VpbC5yb3RhdGlvbi55ID0gcGkvMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgcnRDZWlsLnJvdGF0aW9uLnggPSAtcGkgLyA0O1xuICAgIHJ0Q2VpbC5wb3NpdGlvbi54ID0gNjsgLy8gbGVmdC1yaWdodFxuICAgIHJ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgcnRDZWlsLnBvc2l0aW9uLnkgPSAzOyAvLyB1cC1kb3duXG4gICAgcnRDZWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgZ3JvdW5kLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgdmFyIHNwcml0ZU1hbmFnZXJUcmVlcyA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwidHJlZXNNYW5hZ2VyXCIsIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy90cmVlLnBuZ1wiLCAxMCwgMjAwLCBzY2VuZSApO1xuXG4gICAgLy9XZSBjcmVhdGUgMjAwMCB0cmVlcyBhdCByYW5kb20gcG9zaXRpb25zXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTA7IGkrKyApIHtcbiAgICAgICAgdmFyIHRyZWUgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwidHJlZVwiLCBzcHJpdGVNYW5hZ2VyVHJlZXMgKTtcbiAgICAgICAgdHJlZS5wb3NpdGlvbi54ID0gTWF0aC5yYW5kb20oKSAqIDUgLSAyLjU7XG4gICAgICAgIHRyZWUucG9zaXRpb24ueiA9IE1hdGgucmFuZG9tKCkgKiA1IC0gODtcbiAgICAgICAgdHJlZS5wb3NpdGlvbi55ID0gMTtcbiAgICAgICAgdHJlZS5pc1BpY2thYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgYm9iTWFuYWdlciA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwiYm9iTWFuYWdlclwiLCBcImFwcC9hc3NldHMvdGV4dHVyZXMvYm9iLnBuZ1wiLCAxMCwgMjI5LCBzY2VuZSApO1xuICAgIHZhciBib2IgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwiYm9iXCIsIGJvYk1hbmFnZXIgKTtcbiAgICBib2IucG9zaXRpb24ueCA9IDJcbiAgICBib2IucG9zaXRpb24ueiA9IDI7XG4gICAgYm9iLnBvc2l0aW9uLnkgPSAxO1xuICAgIGJvYi5zaXplID0gMi4wO1xuICAgIGJvYi5pc1BpY2thYmxlID0gdHJ1ZTtcblxuICAgIC8vIGNhbWVyYS5hdHRhY2hDb250cm9sKCBjYW52YXMsIHRydWUgKTtcbiAgICBjYW1lcmEuaW5lcnRpYSA9IDAuOTtcbiAgICAvLyBDbGFtcCB0aGUgY2FtZXJhIGJlZm9yZSByZW5kZXJcbiAgICBzY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlciggZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBjYW1lcmEucm90YXRpb24gKTtcbiAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnggPSBjbGFtcFJhZHMoIGNhbWVyYS5yb3RhdGlvbi54LCAwLjI1ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi55ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueSwgMC41ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi56ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueiwgMC41ICk7XG5cbiAgICB9ICk7XG5cbiAgICBzY2VuZS5vblBvaW50ZXJEb3duID0gZnVuY3Rpb24gKCBldnQgKSB7XG4gICAgICAgIHZhciBwaWNrUmVzdWx0ID0gc2NlbmUucGlja1Nwcml0ZSggdGhpcy5wb2ludGVyWCwgdGhpcy5wb2ludGVyWSApO1xuICAgICAgICBpZiAoIHBpY2tSZXN1bHQuaGl0ICkge1xuICAgICAgICAgICAgcGlja1Jlc3VsdC5waWNrZWRTcHJpdGUuYW5nbGUgKz0gMC41O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzY2VuZTtcblxuXG59XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBta2FobiBvbiA5LzI2LzE3LlxuICovXG5cbmZ1bmN0aW9uIGNsYW1wUmFkcyggaW5wdXQsIGxpbWl0ICkge1xuICAgIGlmICggaW5wdXQgPiAwICYmIGlucHV0ID4gbGltaXQgKVxuICAgICAgICByZXR1cm4gbGltaXQ7XG5cbiAgICBpZiAoIGlucHV0IDwgMCAmJiBpbnB1dCA8ICgtbGltaXQpIClcbiAgICAgICAgcmV0dXJuIC1saW1pdDtcblxuICAgIHJldHVybiBpbnB1dDtcblxufVxuXG5cbmZ1bmN0aW9uIHJvb21TY2VuZTIoKSB7XG5cbiAgICBjb25zdCBwaSA9IDMuMTQxNTk7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSBCYWJ5bG9uIFNjZW5lIG9iamVjdCAobm90IGEgc2hhcGUvbWVzaClcbiAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSggZW5naW5lICk7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhbiBmcmVlIGNhbWVyYVxuICAgIHZhciBjYW1lcmEgPSBuZXcgQkFCWUxPTi5EZXZpY2VPcmllbnRhdGlvbkNhbWVyYSggXCJjYW1lcmExXCIsXG4gICAgICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDIsIC03ICksIHNjZW5lICk7XG5cbiAgICAvLyB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uRnJlZUNhbWVyYSggXCJjYW1lcmExXCIsXG4gICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDIsIC04ICksIHNjZW5lICk7XG5cbiAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgICBjYW1lcmEuc2V0VGFyZ2V0KCBuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSApO1xuXG4gICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCggY2FudmFzLCB0cnVlICk7XG4gICAgY2FtZXJhLmFuZ3VsYXJTZW5zaWJpbGl0eSA9IDEwMDAwO1xuICAgIGNhbWVyYS5tb3ZlU2Vuc2liaWxpdHkgPSAxMDAwMDtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIGxpZ2h0IC0gYWltZWQgMCwxLDAgLSB0byB0aGUgc2t5LlxuICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoIFwibGlnaHQxXCIsXG4gICAgICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDMsIDAgKSwgc2NlbmUgKTtcblxuICAgIGxpZ2h0LmludGVuc2l0eSA9IDIuMDtcblxuICAgIC8vIE91ciBidWlsdC1pbiAnc3BoZXJlJyBzaGFwZS4gUGFyYW1zOiBuYW1lLCBzdWJkaXZpc2lvbnMsIHNpemUsIHNjZW5lXG4gICAgdmFyIHNwaGVyZSA9IEJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoIFwic3BoZXJlMVwiLCAxNiwgMSwgc2NlbmUgKTtcblxuICAgIHZhciBtYXRlcmlhbFNwaGVyZTQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInRleHR1cmU0XCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxTcGhlcmU0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL29ybmFtZW50LmpwZ1wiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMC4xOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS51T2Zmc2V0ID0gMC40Oy8vSG9yaXpvbnRhbCBvZmZzZXQgb2YgNDAlXG4gICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxTcGhlcmU0O1xuICAgIC8vIE1vdmUgdGhlIHNwaGVyZSB1cHdhcmQgMS8yIGl0cyBoZWlnaHRcbiAgICBzcGhlcmUucG9zaXRpb24ueSA9IDE7XG5cbiAgICAvLyBPdXIgYnVpbHQtaW4gJ2dyb3VuZCcgc2hhcGUuICBQYXJhbXM6IG5hbWUsIHdpZHRoLCBkZXB0aCwgc3ViZGl2cywgc2NlbmVcbiAgICB2YXIgZ3JvdW5kID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUdyb3VuZCggXCJncm91bmQxXCIsIDYwLCA2MCwgMiwgc2NlbmUgKTtcblxuICAgIHZhciBtYXRlcmlhbFdvb2QgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcIndvb2RcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2QuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvY2FydG9vbndvb2QuanBnXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDIwO1xuICAgIG1hdGVyaWFsV29vZC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAyMDtcblxuICAgIGdyb3VuZC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZDtcblxuICAgIHZhciBtYXRlcmlhbFdvb2RXYWxsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCggXCJ3b29kd2FsbFwiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvY2FydG9vbndvb2RsdC5qcGdcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2RXYWxsLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDEwO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUudlNjYWxlID0gMTA7XG4gICAgbWF0ZXJpYWxXb29kV2FsbC5kaWZmdXNlVGV4dHVyZS53QW5nID0gLXBpIC8gNDtcblxuICAgIHZhciBtYXRlcmlhbFdvb2RXYWxsMiA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoIFwid29vZHdhbGwyXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kV2FsbDIuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvY2FydG9vbndvb2RsdC5qcGdcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAxMDtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAxMDtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5kaWZmdXNlVGV4dHVyZS53QW5nID0gLXBpIC8gMjtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcblxuXG4gICAgdmFyIGxlZnRXYWxsID0gQkFCWUxPTi5NZXNoLkNyZWF0ZURpc2MoIFwibHdhbGxcIiwgMTYsIDQsIHNjZW5lLCBmYWxzZSwgQkFCWUxPTi5NZXNoLkRFRkFVTFRTSURFICk7XG4gICAgbGVmdFdhbGwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBsZWZ0V2FsbC5yb3RhdGlvbi55ID0gLXBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgbGVmdFdhbGwucG9zaXRpb24ueCA9IC02OyAvLyBsZWZ0LXJpZ2h0XG4gICAgbGVmdFdhbGwucG9zaXRpb24ueiA9IDA7IC8vIGluLW91dFxuICAgIGxlZnRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIGxlZnRXYWxsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kV2FsbDtcblxuICAgIC8vIHZhciBiYWNrV2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcImJ3YWxsXCIsIDEwLCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIC8vIGJhY2tXYWxsLnJvdGF0aW9uLnogPSBwaSAvIDQ7XG4gICAgLy8gYmFja1dhbGwucm90YXRpb24ueSA9IDA7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueCA9IDA7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueiA9IDQ7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueSA9IDI7XG4gICAgLy8gYmFja1dhbGwubWF0ZXJpYWwgPSBtYXRlcmlhbFdvb2RXYWxsO1xuXG4gICAgdmFyIHJpZ2h0V2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcInJ3YWxsXCIsIDE2LCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi55ID0gcGkgLyAyO1xuICAgIHJpZ2h0V2FsbC5wb3NpdGlvbi54ID0gNjtcbiAgICByaWdodFdhbGwucG9zaXRpb24ueiA9IDA7XG4gICAgcmlnaHRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIHJpZ2h0V2FsbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZFdhbGw7XG5cbiAgICB2YXIgbGVmdENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJsY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIGxlZnRDZWlsLnJvdGF0aW9uLnkgPSAtcGkgLyAyOyAgLy8gYXJvdW5kIHZlcnRpY2FsIGF4aXNcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi54ID0gLXBpIC8gNDtcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi54ID0gLTY7IC8vIGxlZnQtcmlnaHRcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgbGVmdENlaWwucG9zaXRpb24ueSA9IDM7IC8vIHVwLWRvd25cbiAgICBsZWZ0Q2VpbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZDtcblxuICAgIHZhciBydENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJyY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBydENlaWwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBydENlaWwucm90YXRpb24ueSA9IHBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgcnRDZWlsLnJvdGF0aW9uLnggPSAtcGkgLyA0O1xuICAgIHJ0Q2VpbC5wb3NpdGlvbi54ID0gNjsgLy8gbGVmdC1yaWdodFxuICAgIHJ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgcnRDZWlsLnBvc2l0aW9uLnkgPSAzOyAvLyB1cC1kb3duXG4gICAgcnRDZWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgdmFyIHdtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInNvdXJjZU1hdFwiLCBzY2VuZSApO1xuICAgIHdtYXQud2lyZWZyYW1lID0gdHJ1ZTtcbiAgICB3bWF0LmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIHdhbGwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KCAnd2FsbExlZnQnLCA0LCBzY2VuZSApO1xuICAgIHdhbGwuc2NhbGluZy56ID0gMC4yNTtcbiAgICB3YWxsLnNjYWxpbmcueSA9IDQ7XG4gICAgd2FsbC5zY2FsaW5nLnggPSA0O1xuICAgIHdhbGwucG9zaXRpb24ueSA9IDQuNTtcbiAgICB3YWxsLm1hdGVyaWFsID0gd21hdDtcblxuXG4gICAgdmFyIHdpbmRvdyA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goICd3aW5kb3cnLCAxLCBzY2VuZSApO1xuICAgIHdpbmRvdy5zY2FsaW5nLnogPSAxO1xuICAgIHdpbmRvdy5zY2FsaW5nLnkgPSAyO1xuICAgIHdpbmRvdy5zY2FsaW5nLnggPSAzO1xuICAgIHdpbmRvdy5wb3NpdGlvbi55ID0gMi41O1xuICAgIHdpbmRvdy5wb3NpdGlvbi54ID0gLTE7XG4gICAgd2luZG93Lm1hdGVyaWFsID0gd21hdDtcblxuICAgIHZhciBkb29yID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveCggJ2Rvb3InLCAxLCBzY2VuZSApO1xuICAgIGRvb3Iuc2NhbGluZy56ID0gMTtcbiAgICBkb29yLnNjYWxpbmcueSA9IDMuNTtcbiAgICBkb29yLnNjYWxpbmcueCA9IDI7XG4gICAgZG9vci5wb3NpdGlvbi55ID0gMS41O1xuICAgIGRvb3IucG9zaXRpb24ueCA9IC0zO1xuICAgIGRvb3IubWF0ZXJpYWwgPSB3bWF0O1xuXG4gICAgdmFyIHdhbGxDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggd2FsbCApO1xuICAgIHZhciB3aW5kb3dDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggd2luZG93ICk7XG4gICAgdmFyIGRvb3JDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggZG9vciApO1xuXG4gICAgdmFyIHd3d01lc2ggPSB3YWxsQ1NHLnN1YnRyYWN0KCB3aW5kb3dDU0cgKS50b01lc2goICd3d3cnLCBtYXRlcmlhbFdvb2RXYWxsMiwgc2NlbmUgKTtcbiAgICB3d3dNZXNoLnBvc2l0aW9uLnogPSA4O1xuXG4gICAgdmFyIHd3d01lc2hCYWNrID0gd2FsbENTRy5zdWJ0cmFjdCggZG9vckNTRyApLnRvTWVzaCggJ3d3d2QnLCBtYXRlcmlhbFdvb2RXYWxsMiwgc2NlbmUgKTtcbiAgICB3d3dNZXNoQmFjay5wb3NpdGlvbi56ID0gLTEwO1xuXG5cbiAgICB3YWxsLmRpc3Bvc2UoKTtcbiAgICB3aW5kb3cuZGlzcG9zZSgpO1xuICAgIGRvb3IuZGlzcG9zZSgpO1xuXG4gICAgdmFyIG1hdGVyaWFsU2FudGEgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcImNva2VcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFNhbnRhLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL2Nva2Vsb3JlX3NhbnRhXzE5NTEuanBnXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxTYW50YS5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMC4xOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIG1hdGVyaWFsU2FudGEuZGlmZnVzZVRleHR1cmUudU9mZnNldCA9IDA7Ly9Ib3Jpem9udGFsIG9mZnNldCBvZiA0MCVcblxuICAgIHZhciBwYWludGluZyA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goICdwYWludGluZycsIDEsIHNjZW5lICk7XG4gICAgcGFpbnRpbmcuc2NhbGluZy56ID0gMC4xO1xuICAgIHBhaW50aW5nLnNjYWxpbmcueSA9IDI7XG4gICAgcGFpbnRpbmcuc2NhbGluZy54ID0gMjtcbiAgICBwYWludGluZy5wb3NpdGlvbi55ID0gMS41O1xuICAgIHBhaW50aW5nLnBvc2l0aW9uLnggPSA2O1xuICAgIHBhaW50aW5nLnJvdGF0aW9uLnkgPSBNYXRoLlBJIC8gMjtcbiAgICBwYWludGluZy5tYXRlcmlhbCA9IG1hdGVyaWFsU2FudGE7XG5cbiAgICB2YXIgdGttYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInRrXCIsIHNjZW5lICk7XG4gICAgdGttYXQuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvdGtpbmNhZGUuanBnXCIsIHNjZW5lICk7XG4gICAgdGttYXQuZGlmZnVzZVRleHR1cmUudk9mZnNldCA9IDA7Ly9WZXJ0aWNhbCBvZmZzZXQgb2YgMTAlXG4gICAgdGttYXQuZGlmZnVzZVRleHR1cmUudU9mZnNldCA9IDA7Ly9Ib3Jpem9udGFsIG9mZnNldCBvZiA0MCVcbiAgICB2YXIgdGhvbWFzID0gcGFpbnRpbmcuY2xvbmUoICd0b20nICk7XG4gICAgdGhvbWFzLm1hdGVyaWFsID0gdGttYXQ7XG4gICAgdGhvbWFzLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAvIDI7XG4gICAgdGhvbWFzLnBvc2l0aW9uLnggPSAtNjtcbiAgICB0aG9tYXMucG9zaXRpb24ueiA9IDI7XG5cbiAgICB2YXIgbW1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoIFwibW1cIiwgc2NlbmUgKTtcbiAgICBtbWF0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL21ldGFsbGljYS5qcGdcIiwgc2NlbmUgKTtcbiAgICBtbWF0LmRpZmZ1c2VUZXh0dXJlLnZPZmZzZXQgPSAwOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIG1tYXQuZGlmZnVzZVRleHR1cmUudU9mZnNldCA9IDA7Ly9Ib3Jpem9udGFsIG9mZnNldCBvZiA0MCVcbiAgICB2YXIgbWV0ID0gcGFpbnRpbmcuY2xvbmUoICdtZXQnICk7XG4gICAgbWV0Lm1hdGVyaWFsID0gbW1hdDtcbiAgICBtZXQucm90YXRpb24ueSA9IE1hdGguUEk7XG4gICAgbWV0LnBvc2l0aW9uLnggPSAzO1xuICAgIG1ldC5wb3NpdGlvbi56ID0gLTkuNTtcblxuXG4gICAgLy8gRm91bnRhaW4gb2JqZWN0XG4gICAgdmFyIGZvdW50YWluID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveCggXCJmb3V0YWluXCIsIDEuMCwgc2NlbmUgKTtcbiAgICBmb3VudGFpbi5wb3NpdGlvbi55ID0gNTtcbiAgICBmb3VudGFpbi5wb3NpdGlvbi56ID0gMTA7XG4gICAgZm91bnRhaW4ucG9zaXRpb24ueCA9IC0xO1xuXG4gICAgLy8gQ3JlYXRlIGEgcGFydGljbGUgc3lzdGVtXG4gICAgdmFyIHBhcnRpY2xlU3lzdGVtID0gbmV3IEJBQllMT04uUGFydGljbGVTeXN0ZW0oIFwicGFydGljbGVzXCIsIDIwMDAsIHNjZW5lICk7XG5cbiAgICAvL1RleHR1cmUgb2YgZWFjaCBwYXJ0aWNsZVxuICAgIHBhcnRpY2xlU3lzdGVtLnBhcnRpY2xlVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy9zbm93Zmxha2UucG5nXCIsIHNjZW5lICk7XG5cbiAgICAvLyBXaGVyZSB0aGUgcGFydGljbGVzIGNvbWUgZnJvbVxuICAgIHBhcnRpY2xlU3lzdGVtLmVtaXR0ZXIgPSBmb3VudGFpbjsgLy8gdGhlIHN0YXJ0aW5nIG9iamVjdCwgdGhlIGVtaXR0ZXJcbiAgICBwYXJ0aWNsZVN5c3RlbS5taW5FbWl0Qm94ID0gbmV3IEJBQllMT04uVmVjdG9yMyggLTEsIDAsIDAgKTsgLy8gU3RhcnRpbmcgYWxsIGZyb21cbiAgICBwYXJ0aWNsZVN5c3RlbS5tYXhFbWl0Qm94ID0gbmV3IEJBQllMT04uVmVjdG9yMyggMSwgMCwgMCApOyAvLyBUby4uLlxuXG4gICAgLy8gQ29sb3JzIG9mIGFsbCBwYXJ0aWNsZXNcbiAgICBwYXJ0aWNsZVN5c3RlbS5jb2xvcjEgPSBuZXcgQkFCWUxPTi5Db2xvcjQoIDAuNywgMC44LCAxLjAsIDEuMCApO1xuICAgIHBhcnRpY2xlU3lzdGVtLmNvbG9yMiA9IG5ldyBCQUJZTE9OLkNvbG9yNCggMC4yLCAwLjUsIDEuMCwgMS4wICk7XG4gICAgcGFydGljbGVTeXN0ZW0uY29sb3JEZWFkID0gbmV3IEJBQllMT04uQ29sb3I0KCAwLCAwLCAwLjIsIDEuMCApO1xuXG4gICAgLy8gU2l6ZSBvZiBlYWNoIHBhcnRpY2xlIChyYW5kb20gYmV0d2Vlbi4uLlxuICAgIHBhcnRpY2xlU3lzdGVtLm1pblNpemUgPSAwLjE7XG4gICAgcGFydGljbGVTeXN0ZW0ubWF4U2l6ZSA9IDAuMzU7XG5cbiAgICAvLyBMaWZlIHRpbWUgb2YgZWFjaCBwYXJ0aWNsZSAocmFuZG9tIGJldHdlZW4uLi5cbiAgICBwYXJ0aWNsZVN5c3RlbS5taW5MaWZlVGltZSA9IDEuMztcbiAgICBwYXJ0aWNsZVN5c3RlbS5tYXhMaWZlVGltZSA9IDIuNTtcblxuICAgIC8vIEVtaXNzaW9uIHJhdGVcbiAgICBwYXJ0aWNsZVN5c3RlbS5lbWl0UmF0ZSA9IDEwMDtcblxuICAgIC8vIEJsZW5kIG1vZGUgOiBCTEVORE1PREVfT05FT05FLCBvciBCTEVORE1PREVfU1RBTkRBUkRcbiAgICBwYXJ0aWNsZVN5c3RlbS5ibGVuZE1vZGUgPSBCQUJZTE9OLlBhcnRpY2xlU3lzdGVtLkJMRU5ETU9ERV9PTkVPTkU7XG5cbiAgICAvLyBTZXQgdGhlIGdyYXZpdHkgb2YgYWxsIHBhcnRpY2xlc1xuICAgIHBhcnRpY2xlU3lzdGVtLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKCAwLCAtNS44MSwgMCApO1xuXG4gICAgLy8gRGlyZWN0aW9uIG9mIGVhY2ggcGFydGljbGUgYWZ0ZXIgaXQgaGFzIGJlZW4gZW1pdHRlZFxuICAgIHBhcnRpY2xlU3lzdGVtLmRpcmVjdGlvbjEgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKCAtMSwgLTEsIDAgKTtcbiAgICBwYXJ0aWNsZVN5c3RlbS5kaXJlY3Rpb24yID0gbmV3IEJBQllMT04uVmVjdG9yMyggMSwgLTEsIDMgKTtcblxuICAgIC8vIEFuZ3VsYXIgc3BlZWQsIGluIHJhZGlhbnNcbiAgICBwYXJ0aWNsZVN5c3RlbS5taW5Bbmd1bGFyU3BlZWQgPSAwO1xuICAgIHBhcnRpY2xlU3lzdGVtLm1heEFuZ3VsYXJTcGVlZCA9IE1hdGguUEk7XG5cbiAgICAvLyBTcGVlZFxuICAgIHBhcnRpY2xlU3lzdGVtLm1pbkVtaXRQb3dlciA9IDE7XG4gICAgcGFydGljbGVTeXN0ZW0ubWF4RW1pdFBvd2VyID0gMztcbiAgICBwYXJ0aWNsZVN5c3RlbS51cGRhdGVTcGVlZCA9IDAuMDA1O1xuXG4gICAgLy8gU3RhcnQgdGhlIHBhcnRpY2xlIHN5c3RlbVxuICAgIHBhcnRpY2xlU3lzdGVtLnN0YXJ0KCk7XG5cblxuICAgIHZhciBzcHJpdGVNYW5hZ2VyVHJlZXMgPSBuZXcgQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKCBcInRyZWVzTWFuYWdlclwiLCBcImFwcC9hc3NldHMvdGV4dHVyZXMvdHJlZS5wbmdcIiwgMTAsIDIwMCwgc2NlbmUgKTtcblxuICAgIC8vV2UgY3JlYXRlIDIwMDAgdHJlZXMgYXQgcmFuZG9tIHBvc2l0aW9uc1xuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDEwOyBpKysgKSB7XG4gICAgICAgIHZhciB0cmVlID0gbmV3IEJBQllMT04uU3ByaXRlKCBcInRyZWVcIiwgc3ByaXRlTWFuYWdlclRyZWVzICk7XG4gICAgICAgIHRyZWUucG9zaXRpb24ueCA9IE1hdGgucmFuZG9tKCkgKiA1IC0gMi41O1xuICAgICAgICB0cmVlLnBvc2l0aW9uLnogPSBNYXRoLnJhbmRvbSgpICogNSAtIDg7XG4gICAgICAgIHRyZWUucG9zaXRpb24ueSA9IDE7XG4gICAgICAgIHRyZWUuaXNQaWNrYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGJvYk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKCBcImJvYk1hbmFnZXJcIiwgXCJhcHAvYXNzZXRzL3RleHR1cmVzL2JvYi5wbmdcIiwgMTAsIDIyOSwgc2NlbmUgKTtcbiAgICB2YXIgYm9iID0gbmV3IEJBQllMT04uU3ByaXRlKCBcImJvYlwiLCBib2JNYW5hZ2VyICk7XG4gICAgYm9iLnBvc2l0aW9uLnggPSAtMlxuICAgIGJvYi5wb3NpdGlvbi56ID0gMztcbiAgICBib2IucG9zaXRpb24ueSA9IDE7XG4gICAgYm9iLnNpemUgPSAyLjU7XG4gICAgYm9iLmlzUGlja2FibGUgPSB0cnVlO1xuXG4gICAgLy8gY2FtZXJhLmF0dGFjaENvbnRyb2woIGNhbnZhcywgdHJ1ZSApO1xuICAgIGNhbWVyYS5pbmVydGlhID0gMC45O1xuICAgIC8vIENsYW1wIHRoZSBjYW1lcmEgYmVmb3JlIHJlbmRlclxuICAgIHNjZW5lLnJlZ2lzdGVyQmVmb3JlUmVuZGVyKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coIGNhbWVyYS5yb3RhdGlvbiApO1xuICAgICAgICBjYW1lcmEucm90YXRpb24ueCA9IGNsYW1wUmFkcyggY2FtZXJhLnJvdGF0aW9uLngsIDAuMjUgKTtcbiAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnkgPSBjbGFtcFJhZHMoIGNhbWVyYS5yb3RhdGlvbi55LCAwLjUgKTtcbiAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnogPSBjbGFtcFJhZHMoIGNhbWVyYS5yb3RhdGlvbi56LCAwLjUgKTtcbiAgICB9ICk7XG5cbiAgICBzY2VuZS5vblBvaW50ZXJEb3duID0gZnVuY3Rpb24gKCBldnQgKSB7XG4gICAgICAgIHZhciBwaWNrUmVzdWx0ID0gc2NlbmUucGlja1Nwcml0ZSggdGhpcy5wb2ludGVyWCwgdGhpcy5wb2ludGVyWSApO1xuICAgICAgICBpZiAoIHBpY2tSZXN1bHQuaGl0ICkge1xuICAgICAgICAgICAgcGlja1Jlc3VsdC5waWNrZWRTcHJpdGUuYW5nbGUgKz0gMC41O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzY2VuZTtcblxuXG59XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBta2FobiBvbiA5LzI2LzE3LlxuICovXG5cbmZ1bmN0aW9uIGNsYW1wUmFkcyggaW5wdXQsIGxpbWl0ICkge1xuICAgIGlmICggaW5wdXQgPiAwICYmIGlucHV0ID4gbGltaXQgKVxuICAgICAgICByZXR1cm4gbGltaXQ7XG5cbiAgICBpZiAoIGlucHV0IDwgMCAmJiBpbnB1dCA8ICgtbGltaXQpIClcbiAgICAgICAgcmV0dXJuIC1saW1pdDtcblxuICAgIHJldHVybiBpbnB1dDtcblxufVxuXG5mdW5jdGlvbiBtYWtlVG95U3ByaXRlKCBuYW1lLCBzY2VuZSApIHtcblxuICAgIHJldHVybiBuZXcgQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKCBcInNtXCIgKyBuYW1lLCBcImFwcC9hc3NldHMvdGV4dHVyZXMvdG95IC0gXCIgKyBuYW1lICsgXCIucG5nXCIsIDEwLCAxMDI0LCBzY2VuZSApO1xuXG59XG5cbmZ1bmN0aW9uIHJvb21TY2VuZTMoKSB7XG5cbiAgICBjb25zdCBwaSA9IE1hdGguUEk7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSBCYWJ5bG9uIFNjZW5lIG9iamVjdCAobm90IGEgc2hhcGUvbWVzaClcbiAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSggZW5naW5lICk7XG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYW5kIHBvc2l0aW9ucyBhbiBmcmVlIGNhbWVyYVxuICAgIHZhciBjYW1lcmEgPSBuZXcgQkFCWUxPTi5EZXZpY2VPcmllbnRhdGlvbkNhbWVyYSggXCJjYW1lcmExXCIsXG4gICAgICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDIsIC03ICksIHNjZW5lICk7XG5cbiAgICAvLyB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uRnJlZUNhbWVyYSggXCJjYW1lcmExXCIsXG4gICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDIsIC04ICksIHNjZW5lICk7XG5cbiAgICAvLyBUaGlzIHRhcmdldHMgdGhlIGNhbWVyYSB0byBzY2VuZSBvcmlnaW5cbiAgICBjYW1lcmEuc2V0VGFyZ2V0KCBuZXcgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSApO1xuXG4gICAgLy8gVGhpcyBhdHRhY2hlcyB0aGUgY2FtZXJhIHRvIHRoZSBjYW52YXNcbiAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCggY2FudmFzLCB0cnVlICk7XG4gICAgY2FtZXJhLmFuZ3VsYXJTZW5zaWJpbGl0eSA9IDEwMDAwO1xuICAgIGNhbWVyYS5tb3ZlU2Vuc2liaWxpdHkgPSAxMDAwMDtcblxuICAgIC8vIFRoaXMgY3JlYXRlcyBhIGxpZ2h0IC0gYWltZWQgMCwxLDAgLSB0byB0aGUgc2t5LlxuICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoIFwibGlnaHQxXCIsXG4gICAgICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIDMsIDAgKSwgc2NlbmUgKTtcblxuICAgIGxpZ2h0LmludGVuc2l0eSA9IDIuMDtcblxuICAgIC8vIE91ciBidWlsdC1pbiAnc3BoZXJlJyBzaGFwZS4gUGFyYW1zOiBuYW1lLCBzdWJkaXZpc2lvbnMsIHNpemUsIHNjZW5lXG4gICAgLy8gdmFyIHNwaGVyZSA9IEJBQllMT04uTWVzaC5DcmVhdGVTcGhlcmUoIFwic3BoZXJlMVwiLCAxNiwgMSwgc2NlbmUgKTtcbiAgICAvL1xuICAgIC8vIHZhciBtYXRlcmlhbFNwaGVyZTQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInRleHR1cmU0XCIsIHNjZW5lICk7XG4gICAgLy8gbWF0ZXJpYWxTcGhlcmU0LmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL29ybmFtZW50LmpwZ1wiLCBzY2VuZSApO1xuICAgIC8vIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMC4xOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIC8vIG1hdGVyaWFsU3BoZXJlNC5kaWZmdXNlVGV4dHVyZS51T2Zmc2V0ID0gMC40Oy8vSG9yaXpvbnRhbCBvZmZzZXQgb2YgNDAlXG4gICAgLy8gc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxTcGhlcmU0O1xuICAgIC8vIC8vIE1vdmUgdGhlIHNwaGVyZSB1cHdhcmQgMS8yIGl0cyBoZWlnaHRcbiAgICAvLyBzcGhlcmUucG9zaXRpb24ueSA9IDE7XG5cbiAgICAvLyBPdXIgYnVpbHQtaW4gJ2dyb3VuZCcgc2hhcGUuICBQYXJhbXM6IG5hbWUsIHdpZHRoLCBkZXB0aCwgc3ViZGl2cywgc2NlbmVcbiAgICB2YXIgZ3JvdW5kID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUdyb3VuZCggXCJncm91bmQxXCIsIDYwLCA2MCwgMiwgc2NlbmUgKTtcblxuICAgIHZhciBtYXRlcmlhbFdvb2QgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcIndvb2RcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2QuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvcmVkIHdhbGwucG5nXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDIwO1xuICAgIG1hdGVyaWFsV29vZC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAyMDtcblxuICAgIGdyb3VuZC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZDtcblxuICAgIHZhciBtYXRlcmlhbFdvb2RXYWxsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCggXCJ3b29kd2FsbFwiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvYnJvd24gd2FsbC5wbmdcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFdvb2RXYWxsLmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDQ7XG4gICAgbWF0ZXJpYWxXb29kV2FsbC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSA0O1xuICAgIG1hdGVyaWFsV29vZFdhbGwuZGlmZnVzZVRleHR1cmUud0FuZyA9IC1waSAvIDQ7XG5cbiAgICB2YXIgbWF0ZXJpYWxXb29kV2FsbDIgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcIndvb2R3YWxsMlwiLCBzY2VuZSApO1xuICAgIG1hdGVyaWFsV29vZFdhbGwyLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL2Jyb3duIHdhbGwucG5nXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxXb29kV2FsbDIuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMjtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAyO1xuICAgIG1hdGVyaWFsV29vZFdhbGwyLmRpZmZ1c2VUZXh0dXJlLndBbmcgPSBwaTtcbiAgICBtYXRlcmlhbFdvb2RXYWxsMi5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcblxuXG4gICAgdmFyIGxlZnRXYWxsID0gQkFCWUxPTi5NZXNoLkNyZWF0ZURpc2MoIFwibHdhbGxcIiwgMTYsIDQsIHNjZW5lLCBmYWxzZSwgQkFCWUxPTi5NZXNoLkRFRkFVTFRTSURFICk7XG4gICAgbGVmdFdhbGwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBsZWZ0V2FsbC5yb3RhdGlvbi55ID0gLXBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgbGVmdFdhbGwucG9zaXRpb24ueCA9IC02OyAvLyBsZWZ0LXJpZ2h0XG4gICAgbGVmdFdhbGwucG9zaXRpb24ueiA9IDA7IC8vIGluLW91dFxuICAgIGxlZnRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIGxlZnRXYWxsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kV2FsbDtcblxuICAgIC8vIHZhciBiYWNrV2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcImJ3YWxsXCIsIDEwLCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIC8vIGJhY2tXYWxsLnJvdGF0aW9uLnogPSBwaSAvIDQ7XG4gICAgLy8gYmFja1dhbGwucm90YXRpb24ueSA9IDA7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueCA9IDA7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueiA9IDQ7XG4gICAgLy8gYmFja1dhbGwucG9zaXRpb24ueSA9IDI7XG4gICAgLy8gYmFja1dhbGwubWF0ZXJpYWwgPSBtYXRlcmlhbFdvb2RXYWxsO1xuXG4gICAgdmFyIHJpZ2h0V2FsbCA9IEJBQllMT04uTWVzaC5DcmVhdGVEaXNjKCBcInJ3YWxsXCIsIDE2LCA0LCBzY2VuZSwgZmFsc2UsIEJBQllMT04uTWVzaC5ERUZBVUxUU0lERSApO1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIHJpZ2h0V2FsbC5yb3RhdGlvbi55ID0gcGkgLyAyO1xuICAgIHJpZ2h0V2FsbC5wb3NpdGlvbi54ID0gNjtcbiAgICByaWdodFdhbGwucG9zaXRpb24ueiA9IDA7XG4gICAgcmlnaHRXYWxsLnBvc2l0aW9uLnkgPSAyO1xuICAgIHJpZ2h0V2FsbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZFdhbGw7XG5cbiAgICB2YXIgbGVmdENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJsY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi56ID0gcGkgLyA0O1xuICAgIGxlZnRDZWlsLnJvdGF0aW9uLnkgPSAtcGkgLyAyOyAgLy8gYXJvdW5kIHZlcnRpY2FsIGF4aXNcbiAgICBsZWZ0Q2VpbC5yb3RhdGlvbi54ID0gLXBpIC8gNDtcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi54ID0gLTY7IC8vIGxlZnQtcmlnaHRcbiAgICBsZWZ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgbGVmdENlaWwucG9zaXRpb24ueSA9IDM7IC8vIHVwLWRvd25cbiAgICBsZWZ0Q2VpbC5tYXRlcmlhbCA9IG1hdGVyaWFsV29vZDtcblxuICAgIHZhciBydENlaWwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlRGlzYyggXCJyY2VpbFwiLCAxNiwgNCwgc2NlbmUsIGZhbHNlLCBCQUJZTE9OLk1lc2guREVGQVVMVFNJREUgKTtcbiAgICBydENlaWwucm90YXRpb24ueiA9IHBpIC8gNDtcbiAgICBydENlaWwucm90YXRpb24ueSA9IHBpIC8gMjsgIC8vIGFyb3VuZCB2ZXJ0aWNhbCBheGlzXG4gICAgcnRDZWlsLnJvdGF0aW9uLnggPSAtcGkgLyA0O1xuICAgIHJ0Q2VpbC5wb3NpdGlvbi54ID0gNjsgLy8gbGVmdC1yaWdodFxuICAgIHJ0Q2VpbC5wb3NpdGlvbi56ID0gMDsgLy8gaW4tb3V0XG4gICAgcnRDZWlsLnBvc2l0aW9uLnkgPSAzOyAvLyB1cC1kb3duXG4gICAgcnRDZWlsLm1hdGVyaWFsID0gbWF0ZXJpYWxXb29kO1xuXG4gICAgdmFyIHdtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInNvdXJjZU1hdFwiLCBzY2VuZSApO1xuICAgIHdtYXQud2lyZWZyYW1lID0gdHJ1ZTtcbiAgICB3bWF0LmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xuXG4gICAgdmFyIHdhbGwgPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KCAnd2FsbExlZnQnLCA0LCBzY2VuZSApO1xuICAgIHdhbGwuc2NhbGluZy56ID0gMC4yNTtcbiAgICB3YWxsLnNjYWxpbmcueSA9IDQ7XG4gICAgd2FsbC5zY2FsaW5nLnggPSA0O1xuICAgIHdhbGwucG9zaXRpb24ueSA9IDQuNTtcbiAgICB3YWxsLm1hdGVyaWFsID0gd21hdDtcblxuXG4gICAgdmFyIHdpbmRvdyA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goICd3aW5kb3cnLCAxLCBzY2VuZSApO1xuICAgIHdpbmRvdy5zY2FsaW5nLnogPSAxO1xuICAgIHdpbmRvdy5zY2FsaW5nLnkgPSAyO1xuICAgIHdpbmRvdy5zY2FsaW5nLnggPSAzO1xuICAgIHdpbmRvdy5wb3NpdGlvbi55ID0gMi41O1xuICAgIHdpbmRvdy5wb3NpdGlvbi54ID0gLTE7XG4gICAgd2luZG93Lm1hdGVyaWFsID0gd21hdDtcblxuICAgIHZhciBkb29yID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveCggJ2Rvb3InLCAxLCBzY2VuZSApO1xuICAgIGRvb3Iuc2NhbGluZy56ID0gMTtcbiAgICBkb29yLnNjYWxpbmcueSA9IDMuNTtcbiAgICBkb29yLnNjYWxpbmcueCA9IDI7XG4gICAgZG9vci5wb3NpdGlvbi55ID0gMS41O1xuICAgIGRvb3IucG9zaXRpb24ueCA9IC0zO1xuICAgIGRvb3IubWF0ZXJpYWwgPSB3bWF0O1xuXG4gICAgdmFyIHdhbGxDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggd2FsbCApO1xuICAgIHZhciB3aW5kb3dDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggd2luZG93ICk7XG4gICAgdmFyIGRvb3JDU0cgPSBCQUJZTE9OLkNTRy5Gcm9tTWVzaCggZG9vciApO1xuXG4gICAgdmFyIHd3d01lc2ggPSB3YWxsQ1NHLnN1YnRyYWN0KCB3aW5kb3dDU0cgKS50b01lc2goICd3d3cnLCBtYXRlcmlhbFdvb2RXYWxsMiwgc2NlbmUgKTtcbiAgICB3d3dNZXNoLnBvc2l0aW9uLnogPSA4O1xuXG4gICAgdmFyIHd3d01lc2hCYWNrID0gd2FsbENTRy5zdWJ0cmFjdCggZG9vckNTRyApLnRvTWVzaCggJ3d3d2QnLCBtYXRlcmlhbFdvb2RXYWxsMiwgc2NlbmUgKTtcbiAgICB3d3dNZXNoQmFjay5wb3NpdGlvbi56ID0gLTEwO1xuXG5cbiAgICB3YWxsLmRpc3Bvc2UoKTtcbiAgICB3aW5kb3cuZGlzcG9zZSgpO1xuICAgIGRvb3IuZGlzcG9zZSgpO1xuXG4gICAgdmFyIG1hdGVyaWFsU2FudGEgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcImNva2VcIiwgc2NlbmUgKTtcbiAgICBtYXRlcmlhbFNhbnRhLmRpZmZ1c2VUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL2Nva2Vsb3JlX3NhbnRhXzE5NTEuanBnXCIsIHNjZW5lICk7XG4gICAgbWF0ZXJpYWxTYW50YS5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMC4xOy8vVmVydGljYWwgb2Zmc2V0IG9mIDEwJVxuICAgIG1hdGVyaWFsU2FudGEuZGlmZnVzZVRleHR1cmUudU9mZnNldCA9IDA7Ly9Ib3Jpem9udGFsIG9mZnNldCBvZiA0MCVcblxuICAgIHZhciBwYWludGluZyA9IEJBQllMT04uTWVzaC5DcmVhdGVCb3goICdwYWludGluZycsIDEsIHNjZW5lICk7XG4gICAgcGFpbnRpbmcuc2NhbGluZy56ID0gMC4xO1xuICAgIHBhaW50aW5nLnNjYWxpbmcueSA9IDI7XG4gICAgcGFpbnRpbmcuc2NhbGluZy54ID0gMjtcbiAgICBwYWludGluZy5wb3NpdGlvbi55ID0gMS41O1xuICAgIHBhaW50aW5nLnBvc2l0aW9uLnggPSA2O1xuICAgIHBhaW50aW5nLnJvdGF0aW9uLnkgPSBNYXRoLlBJIC8gMjtcbiAgICBwYWludGluZy5tYXRlcmlhbCA9IG1hdGVyaWFsU2FudGE7XG5cbiAgICB2YXIgdGttYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKCBcInRrXCIsIHNjZW5lICk7XG4gICAgdGttYXQuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvcmVkIGVsZi5wbmdcIiwgc2NlbmUgKTtcbiAgICB0a21hdC5vcGFjaXR5VGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy9yZWRlbGZvcHcucG5nXCIsIHNjZW5lICk7XG4gICAgdGttYXQub3BhY2l0eVRleHR1cmUuZ2V0QWxwaGFGcm9tUkdCID0gdHJ1ZTtcbiAgICB0a21hdC5kaWZmdXNlVGV4dHVyZS52T2Zmc2V0ID0gMDsvL1ZlcnRpY2FsIG9mZnNldCBvZiAxMCVcbiAgICB0a21hdC5kaWZmdXNlVGV4dHVyZS51T2Zmc2V0ID0gMDsvL0hvcml6b250YWwgb2Zmc2V0IG9mIDQwJVxuICAgIHZhciB0aG9tYXMgPSBwYWludGluZy5jbG9uZSggJ3RvbScgKTtcbiAgICB0aG9tYXMubWF0ZXJpYWwgPSB0a21hdDtcbiAgICB0aG9tYXMucm90YXRpb24ueSA9IC1NYXRoLlBJIC8gMjtcbiAgICB0aG9tYXMucG9zaXRpb24ueCA9IC00O1xuICAgIHRob21hcy5wb3NpdGlvbi56ID0gMjtcblxuICAgIHZhciBtbWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbCggXCJtbVwiLCBzY2VuZSApO1xuICAgIG1tYXQuZGlmZnVzZVRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKCBcImFwcC9hc3NldHMvdGV4dHVyZXMvbWV0YWxsaWNhLmpwZ1wiLCBzY2VuZSApO1xuICAgIG1tYXQuZGlmZnVzZVRleHR1cmUudk9mZnNldCA9IDA7Ly9WZXJ0aWNhbCBvZmZzZXQgb2YgMTAlXG4gICAgbW1hdC5kaWZmdXNlVGV4dHVyZS51T2Zmc2V0ID0gMDsvL0hvcml6b250YWwgb2Zmc2V0IG9mIDQwJVxuICAgIHZhciBtZXQgPSBwYWludGluZy5jbG9uZSggJ21ldCcgKTtcbiAgICBtZXQubWF0ZXJpYWwgPSBtbWF0O1xuICAgIG1ldC5yb3RhdGlvbi55ID0gTWF0aC5QSTtcbiAgICBtZXQucG9zaXRpb24ueCA9IDM7XG4gICAgbWV0LnBvc2l0aW9uLnogPSAtOS41O1xuXG5cbiAgICAvLyBGb3VudGFpbiBvYmplY3RcbiAgICB2YXIgZm91bnRhaW4gPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KCBcImZvdXRhaW5cIiwgMS4wLCBzY2VuZSApO1xuICAgIGZvdW50YWluLnBvc2l0aW9uLnkgPSA1O1xuICAgIGZvdW50YWluLnBvc2l0aW9uLnogPSAxMDtcbiAgICBmb3VudGFpbi5wb3NpdGlvbi54ID0gLTE7XG5cbiAgICAvLyBDcmVhdGUgYSBwYXJ0aWNsZSBzeXN0ZW1cbiAgICB2YXIgcGFydGljbGVTeXN0ZW0gPSBuZXcgQkFCWUxPTi5QYXJ0aWNsZVN5c3RlbSggXCJwYXJ0aWNsZXNcIiwgMjAwMCwgc2NlbmUgKTtcblxuICAgIC8vVGV4dHVyZSBvZiBlYWNoIHBhcnRpY2xlXG4gICAgcGFydGljbGVTeXN0ZW0ucGFydGljbGVUZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZSggXCJhcHAvYXNzZXRzL3RleHR1cmVzL3Nub3dmbGFrZS5wbmdcIiwgc2NlbmUgKTtcblxuICAgIC8vIFdoZXJlIHRoZSBwYXJ0aWNsZXMgY29tZSBmcm9tXG4gICAgcGFydGljbGVTeXN0ZW0uZW1pdHRlciA9IGZvdW50YWluOyAvLyB0aGUgc3RhcnRpbmcgb2JqZWN0LCB0aGUgZW1pdHRlclxuICAgIHBhcnRpY2xlU3lzdGVtLm1pbkVtaXRCb3ggPSBuZXcgQkFCWUxPTi5WZWN0b3IzKCAtMSwgMCwgMCApOyAvLyBTdGFydGluZyBhbGwgZnJvbVxuICAgIHBhcnRpY2xlU3lzdGVtLm1heEVtaXRCb3ggPSBuZXcgQkFCWUxPTi5WZWN0b3IzKCAxLCAwLCAwICk7IC8vIFRvLi4uXG5cbiAgICAvLyBDb2xvcnMgb2YgYWxsIHBhcnRpY2xlc1xuICAgIHBhcnRpY2xlU3lzdGVtLmNvbG9yMSA9IG5ldyBCQUJZTE9OLkNvbG9yNCggMC43LCAwLjgsIDEuMCwgMS4wICk7XG4gICAgcGFydGljbGVTeXN0ZW0uY29sb3IyID0gbmV3IEJBQllMT04uQ29sb3I0KCAwLjIsIDAuNSwgMS4wLCAxLjAgKTtcbiAgICBwYXJ0aWNsZVN5c3RlbS5jb2xvckRlYWQgPSBuZXcgQkFCWUxPTi5Db2xvcjQoIDAsIDAsIDAuMiwgMS4wICk7XG5cbiAgICAvLyBTaXplIG9mIGVhY2ggcGFydGljbGUgKHJhbmRvbSBiZXR3ZWVuLi4uXG4gICAgcGFydGljbGVTeXN0ZW0ubWluU2l6ZSA9IDAuMTtcbiAgICBwYXJ0aWNsZVN5c3RlbS5tYXhTaXplID0gMC4zNTtcblxuICAgIC8vIExpZmUgdGltZSBvZiBlYWNoIHBhcnRpY2xlIChyYW5kb20gYmV0d2Vlbi4uLlxuICAgIHBhcnRpY2xlU3lzdGVtLm1pbkxpZmVUaW1lID0gMS4zO1xuICAgIHBhcnRpY2xlU3lzdGVtLm1heExpZmVUaW1lID0gMi41O1xuXG4gICAgLy8gRW1pc3Npb24gcmF0ZVxuICAgIHBhcnRpY2xlU3lzdGVtLmVtaXRSYXRlID0gMTAwO1xuXG4gICAgLy8gQmxlbmQgbW9kZSA6IEJMRU5ETU9ERV9PTkVPTkUsIG9yIEJMRU5ETU9ERV9TVEFOREFSRFxuICAgIHBhcnRpY2xlU3lzdGVtLmJsZW5kTW9kZSA9IEJBQllMT04uUGFydGljbGVTeXN0ZW0uQkxFTkRNT0RFX09ORU9ORTtcblxuICAgIC8vIFNldCB0aGUgZ3Jhdml0eSBvZiBhbGwgcGFydGljbGVzXG4gICAgcGFydGljbGVTeXN0ZW0uZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoIDAsIC01LjgxLCAwICk7XG5cbiAgICAvLyBEaXJlY3Rpb24gb2YgZWFjaCBwYXJ0aWNsZSBhZnRlciBpdCBoYXMgYmVlbiBlbWl0dGVkXG4gICAgcGFydGljbGVTeXN0ZW0uZGlyZWN0aW9uMSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoIC0xLCAtMSwgMCApO1xuICAgIHBhcnRpY2xlU3lzdGVtLmRpcmVjdGlvbjIgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKCAxLCAtMSwgMyApO1xuXG4gICAgLy8gQW5ndWxhciBzcGVlZCwgaW4gcmFkaWFuc1xuICAgIHBhcnRpY2xlU3lzdGVtLm1pbkFuZ3VsYXJTcGVlZCA9IDA7XG4gICAgcGFydGljbGVTeXN0ZW0ubWF4QW5ndWxhclNwZWVkID0gTWF0aC5QSTtcblxuICAgIC8vIFNwZWVkXG4gICAgcGFydGljbGVTeXN0ZW0ubWluRW1pdFBvd2VyID0gMTtcbiAgICBwYXJ0aWNsZVN5c3RlbS5tYXhFbWl0UG93ZXIgPSAzO1xuICAgIHBhcnRpY2xlU3lzdGVtLnVwZGF0ZVNwZWVkID0gMC4wMDU7XG5cbiAgICAvLyBTdGFydCB0aGUgcGFydGljbGUgc3lzdGVtXG4gICAgcGFydGljbGVTeXN0ZW0uc3RhcnQoKTtcblxuXG4gICAgdmFyIHNwcml0ZU1hbmFnZXJUcmVlcyA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwidHJlZXNNYW5hZ2VyXCIsIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy90cmVlLnBuZ1wiLCAxMCwgMjAwLCBzY2VuZSApO1xuICAgIHZhciB0b3lzID0gWyBcImJhbGxcIiwgXCJkb2xsXCIsIFwiZHVja1wiLCBcImVsZiBibHVlXCIsIFwiZWxmIHllbGxvd1wiLCBcImhlbGljb3B0ZXJcIiwgXCJ0b3BcIiwgXCJ0cmFpblwiIF07XG4gICAgdmFyIHRveVNNcyA9IHRveXMubWFwKCBmdW5jdGlvbiAoIG5hbWUgKSB7XG4gICAgICAgIHJldHVybiBtYWtlVG95U3ByaXRlKCBuYW1lLCBzY2VuZSApO1xuICAgIH0gKTtcblxuICAgIHZhciB0b3lTcHJpdGVzID0gW107XG5cbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAzMDsgaSsrICkge1xuICAgICAgICB2YXIgdCA9IG5ldyBCQUJZTE9OLlNwcml0ZSggXCJ0XCIgKyBpLCBfLnNhbXBsZSggdG95U01zICkgKTtcbiAgICAgICAgdC5wb3NpdGlvbi54ID0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgIHQucG9zaXRpb24ueiA9IE1hdGgucmFuZG9tKCkgKiA4O1xuICAgICAgICB0LnBvc2l0aW9uLnkgPSAwLjU7XG4gICAgICAgIHQuc2l6ZSA9IDEuMDtcbiAgICAgICAgdC5pc1BpY2thYmxlID0gdHJ1ZTtcbiAgICAgICAgdG95U3ByaXRlcy5wdXNoKCB0ICk7XG4gICAgfVxuXG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgMTA7IGkrKyApIHtcbiAgICAgICAgdmFyIHRyZWUgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwidHJlZVwiLCBzcHJpdGVNYW5hZ2VyVHJlZXMgKTtcbiAgICAgICAgdHJlZS5wb3NpdGlvbi54ID0gTWF0aC5yYW5kb20oKSAqIC01O1xuICAgICAgICB0cmVlLnBvc2l0aW9uLnogPSBNYXRoLnJhbmRvbSgpICogNC41O1xuICAgICAgICB0cmVlLnBvc2l0aW9uLnkgPSAwLjU7XG4gICAgICAgIHRyZWUuaXNQaWNrYWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGJvYk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKCBcImJvYk1hbmFnZXJcIiwgXCJhcHAvYXNzZXRzL3RleHR1cmVzL3JlaW5kZWVyYm9iLnBuZ1wiLCAxMCwgMTAyNCwgc2NlbmUgKTtcbiAgICB2YXIgYm9iID0gbmV3IEJBQllMT04uU3ByaXRlKCBcImJvYlwiLCBib2JNYW5hZ2VyICk7XG4gICAgYm9iLnBvc2l0aW9uLnggPSA0O1xuICAgIGJvYi5wb3NpdGlvbi56ID0gLTE7XG4gICAgYm9iLnBvc2l0aW9uLnkgPSAxO1xuICAgIGJvYi5zaXplID0gMi41O1xuICAgIGJvYi5pc1BpY2thYmxlID0gdHJ1ZTtcblxuICAgIHZhciBib2JNYW5hZ2VyMiA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwiYm9iTWFuYWdlcjJcIiwgXCJhcHAvYXNzZXRzL3RleHR1cmVzL3JlaW5kZWVyYm9iMi5wbmdcIiwgMTAsIDEwMjQsIHNjZW5lICk7XG4gICAgdmFyIGJvYjIgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwiYm9iMlwiLCBib2JNYW5hZ2VyMiApO1xuICAgIGJvYjIucG9zaXRpb24ueCA9IC0yO1xuICAgIGJvYjIucG9zaXRpb24ueiA9IC0xO1xuICAgIGJvYjIucG9zaXRpb24ueSA9IDE7XG4gICAgYm9iMi5zaXplID0gMi41O1xuICAgIGJvYjIuaXNQaWNrYWJsZSA9IHRydWU7XG5cbiAgICB2YXIgZWxmbWdyID0gbmV3IEJBQllMT04uU3ByaXRlTWFuYWdlciggXCJlZm1nXCIsIFwiYXBwL2Fzc2V0cy90ZXh0dXJlcy9lbGYgLSB5ZWxsb3cucG5nXCIsIDEwLCAxMDI0LCBzY2VuZSApO1xuICAgIHZhciBlbGYgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwiYm9iMmFcIiwgZWxmbWdyICk7XG4gICAgZWxmLnBvc2l0aW9uLnggPSAzO1xuICAgIGVsZi5wb3NpdGlvbi56ID0gLTg7XG4gICAgZWxmLnBvc2l0aW9uLnkgPSAxLjI7XG4gICAgZWxmLnNpemUgPSAyLjU7XG4gICAgZWxmLmlzUGlja2FibGUgPSB0cnVlO1xuXG4gICAgdmFyIGVsZm1ncjIgPSBuZXcgQkFCWUxPTi5TcHJpdGVNYW5hZ2VyKCBcImVmbWdcIiwgXCJhcHAvYXNzZXRzL3RleHR1cmVzL3JlZCBlbGYucG5nXCIsIDEwLCAxMDI0LCBzY2VuZSApO1xuICAgIHZhciBlbGYyID0gbmV3IEJBQllMT04uU3ByaXRlKCBcImJvYjJiXCIsIGVsZm1ncjIgKTtcbiAgICBlbGYyLnBvc2l0aW9uLnggPSAtNDtcbiAgICBlbGYyLnBvc2l0aW9uLnogPSAtNDtcbiAgICBlbGYyLnBvc2l0aW9uLnkgPSAxLjI7XG4gICAgZWxmMi5zaXplID0gMi41O1xuICAgIGVsZjIuaXNQaWNrYWJsZSA9IHRydWU7XG5cbiAgICAvLyBjYW1lcmEuYXR0YWNoQ29udHJvbCggY2FudmFzLCB0cnVlICk7XG4gICAgY2FtZXJhLmluZXJ0aWEgPSAwLjk7XG5cbiAgICB2YXIgYm9iMklkeCA9IDAuMDE7XG5cbiAgICAvLyBDbGFtcCB0aGUgY2FtZXJhIGJlZm9yZSByZW5kZXJcbiAgICBzY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlciggZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBjYW1lcmEucm90YXRpb24gKTtcbiAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnggPSBjbGFtcFJhZHMoIGNhbWVyYS5yb3RhdGlvbi54LCAwLjI1ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi55ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueSwgMy41ICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi56ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueiwgMC41ICk7XG5cbiAgICAgICAgYm9iMi5wb3NpdGlvbi54ICs9IGJvYjJJZHg7XG4gICAgICAgIGlmICggYm9iMi5wb3NpdGlvbi54ID4gMyB8fCBib2IyLnBvc2l0aW9uLnggPCAtNCApIHtcbiAgICAgICAgICAgIGJvYjJJZHggKj0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBfLnNhbXBsZSggdG95U3ByaXRlcyApLnBvc2l0aW9uLnggKz0gKCBNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSApO1xuICAgICAgICBfLnNhbXBsZSggdG95U3ByaXRlcyApLnBvc2l0aW9uLnogKz0gKCBNYXRoLnJhbmRvbSgpICogMC4xIC0gMC4wNSApO1xuXG4gICAgfSApO1xuXG4gICAgc2NlbmUub25Qb2ludGVyRG93biA9IGZ1bmN0aW9uICggZXZ0ICkge1xuICAgICAgICB2YXIgcGlja1Jlc3VsdCA9IHNjZW5lLnBpY2tTcHJpdGUoIHRoaXMucG9pbnRlclgsIHRoaXMucG9pbnRlclkgKTtcbiAgICAgICAgaWYgKCBwaWNrUmVzdWx0LmhpdCApIHtcbiAgICAgICAgICAgIHBpY2tSZXN1bHQucGlja2VkU3ByaXRlLmFuZ2xlICs9IDAuNTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gc2NlbmU7XG5cblxufVxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWthaG4gb24gOS8yNi8xNy5cbiAqL1xuXG5mdW5jdGlvbiBjbGFtcFJhZHMoIGlucHV0LCBsaW1pdCApIHtcbiAgICBpZiAoIGlucHV0ID4gMCAmJiBpbnB1dCA+IGxpbWl0IClcbiAgICAgICAgcmV0dXJuIGxpbWl0O1xuXG4gICAgaWYgKCBpbnB1dCA8IDAgJiYgaW5wdXQgPCAoLWxpbWl0KSApXG4gICAgICAgIHJldHVybiAtbGltaXQ7XG5cbiAgICByZXR1cm4gaW5wdXQ7XG5cbn1cblxuZnVuY3Rpb24gdHJlZVNwcml0ZVNjZW5lKCkge1xuICAgIHZhciBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKCBlbmdpbmUgKTtcblxuICAgIC8vIENoYW5nZSB0aGUgc2NlbmUgYmFja2dyb3VuZCBjb2xvciB0byBncmVlbi5cbiAgICAvL3NjZW5lLmNsZWFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoIDEsIDEsIDAgKTtcblxuICAgIC8vIENyZWF0ZSBjYW1lcmEgYW5kIGxpZ2h0XG4gICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uUG9pbnRMaWdodCggXCJQb2ludFwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKCA1LCAxMCwgNSApLCBzY2VuZSApO1xuXG4gICAgLy92YXIgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKCBcIkNhbWVyYVwiLCAwLjEsIDAuMSwgOCwgbmV3IEJBQllMT04uVmVjdG9yMyggMCwgMCwgMCApLCBzY2VuZSApO1xuICAgIHZhciBjYW1lcmEgPSBuZXcgQkFCWUxPTi5GcmVlQ2FtZXJhKCBcImNhbWVyYVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKCAwLCAwLCAtMTAgKSwgc2NlbmUgKTtcblxuICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKCBjYW52YXMsIHRydWUgKTtcbiAgICBjYW1lcmEuaW5lcnRpYSA9IDAuOTtcbiAgICAvLyBDbGFtcCB0aGUgY2FtZXJhIGJlZm9yZSByZW5kZXJcbiAgICBzY2VuZS5yZWdpc3RlckJlZm9yZVJlbmRlciggZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyggY2FtZXJhLnJvdGF0aW9uICk7XG4gICAgICAgIGNhbWVyYS5yb3RhdGlvbi54ID0gY2xhbXBSYWRzKCBjYW1lcmEucm90YXRpb24ueCwgMC4yNSApO1xuICAgICAgICBjYW1lcmEucm90YXRpb24ueSA9IGNsYW1wUmFkcyggY2FtZXJhLnJvdGF0aW9uLnksIDAuNSApO1xuICAgICAgICBjYW1lcmEucm90YXRpb24ueiA9IGNsYW1wUmFkcyggY2FtZXJhLnJvdGF0aW9uLnosIDAuNSApO1xuXG4gICAgfSApO1xuXG4gICAgLy8gUHV0IGRvd24gdGhlIGZsb29yXG4gICAgdmFyIGdyb3VuZCA9IEJBQllMT04uTWVzaC5DcmVhdGVHcm91bmQoIFwiZ3JvdW5kMVwiLCA2LCA2LCAyLCBzY2VuZSApO1xuXG5cbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSBsaWdodCAtIGFpbWVkIDAsMSwwIC0gdG8gdGhlIHNreS5cbiAgICB2YXIgbGlnaHQgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KCBcImxpZ2h0MVwiLFxuICAgICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKCAwLCAxLCAwICksIHNjZW5lICk7XG5cbiAgICAvLyBEaW0gdGhlIGxpZ2h0IGEgc21hbGwgYW1vdW50XG4gICAgbGlnaHQuaW50ZW5zaXR5ID0gLjU7XG5cbiAgICAvLyBPdXIgYnVpbHQtaW4gJ3NwaGVyZScgc2hhcGUuIFBhcmFtczogbmFtZSwgc3ViZGl2aXNpb25zLCBzaXplLCBzY2VuZVxuICAgIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2guQ3JlYXRlU3BoZXJlKCBcInNwaGVyZTFcIiwgMTYsIDIsIHNjZW5lICk7XG5cbiAgICAvLyBNb3ZlIHRoZSBzcGhlcmUgdXB3YXJkIDEvMiBpdHMgaGVpZ2h0XG4gICAgc3BoZXJlLnBvc2l0aW9uLnkgPSAxO1xuXG4gICAgbWFrZVNwcml0ZXMoc2NlbmUpO1xuXG4gICAgcmV0dXJuIHNjZW5lO1xufVxuXG5mdW5jdGlvbiBtYWtlU3ByaXRlcyggc2NlbmUgKSB7XG5cbiAgICAvLyBDcmVhdGUgYSBzcHJpdGUgbWFuYWdlciB0byBvcHRpbWl6ZSBHUFUgcmVzc291cmNlc1xuICAgIC8vIFBhcmFtZXRlcnMgOiBuYW1lLCBpbWdVcmwsIGNhcGFjaXR5LCBjZWxsU2l6ZSwgc2NlbmVcbiAgICB2YXIgc3ByaXRlTWFuYWdlclRyZWVzID0gbmV3IEJBQllMT04uU3ByaXRlTWFuYWdlciggXCJ0cmVlc01hbmFnZXJcIiwgXCJhcHAvYXNzZXRzL3RleHR1cmVzL3BhbG0ucG5nXCIsIDIwMDAsIDgwMCwgc2NlbmUgKTtcblxuICAgIC8vV2UgY3JlYXRlIDIwMDAgdHJlZXMgYXQgcmFuZG9tIHBvc2l0aW9uc1xuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDIwMDsgaSsrICkge1xuICAgICAgICB2YXIgdHJlZSA9IG5ldyBCQUJZTE9OLlNwcml0ZSggXCJ0cmVlXCIsIHNwcml0ZU1hbmFnZXJUcmVlcyApO1xuICAgICAgICB0cmVlLnBvc2l0aW9uLnggPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICAgICAgICB0cmVlLnBvc2l0aW9uLnogPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1O1xuICAgICAgICB0cmVlLmlzUGlja2FibGUgPSB0cnVlO1xuXG4gICAgICAgIC8vU29tZSBcImRlYWRcIiB0cmVlc1xuICAgICAgICBpZiAoIE1hdGgucm91bmQoIE1hdGgucmFuZG9tKCkgKiA1ICkgPT09IDAgKSB7XG4gICAgICAgICAgICB0cmVlLmFuZ2xlID0gTWF0aC5QSSAqIDkwIC8gMTgwO1xuICAgICAgICAgICAgdHJlZS5wb3NpdGlvbi55ID0gLTAuMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQ3JlYXRlIGEgbWFuYWdlciBmb3IgdGhlIHBsYXllcidzIHNwcml0ZSBhbmltYXRpb25cbiAgICB2YXIgc3ByaXRlTWFuYWdlclBsYXllciA9IG5ldyBCQUJZTE9OLlNwcml0ZU1hbmFnZXIoIFwicGxheWVyTWFuYWdlclwiLCBcImFwcC9hc3NldHMvdGV4dHVyZXMvcGxheWVyLnBuZ1wiLCAyLCA2NCwgc2NlbmUgKTtcblxuICAgIC8vIEZpcnN0IGFuaW1hdGVkIHBsYXllclxuICAgIHZhciBwbGF5ZXIgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwicGxheWVyXCIsIHNwcml0ZU1hbmFnZXJQbGF5ZXIgKTtcbiAgICBwbGF5ZXIucGxheUFuaW1hdGlvbiggMCwgNDAsIHRydWUsIDEwMCApO1xuICAgIHBsYXllci5wb3NpdGlvbi55ID0gLTAuMztcbiAgICBwbGF5ZXIuc2l6ZSA9IDAuMztcbiAgICBwbGF5ZXIuaXNQaWNrYWJsZSA9IHRydWU7XG5cbiAgICAvLyBTZWNvbmQgc3RhbmRpbmcgcGxheWVyXG4gICAgdmFyIHBsYXllcjIgPSBuZXcgQkFCWUxPTi5TcHJpdGUoIFwicGxheWVyMlwiLCBzcHJpdGVNYW5hZ2VyUGxheWVyICk7XG4gICAgcGxheWVyMi5zdG9wQW5pbWF0aW9uKCk7IC8vIE5vdCBhbmltYXRlZFxuICAgIHBsYXllcjIuY2VsbEluZGV4ID0gMjsgLy8gR29pbmcgdG8gZnJhbWUgbnVtYmVyIDJcbiAgICBwbGF5ZXIyLnBvc2l0aW9uLnkgPSAtMC4zO1xuICAgIHBsYXllcjIucG9zaXRpb24ueCA9IDE7XG4gICAgcGxheWVyMi5zaXplID0gMC4zO1xuICAgIHBsYXllcjIuaW52ZXJ0VSA9IC0xOyAvL0NoYW5nZSBvcmllbnRhdGlvblxuICAgIHBsYXllcjIuaXNQaWNrYWJsZSA9IHRydWU7XG5cblxuICAgIC8vIFBpY2tpbmdcbiAgICAvL3Nwcml0ZU1hbmFnZXJUcmVlcy5pc1BpY2thYmxlID0gdHJ1ZTtcbiAgICBzcHJpdGVNYW5hZ2VyUGxheWVyLmlzUGlja2FibGUgPSB0cnVlO1xuXG4gICAgc2NlbmUub25Qb2ludGVyRG93biA9IGZ1bmN0aW9uICggZXZ0ICkge1xuICAgICAgICB2YXIgcGlja1Jlc3VsdCA9IHNjZW5lLnBpY2tTcHJpdGUoIHRoaXMucG9pbnRlclgsIHRoaXMucG9pbnRlclkgKTtcbiAgICAgICAgaWYgKCBwaWNrUmVzdWx0LmhpdCApIHtcbiAgICAgICAgICAgIHBpY2tSZXN1bHQucGlja2VkU3ByaXRlLmFuZ2xlICs9IDAuNTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0iXX0=
