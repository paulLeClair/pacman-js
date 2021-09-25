import React from 'react'
import './Tile.scss'

export const TileType = {
    OFFMAP: 0,
    OPEN: 1,
    BOUNDARY_EDGE: 2,
    BOUNDARY_INCORNER: 3,
    BOUNDARY_OUTCORNER: 4,
    BOUNDARY_BUMP: 5,
    INNER_EDGE: 6,
    INNER_CORNER: 7,
    GB_EDGE: 8,
    GB_CORNER: 9,
    GB_DOOR: 10
};

// to save space, we'll have to carefully manage orientations of tiles to rotate them according to their surroundings 

const Tile = ({  }) => {
    // this will encode a single 

    return (
        <div className="tile">

        </div>
    );
}

export default Tile;