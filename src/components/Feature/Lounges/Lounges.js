import React, { Component } from 'react';
import './Lounges.css';
import ImageCarousel from './ImageCarousel/ImageCarousel';

export default class Lounges extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      active: 'lounge',
      lounges: null,
      refine: null,
      activeIndex: 0,
      firstLoad: true
    }
  }

  componentDidMount() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    fetch(corsProxy + `https://apis.discover.com/dci-lounges/v2/lounges?radius=20&city=${this.state.city}&lang=en-us&sortdir=asc `, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + this.props.code,
        'x-dfs-api-plan': 'DCILOUNGES_SANDBOX',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ lounges: [data.result] }))
  }

  getLounges() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    fetch(corsProxy + `https://apis.discover.com/dci-lounges/v2/lounges?radius=20&city=${this.state.city}&lang=en-us&sortdir=asc `, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + this.props.code,
        'x-dfs-api-plan': 'DCILOUNGES_SANDBOX',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => this.setState({ loungeInfo: data.result }))
  }

  handleCityInput(e) {
    this.setState({
      city: e.target.value
    })
  }

  showList(){
    console.log(this.state.loungeInfo);
    let refinedLounges = this.state.loungeInfo;

    if (refinedLounges && refinedLounges !== null && refinedLounges !== undefined) {
      console.log(refinedLounges);
    let loungeInfo = [];
    refinedLounges.map(lounge => {
     return loungeInfo.push(lounge)
    })

    console.log(loungeInfo);

    return loungeInfo.map((lounge, index) => (
      //<div>{lounge.lounge_name}</div>
      <button id={index} onClick={()=>this.saveIndex(index)}>{lounge.lounge_name}</button>
    ))
    }
  }

  saveIndex(index){
    this.setState({ activeIndex: index })
  }

  showLoungeDetails(index){
    console.log(this.state.loungeInfo);
    let refinedLounges = this.state.loungeInfo;

    if (refinedLounges && refinedLounges !== null && refinedLounges !== undefined) {
      console.log(refinedLounges);
      let loungeInfo = [];
      refinedLounges.map(lounge => {
       return loungeInfo.push(lounge)
      })
      console.log(loungeInfo);
      let index = this.state.activeIndex
      console.log(index);
      console.log(loungeInfo[index].lounge_name);
      console.log(loungeInfo[index].facilities);
      return (
        <div className="lounge-details">
          <h3>{loungeInfo[index].lounge_name}</h3>
          <p>{loungeInfo[index].airport_name}, {loungeInfo[index].city}, {loungeInfo[index].country}</p>
          <ImageCarousel image={loungeInfo[index].media}/>
          <p>Phone: {loungeInfo[index].telephone}</p>
          <p>Lounge Status: {loungeInfo[index].airport_status}</p>
          <p>Opening Hours: {loungeInfo[index].opening_hours}</p>
          <p>Amenities: {loungeInfo[index].facilities}</p>
          <p>Located At: {loungeInfo[index].location}, {loungeInfo[index].terminal}</p>
          <p>Conditions: {loungeInfo[index].conditions}</p>
          <p>Additional Details: {loungeInfo[index].additional ? loungeInfo[index].additional : 'None'}</p>
          <p>Guest Fees: {loungeInfo[index].guest_currency} {loungeInfo[index].guest_fee_rate}, {loungeInfo[index].fee_notes}</p>
          <p>Rating Count: {loungeInfo[index].rating_count}, Rating Average: {loungeInfo[index].rating_average}</p>
        </div>
    )
  }
  }

  render() {

    return (
      <div id="lounges">
        {this.state.loungeName}
        <div className="cityChoose">
          Find Lounges:
          <input onChange={(e) => this.handleCityInput(e)} placeholder={"Enter a city..."}></input>
          <button onClick={()=>this.getLounges()}>Refine</button>
        </div>
        <div className="window">
          <div className="lounge-list">
            { this.state.loungeInfo && this.showList() }
          </div>
          <div className="details">
            { this.state.loungeInfo ? this.showLoungeDetails(this.state.activeIndex) : <div>Pick a city!</div> }
          </div>
          <Feed></Feed>
          </div>
      </div>
    )
        //return lounge.city.toLowerCase === this.state.city.toLowerCase
      }
    //  console.log(lounges)

  }
