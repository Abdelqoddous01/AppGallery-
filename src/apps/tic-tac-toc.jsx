import { useState } from 'react';

function Tic_tac_toc() {
    const [currentTurn, setTurn] = useState('x');
    const [cases, updateCases] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [winner, setWinner] = useState(null);

    const b_style = {
        padding: '30px',
        border: '2px solid black',
        backgroundColor: '#f0f0f0',
        fontSize: '24px',
        margin: '5px',
        width: '80px',
        height: '80px',
        cursor: 'pointer',
    };
    
    function handlClick(row, col) {
        if (cases[row][col] === "" && !winner) {
            const updatedCases = [...cases];
            updatedCases[row][col] = currentTurn;

            updateCases(updatedCases);
            const winner = calculWinner(updatedCases);
            if (winner) {
                setWinner(winner);
            } else {
                setTurn(currentTurn === 'x' ? 'o' : 'x');
            }
        }
    }

    function calculWinner(cases) {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (cases[i][0] && cases[i][0] === cases[i][1] && cases[i][1] === cases[i][2]) {
                return cases[i][0];
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (cases[0][i] && cases[0][i] === cases[1][i] && cases[1][i] === cases[2][i]) {
                return cases[0][i];
            }
        }
        // Check diagonals
        if (cases[0][0] && cases[0][0] === cases[1][1] && cases[1][1] === cases[2][2]) {
            return cases[0][0];
        }
        if (cases[0][2] && cases[0][2] === cases[1][1] && cases[1][1] === cases[2][0]) {
            return cases[0][2];
        }

        return null;
    }

    function resetBoard(){
        updateCases([["", "", ""], ["", "", ""], ["", "", ""]])
        setWinner(null)
    }

    return (
        <div className='bg-blue-100 h-full-screen' style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 className='text-center text-4xl font-bold my-5'> Tic-Tac-Toc</h1>
            {winner && <h2 style={{ color: 'green' }}>Winner: {winner}</h2>}
            <div className='flex' style={{ justifyContent: 'center' }}>
                <button
                     style={b_style}
                    onClick={() => handlClick(0, 0)}
                >
                    {cases[0][0]}
                </button>
                <button
                     style={b_style}
                    onClick={() => handlClick(0, 1)}
                >
                    {cases[0][1]}
                </button>
                <button
                     style={b_style}
                    onClick={() => handlClick(0, 2)}
                >
                    {cases[0][2]}
                </button>
            </div>
            <div className='flex' style={{ justifyContent: 'center' }}>
                <button
                     style={b_style}
                    onClick={() => handlClick(1, 0)}
                >
                    {cases[1][0]}
                </button>
                <button
                     style={b_style}
                    onClick={() => handlClick(1, 1)}
                >
                    {cases[1][1]}
                </button>
                <button
                    style={b_style}
                    onClick={() => handlClick(1, 2)}
                >
                    {cases[1][2]}
                </button>
            </div>
            <div className='flex' style={{ justifyContent: 'center' }}>
                <button
                     style={b_style}
                    onClick={() => handlClick(2, 0)}
                >
                    {cases[2][0]}
                </button>
                <button
                     style={b_style}
                    onClick={() => handlClick(2, 1)}
                >
                    {cases[2][1]}
                </button>
                <button
                     style={b_style}
                    onClick={() => handlClick(2, 2)}
                >
                    {cases[2][2]}
                </button>
            </div>

            <div>
                <button className='px-10 py-5 bg-black text-white hover:opacity-80' onClick={()=>resetBoard()}>Reset game</button>
            </div>
        </div>

    );
}

export default Tic_tac_toc;

