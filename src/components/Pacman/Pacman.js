import React, { useState, useEffect } from 'react';

import { Orientation } from '../Game/Game';
import Tile, { TileSize } from '../Tile/Tile';

import spriteSheetPath from '../../assets/pacman-sprite-sheet.png';

import './Pacman.scss'

// i guess i'll try implementing the player-controlled Pacman component here!

// maybe i'll hardcode a speed value in pixels...?
export const PlayerSpeed = 1;

 
const Pacman = ({ pixelPos, orientation, currentSpeed }) => { // i really gotta figure out how to synchronize everything... might need to move most of the logic out of pacman and into
                                            // the game logic 

    const [isChomping, setIsChomping] = useState(false);

    useEffect(() => {
        setIsChomping(currentSpeed > 0);
    },
    [currentSpeed]);

    let orientationStr = "";
    switch (orientation) {
        case Orientation.RIGHT: {
            orientationStr = "orientation-right";
            break;
        }
        case Orientation.DOWN: {
            orientationStr = "orientation-down";
            break;
        }
        case Orientation.LEFT: {
            orientationStr = "orientation-left";
            break;
        }
        // up
        default:
            orientationStr = "orientation-up";
    }

    // build position styles
    const posStyles = {
        top: pixelPos.x.toString() + "px",
        left: pixelPos.y.toString() + "px",
    };

    // optionally use animation?
    let animationStr = (isChomping) ? "pacman-chomp" : "";

    return (
        <div className={"pacman " + orientationStr + " " + animationStr} style={posStyles}/>
    );
}

export default Pacman;