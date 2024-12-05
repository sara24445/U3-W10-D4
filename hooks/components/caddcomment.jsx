import React, { useState } from 'react';

const AddComment = () => {
  const [formData, setFormData] = useState({ name: '', comment: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per inviare il commento
    console.log(formData); // Esempio di log della formData
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;