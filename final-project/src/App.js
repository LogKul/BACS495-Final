import logo from './images/DK_Tri.png';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';

function App() {
  return (
    <div>
      <div className='Header'>
        <Header />
      </div>
      <div className="App-container">
        <div className='App-child-classnav App-child'>
          This is where class navigation would be
        </div>
        <div className='App-child-maincontent App-child'>
          This is where the posts would be
          <br></br>
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

export default App;
