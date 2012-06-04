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

## HowTo
During development all control elements are just prototypes, thats why the GUI may not be self explanatory. All GUI related stuff will be made more intuitiv during the project.

Here are some instructions how to use the current controls:

### generating levels

#### generate level
Generates a flat level with the defined dimensions.

#### generate random level
Generates a flat level with the defined dimensions and random set walls. The drop down menu defines the wall frequency of the generated level in percent.

#### generate full random level
Generates a level with random set walls and random heights. At the moment heights are between 0 and 3, so the generated level will be mostly walkable.

### edit
The button "edit" starts the edit mode. All following action can only be done in edit mode.

#### add nodes
Users can set new nodes with a left click. Nodes can be added to any face of an existing node.

#### delete nodes
To delete a node just right click on it. All nodes can be deleted.

#### adding walls
An existing node can be set as a wall by left clicking on it while holding the ctrl-key. Wall nodes are impassable nodes.

### pathfinding

#### define start and end nodes
The a-star algorithm needs a start and an end node for pathfinding. To define a start node, just left click on one node. The node will be marked as red.
An end node can be defined by right clicking on a node. End nodes are marked as blue.

#### defining the heuristic
Astar uses a heuristic distances between nodes. With the drop down menu users can choose between different heuristics. The standard heuristic is the euclidean distance.

#### height factor
The height factor defines how much the algorithm will avoid heights. A high height factor means the algorithm will avoid most heights and climbing if possible. The resulting path will still be the shortest path, considering the height factor.
A low height factor means the algorithm will not or only a little avoid heights. With the lowest height factor all dimensions will be handled equally by the algorithm. 

#### diagonal movement
This enables diagonal movement.

#### show path info
When this checkbox is checked the status of all nodes will be marked after the node algorithm processed. This status can be "open" and "closed". For more information about the markers look in the legend.

#### starting the algorithm
To start the algorithm a start and end node need to be defined. After that the "process" button can be pressed. The algorithm will find a path and mark all path nodes green.

#### view node properties
After the algorithm has found a path you can view the properties of a specific node with a middle mousebutton click on a node. 

#### clear
The "clear" button clears all markers like path nodes or start/end nodes in the level. It also will clear properties of nodes.

### testing
The application includes several build in tests which test the time (in ms) needed for a specific amount of traversed nodes. All results of the tests will be printed to the console.

#### simple test
The simple test will test pathfinding on a flat level without heights. The tested dimensions can be defined by the input fields.
For each dimension the test automatically navigates from the 0,0,0-node to the node in the oposite corner of the level. Each run has 50 repetitions and 20 additional warmups in before.

#### random test
The random test works like the simple test with the addition that it uses random generated levels. So the test for each dimension will include walls with the defined wall frequency. If there is no path for a generated level the test will regenerate it until a path is possible.

#### full random test
Like the random test the full random test is an addition. It uses the full random generation for the tested levels. So it will test levels with random walls and random heights. It also will regenerate a level if there is no path.

#### specific test
This test can be specified by the user and uses the current imported or edited level. 
With the "specify test" button the specific test mode can be entered. In this mode the user can define a start node and multiple(!) end nodes.
The "run specified test" button starts the test. This will start test runs searching paths from the start node to each defined end node. Each test run still has 50 repetitions and 20 additional warmups. If a defined end node is not reachable it will be skipped.

### exporting and importing levels

#### save
To save a level click on the "save" button. This will save the current level with defined heights and walls and opens a new windows with the resulting json.

#### load
A saved level can be loaded by just copying the json into the input field.

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