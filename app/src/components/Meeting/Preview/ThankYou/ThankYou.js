import React from 'react';
import './ThankYou.css';

const ThankYou = () => {
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0, 
                width: '100%', 
                height: '100%', 
                paddingLeft: '50%', 
                paddingTop: '50%'}}>
            <h1 className="primary-color">Thank You</h1>
        </div>
    )
}
export default ThankYou;