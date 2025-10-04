import { Box } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

const Layout = ({ children }) => {
  return (
    <Box className="flex">
      <Sidebar />

      <Box className="flex-1">
        <Topbar />
        <Box className="p-4">{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
