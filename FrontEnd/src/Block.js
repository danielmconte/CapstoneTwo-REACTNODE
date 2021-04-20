import React, {useContext, useState} from 'react';
import SkeletonContext from './SkeletonContext';
import { useSelector, shallowEqual } from "react-redux";
import "./Block.css";

const Block = ({
    id,
    className,
    addBlocks,
    startEndClick,
    clicked,
    spEP,
    wallColors,
}) => {
    const [color, setColor] = useState();
    const { confirmed } = useContext(SkeletonContext);

    const { wallBlocks } = useSelector(
        (state) => ({
            wallBlocks: state.wallBlocks,
        }),
        shallowEqual
    );

    let style;
    
    if (wallColors) {
        style = { backgroundColor: wallColors };
    } else if (color) {
        style = { backgroundColor: color };
    }

    const handleClick = (evt) => {
        let idx = wallBlocks.indexOf(evt.target.id);
        if (clicked === 0 && confirmed == true) {
            if (color == "slategray") {
                setColor("paleturquoise");
            } else {
                setColor("slategray");
            }

            addBlocks(evt.target.id, idx);
        } else if (clicked === 1 && confirmed == true) {
            setColor("maroon");
            let SP = evt.target.id;
            spEP.push(SP);
            startEndClick(spEP);
        } else if (clicked === 2 && confirmed == true) {
            setColor("goldenrod");
            let EP = evt.target.id;
            spEP.push(EP);
            startEndClick(spEP);
        } else {
            console.log(evt.target.id);
        }
    };

    return (
        <>
            <td
                    id={id}
                    className={className}
                    onClick={handleClick}
                    style={style}
            ></td>
        </>
    );
};

export default Block;