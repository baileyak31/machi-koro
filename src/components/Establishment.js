import React from 'react';

const Establishment = ({
  title,
  color,
  industry,
  activationNum,
  cost,
  description,
}) => {
  const cssClassName = `establishment${color}`;
  return (
    <div className={cssClassName}>
      <div>
        <b>{title}</b>
      </div>
      <div>Industry: {industry}</div>
      <div>
        {activationNum.length > 1
          ? 'Activation numbers: ' + activationNum[0] + '-' + activationNum[1]
          : 'Activation number: ' + activationNum[0]}
      </div>
      <div>Cost: {cost}</div>
      <div>{description}</div>
    </div>
  );
};

export default Establishment;
