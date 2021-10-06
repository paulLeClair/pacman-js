import React, { useState, useEffect } from 'react'
import './Board.scss'
import Tile, { TileSize } from '../Tile/Tile'
import { computeTileImageOrientations } from './BoardUtils.js'

const Board = ({ initialMap }) => {
    // maybe the board can convert the initial map specification into an array of arrays of tiles, one for each element in the array
    const [mapSpecification] = useState(initialMap);
    const [tileGrid, setTileGrid] = useState([]);

    // maybe i should actually build the map using an effect that fires only after the first render
    useEffect(
        () => {
            // compute orientations here maybe?
            let tileOrientations = computeTileImageOrientations(mapSpecification);
            let key = "tile_";

            // build the actual grid of tiles that gameplay occurs in
            setTileGrid(mapSpecification.map((row, x) => {    
                return row.map((tileType, y) => {
                    // compute position to pass to Tile ?
                    let xpos = TileSize * x;
                    let ypos = TileSize * y;

                    return <Tile key={key.concat(x, "_", y)} type={tileType} orientation={tileOrientations[x][y]} xPos={xpos} yPos={ypos} />
                })
            }))
        }, 
        [mapSpecification] // this shouldn't change anyway
    ) // since the map should be static for now, hopefully it works to set everything up like this 

    return (
        <div className="board">
            {tileGrid}
        </div>
    );
}

export default Board;