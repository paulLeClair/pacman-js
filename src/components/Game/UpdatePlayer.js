import { PlayerSpeed } from '../Pacman/Pacman';
import Tile from '../Tile/Tile';
import { TileSize, TileType } from '../Tile/Tile'
import { Orientation } from './Game';

function computeTileMidpoint(gridPos) {
    // compute midpoint of current tile
    return {
        // what if i don't add the tilesize/2 term, to offset pacman a bit...
        x: gridPos.x * TileSize + TileSize/2, 
        y: gridPos.y * TileSize + TileSize/2,
        // x: gridPos.x * TileSize, 
        // y: gridPos.y * TileSize,
    };
}

function movePlayer(pixelPos, orientation) {
    let newPos = pixelPos;
    switch (orientation) {
        case (Orientation.RIGHT): {
            newPos.y += PlayerSpeed;
            break;
        }
        case (Orientation.DOWN): {
            newPos.x += PlayerSpeed;
            break;
        }
        case (Orientation.LEFT): {
            newPos.y -= PlayerSpeed;
            break;
        }
        case (Orientation.UP): {
            newPos.x -= PlayerSpeed;
            break;
        }
    }
    
    return newPos;
}

function beforeMidpoint(pixelPos, midpointPos, orientation) {
    console.log('beforemidpoint:', pixelPos, midpointPos, orientation);
    switch (orientation) {
        case (Orientation.RIGHT):
            return (pixelPos.y + TileSize/2 < midpointPos.y /*&& pixelPos.x === midpointPos.x*/);
        case (Orientation.DOWN): 
            return (pixelPos.x + TileSize/2 > midpointPos.x /*&& pixelPos.y === midpointPos.y*/);
        case (Orientation.LEFT): 
            return (pixelPos.y - TileSize/2 > midpointPos.y /*&& pixelPos.x === midpointPos.x*/);
        case (Orientation.UP): 
            return (pixelPos.x - TileSize/2 < midpointPos.x /*&& pixelPos.y === midpointPos.y*/);
        default:
            // error!(?)
            return false;
    }
}

function atMidpoint(pixelPos, midpointPos, orientation) {
    switch (orientation) {
        case (Orientation.RIGHT):
            return (pixelPos.y + TileSize/2 === midpointPos.y);
        case (Orientation.LEFT): 
            return (pixelPos.y - TileSize/2 === midpointPos.y);
        case (Orientation.DOWN):
            return (pixelPos.x + TileSize/2 === midpointPos.x);
        case (Orientation.UP):
            return (pixelPos.x - TileSize/2 === midpointPos.x);
    }
}

function pastMidpoint(pixelPos, midpointPos, orientation) {
    console.log('pastmidpoint:', pixelPos, midpointPos, orientation);
    switch (orientation) {
        case (Orientation.RIGHT): 
            return (pixelPos.y + TileSize/2 > midpointPos.y /*&& pixelPos.x === midpointPos.x*/);
        case (Orientation.DOWN): 
            return (pixelPos.x + TileSize/2 < midpointPos.x /*&& pixelPos.y === midpointPos.y*/);
        case (Orientation.LEFT): 
            return (pixelPos.y - TileSize/2 < midpointPos.y /*&& pixelPos.x === midpointPos.x*/);
        case (Orientation.UP): 
            return (pixelPos.x - TileSize/2 > midpointPos.x /*&& pixelPos.y === midpointPos.y*/);
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
    // let { gridPos, pixelPos, orientation, currentSpeed, nextOrientation } = currentPlayerState;
    let currentPlayerState = {
        gridPos,
        pixelPos,
        orientation,
        currentSpeed,
        nextOrientation
    };
    let updatedPlayerState = currentPlayerState;

    // increment current position and determine where we are relative to the midpoint of the tile
    let newPos = movePlayer(currentPlayerState.pixelPos, currentPlayerState.orientation);
    console.log("prev pos:", currentPlayerState.pixelPos, "newpos:", newPos)
    
    // store new grid position
    let newGridPos = {
        x: Math.floor(newPos.x / TileSize),
        y: Math.floor(newPos.y / TileSize)
    }

    let midpoint = computeTileMidpoint(newGridPos);

    // let newOrientation = Orientation.RIGHT; 
    console.log(newGridPos, TileSize, newPos, midpoint);

    if (beforeMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        console.log('before midpoint');
        // in this case, we commit the change, clamping it to not go past the midpoint
        updatedPlayerState.pixelPos = clampToMidpoint(newPos, midpoint, currentPlayerState.orientation);

    } 
    else if (atMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        console.log('at midpoint');
        // in this case, we check the buffered input and change the orientation if needed
        if (currentPlayerState.orientation !== currentPlayerState.nextOrientation) {
            console.log('orient != next');
            switch (currentPlayerState.nextOrientation) {
                case (Orientation.RIGHT): {
                    let rightNeighbor = mapSpecification[newGridPos.x][newGridPos.y + 1];
                    if (rightNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.RIGHT;
                    }
                    break;
                }
                case (Orientation.DOWN): {
                    let downNeighbor = mapSpecification[newGridPos.x + 1][newGridPos.y];
                    if (downNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.DOWN;
                    }
                    break;
                }
                case (Orientation.LEFT): {
                    let leftNeighbor = mapSpecification[newGridPos.x][newGridPos.y - 1];
                    if (leftNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.LEFT;
                    }
                    break;
                }
                case (Orientation.UP): {
                    let upNeighbor = mapSpecification[newGridPos.x - 1][newGridPos.y];
                    if (upNeighbor === TileType.OPEN) {
                        updatedPlayerState.orientation = Orientation.UP;
                    }
                    break;
                }
            }
        }
        else {
            console.log('orient == nextorient', currentPlayerState.orientation, currentPlayerState.nextOrientation);
            switch (currentPlayerState.orientation) {
                case (Orientation.RIGHT): {
                    let rightNeighbor = mapSpecification[newGridPos.x][newGridPos.y + 1];
                    console.log('rightneighbor: ', rightNeighbor);
                    if (rightNeighbor !== TileType.OPEN) {
                        updatedPlayerState.currentSpeed = 0;
                        updatedPlayerState.pixelPos = currentPlayerState.pixelPos;
                        updatedPlayerState.gridPos = currentPlayerState.gridPos;
                    }
                    break;
                }
                case (Orientation.DOWN): {
                    let downNeighbor = mapSpecification[newGridPos.x + 1][newGridPos.y];
                    console.log('downneighbor:', downNeighbor)
                    if (downNeighbor !== TileType.OPEN) {
                        updatedPlayerState.currentSpeed = 0;
                        updatedPlayerState.pixelPos = currentPlayerState.pixelPos;
                        updatedPlayerState.gridPos = currentPlayerState.gridPos;
                    }
                    break;
                }
                case (Orientation.LEFT): {
                    let leftNeighbor = mapSpecification[newGridPos.x][newGridPos.y - 1];
                    console.log('leftneighbor:', leftNeighbor);
                    if (leftNeighbor !== TileType.OPEN) {
                        updatedPlayerState.currentSpeed = 0;
                        updatedPlayerState.pixelPos = currentPlayerState.pixelPos;
                        updatedPlayerState.gridPos = currentPlayerState.gridPos;
                    }
                    break;
                }
                case (Orientation.UP): {
                    let upNeighbor = mapSpecification[newGridPos.x - 1][newGridPos.y];
                    console.log('upneighbor:', upNeighbor);
                    if (upNeighbor !== TileType.OPEN) {
                        updatedPlayerState.currentSpeed = 0;
                        updatedPlayerState.pixelPos = currentPlayerState.pixelPos;
                        updatedPlayerState.gridPos = currentPlayerState.gridPos;
                    }
                    break;
                }
            }
        }
    }
    else if (pastMidpoint(newPos, midpoint, currentPlayerState.orientation)) {
        console.log('past midpoint');
        // in this case, we must be heading into an open tile, so we just commit the change
        updatedPlayerState.pixelPos = newPos;
    }
    else {
        // something went wrong!
    }
    
    console.log(updatedPlayerState);
    return updatedPlayerState;
}

export default updatePlayer;