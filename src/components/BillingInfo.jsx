import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "./Button";
import FormField from "./Input";
import {
  PAYMENT_METHODS,
  PAYMENT_RESPONSIBILITY_OPTIONS,
} from "../hooks/Billingutils";
import { usePatientForm } from "../context/PatientFormContext";

export default function BillingInformation() {
  const navigate = useNavigate();
  const { updateSection, patientData } = usePatientForm();

  const { billingInfo } = patientData;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: billingInfo, // pre-fill if data exists
  });

  // Reset form if billingInfo changes (pre-fill on back)
  useEffect(() => {
    reset(billingInfo);
  }, [billingInfo, reset]);

  const paymentMethod = watch("paymentMethod");

  const handleFinalSubmit = (data) => {
    // Save billing info to context
    updateSection("billingInfo", data);

    // Navigate to preview page
    navigate("/patient/preview");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Billing Information
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Select your preferred payment method for medical services
        </p>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-slideUp">
        <div className="p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit(handleFinalSubmit)}
            className="space-y-6 sm:space-y-7"
          >
            {/* Payment Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Preferred Payment Method"
                name="paymentMethod"
                type="select"
                options={PAYMENT_METHODS}
                register={register}
                required
                error={errors.paymentMethod}
              />
              <FormField
                label="Payment Responsibility"
                name="paymentResponsibility"
                type="select"
                options={PAYMENT_RESPONSIBILITY_OPTIONS}
                register={register}
                required
                error={errors.paymentResponsibility}
              />
            </div>

            {/* Billing Address Section */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-xl font-semibold text-slate-700 mb-6">
                Billing Address
              </h3>
              <div className="space-y-6">
                <FormField
                  label="Billing Address"
                  name="billingAddress"
                  type="text"
                  placeholder="Street address"
                  register={register}
                  required
                  error={errors.billingAddress}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    label="City/Town"
                    name="billingCity"
                    type="text"
                    placeholder="City or town"
                    register={register}
                    required
                    error={errors.billingCity}
                  />
                  <FormField
                    label="Region"
                    name="billingRegion"
                    type="text"
                    placeholder="Region or state"
                    register={register}
                    required
                    error={errors.billingRegion}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    label="Postal Code"
                    name="billingPostalCode"
                    type="text"
                    placeholder="Postal code"
                    register={register}
                    error={errors.billingPostalCode}
                  />
                  <FormField
                    label="Billing Phone Number"
                    name="billingPhone"
                    type="tel"
                    placeholder="Phone number"
                    register={register}
                    required
                    error={errors.billingPhone}
                  />
                </div>

                <FormField
                  label="Billing Email Address"
                  name="billingEmail"
                  type="email"
                  placeholder="Email for billing notifications"
                  register={register}
                  error={errors.billingEmail}
                  validation={{
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-xl font-semibold text-slate-700 mb-6">
                Emergency Billing Contact (Optional)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="Emergency Contact Name"
                  name="emergencyBillingContact"
                  type="text"
                  placeholder="Name of emergency billing contact"
                  register={register}
                  error={errors.emergencyBillingContact}
                />
                <FormField
                  label="Emergency Contact Phone"
                  name="emergencyBillingPhone"
                  type="tel"
                  placeholder="Emergency contact phone"
                  register={register}
                  error={errors.emergencyBillingPhone}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="pt-6 border-t border-slate-200">
              <FormField
                label="Special Billing Instructions"
                name="specialInstructions"
                type="textarea"
                placeholder="Any special instructions or notes regarding billing..."
                register={register}
                error={errors.specialInstructions}
              />
            </div>

            {/* Buttons */}
            <Button
              onClose={handleBack}
              onSubmit={handleSubmit(handleFinalSubmit)}
              variant="submit"
            />
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-slate-500 animate-fadeIn">
        <p>
          All fields marked with <span className="text-red-500">*</span> are
          required
        </p>
      </div>
    </div>
  );
}
