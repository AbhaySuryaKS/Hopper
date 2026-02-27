# Hopper — Campus Carpooling Platform

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full multi-page React SPA (React Router) with all 10 pages
- Landing/Login page with college email verification and Demo User button
- Dashboard with Driver/Rider role toggle
- Create Ride page (start/destination, date/time, seats, female-only toggle, vibe selection)
- Search Rides page with filters (location, time, female-only, vibe)
- Ride Feed with card-based layout, status badges, trust score badges, vibe pills, pink shield for female-only
- Trip Dashboard with driver/rider details, car model, plate, live status
- Wallet Page with balance, transaction history, subscription plans (Pay-Per-Ride, Eco-Rider Monthly, Exam Week Pass)
- Driver Profile page with rating, vehicle info, total rides
- Chat Screen (slide-out panel) unlocked after driver accepts
- Active Ride Screen with SOS button, route deviation mock alert, map placeholder
- Split-screen dashboard layout: left panel for booking/management, right panel for mock map
- Mock map component with glowing polyline (Bengaluru route), animated vehicle icon (animate-pulse), bus stop markers (animate-bounce), floating "Incoming Pickup Request" overlay with Accept/Decline
- Student Identity Verified banner (SheerID)
- Ride Options Tabs: Single Ride, Future Booking (date/time picker), Subscription Pass
- Subscription Pass card with ride count selector (10/20/30) and dynamic price calculator
- Premium Ride toggle with Priority Pickup and Flexible Cancellations badge
- Payment Gateway UI: UPI (QR code placeholder + Open UPI App button) and Cash
- Active Ride bottom drawer: driver/rider profile card, vehicle details, ETA, Live Chat button, Call button
- Save Rider / Add to Favorites button, Make Friend icon
- Skeleton loading states for route details
- Tailwind animations throughout (animate-pulse, animate-bounce)
- Seeded mock data: 3 drivers, 5 rides, 2 riders, sample timetable
- Pre-Ride Checklist Notification reminder card
- Timetable Sync mock with auto-suggested rides

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Set up React SPA with React Router, Tailwind CSS, shadcn components
2. Create mock data store (context) with users, rides, bookings, transactions, ratings, SOS alerts
3. Build shared layout components: Navbar, Sidebar, RoleToggle
4. Build MockMap component with SVG polyline, animated markers, vehicle pulse, pickup request overlay
5. Build Landing/Login page
6. Build Dashboard page with split-screen layout
7. Build Create Ride page
8. Build Search Rides + Ride Feed page
9. Build Trip Dashboard page
10. Build Wallet page with plans
11. Build Driver Profile page
12. Build Chat Screen (slide-out)
13. Build Active Ride Screen with SOS
14. Build Booking Panel with tabs, subscription card, premium toggle, payment UI
15. Wire all navigation and state transitions

## UX Notes
- Mobile-first, card-based design throughout
- Primary brand color via CSS variable (--primary) swappable later
- Female-only rides: pink shield icon
- Vibe tags as colored pills (Silent=blue, Music=purple, Networking=green)
- Trust score shown as star badge
- Status badges: Scheduled (yellow), Active (green), Completed (gray), Cancelled (red)
- Smooth slide transitions for drawers and panels
- Demo mode button on login bypasses auth
- SOS triggers a modal alert to "Campus Security"
- Route deviation shows a warning toast/modal
