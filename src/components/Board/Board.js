import React, { useState, useEffect } from 'react'
import './Board.scss'
import Tile, { TileSize } from '../Tile/Tile'
import { computeTileImageOrientations } from './BoardUtils.js'

const Board = ({ initialMap }) => {
    // maybe the board can convert the initial map specification into an array of arrays of tiles, one for each element in the array
    const [mapSpecification] = useState(initialMap);
    const [tileGrid, setTileGrid] = useState([]);

    // build the map:
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
        [mapSpecification] // this shouldn't change at any point
    )

    return (
        <div className="board">
            {tileGrid}
        </div>
    );
}

export default Board;