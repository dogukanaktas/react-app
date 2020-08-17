import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import LineChart from './LineChart';
import BarChart from './BarChart';
import "./index.css";
import "./App.css";

const App = () => {
  const [countries, SetCountries] = useState([]);
  const [cases, SetCases] = useState();
  const [global, SetGlobal] = useState();
  const [countryName, SetCountryName] = useState();
 
  const urlGlobal = "https://covid19.mathdro.id/api/";
  const urlCountries = "https://covid19.mathdro.id/api/countries/";

  useEffect(() => {
    axios.get(urlGlobal).then((res) => SetGlobal(res.data));
    axios.get(urlCountries).then((res) => SetCountries(res.data.countries));
  }, []);

  const showCases = (e) => {
    const urlCases = `https://covid19.mathdro.id/api/countries/${e.target.value}`;
    axios.get(urlCases).then((res) => SetCases(res.data));
    SetCountryName(e.target.value);
  };


  return (
    <div>
      {/* {console.log("cases", cases)}
      {console.log("global", global)} */}

      <div className="caseContainer">
        <div className="card">
          <p>Infected</p>
          <p>
            {cases ? cases.confirmed.value : global && global.confirmed.value}
          </p>
          <p>{global && global.lastUpdate}</p>
          <p>Number of active cases of COVID-19</p>
        </div>

        <div className="card">
          <p>Recovered</p>
          <p>
            {cases ? cases.recovered.value : global && global.recovered.value}
          </p>
          <p>{global && global.lastUpdate}</p>
          <p>Number of recoveries from COVID-19</p>
        </div>

        <div className="card">
          <p>Deaths</p>
          <p>{cases ? cases.deaths.value : global && global.deaths.value}</p>
          <p>{global && global.lastUpdate}</p>
          <p>Number of deaths caused by COVID-19</p>
        </div>
      </div>

      <div className="selectContainer">
        <select
          className="dropdown"
          name="countries"
          onChange={(e) => showCases(e)}
        >
          {countries.map((val, i) => (
            <option key={i} value={val.name}>
              {val.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <LineChart />
      </div>
      <div>
      <BarChart countryName={countryName} cases={cases} />
      </div>
    </div>
  );
};

export default App;
