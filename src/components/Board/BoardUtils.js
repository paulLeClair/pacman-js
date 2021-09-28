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
            
            if (belowNeighbor !== TileType.OPEN && rightNeighbor !== TileType.OPEN) {
                // this handles most cases, except for a couple internal corners

                // i think i might be able to just add check(s) in here in each function and then it might work... god willing
                
                // handle case where right neighbor is an inner corner
                if (rightNeighbor === TileType.INNER_CORNER) {
                    // in this case, we can only have an upper left corner if the tile directly above is open
                    if (x - 1 > 0) {
                        let aboveNeighbor = mapSpecification[x - 1][y];
                        return aboveNeighbor === TileType.OPEN;
                    }
                    else {
                        // out of bounds, can't have upper-left corner
                        return false;
                    }
                }

                // handle case where below neighbor is an inner corner
                if (belowNeighbor === TileType.INNER_CORNER) {
                    // in this case, we only return true when the tile directly to the left is open
                    if (y - 1 < 0) {
                        let leftNeighbor = mapSpecification[x][y - 1];
                        return leftNeighbor === TileType.OPEN;
                    } 
                    else {
                        // out of bounds, can't have upper-left corner
                        return false;
                    }
                }

                // actually, what if we just check whether the above or rightbelow tiles are open?
                if (x - 1 > 0) {
                    let aboveNeighbor = mapSpecification[x - 1][y];
                    let rightBelowNeighbor = mapSpecification[x + 1][y + 1];

                    return aboveNeighbor === TileType.OPEN || rightBelowNeighbor === TileType.OPEN;
                }

                // if we haven't caught any of the failure cases, we must have an upperleft inner corner
                return true;
            }
            return false;
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

            if (leftNeighbor !== TileType.OPEN && belowNeighbor !== TileType.OPEN) {

                // i'll try modelling this after the upperleft corner stuff

                // handle cases where we have adjacent corners
                if (leftNeighbor === TileType.INNER_CORNER) {
                    // similarly to upper left, in this case we require that the tile directly above is open
                    if (x - 1 > 0) {
                        let aboveNeighbor = mapSpecification[x - 1][y];
                        return aboveNeighbor === TileType.OPEN;
                    }
                    else {
                        return false;
                    }
                }

                if (belowNeighbor === TileType.INNER_CORNER) {
                    if (y + 1 < mapSpecification[x].length) {
                        let rightNeighbor = mapSpecification[x][y + 1];
                        return rightNeighbor === TileType.OPEN;
                    } 
                    else {
                        return false;
                    }
                }

                // maybe here we check for openness too..
                if (x - 1 > 0) {
                    let belowLeftNeighbor = mapSpecification[x + 1][y - 1];
                    let aboveNeighbor = mapSpecification[x - 1][y];

                    return (belowLeftNeighbor === TileType.OPEN || aboveNeighbor === TileType.OPEN);
                }
            
                return true;
            }
            return false;
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x + 1][y - 1] === TileType.OFFMAP);
        }
        default: // boundary_outcorner
            return (mapSpecification[x + 1][y - 1] === TileType.OPEN);   
    }
    
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
            let aboveNeighbor = mapSpecification[x - 1][y];
            let leftNeighbor = mapSpecification[x][y - 1];

            if (aboveNeighbor !== TileType.OPEN && leftNeighbor !== TileType.OPEN) {
                
                // handle adjacent corners
                if (aboveNeighbor === TileType.INNER_CORNER) {
                    if (y + 1 < mapSpecification[x].length) {
                        // in this case, we require the tile directly to the right to be open
                        let rightNeighbor = mapSpecification[x][y + 1];
                        return rightNeighbor === TileType.OPEN;
                    }
                    else {
                        return false;
                    }
                    
                }

                if (leftNeighbor === TileType.INNER_CORNER) {
                    // in this case, we need the tile directly below to be open
                    if (x + 1 < mapSpecification.length) {
                        let belowNeighbor = mapSpecification[x+1][y];
                        return belowNeighbor === TileType.OPEN;
                    }
                    else {
                        return false;
                    }
                }

                // need to handle the last couple cases somehow....
                
                return true;
            }
            return false;
        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x - 1][y - 1] === TileType.OFFMAP);
        }
        default:
            return (mapSpecification[x - 1][y - 1] === TileType.OPEN);
    }   
}

const isLowerLeftCorner = (tileType, mapSpecification, x, y) => {
    if (x - 1 < 0) {
        return false;
    }

    if (y + 1 >= mapSpecification[x].length) {
        return false;
    }

    switch (tileType) {
        case TileType.INNER_CORNER: {

            let aboveNeighbor = mapSpecification[x - 1][y];
            let rightNeighbor = mapSpecification[x][y + 1];

            if (aboveNeighbor !== TileType.OPEN && rightNeighbor !== TileType.OPEN) {

                // need to handle a couple specific cases still

                if (aboveNeighbor === TileType.INNER_CORNER) {
                    if (y - 1 > 0) {
                        // in this case, we need the tile directly to the left to be open
                        let leftNeighbor = mapSpecification[x][y - 1];
                        return leftNeighbor === TileType.OPEN;
                    }    
                }

                if (rightNeighbor === TileType.INNER_CORNER) {
                    // check that tile directly below is open 
                    if (x + 1 < mapSpecification.length) {
                        let belowNeighbor = mapSpecification[x + 1][y];
                        return belowNeighbor === TileType.OPEN;
                    } 
                }

                // handle interior edge case

                // maybe i'll try checking the below OR aboveright tiles are open, similarly to the upper left corner handler
                if (x + 1 < mapSpecification.length) {
                    let belowNeighbor = mapSpecification[x + 1][y];
                    let aboveRightNeighbor = mapSpecification[x - 1][y + 1];

                    return (belowNeighbor === TileType.OPEN || aboveRightNeighbor === TileType.OPEN);
                }

                return true;
            }
            return false;

        }
        case TileType.BOUNDARY_INCORNER:
        case TileType.GB_CORNER: {
            return (mapSpecification[x - 1][y + 1] === TileType.OFFMAP);
        }
        default:
            return (mapSpecification[x - 1][y + 1] === TileType.OPEN);
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
            return Orientation.RIGHT;
        })
    );
}