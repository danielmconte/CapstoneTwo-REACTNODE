import React, { useState } from 'react';
import Table from './Table';
import SkeletonContext from './SkeletonContext';
import {WeightedGraph} from './ShortestPathAlgo';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import BackendTemplates from "./BackendTemplates";

const GridSkeleton = ({
    inputHeight,
    inputWidth,
    confirmed,
    resetTable,
    confirmation,
}) => {
    const [tempPresent, setTempPresent] = useState(false);
    let count = 1;
    const alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const dispatch = useDispatch();
    const { wallBlocks } = useSelector(
        (state) => ({
            wallBlocks: state.wallBlocks,
        }),
        shallowEqual
    );
    const { height, width } = useSelector(
        (state) => ({
            height: state.height,
            width: state.width,
        }),
        shallowEqual
    );

    const { confirming } = useSelector((state) => ({
        confirming: state.confirming,
    }));
    let skeleton = [];
    let spEP = [];
    let pathArr = [];
    let aPath = [];
    let gridWall = [];
    let graph;

    const makeSkeleton = (height, width) => {
        for (let y = 0; y < height; y++) {
            let letter = alphabet.shift();
            let row = [];
            for (let x = 0; x <= width; x++) {
                if (count <= width) {
                    row.push(`${letter}${count}`);
                    count++;
                } else {
                    count = 1;
                }
            }
            skeleton.push(row);
        }
    };

    if (tempPresent === true) {
        makeSkeleton(height, width);
    } else {
        makeSkeleton(inputHeight, inputWidth);
    }

    const makeNewGraph = (arr, graph) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                graph.addVertex(arr[i][j]);
            }
        }
        return graph;
    };

    const addEdges = (arr, graph) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (i === arr.length - 1 && j != arr[i].length - 1) {
                    graph.addEdge(arr[i][j], arr[i][j + 1], 1);
                } else if (i === arr.length - 1 && j === arr[i].length - 1) {
                    return graph;
                } else {
                    if (j != arr[i].length - 1) {
                        graph.addEdge(arr[i][j], arr[i][j + 1], 1);
                        graph.addEdge(arr[i][j], arr[i + 1][j], 1);
                    } else {
                        // if(j === arr[i].length - 1)
                        graph.addEdge(arr[i][j], arr[i + 1][j], 1);
                    }
                }
            }
        }
        return graph;
    };

    const removeVertices = (arr, graph) => {
        for (let i = 0; i < arr.length; i++) {
            graph.removeVertex(arr[i]);
        }
        return graph;
    };

    const spEPGraph = (spEP, arr) => {
        if (tempPresent) {
            getTemplate();
        } else {
            newGraph(arr);
        }
        let pathed = graph.Dijkstra(spEP[0], spEP[1]);
        if(pathed.length <= 1){
            alert("No luck, reset please")
        };     

        pathArr.push(pathed);
        pathArr[0].pop();
        pathArr[0].shift();
    };

    const newGraph = (arr) => {
        graph = new WeightedGraph();
        let graphVertex = makeNewGraph(skeleton, graph);
        addEdges(skeleton, graphVertex);
        removeVertices(arr, graph);

        return graph;
    };

    const templateFropmBackend = (curHeight, curWidth, wall) => {
        gridWall = wall.split(",");
        resetTable();
        dispatch({
            type: "TEMPLATE_WALL",
            wallBlocks,
            value: gridWall,
        });
        dispatch({
            type: "CHANGE_DIMENSIONS",
            curHeight,
            curWidth,
        });
        setTempPresent(true);

        confirmation();
    };

    const getTemplate = () => {
        graph = new WeightedGraph();
        let graphVertex = makeNewGraph(skeleton, graph);
        addEdges(skeleton, graphVertex);
        removeVertices(wallBlocks, graph);

        return graph;
    };



    return (
        <>
            <SkeletonContext.Provider
                value={{ skeleton, pathArr, confirmed, resetTable }}
            >
                <BackendTemplates tempMaker={templateFropmBackend} />
                <Table 
                    spEPGraph={spEPGraph}
                    wallBlocks={wallBlocks}
                    spEP={spEP}
                    tempPresent={tempPresent}
                    aPath={aPath}
                />
            </SkeletonContext.Provider>
        </>
    );
};

export default GridSkeleton;