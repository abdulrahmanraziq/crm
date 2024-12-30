import React from 'react';
import Communication from './Communication';

const CustomerProfile = ({ customer }) => {
  return (
    <div className="customer-profile-container">
      <h2>{customer.name}'s Profile</h2>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>

      {/* Communication Component */}
      <Communication customerId={customer._id} />
    </div>
  );
};

export default CustomerProfile;
