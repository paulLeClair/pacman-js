import React, { useState, useEffect } from 'react';

import { Orientation } from '../Game/Game';
import Tile, { TileSize } from '../Tile/Tile';

import spriteSheetPath from '../../assets/pacman-sprite-sheet.png';

// i guess i'll try implementing the player-controlled Pacman component here!

// maybe i'll hardcode a speed value in pixels...?
export const PlayerSpeed = 5; // try 5 pixels maybe? will need to tweak it 

const initialX = 26;
const initialY = 13;
 
const Pacman = ({ mapSpecification }) => { 
    
    // spatial position stuff?
    const { gridPos, setGridPos } = useState({x: initialX, y: initialY});
    const { pixelPos, setPixelPos } = useState({ x: initialX * TileSize, y: initialY * TileSize });
    const { orientation, setOrientation } = useState(Orientation.RIGHT);

    // movement info
        // i'll have to mess around to figure out how to structure things so that the movement feels like the original pacman
        // i think i can set it so that pacman moves in a different direction until you input a 
    const { currentSpeed, setCurrentSpeed } = useState(0);

    // animation info?
    const { isChomping, setIsChomping } = useState(true);


    // i think i'll need to use a few effects here... i'm still new to hooks in general so hopefully this is an informative experience :)
    
    

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
        top: (pixelPos !== undefined) ? pixelPos.x.toString() + "px" : "0px",
        left: (pixelPos !== undefined) ? pixelPos.y.toString() + "px" : "0px",
    };

    console.log(posStyles);

    // optionally use animation?
    let animationStr = (isChomping) ? "pacman-chomp" : "";

    return (
        <div className="pacman" style={posStyles}>
            <img className={orientationStr + " " + animationStr} src={spriteSheetPath} />
        </div>
    );
}

export default Pacman;