import React, { createContext, useContext, useState, ReactNode } from "react";

export type Gender = "male" | "female" | "other";
export type RideStatus = "scheduled" | "active" | "completed" | "cancelled";
export type Role = "driver" | "rider";
export type TransactionType = "credit" | "debit";
export type Vibe = "silent" | "music" | "networking";
export type BookingStatus = "pending" | "approved" | "rejected";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  trustScore: number;
  walletBalance: number;
  role: Role;
  vehicleModel?: string;
  licensePlate?: string;
  avatar?: string;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar?: string;
  driverTrustScore: number;
  vehicleModel: string;
  licensePlate: string;
  startLocation: string;
  destination: string;
  dateTime: string;
  seatsTotal: number;
  seatsAvailable: number;
  femaleOnly: boolean;
  vibe: Vibe;
  status: RideStatus;
}

export interface Booking {
  id: string;
  rideId: string;
  riderId: string;
  seatsBooked: number;
  status: BookingStatus;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  rideId?: string;
  description: string;
  date: string;
}

export interface Rating {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  rideId: string;
  stars: number;
  reviewText: string;
}

export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
}

export interface AppState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  activeRole: Role;
  rides: Ride[];
  transactions: Transaction[];
  ratings: Rating[];
  timetable: TimetableEntry[];
  login: (email: string) => void;
  loginAsDemo: () => void;
  logout: () => void;
  toggleRole: () => void;
  setActiveRole: (role: Role) => void;
}

const demoUser: UserProfile = {
  id: "user-1",
  name: "Meera Patel",
  email: "meera@college.edu",
  gender: "female",
  trustScore: 4.7,
  walletBalance: 340,
  role: "rider",
  vehicleModel: "Honda City",
  licensePlate: "KA-04-GH-7890",
};

const mockRides: Ride[] = [
  {
    id: "ride-1",
    driverId: "driver-1",
    driverName: "Rahul M.",
    driverTrustScore: 4.8,
    vehicleModel: "Toyota Innova",
    licensePlate: "KA-01-AB-1234",
    startLocation: "HSR Layout",
    destination: "IIT Campus",
    dateTime: "Tomorrow, 8:00 AM",
    seatsTotal: 3,
    seatsAvailable: 2,
    femaleOnly: false,
    vibe: "music",
    status: "scheduled",
  },
  {
    id: "ride-2",
    driverId: "driver-2",
    driverName: "Ananya K.",
    driverTrustScore: 4.9,
    vehicleModel: "Honda City",
    licensePlate: "KA-05-CD-5678",
    startLocation: "Koramangala",
    destination: "IIT Campus",
    dateTime: "Tomorrow, 8:30 AM",
    seatsTotal: 2,
    seatsAvailable: 1,
    femaleOnly: true,
    vibe: "silent",
    status: "scheduled",
  },
  {
    id: "ride-3",
    driverId: "driver-3",
    driverName: "Vikram S.",
    driverTrustScore: 4.6,
    vehicleModel: "Maruti Swift",
    licensePlate: "KA-03-EF-9012",
    startLocation: "BTM Layout",
    destination: "IIT Campus",
    dateTime: "Tomorrow, 7:45 AM",
    seatsTotal: 1,
    seatsAvailable: 1,
    femaleOnly: false,
    vibe: "networking",
    status: "active",
  },
  {
    id: "ride-4",
    driverId: "driver-1",
    driverName: "Rahul M.",
    driverTrustScore: 4.8,
    vehicleModel: "Toyota Innova",
    licensePlate: "KA-01-AB-1234",
    startLocation: "Indiranagar",
    destination: "IIT Campus",
    dateTime: "Tomorrow, 9:00 AM",
    seatsTotal: 4,
    seatsAvailable: 3,
    femaleOnly: false,
    vibe: "music",
    status: "scheduled",
  },
  {
    id: "ride-5",
    driverId: "driver-2",
    driverName: "Ananya K.",
    driverTrustScore: 4.9,
    vehicleModel: "Honda City",
    licensePlate: "KA-05-CD-5678",
    startLocation: "Whitefield",
    destination: "IIT Campus",
    dateTime: "Today, 7:30 AM",
    seatsTotal: 2,
    seatsAvailable: 0,
    femaleOnly: false,
    vibe: "silent",
    status: "completed",
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    userId: "user-1",
    amount: 15,
    type: "debit",
    rideId: "ride-5",
    description: "Ride to IIT Campus",
    date: "Yesterday",
  },
  {
    id: "tx-2",
    userId: "user-1",
    amount: 30,
    type: "credit",
    description: "Refund for cancelled ride",
    date: "2 days ago",
  },
  {
    id: "tx-3",
    userId: "user-1",
    amount: 15,
    type: "debit",
    rideId: "ride-4",
    description: "Ride to IIT Campus",
    date: "3 days ago",
  },
  {
    id: "tx-4",
    userId: "user-1",
    amount: 45,
    type: "credit",
    description: "Eco-Rider Plan activation bonus",
    date: "1 week ago",
  },
];

const mockRatings: Rating[] = [
  {
    id: "rat-1",
    fromUserId: "user-2",
    fromUserName: "Arjun R.",
    toUserId: "user-1",
    rideId: "ride-5",
    stars: 5,
    reviewText: "Excellent co-rider! Very punctual and friendly.",
  },
  {
    id: "rat-2",
    fromUserId: "driver-2",
    fromUserName: "Ananya K.",
    toUserId: "user-1",
    rideId: "ride-4",
    stars: 4,
    reviewText: "Good experience, would ride again.",
  },
  {
    id: "rat-3",
    fromUserId: "driver-1",
    fromUserName: "Rahul M.",
    toUserId: "user-1",
    rideId: "ride-3",
    stars: 5,
    reviewText: "Great passenger, on time and respectful.",
  },
];

const mockTimetable: TimetableEntry[] = [
  { day: "Mon", time: "9:00 AM", subject: "Data Structures" },
  { day: "Mon", time: "2:00 PM", subject: "OS Lab" },
  { day: "Tue", time: "11:00 AM", subject: "Networks" },
  { day: "Tue", time: "3:00 PM", subject: "Algorithms" },
  { day: "Wed", time: "9:00 AM", subject: "Data Structures" },
  { day: "Wed", time: "1:00 PM", subject: "DBMS" },
  { day: "Thu", time: "10:00 AM", subject: "Networks" },
  { day: "Thu", time: "4:00 PM", subject: "Project" },
  { day: "Fri", time: "9:00 AM", subject: "Algorithms" },
  { day: "Fri", time: "2:00 PM", subject: "Seminar" },
];

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRoleState] = useState<Role>("rider");

  const login = (email: string) => {
    const user: UserProfile = {
      ...demoUser,
      email,
      name: email.split("@")[0].replace(/\./g, " "),
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const loginAsDemo = () => {
    setCurrentUser(demoUser);
    setIsAuthenticated(true);
    setActiveRoleState("rider");
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const toggleRole = () => {
    setActiveRoleState((prev) => (prev === "rider" ? "driver" : "rider"));
  };

  const setActiveRole = (role: Role) => {
    setActiveRoleState(role);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        activeRole,
        rides: mockRides,
        transactions: mockTransactions,
        ratings: mockRatings,
        timetable: mockTimetable,
        login,
        loginAsDemo,
        logout,
        toggleRole,
        setActiveRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
