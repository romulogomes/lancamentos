import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import ListLancamentos from './components/lancamentos/List';
import FormLancamentos from './components/lancamentos/Form';
import ListContas from './components/contas/List';
import FormContas from './components/contas/Form';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          
          <Route path="/contas"                 exact={true} component={ListContas} />
          <Route path="/contas/novo"                         component={FormContas} />
          <Route path="/contas/edit/:id"                     component={FormContas} />

          <Route path="/lancamentos"            exact={true} component={ListLancamentos} />
          <Route path="/lancamentos/novo/"                   component={FormLancamentos} />
          <Route path="/lancamentos/edit/:id"                component={FormLancamentos} />
        </div>
      </Router>
    );
  }
}

export default App;
