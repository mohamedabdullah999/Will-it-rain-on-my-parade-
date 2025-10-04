import { Box, IconButton, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const pageTitles = {
    "/": "Dashboard",
    "/weatherexpectaions": "Weather Expectations",
  };

  const currentTitle = pageTitles[location.pathname] || "Page";
  return (
    <Box className="flex items-center justify-between p-2 shadow-md">
      {/* Title*/}
      <Typography variant="h6" className="!font-bold text-[#45464E]">
        {currentTitle}
      </Typography>

      {/* Icons*/}
      <Box className="flex items-center space-x-2">
        <IconButton>
          <NotificationsOutlinedIcon className="text-[var(--primary-dark-hover)]" />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon className="text-[var(--primary-dark-hover)]" />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon className="text-[var(--primary-dark-hover)]" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
