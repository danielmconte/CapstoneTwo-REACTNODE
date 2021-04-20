import React, { useContext, useEffect, useState } from 'react';
import './Table.css';
import SkeletonContext from './SkeletonContext';
import { Button } from "reactstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Block from './Block';


const Table = ({ spEPGraph, spEP, aPath, tempPresent}) => {
    const dispatch = useDispatch();
    const { wallBlocks } = useSelector(
        (state) => ({
            wallBlocks: state.wallBlocks,
        }),
        shallowEqual
    );
    const { token } = useSelector(
        (state) => ({
            token: state.token,
        }),
        shallowEqual
    );
    const { isAdmin } = useSelector(
        (state) => ({
            isAdmin: state.isAdmin,
        }),
        shallowEqual
    );

    const { skeleton, pathArr, confirmed, resetTable } = useContext(SkeletonContext);
    console.log(skeleton);
    console.log(confirmed)


    const [clicked, setClicked] = useState(0);
    const [pathDupe, setPathDupe] = useState([]);


     
    
  
    useEffect(() => {
        if(pathArr.length){
        setTimeout(function(){ 
            let bluePathElement = pathArr[0].shift()
            let bluePath = aPath.push(bluePathElement)
            setPathDupe(bluePath); 
        }, 100);
        } 

    }, [pathDupe]);

    useEffect(() => {
        if (tempPresent) {
            setClicked(clicked + 1);
        }
    }, [tempPresent]);

    const resetClick = (evt) => {
        setClicked(0);
        dispatch({
            type: "RESET_ALL",
            payload: { token: token, isAdmin: isAdmin },
        });
        resetTable(evt);
    };

    const addBlocks = (block, id) => {
        if (wallBlocks.includes(block)) {
            dispatch({ type: "DELETE_WALL", id });
        } else {
            dispatch({
                type: "ADD_WALL",
                wallBlocks,
                value: block,
            });
        }
    };

    const startEndClick = (spEP) => {
        if (clicked === 1) {
            setClicked(clicked + 1);
        } else {
            setClicked(clicked + 1);
            setPathDupe(aPath);
            spEPGraph(spEP, wallBlocks);
        }
    };

    const toStartClick = () => {
        setClicked(clicked + 1);
    };

    return (
        <>
            {confirmed === true && clicked < 1 ? (
                <div>
                    <span>I'm ready to pick a start and end point </span>
                    <Button className="btn btn-sm bg-success" onClick={toStartClick}>
                        Go!
                    </Button>
                </div>
            ) : null}

            <form onSubmit={resetClick}>
                <Button className="my-2"    color="danger">    
                    RESET
                </Button>
            </form>

      
            <table className="my-4" id="table">
                <tbody>
                    {skeleton.map((p) => (
                        <tr>
                            {p.map((j) => (
                                <Block
                                    id={j}
                                    className={
                                        pathArr.length && aPath.includes(j)
                                            ? "pathBlock"
                                            : null
                                    }
                                    addBlocks={addBlocks}
                                    startEndClick={startEndClick}
                                    clicked={clicked}
                                    spEP={spEP}
                                    wallColors={
                                        wallBlocks.length &&
                                        wallBlocks.includes(j)
                                            ? "slategray"
                                            : null
                                    }
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;