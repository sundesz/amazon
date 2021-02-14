
import Header from './components/page_elements/Header'
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/pages/Checkout';


function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Switch>

          <Route path="/checkout">
            <Checkout />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;