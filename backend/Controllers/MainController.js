import dotenv from 'dotenv';
dotenv.config();
import Company from '../Models/Company.js';

const Adddata = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Getdata = async (req, res) => {
  try {
    const filters = {};
    if (req.query.name) filters.name = { $regex: req.query.name, $options: 'i' };
    if (req.query.industry) filters.industry = req.query.industry;
    if (req.query.country) filters['location.country'] = req.query.country;
    if (req.query.status) filters.status = req.query.status;
    const companies = await Company.find(filters);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Updatedata = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Deletedata = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export  { Adddata, Getdata, Updatedata, Deletedata };
