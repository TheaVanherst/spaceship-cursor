
import { readable } from 'svelte/store';

// generic stores needed for future reference.
let oldX =  0, oldY =  0;
let diffX = 0, diffY = 0;
let xTilt = 0, yTilt = 0;

let timeout, waitUntil = 0;

const // NOTE: default sprite-sheet x (0-4) / y (0-2) pos: y: 1, x: 2.
    xRequired1 = 4, // the difference in current +/- xRequired1 to change to the first 1st/3rd sprite-sheet col.
    xRequired2 = 8, // the difference in current +/- xRequired2 to change to the first 0th/5th sprite-sheet col.
    yRequired = 6;  // the difference in current +/- xRequired2 to change to the first 1st/3rd sprite-sheet row.
const
    frameRate = 15, // change this to increase / decrease tick rate.
    width = 48,     // spaceship sprite width, NOT sprite-sheet width.
    height = 49;    // spaceship sprite height, NOT sprite-sheet height.

const
    framesPerSecond = 1000 / frameRate,                         // preset framerate calc.
    offsetCalcX = [0, width, width * 2, width * 3, width * 4],  // generates sprite-sheet X offsets.
    offsetCalcY = [0, height, height * 2];                      // generates sprite-sheet X offsets.

export default readable({x: 0, y: 0, xTilt: 0}, (set) => {
    document.addEventListener("pointermove", move);
    // this circumvents issues regarding dragging elements.

    // updates waiting period between frame "ticks" / frames.
    const directionCalc = (x, y) => {
        // this is essentially the generator for the refresh-rate based on ms. (1000ms / framerate)
        waitUntil = Date.now() + framesPerSecond;

        // calculates difference between previous and current tick.
        diffX = Math.abs(x - oldX);
        diffY = Math.abs(y - oldY);

        xTilt = diffX < xRequired1 ? 2 : x > oldX ? diffX > xRequired2 ? 4 : 3 : diffX > xRequired2 ? 0 : 1;
        yTilt = diffY < yRequired ?  1 : y > oldY ? 0 : 2;

        // sets the writeable offsets for the store.
        set({
            x:  x, y:  y,
            xTilt: offsetCalcX[xTilt], yTilt: offsetCalcY[yTilt],
            xMulti: xTilt, yMulti: yTilt
        });

        // sets the previous values to the current, to then be checked on the next tick.
        oldX = x;
        oldY = y;

        // clears previous timeout of the animation change reset.
        clearTimeout(timeout);

        // this handles the gradient changing back to the default x/y values of x: 2, y: 1.
        // (it stops the "animation" generated after movement.)
        timeout = setTimeout(() => {
            // checks if the current spaceship frame is different to the default,
            // otherwise it moves 1 step towards the default value of 2.
            if (xTilt !== 2) {
                xTilt < 2 ? xTilt++ : xTilt--;}

            // sets the new writable positions.
            // this requires all values other than an x,y pos, otherwise it won't transition properly.
            set({
                x:  x, y:  y,
                xTilt: offsetCalcX[xTilt], yTilt: offsetCalcY[1],
                xMulti: xTilt, yMulti: 1
            });

            // checks again to see if it's still not the default value of 2.
            if (xTilt !== 2) {
                // this will only happen if the last movement was fast enough to change the values to 0 or 4.

                setTimeout(() => {
                    set({
                        x:  x, y:  y,
                        xTilt: offsetCalcX[2], yTilt: offsetCalcY[1],
                        xMulti: 2, yMulti: 1
                    });
                }, 100);
            }
        }, 250);
    }

    // movement function to check if new frame should be rendered
    function move(e) {
        if (Date.now() >= waitUntil) { // checks if new tick.
            directionCalc(e.clientX, e.clientY);}} // renders new frame

    // mouse movement function to be called
    return () => {
        document.removeEventListener("mousemove", move);}
})