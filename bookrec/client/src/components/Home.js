 import React, { Component } from 'react';
 import { Redirect } from 'react-router-dom'
 
class Home extends Component {
    constructor () {
        super()
        this.state = {
          user: {
            userName: '',
            password: ''
          },
          redirect: false
        }
      }
      handleChange = (e) => {
        const updatedUser = {...this.state.user}
        const inputField = e.target.name
        const inputValue = e.target.value
        updatedUser[inputField] = inputValue
    
        this.setState({user: updatedUser})
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
        this.props.mockLogIn(this.state.user)
        this.setState({redirect: true})
      }
      render() {
        if (this.state.redirect) {
            return (<Redirect to="/History"/>)
          }
      
        return (
          
           
            <div>
                <img id = "homeImage" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTipU0XE-NAKqzftt1TA21JdehDYkUUMJtw1A&usqp=CAU" alt = "library2"/>
             <p id = "homeP">
             Our library book recommendation system will help solve the issue of what book to read next by providing library users a list of recommended books. </p>

            <form onSubmit={this.handleSubmit}>
              <div id = "username">
                <label htmlFor="userName">User Name</label>
                <input 
                type="text" 
                name="userName" 
                onChange={this.handleChange} 
                value={this.state.user.userName} 
                />
              </div>
    
              <div id = "password">
                <label htmlFor="password">Password</label>
                <input 
                type="password" name="password" />
    
              </div>
              <button id= "login">Log In</button>
               
            </form>
          </div>
        );
      }
    }
    
 export default Home;