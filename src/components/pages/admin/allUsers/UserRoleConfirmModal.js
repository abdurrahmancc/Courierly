import React from "react";
import { toast } from "react-toastify";
import axiosPrivet from "../../../hooks/axiosPrivet";

const UserRoleConfirmModal = ({ inputRoleId, refetch }) => {
  const { user, role } = inputRoleId;
  console.log("inputRoleId............",inputRoleId)

  const handleAddUser = async (id) => {
    try {
      await axiosPrivet.post(`users/makeRole/${id}`, { role: role });
      toast.success(`Add ${role}`, { autoClose: 1000 });
      refetch();
    } catch (error) {
      toast.error(error?.message, { autoClose: 1000 });
      console.log(error);
    }
  };
  return (
    <>
      <input type="checkbox" id={`${role}RoleConfirmModal`} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-center">
            Are you suer want to {`add ${role}`} {user?.displayName}
          </h3>
          <div className="my-4 text-center">
            <p className="">Email: {user?.email}</p>
            <p className="">Id: {user?._id}</p>
          </div>
          <div className="modal-action gap-5 justify-center">
            <label
              htmlFor={`${role}RoleConfirmModal`}
              className="btn btn-sm btn-success text-neutral"
            >
              Cancel
            </label>
            <label
              onClick={() => handleAddUser(user?._id)}
              htmlFor={`${role}RoleConfirmModal`}
              className="btn btn-sm btn-success text-neutral"
            >
              Add {role}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoleConfirmModal;
