
import React, { useState } from "react";


function AddTransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTransaction = {

      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: Number(formData.amount),
    };


    //send POST request to add new transaction to the backend API
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newTransaction),

    })

      .then((response) => response.json())
      .then((data) => {
        console.log("New transaction added:", data);

        //Trigger the callback to update the frontend with the new transaction
        onTransactionAdded(data);
        
        //Clear the form data after successful submission
        setFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        });

      })

      .catch((error) => console.error("Error adding transaction:", error));
  };


  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
