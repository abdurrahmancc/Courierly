import React from "react";
import AgentGeneralForm from "./AgentGeneralForm";
import AgentForm from "./AgentForm";

const AgentProfile = () => {
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[28px]   text-white font-bold">
          Agent Profile
        </h4>
      </div>
      <div className="bg-base-200 ">
        <div className="overflow-y-auto w-full h-[calc(100vh-202px)]">
          <div className="p-5">
            <AgentGeneralForm />
            <AgentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
