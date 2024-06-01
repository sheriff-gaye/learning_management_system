import React from 'react';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto w-full h-full max-w-screen-xl">{children}</div>
    </main>
  );
};

export default LandingLayout;
