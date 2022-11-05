import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { img, price, title } = service
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl border ">
            <figure ><img className='p-3 rounded-lg' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className='flex justify-between mb-3'>
                    <p className='text-2x text-orange-600 font-semibold'>Price: ${price} </p>
                    <Link to={`/checkout/${service._id}`}>
                        <button className='btn btn-secondary'> Checkout </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ServiceCard;