import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  type Location = {
    startLocation : Text;
    destination : Text;
  };

  public type Gender = {
    #male;
    #female;
    #other;
  };

  public type Role = {
    #driver;
    #rider;
  };

  public type Vibe = {
    #silent;
    #music;
    #networking;
  };

  public type RideStatus = {
    #scheduled;
    #active;
    #completed;
    #cancelled;
  };

  public type BookingStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type TransactionType = {
    #debit;
    #credit;
  };

  public type Profile = {
    name : Text;
    email : Text;
    gender : Gender;
    trustScore : Float;
    walletBalance : Int;
    role : Role;
    vehicleModel : ?Text;
    licensePlate : ?Text;
  };

  public type Ride = {
    driverId : Principal;
    location : Location;
    dateTime : Text;
    seatsTotal : Int;
    seatsAvailable : Int;
    femaleOnly : Bool;
    vibe : Vibe;
    status : RideStatus;
  };

  public type Booking = {
    rideId : Nat;
    riderId : Principal;
    seatsBooked : Int;
    status : BookingStatus;
  };

  public type Transaction = {
    userId : Principal;
    amount : Int;
    transactionType : TransactionType;
    rideId : ?Nat;
  };

  public type Rating = {
    fromUserId : Principal;
    toUserId : Principal;
    rideId : Nat;
    stars : Int;
    reviewText : Text;
  };

  public type SOSAlert = {
    userId : Principal;
    rideId : Nat;
    location : Text;
    timestamp : Text;
  };

  let profiles = Map.empty<Principal, Profile>();
  let rides = Map.empty<Nat, Ride>();
  let bookings = Map.empty<Nat, Booking>();
  let transactions = Map.empty<Nat, Transaction>();
  let ratings = Map.empty<Nat, Rating>();
  let sosAlerts = Map.empty<Nat, SOSAlert>();

  var nextId = 0;

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      switch (Text.compare(profile1.name, profile2.name)) {
        case (#equal) { Text.compare(profile1.email, profile2.email) };
        case (order) { order };
      };
    };
  };

  public shared ({ caller }) func createProfile(name : Text, email : Text, gender : Gender) : async () {
    let profile : Profile = {
      name;
      email;
      gender;
      trustScore = 0.0;
      walletBalance = 0;
      role = #rider;
      vehicleModel = null;
      licensePlate = null;
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getAllProfiles() : async [Profile] {
    profiles.values().toArray().sort();
  };

  public shared ({ caller }) func createRide(location : Location, dateTime : Text, seatsTotal : Int, femaleOnly : Bool, vibe : Vibe) : async Nat {
    let rideId = nextId;
    nextId += 1;

    let ride : Ride = {
      driverId = caller;
      location;
      dateTime;
      seatsTotal;
      seatsAvailable = seatsTotal;
      femaleOnly;
      vibe;
      status = #scheduled;
    };

    rides.add(rideId, ride);
    rideId;
  };

  public query ({ caller }) func getRidesByStatus(status : RideStatus) : async [Ride] {
    rides.values().toArray().filter(func(ride) { ride.status == status });
  };

  public query ({ caller }) func getRidesByDriverId(driverId : Principal) : async [Ride] {
    rides.values().toArray().filter(func(ride) { ride.driverId == driverId });
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Nat, newStatus : BookingStatus) : async () {
    let booking = switch (bookings.get(bookingId)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };

    let updatedBooking = {
      booking with
      status = newStatus;
    };

    bookings.add(bookingId, updatedBooking);
  };

  public shared ({ caller }) func updateWalletBalance(newBalance : Int) : async () {
    let profile = switch (profiles.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) { profile };
    };

    let updatedProfile = {
      profile with
      walletBalance = newBalance;
    };

    profiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func updateRideStatus(rideId : Nat, newStatus : RideStatus) : async () {
    let ride = switch (rides.get(rideId)) {
      case (null) { Runtime.trap("Ride does not exist") };
      case (?ride) { ride };
    };

    let updatedRide = {
      ride with
      status = newStatus;
    };

    rides.add(rideId, updatedRide);
  };

  public query ({ caller }) func getTransactionsByUserId(userId : Principal) : async [Transaction] {
    transactions.values().toArray().filter(func(transaction) { transaction.userId == userId });
  };

  public query ({ caller }) func getRatingsByUserId(userId : Principal) : async [Rating] {
    ratings.values().toArray().filter(func(rating) { rating.toUserId == userId });
  };
};
