// FilterPopup.js

import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { getCookie } from './LandingPage';
import './Filter.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
const DeleteAlert = ( {onClose, task,setTasks,tasks} ) => {
  const [open, setOpen] =useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
};
const handleDelete = async () => {
  try {
    // Assuming taskId is available in the component state or props
    const taskId = task.id; // Adjust this based on your data structure
    
    // Make the DELETE request to delete the task
    const response = await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`, // Assuming getCookie is defined
      },
    });

    // Handle success response
    if (response.status === 200) {
      // Task deleted successfully, perform any necessary actions (e.g., close modal)
      setTasks(tasks.filter(task => task.id !== taskId));
      handleClose();
    } else {
      console.error('Failed to delete task:', response.statusText);
      // Handle error (e.g., show error message)
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle error (e.g., show error message)
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
        <h2 id="unstyled-modal-title" className="modal-title">Delete Task</h2>
        <p>This action cannot be reversed.</p>
        <div className="button-group">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
        </ModalContent>
      </Modal>
      </div>
    );
  };
  DeleteAlert.propTypes = {
    onClose: PropTypes.func.isRequired
  };
export default DeleteAlert;
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