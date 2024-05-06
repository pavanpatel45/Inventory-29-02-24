import React, { useEffect, useState } from 'react';
import axios from 'axios';
const  materialsTableData = async () => {
    try {
        const response = await axios.get('https://fe82-182-78-194-242.ngrok-free.app/materials');
        console.log("at api-data : ",response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }
      
}
export default materialsTableData;