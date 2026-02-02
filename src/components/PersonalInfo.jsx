import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "./Button";

import {
  MARITAL_STATUS_OPTIONS,
  RELIGION_OPTIONS,
  GENDER_OPTIONS,
  EDUCATION_OPTIONS,
  calculateAge,
} from "../hooks/formUtils";
import FormField from "./Input";
import { usePatientForm } from "../context/PatientFormContext";
import SectionHeader from "./SectionHeader";

export default function PersonalInfoForm() {
  const navigate = useNavigate();
  const { updateSection } = usePatientForm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientType: "new", // 'new' or 'existing'
      registrationDate: "",
      recordNo: "",
      surname: "",
      otherNames: "",
      dateOfBirth: "",
      ageInYears: "",
      gender: "",
      maritalStatus: "",
      occupation: "",
      religion: "",
      educationalLevel: "",
    },
  });

  const patientType = watch("patientType");
  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    const age = calculateAge(dateOfBirth);
    setValue("ageInYears", age);
  }, [dateOfBirth, setValue]);

  const onSubmit = (data) => {
    updateSection("personalInfo", data);
    navigate("/patient/communication");
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        logoSrc="/logo-ling.webp"
        logoAlt="Hospital Logo"
        title="Personal Information"
        subtitle="Please provide your details to complete your registration"
        bgColor="bg-green-50"
        animate="animate-fadeIn"
      />

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden backdrop-blur-sm bg-opacity-95 animate-slideUp">
        <div className="p-6 sm:p-8 lg:p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-7"
          >
            {/* Patient Type Dropdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Patient Type"
                name="patientType"
                type="select"
                options={[
                  { label: "New Patient", value: "new" },
                  { label: "Existing Patient", value: "existing" },
                ]}
                register={register}
              />

              {/* Conditional Record Number Input */}
              {patientType === "existing" && (
                <FormField
                  label="Record Number"
                  name="recordNo"
                  type="text"
                  placeholder="Enter record number"
                  register={register}
                  required
                  error={errors.recordNo}
                />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Registration Date"
                name="registrationDate"
                type="date"
                register={register}
                required
                error={errors.registrationDate}
              />
              <FormField
                label="Surname"
                name="surname"
                type="text"
                placeholder="Enter surname"
                register={register}
                required
                error={errors.surname}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Other Names"
                name="otherNames"
                type="text"
                placeholder="Enter other names"
                register={register}
                required
                error={errors.otherNames}
              />
              <FormField
                label="Occupation"
                name="occupation"
                type="text"
                placeholder="Enter occupation"
                register={register}
                required
                error={errors.occupation}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-hover:text-blue-600">
                  Date Of Birth
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    {...register("dateOfBirth", { required: true })}
                    className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-slate-700 hover:border-slate-300"
                  />
                  <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-blue-700 font-semibold text-center min-w-[100px] flex items-center justify-center">
                    {watch("ageInYears") ? `${watch("ageInYears")} yrs` : "--"}
                  </div>
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    This field is required
                  </p>
                )}
              </div>

              <FormField
                label="Religion"
                name="religion"
                type="select"
                options={RELIGION_OPTIONS}
                register={register}
                required
                error={errors.religion}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                label="Gender"
                name="gender"
                type="select"
                options={GENDER_OPTIONS}
                register={register}
                required
                error={errors.gender}
              />
              <FormField
                label="Educational Level"
                name="educationalLevel"
                type="select"
                options={EDUCATION_OPTIONS}
                register={register}
                error={errors.educationalLevel}
              />
            </div>

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
