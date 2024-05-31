import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { changeStatus } from '../features/orders/ordersSlice';
import axios from 'axios';
import OrderBoxMedium from './OrderBoxMedium';
import DialogBox from './DialogBox';
import DialogBoxCancelOrder from './DialogBoxCancelOrder';
import { api_url } from '../Data/Constants';

export default function InProgressOrder() {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenCancelOrder, setIsOpenCancelOrder] = useState(false);
    const [Note, setNote] = useState('');
    const [id, setId] = useState('');

    const getData = async () => {
        try {
            const url = `${api_url}/order/`;
            const response = await axios.get(url, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });
            console.log('Response at newOrderRequest', response.data);
            setAllOrders(response.data);
        } catch (error) {
            console.log("Error :", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const url = `${api_url}/order/${orderId}/${status}`;
            const resp = await axios.put(url);
            console.log('Response at createOrder', resp);
        } catch (error) {
            console.log("Error :", error);
        }
    };

    const handleChangeStatus = ({ id }) => {
        setIsOpen(true);
        setId(id);
    };

    const handleReadytoShip = ({ id }) => {
        updateStatus(id, 5);
        navigate("/sales/Shipped");
    };

    const handleCancelOrder = ({ id }) => {
        setIsOpen(false);
        setIsOpenCancelOrder(true);
        updateStatus(id, 1);
        navigate("/sales/Cancelled");
    };

    const handleCancelOrderSubmit = ({ id }) => {
        setIsOpenCancelOrder(false);
        dispatch(changeStatus({ id, status: 1 }));
    };

    return (
        <div>
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                id={id}
                handleReadytoShip={handleReadytoShip}
                handleCancelOrder={handleCancelOrder}
                content="Ready to Ship"
            />
            <DialogBoxCancelOrder
                isOpen={isOpenCancelOrder}
                id={id}
                setIsOpen={setIsOpenCancelOrder}
                setNote={setNote}
                Note={Note}
                handleCancelOrderSubmit={handleCancelOrderSubmit}
            />
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3 gap-2'>
                {allOrders.map((order) => {
                    if (order.orderStatus === "In Progress") {
                        return (
                            <OrderBoxMedium
                                order={order}
                                key={order.orderId}
                                handleChangeStatus={handleChangeStatus}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}
