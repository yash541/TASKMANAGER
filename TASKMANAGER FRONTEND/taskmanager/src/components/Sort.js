import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const Sort = ({ sort,onClose}) => {
  const [Open, setOpen] = useState(true);

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSort = (sortOption) => {
    console.log(sortOption)
    sort(sortOption);
    handleClose();
  };


  return (
    <div>
      {/* <SwapVertIcon onClick={handleMenuClick}/> */}
      <Popover
        open={Open}
        onClose={handleClose}
      >
        <MenuList autoFocusItem={Open} id="menu-list-grow">
          <MenuItem onClick={() => handleSort('startdate:asc')}>Sort By StartDate: Asc</MenuItem>
          <MenuItem onClick={() => handleSort('startdate:desc')}>Sort By StartDate: Dsc</MenuItem>
          <MenuItem onClick={() => handleSort('duedate:asc')}>Sort By DueDate: Asc</MenuItem>
          <MenuItem onClick={() => handleSort('duedate:desc')}>Sort By DueDate: Dsc</MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};

export default Sort;
