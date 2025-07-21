import React from "react";
import { useQuery } from "react-query";
import axiosPrivet from "../../../hooks/axiosPrivet";
import Loading from "../../../shared/Loading";


const SelectAgentsTable = ({setSelectAgent }) => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "getAgents",
    async () => await axiosPrivet.get("agents/getAgents"),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full h-[calc(100vh-300px)]">
        {/* ========= table start ====== */}
        <table className="table w-full ">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone / Email</th>
              <th>Areas</th>
              <th>Current Location</th>
              <th>Current Parcels</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {data?.data?.agents &&
              data.data.agents.map((agent, index) => (
                <tr
                  key={agent?._id}
                  className="hover"
                  onClick={() => {
                    setSelectAgent(agent);
                    console.log();
                  }}
                >
                  <td>
                    <input
                      type="radio"
                      name="selectAgent"
                      className="radio radio-sm"
                      value={agent._id}
                      onChange={() => setSelectAgent(agent)}
                    />
                  </td>
                  <td>
                    <span>{agent?.user?.displayName}</span>
                  </td>
                  <td>
                    <div>
                      <div className="font-normal ">
                        {agent?.user?.phoneNumber}
                      </div>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectAgentsTable;
