// FilterPopup.js

import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { getCookie } from './LandingPage';
import './Filter.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Category } from '@mui/icons-material';
const DeleteCategoryAlert = ( {categories,setCategories,onClose, categoryId} ) => {
  const [open, setOpen] =useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
};
const deleteCategory = async (categoryId) => {
    try {
      const token = getCookie('access_token'); // Assuming you have a function to get the access token
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const response = await axiosInstance.delete(`http://localhost:8080/api/categories/${categoryId}`);
  
      if (response.status === 200) {
        // Category deleted successfully
        console.log('Category deleted successfully');
        setCategories(categories.filter(Category => Category.id !== categoryId));
        handleClose();
        return true;
      } else {
        console.error('Failed to delete category:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  };

    return (
        <div>
          <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 500 }}>
        <div className="delete-popup-container">
      <div className="delete-popup-content">
        <div className="delete-popup-text">
          <h4>All the Tasks associated with this category will get deleted.</h4>
          <p>Are you sure you want to delete the task?</p>
        </div>
        <div className="delete-popup-buttons">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={()=>deleteCategory(categoryId)}>Delete</button>
        </div>
      </div>
    </div>
        </ModalContent>
      </Modal>
      </div>
    );
  };
  DeleteCategoryAlert.propTypes = {
    onClose: PropTypes.func.isRequired
  };
export default DeleteCategoryAlert;
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