import React, { useState, useEffect } from 'react'
import './Game.scss'

import Board from '../Board/Board'
import HardcodedMap from '../Board/HardcodedMap'

import Pacman, { PlayerSpeed } from '../Pacman/Pacman'
import Tile, { TileSize, TileType } from '../Tile/Tile'

// custom hooks
import useInterval from '../../utils/useInterval'
import useKeyPress from '../../utils/useKeyPress'

const initialX = 26;
const initialY = 13;

const BoardDims = {
    WIDTH: 28,
    HEIGHT: 36
};

// not sure how much of a point there is to doing this, but for now it's kool
const gameClassName = "game";
const UpdateRateInMs = 15; // 60fps for now

// i'll maintain a fundamental definition of orientations maybe
export const Orientation = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3,
};

const Game = ({ gameShouldRun }) => {

    // maybe i'll just try to have the game exist in a few possible states...
    const PossibleGameStates = {
        INTRO: 0,
        GAMEPLAY: 1,
        GAMEOVER: 2,
    };
    const [gameState, setGameState] = useState(PossibleGameStates.GAMEPLAY);

    // map specification
    const [mapSpecification] = useState(HardcodedMap);

    /* PACMAN STATE */
    const [ playerState, setPlayerState ] = useState({
        // grid + pixel position
        gridPos: { x: initialX, y: initialY },
        pixelPos: { x: initialX * TileSize, y: initialY * TileSize },
        orientation: Orientation.RIGHT,
        currentSpeed: PlayerSpeed,

        // for changing the input, i need to maybe just buffer the user's most recently pressed input?
        nextOrientation: Orientation.RIGHT
    });

    /* ITEMS STATE */
        // todo

    /* GHOSTS STATE */
        // todo

    // i'll separate each game state into a separate function maybe...? not sure yet how best to organize it
        // this might get too unwieldy, but i'm hoping I can just maintain most of the state here and 
        // the subcomponents can do a lot of the heavy lifting...
    // gotta do some thinking before i continue
    const bufferRightInput = () => {
        let newState = playerState;
        newState.nextOrientation = Orientation.RIGHT;
        setPlayerState(newState);
    }

    const bufferDownInput = () => {
        let newState = playerState;
        newState.nextOrientation = Orientation.DOWN;
        setPlayerState(newState);
    }

    const bufferLeftInput = () => {
        let newState = playerState;
        newState.nextOrientation = Orientation.LEFT;
        setPlayerState(newState);
    }

    const bufferUpInput = () => {
        let newState = playerState;
        newState.nextOrientation = Orientation.UP;
        setPlayerState(newState);
    }

    const rightArrow = useKeyPress("ArrowRight");
    const leftArrow = useKeyPress("ArrowLeft");
    const upArrow = useKeyPress("ArrowUp");
    const downArrow = useKeyPress("ArrowDown");

    rightArrow && bufferRightInput();
    downArrow && bufferDownInput();
    leftArrow && bufferLeftInput();
    upArrow && bufferUpInput();

    const updatePlayer = () => {
        // skip updates until everything exists?
        if (playerState === null || mapSpecification === null) return;  


        let newOrientation = Orientation.RIGHT;
        let prevOrientation = playerState.orientation;
        switch (playerState.nextOrientation) {
            case (Orientation.RIGHT): {
                // if (mapSpecification[playerState.gridPos.x][playerState.gridPos.y + 1] === TileType.OPEN) {
                newOrientation = Orientation.RIGHT;
                // }
                break;
            }
            case (Orientation.DOWN): {
                // if (mapSpecification[playerState.gridPos.x + 1][playerState.gridPos.y] === TileType.OPEN) {
                newOrientation = Orientation.DOWN;
                // }
                break;
            }
            case (Orientation.LEFT): {
                // if (mapSpecification[playerState.gridPos.x][playerState.gridPos.y - 1] === TileType.OPEN) {
                newOrientation = Orientation.LEFT;
                // }
                break;
            }
            case (Orientation.UP): {
                // if (mapSpecification[playerState.gridPos.x - 1][playerState.gridPos.y] === TileType.OPEN) {
                newOrientation = Orientation.UP;
                // }
                break;
            }
            default:
                // error!
        };

            // variable for containing updated pacman speed
        let newSpeed = playerState.currentSpeed;
        
        // update the player's position
        let newPos = playerState.pixelPos;
        switch (playerState.orientation) {
            case (Orientation.RIGHT): {
                let rightNeighbor = mapSpecification[playerState.gridPos.x][playerState.gridPos.y + 1];
                if (rightNeighbor === TileType.OPEN) {
                    newPos.y += playerState.currentSpeed;
                    if (newSpeed === 0) newSpeed = PlayerSpeed;
                }
                else {
                    newSpeed = 0;
                }
                break;
            }
            case (Orientation.DOWN): {
                let belowNeighbor = mapSpecification[playerState.gridPos.x + 1][playerState.gridPos.y];
                if (belowNeighbor === TileType.OPEN) {
                    newPos.x += playerState.currentSpeed;
                    if (newSpeed === 0) newSpeed = PlayerSpeed;
                }
                else {
                    newSpeed = 0;
                }
                
                break;
            }
            case (Orientation.LEFT): {
                let leftNeighbor = mapSpecification[playerState.gridPos.x][playerState.gridPos.y - 1];
                if (leftNeighbor === TileType.OPEN) {
                    newPos.y -= playerState.currentSpeed;
                    if (newSpeed === 0) newSpeed = PlayerSpeed;
                }
                else {
                    newSpeed = 0;
                }
                break;
            }
            case (Orientation.UP): {
                let aboveNeighbor = mapSpecification[playerState.gridPos.x - 1][playerState.gridPos.y];
                if (aboveNeighbor === TileType.OPEN) {
                    newPos.x -= playerState.currentSpeed;
                    if (newSpeed === 0) newSpeed = PlayerSpeed;
                }
                else {
                    newSpeed = 0;
                }
                break;
            }
        }
        
        // determine grid position of newpos:
        let newGridPos = {
            x: Math.floor(((newPos.x - TileSize/2) / TileSize) + 0.5),
            y: Math.floor(((newPos.y - TileSize/2) / TileSize) + 0.5),
        };
        console.log(playerState.pixelPos, newPos);

        let newGridPosTileType = mapSpecification[newGridPos.x][newGridPos.y];
        switch (newGridPosTileType) {
            case (TileType.OPEN): {
                
                break;
            }
            default: {
                // anything other than open means we can't move into it!
                newGridPos = playerState.gridPos;
                newPos = { x: playerState.gridPos.x * TileSize, y: playerState.gridPos.y * TileSize };
                newSpeed = 0;
                break;
            }
        }

        // commit state changes
        setPlayerState({
            gridPos: newGridPos,
            pixelPos: newPos,
            currentSpeed: newSpeed,
            orientation: newOrientation,
            nextOrientation: newOrientation,
        });
    }

    // update
    const updateGame = () => {
        updatePlayer();
    };

    useInterval(updateGame, UpdateRateInMs);
    
    const renderIntro = () => {
        return (
            <div className={gameClassName}>
                <Board initialMap={HardcodedMap} />
            </div>
        );
    }

    const renderGameplay = () => {
        return (
            <div className={gameClassName}> 
                <Board initialMap={HardcodedMap} />
                <Pacman pixelPos={playerState.pixelPos} orientation={playerState.orientation} currentSpeed={playerState.currentSpeed} />
            </div>
        );
    }

    const renderGameOver = () => {
        return (
            <div className={gameClassName}>

            </div>
        );
    }

    switch (gameState) {
        case PossibleGameStates.INTRO: return renderIntro();
        case PossibleGameStates.GAMEPLAY: return renderGameplay();
        case PossibleGameStates.GAMEOVER: return renderGameOver();
    }

    // for now, any other result should just return an empty component i guess... shouldn't happen if the 
    // game is working properly
        // i'm not sure what the best practice is for this kind of thing... should i just return null?
    return (
        <div className="game">
            <p>Error!</p>
        </div>
    );
}

export default Game;