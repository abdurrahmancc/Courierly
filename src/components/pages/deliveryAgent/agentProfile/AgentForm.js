import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { toast } from "react-toastify";

const AgentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Load existing agent data
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const { data } = await axiosPrivet.get("agents/getAgent");
        console.log("data", data)
        if (data?.agent) {
          reset(data.agent);
        }
      } catch (error) {
        console.log("Fetch Agent Error:", error.message);
      }
    };
    fetchAgent();
  }, [reset]);

  // Submit handler
  const onSubmit = async (formData) => {
    try {
      const response = await axiosPrivet.patch(
        "agents/updateAgentProfile",
        formData
      );
      toast.success(
        response.data.message || "Agent profile updated successfully"
      );
      reset(response.data.agent);
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">       
        {/* Vehicle Type */}
        <div>
          <label className="label">Vehicle Type</label>
          <select
            {...register("vehicleType")}
            className="select select-bordered w-full"
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="cycle">Cycle</option>
            <option value="walk">Walk</option>
          </select>
        </div>

        {/* Agent Status */}
        <div>
          <label className="label">Agent Status</label>
          <select
            {...register("agentStatus")}
            className="select select-bordered w-full"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Experience In Years */}
        <div>
          <label className="label">Experience (Years)</label>
          <input
            type="number"
            min="0"
            {...register("experienceInYears")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Areas (multiple input tags) */}
        <div className="md:col-span-2">
          <label className="label">Areas</label>
          <input
            type="text"
            {...register("areas")}
            placeholder="Comma separated areas (e.g., Dhaka, Chattogram)"
            className="input input-bordered w-full"
          />
          <small className="text-gray-500">
            Enter multiple areas separated by commas
          </small>
        </div>
      </div>

      <div className="text-end mt-6">
        <button type="submit" className="btn btn-primary px-10">
          Update Agent Profile
        </button>
      </div>
    </form>
  );
};

export default AgentForm;
