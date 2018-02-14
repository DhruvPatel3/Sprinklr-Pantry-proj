import React, { Component } from 'react';
import './App.css';
import getCities from './cities';
/*class App extends Component {
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
    this.statusConstants = {
      INIT: "Entre city name",
      LOADING: "Loading",
      FAILED: "Failed",
      SUCCESFULL: "1"
    }
    this.tempConstants = {
      C: "C",
      K: "K",
      F: "F"
    }
    this.state = {
      currentStatus: this.statusConstants.INIT,
      fetchedTemprature: 0
    }
    this.updatedCity = "";
    this.updatedUnit = "";
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.city !== nextProps.city) 
    {
      this.updatedCity = nextProps.city;
      this.updatedUnit = nextProps.unit;
      this.setState({status: this.statusConstants.LOADING});
      this.fetchTemperature(nextProps.city).then(res => this.preProcessing(res, nextProps.city))
      .then((temp)=>{
          let newTemp = temp;
          if(nextProps.unit !== this.tempConstants.C)
          {
            newTemp = this.tempConverter(temp, this.updatedUnit);
          }
          this.setState(
            {
              fetchedTemprature : newTemp,
              currentStatus: this.statusConstants.SUCCESFULL
            }
          )
      }).catch(rej => {
        this.setState({ status: "failed" });
      });
    }
    else if(this.props.unit !== nextProps.unit)
    {
      this.setState((prevState,props) => (
        {
          fetchedTemprature : this.tempConverter(prevState.fetchedTemprature, nextProps.unit),
          currentStatus : this.statusConstants.SUCCESFULL
        }
      ));
    }
  }

  tempConvert(temp, unit) 
  {
      return unit === this.tempConstants.F? 9 / 5 * temp + 32 : temp + 273.15
  }

  preProcessing(res, city) {
    res.json().then( (result) => 
      {
        if (result["error"]) throw "Cannot Find such city!";
        const temp = result["current"]["temp_c"];
        if (!temp) throw "Can't get response"; // if key error!
        Promise.resolve(temp);
      })
      .catch((error) => {
        if (typeof error === "string") this.setState({ currentStatus: this.statusConstants.FAILED });
        else throw "failed";
      });
  }

  fetchTemperature(city) 
  {
    return fetch(`https://api.apixu.com/v1/current.json?key=25bb3610311f486e823225213181002&q=${city}`)
  }

  render()
  {
    return (
      <div>
        {this.state.currentStatus === this.statusConstants.SUCCESFULL
          ? `Current temperature: ${this.state.fetchedTemperature}`
          : this.state.currentStatus}
      </div>
    );
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
      <input type="text" id="city-selector"/>
    );
  }
  componentDidMount()
  {
    const inputElement = document.getElementById("city-selector");
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: ["(cities)"]
    });
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      this.props.onCityChanged(place.name);
    });
  }
}*/
const tempConstants = {
  C: "C",
  K: "K",
  F: "F"
}
const cityInit = "None";
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      currentCity: cityInit,
      currentUnit: tempConstants.C
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
    console.log(city,"App")
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
    this.statusConstants = {
      INIT: "Entre city name",
      LOADING: "Loading",
      FAILED: "Failed",
      SUCCESFULL: "1"
    }
    
    this.state = {
      currentStatus: this.statusConstants.LOADING,
      fetchedTemprature: null
    }
    this.updatedCity = "";
    this.updatedUnit = "";
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.city === cityInit)
    {
      console.log("HERE");
      if(this.state.currentStatus !== this.statusConstants.INIT)
      {
        this.setState({
            currentStatus: this.statusConstants.INIT
        });
      }
    }
    else if (this.props.city !== nextProps.city) 
    {
      this.updatedCity = nextProps.city;
      this.updatedUnit = nextProps.unit;
      this.setState({currentStatus: this.statusConstants.LOADING});
      this.fetchTemperature(nextProps.city).then(res => {
        var x = this.preProcessing(res, nextProps.city);
        console.log(x,"jhgdjh");
        return Promise.resolve(x);
      }).then((temp)=>{
          if(this.updatedCity === nextProps.city)
          {
            this.setState(
              {
                fetchedTemprature : temp,
                currentStatus: this.statusConstants.SUCCESFULL
              }
            )
          }
      }).catch(rej => {
        this.setState({ status: "failed" });
      });
    }
  }

  tempConverter(temp, unit) 
  {
      return unit === tempConstants.F? 9 / 5 * temp + 32 : temp + 273.15
  }

  preProcessing(res, city) {
    console.log(res,city);
    var x = res.json();
    var y = x.then( (result) => 
      {
        if (result["error"]) throw "Cannot Find such city!";
        const temp = result["current"]["temp_c"];
        console.log(temp,"here")
        if (!temp) throw "Can't get response"; // if key error!
        return Promise.resolve(temp);
      })
      console.log(y,"y")
      return y;
  }

  fetchTemperature(city) 
  {
    console.log("hshs",city)
    return fetch(`https://api.apixu.com/v1/current.json?key=25bb3610311f486e823225213181002&q=${city}`)
  }

  render()
  {
    let temp;
    if(this.state.fetchedTemprature)
    {
      temp = this.props.unit === tempConstants.C ? this.state.fetchedTemprature : 
      this.tempConverter(this.state.fetchedTemprature, this.props.unit);
      console.log(this.state.currentStatus,"ekhfckkkkkkkkkk");
    }
    return (
      <div>
        {this.state.currentStatus === this.statusConstants.SUCCESFULL
          ? `Current temperature: ${temp}`
          : this.state.currentStatus}
      </div>
    );
  }
}

class UnitSelector extends Component
{
  constructor(props)
  {
    super(props);
    this.units = [{id: 0, name: "K"},{id: 1, name: "C"}, {id: 2, name: "F"}]
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
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      cityList : [cityInit]
    }
  }
  handleChange(e)
  {
    this.props.onSelect(e.target.value);
  }
  getComponent(cities)
  {
    //console.log(cities);
    return cities.map((city) => {
      return <option value={city}>{city}</option>
    });
  }
  render()
  {
    return (
      <div>
        <select onChange={this.handleChange}>
            {this.getComponent(this.state.cityList)}
        </select>
      </div>
    );
  }
  componentDidMount()
  {
    const x = getCities();
    console.log("ha",x);
    x.then((a) => {this.setState((prevState,props) => {
      a.unshift(prevState.cityList[0]);
      return {
       cityList : a
      }
    })
    this.props.onSelect(cityInit);
  });
    
  }
}
export default App;
