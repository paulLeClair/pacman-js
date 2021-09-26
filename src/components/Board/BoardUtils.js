import { Orientation } from '../Game/Game'
import { TileType } from '../Tile/Tile'

export const computeTileImageOrientations = (mapSpecification) => {
    return mapSpecification.map((row, x) => {
        // here we look at each tile and determine the orientation it should have based on its neighbors in the grid
        return row.map((tileType, y) => {
            // i need to decide on an arbitrary "basis" type thing for rotation; i think the images will 
            // each be oriented to the user's RIGHT by default, so we just determine which rotation to use;

            if (tileType === TileType.OFFMAP || tileType === TileType.OPEN) {
                return Orientation.RIGHT; // don't care about these
            }
            if (tileType === TileType.GB_DOOR) {
                return Orientation.UP; // these should always be upward i think
            }

            // now we handle the wall cases (where the orientation matters most)
            

        })
    })
}