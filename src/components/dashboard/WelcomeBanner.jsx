import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function WelcomeBanner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl px-8 py-7 text-white flex items-center justify-between gap-6">

      {/* LEFT CONTENT */}
      <div>
        <p className="text-blue-100 text-sm font-medium mb-1">
          Welcome back,
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Good Evening 👋
        </h1>

        <p className="mt-2 text-sm sm:text-base text-blue-100">
          Manage your pets, appointments and medical records from one place.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 shrink-0">

        <Button
  type="button"
  onClick={() => navigate("/pets")}
  className="
    !w-auto
    !px-5
    !py-2.5
    bg-white
    !text-blue-600
    hover:bg-white
    hover:-translate-y-0.5
    hover:shadow-md
    active:translate-y-0
    transition-all
    duration-200
    shadow-sm
    rounded-lg
    text-sm
    font-semibold
  "
>
  + Add Pet
</Button>

        <Button
          type="button"
          onClick={() => navigate("/appointments")}
          className="
            !w-auto
            !px-5
            !py-2.5
            bg-blue-700
            hover:bg-blue-800
            !text-white
            shadow-sm
            rounded-lg
            text-sm
            font-semibold
          "
        >
          Book Appointment
        </Button>

      </div>
    </div>
  );
}

export default WelcomeBanner;