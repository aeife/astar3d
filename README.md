# astar3d

## A three-dimensional a-star algorithm.
This is an implementation of the a-star algorithm using realistic three-dimensional pathfinding displayed with WebGL.

## Features
* a-star path navigation considering three dimensions
* 3d graphics using WebGL and Three.js 
* full customizable three-dimensional level build of blocks
    * free extendable in all dimensions
    * impassable wall nodes
* import and export levels (json)
* generate random levels
* customizable height factor for avoiding heights
* realistic paths
    * using all three dimensions to ground navigate
    * no flying paths
    * no paths through ground
* fast algorithm runtime 
    * 12.000 traversed nodes in 22ms
* integrated runtime tests

## Dependencies
* jQuery 1.7.1
* Three.js

## Main components

### astar.js
The actual algorithm.

### node.j
The node class.

### graph.js
The graph object for building the three-dimensional level and structur.

## helpers.js
Some helpers.

### Resources
todo...