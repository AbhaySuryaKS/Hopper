import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Transaction {
    transactionType: TransactionType;
    userId: Principal;
    rideId?: bigint;
    amount: bigint;
}
export interface Location {
    destination: string;
    startLocation: string;
}
export interface Ride {
    status: RideStatus;
    driverId: Principal;
    vibe: Vibe;
    femaleOnly: boolean;
    seatsTotal: bigint;
    seatsAvailable: bigint;
    dateTime: string;
    location: Location;
}
export interface Rating {
    rideId: bigint;
    reviewText: string;
    toUserId: Principal;
    stars: bigint;
    fromUserId: Principal;
}
export interface Profile {
    licensePlate?: string;
    name: string;
    role: Role;
    trustScore: number;
    email: string;
    vehicleModel?: string;
    gender: Gender;
    walletBalance: bigint;
}
export enum BookingStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum RideStatus {
    scheduled = "scheduled",
    active = "active",
    cancelled = "cancelled",
    completed = "completed"
}
export enum Role {
    driver = "driver",
    rider = "rider"
}
export enum TransactionType {
    credit = "credit",
    debit = "debit"
}
export enum Vibe {
    music = "music",
    networking = "networking",
    silent = "silent"
}
export interface backendInterface {
    createProfile(name: string, email: string, gender: Gender): Promise<void>;
    createRide(location: Location, dateTime: string, seatsTotal: bigint, femaleOnly: boolean, vibe: Vibe): Promise<bigint>;
    getAllProfiles(): Promise<Array<Profile>>;
    getRatingsByUserId(userId: Principal): Promise<Array<Rating>>;
    getRidesByDriverId(driverId: Principal): Promise<Array<Ride>>;
    getRidesByStatus(status: RideStatus): Promise<Array<Ride>>;
    getTransactionsByUserId(userId: Principal): Promise<Array<Transaction>>;
    updateBookingStatus(bookingId: bigint, newStatus: BookingStatus): Promise<void>;
    updateRideStatus(rideId: bigint, newStatus: RideStatus): Promise<void>;
    updateWalletBalance(newBalance: bigint): Promise<void>;
}
