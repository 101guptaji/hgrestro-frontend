const ChefTable = ({chefData}) => {

    return (
        <div className='chef-table'>
            <table>
                <thead>
                    <tr>
                        <th>Chef Name</th>
                        <th>Order Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {chefData.map((chef) => (
                        <tr key={chef._id}>
                            <td>{chef.chefName}</td>
                            <td>{String(chef.orderTaken).padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ChefTable