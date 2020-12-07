import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Reseaux } from './Reseaux';
import { Recettes } from './Recettes';
import { Voyages } from './Voyages';
import { Chefs } from './Chefs';
import { Modal } from './Modal';
import { Admin } from './Admin';




function App() {
  return (
    <div className="App">

      <Router>

        <Header />
        <Reseaux />
        <Modal />

        <div className="container"> 
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/recettes' component={Recettes} />
            <Route path='/voyages' component={Voyages} />
            <Route path='/chefs' component={Chefs} />
            <Route path='/backend' component={Admin} />

          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
