import mongoose from 'mongoose';

import { IDoc } from '../@types/constants';


const docSchema = new mongoose.Schema<IDoc>({
     country: String,
     instituteName: String,
     campus: String,
     city: String,
     appFeesCAD: String,
     programCode: String,
     programName: String,
     programLevel: String,
     duration: Number,
     intake: String,
     conditional: String,
     coOp: Boolean,
     coOpDuration: String,
     fees: Number,
     aveTATBucket: String,
     degreeCode: String,
     degreeName: String,
     stream: String,
     CGPABcket: String,
     percentageBucket: Number,
     passingYear: Number,
     studyGape: Number,
     backlogs: Number,
     MOIAccepted: Boolean,
     exam: String,
     l: Number,
     r: Number,
     w: Number,
     s: Number,
     overall: Number,
     specialRequirements: String,
     programLink: String
}, {
     timestamps: true
})

export const DocModel = mongoose.model<IDoc>('Doc', docSchema);