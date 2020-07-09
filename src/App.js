import React from 'react';
import './App.css';
import AirmenList from './AirmenList';
import PIFList from './PIFList';
import WAPSList from './WAPSList';
import AllAirmanDataList from './AllAirmanDataList';
import NewAirman from './NewAirman';
import ReactTable from "react-table";
import "react-table"
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'


const axios = require('axios').default
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'


class App extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {
      airmen: [],
      pif_data: [],
      WAPS: [],
      airmandata: []
    }
  }
  async componentDidMount() 
  {
    var response = await axios.get("http://localhost:3000/airman")
    console.log(response.data)
    this.setState ({
      
      airmen: response.data,
    })
    response = await axios.get("http://localhost:3000/pif")
    console.log(response.data)
    this.setState({
      pif_data: response.data,
    })
    response = await axios.get("http://localhost:3000/waps")
    this.setState({
      WAPS: response.data,
    })
    response = await axios.get("http://localhost:3000/allairmandata")
    console.log(response.data)
    this.setState({
      airmandata: response.data,
    })

    
  }
  render()
{
  return(
    <Router><div className = "App">
      <div className="">
    <br /><Link to = "/airmen">Airman</Link>
    <br /><Link to = "/waps">WAPS Data</Link>
      </div>
      <Switch>
        <Route path = "/airmen"> 
            <AirmenList airmen = {this.state.airmen} parent={this}/>
          </Route>
          <Route path = "/waps">
          <WAPSList waps = {this.state.WAPS} parent={this}/>
          </Route>
          <Route path = "/">
          <AllAirmanDataList airmandata = {this.state.airmandata} parent={this}/>
          </Route>
      </Switch>
    </div> </Router>
  )
};
}


export default App;
