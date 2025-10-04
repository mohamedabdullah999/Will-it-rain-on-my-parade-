import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { addDays, isWithinInterval } from "date-fns";
import { PickersDay } from "@mui/x-date-pickers";

export default function CalendarSection({ selectedDate, onDateChange }) {
  const start = new Date(selectedDate);
  const end = addDays(start, 7);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="mt-4 mr-30">
        <DateCalendar
          value={new Date(selectedDate)}
          onChange={(newDate) =>
            onDateChange(newDate.toISOString().split("T")[0])
          }
          calendars={2}
          slots={{
            day: (props) => {
              const isInRange = isWithinInterval(props.day, { start, end });
              return (
                <PickersDay
                  {...props}
                  sx={{
                    bgcolor: isInRange ? "rgba(20, 164, 235, 0.2)" : "inherit",
                    borderRadius: "50%",
                    "&:hover": {
                      bgcolor: isInRange
                        ? "rgba(20, 164, 235, 0.35)"
                        : "rgba(0,0,0,0.08)",
                    },
                  }}
                />
              );
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
