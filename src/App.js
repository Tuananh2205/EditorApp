import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import UploadFile from './components/UploadFille';
import './container/Editor'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UploadFile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
