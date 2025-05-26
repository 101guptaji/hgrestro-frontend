import React from 'react'

const AnalyticsCard = (props) => {
  return (
    <div className='analytics-card'>
        <div className="card-icon">
            {props.icon}
        </div>
        <div className="card-content">
            <h2>{String(props.value).padStart(2, '0')}</h2>
            <p>{props.label}</p>
        </div>
    </div>
  )
}

export default AnalyticsCard