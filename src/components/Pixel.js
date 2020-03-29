import React, { useRef, useEffect, useState } from 'react';
import '../styles/pixel.css';

const Pixel = ({ pickedColor, showGrid, handleChangeColor, color, x, y, mouseDown }) => {
    const pixel = useRef(null);
    const [pixelColor, setPixelColor] = useState('white');
    const handleMove = (pickedColor, x, y) => {
        setPixelColor(pickedColor);
        // this causes performance problems.
        handleChangeColor(pickedColor, x, y);
        
    }
    return <div
        draggable={false}
        className="pixel-block"
        ref={pixel}
        onMouseDown={() => handleChangeColor(pickedColor, x, y)}
        onMouseEnter={() => mouseDown && pickedColor !== color ? handleMove(pickedColor, x, y) : null}
        style={{ backgroundColor: pixelColor || 'white', border: showGrid ? '1px solid black' : 'initial' }}
    >

    </div>
}

export default Pixel;