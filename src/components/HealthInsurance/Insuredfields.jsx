import FormField from "../Input";
import PrivateInsuranceSection from "./Privateinsurancesection";
import {
  DISTRICT_OPTIONS,
  SUB_DISTRICT_OPTIONS,
  SCHEME_OPTIONS,
} from "../../hooks/Insuranceutils";

export default function InsuredFields({ register, errors, watch }) {
  return (
    <div className="space-y-10 animate-slideUp">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <BasicInsuranceInfo register={register} errors={errors} />
        </div>

        <div className="space-y-8">
          <BasicInsuranceInfoRight register={register} errors={errors} />
        </div>
      </div>

      <div className="pt-6">
        <PrivateInsuranceSection register={register} errors={errors} />
      </div>
    </div>
  );
}

function BasicInsuranceInfo({ register, errors }) {
  return (
    <div className="space-y-6">
      {/* Insurance Number */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Insurance Number
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            {...register("insuranceNumber")}
            placeholder="Insurance number"
            className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-slate-700 placeholder:text-slate-400 hover:border-slate-300"
          />
          <span className="text-red-500 text-3xl md:text-4xl font-normal">
            0
          </span>
        </div>
      </div>

      {/* Insurance Serial Number */}
      <div className="group">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Insurance Serial Number
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            {...register("insuranceSerialNumber")}
            placeholder="Insurance serial number"
            className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-slate-700 placeholder:text-slate-400 hover:border-slate-300"
          />
          <span className="text-red-500 text-3xl md:text-4xl font-normal">
            0
          </span>
        </div>
      </div>

      <FormField
        label="Expiring Date"
        name="expiringDate"
        type="date"
        register={register}
        required
        error={errors.expiringDate}
      />
    </div>
  );
}

function BasicInsuranceInfoRight({ register, errors }) {
  return (
    <div className="space-y-6">
      <FormField
        label="District"
        name="district"
        type="select"
        options={DISTRICT_OPTIONS}
        register={register}
        error={errors.district}
      />

      <FormField
        label="Sub District"
        name="subDistrict"
        type="select"
        options={SUB_DISTRICT_OPTIONS}
        register={register}
        error={errors.subDistrict}
      />

      <AdditionalInsuranceInfo register={register} errors={errors} />
      <StaffDependantInfo register={register} errors={errors} />
      <ExpiryAndSchemeInfo register={register} errors={errors} />
    </div>
  );
}

function AdditionalInsuranceInfo({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Dependant
          </label>
          <div className="flex items-center h-12">
            <input
              type="checkbox"
              {...register("dependant")}
              className="w-5 h-5 text-blue-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StaffDependantInfo({ register, errors }) {
  return (
    <div className="space-y-6">
      <FormField
        label="Co-Payer"
        name="coPayer"
        type="select"
        options={[
          { value: "", label: "None" },
          { value: "copayer1", label: "Co-Payer 1" },
          { value: "copayer2", label: "Co-Payer 2" },
        ]}
        register={register}
        error={errors.coPayer}
      />

      <FormField
        label="Ins./Staff/Dependant No."
        name="insStaffDependantNo"
        type="text"
        placeholder="Insurance/Staff/Dependant No"
        register={register}
        error={errors.insStaffDependantNo}
      />

      <FormField
        label="Staff/Dependant Name"
        name="staffDependantName"
        type="text"
        placeholder="Staff/Dependant Name"
        register={register}
        error={errors.staffDependantName}
      />
    </div>
  );
}

function ExpiryAndSchemeInfo({ register, errors }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
      <FormField
        label="Expiry Date"
        name="expiryDate"
        type="date"
        register={register}
        error={errors.expiryDate}
      />

      <FormField
        label="Scheme"
        name="scheme"
        type="select"
        options={SCHEME_OPTIONS}
        register={register}
        error={errors.scheme}
      />
    </div>
  );
}
