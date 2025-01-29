import { z } from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const zodUserSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" })
        .optional(),
    firstname: z
        .string()
        .max(50, { message: "First name must be at most 50 characters" })
        .regex(/^[A-Za-z\s]+$/, { message: "First name must contain only letters and spaces" })
        .optional(),
    lastname: z
        .string()
        .max(50, { message: "Last name must be at most 50 characters" })
        .regex(/^[A-Za-z\s]+$/, { message: "Last name must contain only letters and spaces" })
        .optional(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .optional(),
    mobileNumber: z
        .string()
        .regex(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits" })
        .optional(),
    registrationNumber: z
        .string()
        .regex(/^\d{9}$/, { message: "Registration number must be exactly 9 digits" })
        .optional(),
    iecseMemberId: z
        .string()
        .min(1, { message: "IECSE Member ID is required" })
        .optional(),
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true, unique: true, match: /^\d{10}$/ },
    registrationNumber: { type: String, required: true, trim: true, unique: true, match: /^\d{9}$/ },
    iecseMemberId: { type: String, required: true, trim: true, unique: true },
});

userSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};

userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
