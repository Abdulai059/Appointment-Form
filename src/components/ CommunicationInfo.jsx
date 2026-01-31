import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "./Button";
import FormField from "./Input";
import { usePatientForm } from "../context/PatientFormContext";

export default function CommunicationInfo() {
  const navigate = useNavigate();
  const { updateSection } = usePatientForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postalAddress: "",
      emailAddress: "",
      homeAddress: "",
      nameOfNearestRelative: "",
      locationTown: "",
      mobileNoOfNearestRelative: "",
      mobileNumber: "",
    },
  });

  const onSubmit = (data) => {
    updateSection("communicationInfo", data);
    navigate("/patient/health");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 animate-fadeIn bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Communication Information
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Please provide your contact details and emergency contact information
        </p>
      </div>

      <div className="bg-white rounded shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-slideUp">
        <div className="p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-7"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Postal Address"
                name="postalAddress"
                type="text"
                placeholder="Postal address"
                register={register}
                required
                error={errors.postalAddress}
              />
              <FormField
                label="Email Address"
                name="emailAddress"
                type="email"
                placeholder="Email address"
                register={register}
                required
                error={errors.emailAddress}
                validation={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Home Address"
                name="homeAddress"
                type="text"
                placeholder="Home address"
                register={register}
                required
                error={errors.homeAddress}
              />
              <FormField
                label="Name Of Nearest Relative"
                name="nameOfNearestRelative"
                type="text"
                placeholder="Name of nearest relative"
                register={register}
                required
                error={errors.nameOfNearestRelative}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Location/Town"
                name="locationTown"
                type="text"
                placeholder="Location or town"
                register={register}
                required
                error={errors.locationTown}
              />
              <FormField
                label="Mobile No. of Nearest Relative"
                name="mobileNoOfNearestRelative"
                type="tel"
                placeholder="Mobile no. of nearest relative"
                register={register}
                required
                error={errors.mobileNoOfNearestRelative}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                placeholder="Mobile number"
                register={register}
                required
                error={errors.mobileNumber}
              />
            </div>

            <Button onClose={handleBack} onSubmit={handleSubmit(onSubmit)} />
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 animate-fadeIn">
        <p>
          All fields marked with <span className="text-red-500">*</span> are
          required
        </p>
      </div>
    </div>
  );
}
