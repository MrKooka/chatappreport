import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import useReport from '../hooks/useReport';
import { formatDate, hm, getDelta } from "../utils/timer";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import {MenuItem, Select} from '@mui/material'
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

const Report = () => {
    const { reportId } = useParams();
    const { documents: report, loading, error } = useReport({ documentId: reportId });
    const [isRouteIdEditing, setIsEditing] = useState(false);
    const [editedRouteId, setEditedRouteId] = useState('');
    
    const [IsEditingShift, setIsEditingShift] = useState(false);
    const [editedShift, setEditedShift] = useState('');

    const [IsEditingDate, setIsEditingDate] = useState(false);
    const [editedDate, setEditedDate] = useState('');
    
    const [IsEditingTestCarId, setIsEditingTestCarId] = useState(false);
    const [editedTestCarId, setEditedTestCarId] = useState('');

    const [IsEditingCurrentLocation, setIsEditingCurrentLocation] = useState(false);
    const [editedCurrentLocation, setEditedCurrentLocation] = useState('');

    const handleEditDate = (event) => {
        setEditedDate(report[0].test_car_id);
        setIsEditingDate(true);
      };

      const handleSaveNewDate = () => {
        // Здесь нужно обновить Shift в вашем состоянии или базе данных
        console.log('Save new Shift:', IsEditingTestCarId);
        // Закрыть режим редактирования
        setIsEditingDate(false);
        };
    
    const handleEditCurrentLocation = (event) => {
        setEditedCurrentLocation(report[0].test_car_id);
        setIsEditingCurrentLocation(true);
      };

    const handleSaveNewCurrentLocation = () => {
    // Здесь нужно обновить Shift в вашем состоянии или базе данных
    console.log('Save new Shift:', IsEditingTestCarId);
    // Закрыть режим редактирования
    setIsEditingCurrentLocation(false);
    };


    const handleEditTestCarIdClick = (event) => {
        setIsEditingTestCarId(report[0].test_car_id);
        setIsEditingTestCarId(true);
      };

    const handleSaveNewTestCarId = () => {
    // Здесь нужно обновить Shift в вашем состоянии или базе данных
    console.log('Save new Shift:', IsEditingTestCarId);
    // Закрыть режим редактирования
    setIsEditingTestCarId(false);
    };


    const handleEditShiftClick = () => {
        setEditedShift(report[0].shift);
        setIsEditingShift(true);
      };
      
    const handleSaveNewShift = () => {
    // Здесь нужно обновить Shift в вашем состоянии или базе данных
    console.log('Save new Shift:', editedShift);
    // Закрыть режим редактирования
    setIsEditingShift(false);
    };


    const handleEditClick = (e) => {
        setIsEditing(true);
    };

    const handleRouteIdChange = (event) => {
        setEditedRouteId(event.target.value);
      };

    const handleSaveNewRouteId = () => {
        // Здесь вы должны обновить route_id в базе данных или в состоянии вашего приложения
        console.log('Updated Route ID:', editedRouteId);
        setIsEditing(false);
    };
    useEffect(() => {
        // Если вам нужно вызвать какую-то функцию для получения отчета, сделайте это здесь
    }, [reportId]); // Зависимость от reportId гарантирует, что запрос будет выполнен заново, если ID отчета изменится

    if (loading) {
        return(
            <div className='home'>
            <div className="container">
                <div className="chat">
                    <div className="chatInfo">
                        <div className="chatIcons">
                            <Link to="/"><Button variant="contained">Back</Button></Link>
                        </div>
                    <LinearProgress />;
                    </div>
                </div>
            </div>
        </div>
        )   
    }

    if (error) {
        return <Alert severity="error">Error: {error}</Alert>
    }

    // Если отчет не загружен или нет событий, отобразить сообщение
    console.log("report:", report);
    if (!report || !report[0] || !report[0].events){
        return (
            <div className='home'>
                <div className="container">
                    <div className="chat">
                        <div className="chatInfo">
                            <div className="chatIcons">
                                <Link to="/"><Button variant="contained">Back</Button></Link>
                            </div>
                        </div>
                        <Alert severity="info">No report found or no events to display.</Alert>
                        
                    </div>
                </div>
            </div>
        );
    }

    const date = report[0] && formatDate(report[0].date);
    const reportForRender = report[0] && report[0].events && report[0].events.map(event => {
        const startFormatted = hm(event.start_event_time);
        const endFormatted = event.end_event_time ? hm(event.end_event_time) : null;
        const duration = endFormatted ? getDelta(event.start_event_time, event.end_event_time) : '...';
        return {
            ...event,
            start_event_time: startFormatted,
            end_event_time: endFormatted,
            duration
        };
    });

    return (
        <div className='home'>
            <div className="container">
                <div className="chat">
                    <div className="chatInfo">
                        <div className="chatIcons">
                            <Link to="/"><Button variant="contained">Back</Button></Link>
                        </div>
                    </div> 
                        <List >
                            <ListItem>
                            <div>Route ID: {editedDate}</div>
                                    {IsEditingDate ? (
                                        <div>
                                             <TextField
                                                id="date-picker"
                                                label="Date"
                                                type="date"
                                                value={editedDate}
                                                onChange={(e) => setEditedDate(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                style={{marginLeft:"5px"}}
                                                />
                                            <IconButton onClick={handleSaveNewDate}>
                                                <CheckIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                        ) : (
                                    <div>
                                        {report[0] && report[0].route_id}
                                            <IconButton onClick={handleEditDate}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    )}
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <div>Shift: {editedShift}</div>
                                {IsEditingShift ? (
                                    <>
                                    <Select
                                                labelId="shift-label"
                                                id="shift-select"
                                                value={editedShift}
                                                label="Shift"
                                                style={{marginLeft:"5px"}}
                                                onChange={(e) => setEditedShift(e.target.value)}
                                    >                                                                     
                                            <MenuItem value="1">Shift 1</MenuItem>
                                            <MenuItem value="2">Shift 2</MenuItem>
                                    </Select>
                                   
                                    <IconButton onClick={handleSaveNewShift}>
                                        <CheckIcon fontSize="small" />
                                    </IconButton>
                                    </>
                                ) : (
                                    <div>
                                    <IconButton onClick={handleEditShiftClick}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    </div>
                                )}
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <div>Route ID: {editedRouteId}</div>
                                    {isRouteIdEditing ? (
                                        <div>
                                            <Select
                                                labelId="shift-label"
                                                id="shift-select"
                                                value={editedRouteId}
                                                label="Shift"
                                                style={{marginLeft:"5px"}}
                                                onChange={handleRouteIdChange}
                                            >
                                                <MenuItem value="99003">99003 - Free Drive</MenuItem>
                                                <MenuItem value="90000">90000 - Drive to ...</MenuItem>
                                                <MenuItem value="09901">09901 - Calibration </MenuItem>
                                            </Select>
                                            <IconButton onClick={handleSaveNewRouteId}>
                                                <CheckIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                        ) : (
                                    <div>
                                        {report[0] && report[0].route_id}
                                            <IconButton onClick={handleEditClick}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    )}
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                                <div>Test Car Id: {editedTestCarId}</div>
                                {IsEditingTestCarId ? (
                                    <>
                                    <TextField
                                        value={editedTestCarId}
                                        onChange={(e) => setEditedTestCarId(e.target.value)}
                                        size="small"
                                        style={{ marginLeft: '5px' }}
                                        
                                    />
                                    <IconButton onClick={handleSaveNewTestCarId}>
                                        <CheckIcon fontSize="small" />
                                    </IconButton>
                                    </>
                                ) : (
                                    <div>
                                    <IconButton onClick={handleEditTestCarIdClick}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    </div>
                                )}
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                            <div>Current Location {editedCurrentLocation}</div>
                                {IsEditingCurrentLocation ? (
                                    <>
                                    <TextField
                                        value={editedCurrentLocation}
                                        onChange={(e) => setEditedCurrentLocation(e.target.value)}
                                        size="small"
                                        style={{ marginLeft: '5px' }}
                                    />
                                    <IconButton onClick={handleSaveNewCurrentLocation}>
                                        <CheckIcon fontSize="small" />
                                    </IconButton>
                                    </>
                                ) : (
                                    <div>
                                    <IconButton onClick={handleEditCurrentLocation}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    </div>
                                )}
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                               <div> Working hours: {report[0] && report[0].working_hours} <EditIcon fontSize="small" /></div>
                            </ListItem>
                            <Divider  component="li" />
                                {reportForRender.map((event, index) => (
                                     <div key={index} style={{ marginLeft: '17px',marginTop:"3px"}}  >
                                     {event.start_event_time} - {event.end_event_time} {event.text}
                                   </div>
                                ))}
                            <Divider  component="li"  style={{marginTop:"8px"}}/>
                            <ListItem>
                                <div>Recording time: {report[0] && report[0].Recording_time}<EditIcon fontSize="small" /></div>
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                                <div>Standby downtime: {report[0] && report[0].standby_downtime}<EditIcon fontSize="small" /></div>
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                                <div>System downtime: {report[0] && report[0].system_downtime}<EditIcon fontSize="small" /></div>
                            </ListItem>
                            <Divider  component="li" />
                            <ListItem>
                                <div>Closed: {report[0] && report[0].closed}<EditIcon fontSize="small" /></div>
                            </ListItem>
                        </List>
                 
                </div>
            </div>
        </div>
    );
};

export default Report;
