import { Schema, model } from 'mongoose';

const CompanySchema = new Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  foundedYear: { type: Number },
  employees: { type: Number },
  location: {
    city: String,
    state: String,
    country: String
  },
  revenue: { type: String },
  status: { type: String },
  website: { type: String }
});

export default model('Company', CompanySchema);
