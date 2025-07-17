import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosPrivet from "../../../hooks/axiosPrivet";

const SetupProfileFrom = () => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  fetchUser();
}, []);



  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-base-200 rounded-lg shadow-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Display Name */}
        <div>
          <label className="label">Display Name</label>
          <input
            type="text"
            {...register("displayName", { required: "Required" })}
            className="input input-bordered w-full"
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm">{errors.displayName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="label">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: "Required" })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="label">Role</label>
          <select
            {...register("role")}
            className="select select-bordered w-full"
          >
            <option value="customer">Customer</option>
            <option value="deliveryAgent">Delivery Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Provider */}
        <div>
          <label className="label">Provider</label>
          <select
            {...register("providerId")}
            className="select select-bordered w-full"
          >
            <option value="password">Password</option>
            <option value="google.com">Google</option>
            <option value="facebook.com">Facebook</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className="input input-bordered w-full"
          />
        </div>

        {/* NID */}
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

      {/* Vehicle Info Section (Full Width) */}
      {user?.role === "deliveryAgent" && (
        <>
          <h3 className="font-semibold mt-6 mb-2">Vehicle Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("vehicleInfo.vehicleType")}
              placeholder="Vehicle Type"
              className="input input-bordered w-full"
            />
            <input
              {...register("vehicleInfo.vehicleNumber")}
              placeholder="Vehicle Number"
              className="input input-bordered w-full"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button type="submit" className="btn btn-primary px-10">
          Register
        </button>
      </div>
    </form>
  );
};

export default SetupProfileFrom;
