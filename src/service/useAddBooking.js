import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPatientBooking } from "./addBooking";

export function useAddPatientBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPatientBooking,
    onSuccess: () => {
      // Invalidate the bookings query so data refreshes
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (err) => {
      console.error("Failed to add patient booking:", err);
    },
  });
}
