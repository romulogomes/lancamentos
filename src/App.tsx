import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import ListLancamentos from './components/lancamentos/List';
import FormLancamentos from './components/lancamentos/Form';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          
          <Route path="/lancamentos"            exact={true} component={ListLancamentos} />
          <Route path="/lancamentos/edit/"                component={FormLancamentos} />
        </div>
      </Router>
    );
  }
}

export default App;
