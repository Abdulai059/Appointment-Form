import { Outlet } from "react-router";

export default function PatientForm() {
  return (
    <div className="min-h-screen bg-gray-100 px-0 py-0 sm:p">
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="p-5 animate-fadeIn">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
