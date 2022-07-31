import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    mainIMG: {
        type: String, require: true
    }, name: {
        type: String, require: true
    }, tag: {
        type: Array
    }, link: {
        type: String,
        require: true
    }, typeSite: {
        type: String,
        require: true,
        default: "Corporate website"
    }, description: {
        type: String
    }, color: {
        type: String, require: true
    }
}, {timestamps: true})

export default mongoose.model("Project", ProjectSchema)