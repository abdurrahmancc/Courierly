import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { toast } from "react-toastify";

const AgentGeneralForm = () => {
const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data: userData } = await axiosPrivet.get(`users/getLoginUser`);
      setUser(userData?.user);
      reset(userData?.user)
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchUser();
}, [reset]);



  const onSubmit =async (data) => {
    try {
      const response = await axiosPrivet.patch(`users/update-user`,data);
      console.log('response.data',response.data)
      toast.success(response.data.message)
      reset(response.data.user);
    } catch (error) {
      console.log(error.message)
    }
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)}  >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Number */}
          <div>
            <label className="label">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">NID</label>
            <input
              type="text"
              {...register("NID")}
              className="input input-bordered w-full"
            />
          </div>

          {/* Driving License */}
          <div>
            <label className="label">Driving License</label>
            <input
              type="text"
              {...register("drivingLicense")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Present Address Section (Full Width) */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Present Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("presentAddress.country")}
              placeholder="Country"
              className="input input-bordered w-full"
            />
            <input
              {...register("presentAddress.district")}
              placeholder="District"
              className="input input-bordered w-full"
            />
            <input
              {...register("presentAddress.streetAddress")}
              placeholder="Street Address"
              className="input input-bordered w-full"
            />
            <input
              {...register("presentAddress.zipCode")}
              placeholder="Zip Code"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Permanent Address Section (Full Width) */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Permanent Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("permanentAddress.country")}
              placeholder="Country"
              className="input input-bordered w-full"
            />
            <input
              {...register("permanentAddress.district")}
              placeholder="District"
              className="input input-bordered w-full"
            />
            <input
              {...register("permanentAddress.streetAddress")}
              placeholder="Street Address"
              className="input input-bordered w-full"
            />
            <input
              {...register("permanentAddress.zipCode")}
              placeholder="Zip Code"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="text-end mt-6">
          <button type="submit" className="btn btn-primary px-10">
            Update General Information
          </button>
        </div>
      </form>
  );
};

export default AgentGeneralForm;
