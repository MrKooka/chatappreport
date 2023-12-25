import React from 'react';
import {  Link } from "react-router-dom";

const ReportHeadData = () => {
    return (
        <div className='home'>
        <div className="container">
          <div className="chat">
              <div className="chatInfo">
                  <div className="chatIcons">
                      <Link to="/"><button className="/">Назад</button></Link>
                  </div>
              </div> 
            <form>
                <label>Shift </label>
                <select name="options" id="option-select">
                    <option value="option1">Shift 1 06:00-14:30</option>
                    <option value="option2">Shift 2 13:30-22:00</option>
                </select>
                <label>Test Car ID </label>
                <input type="text" />
            </form>
          </div>
        </div>
      </div>
    );
};

export default ReportHeadData;