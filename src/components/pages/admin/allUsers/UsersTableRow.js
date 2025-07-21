import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import { MdDelete, MdDetails } from "react-icons/md";

const UsersTableRow = ({ user, index, setDeleteModal, refetch, setInputRoleId }) => {
  const joiningDate = format(new Date(user?.createdAt), "MMMM d, yyyy h:mm aa");
  const lastJoined = format(new Date(user?.updatedAt), "MMMM d, yyyy h:mm aa");

  return (
    <>
      <tr key={user?._id} className="hover">
        <th>{index + 1}</th>
        <td>
          <span>{user?.displayName}</span>
        </td>
        <td>
          <div>
            <div className="font-normal ">{user?.phoneNumber}</div>
            <div className="text-xs ">{user?.email}</div>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-2">
            <span className=" text-xs">{user?.role}</span>
            <div className="dropdown dropdown-right cursor-pointer">
              <label tabIndex="0" className=" m-1 cursor-pointer">
                <span>
                  <FaRegEdit className="text-lg" />
                </span>
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content  menu border mt-5 border-gray-700 rounded-sm shadow bg-base-100  w-40"
              >
                <li>
                  <label htmlFor="customerRoleConfirmModal">
                    <span onClick={() => setInputRoleId({ user: user, role: "customer" })}>Customer</span>
                  </label>
                </li>
                <li>
                  <label htmlFor="adminRoleConfirmModal">
                    <span onClick={() => setInputRoleId({ user: user, role: "admin" })}>Admin</span>
                  </label>
                </li>
                <li>
                  <label htmlFor="deliveryAgentRoleConfirmModal">
                    <span onClick={() => setInputRoleId({ user: user, role: "deliveryAgent" })}>
                      delivery agent
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>
          <span className="">{joiningDate && joiningDate}</span>
        </td>
        <td>
          <span className="">{lastJoined && lastJoined}</span>
        </td>
        <td>
          <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
            <label tabIndex="0" className=" m-1">
              <span className="btn btn-sm">
                <BsThreeDots className="text-lg" />
              </span>
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu border top-10 border-gray-700 rounded-sm shadow bg-base-100  w-40"
            >
              <li>
                <div className="">
                  <span>
                    <FiEdit className="text-success" />
                  </span>
                  <span>Edit</span>
                </div>
              </li>
              <li>
                <label htmlFor="my-modal" className="">
                  <span>
                    <MdDelete className="text-error text-lg" />
                  </span>
                  <span onClick={() => setDeleteModal(user)}>Delete</span>
                </label>
              </li>
              <li>
                <div className=" ">
                  <span>
                    <MdDetails className=" text-white text-lg" />
                  </span>
                  <span>Details</span>
                </div>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UsersTableRow;
