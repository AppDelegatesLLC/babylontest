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

