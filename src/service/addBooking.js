// src/service/addBooking.js
import supabase from "./supabase";

/**
 * Adds a patient booking to Supabase.
 *
 * @param {Object} patient - Patient booking data
 * @returns {Object} - Inserted booking data from Supabase
 */

export async function addBooking(patient) {
  // Add booking to Supabase
  const { data, error } = await supabase
    .from("bookings")
    .insert([patient])
    .select()
    .single();

  if (error) {
    console.error("Failed to insert booking:", error.message);
    throw error;
  }

  // Return the inserted booking
  return data;
}
