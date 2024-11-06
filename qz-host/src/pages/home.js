import React from 'react';
import Sidebar from '../components/sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {

  return (

    <div className="App">
    <Sidebar />
    <div className='logo'><img src="/img/logo.png" /> </div>
    <div className='welcome-text'><h1>Welcome, Quiz Presenter. </h1>Click in the top left {<MenuIcon />}  icon to start.</div>
    </div>
  );
};

export default Home;
