
import React, {useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [ transactions, setTransactions ] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);


  //fetch transactions
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);   //Initialize filtered transactions 

      })

      .catch((error) => console.error("Error fetching transactions:", error));

  }, []);

  //Handle search filtering
  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())

    );
    
    setFilteredTransactions(filtered);

  };

  //Add new transaction to the frontend
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);  
    setFilteredTransactions([...filteredTransactions, newTransaction]);

  };

  //Handle deleting transaction
  const handleDeleteTransaction = (id) => {
    const updatedFilteredTransactions = filteredTransactions.filter(    //Remove deleted transaction from filteredTransactions
      (transaction) => transaction.id !== id
    );

    setFilteredTransactions(updatedFilteredTransactions);

    //send DELETE request
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );

        setTransactions(updatedTransactions);
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  
  };
  

  return (
    <div>
      <Search onSearch={handleSearch}/>
      <AddTransactionForm  onTransactionAdded={handleAddTransaction} />
      <TransactionsList transactions={filteredTransactions} onDelete={handleDeleteTransaction} />
    </div>
  );
}

export default AccountContainer;
