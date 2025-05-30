import React from 'react'

function abbreviateNumber(number) {
  if (number < 1000) {
    return String(number).padStart(2, '0');
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else {
      return (number / 1000000000).toFixed(1) + "B";
  }
}

const AnalyticsCard = (props) => {
  const count = abbreviateNumber(props.value);

  return (
    <div className='analytics-card'>
        <div className="card-icon">
            {props.icon}
        </div>
        <div className="card-content">
            <h2>{count}</h2>
            <p>{props.label}</p>
        </div>
    </div>
  )
}

export default AnalyticsCard