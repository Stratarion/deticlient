import React from "react";
import { Stars } from 'components/Stars';


export const GartenInfo = ({garten}) => {
  return (
    <>
      <div className="kindergarten-item-title">{garten.name}</div>
      <div className="kindergarten-item-max">{garten.maxCount}</div>
      <div className="kindergarten-item-cost">{garten.costInfo}</div>
      <div className="kindergarten-item-stars">
        <Stars value={garten.rate} edit={false} />
      </div>
      <div className="kindergarten-item-desription">
        {garten.description}
      </div>
    </>
  )
}