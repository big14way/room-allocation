import React, { useState } from 'react';
import './App.css';
import Room from './components/Room';
import AddMemberDialog from './components/AddMemberDialog';

const App = () => {
  const maxPeoplePerRoom = 4;
  const maxDevelopersPerSkill = 2;

  // Initial state for rooms (6 rooms)
  const [rooms, setRooms] = useState(Array(6).fill(null).map(() => ({
    members: [],
    gender: null,
  })));

  const [showDialog, setShowDialog] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);

  const addMemberToRoom = (roomId, member) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      const room = updatedRooms[roomId];
      const existingMembers = room.members;

      // Gender validation
      if (room.gender && room.gender !== member.gender) {
        alert("Gender mismatch! You cannot assign a member of this gender to the room.");
        return prevRooms;
      }

      // Assign gender if this is the first member
      if (!room.gender) {
        room.gender = member.gender;
      }

      // Validate developer skill set (no more than 2 developers with the same skill)
      if (member.role === "developer") {
        const sameSkillCount = existingMembers.filter(m => m.skill === member.skill).length;
        if (sameSkillCount >= maxDevelopersPerSkill) {
          alert("No more than two developers with the same skill set allowed in a room.");
          return prevRooms;
        }
      }

      // Validate room capacity
      if (existingMembers.length >= maxPeoplePerRoom) {
        alert("Room is full!");
        return prevRooms;
      }

      // Add the new member
      room.members.push(member);
      return updatedRooms;
    });
  };

  const openAddMemberDialog = (roomId) => {
    setCurrentRoomId(roomId);
    setShowDialog(true);
  };

  const closeAddMemberDialog = () => {
    setShowDialog(false);
    setCurrentRoomId(null);
  };

  return (
    <div className="App">
      <h1>Web3Bridge Room Allocation System</h1>

      <div className="rooms">
        {rooms.map((room, index) => (
          <Room
            key={index}
            roomId={index}
            members={room.members}
            gender={room.gender}
            openDialog={openAddMemberDialog}
          />
        ))}
      </div>

      {showDialog && (
        <AddMemberDialog
          roomId={currentRoomId}
          onClose={closeAddMemberDialog}
          onAddMember={addMemberToRoom}
        />
      )}
    </div>
  );
};

export default App;
