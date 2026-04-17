import mongoose from 'mongoose';
const residentSchema = new mongoose.Schema({
  name:String, age:Number, gender:String, joinedOn:Date,
  story:String, photoUrl:String, needs:[String], healthNotes:String, familyContacts:[String]
},{ timestamps:true });
export default mongoose.model('Resident', residentSchema);
