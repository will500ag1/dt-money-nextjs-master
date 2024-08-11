"use client"
import { CardContainer } from "@/components/CardContainer";
import { Header } from "@/components/Header";
import { BodyContainer } from "@/components/BodyContainer";
import { ITransaction } from "@/types/transaction";
import { Table } from "@/components/Table";
import { use, useEffect, useState } from "react";
import { FormModal } from "@/components/FormModal";

const oldTransactions: ITransaction[] = [
  {
    title: "Desenvolvimento de site",
    price: 1200,
    category: "Desenvolvimento",
    data: new Date(),
    type: "income"
  },
  {
    title: "Hamburguer",
    price: 50,
    category: "Alimentação",
    data: new Date(),
    type: "outcome"
  }
]

export interface ITotal {
  totalIncome: number 
  totalOutcome: number
  total: number
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>(oldTransactions);
  const [totalTransactions, setTotalTransactions] = useState<ITotal>({totalIncome: 0, totalOutcome: 0, total: 0})


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false)

  const handleAddTransaction = (transaction: ITransaction) => {
    setTransactions([...transactions, transaction])
  }

  useEffect(() => {
    const totals = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.price;
        acc.total += transaction.price;
      } else if (transaction.type === 'outcome') {
        acc.totalOutcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { totalIncome: 0, totalOutcome: 0, total: 0 });
    setTotalTransactions(totals)
   
  },[transactions] )

  return (    
   <div className="bg-background h-full min-h-screen">
    <Header openModal={openModal} />    
    <BodyContainer>
        <CardContainer totals={totalTransactions} />    
        <Table data={transactions} />
    </BodyContainer>          
    {isModalOpen && (<FormModal formTitle="Cadastro de Transação" closeModal={closeModal} AddTransaction={handleAddTransaction} />)}
   </div>
  );
}
