import React, { Component } from 'react';
import ProductsList from './components/ProductsList';
import ProductInfo from './components/ProductInfo';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PostNewAd from './components/PostNewAd';
// import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Ducky Bay</h1>
          </header>
        
          <div className="content">
            <Route exact path="/home" component={ProductsList} />
            <Route exact path="/products/:id" component={ProductInfo} />
            <Route exact path="/upload" component={PostNewAd} />
            <Route exact path="/" render={ () => <Redirect to="/products" /> } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
