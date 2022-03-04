import logo from './images/DK_Tri.png';
import './App.css';
//const { ObjectId, ObjectID } = require('mongodb');
import Footer from './Footer.js';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: "NOT CLICKED",
      dbdata: "Null"
    };
  }

  handleClick() {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": "62115b7b27b423cd7b94bd80" })
    };

    fetch("http://localhost:3400/users/", options)
      .then(response => response.json())
      .then(data => this.setState({ clicked: "CLICKED", dbdata: "some" }))
      .catch((error) => {
        console.error(error);
      });

    //this.setState({
    //  clicked: "CLICKED",
    //  dbdata: data.name
    //});
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
              <div className='flexProfile'>Welcome, new user! <button onClick={() => this.handleClick()}>Sign in</button>{/*<img src={pfp} className='pfp' alt='pfp'></img>*/}</div>
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
            <p>Status is: {this.state.clicked}</p>
            <p>Info from DB connection: {this.state.dbdata}</p>
            <br></br>
            <br></br>
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
