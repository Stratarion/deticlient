import React from "react";
import { Stars } from 'components/Stars';


export const SectionInfo = ({ section }) => {
  return (
    <>
      <div className="section-item-title">{section.name}</div>
      <div className="section-item-max">{section.maxCount}</div>
      <div className="section-item-cost">{section.costInfo}</div>
      <div className="section-item-stars">
        <Stars value={section.rate} edit={false} />
      </div>
      <div className="section-item-desription">
        {section.description}
      </div>
    </>
  )
}