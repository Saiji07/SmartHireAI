// app/billing/page.jsx
"use client"; // Essential for client-side components and hooks

import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useUser } from '@/context/UserDetailContext'; // Assuming this provides user.credits

export default function BillingPage() {
  const { user, loading } = useUser(); // Access user and loading state from your context

  // PayPal Button Helper Functions (as discussed before)
  const createOrder = (value, description) => (data, actions) => {
    // This is called when the user clicks the PayPal button for a specific package.
    // 'value' and 'description' will come from the package configuration.
    console.log(`Creating PayPal order for ${value} USD: ${description}`);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: value,
            currency_code: "USD",
          },
          description: description,
          // You might add custom_id or invoice_id here for tracking in your backend
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING" // Common for digital goods
      }
    }).then((orderId) => {
      console.log("Order created with ID:", orderId);
      return orderId;
    }).catch(error => {
      console.error("Error creating PayPal order:", error);
      alert("Could not create PayPal order. Please try again.");
      throw error; // Re-throw to propagate the error to PayPalButtons
    });
  };

  const onApprove = (data, actions) => {
    console.log("PayPal order approved. Capturing order:", data.orderID);
    return actions.order.capture().then((details) => {
      // **IMPORTANT**: In a real app, send data.orderID to your backend
      // for server-side capture and credit update.
      console.log(`Transaction completed by ${details.payer.name.given_name}`);
      console.log("Transaction details:", details);

      // Example of calling your backend (replace with your actual API endpoint)
      // fetch('/api/paypal/capture', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     orderId: data.orderID,
      //     paypalPaymentId: details.id,
      //     userId: user?.id, // Pass the current user's ID
      //     amount: details.purchase_units[0].amount.value // Or pass the package identifier
      //   })
      // })
      // .then(res => res.json())
      // .then(backendResponse => {
      //   if (backendResponse.success) {
      //     alert(`Payment successful! Your credits have been updated.`);
      //     // Optionally, refresh user state in context to show updated credits
      //     // Example: if setUser is exposed by your context
      //     // if (user && backendResponse.newCredits) {
      //     //   setUser({ ...user, credits: backendResponse.newCredits });
      //     // }
      //   } else {
      //     alert(`Payment processed but error updating credits: ${backendResponse.message || 'Please contact support.'}`);
      //   }
      // })
      // .catch(backendError => {
      //   console.error("Error calling backend to update credits:", backendError);
      //   alert("Payment successful but failed to update credits on our side. Please contact support.");
      // });

      alert(`Payment successful! Check your credits soon.`); // Temporary message
    }).catch(error => {
      console.error("Error capturing PayPal order:", error);
      alert("Error processing payment. Please try again or contact support.");
      throw error; // Re-throw to propagate the error to PayPalButtons
    });
  };

  const onError = (err) => {
    console.error("PayPal Error:", err);
    alert("An error occurred with PayPal. Please try again.");
  };

  const onCancel = (data) => {
    console.log("PayPal payment cancelled:", data);
    alert("PayPal payment cancelled.");
  };

  return (
    <div className="flex-1 p-8"> {/* Adjusted padding and flex-1 for layout */}
      {/* Welcome Back Header (from image) */}
      {/* You'd likely have this in a parent layout or a shared component */}
      {/* Assuming this is part of your overall page structure, not directly in billing page */}
      {/*
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, {user?.name || "User"}</h1>
        <p className="text-gray-600">AI-Driven Interviews, Hassle-Free Hiring</p>
      </div>
      */}

      {/* Billing Section Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Manage your Payment and credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Your Credits Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Credits</h2>
          <p className="text-gray-600 mb-6">Current usage and remaining credits</p>
          <div className="flex items-center bg-blue-50 text-blue-700 p-4 rounded-lg mb-6">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            {loading ? (
              <span className="text-lg font-medium">Loading...</span>
            ) : (
              <span className="text-lg font-medium">{user?.credits || 0} interviews left</span>
            )}
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            + Add More Credits
          </button>
        </div>

        {/* Purchase Credits Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchase Credits</h2>
          <p className="text-gray-600 mb-6">Add more interview credits to your account</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Package */}
            <div className="border border-gray-200 p-5 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Basic</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">$5</p>
                <p className="text-gray-600 mb-4">20 interviews</p>
                <ul className="text-gray-700 list-disc list-inside mb-4 space-y-1">
                  <li>Basic interview templates</li>
                  <li>Email support</li>
                </ul>
              </div>
              <div className="mt-auto"> {/* Pushes buttons to the bottom */}
                <div className="mb-2">
                  <PayPalButtons
                    style={{ layout: "horizontal", color: "gold", shape: "rect", label: "paypal" }}
                    createOrder={createOrder("5.00", "Basic Package: 20 interviews")}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                  />
                </div>
                <div>
                  <PayPalButtons
                    style={{ layout: "horizontal", color: "silver", shape: "rect", label: "pay" }}
                    createOrder={createOrder("5.00", "Basic Package: 20 interviews")} // Same amount, different style
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                  />
                </div>
                {/* For Debit or Credit Card, you'd integrate a different payment gateway here (Stripe, etc.) */}
                {/* <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium mt-2">
                  Debit or Credit Card
                </button> */}
              </div>
            </div>

            {/* Standard Package */}
            <div className="border border-gray-200 p-5 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Standard</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">$12</p>
                <p className="text-gray-600 mb-4">50 interviews</p>
                <ul className="text-gray-700 list-disc list-inside mb-4 space-y-1">
                  <li>All interview templates</li>
                  <li>Priority support</li>
                  <li>Basic analytics</li>
                </ul>
              </div>
              <div className="mt-auto">
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => alert("Implement logic for Standard package purchase via another method or re-style PayPal button")}
                >
                  Purchase Credits
                </button>
              </div>
            </div>

            {/* Pro Package */}
            <div className="border border-gray-200 p-5 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">$25</p>
                <p className="text-gray-600 mb-4">120 interviews</p>
                <ul className="text-gray-700 list-disc list-inside mb-4 space-y-1">
                  <li>All interview templates</li>
                  <li>24/7 support</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
              <div className="mt-auto">
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => alert("Implement logic for Pro package purchase via another method or re-style PayPal button")}
                >
                  Purchase Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}