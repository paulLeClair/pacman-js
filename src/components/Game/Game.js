import React, { useState, useEffect } from 'react'
import './Game.scss'

// not sure how much of a point there is to doing this, but for now it's kool
const gameClassName = "Game";

const Game = ({gameShouldRun}) => {

    // maybe i'll just try to have the game exist in a few possible states...
    const PossibleGameStates = {
        INTRO: 0,
        GAMEPLAY: 1,
        GAMEOVER: 2,
    };
    const [gameState, setGameState] = useState(PossibleGameStates.INTRO);


    // i'll separate each game state into a separate function maybe...? not sure yet how best to organize it
        // this might get too unwieldy, but i'm hoping I can just maintain most of the state here and 
        // the subcomponents can do a lot of the heavy lifting...
    // gotta do some thinking before i continue
    
    const renderIntro = () => {
        

        return (
            <div className={gameClassName}>
                
            </div>
        );
    }

    const renderGameplay = () => {
        return (
            <div className={gameClassName}> 
                
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
    return (
        <div className="Game">
            <p>Error!</p>
        </div>
    );
}

export default Game;