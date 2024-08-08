import { Schema, Document, model } from "mongoose";

// An interface that will represent the doc in mongodb
export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  pincode: string
  question1: boolean
  question2: boolean
}

// Define a schema for the User model
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    pincode: { type: String, required: true },
    question1: { type: Boolean, default: true },
    question2: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const User = model<IUser>("user", userSchema)
export default User;