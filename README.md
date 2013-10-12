# astar3d

## A three-dimensional a-star algorithm.
This is an implementation of the a-star algorithm using realistic three-dimensional pathfinding displayed with WebGL.

The A-star algorithm is a pathfinding algorithm computing the shortest path between two nodes using a specific heuristc. Focus of this project is the algorithm itself so some graphics and controls are only implemented as prototypes. 

For upcoming features, todos and first runtime measurements take a look at the issues on github.

## Demo
Try it out [here](http://aeife.github.com/astar3d/app/)!

## Features
* a-star path navigation considering three dimensions
* 3D graphics using WebGL and Three.js 
* full customizable three-dimensional level build of cubes
    * easy add and remove cubes
    * impassable wall nodes
* import and export levels (as plain JSON)
* generate random levels
	* flat levels with random walls
	* levels with random walls and random (walkable placed) heights
* customizable height factor for avoiding heights during path finding
* realistic paths usable in computer games for example
    * using all three dimensions to compute ground navigatation
    * no flying paths
    * no paths through ground
* fast algorithm runtime 
    * 12.000 traversed nodes in 30ms
* integrated runtime tests
    * random tests
    * specific user defined tests

## Dependencies
* jQuery
* Three.js

## HowTo
Current controls (will change probably)

### generating levels
* level width and height definable

#### generate level
* generates flat level

#### generate random level
* generates flat level with random walls (adjustable wall frequency)

#### generate full random level
* generates level with random walls and random heights

### edit
* starts edit mode
* add node: left click on any node face
* delete node: right click
* wall: ctrl + left click

### pathfinding

#### define start and end nodes
* left click: define start node
* rigt click: define end node

#### defining the heuristic
* euclidean
* manhatten

#### height factor
* defines if and how heights are avoided

#### show path info
* show the status of all nodes at the end of the algorithm

#### starting the algorithm
* start/end nodes need to be defined
* start algorithm: process

#### view node properties
* middle mouse button on node (after algorithm execution)

#### clear
* clears all temporary markers and properties

### testing
* tests traversed nodes in relation to time needed (in ms)
* all result are printed to console
* for each dimension and test run:
    * 50 repetions
    * excluding 20 warmups

#### simple test
* generates level
* pathfinding between opposite corners
    * for specified dimensions

#### random test
* like simple test using random level

#### full random test
* like simple test using full random level

#### test current level
* tests on current build level

#### specific test
* uses current level
* specify test ->
    * define start node
    * define multiple end nodes
* run specified test ->
    * test runs from start node to each end node specified

### exporting and importing levels

#### save
* saves current level as json file

#### load
* loads level from file (json format) and displays it in the current scene
* overrides the current level

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
