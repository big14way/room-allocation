import React, { useState } from 'react';

const AddMemberDialog = ({ roomId, onClose, onAddMember }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('facilitator');
  const [skill, setSkill] = useState('');
  const [gender, setGender] = useState('male');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      alert('Name is required!');
      return;
    }

    const newMember = { name, role, skill: role === 'developer' ? skill : '', gender };
    onAddMember(roomId, newMember);
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Add New Team Member</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="facilitator">Facilitator</option>
            <option value="developer">Developer</option>
          </select>
          {role === 'developer' && (
            <>
              <label>Skill</label>
              <select value={skill} onChange={(e) => setSkill(e.target.value)}>
                <option value="smart-contract">Smart Contract</option>
                <option value="frontend">Frontend</option>
                <option value="server-side">Server-side</option>
              </select>
            </>
          )}
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="dialog-buttons">
            <button type="submit">Add Member</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberDialog;
