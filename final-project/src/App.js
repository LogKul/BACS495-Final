import logo from './images/DK_Tri.png';
import './App.css';
//const { ObjectId, ObjectID } = require('mongodb');deploy
import Footer from './Footer.js';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: "Try logging in!",
      api_response: "null",
      signup_username: "",
      signup_password: "",
      signup_password2: "",
      signup_fname: "",
      signup_lname: "",
      signup_result: "",
      question_input: "",
      question_result: "",
      questions: [],
    };

    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSUUNChange = this.handleSUUNChange.bind(this);
    this.handleSUPW1Change = this.handleSUPW1Change.bind(this);
    this.handleSUPW2Change = this.handleSUPW2Change.bind(this);
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleQuestionRefresh = this.handleQuestionRefresh.bind(this);

    fetch(process.env.REACT_APP_API_URL + "/questions/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          questions: data,
        });
      });
  }

  handleUNChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePWChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSUUNChange(event) {
    this.setState({ signup_username: event.target.value });
  }

  handleSUPW1Change(event) {
    this.setState({ signup_password: event.target.value });
  }

  handleSUPW2Change(event) {
    this.setState({ signup_password2: event.target.value });
  }

  handleFNameChange(event) {
    this.setState({ signup_fname: event.target.value });
  }

  handleLNameChange(event) {
    this.setState({ signup_lname: event.target.value });
  }

  handleQuestionChange(event) {
    this.setState({ question_input: event.target.value });
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    var config = {
      'uname': this.state.username,
      'password': this.state.password,
    };

    fetch(process.env.REACT_APP_API_URL + "/users/" + this.state.username + "/" + this.state.password)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data !== null) {
          this.setState({
            login: "Successfully logged in!",
            api_response: JSON.stringify(data),
          });
        }
        else {
          this.setState({
            login: "Try again.",
            api_response: JSON.stringify(data),
          });
        }
      });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();

    var config = {
      'uname': this.state.signup_username,
      'password': this.state.signup_password,
      'fname': this.state.signup_fname,
      'lname': this.state.signup_lname,
    };

    fetch(process.env.REACT_APP_API_URL + "/users",
      {
        method: 'POST',
        body: JSON.stringify(config),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          signup_result: data.msg,
        });
      });
  }

  handleQuestionSubmit(event) {
    event.preventDefault();

    var config = {
      'uname': this.state.username,
      'question_text': this.state.question_input,
      'upvotes': 0,
      'downvotes': 0,
    };

    if (this.state.username !== "") {
      fetch(process.env.REACT_APP_API_URL + "/questions",
        {
          method: 'POST',
          body: JSON.stringify(config),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            question_result: data.msg,
          });
        });

      fetch(process.env.REACT_APP_API_URL + "/questions/all")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            questions: data,
          });
        });
    }
    else {
      this.setState({
        question_result: 'Must be logged in.',
      });
    }
  }

  handleQuestionRefresh(event) {
    event.preventDefault();

    fetch(process.env.REACT_APP_API_URL + "/questions/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          questions: data,
        });
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

            <form onSubmit={this.handleQuestionSubmit} className='question_input'>
              <p>Submit a Question:</p>
              <label>
                <input type="textarea" placeholder='Type question here!' value={this.state.question_input} onChange={this.handleQuestionChange} className='question_input_area' />
              </label>
              <br></br>
              <input type="submit" value="Submit" />
            </form>
            <p>{this.state.question_result}</p>
            <hr></hr>

            <br></br>

            {this.state.questions.map(q =>
              <div key={q._id} className='question'>
                <p className='question_author'>Posted by {q.uname}</p>
                <p className='question_text'>{q.question} {q.text}</p>
                <p className='question_votes'>Upvotes: {q.upvotes}</p>
                <button>Upvote</button>
              </div>)
            }

          </div>
          <div className='App-child-somethingelse App-child'>
            Maybe some options/settings/actions over here? Or it could be a news section.

            <br></br>
            <br></br>

            <form onSubmit={this.handleLoginSubmit} className='Loginform'>
              Login
              <br></br>
              <br></br>
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

            <div className="Infotestbox">
              <p>Here are 2 accounts to test with:</p>
              <br></br>
              <p>Username: larryspringus123</p>
              <p>Password: password1</p>
              <br></br>
              <p>Username: jimbocrusher</p>
              <p>Password: creg4lyfe</p>
            </div>

            <br></br>
            <br></br>

            <form onSubmit={this.handleSignUpSubmit} className='Loginform'>
              Sign Up
              <br></br>
              <br></br>
              <label>
                Username:
                <input type="text" value={this.state.signup_username} onChange={this.handleSUUNChange} />
              </label>
              <br></br>
              <label>
                Password:
                <input type="text" value={this.state.signup_password} onChange={this.handleSUPW1Change} />
              </label>
              <br></br>
              <label>
                Re-Enter Password:
                <input type="text" value={this.state.signup_password2} onChange={this.handleSUPW2Change} />
              </label>
              <br></br>
              <label>
                First Name:
                <input type="text" value={this.state.signup_fname} onChange={this.handleFNameChange} />
              </label>
              <br></br>
              <label>
                Last Name:
                <input type="text" value={this.state.signup_lname} onChange={this.handleLNameChange} />
              </label>
              <br></br>
              <p>
                Sign Up Result: {this.state.signup_result}
              </p>
              <input type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
