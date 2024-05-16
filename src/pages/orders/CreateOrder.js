import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../features/orders/ordersSlice";
import InputBox from "../../Components/InputBox";
import NavbarForm from "../../Components/NavbarForm";
import Dropdown from "../../Components/Dropdown";
import "../../CSS/NavbarMaterials.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url } from "../../Data/Constants";
import axios from "axios";

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
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [customerAddress, setCustomerAddress] = useState({});

//   const [paymentMethod, setPaymentMethod] = useState([]);
//   const [paymentStatus, setPaymentStatus] = useState([]);
//   const [countryData, setCountryData] = useState([]);
//   const [stateDataCustomer, setStateDataCustomer] = useState([]);
//   const [stateDataPayment, setStateDataPayment] = useState([]);
//   const [stateDataShipment, setStateDataShipment] = useState([]);
//   const [cityDataCustomer, setCityDataCustomer] = useState([]);
//   const [cityDataPayment, setCityDataPayment] = useState([]);
//   const [cityDataShipment, setCityDataShipment] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [products, setProducts] = useState([]);
// =======
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
  const [paymentMethod,setPaymentMethod] = useState([]);
  const [paymentStatus,setPaymentStatus] = useState([]);
  const [countryData,setCountryData] = useState([]);
  const [stateDataCustomer,setStateDataCustomer] =  useState([]);
  const [stateDataPayment,setStateDataPayment] =  useState([]);
  const [stateDataShipment,setStateDataShipment] =  useState([]);
  const [cityDataCustomer,setCityDataCustomer] =  useState([]);
  const [cityDataPayment,setCityDataPayment] =  useState([]);
  const [cityDataShipment,setCityDataShipment] =  useState([]);
  const [locations,setLocations] = useState([]);
  const [products,setProducts] = useState([]);
  const [productTableData,setProductTableData] = useState([]);
<<<<<<< HEAD
>>>>>>> 94f3558edb533f829d1d1bb887f7185710678d35
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
  const [formData, setFormData] = useState({
    status: 1,
    // id: "",
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
  const handleBillingCheckChange = (e) => {
    const isChecked = e.target.checked;
    console.log("at create order billingCheck:", isChecked);
    setBillingAddressCheck(isChecked);
    if (isChecked) {
      setFormData((prevFormData) => {
        console.log("prev data litne 90",prevFormData);
        return {
          ...prevFormData,
          paymentDetails: {
            ...prevFormData.paymentDetails,
            City: prevFormData.customerDetails.City,
            Country: prevFormData.customerDetails.Country,
            PostalCode: prevFormData.customerDetails.PostalCode,
            State: prevFormData.customerDetails.State,
            paymentAddress: prevFormData.customerDetails.Address,
          },
        };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        paymentDetails: {
          ...prevFormData.paymentDetails,
          City: "",
          Country: "",
          PostalCode: "",
          State: "",
          paymentAddress: "",
        },
      }));
    }
  };
  const handleDeliveryCheckChange = (e) => {
    console.log("FormData before update:", formData);
    setDeliveryAddressCheck(e.target.checked);
    if (e.target.checked) {
      // Copy customer address details to shipment details
      setFormData((prevData) => ({
        ...prevData,
        shipmentDetails: {
          ...prevData.customerDetails, // Copy customer details
        },
      }));
    } else {
      // Reset shipment details
      setFormData((prevData) => ({
        ...prevData,
        shipmentDetails: {
          deliveryDate: "",
          Address: "",
          PostalCode: "",
          City: "",
          State: "",
          Country: "",
        },
      }));
    }
  };

  const navigate = useNavigate();

  const checkFormCompletion = () => {
    const formEntries = Object.entries(formData);

    console.log(formEntries);

    const allFieldsFilled = formEntries.every((formEntriesData) => {
      const [name, value] = formEntriesData;

      if (typeof value === "object" && value !== null) {
        // For objects, check each value inside the object
        const isValidData = Object.values(value).every(
          (val) =>
            (typeof val === "string" || "number") && String(val).trim() !== ""
        );
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      } else {
        // For non-objects, directly check the value
        const isValidData =
          typeof (value === "string" || "number") &&
          String(value).trim() !== "";
        if (!isValidData) {
          console.log(name);
        }
        return isValidData;
      }
    });

    console.log(allFieldsFilled);
    console.log("filled forms", allFieldsFilled);
    setIsFormComplete(allFieldsFilled);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data at submit create Order", formData);
    dispatch(addOrder(formData));
    toast.success("New Order Successfully Created");
    navigate("/sales");
  };
  const getLocations = async () => {
    try {
      const url = `${api_url}/productCategory/getAllLocations`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      console.log("Response at newOrderRequest", response.data);
      setLocations(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getPaymentMethod = async () => {
    try {
      const url = `${api_url}/productCategory/getAllPaymentMethod`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      // console.log('Response at newOrderRequest', response.data);
      setPaymentMethod(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getPaymentStatus = async () => {
    try {
      const url = `${api_url}/productCategory/getAllPaymentStatus`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      // console.log('Response at newOrderRequest', response.data);
      setPaymentStatus(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getCountry = async () => {
    try {
      const url = `${api_url}/getAllCountry`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      console.log("Response at newOrderRequest", response.data);
      setCountryData(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getProducts = async () => {
    try {
      const url = `${api_url}/productCategory/getAllPaymentStatus`;
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      console.log("Response at newOrderRequest", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getCity = async (callBy, id) => {
    try {
      console.log("at getState :", callBy, " : ", id, ":");
      const url = `${api_url}/getAllCity/${id}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      // console.log('Response at newOrderRequest', response.data);

      if (callBy == 1) {
        setCityDataCustomer(response.data);
        console.log("city data is updataed for custormer");
      } else if (callBy == 2) {
        setCityDataPayment(response.data);
      } else if (callBy == 3) {
        setCityDataShipment(response.data);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  const getState = async (callBy, id) => {
    try {
      console.log("at getState :", callBy, " : ", id, ":");
      const url = `${api_url}/getAllState/${id}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      console.log("Response at newOrderRequest", response.data);
      if (callBy == 1) {
        setStateDataCustomer(response.data);
      } else if (callBy == 2) {
        setStateDataPayment(response.data);
      } else if (callBy == 3) {
        setStateDataShipment(response.data);
      }
    }
<<<<<<< HEAD
<<<<<<< HEAD
  };
  useEffect(() => {
    const obj = countryData.find((obj) => {
      if (obj.value.trim() == formData.customerDetails.Country.trim()) {
        return obj;
=======
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
    catch (error) {
        console.log("Error :", error);
    }
  }
  const getProductsTableData = async () => {
    const url = `${api_url}/product`;
    try {
      const response = await axios.get(url, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      if (response?.status === 200) {
        setProductTableData(response?.data);
        const Data = response?.data;
        setProductTableData([]);
        Data.map((ele) => {
          setProductTableData((prev) => {
            return [
              ...prev,
              {
                value: ele.productName,
                label: ele.productName,
              },
            ];
          });
        });
        console.log("product table data at create Order :",Data);
      } else {
        console.error("Received unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };
  useEffect(()=>{
      console.log("Product Table Data :",productTableData);
  },[productTableData])
  useEffect(()=>{
    const obj = countryData.find((obj)=>{
      if(obj.value.trim() ==  formData.customerDetails.Country.trim()){
          return obj;
<<<<<<< HEAD
>>>>>>> 94f3558edb533f829d1d1bb887f7185710678d35
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
      }
    });
    const id = obj?.id;
    getState(1, id);
  }, [formData.customerDetails.Country]);
  useEffect(() => {
    const obj = countryData.find((obj) => {
      if (obj.value.trim() == formData.customerDetails.Country.trim()) {
        return obj;
      }
    });
    const id = obj?.id;
    getState(2, id);
  }, [formData.paymentDetails.Country]);
  useEffect(() => {
    const obj = countryData.find((obj) => {
      if (obj.value.trim() == formData.customerDetails.Country.trim()) {
        return obj;
      }
    });
    const id = obj?.id;
    getState(2, id);
  }, [formData.shipmentDetails.Country]);
  useEffect(() => {
    const obj = stateDataCustomer.find((obj) => {
      if (obj.value.trim() == formData.customerDetails.State.trim()) {
        return obj;
      }
    });
    const id = obj?.id;
    getCity(1, id);
  }, [formData.customerDetails.State]);
  useEffect(() => {
    const obj = stateDataPayment.find((obj) => {
      if (obj.value.trim() == formData.paymentDetails.State.trim()) {
        return obj;
      }
    });
    const id = obj?.id;
    getCity(2, id);
  }, [formData.paymentDetails.State]);
  useEffect(() => {
    const obj = stateDataShipment.find((obj) => {
      if (obj.value.trim() == formData.shipmentDetails.State.trim()) {
        return obj;
      }
    });
    const id = obj?.id;
    getCity(3, id);
  }, [formData.shipmentDetails.State]);
  useEffect(() => {
    const obj = countryData.find((obj) => {
      if (obj.value.trim() == formData.customerDetails.Country.trim()) {
        return obj;
      }
<<<<<<< HEAD
<<<<<<< HEAD
    });
    const id = obj?.id;
    getState(3, id);
  }, [formData.shipmentDetails.Country]);
  useEffect(() => {
    getPaymentMethod();
    getPaymentStatus();
    getCountry();
    getLocations();
    getProducts();
  }, []);
=======
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
  });
   const id = obj?.id;
      getState(3,id)
  },[formData.shipmentDetails.Country])
  useEffect(()=>{
       getPaymentMethod();
       getPaymentStatus();
       getCountry();
       getLocations();
       getProducts();
       getProductsTableData()
  },[])
<<<<<<< HEAD
>>>>>>> 94f3558edb533f829d1d1bb887f7185710678d35
=======
>>>>>>> eba6af9e016ffa796dafb914017e0d6be87e1a26
  return (
    <form>
      <div className="p-3 bg-white pb-4">
        <NavbarForm
          title="Create Order"
          btnTitle="Save"
          className={`NavbarCreateOrder`}
          btnStyle={{
            backgroundColor: isFormComplete ? "#2CAE66" : "#B3B3B3",
            cursor: isFormComplete ? "pointer" : "not-allowed",
          }}
          handleClick={handleSubmit}
          backLink="/sales"
          disabled={!isFormComplete}
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
                options={locations}
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
                options={productTableData}
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
                options={cityDataCustomer}
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
                options={stateDataCustomer}
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
                options={countryData}
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
                options={paymentMethod}
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
                options={paymentStatus}
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
                options={cityDataPayment}
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
                options={stateDataPayment}
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
                options={countryData}
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
                  formData.shipmentDetails.deliveryDate &&
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
                options={cityDataShipment}
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
                options={stateDataShipment}
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
                options={countryData}
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
