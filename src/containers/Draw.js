import React, { useState } from 'react';
import Pixel from '../components/Pixel';
import '../styles/pixel.css';


const Draw = () => {
    const [pickedColor, setPickedColor] = useState('white');
    const [showGrid, setShowGrid] = useState(true);
    const [mouseDown, setMouseDown] = useState(false);
    const [x, setX] = useState(20);
    const [y, setY] = useState(20);

    // We don't use .fill or .push here because there is some very weird interaction when setting a new value in the matrix
    const generateMatrix = (x, y) => {
        return Array.from(Array(y), () => Array.from(Array(x)));
    }

    const [matrix, setMatrix] = useState(generateMatrix(x, y));
    const [newMatrix, setNewMatrix] = useState(null);

    const colors = [
        'white',
        'orange',
        'blue', 
        'black',
        'yellow',
        'red'
    ]

    const handlePickedColor = (e) => {
        setPickedColor(e.target.value);
    }

    const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    const resetGrid = () => {
        console.log(generateMatrix(x, y));
        setMatrix(generateMatrix(x, y));
    }

    const [test, setTest] = useState(null);
    const handleChangeMatrixColor = (pickedColor, x, y) => {
        const newMatrix = [...matrix];
        newMatrix[y][x] = pickedColor;
        // setting state causes slow performance
        // setNewMatrix(newMatrix);

    }

    const handleChangeMatrix = (x, y) => {
        setX(x);
        setY(y);
        setMatrix(generateMatrix(Number(x), Number(y)));
    }

    return <div>
        <div className="color-selector">
            <select onChange={handlePickedColor}>
                {colors.map(color => <option value={color}>{capitalizeString(color)}</option>)}
            </select>
            <label htmlFor="show-grid">Show grid</label>
            <input id="show-grid" name="show-grid" type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)}></input>
            <div>
                <input className="matrix-input" onChange={e => handleChangeMatrix(e.target.value, y)} value={x}/>
                <span> x </span>
                <input className="matrix-input" onChange={e => handleChangeMatrix(x, e.target.value)} value={y}/>
            </div>
            <button onClick={resetGrid}>Reset grid</button>
        </div>
        <div draggable={false} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} style={{ border: '1px solid black' }}>
            {matrix.map((el, y) => {
                return <div draggable={false} className="pixel-row">
                    {el.map((pixel, x) =>
                        <Pixel
                            y={y}
                            x={x}
                            color={pixel} 
                            showGrid={showGrid}
                            mouseDown={mouseDown}
                            pickedColor={pickedColor}
                            handleChangeColor={(pickedColor, x, y) => handleChangeMatrixColor(pickedColor, x, y)}
                        />)
                    }
                </div>
            })}
        </div>
    </div>
}

export default Draw;