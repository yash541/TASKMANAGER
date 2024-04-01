// FilterPopup.js

import React, { useState,useEffect} from 'react';
import './Filter.css';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
const Filter = ({categories,onClose,filters}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startRange,setstartRange]=useState('');
  const [endRange,setendRange]=useState('');
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const handleApply=()=>{
      filters(selectedCategory);
      handleClose();
  };
  
    return (
        <div>
          {/* <FilterListRoundedIcon onClick={handleOpen}/> */}
          <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 500 }}>
        <div className="filter-header">
          <h2>Filters</h2>
        </div>
        <div className="filter-section">
          <label htmlFor="category-select">Select Category:</label>
          {/* Dropdown menu for categories */}
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="start-range">Start Range:</label>
          <input value={startRange} type="date" id="start-range" onChange={(e) => setstartRange(e.target.value)} />
          {/* Add more input fields as needed */}
        </div>
        <div className="filter-section">
          <label htmlFor="start-range">End Range:</label>
          <input value={endRange} type="date" id="start-range" onChange={(e) => setendRange(e.target.value)}/>
          {/* Add more input fields as needed */}
        </div>
        <div className="filter-buttons">
          <button className="clear-button" onClick={handleClose}>Clear</button>
          <button className="apply-button" onClick={handleApply}>Apply</button>
        </div>
        </ModalContent>
      </Modal>
      </div>
    );
  };

export default Filter;
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});
const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
position: fixed;
z-index: 1300;
inset: 0;
display: flex;
align-items: center;
justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
z-index: -1;
position: fixed;
inset: 0;
background-color: rgb(0 0 0 / 0.5);
-webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
({ theme }) => css`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 4px 12px
    ${
      theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'
    };
  padding: 24px;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-bottom: 8px;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
    margin-bottom: 4px;
  }
`
);