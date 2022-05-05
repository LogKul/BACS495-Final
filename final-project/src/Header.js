import React from 'react';
import pfp from './images/pfp.jpg'
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
    render() {
        return (
            <div className='Header'>
                <div className="headerTitle"><h1>University of Northern Rolocado Q/A Website</h1></div>
                <div className="nav_container">
                    <div className="flex_content">These</div>
                    <div className="flex_content">Buttons</div>
                    <div className="flex_content">Don't</div>
                    <div className="flex_content">Work</div>
                    <div className="flex_content">But Look</div>
                    <div className="flex_content">Nice</div>
                </div>
            </div>
        );
    }
}

export default Header