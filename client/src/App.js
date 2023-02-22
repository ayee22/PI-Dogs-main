import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import landingPage from './pages/landingPage/landingPage';
import HomePage from './pages/homePage/homePage';
import createPage from './pages/createPage/createPage';
import CardsDetail from './components/cardsDetail/cardsDetail';
 

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={landingPage} />
          <Route exact path={'/home'} component={HomePage} />
          <Route exact path={'/detail/:id'} component={CardsDetail} />
        <Route exact path={'/create'} component={createPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
