'user strict'

import Company from '../company/company.model.js'
import { checkUpdate } from '../utils/validator.js'
import ExcelJS from 'exceljs'

export const saveCompany = async (req, res) => {
    try {
        let data = req.body

        let company = new Company(data)
        await company.save()

        return res.send({ message: 'Company saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving company' })
    }
}

export const updateCompany = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'You have sent data that cannot be updated' })
        let updateCompany = await Company.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateCompany) return res.status(404).send({ message: 'Company not found and not updated' })
        return res.send({ message: 'Company updated successfully', updateCompany })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating Company' })
    }
}

export const getCompanies = async (req, res) => {
    try {
        let companies = await Company.find().populate('category', ['name', 'description']);
        return res.send({ companies });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching companies with category', err: err });
    }
}


export const filterAZ = async (req, res) => {
    try {
        let companies = await Company.find().sort({ name: 1 })
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching companies' })
    }
}

export const filterZA = async (req, res) => {
    try {
        let companies = await Company.find().sort({ name: -1 })
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching companies' })
    }
}

export const filterYearsExperience = async (req, res) => {
    try {
        let companies = await Company.find().sort({ yearsExperience: -1 })

        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching companies' })
    }
}

export const filterCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const companies = await Company.find({ category });
        if (!companies.length) return res.status(404).send({ message: 'Companies not found' });
        return res.send({ message: 'Companies found', companies });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching companies' });
    }
}

export const generateExcel = async (req, res) => {
    try {
        let companies = await Company.find().populate('category', ['name', 'description']);

        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('Companies');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 30 },
            { header: 'Years of Experience', key: 'yearsExperience', width: 30 },
            { header: 'Contact', key: 'contact', width: 30 },
            { header: 'Category', key: 'category', width: 30 }
        ];

        worksheet.getRow(1).font = { bold: true, size: 14 };
        worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center' };


        worksheet.getCell('A1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.getCell('B1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.getCell('C1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.getCell('D1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.getCell('E1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        worksheet.getCell('F1').border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };

        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                description: company.description,
                impactLevel: company.impactLevel,
                yearsExperience: company.yearsExperience,
                contact: company.contact,
                category: company.category.name
            });
        });

        let filePath = 'ExcelCompanies - Gestor empresas.xlsx';
        await workbook.xlsx.writeFile(filePath);

        res.attachment(filePath);

        return res.send({ message: 'File Excel created in the root folder' })

        res.send();
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error found companies and generating Excel', err: err });
    }
}