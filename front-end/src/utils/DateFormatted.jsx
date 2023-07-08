import React from 'react';

const formatDate = (dateValue, textValue) => {
    const date = new Date(dateValue);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${textValue}${day}/${month}/${year}`;
};

const DateFormatted = ({ dateValue, textValue }) => {
    const formattedDate = formatDate(dateValue, textValue);

    return <div>{formattedDate}</div>;
};

export default DateFormatted;
