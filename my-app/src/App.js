import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      currentCity: "None",
      currentUnit: "None"
    }
    this.onUnitSelect = this.onUnitSelect.bind(this);
    this.onCitySelect = this.onCitySelect.bind(this);
  }
  onUnitSelect(unit)
  {
    this.setState((prevState, props) => ({
      currentUnit: unit 
    }));
  }
  onCitySelect(city)
  {
    this.setState((prevState, props) => ({
      currentCity: city
    }));
  }
  render() {
    console.log(this.state);
    const currentCity = this.state.currentCity;
    const currentUnit = this.state.currentUnit;
    return (
      <div>
        <CitySelector city={currentCity} onSelect = {this.onCitySelect} />        
        <UnitSelector unit={currentUnit} onSelect = {this.onUnitSelect} />
        <TemperatureIndicator city={currentCity} unit={currentUnit}/>
      </div>
    );
  }
}
class TemperatureIndicator extends Component
{
  constructor(props)
  {
    super(props)
    this.statusConstants = ["Entre city name"]
    this.state = {
      currentStatus: "",
      fetchedTemprature: ""
    }

  }
  componentWillReceiveProps()
  {

  }
  componentShouldUpdate()
  {

  }
  render()
  {
    return;
  }
}

class UnitSelector extends Component
{
  constructor(props)
  {
    super(props);
    this.units = [{id: 0, name: "None"}, {id: 1, name: "celcius"}, {id: 2, name: "Fahrenheit"}]
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e)
  {
    this.props.onSelect(e.target.value);
  }
  render()
  {
    return (
      <select value={this.props.unit} onChange={this.handleChange}>
              {this.units.map((unit) => {    
                return <option key={unit.id} value={unit.name}>{unit.name}</option>;
              })}
      </select>
    );
  }
}

class CitySelector extends Component
{
  constructor(props)
  {
    super(props);
    this.cities = [{id: 0, name: "None"}, {id: 1, name: "Ahmedabad"}, {id: 2, name: "Delhi"}, {id: 3, name: "Bombay"}]
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e)
  {
    this.props.onSelect(e.target.value);
  }
  render()
  {
    return (
      <select value={this.props.city} onChange={this.handleChange}>
              {this.cities.map((city) => {    
                return <option key={city.id} value={city.name}>{city.name}</option>;
              })}
      </select>
    );
  }
}

export default App;
