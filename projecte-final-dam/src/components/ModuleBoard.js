import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export const ModuleBoard = ({ position }) => {
	const [game, setGame] = useState(new Chess());
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setCurrentIndex(0); // Reinicia currentIndex a 0 cuando se recibe una nueva posición
	}, [position]);

	useEffect(() => {
		const updatePosition = () => {
			if(currentIndex < position.length){				
				const updatedGame = new Chess(position[currentIndex]);
				setGame(updatedGame);
				setCurrentIndex((prevIndex) => (prevIndex + 1) % position.length);
			}else setCurrentIndex(0);
		};

		if (position !== undefined && position.length > 0) {
			const interval = setInterval(updatePosition, 100); // Actualiza cada 1 segundo (1000 ms)

			return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
		}
	}, [position, game]);

	return <Chessboard 
				position={game.fen()} 
				animationDuration={0}
				arePiecesDraggable={false}
				customBoardStyle={{ border: '2px solid black' }} 
			/>;
};