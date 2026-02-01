// src/service/useAddBooking.js
import { useMutation } from "@tanstack/react-query";
import { addBooking } from "./addBooking";

export function useAddPatientBooking() {
  return useMutation({
    mutationFn: addBooking,
    onSuccess: (data) => {
      console.log("Patient booking added successfully!", data);
    },
    onError: (error) => {
      console.error("Failed to add patient booking:", error);
    },
  });
}
