function Level(){



    

    Level.prototype.init = function() {
        var container;
        var camera, scene, projector, renderer;

        var cubes = [];


        this.animate();

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 300, 3000);

        scene = new THREE.Scene();

        scene.add( camera );

        var geometry = new THREE.CubeGeometry(100, 100, 100);


        for (var i=0; i<10; i++){
            cubes[i]= [];
            for (var j=0; j<10; j++) {
                cubes[i][j] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff}));
                cubes[i][j].position.y = 120*i;
                cubes[i][j].position.x = 120*j;

                scene.add(cubes[i][j]);
            }
        }

        projector = new THREE.Projector();

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(renderer.domElement);

        document.addEventListener('mousedown', this.onDocumentMouseDown(cubes), false);

    }

    Level.prototype.onDocumentMouseDown = function(event, cubes) {

        event.preventDefault();

        var vector = new THREE.Vector3((event.clientX/window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
        projector.unprojectVector( vector, camera );

        var ray = new THREE.Ray( camera.position, vector.subSelf(camera.position ).normalize());

        var intersects = [];
        for (i=0; i<20; i++){
            //intersects.push.apply(intersects,ray.intersectObjects(cubes[i]));
            intersects = ray.intersectObjects(cubes[i]);
            if (intersects.length > 0) break;
        }

        if ( intersects.length > 0 ) {
            intersects[ 0 ].object.material.color.setHex(0x000000);
        }

        /*
        // Parse all the faces
        for ( var i in intersects ) {

            intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

        }
        */
    };

    Level.prototype.animate = function() {
        requestAnimationFrame( this.animate );
        this.render();
    };

    Level.prototype.render = function(scene, camera) {
        renderer.render( scene, camera );
    };

}