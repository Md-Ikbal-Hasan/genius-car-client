import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetch(`https://genius-car-server-ten-xi.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    logOut();
                }

                return res.json()
            })
            .then(data => {
                setOrders(data)
            })
            .catch(error => console.error(error))

    }, [user?.email, logOut])


    // delete order
    const hanldeDelete = (id) => {
        const proceed = window.confirm("Are you sure, you want to cancel this order?");

        if (proceed) {

            fetch(`https://genius-car-server-ten-xi.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully.');
                        const remainingOrders = orders.filter(odr => odr._id !== id);
                        setOrders(remainingOrders);
                    }

                })
        }
    }


    const handleStatusUpdate = (id) => {
        fetch(`https://genius-car-server-ten-xi.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })

            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = "Approved"

                    const newOrders = [approving, ...remaining];
                    setOrders(newOrders);

                }
            })
            .catch(error => console.error(error))

    }



    return (
        <div>
            <h2 className='text-3xl'>You have {orders.length} orders</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                Delete
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                hanldeDelete={hanldeDelete}
                                handleStatusUpdate={handleStatusUpdate}

                            ></OrderRow>)
                        }


                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default Orders;