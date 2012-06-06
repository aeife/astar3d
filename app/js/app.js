$(function() {
    var levelWidth = 10;
    var levelHeight = 10;
    var graph;
    var astar;
    var options = {diagonal: false, heuristic: "euclidean", animate: "true", heightFactor: 0.5};
    var showPathInfo = false;
    var levelJson;
    var graphOptions = {random: false, fullRandom: false, wallPercentage: 0};
    var testStartDimension = 10;
    var testEndDimension = 15;

    init();

    $("#levelWidth").change(function() {
        levelWidth = $("#levelWidth").val();
    });
    $("#levelHeight").change(function() {
        levelHeight = $("#levelHeight").val();
    });

    $("#diagonal").change(function() {
        options.diagonal = !!$("#diagonal").attr("checked");
    });

    $("#pathInfo").change(function() {
        if ($("#pathInfo").attr("checked")) {
            showPathInfo = true;
            graph.showPathInfo();
        } else {
            showPathInfo = false;
            graph.clearPathInfo();
        }
    });

    $("#heuristic").change(function() {
        options.heuristic = $(this).val();
    });

    $("#heightFactor").change(function() {
        options.heightFactor = $(this).val();
    });

    $("#wallPercentage").change(function() {
        graphOptions.wallPercentage = $(this).val();
    });

    $("#testStartDimension").change(function() {
        testStartDimension = $("#testStartDimension").val();
    });

    $("#testEndDimension").change(function() {
        testEndDimension = $("#testEndDimension").val();
    });

    $("#runTests").click(function() {
        graphOptions.random = false;
        graphOptions.fullRandom = false;
        runTests();
    });

    $("#runRandomTests").click(function() {
        graphOptions.random = true;
        runTests();
    });

    $("#runFullRandomTests").click(function() {
        graphOptions.random = false;
        graphOptions.fullRandom = true;
        runTests();
    });

    $("#runTestsOnCurrentLevel").click(function() {
        runTestsOnCurrentLevel();
    });

    $("#runSpecifiedTests").click(function() {
        graphOptions.random = false;
        runSpecifiedTests();
    });

     $("#specifyTest").click(function() {
        if (graph.rightClickMode == "specifyTest") {
            graph.rightClickMode = "normal";
            $("#messages").html("");
        } else {
            graph.rightClickMode = "specifyTest";
            $("#messages").html("SPECIFY TEST NODES");
        }
    });

    $("#generateLevel").click(function() {
        graphOptions.random = false;
        graph.generateLevel(levelWidth, levelHeight, graphOptions);
    });

    $("#generateLevelRandom").click(function() {
        graphOptions.random = true;
        graph.generateLevel(levelWidth, levelHeight, graphOptions);
    });

    $("#generateLevelFullRandom").click(function() {
        graphOptions.random = false;
        graphOptions.fullRandom = true;
        graph.generateLevel(levelWidth, levelHeight, graphOptions);
    });
    
    $("#processBtn").click(function() {
        pathfinding();
    });

    $("#clearBtn").click(function() {
        graph.clear();
    });

    $("#editBtn").click(function() {
        if (graph.leftClickMode == "edit") {
            graph.leftClickMode = "normal";
            $("#messages").html("");
        } else {
            graph.leftClickMode = "edit";
            $("#messages").html("EDITMODE");
        }
    });

    $("#saveBtn").click(function() {
        graph.save();
    });

    $("#loadFile").change(function(evt){
        var f = evt.target.files[0]; 

        if (f) {
            var r = new FileReader();
            r.onload = function(e) { 
                console.log("LOAD");
                levelJson = e.target.result;
            }
        r.readAsText(f);
        } else { 
            alert("Failed to load file");
        }
    });

    $("#loadBtn").click(function() {
        graph.load(levelJson);
    });

    $("#container").on("nodeInfo",function() {
            $("#nodeInfo").html("Node[" + graph.nodeInfo.x + "][" + graph.nodeInfo.y + "][" + graph.nodeInfo.z + "]" + " <br/>" +
                                "f-Score:" + graph.nodeInfo.f.toFixed(2) + "<br/>" +
                                "h-Score:" + graph.nodeInfo.h.toFixed(2) + "<br/>" +
                                "g-Score:" + graph.nodeInfo.g.toFixed(2) + "<br/>");
        
    });

    function pathfinding() {
        var startTime = new Date();
        var result = astar.process(graph.node, graph.startNode, graph.endNode, options);
        var endTime = new Date();

        result.time = endTime-startTime;

        //console.log("Time: " + result.time + " ms");
        analysis(result);
        
        return result;
        
    }

    function analysis(result) {
        if (showPathInfo)
            graph.showPathInfo(result.path);
        
        graph.printPath(result.path);

        $("#pathLength").html("path length: " + result.path.length + "<br/>");
        $("#traversedNodes").html("traversed Nodes: " + result.traversedNodes + "<br/>");
        $("#time").html("time: " + result.time + " ms" + "<br/>");
    }

    function init() {
        $("#container").empty().remove();
        graph = new Graph();
        graph.init();
        graph.generateLevel(levelWidth, levelHeight, graphOptions);
        //graph.generate(levelWidth,levelHeight);
        //graph.printGraph();
        graphOptions.random = false;
        astar = new AStar();
    }


    function runSpecifiedTests(){
        var warmup = 20;
        var repetitions = 50;
        var result;
        var timeAverage;
        var test = $("#test");

        var testResults = "";

        console.log("running specified test...");

        for (var i=0; i<graph.testEndNodes.length; i++) {
            levelWidth = i;
            levelHeight = i;
            console.log("path to: " + graph.testEndNodes[i].x + " "
                                    + graph.testEndNodes[i].y + " "
                                    + graph.testEndNodes[i].z + " ");

            //generate level and test if path exists
            console.log("testing level...");
            graph.clear();
            graph.startNode = graph.startNode;
            graph.endNode = graph.testEndNodes[i];
            result = pathfinding();

            if (result.path.length != 0){
                timeAverage = 0;
                for (var j=0; j<repetitions+warmup; j++) {
                    //console.log("repetition " + j);
                    graph.clear();
                    result = pathfinding();

                    if (j > warmup-1) {
                        timeAverage += result.time;
                    }
                }
                timeAverage = timeAverage/repetitions;
                console.log("path length: " + result.path.length);
                console.log("traversed elements: " + result.traversedNodes);
                console.log("average time: " + timeAverage);
                //test.append(result.traversedNodes + "    " + timeAverage + "\n");
                testResults += result.path.length + "\t" + result.traversedNodes + "\t" + timeAverage + "\r\n";
            } else {
                console.log("skipping node, not accessable")
            }
        }
        console.log("TESTRESULTS:\n" + testResults);
    }

    function runTestsOnCurrentLevel() {
        var warmup = 20;
        var startDimension = testStartDimension;
        var endDimension = testEndDimension;
        var repetitions = 50;
        var result;
        var timeAverage;
        var test = $("#test");

        var testEvery = 5;
        var testResults = "";

        graph.startNode = graph.node[0][0][graph.leftLowerCornerHeight];

        for (var i=0; i<levelWidth; i+=testEvery) {
            //get height
            for (var h = 15; h>=0; h--){
                if (graph.node[i][i][h]) {
                    graph.endNode = graph.node[i][i][h];
                    break;
                }
            }
            console.log(graph.endNode);
            graph.clear();
            result = pathfinding();
            console.log(result.path);
            if (result.path.length !== 0){
                console.log("testing node[" + i + "][" + i + "][" + graph.endNode.z + "]");

                timeAverage = 0;
                for (var j=0; j<repetitions+warmup; j++) {
                    //console.log("repetition " + j);
                    graph.clear();
                    result = pathfinding();

                    if (j > warmup-1) {
                        timeAverage += result.time;
                    }
                }
                timeAverage = timeAverage/repetitions;
                console.log("path length: " + result.path.length);
                console.log("traversed elements: " + result.traversedNodes);
                console.log("average time: " + timeAverage);
                //test.append(result.traversedNodes + "    " + timeAverage + "\n");
                testResults += result.path.length + "\t" + result.traversedNodes + "\t" + timeAverage + "\r\n";
            }
        }
        console.log("TESTRESULTS:\n" + testResults);
    }

    function runTests() {
        var warmup = 20;
        var startDimension = testStartDimension;
        var endDimension = testEndDimension;
        var repetitions = 50;
        var result;
        var timeAverage;
        var test = $("#test");

        var testEvery = 5;
        var testResults = "";

        for (var i=startDimension; i<=endDimension; i+=testEvery) {
            levelWidth = i;
            levelHeight = i;
            console.log(i + "x" + i + " Level:");

            //generate level and test if path exists
            do {
                console.log("generating level...");
                graph.clear();
                graph.generateLevel(levelWidth, levelHeight, graphOptions);
                graph.startNode = graph.node[0][0][graph.leftLowerCornerHeight];
                graph.endNode = graph.node[i-1][i-1][graph.rightUpperCornerHeight];
                result = pathfinding();

                if (result.path.length === 0) {
                    graph.startNode = graph.node[i-1][0][graph.leftUpperCornerHeight];
                    graph.endNode = graph.node[0][i-1][graph.rightLowerCornerHeight];
                    result = pathfinding(); 
                }
            } while (result.path.length === 0);

            timeAverage = 0;
            for (var j=0; j<repetitions+warmup; j++) {
                //console.log("repetition " + j);
                graph.clear();
                result = pathfinding();

                if (j > warmup-1) {
                    timeAverage += result.time;
                }
            }
            timeAverage = timeAverage/repetitions;
            console.log("path length: " + result.path.length);
            console.log("traversed elements: " + result.traversedNodes);
            console.log("average time: " + timeAverage);
            //test.append(result.traversedNodes + "    " + timeAverage + "\n");
            testResults += result.path.length + "\t" + result.traversedNodes + "\t" + timeAverage + "\r\n";

        }
        console.log("TESTRESULTS:\n" + testResults);
    }
});