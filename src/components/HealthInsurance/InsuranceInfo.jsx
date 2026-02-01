import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../Button";
import InsuranceTypeSection from "./Insurancetypesection";
import UninsuredFields from "./Uninsuredfields";
import InsuredFields from "./Insuredfields";
import { usePatientForm } from "../../context/PatientFormContext";
import SectionHeader from "../SectionHeader";

export default function HealthInsurance() {
  const navigate = useNavigate();
  const { updateSection } = usePatientForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      insurance: "UN-INSURED",
      insuranceNumber: "",
      insuranceSerialNumber: "",
      expiringDate: "",
      insuranceScheme: "",
      district: "",
      subDistrict: "",
      dependant: false,
      coPayer: "",
      insStaffDependantNo: "",
      staffDependantName: "",
      expiryDate: "",
      scheme: "",
      company: "",
      insurancePlan: "",
      isDependant: "",
      dependFirstName: "",
      dependOtherName: "",
      dependInsuranceNumber: "",
    },
  });

  const insurance = watch("insurance");
  const isInsured = insurance && insurance !== "UN-INSURED";

  const onSubmit = (data) => {
    updateSection("healthInsurance", data);
    navigate("/patient/billing");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        logoSrc="/logo-ling.webp"
        logoAlt="Hospital Logo"
        title="Health Insurance Information"
        subtitle=" Please provide your health insurance details"
        bgColor="bg-green-50"
        animate="animate-fadeIn"
      />

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-slideUp">
        <div className="p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-7"
          >
            <InsuranceTypeSection register={register} errors={errors} />

            {insurance === "UN-INSURED" && (
              <UninsuredFields register={register} errors={errors} />
            )}

            {isInsured && (
              <InsuredFields
                register={register}
                errors={errors}
                watch={watch}
              />
            )}

            <Button onClose={handleBack} onSubmit={handleSubmit(onSubmit)} />
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
