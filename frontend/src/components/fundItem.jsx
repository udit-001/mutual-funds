import React, { useState, useMemo, useEffect } from 'react'
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import { API_BASE_URL } from '../constants.js'

export default function FundItem({ item }) {
    const date = new Date(item.date);
    const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const [qty, setQty] = useState(1)
    const [statusMessage, setStatusMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("Please enter a value from 1 to 100")
    const [isInvalid, setIsInvalid] = useState(false)
    const [color, setColor] = useState("")

    const validateQty = (value) => (value > 0 && value <= 100);

    useEffect(() => {
        if(qty === ""){
            setIsInvalid(false)
        }
        else{
            setIsInvalid(validateQty(qty)? false: true);
            setErrorMessage("Please enter a value from 1 to 100")
        }
    }, [qty])

    const allowPurchase = useMemo(() => {
        if (qty === "") return true;

        return validateQty(qty) ? false : true;
    }, [qty]);


    const buyButton = async (e) => {
        e.preventDefault();
        const schemeCode = e.target.name;
        const qty = e.target.qty.value;
        const response = await fetch(`${API_BASE_URL}/api/buy/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qty: qty,
                scheme_code: schemeCode,
                purchase_nav: item.net_asset_value
            }),
        });
        if (response.ok) {
            setQty("");
            setStatusMessage("Purchase successful");
            setColor("success")
            setTimeout(() => {
                setStatusMessage("");
                setColor("")
            }, 1000)
        }
        else{
            setErrorMessage("Purchase failed, please try again");
            setColor("danger")
            setIsInvalid(true)
            setTimeout(() => {
                setColor("")
                setIsInvalid(false)
            }, 5000)
        }

    }

    return (
        <>
            <Tabs aria-label="Options" color="primary" radius='full'>
                <Tab key="info" title="Info">
                    <div className="info-list p-6">
                        <div className="info-item flex items-center justify-between mb-4">
                            <span className="name font-bold text-lg text-gray-700">Scheme Code:</span>
                            <span className="value text-lg text-gray-600">{item.scheme_code}</span>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        <div className="info-item flex items-center justify-between mb-4">
                            <span className="name font-bold text-lg text-gray-700">Scheme Category:</span>
                            <span className="value text-lg text-gray-600">{item.scheme_category}</span>
                        </div>
                        <hr className="border-gray-300 my-4" />

                        <div className="info-item flex items-center justify-between mb-4">
                            <span className="name font-bold text-lg text-gray-700">Net Asset Value:</span>
                            <span className="value text-lg text-gray-600">{item.net_asset_value}</span>
                        </div>
                        <hr className="border-gray-300 my-4" />

                        <div className="info-item flex items-center justify-between mb-4">
                            <span className="name font-bold text-lg text-gray-700">Date:</span>
                            <span className="value text-lg text-gray-600">{dateString}</span>
                        </div>
                        <hr className="border-gray-300 my-4" />
                    </div>
                </Tab>
                <Tab key="buy" title="Purchase">
                    <p className='text-md p-2 font-semibold'>
                        NAV: {item.net_asset_value}
                    </p>
                    <form className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 align-middle" onSubmit={buyButton} name={item.scheme_code}>
                        <Input label="Quantity" placeholder="Enter quantity" type="number"
                            max={100} min={0} name="qty" value={qty} onChange={(e) => {
                                setQty(e.target.value)
                            }}
                            errorMessage={errorMessage}
                            isInvalid={isInvalid}
                            description={statusMessage}
                            color={color}
                        />
                        <div className="">
                            <Button fullWidth color="primary" type="submit" isDisabled={allowPurchase}>
                                Purchase
                            </Button>
                        </div>
                    </form>
                </Tab>
            </Tabs>
        </>
    )
}
