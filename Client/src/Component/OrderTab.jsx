import React from 'react';
import Card from '../Shared/Card';

const OrderTab = ({items}) => {
    return (
        <div className="grid grid-cols-4 gap-8 my-8 w-10/12 mx-auto">
        {
            items.map(item =><Card key={item._id} item={item}></Card>)
        }
      </div>
    );
};

export default OrderTab;