import './globals.css';
import { Toaster } from 'sonner';

import { Providers } from './providers';

export const metadata = {
  title: 'SmartHire AI',
  description: 'AI-powered hiring system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster></Toaster>
        </Providers>
      </body>
    </html>
  );
}
