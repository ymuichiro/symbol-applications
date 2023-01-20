import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";

export default function ButtonAppBar() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            href="/"
            style={{
              ...theme.typography.h6,
              textDecoration: "none",
              color: "white",
            }}
          >
            Profile
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
