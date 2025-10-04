import LocationOnIcon from "@mui/icons-material/LocationOn";

const EventForm = ({
  selectedDate,
  onDateChange,
  selectedLocation,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center gap-2 bg-white "
    >
      {/* Location */}
      <div className="flex flex-col flex-1">
        <label className="text-xs font-medium text-gray-600">Location</label>
        <div className="flex items-center border rounded-md px-2 py-1 bg-gray-50">
          <LocationOnIcon fontSize="small" className="text-blue-500 mr-1" />
          <input
            type="text"
            value={selectedLocation?.label || "Choose on map"}
            readOnly
            className="w-full text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* Date*/}
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600">Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="cursor-pointer flex flex-col mt-4 bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded-md text-sm font-medium"
      >
        Check Weather
      </button>
    </form>
  );
};

export default EventForm;
