import { useEffect, useContext, useState } from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { fundsContext } from "../contexts/fundsContext";
import Cookies from "js-cookie";
import { API_BASE_URL } from '../constants';

export default function FundsFamilySelect() {
  const [fundsFamilyList, setFundsFamilyList] = useState([]);
  const { fundsFamily, setFundsFamily } = useContext(fundsContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/api/mutual-fund-families`, {
        method: 'GET', 
        headers: {
          'Authorization': Cookies.get('accessToken')
        }
      }
      )
      const data = await response.json()
      setFundsFamilyList(data.items)
    }
    fetchData()
  }, [])


  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label="Select a Fund Family" 
        className="max-w-xs"
        value={fundsFamily}
        onChange={(e) => setFundsFamily(e.target.value)}
      >
        {fundsFamilyList && fundsFamilyList.map(family => (
          <SelectItem key={family}>
            {family}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
