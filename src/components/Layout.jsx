import React from 'react';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      {children}
    </div>
  );
}

export default Layout;