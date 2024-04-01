// FilterPopup.js
import React, { useState,useEffect} from 'react';
import './Filter.css';
import clsx from 'clsx';
import axios from 'axios';
import { getCookie } from './LandingPage';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
const AddCategory = ({categories,setCategories,existingCategoryName,onClose}) => {
  const [categoryName, setCategoryName] = useState('');
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setCategoryName('');
    setOpen(false);
    onClose();
  }
  useEffect(() => {
    if (existingCategoryName) {
        setCategoryName(existingCategoryName);
    }else{
      setCategoryName('');
    }
  }, [existingCategoryName]);
  const handleSave = async () => {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('access_token')}`,
      },
    });
    // Save the task and close the popup
    if(!existingCategoryName){
        try {

          const response = await axiosInstance.post('http://localhost:8080/api/categories/', { name: categoryName }); // Assuming the response contains the newly added category
          // Clear the input field after successful addition
          setCategories([...categories, response.data]);
        } catch (error) {
          console.error('Error adding category:', error);
          // Handle error, maybe show an error message to the user
        }
      }else{
        try {
          const response = await axiosInstance.put(`http://localhost:8080/api/categories/${existingCategoryName}?newTitle=${categoryName}`);
          // Update the name of the category in the categories list
          const updatedCategories = categories.map(cat => {
            if (cat.name === existingCategoryName) {
              return { ...cat, name: categoryName };
            }
            return cat;
          });
          // Update the categories list in the parent component
          // Assuming you have a function to handle this update
          setCategories(updatedCategories);
          console.log('Category name updated successfully:', response.data);

        } catch (error) {
          console.error('Error updating category name:', error);
        }
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
    <div>
      <div >
        <h2>Add/Modify Category</h2>
        <label htmlFor="name">Category Name:</label>
        <input
          type="text"
          id="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="button-container">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
        </ModalContent>
      </Modal>
      </div>
    );
  };

export default AddCategory;
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