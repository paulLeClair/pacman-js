import React, { useState, useEffect } from 'react'
import './Game.scss'

import Board from '../Board/Board'
import HardcodedMap from '../Board/HardcodedMap'

import Pacman, { PlayerSpeed } from '../Pacman/Pacman'
import Tile, { TileSize, TileType } from '../Tile/Tile'

// custom hooks
import useInterval from '../../utils/useInterval'
import useKeyPress from '../../utils/useKeyPress'

import updatePlayer from './UpdatePlayer'

const initialX = 26;
const initialY = 13;

const BoardDims = {
    WIDTH: 28,
    HEIGHT: 36
};

// not sure how much of a point there is to doing this, but for now it's kool
const gameClassName = "game";
const UpdateRateInMs = 26; // we get framerate problems so maybe i should do 45 or even 30fps...

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

    // update
    const updateGame = () => {
        if (playerState === null || mapSpecification === null || gameState === null) return;

        // update state
        const updatedPlayerState = updatePlayer(mapSpecification, playerState);
        setPlayerState(updatedPlayerState);
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

    if (gameState === null || playerState === null) return null;

    switch (gameState) {
        case PossibleGameStates.INTRO: return renderIntro();
        case PossibleGameStates.GAMEPLAY: return renderGameplay();
        case PossibleGameStates.GAMEOVER: return renderGameOver();
    }

    return (
        <div className="game">
            <p>Error!</p>
        </div>
    );
}

export default Game;