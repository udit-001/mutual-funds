import React, { useContext, useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { fundsContext } from "../contexts/fundsContext";
import FundItem from "./fundItem";
import Cookies from "js-cookie";
import { API_BASE_URL } from '../contants'


export default function FundsList() {
  const [funds, setFunds] = useState([])
  const { fundsFamily } = useContext(fundsContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/get-schemes?mutual_fund_family=${fundsFamily}`, {
          method: 'GET',
           headers: {
             'Authorization': Cookies.get('accessToken'),
           },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.items)) {
          setFunds(data.items);
          setError(null);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
        console.error('Error fetching funds:', err);
      }
    }
    fetchData();
  }, [fundsFamily])

  if (!error){
    if(funds.length === 0){
      return <>
      <p className="text-center text-xl mt-5 text-slate-500 shadow-lg rounded-lg p-8">
        No funds found :/
      </p>
    </>
    }
    else{
      return (
        <Accordion className="mt-5 rounded-lg shadow-lg p-8">
          {funds && funds.map((item, index) => {
            return (
              <AccordionItem key={index} aria-label={item.scheme_name} title={item.scheme_name}>
                <FundItem item={item}/>
              </AccordionItem>
            )
          })}
        </Accordion>
      );
    }
  }
  else{
    return <>
      <p className="mt-5 text-center text-xl p-9 shadow-lg rounded-lg text-slate-500">
        Couldn't fetch funds at the moment, please try again :/
      </p>
    </>
  }
}
