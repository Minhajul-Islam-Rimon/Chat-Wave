import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();


const seedUsers = [
    // Female Users
    {
      email: "moushumi.saha@example.com",
      fullName: "Moushumi Saha",
      password: "123456",
      profilePic: "https://i.pravatar.cc/150?img=47",
    },
    {
      email: "laboni.chakraborty@example.com",
      fullName: "Laboni Chakraborty",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      email: "meher.naznin@example.com",
      fullName: "Meher Naznin",
      password: "123456",
      profilePic: "https://i.pravatar.cc/150?img=60",
    },
  
    //  Male Users
    {
      email: "arif.hossain@example.com",
      fullName: "Arif Hossain",
      password: "123456",
      profilePic: "https://i.pravatar.cc/150?img=12",
    },
    {
      email: "rifat.khan@example.com",
      fullName: "Rifat Khan",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      email: "sourav.rahman@example.com",
      fullName: "Sourav Rahman",
      password: "123456",
      profilePic: "https://i.pravatar.cc/150?img=5",
    },
  
    //  Female Users
    {
      email: "sophia.davis@example.com",
      fullName: "Sophia Davis",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      email: "ava.wilson@example.com",
      fullName: "Ava Wilson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  
    //  Male Users
    {
      email: "james.anderson@example.com",
      fullName: "James Anderson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "henry.jackson@example.com",
      fullName: "Henry Jackson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
    email: "tamanna.akter@example.com",
    fullName: "Tamanna Akter",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
    email: "nabila.ferdous@example.com",
    fullName: "Nabila Ferdous",
    password: "123456",
    profilePic: "https://i.pravatar.cc/150?img=48",
    },
    {
    email: "zahid.hasan@example.com",
    fullName: "Zahid Hasan",
    password: "123456",
    profilePic: "https://i.pravatar.cc/150?img=22",
    },
     {
    email: "farhan.ahmed@example.com",
    fullName: "Farhan Ahmed",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
     },
     {
    email: "bijoy.banik@example.com",
    fullName: "Bijoy Banik",
    password: "123456",
    profilePic: "https://i.pravatar.cc/150?img=37",
    },
];

const seedDatabase = async () => {
    try {
      await connectDB();
  
      await User.insertMany(seedUsers);
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };
  
  // Call the function
  seedDatabase();