import React from 'react';
const Section5 = () => {
    const handleClick = (text) => {
      console.log(`${text} clicked`);
      // Perform any action when a text is clicked
    };
  
    return (
      <div className="fifth-section">
        <div className="clickable-text" onClick={() => handleClick("Text 1")}>
          TaskManager
        </div>
        <div className="clickable-text" onClick={() => handleClick("Text 2")}>
          Contact the developer!
        </div>
      </div>
    );
  };
  export default Section5;