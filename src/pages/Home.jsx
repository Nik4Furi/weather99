import React, { useState } from 'react'

import { FaSearch } from "react-icons/fa";

//Component Specific Stuff
import WeatherCardCompo from '../components/Home/WeatherCardCompo';
import Loading from '../components/Loading';

import { FaLocationCrosshairs } from "react-icons/fa6";

const Home = () => {
  //Function to fetching the open weather api data
  const url = import.meta.env.VITE_OPEN_WEATHER_API;

  const apiKey = import.meta.env.VITE_API_KEY;

  //State to handle the data of 
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('ajmer');
 
  const [weatherData, setWeatherData] = useState([]);


  const [search, setSearch] = useState('');

  const handleSearch = () => {
    FetchOpenWeather(search);

    setSearch('');
  }

  const FetchOpenWeather = async (city) => {

    setCity(city);

    setLoading(true);

    city = city.toLowerCase();
    let dateBins = {};
    try {
      const res = await fetch(`${url}?q=${city}&appid=${apiKey}`);
      const data = await res.json();

      const today = new Date();
      const day = 60 * 60 * 24 * 1000;


      const nBins = 6; // there can be reports for up to 5 distinct dates

      for (let i = 0; i < nBins; i++) {
        // set up a bin (empty array) for each date
        const date = new Date(today.getTime() + i * day);
        dateBins[date.getDate()] = [];
      }

      const reports = data.list;
      for (const report of reports) {
        const reportDate = new Date(report.dt * 1000).getDate();
        // console.log(report,reportDate);
        dateBins[reportDate].push(report);
      }

      const temp = [];

      for (let val in dateBins)
        temp.push(dateBins[val]);

      setWeatherData(temp);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);

  }

  useState(() => {

    if (city.length > 3)
      FetchOpenWeather(city);
  }, [city])


  return (
    <>
      <section id="Home" className='container mx-auto my-4'>
        {/* Header component to show the name of city, and search bar  */}
        <header className=''>

          <main className='d-flex align-items-center justify-content-around flex-wrap'>

            <div className='mx-2 my-2'>
              {/* <img src="" alt="" id="logo" /> */}

              <h1 className='text-capitalize text-danger'> <FaLocationCrosshairs /> {city}</h1>
              {/* <p className="small">{cordinates.lat} *NS & {cordinates.long} *EW</p> */}
            </div>

            {/* Search component to help us to finding city data  */}
            <div className=''>
              <div className="input-group ">
                <div className="form-outline">
                  <input value={search} type="search" placeholder='search city' onChange={(e) => setSearch(e.target.value)} id="search" className="form-control" autoFocus />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>

          </main>

        </header>

        {/* Section to give info about the platform  */}
        <section id="Info" className='my-4'>
          <h1 className="text-danger">Welcome, in Weather 99</h1>
          <p className="">We are welcoming of you, want to move forward with others in respect of WEATHER, then you are right place. Checkout weather woddy </p>

        </section>

        {/* Here we showing the cards, which are giving the info of the weather  */}
        <section id="cards">
          <div className="row justify-content-center align-items-center">
            {loading && <Loading />}
            {
              weatherData && weatherData?.map((item, i) => (
                // console.log(item[i])
                <WeatherCardCompo key={i} title={item[i]?.weather[0].main} highTemp={item[i]?.main.temp_max} lowTemp={item[i]?.main.temp_min} humedity={item[i]?.main.humidity} today={item[i]?.dt} />
              ))
            }

          </div>
        </section>

      </section>
    </>
  )
}

export default Home
