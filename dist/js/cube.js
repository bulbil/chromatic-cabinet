
// RGB cube based on great answer by Lee Stemkoski
// http://stackoverflow.com/questions/10330342/threejs-assign-different-colors-to-each-vertex-in-a-geometry/11906130#11906130

var cube = {

    // setting constants used by three.js scene
    size: 512,
    camera: null,
    controls: null,
    scene: null,
    geometry: null,
    renderer: null,
    lights: [],
    object: null,
    el: document.getElementById('cube'),
    container: document.createElement( 'div' ),
    objects: [],

    init: function (){

        this.el.appendChild( this.container );

        // camera parameters
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 1000;

        // controls parameters
        this.controls = new THREE.TrackballControls( this.camera );
        this.controls.rotateSpeed = 1.5;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.noZoom = false;
        this.controls.noPan = false;
        this.controls.staticMoving = false;
        this.controls.dynamicDampingFactor = 0.3;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 10200;
        this.scene = new THREE.Scene();

        // ambient light parameters (not necessary with basic mesh material but is with lambert mesh)
        var ambient = ( new THREE.AmbientLight( 0xffffff ) );
        this.lights.push(ambient);

        // var spot = new THREE.SpotLight( 0xffffff, 5 );
        // spot.position.set( 0, 500, 2000 );
        // spot.castShadow = true;
        // spot.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 50, 1, 200, 10000 ) );
        // spot.shadow.bias = - 0.00022;
        // spot.shadow.mapSize.width = 2048;
        // spot.shadow.mapSize.height = 2048;
        // this.lights.push(spot);

        // add lights to scene
        for (light of this.lights) {
            this.scene.add( light );
        }

        // based on Stemkoski stackoverflow example -- assigns colors to vertices, assigns vertices to faces

        // convenience array
        var cubeFaces = [ 'a', 'b', 'c', 'd', 'e', 'f'];

        this.geometry = new THREE.CubeGeometry( this.size, this.size, this.size );
        this.geometry.colorsNeedUpdate = true;

        // iterate through vertices in cubegeometry, create colors, add to geometry colors
        for (var i = 0; i < this.geometry.vertices.length; i++){
            point = this.geometry.vertices[i];

            var color = new THREE.Color( 0xffffff );

            // setting 1 or 0 depending on if point > 0 or < 0
            color.setRGB( 0.5 + point.x / this.size, 0.5 + point.y / this.size, 0.5 + point.z / this.size );

            this.geometry.colors[i] = color;
        }

        // iterate through faces and assign colors vertices grouped in face
        for (var i = 0; i < this.geometry.faces.length; i++){
            face = this.geometry.faces[i];
            numSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
            for ( var j = 0; j < numSides; j++){
                vertexIndex = face[ cubeFaces[j] ];
                face.vertexColors[j] = this.geometry.colors[ vertexIndex ];
            }   
        } 

        var rgbMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: false,
                shading: THREE.FlatShading,
                // enable vertex colors, which looks for vertexColors array in each face
                vertexColors: THREE.VertexColors
            });

        this.object = new THREE.Mesh( this.geometry, rgbMaterial )

        this.object.castShadow = true;

        this.scene.add( this.object );

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setClearColor( 0x666666 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.sortObjects = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.container.appendChild( this.renderer.domElement );

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