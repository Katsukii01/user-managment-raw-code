import React from 'react';
import UserTable from './components/UserTable';

const App: React.FC = () => {
  return (
    <section className='relative w-full h-screen mx-auto flex items-center  flex-col bg-gradient overflow-y-scroll'>
      <h1 className='text-5xl text-white text-bold py-8'>User Management</h1>
      <UserTable />
    </section>
  );
};

export default App;
