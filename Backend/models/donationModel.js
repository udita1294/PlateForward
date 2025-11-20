import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorId : {type : mongoose.Schema.Types.ObjectId  , ref : 'User', required : true},

  title :{type : String , required : true},
  description : {type : String , required : true},

  foodType : {type : String , enum : ['cooked','raw','packaged'], required : true},
  quantity : {type : Number , required : true},

  pickupAddress : {
    street : {type : String , required : true},
    city : {type : String , required : true},
    state : {type : String , required : true},
    pin : {type : String , required : true},
  },
  pickupDateTime : {type : Date , required : true},

  status : {type : String , enum : ['pending','accepted','collected','cancelled'], default : 'pending'},

  createdAt : {type : Date , default : Date.now}

});

export default mongoose.model("Donation", donationSchema);