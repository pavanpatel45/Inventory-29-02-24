import React, { useState } from "react";
import OrderBox from "./OrderBox";
import { useSelector, useDispatch } from "react-redux";
export default function NewOrderRequest( ) {
  const allOrders = useSelector((state) => state.orders.orders);
  console.log('New Order Request is set',allOrders);
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-3 gap-2">
      {allOrders?allOrders.map((order) => {
        if (order.status == 1) {
          return <OrderBox order={order} key={order.id} />;
        } else {
          return <></>;
        }
      }):""}
    </div>
  );
}
