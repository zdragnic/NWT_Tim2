import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import * as api from '../../api'
import * as auth from '../../auth'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      photoUrl : '',
      longitude: '',
      latitude: '',
      country: '' ,
      selectedOption: '',
      countries: []     
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  componentWillMount() {
    auth.redirectIfNotAuthenticated()
    this.initilize()
  }

    initilize = async () => {
        try {
            let endpoint = "nwt2_ms_location-service-client/countries/all";
            let countries = await api.send(endpoint)

            let endpointSingle = "nwt2_ms_location-service-client/locations/" + this.props.match.params.id
            let location = await api.send(endpointSingle)

            this.setState({
                countries : countries.data,
            })

            this.setState({
                name : location.data.name,
                description : location.data.description,
                photoUrl : location.data.photoUrl,
                longitude : location.data.longitude,
                latitude : location.data.latitude,
                country : location.data.country
            })

            console.log(this.state.countries)
        } catch (err) {
            console.log(err)
        }
    } 

    onSubmit = async (e) => {
        e.preventDefault();
    
        const { name, description, photoUrl, longitude, latitude, country} = this.state;

        let endpoint = "nwt2_ms_location-service-client/locations/" + this.props.match.params.id;
        let response = await api.send(endpoint, 
                        {   
                            name: this.state.name, 
                            description: this.state.description, 
                            photoUrl: this.state.photoUrl, 
                            longitude: this.state.longitude, 
                            latitude: this.state.latitude, 
                            country: {
                                id: this.state.country.id
                            } 
                        }, 
                        "PUT")
        
        if(response.status == "200" ||response.status == "201"){
            alert('Successfully edited this location!')
        }
    }

  render() {
    var options = this.state.countries;
    //var Answer = countries => 
    //<select>{this.state.countries.map(x => <option key={x.id} value={x.name}>{x.name}</option>)}</select>;
    const {name, description, photoUrl, longitude, latitude, country } = this.state;
    return (
      <div className="container">      
            <div className="row">
              <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12">
              <h3 className="panel-title">
              EDIT LOCATION
            </h3>
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Home</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="isbn">Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="isbn">Description:</label>
                <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label htmlFor="isbn">Photo URL:</label>
                <input type="text" className="form-control" name="photoUrl" value={photoUrl} onChange={this.onChange} placeholder="Name" />
              </div>

               <div className="form-group">
                <label htmlFor="isbn">Longitude:</label>
                <input type="text" className="form-control" name="longitude" value={longitude} onChange={this.onChange} placeholder="Name" />
              </div>

               <div className="form-group">
                <label htmlFor="isbn">Latitude:</label>
                <input type="text" className="form-control" name="latitude" value={latitude} onChange={this.onChange} placeholder="Name" />
              </div>
                <br></br>
                 <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Edit;