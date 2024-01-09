// Profile.jsx
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useReport from "../hooks/useReport";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { formatDate } from "../utils/timer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { documents, loading, error } = useReport({ userOwner: currentUser.uid });
  const handleListItemClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  if (loading) {
    return (
        <div className='home'>
            <div className="container">
                <div className="chat">
                    <div className="chatInfo">
                        <LinearProgress />;
                    </div>
                </div>
            </div>
        </div>
     )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='home'>
      <div className="container">
        <div className="chat">
          <div className="chatInfo">
            <span>{currentUser.displayName}</span>
            <div className="chatIcons">
              <Link to="/"><Button variant="contained">Back</Button></Link>
            </div>
          </div>
          <Box sx={{ width: '100%' }}>
            <nav aria-label="main mailbox folders"> 
              <List>
                {documents && documents.map((report) => (
                  <ListItem key={report.id} disablePadding>
                    <ListItemButton onClick={() => handleListItemClick(report.id)}>
                      <div> Date: {formatDate(report.date)} Shift: {report.shift}</div>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Profile;
