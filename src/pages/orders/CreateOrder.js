import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../features/orders/ordersSlice";
import InputBox from "../../Components/InputBox";
import NavbarForm from "../../Components/NavbarForm";
import Dropdown from "../../Components/Dropdown";
import "../../CSS/NavbarMaterials.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CreateOrder() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders);
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const idLength = 10;
  const generateUniqueId = customAlphabet(alphabet, idLength);
  console.log("all Orders at createOrder", allOrders);
  const [billingAddressCheck, setBillingAddressCheck] = useState(false);
  const [deliveryAddressCheck, setDeliveryAddressCheck] = useState(false);
  const [customerAddress, setCustomerAddress] = useState({});
  const [formData, setFormData] = useState({
    status: 1,
    id: "",
    customerDetails: {
      Address: "",
      City: "",
      Country: "",
      PostalCode: "",
      State: "",
      customerName: "",
      email: "",
      mobileNumber: "",
    },
    orderDetails: {
      Location: "",
      Note: "",
      receivedDate: "",
    },
    paymentDetails: {
      City: "",
      Country: "",
      PostalCode: "",
      State: "",
      amount: "",
      cardHolderName: "",
      cardNo: "",
      paymentAddress: "",
      paymentDate: "",
      paymentMethod: "",
      paymentStatus: "",
    },
    productDetails: {
      Name: "",
      code: "",
      price: "",
      quantity: "",
    },
    shipmentDetails: {
      Address: "",
      City: "",
      Country: "",
      PostalCode: "",
      State: "",
      deliveryDate: "",
    },
  });
  const handleBillingCheckChange = (e) => {};
  const handleDeliveryCheckChange = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = generateUniqueId();
    console.log("data at submit", formData);
    dispatch(addOrder(formData));
    toast.success("New Order Successfully Created");
  };
  return (
    <form >
      <div className="p-3 bg-white pb-4">
        <NavbarForm
          title="Create Order"
          btnTitle="Save"
          className="NavbarCreateOrder"
          backLink="/sales"
          nextLink="/sales"
          onClickfunction={handleSubmit}
        />

        <div className="grid gap-y-4">
          {/* Order Details Block Start */}
          <div className="grid gap-2">
            <div style={{ color: "#2D2D2D", font: "16px" }}>Order Details</div>
            <div className="grid  grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="date"
                title="Received Date*"
                name="orderDetails.receivedDate"
                value={formData.orderDetails.receivedDate}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    orderDetails: {
                      ...prevData.orderDetails,
                      receivedDate: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.orderDetails.receivedDate.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="Order Location*"
                name="orderDetails.Location"
                value={formData.orderDetails.Location}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    orderDetails: {
                      ...prevData.orderDetails,
                      Location: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.orderDetails.Location.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="text"
                title="Order Note*"
                className="md:col-span-3"
                name="orderDetails.Note"
                value={formData.orderDetails.Note}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    orderDetails: {
                      ...prevData.orderDetails,
                      Note: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.orderDetails.Note.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
            </div>
          </div>
          {/* Order Details Block Ends */}
          {/* Product Details Block start */}
          <div className="grid gap-2">
            <div style={{ font: "16px" }}>Product Details</div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <Dropdown
                title="Name*"
                name="productDetails.Name"
                value={formData.productDetails.Name}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    productDetails: {
                      ...prevData.productDetails,
                      Name: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.productDetails.Name.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="text"
                title="Code"
                name="productDetails.code"
                value={formData.productDetails.code}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    productDetails: {
                      ...prevData.productDetails,
                      code: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.productDetails.code.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="number"
                title="Quantity*"
                name="productDetails.quantity"
                value={formData.productDetails.quantity}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    productDetails: {
                      ...prevData.productDetails,
                      quantity: value,
                    },
                  }));
                }}
                labelCss={
                  formData.productDetails.quantity ? "label-up" : "label-down"
                }
              />
              <InputBox
                type="number"
                title="Price*"
                name="productDetails.price"
                value={formData.productDetails.price}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value);
                  setFormData((prevData) => ({
                    ...prevData,
                    productDetails: {
                      ...prevData.productDetails,
                      price: value,
                    },
                  }));
                }}
                labelCss={
                  formData.productDetails.price ? "label-up" : "label-down"
                }
              />
            </div>
          </div>
          {/* Product Details Block Ends */}
          {/* Customer Details Block start */}
          <div className="grid gap-2">
            <div style={{ font: "16px" }}>Customer Details</div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="text"
                title="Customer Name*"
                name="customerDetails.customerName"
                value={formData.customerDetails.customerName}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      customerName: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.customerDetails.customerName.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="email"
                title="Email*"
                name="customerDetails.email"
                value={formData.customerDetails.email}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      email: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.customerDetails.email.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="number"
                title="Mobile Number*"
                name="customerDetails.mobileNumber"
                value={formData.customerDetails.mobileNumber}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure non-negative value
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      mobileNumber: value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.mobileNumber
                    ? "label-up"
                    : "label-down"
                }
              />
              <InputBox
                type="text"
                title="Address Line*"
                className="md:col-span-2"
                name="customerDetails.Address"
                value={formData.customerDetails.Address}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      Address: e.target.value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.Address.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="number"
                title="Zip/Postal Code*"
                name="customerDetails.PostalCode"
                value={formData.customerDetails.PostalCode}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      PostalCode: e.target.value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.PostalCode
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="City*"
                name="customerDetails.City"
                value={formData.customerDetails.City}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      City: e.target.value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.City.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="State*"
                name="customerDetails.State"
                value={formData.customerDetails.State}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      State: e.target.value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.State.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="Country*"
                name="customerDetails.Country"
                value={formData.customerDetails.Country}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    customerDetails: {
                      ...prevData.customerDetails,
                      Country: e.target.value,
                    },
                  }));
                }}
                labelCss={
                  formData.customerDetails.Country.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
            </div>
          </div>
          {/* Customer Details Block Ends */}

          {/* Payment Details Block start */}
          <div className="grid gap-2">
            <div style={{ font: "16px" }}>Payment Details</div>
            <div className="text-xs flex gap-1 align-center">
              <input
                type="checkBox"
                checked={billingAddressCheck}
                onChange={handleBillingCheckChange}
              />
              Billing Address Same as Customer Address
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <Dropdown
                title="Payment Method*"
                options={["Credit Card", "Debit Card"]}
                name="paymentDetails.paymentMethod"
                value={formData.paymentDetails.paymentMethod}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      paymentMethod: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.paymentMethod.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="number"
                title="Card No*"
                name="paymentDetails.cardNo"
                value={formData.paymentDetails.cardNo}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure non-negative value
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      cardNo: value,
                    },
                  }));
                }}
                labelCss={
                  formData.paymentDetails.cardNo ? "label-up" : "label-down"
                }
              />

              <InputBox
                type="text"
                title="Card Holder Name*"
                name="paymentDetails.cardHolderName"
                value={formData.paymentDetails.cardHolderName}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      cardHolderName: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.cardHolderName.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="Payment Status*"
                name="paymentDetails.paymentStatus"
                value={formData.paymentDetails.paymentStatus}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      paymentStatus: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.paymentStatus.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="date"
                title="Payment Date*"
                name="paymentDetails.paymentDate"
                value={formData.paymentDetails.paymentDate}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      paymentDate: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.paymentDate.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="number"
                title="Amount*"
                name="paymentDetails.amount"
                value={formData.paymentDetails.amount}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure non-negative value
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      amount: value,
                    },
                  }));
                }}
                labelCss={
                  formData.paymentDetails.amount ? "label-up" : "label-down"
                }
              />

              <InputBox
                type="text"
                title="Address Line*"
                className="md:col-span-2"
                name="paymentDetails.paymentAddress"
                value={formData.paymentDetails.paymentAddress}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      paymentAddress: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.paymentAddress.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="number"
                title="Zip/Postal Code*"
                name="paymentDetails.PostalCode"
                value={formData.paymentDetails.PostalCode}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure non-negative value
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      PostalCode: value,
                    },
                  }));
                }}
                labelCss={
                  formData.paymentDetails.PostalCode ? "label-up" : "label-down"
                }
              />

              <Dropdown
                title="City*"
                name="paymentDetails.City"
                value={formData.paymentDetails.City}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      City: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.City.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="State*"
                name="paymentDetails.State"
                value={formData.paymentDetails.State}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      State: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.State.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="Country*"
                name="paymentDetails.Country"
                value={formData.paymentDetails.Country}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    paymentDetails: {
                      ...prevData.paymentDetails,
                      Country: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.paymentDetails.Country.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
            </div>
          </div>
          {/* Payment Details Block Ends */}

          {/* Shipment Details Block start */}
          <div className="grid gap-2">
            <div style={{ font: "16px" }}>Shipment Details</div>
            <div className="text-xs flex gap-1 align-center">
              <input
                type="checkBox"
                checked={deliveryAddressCheck}
                onChange={handleDeliveryCheckChange}
              />
              Delivery Address Same as Customer Address
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-x-8 gap-y-8">
              <InputBox
                type="date"
                title="Delivery Date*"
                name="shipmentDetails.deliveryDate"
                value={formData.shipmentDetails.deliveryDate}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      deliveryDate: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.shipmentDetails.deliveryDate.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="text"
                title="Address Line*"
                className="md:col-span-2"
                name="shipmentDetails.Address"
                value={formData.shipmentDetails.Address}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      Address: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.shipmentDetails.Address.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <InputBox
                type="number"
                title="Zip/Postal Code*"
                name="shipmentDetails.PostalCode"
                value={formData.shipmentDetails.PostalCode}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value); // Ensure non-negative value
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      PostalCode: value,
                    },
                  }));
                }}
                labelCss={
                  formData.shipmentDetails.PostalCode
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="City*"
                name="shipmentDetails.City"
                value={formData.shipmentDetails.City}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      City: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.shipmentDetails.City.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="State*"
                name="shipmentDetails.State"
                value={formData.shipmentDetails.State}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      State: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.shipmentDetails.State.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />

              <Dropdown
                title="Country*"
                name="shipmentDetails.Country"
                value={formData.shipmentDetails.Country}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    shipmentDetails: {
                      ...prevData.shipmentDetails,
                      Country: e.target.value,
                    },
                  }))
                }
                labelCss={
                  formData.shipmentDetails.Country.length > 0
                    ? "label-up"
                    : "label-down"
                }
              />
            </div>
          </div>
          {/* Shipment Details Block Ends */}
        </div>
      </div>
    </form>
  );
}
