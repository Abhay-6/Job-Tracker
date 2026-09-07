import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
       company:{
        type:String,
        required:true,
        trim:true
       },
       position:{
        type:String,
        required:true,
        trim:true
       },
       status:{
        type:String,
        required:true,
        enum:[
            'Applied',
            'Interview',
            'Rejected',
            'Selected',
            'Offer'
        ],
        default:'Applied'
       },
       jobType:{
        type:String,
        required:true,
        enum:[
            'Full-Time',
            'Part-Time',
            'Internship',
            'Contract'
        ]
       },
       location:{
        type:String,
        required:true,
        trim:true
       },
       salary:{
        type:Number,
        required:true,
        min:0
       },
       appliedDate:{
        type: Date,
        default: Date.now
       },
       jobUrl:{
        type: String
       },
       notes:{
        type: String
       },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {timestamps:true}
)

const Job = mongoose.model("Job",jobSchema)
export {Job}