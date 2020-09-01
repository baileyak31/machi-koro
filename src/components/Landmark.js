import React from 'react';

const Landmark = ({ title, cost, description }) => {
  return (
    <div className="landmark">
      <div>
        <b>{title}</b>
      </div>
      <div>Cost: {cost}</div>
      <div>{description}</div>
    </div>
  );
};

export default Landmark;
