import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = ({ ads, analytics, fetchAds, error }) => {
  const history = useHistory();
  const [impressionCount, setImpresionount] = useState(0)
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
    let tempRes = 0
    ads.forEach(ele => {
      tempRes += ele.impressions
    });
    setImpresionount(tempRes);
  }, [history,ads]);


 
  const logImpression = async (adId) => {
    try {
      await axios.post('http://13.232.248.165:5000/api/ads/impression', { adId });
      fetchAds(); // Fetch ads after logging impression to update state
    } catch (error) {
      console.error('Error logging impression:', error.response ? error.response.data : error.message);
    }
  };

  const logOutUser = () =>{
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/login';
  }
  const handleDeeplinkClick = (adId, deeplink) => {
    logImpression(adId);
    const formattedUrl = deeplink.startsWith('http://') || deeplink.startsWith('https://') ? deeplink : `http://${deeplink}`;
    window.open(formattedUrl, '_blank');
  };

  return (
    <Container>
      <Row className='mt-4'> 
        <Col md={6}><h1 className="my-4">Dashboard</h1></Col>
        <Col md={4}><Link to="/upload" className="btn btn-secondary mt-3">Create Ads</Link></Col>
        <Col md={2}><button  onClick={()=>{logOutUser()}} className="btn btn-secondary mt-3">Logout</button></Col>
      </Row>      
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <h2>Total Ads Uploaded: {ads.length}</h2>
        </Col>
        <Col md={6}>
          <h2>Total Impressions: {impressionCount}</h2>
        </Col>
      </Row>
      <Row>
        {ads.map((ad) => (
          <Col md={3} key={ad._id} className="mb-4 mt-4">
            <Card  style={{height:500}}>
              <Card.Img variant="top" src={`http://13.232.248.165:5000/${ad.image}`} style={{height:200}}/>
              <Card.Body>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Text>{ad.description}</Card.Text>
                <Card.Text>Impressions - {ad.impressions}</Card.Text>
                <Button variant="primary" onClick={() => handleDeeplinkClick(ad._id, ad.deeplink)}>Visit Ad</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
