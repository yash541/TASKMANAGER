// ButtonSection.jsx
import { React, useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import AddTask from "./AddTask";
import AddIcon from '@mui/icons-material/Add';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Search from "./Search";
const Section2 = ({tasks,setTasks,searchQuery,sort,categories,filter}) => {
  const [open, setOpen] = useState(false);
  const [openFilter, setopenFilter] = useState(false);
  const [openSearch,setopenSearch] = useState(false);
  const [openSort, setopenSort] = useState(false);
  const handleOpenSort=()=>{
    setopenSort(true);
  };
  const handleOpenFilter=()=>{
    setopenFilter(true);
  };
  const handleOpen = () => setOpen(true);
  const handleOpensearch=()=>{
    setopenSearch(true);
  };
  

  return (
    <div className="button-section">
      <div className="left-buttons">
      <SearchRoundedIcon onClick={handleOpensearch}/>
      {openSearch && <Search onSubmit={searchQuery} onClose={()=>setopenSearch(false)}/>}
        <FilterListRoundedIcon onClick={handleOpenFilter}/>
        {openFilter && <Filter filters={filter} categories={categories} onClose={()=>setopenFilter(false)}/>}
        <SwapVertIcon onClick={handleOpenSort}/>
        {openSort && <Sort sort={sort} onClose={()=>setopenSort(false)}/>}
      </div>
      <div className="right-buttons">
        {/* <AddTask categories={categories} onSubmit={handleTaskSubmit}/> */}
        <AddIcon onClick={handleOpen} />
        <div>
        {open && <AddTask tasks={tasks} setTasks={setTasks} categories={categories} onClose={() => setOpen(false)}/>}
        </div>
      </div>
    </div>
  );
};

export default Section2;
