import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../hooks'; // Import the custom hooks
import { fetchUsers, filterUsers } from '../store/usersSlice';
import { RootState } from '../store';
import { styles } from '../styles';

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredUsers, loading } = useSelector((state: RootState) => state.users);
  const [filters, setFilters] = useState({ name: '', username: '', email: '', phone: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6); // Set the number of users per page

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Dispatch filter action whenever filters change
  useEffect(() => {
    dispatch(filterUsers(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className='text-center p-4 text-slate-500'>Loading...</p>;

  return (
    <section className='bg-glass p-4 rounded text-xss lg:text-xl md:text-md max-w-full mx-auto px-4'>
      {/* Filters */}
      <div className='flex flex-wrap justify-center m-4 px-4 text-sm'>
        <input className={styles.search_input} name="name" value={filters.name} onChange={handleFilterChange} placeholder="Search by name" />
        <input className={styles.search_input} name="username" value={filters.username} onChange={handleFilterChange} placeholder="Search by username" />
        <input className={styles.search_input} name="email" value={filters.email} onChange={handleFilterChange} placeholder="Search by email" />
        <input className={styles.search_input} name="phone" value={filters.phone} onChange={handleFilterChange} placeholder="Search by phone" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className='table-auto w-full bg-white rounded shadow-lg'>
          <thead>
            <tr className='bg-slate-800 text-white text-center font-bold'>
              <th className='p-4'>Name</th>
              <th className='p-4'>Username</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className='text-center border-t'>
                <td className='p-4'>{user.name}</td>
                <td className='p-4'>{user.username}</td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          className={`hover:bg-slate-700 ease-out duration-300 min-w-[100px] p-2 bg-slate-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-gray-500">Page {currentPage} of {totalPages}</p>
        <button 
          className={`hover:bg-slate-700 ease-out duration-300 min-w-[100px] p-2 bg-slate-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default UserTable;
