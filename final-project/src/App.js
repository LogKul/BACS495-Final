import logo from './images/DK_Tri.png';
import './App.css';
//const { ObjectId, ObjectID } = require('mongodb'); deploy
import Footer from './Footer.js';
import Header from './Header.js';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: 0,
      signup_username: "",
      signup_password: "",
      signup_password2: "",
      signup_fname: "",
      signup_lname: "",
      signup_result: 0,
      question_input: "",
      question_result: "",
      questions: [],
      replies: [],
      question_upvotes: [],
      reply_upvotes: [],
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
    this.Logout = this.Logout.bind(this);

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

    fetch(process.env.REACT_APP_API_URL + "/questions/quserupvotes/" + this.state.username)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          question_upvotes: data,
        });
      });

    fetch(process.env.REACT_APP_API_URL + "/questions/ruserupvotes/" + this.state.username)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          reply_upvotes: data,
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
            login: 2,
          });

          fetch(process.env.REACT_APP_API_URL + "/questions/quserupvotes/" + this.state.username)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              this.setState({
                question_upvotes: data,
              });
            });

          fetch(process.env.REACT_APP_API_URL + "/questions/ruserupvotes/" + this.state.username)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              this.setState({
                reply_upvotes: data,
              });
            });
        }
        else {
          this.setState({
            login: 1,
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

    if (this.state.signup_password === this.state.signup_password2) {
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
    else {
      this.setState({
        signup_result: 1,
      });
    }

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

  handleQuestionUpvote(event) {
    event.preventDefault();

    var config = {
      'id': event.target.value,
      'uname': this.state.username,
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
        console.log(data.msg);
      });

    setTimeout(function () {
      fetch(process.env.REACT_APP_API_URL + "/questions/all")
        .then(response2 => response2.json())
        .then(data2 => {
          this.setState({
            questions: data2,
          });
          console.log("-Getting questions-");
        });

      fetch(process.env.REACT_APP_API_URL + "/questions/quserupvotes/" + this.state.username)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            question_upvotes: data,
          });
          console.log("-Getting question upvotes-");
        });
    }.bind(this), 120)
  }

  handleReplyUpvote(event) {
    event.preventDefault();

    var config = {
      'id': event.target.value,
      'uname': this.state.username,
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

    setTimeout(function () {
      fetch(process.env.REACT_APP_API_URL + "/questions/replies/all")
        .then(response2 => response2.json())
        .then(data2 => {
          console.log(data2)
          this.setState({
            replies: data2,
          });
          console.log("-Getting Replies-");
        });

      fetch(process.env.REACT_APP_API_URL + "/questions/ruserupvotes/" + this.state.username)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            reply_upvotes: data,
          });
          console.log("-Getting reply upvotes-");
        });
    }.bind(this), 120)
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

      fetch(process.env.REACT_APP_API_URL + "/questions/replies/all")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({
            replies: data,
            reply_input: "",
            reply_click: false,
          });
        });
    }
    else {
      this.setState({
        question_result: 'Must be logged in.',
      });
    }
  }

  Logout() {
    this.setState({
      login: 0,
      username: "",
      password: "",
      reply_click: false,
    })
  }



  render() {
    return (
      <div>
        <Header />
        <div className="App-container">
          <div className='App-child-maincontent App-child'>
            {(this.state.login === 2) &&
              <div>
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
              </div>
            }

            <br></br>

            {this.state.questions.map(q =>
              <div>
                <div key={q._id} className='question'>
                  <p className='question_author'>Posted by {q.uname}</p>
                  <p className='question_text'>{q.question} {q.text}</p>
                  <p className='question_votes'>Upvotes: {q.upvotes}</p>
                  {(!(this.state.question_upvotes.some(e => e._id === q._id)) && this.state.login === 2) &&
                    <button style={{ 'background-color': 'green' }} className='upvote_button' value={q._id} onClick={this.handleQuestionUpvote}>Upvote</button>
                  }
                  {((this.state.question_upvotes.some(e => e._id === q._id)) && this.state.login === 2) &&
                    <button disabled='true' style={{ 'background-color': 'gray' }} className='upvote_button' value={q._id} onClick={this.handleQuestionUpvote}>Upvote</button>
                  }
                  <p></p>
                  <button className='reply_button' onClick={() => this.handleReplyClick(q._id)}>Reply</button>
                </div>
                {(this.state.reply_click === true && this.state.reply_question_id === q._id && this.state.login === 2) &&
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
                    {(!(this.state.reply_upvotes.some(e => e._id === r._id)) && this.state.login === 2) &&
                      <button style={{ 'background-color': 'green' }} className='upvote_button' value={r._id} onClick={this.handleReplyUpvote}>Upvote</button>
                    }
                    {((this.state.reply_upvotes.some(e => e._id === r._id)) && this.state.login === 2) &&
                      <button disabled='true' style={{ 'background-color': 'gray' }} className='upvote_button' value={r._id} onClick={this.handleReplyUpvote}>Upvote</button>
                    }
                  </div>
                )}
              </div>)
            }

            <br></br>
            <br></br>

          </div>
          <div className='App-child-somethingelse App-child'>

            {!(this.state.login === 2)
              ?
              <div>
                <form onSubmit={this.handleLoginSubmit} className='Loginform'>
                  Login
                  <br></br>
                  <br></br>
                  <label>
                    Username:
                    <input className='input_line' type="text" value={this.state.username} onChange={this.handleUNChange} />
                  </label>
                  <br></br>
                  <label>
                    Password:
                    <input className='input_line' type="password" value={this.state.password} onChange={this.handlePWChange} />
                  </label>
                  <br></br>
                  {(this.state.login) === 1 &&
                    <p style={{ color: 'red' }}>Login failed, try again.</p>
                  }
                  <input type="submit" value="Sign In" />
                </form>

                <br></br>
                <br></br>

                <form onSubmit={this.handleSignUpSubmit} className='Loginform'>
                  Sign Up
                  <br></br>
                  <br></br>
                  <label>
                    Username:
                    <input className='input_line' type="text" value={this.state.signup_username} onChange={this.handleSUUNChange} />
                  </label>
                  <br></br>
                  <label>
                    Password:
                    <input className='input_line' type="password" value={this.state.signup_password} onChange={this.handleSUPW1Change} />
                  </label>
                  <br></br>
                  <label>
                    Re-Enter Password:
                    <input className='input_line' type="password" value={this.state.signup_password2} onChange={this.handleSUPW2Change} />
                  </label>
                  <br></br>
                  <label>
                    First Name:
                    <input className='input_line' type="text" value={this.state.signup_fname} onChange={this.handleFNameChange} />
                  </label>
                  <br></br>
                  <label>
                    Last Name:
                    <input className='input_line' type="text" value={this.state.signup_lname} onChange={this.handleLNameChange} />
                  </label>
                  <br></br>
                  {(this.state.signup_result === 1) &&
                    <p style={{ color: 'red' }}>
                      *Signup failed, passwords must match!
                    </p>
                  }
                  {(this.state.signup_result === 2) &&
                    <p style={{ color: 'red' }}>
                      *Username already taken!
                    </p>
                  }
                  {(this.state.signup_result === 3) &&
                    <p style={{ color: 'green' }}>
                      Signup successful!
                    </p>
                  }
                  <input type="submit" value="Sign Up" />
                </form>

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


              </div>
              :
              <div className='Testbox'>
                Logged in as {this.state.username}.
                <br></br>
                <br></br>
                <button onClick={() => this.Logout()}>Logout</button>
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }

}

export default App;
