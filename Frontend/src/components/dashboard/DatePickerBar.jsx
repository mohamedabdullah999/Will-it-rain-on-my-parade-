import { useRef, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DatePickerBar = ({ dates, selectedDate, onDateChange }) => {
  const scrollRef = useRef(null);
  const buttonsRef = useRef({});

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (buttonsRef.current[selectedDate]) {
      buttonsRef.current[selectedDate].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedDate]);

  return (
    <div className="flex items-center ">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-hidden whitespace-nowrap p-2 border rounded-md border-gray-300 flex-1"
      >
        {dates.map((date, idx) => {
          const day = new Date(date);
          const formatted = day.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <button
              key={`${date}-${idx}`}
              ref={(el) => (buttonsRef.current[date] = el)}
              onClick={() => onDateChange(date)}
              className={`px-3 py-2 rounded-md text-sm min-w-[100px] transition ${
                selectedDate === date
                  ? "bg-blue-500 text-white font-semibold"
                  : "bg-blue-100 text-gray-800 hover:bg-blue-200"
              }`}
            >
              {formatted}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll("left")}
        className="p-1 rounded-full hover:bg-gray-200"
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="p-1 rounded-full hover:bg-gray-200"
      >
        <ArrowForwardIosIcon fontSize="small" />
      </button>
    </div>
  );
};

export default DatePickerBar;
