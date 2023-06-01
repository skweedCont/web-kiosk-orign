import {SummaryItem} from "./SummaryItem";
import React, {useState} from "react";

export function Summary({items = [], onOrderSubmit, setItems}) {
    const totalPrice = items.reduce((prev, curr) => prev + (curr.price * curr.count), 0);
    const [data, setData] = useState({receiveType: "STORE", phoneNumber: ""})
    const handleSubmit = (e) => {
        onOrderSubmit({receiveType: data.receiveType, phoneNumber: data.phoneNumber});
    }
    return (
        <>
            <div>
                <h5 className="m-0 p-0"><b>결제 내역</b></h5>
            </div>
            <hr/>
            <div>
                {items.map(v => <React.Fragment key={v.productId}><SummaryItem count={v.count}
                                                                               productName={v.productName}/>
                    <button onClick={() => {
                        setItems(prev => prev.filter(item => item.productId !== v.productId))
                    }}> x
                    </button>
                </React.Fragment>)}
            </div>

            <div className="mb-3">
                <label className="form-label">매장/방문</label>
                <button onClick={() => setData(prev => ({...prev, receiveType: "STORE"}))}
                        style={{backgroundColor: data.receiveType === "STORE" ? 'red' : ''}}>매장
                </button>
                <button onClick={() => setData(prev => ({...prev, receiveType: "TAKEOUT"}))}
                        style={{backgroundColor: data.receiveType === "TAKEOUT" ? 'red' : ''}}>포장
                </button>
            </div>

            <div className="mb-3">
                <label className="form-label">적립할 핸드폰 번호</label>
                <input type={"text"} onChange={(e) => {
                    setData(prev => ({...prev, phoneNumber: e.target.value}))
                }}/>
            </div>

            <div className="row pt-2 pb-2 border-top">
                <h5 className="col">총금액</h5>
                <h5 className="col text-end">{totalPrice}원</h5>
            </div>
            <button className="btn btn-dark col-12" onClick={handleSubmit}>결제하기</button>
        </>
    )
}
