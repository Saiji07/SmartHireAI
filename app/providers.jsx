"use client";

import { UserProvider } from '@/context/UserDetailContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from 'sonner';

export function Providers({ children }) {
  return (
    <UserProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        {children}
        <Toaster />
      </PayPalScriptProvider>
    </UserProvider>
  );
}
