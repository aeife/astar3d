function AStar () {   
}

AStar.prototype.process = function(node, startNode, endNode, options) {
    var openList = [];
    openList.push(startNode);
    startNode.open = true;

    var traversedNodes = 1;

    startNode.g = 0;
    startNode.h = this.heuristic(startNode, endNode, options.heuristic, options.heightFactor);
    startNode.f = startNode.g + startNode.h;

    while(openList.length > 0) {
        
        var currentIndex = this.getNextIndex(openList);
        
        var currentNode = openList[currentIndex];

        if (currentNode == endNode) {
            

            var path = [];
            var aNode = currentNode;

            while(aNode.cameFrom) {
                path.push(aNode);
                aNode = aNode.cameFrom;
            }
            path.push(startNode);

            return {path: path,traversedNodes: traversedNodes};
        }

        openList.remove(currentIndex);
        currentNode.open = false;
        currentNode.closed = true;

        var neighbors = this.getNeighbors(currentNode, node, options.diagonal);
        
        for (var i=0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if(neighbor.closed || neighbor.wall) {
                continue;
            }

            //var tentative_g = currentNode.g + this.distance(currentNode,neighbor);
            var tentative_g = currentNode.g + 1;

            var tentativeIsBetter = false;

            if (!neighbor.open) {
                neighbor.open = true;
                neighbor.h = this.heuristic(neighbor,endNode, options.heuristic, options.heightFactor);
                openList.push(neighbor);
                traversedNodes++;
                tentativeIsBetter = true;
            } else if (tentative_g < neighbor.g) {
                tentativeIsBetter = true;
            } else {
                tentativeIsBetter = false;
            }

            if (tentativeIsBetter) {
                neighbor.cameFrom = currentNode;
                neighbor.g = tentative_g;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    return {path: [],traversedNodes: traversedNodes};
};

AStar.prototype.heuristic = function(nodeA, nodeB, heuristic, heightFactor) {
    if (heuristic == "manhatten") {
        return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y) + (Math.abs(nodeA.z - nodeB.z)*heightFactor);
    } else if (heuristic == "euclidean") {
        return Math.sqrt(Math.pow((nodeA.x-nodeB.x),2) + Math.pow((nodeA.y-nodeB.y),2) + (Math.pow((nodeA.z-nodeB.z),2)*heightFactor));
    }
};

AStar.prototype.getNextNode = function(openList) {
    var nextNode;
    var minimumF;
    for(var i=0; i<openList.length; i++) {
        if(openList[i].f < minimumF) {
            minimumF = openList[i].f;
            nextNode = openList[i];
        }
    }
   return nextNode;
};

AStar.prototype.getNextIndex = function(openList) {
    var nextIndex = 0;
    var minimumF;
    for(var i=0; i<openList.length; i++) {
        if(openList[i].f < openList[nextIndex].f) {
            nextIndex = i;
        }
    }
   return nextIndex;
};

AStar.prototype.getNeighbors = function(aNode, node, diagonal) {
    var neighbors = [];
    var x = aNode.x;
    var y = aNode.y;
    var z = aNode.z;

    //4-Way

    //down
    if(node[x-1] && node[x-1][y] && node[x-1][y][z] && !node[x-1][y][z+1]) {
        neighbors.push(node[x-1][y][z]);
    }

    //up
    if(node[x+1] && node[x+1][y] && node[x+1][y][z] && !node[x+1][y][z+1]) {
        neighbors.push(node[x+1][y][z]);
    }

    //left
    if(node[x] && node[x][y-1] && node[x][y-1][z] && !node[x][y-1][z+1]) {
        neighbors.push(node[x][y-1][z]);
    }

    //right
    if(node[x] && node[x][y+1] && node[x][y+1][z] && !node[x][y+1][z+1]) {
        neighbors.push(node[x][y+1][z]);
    }

    //bottom down
    if(node[x-1] && node[x-1][y] && node[x-1][y][z-1] && !node[x-1][y][z] && !node[x-1][y][z+1]) {
        neighbors.push(node[x-1][y][z-1]);
    }

    //bottom up
    if(node[x+1] && node[x+1][y] && node[x+1][y][z-1] && !node[x+1][y][z] && !node[x+1][y][z+1]) {
        neighbors.push(node[x+1][y][z-1]);
    }

    //bottom left
    if(node[x] && node[x][y-1] && node[x][y-1][z-1] && !node[x][y-1][z] && !node[x][y-1][z+1]) {
        neighbors.push(node[x][y-1][z-1]);
    }

    //bottom right
    if(node[x] && node[x][y+1] && node[x][y+1][z-1] && !node[x][y+1][z] && !node[x][y+1][z+1]) {
        neighbors.push(node[x][y+1][z-1]);
    }

    //top down
    if(node[x-1] && node[x-1][y] && node[x-1][y][z+1] && !node[x-1][y][z+2] && !node[x][y][z+2]) {
        neighbors.push(node[x-1][y][z+1]);
    }

    //top up
    if(node[x+1] && node[x+1][y] && node[x+1][y][z+1] && !node[x+1][y][z+2] && !node[x][y][z+2]) {
        neighbors.push(node[x+1][y][z+1]);
    }

    //top left
    if(node[x] && node[x][y-1] && node[x][y-1][z+1] && !node[x][y-1][z+2] && !node[x][y][z+2]) {
        neighbors.push(node[x][y-1][z+1]);
    }

    //top right
    if(node[x] && node[x][y+1] && node[x][y+1][z+1] && !node[x][y+1][z+2] && !node[x][y][z+2]) {
        neighbors.push(node[x][y+1][z+1]);
    }


    //8-Way
    if (diagonal) {
        //left down
        if(node[x-1] && node[x-1][y-1] && node[x-1][y-1][z] && !node[x-1][y-1][z+1]) {
                neighbors.push(node[x-1][y-1][z]);
            }
        
        //left up
        if(node[x+1] && node[x+1][y-1] && node[x+1][y-1][z] && !node[x+1][y-1][z+1]) {
            neighbors.push(node[x+1][y-1][z]);
        }

        //right down
        if(node[x-1] && node[x-1][y+1] && node[x-1][y+1][z] && !node[x-1][y+1][z+1]) {
            neighbors.push(node[x-1][y+1][z]);
        }

        //right up
        if(node[x+1] && node[x+1][y+1] && node[x+1][y+1][z] && !node[x+1][y+1][z+1]) {
            neighbors.push(node[x+1][y+1][z]);
        }

        //bottom left down
        if(node[x-1] && node[x-1][y-1] && node[x-1][y-1][z-1] && !node[x-1][y-1][z] && !node[x-1][y-1][z+1]) {
                neighbors.push(node[x-1][y-1][z-1]);
            }
        
        //bottom left up
        if(node[x+1] && node[x+1][y-1] && node[x+1][y-1][z-1] && !node[x+1][y-1][z] && !node[x+1][y-1][z+1]) {
            neighbors.push(node[x+1][y-1][z-1]);
        }

        //bottom right down
        if(node[x-1] && node[x-1][y+1] && node[x-1][y+1][z-1] && !node[x-1][y+1][z] && !node[x-1][y+1][z+1]) {
            neighbors.push(node[x-1][y+1][z-1]);
        }

        //bottom right up
        if(node[x+1] && node[x+1][y+1] && node[x+1][y+1][z-1] && !node[x+1][y+1][z] && !node[x+1][y+1][z+1]) {
            neighbors.push(node[x+1][y+1][z-1]);
        }

        //top left down
        if(node[x-1] && node[x-1][y-1] && node[x-1][y-1][z+1] && !node[x-1][y-1][z+2] && !node[x][y][z+2]) {
                neighbors.push(node[x-1][y-1][z+1]);
            }
        
        //top left up
        if(node[x+1] && node[x+1][y-1] && node[x+1][y-1][z+1] && !node[x+1][y-1][z+2] && !node[x][y][z+2]) {
            neighbors.push(node[x+1][y-1][z+1]);
        }

        //top right down
        if(node[x-1] && node[x-1][y+1] && node[x-1][y+1][z+1] && !node[x-1][y+1][z+2] && !node[x][y][z+2]) {
            neighbors.push(node[x-1][y+1][z+1]);
        }

        //top right up
        if(node[x+1] && node[x+1][y+1] && node[x+1][y+1][z+1] && !node[x+1][y+1][z+2] && !node[x][y][z+2]) {
            neighbors.push(node[x+1][y+1][z+1]);
        }
    }
    return neighbors;
};




