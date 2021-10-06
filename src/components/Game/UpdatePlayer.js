import { PlayerSpeed } from '../Pacman/Pacman';
import Tile from '../Tile/Tile';
import { TileSize, TileType } from '../Tile/Tile'
import { Orientation } from './Game';

function computeTileMidpoint(gridPos) {
    // compute midpoint of current tile
    return {
        // what if i don't add the tilesize/2 term, to offset pacman ...
            // this seems to work
        x: gridPos.x * TileSize,
        y: gridPos.y * TileSize,
    };
}

function movePlayer(pixelPos, orientation, currentSpeed) {
    let newPos = pixelPos;
    switch (orientation) {
        case (Orientation.RIGHT): {
            newPos.y += currentSpeed;
            break;
        }
        case (Orientation.DOWN): {
            newPos.x += currentSpeed;
            break;
        }
        case (Orientation.LEFT): {
            newPos.y -= currentSpeed;
            break;
        }
        case (Orientation.UP): {
            newPos.x -= currentSpeed;
            break;
        }
    }
    
    return newPos;
}

function beforeMidpoint(pixelPos, midpointPos, orientation) {
    switch (orientation) {
        case (Orientation.RIGHT):
            return (pixelPos.y < midpointPos.y);
        case (Orientation.DOWN): 
            return (pixelPos.x < midpointPos.x);
        case (Orientation.LEFT): 
            return (pixelPos.y > midpointPos.y);
        case (Orientation.UP): 
            return (pixelPos.x > midpointPos.x);
        default:
            // error!(?)
            return false;
    }
}

function atMidpoint(pixelPos, midpointPos, orientation) {
    switch (orientation) {
        case (Orientation.RIGHT):
            return (pixelPos.y === midpointPos.y);
        case (Orientation.LEFT): 
            return (pixelPos.y === midpointPos.y);
        case (Orientation.DOWN):
            return (pixelPos.x === midpointPos.x);
        case (Orientation.UP):
            return (pixelPos.x === midpointPos.x);
    }
}

function pastMidpoint(pixelPos, midpointPos, orientation) {
    switch (orientation) {
        case (Orientation.RIGHT): 
            return (pixelPos.y > midpointPos.y);
        case (Orientation.DOWN): 
            return (pixelPos.x > midpointPos.x);
        case (Orientation.LEFT): 
            return (pixelPos.y < midpointPos.y);
        case (Orientation.UP): 
            return (pixelPos.x < midpointPos.x);
    }
}

function clampToMidpoint(newPos, midpointPos, orientation) {
    switch (orientation) {
        case (Orientation.RIGHT): 
            return {
                x: newPos.x,
                y: Math.min(newPos.y, midpointPos.y)
            };
        case (Orientation.DOWN):
            return {
                x: Math.min(newPos.x, midpointPos.x),
                y: newPos.y
            };
        case (Orientation.LEFT):
            return {
                x: newPos.x,
                y: Math.max(newPos.y, midpointPos.y)
            };
        case (Orientation.UP):
            return {
                x: Math.max(newPos.x, midpointPos.x),
                y: newPos.y
            };
    }
}

const updatePlayer = (mapSpecification, { gridPos, pixelPos, orientation, currentSpeed, nextOrientation }) => {
    let currentPlayerState = {
        gridPos,
        pixelPos,
        orientation,
        currentSpeed,
        nextOrientation
    };

    // initialize updated state object
    let updatedPlayerState = currentPlayerState;

    // increment current position and determine where we are relative to the midpoint of the tile
    let newPos = movePlayer(pixelPos, orientation, currentSpeed);
    
    // store new grid position
    let newGridPos = {
        x: Math.floor(newPos.x / TileSize),
        y: Math.floor(newPos.y / TileSize)
    }

    let midpoint = computeTileMidpoint(newGridPos);

    if (beforeMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        // in this case, we commit the change, clamping it to not go past the midpoint
        updatedPlayerState.pixelPos = clampToMidpoint(newPos, midpoint, currentPlayerState.orientation);

    } 
    else if (atMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        // in this case, we check the buffered input and change the orientation if needed
        if (currentPlayerState.orientation !== currentPlayerState.nextOrientation) {
            switch (currentPlayerState.nextOrientation) {
                case (Orientation.RIGHT): {
                    let rightNeighbor = mapSpecification[newGridPos.x][newGridPos.y + 1];
                    if (rightNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.RIGHT;
                        updatedPlayerState.currentSpeed = PlayerSpeed;
                    }
                    break;
                }
                case (Orientation.DOWN): {
                    let downNeighbor = mapSpecification[newGridPos.x + 1][newGridPos.y];
                    if (downNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.DOWN;
                        updatedPlayerState.currentSpeed = PlayerSpeed;
                    }
                    break;
                }
                case (Orientation.LEFT): {
                    let leftNeighbor = mapSpecification[newGridPos.x][newGridPos.y - 1];
                    if (leftNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.LEFT;
                        updatedPlayerState.currentSpeed = PlayerSpeed;
                    }
                    break;
                }
                case (Orientation.UP): {
                    let upNeighbor = mapSpecification[newGridPos.x - 1][newGridPos.y];
                    if (upNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.UP;
                        updatedPlayerState.currentSpeed = PlayerSpeed;
                    }
                    break;
                }
            }

            // pacman can go through walls if you buffer inputs a certain way... need to prevent that 
            
        }
        // what if we guarantee this switch statement fires?
        switch (currentPlayerState.orientation) {
            case (Orientation.RIGHT): {
                let rightNeighbor = mapSpecification[newGridPos.x][newGridPos.y + 1];
                if (rightNeighbor !== TileType.OPEN) {
                    updatedPlayerState.currentSpeed = 0;
                    updatedPlayerState.pixelPos = pixelPos;
                    updatedPlayerState.gridPos = gridPos;
                }
                break;
            }
            case (Orientation.DOWN): {
                let downNeighbor = mapSpecification[newGridPos.x + 1][newGridPos.y];
                if (downNeighbor !== TileType.OPEN) {
                    updatedPlayerState.currentSpeed = 0;
                    updatedPlayerState.pixelPos = pixelPos;
                    updatedPlayerState.gridPos = gridPos;
                }
                break;
            }
            case (Orientation.LEFT): {
                let leftNeighbor = mapSpecification[newGridPos.x][newGridPos.y - 1];
                if (leftNeighbor !== TileType.OPEN) {
                    updatedPlayerState.currentSpeed = 0;
                    updatedPlayerState.pixelPos = pixelPos;
                    updatedPlayerState.gridPos = gridPos;
                }
                break;
            }
            case (Orientation.UP): {
                let upNeighbor = mapSpecification[newGridPos.x - 1][newGridPos.y];
                if (upNeighbor !== TileType.OPEN) {
                    updatedPlayerState.currentSpeed = 0;
                    updatedPlayerState.pixelPos = pixelPos;
                    updatedPlayerState.gridPos = gridPos;
                }
                break;
            }
        }
        
    }
    else if (pastMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        // in this case, we must be heading into an open tile, so we just commit the change
        updatedPlayerState.pixelPos = newPos;
    }
    else {
        // something went wrong!
        console.log("error!");
    }
    
    // console.log(updatedPlayerState);
    return updatedPlayerState;
}

export default updatePlayer;