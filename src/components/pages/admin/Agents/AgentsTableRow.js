import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { format } from "date-fns";
import { MdDelete, MdDetails } from "react-icons/md";

const AgentsTableRow = ({
  agent,
  index,
  setSelectAgent,
  setShowModal,
}) => {
console.log("agent", agent)
  return (
    <tr
      key={agent?._id}
      className="hover"
      onClick={() => {
        setSelectAgent(agent);
        setShowModal(true);
      }}
    >
      <th>{index + 1}</th>
      <td>
        <span>{agent?.user?.displayName}</span>
      </td>
      <td>
        <div>
          <div className="font-normal ">{agent?.user?.phoneNumber}</div>
          <div className="text-xs ">{agent?.user?.email}</div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span className=" text-xs">{agent?.areas[0]}</span>
        </div>
      </td>
      <td></td>
      <td>
        {agent?.currentParcels?.length > 0
          ? agent?.currentParcels?.length
          : "No parcels"}
      </td>
      <td>
        <span className=" text-xs">
          {agent?.rating > 0 ? agent?.rating : "N/A"}
        </span>
      </td>
      <td>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className=" m-1">
            <span>
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
                <span>Delete</span>
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
  );
};

export default AgentsTableRow;
