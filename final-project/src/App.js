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
      login: false,
      signup_username: "",
      signup_password: "",
      signup_password2: "",
      signup_fname: "",
      signup_lname: "",
      signup_result: "",
      question_input: "",
      question_result: "",
      questions: [],
      replies: [],
      reply_click: false,
      reply_input: "",
      reply_question_id: "",
    };

    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSUUNChange = this.handleSUUNChange.bind(this);
    this.handleSUPW1Change = this.handleSUPW1Change.bind(this);
    this.handleSUPW2Change = this.handleSUPW2Change.bind(this);
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleReplyClick = this.handleReplyClick.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleQuestionRefresh = this.handleQuestionRefresh.bind(this);
    this.handleQuestionUpvote = this.handleQuestionUpvote.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleReplyUpvote = this.handleReplyUpvote.bind(this);

    fetch(process.env.REACT_APP_API_URL + "/questions/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          questions: data,
        });
      });

    fetch(process.env.REACT_APP_API_URL + "/questions/replies/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          replies: data,
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

  handleReplyClick(qid) {
    var val = "";
    var polar = true;
    if (this.state.reply_click === false) {
      polar = true;
      val = qid;
    }
    else if (this.state.reply_click === true && this.state.reply_question_id === qid) {
      polar = false;
      val = "";
    }
    else {
      polar = true;
      val = qid;
    }
    this.setState({
      reply_click: polar,
      reply_question_id: val,
    });
  }

  handleReplyChange(event) {
    this.setState({ reply_input: event.target.value });
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
            login: true,
          });
        }
        else {
          this.setState({
            login: false,
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
    };

    if (this.state.login === true) {
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

    fetch(process.env.REACT_APP_API_URL + "/questions/replies/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          replies: data,
        });
      });
  }

  handleQuestionUpvote(id, upvotes) {
    var config = {
      'id': id,
      'upvotes': upvotes + 1,
    }
    fetch(process.env.REACT_APP_API_URL + "/questions/upvote",
      {
        method: 'PATCH',
        body: JSON.stringify(config),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.msg)
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

  handleReplyUpvote(id, upvotes) {
    var config = {
      'id': id,
      'upvotes': upvotes + 1,
    }
    fetch(process.env.REACT_APP_API_URL + "/questions/reply/upvote",
      {
        method: 'PATCH',
        body: JSON.stringify(config),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.msg)
      });

    fetch(process.env.REACT_APP_API_URL + "/questions/replies/all")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          replies: data,
        });
      });
  }

  handleReplySubmit(event) {
    event.preventDefault();

    var config = {
      'uname': this.state.username,
      'reply_text': this.state.reply_input,
      'upvotes': 0,
      'qid': this.state.reply_question_id,
    };

    if (this.state.login === true) {
      fetch(process.env.REACT_APP_API_URL + "/questions/reply",
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

      this.handleQuestionRefresh();
    }
    else {
      this.setState({
        question_result: 'Must be logged in.',
      });
    }
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
            {this.state.replies.map(r =>
              <div className='question'>
                <p className='question_author'>Posted by {r.uname}</p>
                <p className='question_author'>QID: {r.qid}</p>
                <p className='question_text'>{r.text}</p>
                <p className='question_votes'>Upvotes: {r.upvotes}</p>
              </div>
            )}
          </div>
          <div className='App-child-maincontent App-child'>

            <form onSubmit={this.handleQuestionSubmit} className='question_input'>
              <p>Submit a Question:</p>
              <label>
                <textarea placeholder='Enter a question here!' value={this.state.question_input} onChange={this.handleQuestionChange} className='question_input_area'></textarea>
              </label>
              <br></br>
              <input type="submit" value="Submit" />
            </form>
            <p>{this.state.question_result}</p>
            <hr></hr>

            <br></br>

            {this.state.questions.map(q =>
              <div>
                <div key={q._id} className='question'>
                  <p className='question_author'>Posted by {q.uname}</p>
                  <p className='question_author'>QID: {q._id}</p>
                  <p className='question_text'>{q.question} {q.text}</p>
                  <p className='question_votes'>Upvotes: {q.upvotes}</p>
                  <button className='upvote_button' value={q.upvotes} onClick={() => this.handleQuestionUpvote(q._id, q.upvotes)}>Upvote</button>
                  <p></p>
                  <button className='reply_button' onClick={() => this.handleReplyClick(q._id)}>Reply</button>
                </div>
                {(this.state.reply_click === true && this.state.reply_question_id === q._id && this.state.login === true) &&
                  <div>
                    <form onSubmit={this.handleReplySubmit} className='reply_input'>
                      <label>
                        <textarea placeholder='Enter a reply here!' value={this.state.reply_input} onChange={this.handleReplyChange} className='reply_input_area'></textarea>
                      </label>
                      <br></br>
                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                }
                {this.state.replies.map(r =>
                  (r.qid === q._id) &&
                  <div className='reply'>
                    <p className='reply_author'>Reply from {r.uname}</p>
                    <p className='reply_text'>{r.text}</p>
                    <p className='reply_votes'>Upvotes: {r.upvotes}</p>
                    <button className='upvote_button' value={r.upvotes} onClick={() => this.handleReplyUpvote(r._id, r.upvotes)}>Upvote</button>
                  </div>
                )}
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
              <p>Login State: {this.state.login ? "Successfully logged in!" : "Not logged in."}</p>
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
