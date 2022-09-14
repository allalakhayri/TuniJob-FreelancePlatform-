import mongoose from "mongoose"
import mongooseid from "mongoose-id"
const model = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});
model.plugin(mongooseid)
//export default new mongoose.model("User", model)
export default mongoose.models['User'] || mongoose.model('User', model)