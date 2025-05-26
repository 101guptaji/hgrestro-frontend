const ProgressBar = ({ color, progress }) => {

    const Parentdiv = {
        height: '10px',
        width: '124px',
        backgroundColor: 'white',
        borderRadius: '15px',
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: color,
        borderRadius: '15px',
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv} />
        </div>
    )
}

export default ProgressBar;