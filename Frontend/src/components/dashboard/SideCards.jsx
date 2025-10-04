import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SideCards = ({ selectedLocation }) => {
  return (
    <div className="space-y-4 w-[280px] mt-3">
      {/* Location */}
      <Card className="shadow-md !bg-[var(--primary-light)]">
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Location
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedLocation?.label || "Choose on map"}
          </Typography>
        </CardContent>
      </Card>

      <Link to="/weatherexpectaions" style={{ textDecoration: "none" }}>
        <Card className="shadow-md mb-4 !bg-[var(--primary-light)]">
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Weather Data
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              Weather Expectation
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Card className="shadow-md !bg-[var(--primary-light)]">
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Risk Alerts
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            Quick summary of potential risks
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default SideCards;
