import React from 'react'

const ChefTable = () => {
    const getChefData = () => {
        return [
            { name: 'Manesh', orders: 3 },
            { name: 'Pritam', orders: 7 },
            { name: 'Yash', orders: 5 },
            { name: 'Tenzen', orders: 8 }
        ];
    };

    const chefData = getChefData();

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
                    {chefData.map((chef, index) => (
                        <tr key={index}>
                            <td>{chef.name}</td>
                            <td>{String(chef.orders).padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ChefTable