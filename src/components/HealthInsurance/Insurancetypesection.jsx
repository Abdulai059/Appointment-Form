import FormField from "../Input";
import { INSURANCE_TYPES, SCHEME_OPTIONS } from "../../hooks/Insuranceutils";

export default function InsuranceTypeSection({ register, errors }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FormField
        label="Insurance"
        name="insurance"
        type="select"
        options={INSURANCE_TYPES}
        register={register}
        required
        error={errors.insurance}
      />
      <FormField
        label="Insurance Scheme"
        name="insuranceScheme"
        type="select"
        options={SCHEME_OPTIONS}
        register={register}
        error={errors.insuranceScheme}
      />
    </div>
  );
}
