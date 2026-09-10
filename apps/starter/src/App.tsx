import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LayoutDashboard, BarChart3 } from "lucide-react";
import {
  AppShell,
  Sidebar,
  TopBar,
  type SidebarNavGroup,
  type SidebarNavItem,
} from "sila-ui";
import { DashboardPage } from "./pages/DashboardPage";

const topItem: SidebarNavItem = {
  path: "/",
  icon: <LayoutDashboard className="h-4 w-4" />,
  label: "Dashboard",
};

const groups: SidebarNavGroup[] = [
  {
    key: "reports",
    label: "Reports",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [
      {
        path: "/reports/overview",
        icon: <BarChart3 className="h-4 w-4" />,
        label: "Overview",
      },
    ],
  },
];

function Shell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppShell
      sidebar={
        <Sidebar
          brand={
            <span className="text-white font-bold text-sm">SILA STARTER</span>
          }
          topItem={topItem}
          groups={groups}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      }
      topbar={
        <TopBar
          portalName="Sila Starter"
          user={{ name: "Demo User", role: "viewer" }}
          onMobileMenuToggle={() => setMobileOpen((v) => !v)}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
