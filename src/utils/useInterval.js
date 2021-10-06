import { useEffect, useRef } from 'react'

// credits for technique: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useInterval = (callback, delay) => {
    // store the callback as a ref
    const savedCallback = useRef(null); 

    // monitor input callback and update saved callback accordingly
    useEffect(() => {
        savedCallback.current = callback;
    },
    [callback]); 

    // interval logic
    useEffect(() => {
        const tick = () => {
            // activate callback
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    },
    [delay]);

};

export default useInterval;