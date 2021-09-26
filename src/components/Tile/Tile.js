import React from 'react'
import './Tile.scss'
import { Orientation } from '../Game/Game'

export const TileType = {
    OFFMAP: 0,
    OPEN: 1,
    BOUNDARY_EDGE: 2,
    BOUNDARY_INCORNER: 3,
    BOUNDARY_OUTCORNER: 4,
    BOUNDARY_BUMP: 5,
    INNER_EDGE: 6,
    INNER_CORNER: 7,
    GB_CORNER: 9,
    GB_DOOR: 10
};

export const TileSize = 12; // tile size in pixels, will probably need to be tweaked

// to save space, we'll have to carefully manage orientations of tiles to rotate them according to their surroundings 

const Tile = ({ orientation, xPos, yPos, type }) => {
    // to orient each image, maybe i'll make 4 different possible CSS classes so that 
    // we just select the one based on the orientation?

    let orientationClass = "orientation-right"
    switch (orientation) {
        case Orientation.RIGHT: orientationClass = "orientation-right"; break; 
        case Orientation.DOWN: orientationClass = "orientation-down"; break;
        case Orientation.LEFT: orientationClass = "orientation-left"; break;
        case Orientation.UP: orientationClass = "orientation-up"; break;
    }

    let tileImagePath = "../../assets/";
    switch (type) {
        case TileType.OFFMAP: {
            tileImagePath += "open.jpg" // they use the same picture for now
            break;
        }

        case TileType.OPEN: {
            tileImagePath += "open.jpg"
            break;
        }

        case TileType.BOUNDARY_EDGE: {
            tileImagePath += "boundary-edge.jpg"
            break;
        }

        case TileType.BOUNDARY_INCORNER : {
            tileImagePath += "boundary-incorner.jpg"
            break;
        }

        case TileType.BOUNDARY_OUTCORNER: {
            tileImagePath += "boundary-outcorner.jpg"
            break;
        }

        case TileType.BOUNDARY_BUMP: {
            tileImagePath += "boundary-bump.jpg"
            break;
        }

        case TileType.INNER_CORNER: {
            tileImagePath += "inner-corner.jpg"
            break;
        }

        case TileType.INNER_EDGE: {
            tileImagePath += "inner-edge.jpg"
            break;
        }

        case TileType.GB_CORNER : {
            tileImagePath += "gb-corner.jpg"
            break;
        }

        case TileType.GB_DOOR : {
            tileImagePath += "gb-door.jpg"
            break;
        }
    }

    // i'll set the position using an inline style variable
    const posStyles = {
        left: toString(xPos) + "px",
        top: toString(yPos) + "px",
    };

    return (
        <div className="tile">
            <img className={orientationClass} style={posStyles} src={tileImagePath} />
        </div>
    );
}

export default Tile;