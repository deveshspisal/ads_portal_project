import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import UploadAd from './components/UploadAd';
import Login from './components/Login';


const App = () => {
  const [ads, setAds] = useState([]);

  const [error, setError] = useState('');

  const fetchAds = async () => {
    const token = localStorage.getItem('token');
    try {
      const adsResponse = await axios.get('http://13.232.248.165:5000/api/ads/ads', {
        headers: { Authorization: `${token}` },
      });
      setAds(adsResponse.data);
    } catch (error) {
      setError('Error fetching ads');
    }
  };

  

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div>
      <Switch>
        
        <Route path="/login">
          {localStorage.getItem('token') ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login/>
          )}
        </Route>
        <Route path="/dashboard">
          {localStorage.getItem('token') ? (
            <Dashboard ads={ads} fetchAds={fetchAds} error={error} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/upload">
          {localStorage.getItem('token') ? (
            <UploadAd fetchAds={fetchAds} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
