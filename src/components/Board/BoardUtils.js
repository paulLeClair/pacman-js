import { Orientation } from '../Game/Game'
import Tile, { TileType } from '../Tile/Tile'

// now we handle the wall cases (where the orientation matters most)
const isCorner = (tileType) => (tileType === TileType.INNER_CORNER
                                || tileType === TileType.BOUNDARY_INCORNER
                                || tileType === TileType.BOUNDARY_OUTCORNER
                                || tileType === TileType.BOUNDARY_INCORNER
                                || tileType === TileType.GB_CORNER);


const isEdge = (tileType) => {
    return (tileType === TileType.INNER_EDGE
            || tileType === TileType.BOUNDARY_EDGE);
}

const isUpperLeftCorner = (tileType, mapSpecification, x, y) => {
    // maybe i'll try some simple rules first...
    if (x + 1 >= mapSpecification.length) {
        return false;       
    }

    if (y + 1 >= mapSpecification[x].length) {
        return false;
    }

    switch (tileType) {
        case TileType.BOUNDARY_INCORNER: return (mapSpecification[x + 1][y + 1] === TileType.OFFMAP);
        default:
            return (mapSpecification[x + 1][y + 1] === TileType.OPEN);        
    }
}

const isLowerRightCorner = (tileType, mapSpecification, x, y) => {
    if (x - 1 < 0) {
        return false;
    }

    if (y + 1 > mapSpecification[x].length) {
        return false;
    }

    switch (tileType) {
        case TileType.BOUNDARY_INCORNER: return (mapSpecification[x - 1][y + 1] === TileType.OFFMAP);
        default:
            return (mapSpecification[x - 1][y + 1] === TileType.OPEN);        
    }
}

const isLowerLeftCorner = (tileType, mapSpecification, x, y) => {
    if (x + 1 > mapSpecification.length) {
        return false;
    }

    if (y - 1 < 0) {
        return false;
    }

    switch (tileType) {
        case TileType.BOUNDARY_INCORNER: return (mapSpecification[x + 1][y - 1] === TileType.OFFMAP);
        default:
            return (mapSpecification[x + 1][y - 1] === TileType.OPEN);  
    }    
}

const isUpperRightCorner = (tileType, mapSpecification, x, y) => {
    if (x - 1 < 0) {
        return false;
    }

    if (y - 1 < 0) {
        return false;
    }

    switch (tileType) {
        case TileType.BOUNDARY_INCORNER: return (mapSpecification[x - 1][y - 1] === TileType.OFFMAP);
        default:
            return (mapSpecification[x - 1][y - 1] === TileType.OPEN);        
    }
}

export const computeTileImageOrientations = (mapSpecification) => {
    return mapSpecification.map((row, x) => 
        // here we look at each tile and determine the orientation it should have based on its neighbors in the grid
        row.map((tileType, y) => {
            // i need to decide on an arbitrary "basis" type thing for rotation; i think the images will 
            // each be oriented to the user's RIGHT by default, so we just determine which rotation to use;

            if (tileType === TileType.OFFMAP || tileType === TileType.OPEN) {
                return Orientation.RIGHT; // don't care about these
            }
            if (tileType === TileType.GB_DOOR) {
                return Orientation.UP; // these should always be upward i think
            }

            if (isCorner(tileType)) {
                // in this case, we have to determine the orientation based on the type of corner
                if (isUpperLeftCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.RIGHT;
                }
                if (isLowerRightCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.UP;
                }
                if (isUpperRightCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.LEFT;
                }
                if (isLowerLeftCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.DOWN;
                }
            }

            if (isEdge(tileType)) {
                // in this case, we determine the orientation based on where the adjacent open space is

                // check "left" and "right" neighbors
                if (x - 1 > 0) {
                    let leftNeighbor = mapSpecification[x - 1][y];
                    
                    if (leftNeighbor === TileType.OPEN) {
                        return Orientation.LEFT;
                    }
                }

                if (x + 1 < row.length) {
                    let rightNeighbor = mapSpecification[x + 1][y];

                    if (rightNeighbor === TileType.OPEN) {
                        return Orientation.RIGHT;
                    }
                }

                // check "above" and "below" neighbors
                if (y - 1 > 0) {
                    let belowNeighbor = mapSpecification[x][y - 1];

                    if (belowNeighbor === TileType.OPEN) {
                        return Orientation.DOWN;
                    }
                }

                if (y + 1 < mapSpecification.length) {
                    let aboveNeighbor = mapSpecification[x][y + 1];

                    if (aboveNeighbor === TileType.OPEN) {
                        return Orientation.UP;
                    }
                }
            }

            // default: return right
            return Orientation.RIGHT;
        })
    );
}