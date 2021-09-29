import React from 'react'
import './Tile.scss'
import { Orientation } from '../Game/Game'
import { open, boundaryEdge, boundaryInCorner, boundaryOutCorner, boundaryBumpLeft, boundaryBumpRight, innerEdge, innerCorner, ghostBoxCorner, ghostBoxDoor } from './TileImageImports'

export const TileType = {
    OFFMAP: 0,
    OPEN: 1,
    BOUNDARY_EDGE: 2,
    BOUNDARY_INCORNER: 3,
    BOUNDARY_OUTCORNER: 4,
    BOUNDARY_BUMP_LEFT: 5,
    BOUNDARY_BUMP_RIGHT: 6,
    INNER_EDGE: 7,
    INNER_CORNER: 8,
    GB_CORNER: 9,
    GB_DOOR: 10
};

export const TileSize = 12; // tile size in pixels, will probably need to be tweaked

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

        case TileType.BOUNDARY_BUMP_LEFT: {
            tileImagePath = boundaryBumpLeft;
            break;
        }

        case TileType.BOUNDARY_BUMP_RIGHT: {
            tileImagePath = boundaryBumpRight;
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

    return (
        <div className={"tile " + orientationClass} style={posStyles} width={TileSize} height={TileSize}>
            <img  src={tileImagePath}  />
        </div>
    );
}

export default Tile;