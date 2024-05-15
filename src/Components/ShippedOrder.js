import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeStatus } from '../features/orders/ordersSlice';
import OrderBoxMedium from './OrderBoxMedium'
import DialogBox from './DialogBox'
import DialogBoxCancelOrder from './DialogBoxCancelOrder'
import axios from 'axios';
import { api_url } from '../Data/Constants';
export default function ShippedOrder() {
    const navigate = useNavigate();
    const dispactch = useDispatch();
    const [allOrders, setAllOrders] = useState([])
    const getData = async () => {
        try {
            const url = `${api_url}/createOrder`;
            const response = await axios.get(url, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
            console.log('Response at newOrderRequest', response.data);
            setAllOrders(response.data);
        }
        catch (error) {
            console.log("Error :", error);
        }
    }
    const updateStatus = async(orderId,status)=>{
        try {
           const url = `${api_url}/createOrder/${orderId}/${status}`;
           const resp = await axios.put(url);
           console.log('Response at createOrder', resp);
         }
         catch (error) {
           console.log("Error :", error);
         }
     }
    useEffect(() => {
        getData();
    }, [])
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCancelOrder, setIsOpenCancelOrder] = useState(false);
    const [Note, setNote] = useState('');
    const [id, setId] = useState('');
    const handleChangeStatus = ({ id }) => {
        setIsOpen(true);
        setId(id);
        // console.log("at handleChangeStatus is clicked by id",id);
    }
    const handleReadytoShip = ({ id }) => {
        //  console.log("at readytoShip",id);
        // dispactch(changeStatus({ id, status: 5 }))
        updateStatus(id,4);
        navigate("/sales/Completed");
    }
    const handleCancelOrder = ({ id }) => {
        // console.log("at CancelOrder",id);
        setIsOpen(false);
        setIsOpenCancelOrder(true);
        updateStatus(id,1);
        navigate("/sales/Cancelled");
    }
    const handleCancelOrderSubmit = ({ id }) => {
        // console.log("at CancelOrderSubmit",id);
        // console.log("Note : ",Note);
        setIsOpenCancelOrder(false);
        dispactch(changeStatus({ id, status: 1 }))

    }
    return (
        <div>
            <DialogBox isOpen={isOpen} setIsOpen={setIsOpen} id={id} handleReadytoShip={handleReadytoShip} handleCancelOrder={handleCancelOrder} content="Complete Order" />
            <DialogBoxCancelOrder isOpen={isOpenCancelOrder} id={id} setIsOpen={setIsOpenCancelOrder} setNote={setNote} Note={Note} handleCancelOrderSubmit={handleCancelOrderSubmit} />
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-2'>
                {
                    allOrders.map((order) => {
                        if (order.orderStatus=== "Shipped") {
                            return (<OrderBoxMedium order={order} key={order.orderId } handleChangeStatus={handleChangeStatus} />)
                        }
                        else {
                            return (<></>)
                        }
                    })
                }
            </div>
        </div>
    )
}
