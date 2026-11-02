import mongoose from "mongoose";

// Curated list — kept wholesome/appropriate for an alumni network.
// Frontend chip picker must use these exact values.
export const INTERESTS_LIST = [
  "Travel",
  "Music",
  "Movies",
  "Gaming",
  "Sports",
  "Reading",
  "Cooking",
  "Photography",
  "Fitness",
  "Art",
  "Dancing",
  "Outdoors",
  "Pets",
  "Tech",
  "Foodie",
];

const educationSchema = new mongoose.Schema(
  {
    school: { type: String, trim: true, maxlength: 150, required: true },
    degree: { type: String, trim: true, maxlength: 100 },
    fieldOfStudy: { type: String, trim: true, maxlength: 100 },
    startYear: { type: Number },
    endYear: { type: Number },
  },
  { timestamps: false },
);

const workSchema = new mongoose.Schema(
  {
    company: { type: String, trim: true, maxlength: 150, required: true },
    title: { type: String, trim: true, maxlength: 100 },
    location: { type: String, trim: true, maxlength: 100 },
    startDate: { type: String, trim: true }, // e.g. "Jan 2020"
    endDate: { type: String, trim: true },
    current: { type: Boolean, default: false },
  },
  { timestamps: false },
);

const postSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    caption: { type: String, trim: true, maxlength: 200 },
  },
  { timestamps: true },
);

const socialSchema = new mongoose.Schema(
  {
    instagram: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    twitter: { type: String, trim: true, default: "" },
    facebook: { type: String, trim: true, default: "" },
    website: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      minlength: 6,
      select: false,
    },
    section: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
      uppercase: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    dob: {
      type: String,
      trim: true,
    },
    currentlyWorkingAt: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    currentCity: {
      city: { type: String, trim: true, maxlength: 100 },
      lat: { type: Number },
      lng: { type: Number },
      geocodedAt: { type: Date },
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Enter a valid phone number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    // --- Profile-editing fields ---
    about: {
      type: String,
      trim: true,
      maxlength: 400,
      default: "",
      validate: {
        validator: function (v) {
          if (!v) return true;
          const words = v.trim().split(/\s+/).filter(Boolean);
          return words.length <= 50;
        },
        message: "About must be 50 words or fewer",
      },
    },
    education: {
      type: [educationSchema],
      default: [],
    },
    work: {
      type: [workSchema],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    posts: {
      type: [postSchema],
      default: [],
    },
    social: {
      type: socialSchema,
      default: () => ({}),
    },
    resetPasswordTokenHash: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
