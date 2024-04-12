import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  let navigate = useNavigate();

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      const form_data = new FormData();
      form_data.append('file', file);
      const response = axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, form_data)
        .then(response => {
          const file_id = response.data.file_id;
          navigate(`/data/${encodeURIComponent(file_id)}`);

        })
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  return (
    <div>
      <input type="file" on onChange={handleFileChange} />
    </div>
  );
}

export default HomePage;
