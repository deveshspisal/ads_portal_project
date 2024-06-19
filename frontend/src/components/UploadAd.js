import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UploadAd = ({ fetchAds }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deeplink, setDeeplink] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      setError('Please select an image file.');
      setImage(null);
    } else {
      setError('');
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess('');

    if (!image) {
      setError('Please select an image to upload.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deeplink', deeplink);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://13.232.248.165:5000/api/ads/upload', formData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Ad uploaded successfully!');
      fetchAds(); // Fetch ads to update state after upload
    } catch (error) {
      setError('Error uploading ad. Please try again.');
      console.error('Error uploading ad:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Upload Ad</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDeeplink">
          <Form.Label>Deeplink URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter deeplink URL"
            value={deeplink}
            onChange={(e) => setDeeplink(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}

        <Button variant="primary" type="submit" disabled={loading} className="mt-3">
          {loading ? 'Uploading...' : 'Upload Ad'}
        </Button>
      </Form>
      <Link to="/dashboard" className="btn btn-secondary mt-3">Go to Dashboard</Link>
    </Container>
  );
};

export default UploadAd;
