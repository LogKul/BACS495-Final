import logo from './images/DK_Tri.png';
import './App.css';
//const { ObjectId, ObjectID } = require('mongodb');
import Footer from './Footer.js';
import React from 'react';
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: "Try logging in!",
      api_response: "null",
    };

    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleUNChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePWChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    const config = {
      params: {
        uname: this.state.username,
        password: this.state.password,
      }
    };

    axios.get("http://localhost:3400/users/", config)
      .then((response) => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)

        if (response.data !== null) {
          this.setState({
            login: "Successfully logged in!",
            api_response: JSON.stringify(response),
          });
        }
        else {
          this.setState({
            login: "Try again.",
            api_response: JSON.stringify(response),
          });
        }
      });
  }



  render() {
    return (
      <div>
        <div className='Header'>
          {/*<Header />*/}
          <div>

            <div className="headerContent">
              <div className='flexPropHeader'></div>
              <div className="flexHeader"><h1>[ Header ]</h1></div>
              <div className='flexProfile'>Welcome, new user! <button>Sign in (just for looks)</button>{/*<img src={pfp} className='pfp' alt='pfp'></img>*/}</div>
            </div>

            <div className="nav_container">
              <div className="flex_content">Option 1</div>
              <div className="flex_content">Option 2</div>
              <div className="flex_content">Option 3</div>
              <div className="flex_content">Option 4</div>
              <div className="flex_content">Option 5</div>
              <div className="flex_content">Option 6</div>
            </div>

          </div>
        </div>
        <div className="App-container">
          <div className='App-child-classnav App-child'>
            This is where class navigation would be
          </div>
          <div className='App-child-maincontent App-child'>
            This is where the posts would be
            <br></br>
            <br></br>
            <form onSubmit={this.handleLoginSubmit} className='Loginform'>
              <label>
                Username:
                <input type="text" value={this.state.username} onChange={this.handleUNChange} />
              </label>
              <br></br>
              <label>
                Password:
                <input type="text" value={this.state.password} onChange={this.handlePWChange} />
              </label>
              <br></br>
              <input type="submit" value="Sign In" />
            </form>
            <br></br>
            <br></br>
            <div className="Testbox">
              <p>Login State: {this.state.login}</p>
              <p>Info from API: {this.state.api_response}</p>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              DK Spin as Placeholder
            </p>
          </div>
          <div className='App-child-somethingelse App-child'>
            Maybe some options/settings/actions over here? Or it could be a news section.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
