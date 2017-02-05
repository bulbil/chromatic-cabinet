
var cube = {

    camera: null,
    controls: null,
    scene: null,
    geometry: null,
    renderer: null,
    dragControls: null,
    el: document.getElementById('cube'),
    container: document.createElement( 'div' ),
    objects: [],

    init: function (){

        this.el.appendChild( this.container );
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;

        // this.controls = new THREE.TrackballControls( this.camera );
        // this.controls.rotateSpeed = 1.0;
        // this.controls.zoomSpeed = 1.2;
        // this.controls.panSpeed = 0.8;
        // this.controls.noZoom = false;
        // this.controls.noPan = false;
        // this.controls.staticMoving = true;
        // this.controls.dynamicDampingFactor = 0.3;
        this.scene = new THREE.Scene();
        this.scene.add( new THREE.AmbientLight( 0x505050 ) );
        var light = new THREE.SpotLight( 0xffffff, 1.5 );
        light.position.set( 0, 500, 2000 );
        light.castShadow = true;
        light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
        light.shadow.bias = - 0.00022;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        this.scene.add( light );
        this.geometry = new THREE.BoxGeometry( 40, 40, 40 );

        var object = new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600 - 300;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = Math.random() * 2 + 1;
        object.scale.y = Math.random() * 2 + 1;
        object.scale.z = Math.random() * 2 + 1;
        object.castShadow = true;
        object.receiveShadow = true;

        this.scene.add( object );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setClearColor( 0xf0f0f0 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.sortObjects = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.container.appendChild( this.renderer.domElement );
        
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.maxPolarAngle = Math.PI * 0.5;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 7500;


        window.addEventListener( 'resize', this.onWindowResize, false );
    },

    onWindowResize: function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
        
    animate: function() {
        requestAnimationFrame( this.animate.bind(this) );
        this.render();
    },
    
    render: function() {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
}