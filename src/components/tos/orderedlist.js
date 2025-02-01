import React from 'react';

const OrderedList = ({ children }) => {
  return <ol className='list-decimal px-7'>{children}</ol>;
};

export default OrderedList;
