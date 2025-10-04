import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Box className="h-auto shadow-md">
      <ProSidebar collapsed={isCollapsed} width="165px">
        <Menu iconShape="square" className="h-full flex flex-col !bg-white">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              <MenuOutlinedIcon className="text-[var(--primary-dark-hover)]" />
            }
          >
            {!isCollapsed && (
              <Box className="flex justify-between items-center">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} />
              </Box>
            )}
          </MenuItem>

          <Box className="flex-1 flex flex-col justify-center mt-50">
            <MenuItem
              icon={<LayersIcon className="text-[var(--primary-dark-hover)]" />}
              component={<Link to="/" />}
              className="text-[var(--primary-dark-hover)]"
            >
              {!isCollapsed && "Dashboard"}
            </MenuItem>

            <MenuItem
              icon={
                <LocationOnOutlinedIcon className="text-[var(--primary-dark-hover)]" />
              }
              component={<Link to="/locations" />}
              className="text-[var(--primary-dark-hover)]"
            >
              {!isCollapsed && "Locations"}
            </MenuItem>

            <MenuItem
              icon={
                <CloudUploadOutlinedIcon className="text-[var(--primary-dark-hover)]" />
              }
              component={<Link to="/upload" />}
              className="text-[var(--primary-dark-hover)]"
            >
              {!isCollapsed && "Upload"}
            </MenuItem>

            <MenuItem
              icon={
                <ChatBubbleOutlineOutlinedIcon className="text-[var(--primary-dark-hover)]" />
              }
              component={<Link to="/messages" />}
              className="text-[var(--primary-dark-hover)]"
            >
              {!isCollapsed && "Messages"}
            </MenuItem>

            <MenuItem
              icon={
                <FavoriteBorderOutlinedIcon className="text-[var(--primary-dark-hover)]" />
              }
              component={<Link to="/favourits" />}
              className="text-[var(--primary-dark-hover)]"
            >
              {!isCollapsed && "Favourits"}
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
