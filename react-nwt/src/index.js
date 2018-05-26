import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

// Main css
import './index.css';

// Components & Containers
import Menu from './components/common/Menu'
import Footer from './components/common/Footer'

import Landing from './containers/Landing'
import Location from './components/Location'
import Review from './components/Review'
import ShowReview from './components/review/Show'
import CreateReview from './components/review/Create'
import EditReview from './components/review/Edit'
import ShowCountry from './components/country/Show'
import CreateCountry from './components/country/Create'
import EditCountry from './components/country/Edit'
// Service worker
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter>
    <div>
        <Menu />
        <Route exact path="/" component={Landing} /> 
        <Route exact path="/location/:id" component={Location} />
        <Route exact path="/country/create" component={CreateCountry} />
        <Route exact path="/country/show/:id" component={ShowCountry} />
        <Route path='/country/edit/:id' component={EditCountry} />
        <Route exact path="/review/create" component={CreateReview} />
        <Route exact path="/review/show/:id" component={ShowReview} />
        <Route path='/review/edit/:id' component={EditReview} />
        <Footer />
    </div>
  </BrowserRouter>, 
	document.getElementById('root')
);

registerServiceWorker()