import mongoose from 'mongoose';
const storySchema = new mongoose.Schema({
  title:String, content:String, mediaUrl:String,
  resident:{ type:mongoose.Schema.Types.ObjectId, ref:'Resident', default:null },
  published:{ type:Boolean, default:true }
},{ timestamps:true });
export default mongoose.model('Story', storySchema);
