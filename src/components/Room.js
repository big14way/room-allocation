import React from 'react';

const Room = ({ roomId, members, gender, openDialog }) => {
  return (
    <div className="room">
      <h3>Room {roomId + 1}</h3>
      <p><strong>Gender:</strong> {gender || 'Not Assigned'}</p>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member.name} ({member.role}, {member.skill || 'N/A'}, {member.gender})
          </li>
        ))}
      </ul>
      <button onClick={() => openDialog(roomId)}>Add Member</button>
    </div>
  );
};

export default Room;
