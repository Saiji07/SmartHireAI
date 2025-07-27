import React, { Suspense } from 'react';
import AuthClientPage from './AuthClientPage';
function LoadingFallback() {
  return <div>Loading...</div>;
}
export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthClientPage />
    </Suspense>
  );
}
