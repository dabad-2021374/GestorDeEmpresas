'user strict'

import Category from '../category/category.model.js'
import { checkUpdate } from '../utils/validator.js'

export const saveCategory = async (req, res) => {
    try {
        let data = req.body

        let category = new Category(data)
        await category.save()

        return res.send({ message: 'Category saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving category' })
    }
}
