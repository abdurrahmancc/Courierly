import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosPrivet from "../../../hooks/axiosPrivet";

const ParcelStatusModel = ({ parcel, setRefetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log("parcel.status", parcel);
  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivet.patch(
        `parcel/${parcel._id}/status`,
        data
      );
      toast.success("Status updated successfully");
      setRefetch((prev) => !prev);
      reset();
      document.getElementById("parcelStatusModel").checked = false;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };
  return (
    <>
      <input type="checkbox" id="parcelStatusModel" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-4">
            Update Parcel Status
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <select
              {...register("status",{ required: true })}
              className="select select-bordered w-full"
              defaultValue={parcel.status || ""}
            >
              <option value="" disabled>
                -- Select Status --
              </option>
              <option value="Pending">Pending</option>
              <option value="PickedUp">PickedUp</option>
              <option value="InTransit">InTransit</option>
              <option value="Delivered">Delivered</option>
              <option value="Failed">Failed</option>
            </select>
            {errors.status && (
              <p className="text-red-500">Status is required</p>
            )}

            <input
              {...register("customStatus",{ required: true })}
              placeholder="Custom Status"
              className="input input-bordered w-full"
            />

            <input
              {...register("message", { required: true })}
              placeholder="Message"
              className="input input-bordered w-full"
            />

            <input
              {...register("location",{ required: true })}
              placeholder="Location"
              className="input input-bordered w-full"
            />

            <div className="modal-action">
              <label htmlFor="parcelStatusModel" className="btn">
                Cancel
              </label>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ParcelStatusModel;
