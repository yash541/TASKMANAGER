// LandingPage.js

import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Section2 from "./Section2";
import Section1 from "./Section1";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import { useNavigate } from 'react-router-dom';
export const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
};
const LandingPage = () => {
    
      const [tasks, setTasks] = useState([]);
      const [query, setquery] = useState('');
      const [categories, setCategories] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState('ALL');
      const [selectedStatus, setSelectedStatus] = useState('');
      const [selectedPriority, setSelectedPriority] = useState('');
      const [selectedSort,setSelectedSort]=useState('');
      const navigate = useNavigate();
      const handleSort=(sortValue)=>{
        setSelectedSort(sortValue);
      }
      const handleapplyFilter=(category)=>{
        setSelectedCategory(category);
      }
      const searchQuery=(query)=>{
        setquery(query);
      }
      const handleFilterChange = (category, status, priority) => {
        setSelectedCategory(category);
        setSelectedStatus(status);
        setSelectedPriority(priority);
      };
      const fetchData = async () => {
        try {
          const token = getCookie('access_token');
      
          // Fetch tasks and categories using axios
          const axiosInstance = axios.create({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          const tasksResponse = await axiosInstance.get(`http://localhost:8080/api/tasks/?category=${selectedCategory}&status=${selectedStatus}&priority=${selectedPriority}&pagenum=1&sort=${selectedSort}`);
          const categoriesResponse = await axiosInstance.get('http://localhost:8080/api/categories/');
      
          // Set tasks and categories
          setTasks(tasksResponse.data);
          setCategories(categoriesResponse.data);
        } catch (error) {
            navigate('/login');
          console.error('Error fetching data:', error);
        }
      };
      const fetchsearchQueryTasks = async () => {
        try {
          const token = getCookie('access_token');
          const axiosInstance = axios.create({
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const response = await axiosInstance.get('http://localhost:8080/api/home/search', {
            params: {
              query: query
            }
            });
  
          if (response.status === 200) {
            // Update tasks state with the fetched tasks
            setTasks(response.data);
          } else {
            console.error('Failed to fetch tasks:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, [selectedCategory, selectedStatus, selectedPriority,selectedSort]);
      useEffect(() => {
        fetchsearchQueryTasks();
      }, [query]);
      // useEffect(() => {
      //   fetchData();
      // }, [selectedstartRange, selectedendRange, selectedFilterCategory]);
      
      
            
  return (
    <>
    <div className="top-widgets">
      <Section1 setCategories={setCategories} categories={categories}/>
      <Section2 tasks={tasks} setTasks={setTasks} searchQuery={searchQuery} categories={categories} filter={handleapplyFilter} sort={handleSort}/>
      <Section3 onFilterChange={handleFilterChange}/>
    </div>
    <div class="clear"></div>
      <Section4 tasks={tasks} setTasks={setTasks} categories={categories} className="task-list-container"/>
    <div class="clear"></div>
      <Section5/>
    </>
  );
};

export default LandingPage;
