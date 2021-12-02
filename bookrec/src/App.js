import './App.css';
import NavBar from './components/NavBar';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Book from './components/Book'
import BookHistory from './components/BookHistory'


class App extends Component {
  constructor() {
    super();

    this.state = {

      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      }
    }
    
  }


  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }




  render() {
    const HomeComponent = () => (
      <Home
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
      />
    );

    const BookComponent = () => (
      <Book
        
      />
    );

    const BookHistoryComponent = () => (
      <BookHistory
        
      />
    );



 
    return (
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/Book" render={BookComponent}/>
            <Route exact path="/History" render={BookHistoryComponent}/>
          </Switch>
          
        </Router>
    );
  }
}

export default App;