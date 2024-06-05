import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeStatus } from '../../features/orders/ordersSlice';
import OrderBoxMedium from '../../Components/OrderBoxMedium';
import DialogBox from '../../Components/DialogBox';
import DialogBoxCancelOrder from '../../Components/DialogBoxCancelOrder';
export default function InProgressOrder() {
  const dispactch = useDispatch();
  const allOrders = useSelector((state) => state.orders);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancelOrder, setIsOpenCancelOrder] = useState(false);
  const [Note, setNote] = useState('');
  const [id, setId] = useState('');
  const handleChangeStatus = ({ id }) => {
    setIsOpen(true);
    setId(id);
    // console.log("at handleChangeStatus is clicked by id",id);
  };
  const handleReadytoShip = ({ id }) => {
    //  console.log("at readytoShip",id);
    dispactch(changeStatus({ id, status: 4 }));
  };
  const handleCancelOrder = ({ id }) => {
    // console.log("at CancelOrder",id);
    setIsOpen(false);
    setIsOpenCancelOrder(true);
  };
  const handleCancelOrderSubmit = ({ id }) => {
    // console.log("at CancelOrderSubmit",id);
    // console.log("Note : ",Note);
    setIsOpenCancelOrder(false);
    dispactch(changeStatus({ id, status: 6 }));
  };
  return (
    <div>
      <DialogBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={id}
        handleReadytoShip={handleReadytoShip}
        handleCancelOrder={handleCancelOrder}
        content='Ready to Ship'
      />
      <DialogBoxCancelOrder
        isOpen={isOpenCancelOrder}
        id={id}
        setIsOpen={setIsOpenCancelOrder}
        setNote={setNote}
        Note={Note}
        handleCancelOrderSubmit={handleCancelOrderSubmit}
      />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-2'>
        {allOrders.map((order) => {
          if (order.status == 3) {
            return (
              <OrderBoxMedium
                order={order}
                key={order.id}
                handleChangeStatus={handleChangeStatus}
              />
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
}
