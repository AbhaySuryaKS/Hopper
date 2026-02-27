# Hopper

A campus-exclusive carpooling and ride-subscription web application built for students. Hopper allows students to share rides safely, manage bookings, track rides in real-time, and use built-in safety features.

## Features

### Core
- Dual role toggle (Driver / Rider) in a single account
- Student email verification
- Ride creation and booking with seat selection
- Group booking support

### Ride Options
- Single Ride booking
- Future Booking with date/time picker
- Subscription Pass (10 / 20 / 30 rides) with dynamic price calculator
- Premium Ride toggle (Priority Pickup, Flexible Cancellations)

### Safety
- SOS button on Active Ride screen (stores alert on-chain with GPS + timestamp)
- Female-Only Ride mode (only female drivers shown)
- Route deviation detection (mock logic)
- Pre-ride confirmation reminder

### Social & Trust
- Ride Vibe matching (Silent / Music / Networking)
- Post-ride star ratings and trust score
- Save Rider / Add to Favorites
- In-app chat (unlocked after driver accepts)

### Wallet
- Credit-based wallet (simulated)
- Pay-Per-Ride, Eco-Rider Monthly, and Exam Week Pass plans
- Transaction history

### Admin Dashboard
- View all registered users with login timestamps
- View all rides, bookings, and SOS alerts
- Data persists on-chain even after logout

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Motoko (Internet Computer) |
| Hosting | ICP (Internet Computer Protocol) |
| Maps | Google Maps placeholder (mock component) |

## Pages

1. Landing / Login
2. Dashboard (Driver / Rider toggle)
3. Create Ride
4. Search Rides
5. Ride Feed
6. Trip Dashboard
7. Wallet
8. Driver Profile
9. Chat Screen
10. Active Ride (with SOS)
11. Admin Dashboard

## Demo Flow

1. Open the app and click **Continue as Demo User**
2. Toggle to **Driver** and create a ride
3. Switch to **Rider**, search for a ride, and request a seat
4. Accept the request as Driver
5. Go to **Active Ride** and press the **SOS** button to trigger a demo alert
6. End the ride -- wallet updates and rating popup appears
7. Visit the **Admin** page to view all stored data

## Data Models

- **User** -- id, name, email, gender, trustScore, walletBalance, roleToggle, vehicleModel, licensePlate
- **Ride** -- id, driverId, startLocation, destination, dateTime, seatsTotal, seatsAvailable, femaleOnly, vibe, status
- **Booking** -- id, rideId, riderId, seatsBooked, status
- **Transaction** -- id, userId, amount, type, rideId
- **Rating** -- fromUserId, toUserId, rideId, stars, reviewText
- **SOSAlert** -- userId, rideId, location, timestamp

## Customization

To swap in your brand color, update the `--primary` CSS variable in `src/frontend/src/index.css`:

```css
:root {
  --primary: <your-hex-code>;
}
```

## Backend

All data is stored on-chain in a Motoko canister (`src/backend/main.mo`) running on the Internet Computer. No external database is required.
