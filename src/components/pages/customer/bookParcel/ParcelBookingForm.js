import React, { useEffect, useState } from "react";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { toast } from "react-toastify";

const ParcelBookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [calculatedCost, setCalculatedCost] = useState(0);
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "Envelope",
    parcelSize: "Small",
    isCOD: false,
    amount: 0,
    receiverName: "",
    receiverPhone: "",
  });

  const [errors, setErrors] = useState({});

  const parcelTypes = ["Envelope", "Box", "Fragile", "Other"];
  const parcelSizes = ["Small", "Medium", "Large"];

  useEffect(() => {
    if (
      formData.pickupAddress &&
      formData.deliveryAddress &&
      formData.parcelSize
    ) {
      calculateCost();
    }
  }, [
    formData.pickupAddress,
    formData.deliveryAddress,
    formData.parcelSize,
    formData.isCOD,
  ]);

  const calculateCost = () => {
    const basePrices = {
      Small: 50,
      Medium: 80,
      Large: 120,
    };
    const deliveryCharge = basePrices[formData.parcelSize] || 50;
    const distanceFee = 30;
    const codFee = formData.isCOD ? 20 : 0;

    const totalAmount = deliveryCharge + distanceFee + codFee;
    setCalculatedCost(totalAmount);
    setFormData((prev) => ({
      ...prev,
      amount: totalAmount,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.pickupAddress.trim())
      errs.pickupAddress = "Pickup address required";
    if (!formData.deliveryAddress.trim())
      errs.deliveryAddress = "Delivery address required";
    if (!formData.receiverName.trim())
      errs.receiverName = "Receiver name required";
    if (!formData.receiverPhone.trim())
      errs.receiverPhone = "Receiver phone required";
    if (formData.isCOD && (!formData.amount || formData.amount <= 0))
      errs.amount = "Amount must be > 0 for COD";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      const { data: result } = await axiosPrivet.post("parcel", formData);
      if (result?.success) {
        toast.success("Parcel booked successfully!");
        setFormData({
          pickupAddress: "",
          deliveryAddress: "",
          parcelType: "Envelope",
          parcelSize: "Small",
          isCOD: false,
          amount: 0,
          receiverName: "",
          receiverPhone: "",
        });
      } else {
        toast.error(result?.message || "Booking failed!");
      }
    } catch (error) {
      console.error("Error booking parcel:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-200 rounded-lg shadow-lg"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup Address */}
        <div className="form-control col-span-1 md:col-span-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pickup Address</legend>
            <textarea
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              rows={2}
              className={`textarea textarea-bordered w-full h-24 ${
                errors.pickupAddress ? "textarea-error" : ""
              }`}
              placeholder="Enter pickup address"
            ></textarea>
          </fieldset>
          {errors.pickupAddress && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.pickupAddress}
              </span>
            </label>
          )}
        </div>

        {/* Delivery Address */}
        <div className="form-control col-span-1 md:col-span-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Delivery Address</legend>
            <textarea
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              rows={2}
              className={`textarea textarea-bordered w-full h-24 ${
                errors.deliveryAddress ? "textarea-error" : ""
              }`}
              placeholder="Enter delivery address"
            />
          </fieldset>

          {errors.deliveryAddress && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.deliveryAddress}
              </span>
            </label>
          )}
        </div>

        {/* Parcel Type */}
        <div className="form-control">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Parcel Type</legend>
            <select
              name="parcelType"
              value={formData.parcelType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {parcelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* Parcel Size */}
        <div className="form-control">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Parcel Size</legend>
            <select
              name="parcelSize"
              value={formData.parcelSize}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {parcelSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* Receiver Name */}
        <div className="form-control">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Receiver Name</legend>
            <input
              type="text"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.receiverName ? "input-error" : ""
              }`}
              placeholder="Enter receiver's name"
            />
          </fieldset>

          {errors.receiverName && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.receiverName}
              </span>
            </label>
          )}
        </div>

        {/* Receiver Phone */}
        <div className="form-control">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Receiver Phone</legend>
            <input
              type="tel"
              name="receiverPhone"
              value={formData.receiverPhone}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.receiverPhone ? "input-error" : ""
              }`}
              placeholder="Enter receiver's phone"
            />
          </fieldset>
          {errors.receiverPhone && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.receiverPhone}
              </span>
            </label>
          )}
        </div>

        {/* Amount input (only if COD) */}

        <div className="form-control">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Amount (BDT)</legend>
            <input
              type="number"
              name="amount"
              value={calculatedCost}
              onChange={handleChange}
              min="0"
              className={`input input-bordered w-full ${
                errors.amount ? "input-error" : ""
              }`}
              placeholder="Enter amount"
            />
          </fieldset>

          {errors.amount && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.amount}</span>
            </label>
          )}
        </div>

        {/* COD Checkbox */}
        <div className="form-control  flex items-center  mt-8">
          <fieldset className="fieldset">
            <label className="label">
              <input
                type="checkbox"
                name="isCOD"
                checked={formData.isCOD}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                id="codCheckbox"
              />
              Cash on Delivery (COD)
            </label>
          </fieldset>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-8">
        
         {loading? (
              <span className="btn-loading inline-block"></span>
            ) : (
              <span>Book Parcel</span>
            )}
      </button>
    </form>
  );
};

export default ParcelBookingForm;
