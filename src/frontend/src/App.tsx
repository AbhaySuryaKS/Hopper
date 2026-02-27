import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { AppProvider, useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LandingPage } from "@/pages/LandingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CreateRidePage } from "@/pages/CreateRidePage";
import { SearchPage } from "@/pages/SearchPage";
import { TripDashboardPage } from "@/pages/TripDashboardPage";
import { ActiveRidePage } from "@/pages/ActiveRidePage";
import { WalletPage } from "@/pages/WalletPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { TimetablePage } from "@/pages/TimetablePage";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  ),
});

const createRideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-ride",
  component: () => (
    <AuthGuard>
      <CreateRidePage />
    </AuthGuard>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <AuthGuard>
      <SearchPage />
    </AuthGuard>
  ),
});

const tripRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trip",
  component: () => (
    <AuthGuard>
      <TripDashboardPage />
    </AuthGuard>
  ),
});

const activeRideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/active-ride",
  component: () => (
    <AuthGuard>
      <ActiveRidePage />
    </AuthGuard>
  ),
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: () => (
    <AuthGuard>
      <WalletPage />
    </AuthGuard>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  ),
});

const timetableRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timetable",
  component: () => (
    <AuthGuard>
      <TimetablePage />
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  createRideRoute,
  searchRoute,
  tripRoute,
  activeRideRoute,
  walletRoute,
  profileRoute,
  timetableRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
