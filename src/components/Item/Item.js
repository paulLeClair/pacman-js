import React from 'react'

import './Item.scss'

import { pellet, powerPellet, cherry, strawberry, orange, melon, ship, key, bell } from './ItemImageImports'

// this should hopefully contain everything needed to implement some in-game items!

export const ItemType = {
    PELLET: 1,
    POWERPELLET: 2,
    CHERRY: 3,
    STRAWBERRY: 4,
    ORANGE: 5,
    MELON: 6,
    SHIP: 7,
    KEY: 8,
    BELL: 9,
};

const Item = ({ type, xPos, yPos }) => {
    
    let itemPath = "";
    switch (type) {
        case (ItemType.PELLET): {
            itemPath = pellet;
            break;
        }
        case (ItemType.POWERPELLET): {
            itemPath = powerPellet;
            break;
        }
        case (ItemType.CHERRY): {
            itemPath = cherry;
            break;
        }
        case (ItemType.STRAWBERRY): {
            itemPath = strawberry;
            break;
        }
        case (ItemType.ORANGE): {
            itemPath = orange;
            break;
        }
        case (ItemType.MELON): {
            itemPath = melon;
            break;
        }
        case (ItemType.SHIP): {
            itemPath = ship;
            break;
        }
        case (ItemType.KEY): {
            itemPath = key;
            break;
        }
        case (ItemType.BELL): {
            itemPath = bell;
            break;
        }
    }
    
    // position the item using the given pixel coords
    const posStyles = {
        top: "".concat(yPos.toString(), "px"),
        left: "".concat(xPos.toString(), "px")
    };

    return (
        <div>
            <img src={itemPath} styles={posStyles} />
        </div>
    );
}

export default Item;