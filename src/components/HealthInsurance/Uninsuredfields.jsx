import FormField from "../Input";
import {
  DISTRICT_OPTIONS,
  SUB_DISTRICT_OPTIONS,
} from "../../hooks/Insuranceutils";

export default function UninsuredFields({ register, errors }) {
  return (
    <div className="space-y-6 animate-slideUp">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DisabledInsuranceNumber />
        <FormField
          label="District"
          name="district"
          type="select"
          options={DISTRICT_OPTIONS}
          register={register}
          error={errors.district}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DisabledSerialNumber />
        <FormField
          label="Sub District"
          name="subDistrict"
          type="select"
          options={SUB_DISTRICT_OPTIONS}
          register={register}
          error={errors.subDistrict}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          label="Expiring Date"
          name="expiringDate"
          type="date"
          register={register}
          error={errors.expiringDate}
        />
      </div>
    </div>
  );
}

function DisabledInsuranceNumber() {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Insurance Number
      </label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Not insured"
          disabled
          className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-sm text-gray-500 cursor-not-allowed"
        />
        <span className="text-red-500 text-3xl md:text-4xl font-normal">0</span>
      </div>
    </div>
  );
}

function DisabledSerialNumber() {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Insurance Serial Number
      </label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Not insured"
          disabled
          className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-sm text-gray-500 cursor-not-allowed"
        />
        <span className="text-red-500 text-3xl md:text-4xl font-normal">0</span>
      </div>
    </div>
  );
}
