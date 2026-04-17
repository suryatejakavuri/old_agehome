import mongoose from 'mongoose';
const donationSchema = new mongoose.Schema({
  donor:{ type:mongoose.Schema.Types.ObjectId, ref:'User' },
  type:{ type:String, enum:['money','food','clothes','medical','other'], default:'money' },
  amount:Number, note:String,
  status:{ type:String, enum:['pledged','received','allocated'], default:'pledged' },
  allocationNote:String,
  residentRef:{ type:mongoose.Schema.Types.ObjectId, ref:'Resident', default:null }
},{ timestamps:true });
export default mongoose.model('Donation', donationSchema);
