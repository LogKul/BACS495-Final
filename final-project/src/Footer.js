import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Footer extends React.Component {
    render() {
        return (
            <div className='Footer-container'>
                <div className='Footer-child'>
                    <ul>
                        <li>Footer Stuff</li>
                        <li>Footer LLC</li>
                        <li>2022-2022</li>
                    </ul>
                </div>
                <div className='Footer-child'>
                    <ul>
                        <li>More Footer Stuff</li>
                        <li>Publiched by Footers</li>
                        <li>Footer.com</li>
                    </ul>
                </div>
                <div className='Footer-child'>
                    <ul>
                        <li>Conditions of Use</li>
                        <li>Privacy Notice</li>
                        <li>Etc</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer