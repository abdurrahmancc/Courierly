import React from "react";
import { MdClose } from "react-icons/md";
import SelectAgentsTable from "./SelectAgentsTable";

const AssignAgentModel = ({ onClose, setSelectAgent, handleAssign }) => {
  return (
    <>
      <input type="checkbox" id="AssignAgentModel" className="modal-toggle" />
      <div className="modal modal-open">
        <div className="modal-box max-w-[70rem]">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Select An Agent</h3>
            <button className="btn btn-error" onClick={onClose}>
              <MdClose />
            </button>
          </div>
          <div className="py-4">
            <SelectAgentsTable setSelectAgent={setSelectAgent} />
            <div className="flex justify-end">
              <button
                onClick={() => handleAssign()}
                className="btn btn-primary"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignAgentModel;
