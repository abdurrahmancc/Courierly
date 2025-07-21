import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axiosPrivet from "../../../hooks/axiosPrivet";
import AgentsTableRow from "./AgentsTableRow";
import AgentDetailsModel from "./AgentDetailsModel";
import Loading from "../../../shared/Loading";

const AgentsTable = () => {
  const [selectAgent, setSelectAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useQuery(
    "getAgents",
    async () => await axiosPrivet.get("agents/getAgents"), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  }
  );


  if (isLoading) return <Loading/>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full h-[calc(100vh-300px)]">
        {/* ========= table start ====== */}
        <table className="table w-full ">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone / Email</th>
              <th>Areas</th>
              <th>Current Location</th>
              <th>Current Parcels</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {/* <!-- row 1 --> */}
            {data?.data?.agents &&
              data.data.agents.map((agent, index) => (
                <AgentsTableRow
                  key={index}
                  agent={agent}
                  index={index}
                  refetch={refetch}
                  setSelectAgent={setSelectAgent}
                  setShowModal={setShowModal}
                />
              ))}
          </tbody>
        </table>
        {/* ========= table end ====== */}
        {showModal && (
          <AgentDetailsModel
            selectAgent={selectAgent}
            onClose={() => setShowModal(false)}
            showModal={showModal}
          />
        )}
      </div>
    </div>
  );
};

export default AgentsTable;
