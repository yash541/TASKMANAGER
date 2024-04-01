import React, { useState,useEffect} from 'react';
import AddCategory from './AddCategory';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import DeleteCategoryAlert from './DeleteCategoryAlert';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Sidebar = ({ setCategories,categories, onEditCategory,onClose}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openAddCategoryPop, setopenAddCategoryPop] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryNameToEdit, setcategoryNameToEdit] = useState(null);
// Function to handle opening delete confirmation dialog for a specific category

// Function to handle closing delete confirmation dialog
  const toggleDrawerClose = ()=> {
    setIsOpen(false);
    onClose();
  };
  const toggleDrawerOpen = ()=> {
    setIsOpen(true);
  };
  const onAddCategory=(name)=>{
    setopenAddCategoryPop(true);
    setcategoryNameToEdit(name);
  };
  const handleDeleteCategory = (categoryId) => {
    console.log('Deleting category with ID:', categoryId);
    setCategoryToDelete(categoryId);
    console.log('Category to delete:', categoryId);
  };

  // Function to handle closing delete confirmation dialog
  const handleCloseDelete = () => {
    setCategoryToDelete(null);
  };

  const SidebarContent = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
    >
      <h3 className="centered-text">Categories</h3>
      <List>
        {categories.map((category) => (
          <ListItem button key={category.id}>
            <ListItemText primary={category.name} />
            <ListItemIcon>
              <button onClick={()=>onAddCategory(category.name)} aria-label="edit">
                <EditIcon />
              </button>
            </ListItemIcon>
            <ListItemIcon>
              <button onClick={() => handleDeleteCategory(category.id)} aria-label="delete">
                <DeleteIcon />
              </button>
            </ListItemIcon>
          </ListItem>
          
        ))}
      
      </List>
    </Box>
  );

  return (
    <React.Fragment key={'left'}>
      <SwipeableDrawer
        anchor={'left'}
        open={isOpen}
        onClose={toggleDrawerClose}
        onOpen={toggleDrawerOpen}
      >
      
        {SidebarContent}
        <Divider/>
        <Divider/>
        <button onClick={()=>onAddCategory(null)}>Add Category</button>
        {openAddCategoryPop && <AddCategory categories={categories} setCategories={setCategories} existingCategoryName={categoryNameToEdit} onClose={() => setopenAddCategoryPop(false)}/>}
        {categoryToDelete !== null  && <DeleteCategoryAlert categories={categories} setCategories={setCategories} categoryId={categoryToDelete} onClose={handleCloseDelete} />}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default Sidebar;
