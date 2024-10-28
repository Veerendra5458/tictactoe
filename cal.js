const boardElement = document.getElementById('board');
        const messageElement = document.getElementById('message');
        const resetButton = document.getElementById('resetButton');

        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let isGameActive = true;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function createBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.innerText = cell;
                cellElement.addEventListener('click', () => handleCellClick(index));
                boardElement.appendChild(cellElement);
            });
        }
        function handleCellClick(index) {
            if (board[index] !== '' || !isGameActive) return;

            board[index] = currentPlayer;
            checkResult();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            createBoard();
        }

        function checkResult() {
            let roundWon = false;

            for (let i = 0; i < winningConditions.length; i++) {
                const [a, b, c] = winningConditions[i];
                if (board[a] === '' || board[b] === '' || board[c] === '') {
                    continue;
                }
                if (board[a] === board[b] && board[a] === board[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                messageElement.innerText = `Player ${currentPlayer} wins!`;
                isGameActive = false;
                return;
            }

            if (!board.includes('')) {
                messageElement.innerText = 'It\'s a draw!';
                isGameActive = false;
            }
        }

        resetButton.addEventListener('click', resetGame);

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            isGameActive = true;
            messageElement.innerText = '';
            createBoard();
        }

        createBoard();