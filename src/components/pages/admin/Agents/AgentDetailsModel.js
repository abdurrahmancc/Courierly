import { MdClose } from "react-icons/md";
import BookingHistoryTable from "../../customer/bookingHistory/BookingHistoryTable";
import BookingTable from "../assignAgent/BookingTable";

const AgentDetailsModel = ({ selectAgent, onClose }) => {
  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box max-w-[70rem]">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Assign Parcel</h3>
            <button className="btn btn-error" onClick={onClose}>
              <MdClose/>
            </button>
          </div>
          <div className="py-4">
            <BookingTable selectAgent={selectAgent} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentDetailsModel;
