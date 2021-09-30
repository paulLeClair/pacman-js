import React, { useState, useEffect } from 'react';

import { Orientation } from '../Game/Game';
import Tile, { TileSize } from '../Tile/Tile';

// i guess i'll try implementing the player-controlled Pacman component here!

// maybe i'll hardcode a speed value in pixels...?
export const PlayerSpeed = 5; // try 5 pixels maybe? will need to tweak it 

const initialX = 26;
const initialY = 13;

// maybe to position the gameboard in the screen, 
const Pacman = ({ mapSpecification }) => { // not sure what kind of props i'll need yet... maybe just the map being used so it knows where it can move?
    
    // spatial position stuff?
    const { gridPos, setGridPos } = useState({});
    const { pixelPos, setPixelPos } = useState({});
    const { orientation, setOrientation } = useState(Orientation.RIGHT);

    // movement info
        // i'll have to mess around to figure out how to structure things so that the movement feels like the original pacman
        // i think i can set it so that pacman moves in a different direction until you input a 
    const { currentSpeed, setCurrentSpeed } = useState(0);
    
    // animation info ?
    

    // set state and initialize the positions?
    useEffect( () => {

    }, 
    [pixelPos, gridPos]);

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
        top: pixelPos.x.toString(),
        left: pixelPos.y.toString(),
    };

    return (
        <div className="pacman" style={posStyles}>
            <img className={orientationStr} src="../../assets/pacman-sprite-sheet.jpg" />
        </div>
    );
}

export default Pacman;