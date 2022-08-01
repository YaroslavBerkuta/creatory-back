import ProjectSchema from "../model/project.js";


export const create = async (req, res) => {
    try {
        const {mainIMG, name, tag, link, typeSite, description, color} = req.body

        const project = new ProjectSchema({
            mainIMG, name, tag, link, typeSite, description, color
        })
        await project.save()
        return res.status(200).json({
            message: "Проект створено",
            project
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не додати створити проект"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const project = await ProjectSchema.find({})
        res.status(200).json(project)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не вдалося отримати пректи"
        })
    }
}


export const getCategory = async (req, res) => {
    try {
        let project
        const categoryName = req.params.category
        if (categoryName === "allProject") {
            project = await ProjectSchema.find({})
        } else {
            project = await ProjectSchema.find({tag: categoryName})
        }
        res.json(project)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Не вдалося знайти проект"
        })
    }
}

