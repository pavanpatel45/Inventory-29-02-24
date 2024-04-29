import React, { useState } from "react";

const DialogBoxCancelOrder = ({ isOpen,id, setIsOpen,setNote,Note,handleCancelOrderSubmit }) => {
  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" onClick={closeDialog}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all max-w-lg w-96 ">
          <div className="flex flex-col p-2 gap-3">
            <div className="text-sm p-2 flex flex-row items-center gap-2" style={{color:"#343434"}}>
                <div className="h-4 w-4 flex items-center justify-center rounded-full text-xs" style={{border:"1.5px solid #EC3030",color:"#EC3030"}} onClick={closeDialog}>X</div>
                <div>Are you sure you want to Cancel the selected Order?</div>
            </div>
             <textarea placeholder="Please share your feedback here"className="h-28 text-sm" style={{border:"1px solid #949494" ,color:"#343434",outline:"none"}} value={Note} onChange={(e) => setNote(e.target.value)}/>
            <div className="flex justify-between">
              <button
                className="py-1 px-2 rounded-md dialogBoxCancelButton w-44"
                style={{ border: "1px solid #A5A5A5", color: "#A5A5A5" }}
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="py-1 px-2 rounded-md dialogBoxCancelButton w-44 "
                style={{ border: "1px solid #A5A5A5", color: "#A5A5A5" }}
                onClick={() => handleCancelOrderSubmit({id})}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBoxCancelOrder;
