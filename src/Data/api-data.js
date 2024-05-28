import React, { useEffect, useState } from 'react';
import axios from 'axios';
const  materialsTableData = async () => {
    try {
        const response = await axios.get('http://localhost:8090/material');
        console.log("at api-data : ",response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }
      
}
export default materialsTableData;