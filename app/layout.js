// app/layout.jsx
import { Sidebar } from 'lucide-react';
import './globals.css';
import Provider from  './Provider'; // adjust path if it's somewhere else
import AppSidebar from './(main)/_components/AppSidebar';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'SmartHire AI',
  description: 'AI-powered hiring system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>

          {children}
          <Toaster></Toaster>
        </Provider>
      </body>
    </html>
  );
}
