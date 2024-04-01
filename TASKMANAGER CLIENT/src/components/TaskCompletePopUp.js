// FilterPopup.js

import React, { useState,useEffect} from 'react';
import axios from 'axios';
import { getCookie } from './LandingPage';
import './Filter.css';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
const TaskCompletePopUp = ({onConfirm,onClose,taskId}) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
}
const handleUpdateStatus = async () => {
  try {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });
    const response = await axiosInstance.put(`http://localhost:8080/api/tasks/${taskId}`);

    if (response.status === 200) {
      // Handle success
      
      console.log('Task status updated successfully');
    } else {
      // Handle other status codes
      console.error('Failed to update task status:', response.statusText);
    }
  } catch (error) {
    // Handle error
    console.error('Error updating task status:', error);
  }
  handleClose();
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
        <div className="popup-container">
      <div className="popup">
        <p>Do you want to change the status of the task?</p>
        <div className="button-container">
          <button onClick={handleUpdateStatus}>Yes</button>
          <button onClick={handleClose}>No</button>
        </div>
      </div>
    </div>
        </ModalContent>
      </Modal>
      </div>
    );
  };

export default TaskCompletePopUp;
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