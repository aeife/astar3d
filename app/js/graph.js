function Graph(){

    var camera, scene, projector, renderer;
    var container;
    this.node = [];
    this.nodeMeshes = [];
    var that = this;
    var GraphHeight = 10;
    var clock = new THREE.Clock();
    var controls;

    var wallColor = 0x000000;
    var openColor = 0xFFFFE5;
    var closedColor = 0xCCCCC0;

    this.leftClickMode = "normal";

    this.startNode;
    this.endNode;
    
    this.savedLevel;

    var wallBtn = false;

    this.nodeInfo = 1;

    Graph.prototype.init = function() {

        container = document.createElement( 'div' );
        $(container).attr('id', 'container');
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2500);
        camera.position.set(window.innerWidth/2, window.innerWidth/2, 1000);
        //camera.lookAt(new THREE.Vector3(window.innerWidth/2,window.innerWidth/2,0));

        controls = new THREE.FlyControls( camera, container );
        controls.movementSpeed = 500;
        controls.rollSpeed = 0.3;
        controls.dragToLook = true;

        scene = new THREE.Scene();
        scene.add( camera );

        projector = new THREE.Projector();

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        container.appendChild(renderer.domElement);

        //events
        container.addEventListener('mousedown',this.onDocumentMouseDown, false);
        container.addEventListener('contextmenu',function(e){e.preventDefault();}, false);
        container.addEventListener('keydown',this.onDocumentKeyDown, false);
        container.addEventListener('keyup',this.onDocumentKeyUp, false);

        this.animate();
    };

    Graph.prototype.generateLevel = function(x,y,options){
        //clear old stuff
        this.deleteMeshes();
        this.nodeMeshes = [];
        this.node = [];

        for (var i=0; i<x; i++){
            this.node[i]= [];
            for (var j=0; j<y; j++) {
                this.node[i][j] = [];
                if (options.random){
                    this.addNode(i,j,0,!Math.floor(Math.random()*(1/options.wallPercentage)));
                } else {
                    this.addNode(i,j,0);
                }
            }
        }
    };

    Graph.prototype.printPath = function(path){
         for (var i=0; i < path.length; i++) {
            path[i].changeTo("path");
        }
    };

    Graph.prototype.showPathInfo = function(){
        for (var i=0; i<this.node.length; i++){
            if (this.node[i]){
                for (var j=0; j<this.node[i].length; j++) {
                    if (this.node[i][j]){
                        for (var k=0; k<this.node[i][j].length; k++) {
                            if (this.node[i][j][k] && this.node[i][j][k].open) {
                                this.node[i][j][k].changeTo("open");
                            } else if (this.node[i][j][k] && this.node[i][j][k].closed) {
                                this.node[i][j][k].changeTo("closed");
                            }
                        }
                    }
                }
            }
        }
    };

    Graph.prototype.clear = function() {
        for (var i=0; i<this.node.length; i++){
            if (this.node[i]){
                for (var j=0; j<this.node[i].length; j++){
                    if (this.node[i][j]){
                        for (var k=0; k<this.node[i][j].length; k++){
                            if (this.node[i][j][k] && !this.node[i][j][k].wall) {
                                this.node[i][j][k].clear();
                                this.node[i][j][k].changeTo("normal");
                            }
                        }
                    }
                }
            }
        }
    };

    Graph.prototype.addNode = function(x,y,z,wall){
        if (wall === undefined) wall = false;

        //extend field if not existent
        if (!this.node[x]){
            this.node[x] = [];
            this.node[x][y] = [];
        } else if (!this.node[x][y]) {
            this.node[x][y] = [];
        }

        this.node[x][y][z] = new Node(x,y,z);

        if (wall)
            this.node[x][y][z].toggleWall();

        this.nodeMeshes.push(this.node[x][y][z].mesh);
        scene.add(this.node[x][y][z].mesh);
    };

    Graph.prototype.deleteNode = function(x,y,z){
        this.nodeMeshes.splice(this.nodeMeshes.indexOf(this.node[x][y][z].mesh), 1);

        scene.remove(this.node[x][y][z].mesh);

        this.node[x][y][z] = undefined;
    };

    Graph.prototype.save = function(){
        var level = [];
        for (var i=0; i<this.node.length; i++){
            level[i] = [];
            for (var j=0; j<this.node[i].length; j++){
                level[i][j] = [];
                for (var k=0; k<this.node[i][j].length; k++){
                    if (this.node[i][j][k] && this.node[i][j][k].wall) {
                        level[i][j][k] = {wall: true};
                    } else if (this.node[i][j][k]) {
                        level[i][j][k] = {wall: false};
                    }
                }
            }
        }

        this.savedLevel = JSON.stringify(level);
        //var test = JSON.parse(this.savedLevel);
        //console.log(test);
        //console.log(this.savedLevel);
        // open a window with the json
        var dataUri = "data:application/json;charset=utf-8,"+JSON.stringify(level);
        window.open( dataUri, 'mywindow' );

    };

    Graph.prototype.deleteMeshes = function(){
        for (var i=0; i<this.nodeMeshes.length; i++){
            scene.remove(this.nodeMeshes[i]);
        }
    };

    Graph.prototype.load = function(levelJson){
        
        //this.init();

        var level = JSON.parse(levelJson);

        for (var i=0; i<this.nodeMeshes.length; i++){
            scene.remove(this.nodeMeshes[i]);
        }

        this.nodeMeshes = [];

        this.node = [];
        for (var i=0; i<level.length; i++){
            this.node[i] = [];
            for (var j=0; j<level[i].length; j++) {
                this.node[i][j] = [];
                for (var k=0; k<level[i][j].length; k++){
                    if (level[i][j][k]){
                        this.addNode(i,j,k,level[i][j][k].wall);
                    }
                }
            }
        }
    };

    Graph.prototype.onDocumentKeyDown = function(event){
        event.preventDefault();
        switch(event.keyCode) {
            case 17:
                //crtl
                wallBtn = true;
                break;
        }
    };

    Graph.prototype.onDocumentKeyUp = function(event){
        event.preventDefault();
        switch(event.keyCode) {
            case 17:
                wallBtn = false;
                break;
        }
    };

    Graph.prototype.onDocumentMouseDown = function(event) {

        event.preventDefault();

        var vector = new THREE.Vector3((event.clientX/window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
        projector.unprojectVector( vector, camera );

        var ray = new THREE.Ray( camera.position, vector.subSelf(camera.position ).normalize());

        var intersects = [];
        var hitNode;
        
        intersects = ray.intersectObjects(that.nodeMeshes);

        if (intersects.length > 0) {
            hitNode = that.node[intersects[0].object.x][intersects[0].object.y][intersects[0].object.z];
        }

        if (hitNode) {
            if (event.which == 1) {
                switch (that.leftClickMode){
                    case "normal":
                        hitNode.changeTo("start");
                        that.startNode = hitNode;
                        break;
                    case "edit":
                        if (wallBtn) {
                            hitNode.toggleWall();
                            break;
                        }
                        switch (intersects[0].face.d) {
                            case 0:
                                that.addNode(hitNode.x, hitNode.y, hitNode.z+1);
                                break;
                            case 1:
                                if (intersects[0].face.normal.x)
                                    that.addNode(hitNode.x, hitNode.y+1, hitNode.z);
                                else if (intersects[0].face.normal.y)
                                    that.addNode(hitNode.x+1, hitNode.y, hitNode.z);
                                break;
                            case 2:
                                that.addNode(hitNode.x-1, hitNode.y, hitNode.z);
                                break;
                            case 4:
                                that.addNode(hitNode.x, hitNode.y, hitNode.z-1);
                                break;
                            case 5:
                                that.addNode(hitNode.x, hitNode.y-1, hitNode.z);
                                break;
                        }

                        break;
                }
            } else if (event.which == 3){
                switch (that.leftClickMode){
                    case "normal":
                        hitNode.changeTo("end");
                        that.endNode = hitNode;
                        break;
                    case "edit":
                        that.deleteNode(hitNode.x, hitNode.y, hitNode.z);
                        break;
                }
            } else if (event.which == 2){
                that.nodeInfo = hitNode;
                $("#container").trigger("nodeInfo");
            }
        }
    };


    Graph.prototype.animate = function() {
        requestAnimationFrame( that.animate );
        that.render();
    };

    Graph.prototype.render = function() {
        controls.update( clock.getDelta() );
        renderer.render( scene, camera );
    };

}