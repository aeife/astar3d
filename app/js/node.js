function Node(x,y,z) {
       
    var imageStart = document.createElement( 'img' );
    imageStart.src = "img/start.png";
    this.textureStart = new THREE.Texture(imageStart);

    var imageEnd = document.createElement( 'img' );
    imageEnd.src = "img/end.png";
    this.textureEnd = new THREE.Texture(imageEnd);

    var imageNormal = document.createElement( 'img' );
    imageNormal.src = "img/normal.png";
    this.textureNormal = new THREE.Texture(imageNormal);

    var imageOpen = document.createElement( 'img' );
    imageOpen.src = "img/open.png";
    this.textureOpen = new THREE.Texture(imageOpen);

    var imageClosed = document.createElement( 'img' );
    imageClosed.src = "img/closed.png";
    this.textureClosed = new THREE.Texture(imageClosed);

    var imageWall = document.createElement( 'img' );
    imageWall.src = "img/wall.png";
    this.textureWall = new THREE.Texture(imageWall);

    var imagePath = document.createElement( 'img' );
    imagePath.src = "img/path.png";
    this.texturePath = new THREE.Texture(imagePath);

    var cubeSize = 100;
    var cubeDistance = 0;
    
    var geometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xCCE5E5, wireframe: false, map: this.textureNormal}));
    
    this.mesh.position.y = (cubeSize+cubeDistance)*x;
    this.mesh.position.x = (cubeSize+cubeDistance)*y;
    this.mesh.position.z = (cubeSize+cubeDistance)*z;

    this.mesh.x = x;
    this.mesh.y = y;
    this.mesh.z = z;

    this.mesh.matrixAutoUpdate = false;
    this.mesh.updateMatrix();

    this.x = x;
    this.y = y;
    this.z = z;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.cameFrom = false;
    this.open = false;
    this.closed = false;
    this.path = false;

    this.wall = false;
}

Node.prototype.toggleWall = function() {
    if (this.wall) {
        this.wall = false;
        this.changeTo("normal");
    } else {
        this.wall = true;
        this.changeTo("wall");
    }
};

Node.prototype.changeTo = function(newStatus) {
    switch(newStatus){
        case "normal":
            this.mesh.material.map = this.textureNormal;
            break;
        case "start":
            this.mesh.material.map = this.textureStart;
            break;
        case "end":
            this.mesh.material.map = this.textureEnd;
            break;
        case "wall":
            this.mesh.material.map = this.textureWall;
            break;
        case "path":
            this.mesh.material.map = this.texturePath;
            break;
        case "open":
            this.mesh.material.map = this.textureOpen;
            break;
        case "closed":
            this.mesh.material.map = this.textureClosed;
            break;
    }
};

Node.prototype.clear = function () {
    this.open = false;
    this.closed = false;
    this.path = false;
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.cameFrom = false;
};