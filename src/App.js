import React from 'react';
import './App.css';
import MainGrid from './components/MainGrid';
import CountrySelect from './components/CountrySelect';
import { fetchGlobalData } from './api/IndexApi';


class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchGlobalData();
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchGlobalData(country)
    this.setState({ data: fetchedData, country: country })
  }
  render() {
    return (
      <div>

        <div className="header">
          <img className="headimg" src="../images/covid2.png" alt="Covid-19"></img>
          {/* <h2 className="mainHeading">TRACKER APP</h2> */}
          <CountrySelect handleCountryChange={this.handleCountryChange} />
        </div>
        <MainGrid data={this.state.data} country={this.state.country}/>

      </div>
    );
  }
}

export default App;
