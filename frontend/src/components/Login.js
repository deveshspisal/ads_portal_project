import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://13.232.248.165:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container >
      {error && <Alert variant="danger" className='mt-4'>{error}</Alert>}
      <h1 className="my-4">Login</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
