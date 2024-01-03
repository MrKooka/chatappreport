import React,{useContext,useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {formatDate,hm,getDelta} from "../utils/timer"
import Button from '@mui/material/Button';

const Report = () => {
const { currentUser } = useContext(AuthContext);
const { report, getReport } = useContext(ChatContext);

    const  date = formatDate(report.date)
    console.log("data from report =>", report);
    const report_for_render = report.events && report.events.map(event => {
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
    console.log("report_for_render=>", report_for_render);
    
    useEffect(() => {
        getReport(); // Вызываем getReport без условий
        }, [getReport]);

 
    return (
    <div className='home'>
      <div className="container">
        <div className="chat">
            <div className="chatInfo">
                <div className="chatIcons">
                    <Link to="/"><Button variant="contained">Back</Button></Link>
                </div>
            </div> 
            <p>{date} Shift {report.shift}</p>
            <p>Test Car ID: {report.test_car_id}</p>
            <p>Route ID: {report.route_id}</p>
            <p>Current Location: {report.current_location}</p>
            <p>Working hours: {report.working_hours}</p>
            {report.events && report_for_render.map((event) => (
                <p key={event.id}>{event.start_event_time}:{event.end_event_time} {event.text}</p>
            ))}

        </div>
        
      </div>
    </div>
    
    );
};

export default Report;