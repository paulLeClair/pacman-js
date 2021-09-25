import React, { useState, useEffect } from 'react'
import './Board.scss'

// fundamentally, we need a way to specify the map itself in a convenient way
    // i could hardcode it here as an array of arrays potentially, but it would probably
    // be prettier to read+verify it from a text file automatically


const Board = ({ initialMap }) => {
    // i'm not entirely sure how to structure the board...
    // maybe i'll try keeping it as minimal as possible and just render the tiles
    
    // not sure if it's required to make the board store the map as state but why not
    const [map, setMap] = useState(initialMap);

    

    return (
        <div className="board">

        </div>
    );
}

export default Board;