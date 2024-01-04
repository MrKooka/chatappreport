import React, { useState } from 'react';
import {  Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { FormControl,
          InputLabel,
          Input,
          Select,
          MenuItem,
          TextField } from '@mui/material';
import ZamSetsForm from '../components/ZamSetsForm';
const ReportHeadData = () => {
    const [shift, setShift] = useState('')
    const [date, setDate] = useState('');
    const [route, setRoute] = useState('')
    const [currentLocation, setCurrentLocation] = useState('')
    const [zamSets, setZamSets] = useState([]);
    const handleDateChange = (newDate) => { 
      setDate(newDate.target.value)
      console.log(date);
    };
    const handleZamSetsChange = (newZamSets) => {
      setZamSets(newZamSets);
    };

    const handleAddZamSet = () => {
      const newZamSet = { number: '', percentage_main: '', percentage_satellite: '', status: '' };
      setZamSets([...zamSets, newZamSet]);
    };
  
    const handleRemoveZamSet = (index) => {
      setZamSets(zamSets.filter((_, i) => i !== index));
    };
    console.log("zamSets",zamSets);
      
    return (
        <div className='home'>
        <div className="container">
          <div className="chat">
              <div className="chatInfo">
                  <div className="chatIcons">
                      <Link to="/"><Button variant="contained">Back</Button></Link>
                      <Button variant="contained">Save Head Rport </Button>
                  </div>  
              </div> 
              <FormControl style={{ margin: '20px' }} >
                <TextField
                  id="date-picker"
                  label="Date"
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ marginBottom: '20px' }} // Add margin to separate from the next input
                />
                <FormControl >
                  <InputLabel id="shift-label">Shift</InputLabel>
                  <Select
                    labelId="shift-label"
                    id="shift-select"
                    value={shift}
                    label="Shift"
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <MenuItem value={1}>Shift 1 06:00-14:30</MenuItem>
                    <MenuItem value={2}>Shift 2 13:30-22:00</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <TextField 
                    id="outlined-basic" 
                    label="Route" 
                    variant="outlined" 
                    style={{ marginTop: '20px' }}  
                    value={route}
                    onChange={(e)=>{setRoute(e.target.value);console.log(route);}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                   <TextField 
                    id="outlined-basic" 
                    label="Current Location" 
                    variant="outlined" 
                    style={{ marginTop: '20px' }}  
                    value={currentLocation}
                    onChange={(e)=>{setCurrentLocation(e.target.value);console.log(route);}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl style={{ marginTop: '20px' }}  >
                  <ZamSetsForm 
                    zamSets={zamSets}
                    onZamSetsChange={handleZamSetsChange}
                    onAddZamSet={handleAddZamSet}
                    onRemoveZamSet={handleRemoveZamSet} />
                </FormControl>
              </FormControl>
          
          </div>
        </div>
      </div>
    );
};

export default ReportHeadData;