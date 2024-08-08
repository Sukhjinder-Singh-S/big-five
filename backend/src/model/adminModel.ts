import { Schema, Document, model } from "mongoose";

export interface IAdmin extends Document{
    name:string
    email:string
    password:string
}


const adminSchema = new Schema<IAdmin>({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
},{
    timestamps:true
})

const Admin = model<IAdmin>("admin", adminSchema)
export default Admin