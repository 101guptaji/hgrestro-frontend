function abbreviateNumber(number = 0) {
  if (number > 1000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number > 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return String(number).padStart(2, '0');
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