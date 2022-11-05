import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const phone = form.phone.value;
        const email = form.email.value || 'unregistered';
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        if (phone.length < 10) {
            alert("Phone number should be 10 characters or longer. Please enter a valid phone number");
        }

        else {

            fetch("https://genius-car-server-ten-xi.vercel.app/orders", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                },
                body: JSON.stringify(order)

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.acknowledged) {
                        alert("Order Places Successfull")
                        form.reset();
                        navigate('/orders')

                    }
                })
                .catch(error => console.error(error))

        }



    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl">You are about order to: {title} </h2>
                <h4 className="text-3xl">Price: {price} </h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-2'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered    w-full " required />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered  w-full" required />
                    <input name='phone' type="text" placeholder="Your Phone " className="input input-bordered  w-full" required />
                    <input name='email' type="text" placeholder="Your  Email" defaultValue={user?.email} className="input input-bordered  w-full" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message..." required></textarea>
                <input className='btn btn-secondary' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;
