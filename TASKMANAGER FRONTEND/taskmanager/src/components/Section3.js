import React, { useState} from 'react';
const Section3 = ({onFilterChange}) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category);
    onFilterChange(category, selectedStatus, selectedPriority);
  };
  const handleStatusButtonClick = (status) => {
    setSelectedStatus(status)
    onFilterChange(selectedCategory, status, selectedPriority);
  };
  const handlePriorityselection = (priority) => {
    setSelectedPriority(priority);
    onFilterChange(selectedCategory, selectedStatus, priority);
  };
    return (
      <div className="button-section">
        <div className="left-buttons">
          <button className="button" onClick={() => handleCategoryButtonClick('ALL')}>ALL</button>
          <button className="button" onClick={() => handleStatusButtonClick('PENDING')}>Pending</button>
          <button className="button" onClick={() => handleStatusButtonClick('In_PROGRESS')}>In_Progress</button>
          <button className="button" onClick={() => handleStatusButtonClick('COMPLETED')}>Completed</button>
          <select className="dropdown" onChange={(e) => handlePriorityselection(e.target.value)}>
          <option value="Critical">Priority</option>
            <option value="Critical">Critical</option>
            <option value="Important">Important</option>
            <option value="Minor">Minor</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>
    );
  }

  export default Section3;