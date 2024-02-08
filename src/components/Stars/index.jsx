import React from "react";
import ReactStars from 'react-stars';

// https://www.npmjs.com/package/react-stars - дока по звездам

export const Stars = ({
    edit,
    onChange,
    value,
    size,
    additionalClass,
}) => {
    return (
        <ReactStars
            count={5}
            edit={edit}
            onChange={onChange}
            value={value}
            size={size}
            additionalClass={additionalClass}
        />
    )
}