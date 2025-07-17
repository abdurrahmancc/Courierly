import React from "react";
import { useForm } from "react-hook-form";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { toast } from "react-toastify";

const CancelBookingModel = ({
  cancelBookModal,
  setCancelBookModal,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivet.patch(
        `parcel/cancel/${cancelBookModal?._id}`,
        { reason: data.reason }
      );
      toast.success("Parcel cancelled successfully")
      setCancelBookModal(null);
      reset();
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <input type="checkbox" id="CancelBooking" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Cancel Reason</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Enter cancel reason"
                {...register("reason", { required: "Reason is required" })}
              ></textarea>
              {errors.reason && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="modal-action gap-5 justify-center">
              <label
                htmlFor="CancelBooking"
                className="btn btn-sm btn-success text-neutral"
                onClick={() => setCancelBookModal(null)}
              >
                Cancel
              </label>
              <button type="submit" className="btn btn-sm btn-error text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CancelBookingModel;
