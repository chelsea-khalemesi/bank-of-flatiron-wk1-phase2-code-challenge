import React from "react";

function Transaction({ transaction, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:8001/transactions/${transaction.id}`, {      //Send delete request
      method: "DELETE",

    })
    
      .then(() => {
        onDelete(transaction.id);     //update frontend on successful deletion

      })

      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };


  const { date, description, category, amount } = transaction;

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;