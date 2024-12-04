$(document).ready(function () {
// Define rotation data structure
const RotationData = {
    rotations: [
        { // Rotation 1
            positions: [
                { name: "S", x: 500, y: 450 },      //Position 1
                { name: "OH1", x: 500, y: 250 },    //Position 2
                { name: "M2", x: 400, y: 250 },     //Position 3
                { name: "OP", x: 300, y: 250 },     //Position 4
                { name: "OH2", x: 300, y: 450 },    //Position 5
                { name: "L", x: 400, y: 450 }       //Position 6
            ],
            servePositions: [
                { name: "S", x: 500, y: 575},       //Position 1
                { name: "OH1", x: 425, y: 250 },    //Position 2
                { name: "M2", x: 400, y: 200 },     //Position 3
                { name: "OP", x: 375, y: 250 },     //Position 4
                { name: "OH2", x: 400, y: 450 },    //Position 5
                { name: "L", x: 450, y: 375 }       //Position 6
            ],
            receivePositions: [
                { name: "S", x: 510, y: 455 },      //Position 1
                { name: "OH1", x: 475, y: 425 },    //Position 2
                { name: "M2", x: 280, y: 250 },     //Position 3
                { name: "OP", x: 265, y: 200 },     //Position 4
                { name: "OH2", x: 325, y: 425 },    //Position 5
                { name: "L", x: 400, y: 425 }       //Position 6
            ],
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_1"
        },

        { // Rotation 2
            positions: [
                { name: "OH1", x: 500, y: 450 },    //Position 1
                { name: "M2", x: 500, y: 250 },     //Position 2
                { name: "OP", x: 400, y: 250 },     //Position 3
                { name: "OH2", x: 300, y: 250 },    //Position 4
                { name: "L", x: 300, y: 450 },      //Position 5
                { name: "S", x: 400, y: 450 }       //Position 6
            ],
            servePositions: [
                { name: "OH1", x: 500, y: 575 },    //Position 1
                { name: "M2", x: 400, y: 200 },     //Position 2
                { name: "OP", x: 375, y: 250 },     //Position 3
                { name: "OH2", x: 330, y: 200 },    //Position 4
                { name: "L", x: 300, y: 375 },      //Position 5
                { name: "S", x: 500, y: 375 }       //Position 6
            ],
            receivePositions: [
                { name: "OH1", x: 500, y: 425 },    //Position 1
                { name: "M2", x: 525, y: 275 },     //Position 2
                { name: "OP", x: 500, y: 200 },     //Position 3
                { name: "OH2", x: 300, y: 400 },    //Position 4
                { name: "L", x: 400, y: 425 },      //Position 5
                { name: "S", x: 450, y: 250 }       //Position 6
            ], 
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_2"
        },

        { // Rotation 3
            positions: [
                { name: "L", x: 500, y: 450 },       //Position 1
                { name: "OP", x: 500, y: 250 },      //Position 2
                { name: "OH2", x: 400, y: 250 },     //Position 3
                { name: "M1", x: 300, y: 250 },      //Position 4
                { name: "S", x: 300, y: 450 },       //Position 5
                { name: "OH1", x: 400, y: 450 }      //Position 6
            ],
            servePositions: [
                { name: "M2", x: 500, y: 575 },      //Position 1
                { name: "OP", x: 475, y: 200 },      //Position 2
                { name: "OH2", x: 425, y: 250 },     //Position 3
                { name: "M1", x: 400, y: 200 },      //Position 4
                { name: "S", x: 350, y: 375 },       //Position 5
                { name: "OH1", x: 400, y: 450 }      //Position 6
            ],
            receivePositions: [
                { name: "L", x: 475, y: 425 },       //Position 1
                { name: "OP", x: 525, y: 275 },      //Position 2
                { name: "OH2", x: 300, y: 400 },     //Position 3
                { name: "M1", x: 275, y: 250 },      //Position 4
                { name: "S", x: 350, y: 275 },       //Position 5
                { name: "OH1", x: 400, y: 425 }      //Position 6
            ], 
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_3"
        },

        { // Rotation 4
            positions: [
                { name: "OP", x: 500, y: 450 },      //Position 1
                { name: "OH2", x: 500, y: 250 },     //Position 2
                { name: "M1", x: 400, y: 250 },      //Position 3
                { name: "S", x: 300, y: 250 },       //Position 4
                { name: "OH1", x: 300, y: 450 },     //Position 5
                { name: "L", x: 400, y: 450 }        //Position 6
            ],
            servePositions: [
                { name: "OP", x: 500, y: 575 },      //Position 1
                { name: "OH2", x: 425, y: 250 },     //Position 2
                { name: "M1", x: 400, y: 200 },      //Position 3
                { name: "S", x: 375, y: 250 },       //Position 4
                { name: "OH1", x: 400, y: 450 },     //Position 5
                { name: "L", x: 450, y: 375 }        //Position 6
            ],
            receivePositions: [
                { name: "OP", x: 510, y: 525 },      //Position 1
                { name: "OH2", x: 325, y: 400 },     //Position 2
                { name: "M1", x: 280, y: 250 },      //Position 3
                { name: "S", x: 265, y: 200 },       //Position 4
                { name: "OH1", x: 475, y: 425 },     //Position 5
                { name: "L", x: 400, y: 425 }        //Position 6
            ], 
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_4"
        },

        { // Rotation 5
            positions: [
                { name: "OH2", x: 500, y: 450 },     //Position 1
                { name: "M1", x: 500, y: 250 },      //Position 2
                { name: "S", x: 400, y: 250 },       //Position 3
                { name: "OH1", x: 300, y: 250 },     //Position 4
                { name: "L", x: 300, y: 450 },       //Position 5
                { name: "OP", x: 400, y: 450 }       //Position 6
            ],
            servePositions: [
                { name: "OH2", x: 500, y: 575 },     //Position 1
                { name: "M1", x: 400, y: 200 },      //Position 2
                { name: "S", x: 375, y: 250 },       //Position 3
                { name: "OH1", x: 330, y: 200 },     //Position 4
                { name: "L", x: 300, y: 375 },       //Position 5
                { name: "OP", x: 500, y: 375 }       //Position 6
            ],
            receivePositions: [
                { name: "OH2", x: 475, y: 425 },     //Position 1
                { name: "M1", x: 525, y: 275 },      //Position 2
                { name: "S", x: 450, y: 200 },       //Position 3
                { name: "OH1", x: 325, y: 400 },     //Position 4
                { name: "L", x: 400, y: 425 },       //Position 5
                { name: "OP", x: 450, y: 525 }       //Position 6
            ], 
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_5"
        },

        { // Rotation 6
            positions: [
                { name: "M1", x: 500, y: 450 },      //Position 1
                { name: "S", x: 500, y: 250 },       //Position 2
                { name: "OH1", x: 400, y: 250 },     //Position 3
                { name: "M2", x: 300, y: 250 },      //Position 4
                { name: "OP", x: 300, y: 450 },      //Position 5
                { name: "OH2", x: 400, y: 450 }      //Position 6
            ],
            servePositions: [
                { name: "M1", x: 500, y: 575 },      //Position 1
                { name: "S", x: 475, y: 200 },       //Position 2
                { name: "OH1", x: 425, y: 250 },     //Position 3
                { name: "M2", x: 400, y: 200 },      //Position 4
                { name: "OP", x: 350, y: 375 },      //Position 5
                { name: "OH2", x: 400, y: 450 }      //Position 6
            ],
            receivePositions: [
                { name: "L", x: 475, y: 425 },       //Position 1
                { name: "S", x: 450, y: 200 },       //Position 2
                { name: "OH1", x: 325, y: 400 },     //Position 3
                { name: "M2", x: 275, y: 275 },      //Position 4
                { name: "OP", x: 350, y: 525 },      //Position 5
                { name: "OH2", x: 400, y: 425 }      //Position 6
            ], 
            youtubePlaylistUrl: "https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID_ROTATION_6"
        },

        
    ]
};

let currentRotation = 0;
let players = [];
let activePlayer = null;

function createPlayers() {
    const court = document.querySelector('.court');
    const courtRect = court.getBoundingClientRect();
    
    // Clear existing players
    players.forEach(player => player.element.remove());
    players = [];

    // Create new players
    RotationData.rotations[currentRotation].positions.forEach(position => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player';
        playerElement.textContent = position.name;
        
        // Use window dimensions for initial positioning
        const scaledX = (position.x / 800) * window.innerWidth;
        const scaledY = (position.y / 600) * window.innerHeight;
        
        playerElement.style.left = `${scaledX - 25}px`;
        playerElement.style.top = `${scaledY - 25}px`;
        
        const player = {
            element: playerElement,
            position: { x: scaledX, y: scaledY },
            name: position.name
        };
        
        players.push(player);
        document.body.appendChild(playerElement);
        
        setupPlayerInteraction(playerElement, player);
    });
}

function setupPlayerInteraction(element, player) {
    let startX, startY;
    let initialX, initialY;

    // Touch events
    element.addEventListener('touchstart', handleStart, { passive: false });
    element.addEventListener('touchmove', handleMove, { passive: false });
    element.addEventListener('touchend', handleEnd);

    // Mouse events
    element.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    function handleStart(e) {
        e.preventDefault();
        
        const point = e.touches ? e.touches[0] : e;
        activePlayer = player;
        
        startX = point.clientX;
        startY = point.clientY;
        initialX = player.position.x;
        initialY = player.position.y;

        element.style.zIndex = "100";
    }

    function handleMove(e) {
        if (!activePlayer || activePlayer !== player) return;
        e.preventDefault();

        const point = e.touches ? e.touches[0] : e;
        const deltaX = point.clientX - startX;
        const deltaY = point.clientY - startY;

        const newX = initialX + deltaX;
        const newY = initialY + deltaY;

        player.position.x = newX;
        player.position.y = newY;
        element.style.left = `${newX - 25}px`;
        element.style.top = `${newY - 25}px`;
    }

    function handleEnd() {
        if (activePlayer === player) {
            element.style.zIndex = "10";
            activePlayer = null;
        }
    }
}
// Function to open YouTube playlist based on current rotation
function openYouTubePlaylist() {
    const currentPlaylistUrl = RotationData.rotations[currentRotation].youtubePlaylistUrl;
    
    // Open the playlist in a new tab
    window.open(currentPlaylistUrl, '_blank');
}

function handleRotationChange() {
    currentRotation = parseInt(document.getElementById('rotationSelect').value);
    createPlayers();
}

function setServePositions() {
    const positions = RotationData.rotations[currentRotation].servePositions;
    updatePositions(positions);
}

function setReceivePositions() {
    const positions = RotationData.rotations[currentRotation].receivePositions;
    updatePositions(positions);
}

function updatePositions(positions) {
    positions.forEach((position, index) => {
        const player = players[index];
        // Scale positions based on window size
        const scaledX = (position.x / 800) * window.innerWidth;
        const scaledY = (position.y / 600) * window.innerHeight;
        
        player.position.x = scaledX;
        player.position.y = scaledY;
        player.element.style.left = `${scaledX - 25}px`;
        player.element.style.top = `${scaledY - 25}px`;
    });
}

// Handle window resize
window.addEventListener('resize', createPlayers);

// Initialize the board
window.onload = () => {
    createPlayers();
};
})