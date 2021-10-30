// import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Switch>
      <Route path="/detail/:id">
        <Detail />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/watchlists">
        <Watchlist />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
