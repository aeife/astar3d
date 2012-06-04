# astar3d

## A three-dimensional a-star algorithm.
This is an implementation of the a-star algorithm using realistic three-dimensional pathfinding displayed with WebGL.

The A-star algorithm is a pathfinding algorithm computing the shortest path between two nodes using a specific heuristc.Focus of this project is the algorithm itself so some graphics and controls are only implemented as prototypes. 

For upcoming features,todos and first runtime measurements take a look at the issues on github.

## Demo
Try it out [here](http://aeife.github.com/astar3d/app/)!

## Features
* a-star path navigation considering three dimensions
* 3d graphics using WebGL and Three.js 
* full customizable three-dimensional level build of cubes
    * easy add and remove cubes
    * impassable wall nodes
* import and export levels (json)
* generate random levels
	* flat levels with random walls
	* levels with random walls and random (walkable placed) heights
* customizable height factor for avoiding heights
* realistic paths
    * using all three dimensions to ground navigate
    * no flying paths
    * no paths through ground
* fast algorithm runtime 
    * e.g. 12.000 traversed nodes in 30ms
* integrated runtime tests
    * random tests
    * specific user defined tests

## Dependencies
* jQuery 1.7.1
* Three.js

## Main components

### astar.js
The actual a-star algorithm. Just needs a three-dimensional array and start/end nodes as parameter. Also takes options for heuristics and movement types.

### node.js
The node class including properties and the cube mesh.

### graph.js
The graph object for building the three-dimensional level with an array of nodes and serving control functions.

### helpers.js
Some helper methods like additional array functions.

## References
* [Article by Patrick Lester](http://www.policyalmanac.org/games/aStarTutorial.htm)
* [Amit's Game Programming Information](http://www-cs-students.stanford.edu/~amitp/gameprog.html#Paths)
* [A*-Project for Unity by Aron Granberg](http://www.arongranberg.com/unity/)
* [A*-Project with javascript by Brian Grinstead](http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript)