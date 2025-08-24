import { connect, disconnect } from 'mongoose';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Company from './Models/Company.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI;

async function seedCompanies() {
  await connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dataPath = join(__dirname, 'CompanyData.json');
  const raw = readFileSync(dataPath);
  const companies = JSON.parse(raw).slice(0, 300);
  await Company.deleteMany({});
  await Company.insertMany(companies);
  console.log('Seeded 300 companies!');
  disconnect();
}

seedCompanies();
