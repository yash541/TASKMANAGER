import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './LandingPage';
import axios from 'axios';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import Statistics from './Statistics';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Sidebar from './Sidebar';
const Section1 = ({setCategories,categories}) => {
  const [open, setOpen] = useState(false);
  const [sideBarcontrol, setsideBarcontrol] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleSidebar = () => {
    setsideBarcontrol(true);
  }
  const navigate = useNavigate();

  // Function to clear authentication-related cookies
  const clearCookies = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };
  const handleLogout = () => {
    // Clear authentication-related cookies
    clearCookies();

    // Redirect to the logout page
    navigate('/logout');
  };

  useEffect(() => {
    fetchStatistics();
  }, []);
  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/home/statistics', {
        headers: {
          'Content-Type': 'application/json', // Set Content-Type header to application/json if needed
          Authorization: `Bearer ${getCookie('access_token')}`, // Assuming getCookie is defined
        },
      });
  
      if (response.status === 200) {
        setStatistics(response.data);
        // Handle statistics data...
      } else {
        console.error('Failed to fetch statistics:', response.statusText);
        // Handle error...
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      // Handle error...
    }
  }; // State variable to control sidebar visibility

  return (
    <div className="button-section">
    <div className="left-buttons">
      <FormatListBulletedRoundedIcon onClick={handleSidebar} />
      {sideBarcontrol && <Sidebar setCategories={setCategories} categories={categories} onClose={() => setsideBarcontrol(false)}/>}
      <HomeRoundedIcon/>
    </div>
    <div className="right-buttons">
    <AnalyticsRoundedIcon onClick={handleOpen}/>
    {open && <Statistics statistics={statistics} onClose={() => setOpen(false)}/>}
    <LogoutRoundedIcon onClick={handleLogout}/>
    </div>
    </div>
  );
};

export default Section1;