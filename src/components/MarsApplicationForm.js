"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Define Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  nationality: yup.string().required("Nationality is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Invalid Phone Number (Only digits allowed)")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
  departureDate: yup.date().required("Departure Date is required"),
  returnDate: yup.date().required("Return Date is required"),
  accommodation: yup.string().required("Accommodation preference is required"),
  healthDeclaration: yup
    .boolean()
    .oneOf([true], "Health Declaration is required"),
  emergencyContact: yup.string().required("Emergency Contact is required"),
  medicalConditions: yup.string().optional(),
});

const MarsApplicationForm = () => {
  const router = useRouter();
  const [stage, setStage] = useState(1);
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // Enables real-time validation
  });

  // Watch email and phone fields for real-time validation
  const email = watch("email");
  const phone = watch("phone");

  const onSubmit = (data) => {
    alert("Application Submitted Successfully!");
    console.log(data);
    window.location.reload();
  };

  return (
    <div className="form-container">
      <h2>Stage {stage} of 3</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Stage 1: Personal Information */}
        {stage === 1 && (
          <div>
            <h3>Personal Information</h3>
            <div className="form-group">
              <input {...register("fullName")} placeholder="Full Name" />
              <p className="error">{errors.fullName?.message}</p>
            </div>

            <div className="form-group">
              <DatePicker
                selected={watch("dateOfBirth")}
                onChange={(date) => setValue("dateOfBirth", date)}
                dateFormat="MM/dd/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100} // Show 100 years in the dropdown
                placeholderText="Select your birth date"
              />
              <p className="error">{errors.dateOfBirth?.message}</p>
            </div>

            <div className="form-group">
              <input {...register("nationality")} placeholder="Nationality" />
              <p className="error">{errors.nationality?.message}</p>
            </div>

            <div className="form-group">
              <input type="email" {...register("email")} placeholder="Email" />
              {email && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <input type="tel" {...register("phone")} placeholder="Phone" />
              {phone && errors.phone && (
                <p className="error">{errors.phone.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Stage 2: Travel Preferences */}
        {stage === 2 && (
          <div>
            <h3>Travel Preferences</h3>
            <div className="form-group">
              <label className="form-label">Departure Date:</label>
              <input
                type="date"
                {...register("departureDate")}
                className="form-input"
              />
              <p className="error">{errors.departureDate?.message}</p>
            </div>

            <div className="form-group">
              <label className="form-label">Return Date:</label>
              <input
                type="date"
                {...register("returnDate")}
                className="form-input"
              />
              <p className="error">{errors.returnDate?.message}</p>
            </div>

            <div className="form-group">
              <select {...register("accommodation")}>
                <option value="">Select Accommodation</option>
                <option value="Space Hotel">Space Hotel</option>
                <option value="Martian Base">Martian Base</option>
              </select>
              <p className="error">{errors.accommodation?.message}</p>
            </div>
          </div>
        )}

        {/* Stage 3: Health and Safety */}
        {stage === 3 && (
          <div>
            <h3>Health and Safety</h3>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" {...register("healthDeclaration")} />I
                declare that I am in good health.
              </label>
              <p className="error">{errors.healthDeclaration?.message}</p>
            </div>

            <div className="form-group">
              <input
                {...register("emergencyContact")}
                placeholder="Emergency Contact"
              />
              <p className="error">{errors.emergencyContact?.message}</p>
            </div>

            <div className="form-group">
              <textarea
                {...register("medicalConditions")}
                placeholder="Medical Conditions (Optional)"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div>
          {stage > 1 && (
            <button type="button" onClick={() => setStage(stage - 1)}>
              Back
            </button>
          )}
          {stage < 3 && (
            <button type="button" onClick={() => setStage(stage + 1)}>
              Next
            </button>
          )}
          {stage === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default MarsApplicationForm;
