import mongoose, { Schema } from "mongoose"

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsExperience: {
        type: Number, 
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
}, {
    versionKey: false
})

export default mongoose.model('company', companySchema)