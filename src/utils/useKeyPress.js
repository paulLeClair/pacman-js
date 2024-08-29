import { useState, useEffect } from 'react'

// credits for technique: https://usehooks.com/useKeyPress/

// hook for handling key presses (which is controlling pacman in this context)
const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    if (keyPressed) setKeyPressed(false); // immediately disable, so we only read 1 input per press 
        // should be fine for simple directional controls, i hope

    const handleKeyDown = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [targetKey]);

    return keyPressed;
}

export default useKeyPress;