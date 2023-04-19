"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import {
  AlignBottom,
  HandCoins,
  PresentationChart,
  ShoppingCart,
} from "@phosphor-icons/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const { user, isLoaded } = useUser();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if (!isLoaded) {
    return <div className="text-slate-50">loading</div>;
  }
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {user!.publicMetadata.worker! && (
          <Link
            href={"/orcamento"}
            prefetch
            onClick={() => {
              setTitle("Sol Orçamentos"), setMobileOpen(false);
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <div className="mr-4 text-slate-50">
                  <HandCoins size={32} />
                </div>
                <label className="font-cabin font-bold text-slate-50">
                  Orçamento
                </label>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user!.publicMetadata.admin! && (
          <Link
            prefetch
            href={"/produtos"}
            onClick={() => {
              setTitle("Produtos"), setMobileOpen(false);
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <div className="mr-4 text-slate-50">
                  <AlignBottom size={32} />
                </div>
                <label className="font-cabin font-bold text-slate-50">
                  Produtos
                </label>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      <List>
        {user!.publicMetadata.masterAdmin! && (
          <Link
            prefetch
            href={"/admin"}
            onClick={() => {
              setTitle("Painel do Administrador"), setMobileOpen(false);
            }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <div className="mr-4 text-slate-50">
                  <PresentationChart size={32} />
                </div>
                <label className="font-cabin font-bold text-slate-50">
                  Painel
                </label>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex w-full items-center justify-between">
            <h1 className="font-cabin font-bold">{title}</h1>
            <div>
              <UserButton afterSignOutUrl={"https://solengenharia.app/login"} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#64748B",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#64748B",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
