const rooms = [];
const maxPeoplePerRoom = 4;
const maxDevelopersPerSkill = 2;

document.addEventListener("DOMContentLoaded", () => {
    // Initialize rooms
    for (let i = 0; i < 6; i++) {
        rooms.push({
            id: i + 1,
            members: [],
            gender: null, // Gender assignment for the room
        });
    }

    renderRooms();

    // Open dialog for adding a new member
    document.getElementById('open-dialog').addEventListener('click', () => {
        document.getElementById('dialog').style.display = 'flex';
    });

    // Close dialog
    document.getElementById('close-dialog').addEventListener('click', () => {
        document.getElementById('dialog').style.display = 'none';
    });

    // Handle form submission to add a new member
    document.getElementById('member-form').addEventListener('submit', (event) => {
        event.preventDefault();
        addMember();
    });
});

function renderRooms() {
    const roomsContainer = document.querySelector('.rooms');
    roomsContainer.innerHTML = '';

    rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room');
        roomElement.innerHTML = `
            <h3>Room ${room.id}</h3>
            <ul>
                ${room.members.map(member => `<li>${member.name} (${member.role}, ${member.skill || 'N/A'}, ${member.gender})</li>`).join('')}
            </ul>
            <button onclick="openRoomDialog(${room.id})">Assign Member</button>
        `;
        roomsContainer.appendChild(roomElement);
    });
}

function openRoomDialog(roomId) {
    // Open the dialog and pre-fill the room ID
    currentRoomId = roomId;
    document.getElementById('dialog').style.display = 'flex';
}

let currentRoomId = null;

function addMember() {
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const skill = document.getElementById('skill').value;
    const gender = document.getElementById('gender').value;

    const room = rooms[currentRoomId - 1];

    // Validate room capacity
    if (room.members.length >= maxPeoplePerRoom) {
        alert("Room is already full!");
        return;
    }

    // Validate gender-based accommodation
    if (room.gender && room.gender !== gender) {
        alert("You cannot assign a member of this gender to this room.");
        return;
    }

    // Assign gender to the room if it's empty
    if (!room.gender) {
        room.gender = gender;
    }

    // Validate developer skill restrictions
    if (role === "developer") {
        const sameSkillDevelopers = room.members.filter(member => member.skill === skill).length;
        if (sameSkillDevelopers >= maxDevelopersPerSkill) {
            alert("No more than two developers with the same skill set can be assigned to a room.");
            return;
        }
    }

    // Add member to the room
    room.members.push({ name, role, skill: role === "developer" ? skill : null, gender });

    // Re-render rooms
    renderRooms();

    // Close dialog
    document.getElementById('dialog').style.display = 'none';
}
