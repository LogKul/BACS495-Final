import React from 'react';
import pfp from './images/pfp.jpg'
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
    render() {
        return (
            <div>

                <div className="headerContent">
                    <div className='flexPropHeader'></div>
                    <div className="flexHeader"><h1>[ Header ]</h1></div>
                    <div className='flexProfile'>Welcome, new user! <button>Sign in</button>{/*<img src={pfp} className='pfp' alt='pfp'></img>*/}</div>
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
        );
    }
}

export default Header