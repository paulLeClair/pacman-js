import { Orientation } from '../Game/Game'
import Tile, { TileType } from '../Tile/Tile'

const clamp = (number, min, max) => {
    return Math.max(min, Math.min(number, max));
}

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
        case TileType.INNER_CORNER: {    
            // here i think we check the right and below neighbors:
            let belowNeighbor = mapSpecification[x + 1][y];
            let rightNeighbor = mapSpecification[x][y + 1];
            
            let belowRightNeighbor = mapSpecification[x + 1][y + 1]; 

            console.log('tile',x,y,'right:', rightNeighbor, 'below:',belowNeighbor, 'belowright:',belowRightNeighbor);
            return (rightNeighbor !== TileType.OPEN && belowNeighbor !== TileType.OPEN) && 
                (belowRightNeighbor === TileType.OPEN
                    || belowRightNeighbor === TileType.OFFMAP);
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x + 1][y + 1] === TileType.OFFMAP);
        }
        default:
            return (mapSpecification[x + 1][y + 1] === TileType.OPEN);
    }
}

const isUpperRightCorner = (tileType, mapSpecification, x, y) => {
    if (x + 1 >= mapSpecification.length) {
        return false;
    }

    if (y - 1 < 0) {
        return false;
    }

    switch (tileType) {
        case TileType.INNER_CORNER: {
            let belowNeighbor = mapSpecification[x + 1][y];
            let leftNeighbor = mapSpecification[x][y - 1];
            let rightNeighbor = null;
            if (y + 1 < mapSpecification[x].length) {
                rightNeighbor = mapSpecification[x][y + 1];
                console.log(x, y, rightNeighbor === TileType.INNER_CORNER);
            }

            if (belowNeighbor === TileType.INNER_CORNER) {
                if (y + 1 < mapSpecification[x].length) {
                    return (mapSpecification[x + 1][y + 1] === TileType.OPEN)
                }
            }

            if (leftNeighbor === TileType.INNER_CORNER) {
                if (x - 1 > 0) {
                    if (mapSpecification[x - 1][y] === TileType.OPEN) {
                        return true;
                    }
                    return false;
                }
            }
            else if (rightNeighbor && rightNeighbor === TileType.INNER_CORNER && belowNeighbor !== TileType.OPEN) {
                return false;
            }

            return (leftNeighbor !== TileType.OPEN && belowNeighbor !== TileType.OPEN) 
                    && (mapSpecification[x+1][y-1] === TileType.OPEN
                        || mapSpecification[x+1][y-1] === TileType.OFFMAP
                        || mapSpecification[x+1][y-1] === TileType.INNER_EDGE);
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x + 1][y - 1] === TileType.OFFMAP);
        }
        default: // boundary_outcorner
            return (mapSpecification[x + 1][y - 1] === TileType.OPEN);   
    }
    
    // return (mapSpecification[x - 1][y + 1] === TileType.OPEN || mapSpecification[x - 1][y + 1] === TileType.OFFMAP);
}

const isLowerRightCorner = (tileType, mapSpecification, x, y) => {
    if (x - 1 < 0) {
        return false;
    }

    if (y - 1 < 0) {
        return false;
    }

    switch (tileType) {
        case TileType.INNER_CORNER: {
            let leftNeighbor = mapSpecification[x][y - 1];
            let aboveNeighbor = mapSpecification[x - 1][y];
            
            if (leftNeighbor === TileType.INNER_CORNER) {
                if (y + 1 < mapSpecification[x - 1].length) {
                    return (mapSpecification[x - 1][y + 1] === TileType.OPEN);
                }
            }

            return (aboveNeighbor !== TileType.OPEN && leftNeighbor !== TileType.OPEN) 
                    && (mapSpecification[x - 1][y - 1] === TileType.OPEN 
                        || mapSpecification[x - 1][y - 1] === TileType.OFFMAP
                        || mapSpecification[x - 1][y - 1] === TileType.INNER_EDGE);
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x - 1][y - 1] === TileType.OFFMAP);
        }
        default:
            return (mapSpecification[x - 1][y - 1] === TileType.OPEN);
    }

    // return (mapSpecification[x - 1][y - 1] === TileType.OPEN || mapSpecification[x - 1][y - 1] === TileType.OFFMAP);      
}

const isLowerLeftCorner = (tileType, mapSpecification, x, y) => {
    if (x - 1 > mapSpecification.length) {
        return false;
    }

    if (y + 1 >= mapSpecification[x].length) {
        return false;
    }

    switch (tileType) {
        case TileType.INNER_CORNER: {
            let rightNeighbor = mapSpecification[x][y + 1];
            let aboveNeighbor = mapSpecification[x - 1][y];

            if (rightNeighbor === TileType.INNER_CORNER) {
                if (x + 1 < mapSpecification.length) {
                    return (mapSpecification[x+1][y] === TileType.OPEN)
                }
            }

            if (aboveNeighbor === TileType.INNER_CORNER) {
                if (y - 1 > 0) {
                    return (mapSpecification[x][y - 1] === TileType.OPEN);
                }
            }

            return (rightNeighbor !== TileType.OPEN && aboveNeighbor !== TileType.OPEN) 
                    && (mapSpecification[x - 1][y + 1] === TileType.OPEN
                        || mapSpecification[x - 1][y + 1] === TileType.OFFMAP);
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x - 1][y + 1] === TileType.OFFMAP);
        }
        default:
            return (mapSpecification[x - 1][y + 1] === TileType.OPEN);
    }

    // return (mapSpecification[x + 1][y - 1] === TileType.OPEN || mapSpecification[x + 1][y - 1] === TileType.OFFMAP);
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
                if (isUpperRightCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.DOWN;
                }
                if (isLowerLeftCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.UP;
                }
                if (isLowerRightCorner(tileType, mapSpecification, x, y)) {
                    return Orientation.LEFT;
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
            return Orientation.LEFT;
        })
    );
}