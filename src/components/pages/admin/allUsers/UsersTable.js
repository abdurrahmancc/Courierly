import React, { useState } from 'react';
import UsersTableRow from './UsersTableRow';
import UserRoleConfirmModal from './UserRoleConfirmModal';
import DeleteUserModal from './DeleteUserModal';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axiosPrivet from '../../../hooks/axiosPrivet';

const UsersTable = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(null);
  const [inputRoleId, setInputRoleId] = useState({});

  const { data, isLoading, isError, error, refetch } = useQuery("getAllUsers", async () => await axiosPrivet.get("users"));

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;
    return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full pb-[6.5rem] h-[calc(100vh-300px)]">
        {/* ========= table start ====== */}
        <table className="table w-full ">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone / Email</th>
              <th>Role</th>
              <th>Joining Date</th>
              <th>Last Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {/* <!-- row 1 --> */}
            {data?.data?.users &&
              data.data.users.map((user, index) => (
                <UsersTableRow
                  key={index}
                  user={user}
                  index={index}
                  refetch={refetch}
                  setDeleteModal={setDeleteModal}
                  setInputRoleId={setInputRoleId}
                />
              ))}
          </tbody>
        </table>
        {/* ========= table end ====== */}
        {/* ========= delete modal start ====== */}
        {deleteModal && (
          <DeleteUserModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            refetch={refetch}
          />
        )}
        {/* ========= delete modal end ====== */}
        {/* ========= User Role Confirm Modal start ====== */}
        {inputRoleId && <UserRoleConfirmModal inputRoleId={inputRoleId} refetch={refetch} />}
        {/* ========= User Role Confirm Modal end ====== */}
      </div>
    </div>
    );
};

export default UsersTable;