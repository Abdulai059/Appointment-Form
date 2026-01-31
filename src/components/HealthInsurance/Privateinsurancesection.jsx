import FormField from "../Input";

export default function PrivateInsuranceSection({ register, errors }) {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h3 className="text-xl text-gray-500 font-light border-t border-gray-200 bg-gray-50 text-center mb-6 px-4 py-6 md:px-10 md:text-3xl">
        Add Private Insurance Information
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            label="Company"
            name="company"
            type="select"
            options={[
              { value: "", label: "Select Patient Company" },
              { value: "company1", label: "Company 1" },
              { value: "company2", label: "Company 2" },
            ]}
            register={register}
            error={errors.company}
          />
          <FormField
            label="Depend On (First Name)"
            name="dependFirstName"
            type="text"
            placeholder="Dependant first name"
            register={register}
            error={errors.dependFirstName}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            label="Insurance Plan"
            name="insurancePlan"
            type="select"
            options={[
              { value: "", label: "Select Plan" },
              { value: "plan1", label: "Plan 1" },
              { value: "plan2", label: "Plan 2" },
            ]}
            register={register}
            error={errors.insurancePlan}
          />
          <FormField
            label="Depend On (Other Name)"
            name="dependOtherName"
            type="text"
            placeholder="Dependant other names"
            register={register}
            error={errors.dependOtherName}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            label="Dependant?"
            name="isDependant"
            type="select"
            options={[
              { value: "", label: "Is patient a dependant?" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            register={register}
            error={errors.isDependant}
          />
          <FormField
            label="Depend On (Insurance Number)"
            name="dependInsuranceNumber"
            type="text"
            placeholder="Dependant insurance number"
            register={register}
            error={errors.dependInsuranceNumber}
          />
        </div>
      </div>
    </div>
  );
}
