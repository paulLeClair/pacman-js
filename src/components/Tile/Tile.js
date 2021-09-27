import React from 'react'
import './Tile.scss'
import { Orientation } from '../Game/Game'
import { open, boundaryEdge, boundaryInCorner, boundaryOutCorner, boundaryBump, innerEdge, innerCorner, ghostBoxCorner, ghostBoxDoor } from './TileImageImports'

export const TileType = {
    OFFMAP: 0,
    OPEN: 1,
    BOUNDARY_EDGE: 2,
    BOUNDARY_INCORNER: 3,
    BOUNDARY_OUTCORNER: 4,
    BOUNDARY_BUMP: 5,
    INNER_EDGE: 6,
    INNER_CORNER: 7,
    GB_CORNER: 8,
    GB_DOOR: 9
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

    let tileImagePath;
    switch (type) {
        case TileType.OFFMAP: {
            tileImagePath = open; // they use the same picture for now
            break;
        }

        case TileType.OPEN: {
            tileImagePath = open;
            break;
        }

        case TileType.BOUNDARY_EDGE: {
            tileImagePath = boundaryEdge;
            break;
        }

        case TileType.BOUNDARY_INCORNER : {
            tileImagePath = boundaryInCorner;
            break;
        }

        case TileType.BOUNDARY_OUTCORNER: {
            tileImagePath = boundaryOutCorner;
            break;
        }

        case TileType.BOUNDARY_BUMP: {
            tileImagePath = boundaryBump;
            break;
        }

        case TileType.INNER_CORNER: {
            tileImagePath = innerCorner;
            break;
        }

        case TileType.INNER_EDGE: {
            tileImagePath = innerEdge;
            break;
        }

        case TileType.GB_CORNER : {
            tileImagePath = ghostBoxCorner;
            break;
        }

        case TileType.GB_DOOR : {
            tileImagePath = ghostBoxDoor;
            break;
        }
    }

    // i'll set the position using an inline style variable
    const posStyles = {
        top: `${xPos}px`,
        left: `${yPos}px`,
    };

    let classNameStr = "tile " + orientationClass + (type === TileType.BOUNDARY_BUMP && orientationClass === Orientation.LEFT) ? " boundary-bump-invert" : "";
    
    return (
        <div className={"tile " + orientationClass} style={posStyles} width={TileSize} height={TileSize}>
            <img  src={tileImagePath}  />
        </div>
    );
}

export default Tile;