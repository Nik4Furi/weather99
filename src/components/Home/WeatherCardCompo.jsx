import React from 'react'

import PropTypes from 'prop-types';

import { ConvertInDate } from '../../GlobalFunctions/globalFunctions';



import { IoMdSunny } from "react-icons/io";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoMdRainy } from "react-icons/io";
import { FaSkyatlas } from "react-icons/fa";

const WeatherCardCompo = ({ title, img, today, highTemp, lowTemp, humedity }) => {

    //conver temperature kelvin to celcius
    const highTemperaturCelcius = (highTemp - 273.15).toFixed(2);

    const LowTemperaturCelcius = (lowTemp - 273.15).toFixed(2);


    const todayDt = ConvertInDate(today).split(" ");

    const strDt = todayDt[0] + " " + todayDt[1] + " " + todayDt[2];

    const images = { 'rainy': <IoMdRainy />, 'clear': <IoMdSunny />, 'clouds': <FaSkyatlas /> }

    if (!humedity)
        return null;

    return (
        <>
            <div className=" card col-3 mx-2 my-2 shadow-lg text-bg-dark text-center" style={{ width: "18rem" }}>
                <div className="d-flex align-items-center justify-content-between p-4">

                    <h5 className="card-title text-capitalize">
                        <span>{images[title?.toLowerCase()] ? images[title?.toLowerCase()] : <IoMdSunny />}</span>
                        {"  "} {title}</h5>
                    <h5 className="card-title">{strDt}</h5>
                </div>
                <hr />
                <div className="card-body p-4">
                    <p className="card-text"><FaTemperatureArrowUp color='red' /> {highTemperaturCelcius}*C</p>
                    <p className="card-text"><FaTemperatureArrowDown color='green' /> {LowTemperaturCelcius}*C</p>
                    <p className="card-text">{humedity}%</p>

                </div>
            </div>
        </>
    )
}

WeatherCardCompo.proptypes = {
    title: PropTypes.string,
    today: PropTypes.number,
    highTemp: PropTypes.number,
    lowTemp: PropTypes.number
}


export default WeatherCardCompo