import React, { useState, useEffect } from 'react'
import './Board.scss'
import Tile from '../Tile/Tile'

// fundamentally, we need a way to specify the map itself in a convenient way
    // i could hardcode it here as an array of arrays potentially, but it would probably
    // be prettier to read+verify it from a text file automatically


const Board = ({ initialMap }) => {
    // i'm not entirely sure how to structure the board...
    // maybe i'll try keeping it as minimal as possible and just render the tiles
    
    // maybe the board can convert the initial map specification into an array of arrays of tiles, one for each element in the array
    const [mapSpecification] = useState(initialMap);
    const [tileGrid, setTileGrid] = useState([]);

    // maybe i should actually build the map using an effect that fires only after the first render
    useEffect(
        () => {
            // build the actual grid of tiles that gameplay occurs in
            setTileGrid(mapSpecification.map((row, x) => {
                let key = "tile_";
                return row.map((tile, y) => (
                    

                    <Tile key={key.concat(x, "_", y)}  />
                ))
            }))
        }, 
        []
    )

    

    return (
        <div className="board">
            {tileGrid}
        </div>
    );
}

export default Board;