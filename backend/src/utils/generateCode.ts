import { customAlphabet } from "nanoid"
import { Index } from "../models/Index"

let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const generatedCode = customAlphabet(alphabet, 7)

const { AccessCode } = Index

export const generateUniqueCode = async () => {

    let existCode = true
    let code = ''

    while (existCode) {
        code = generatedCode();
        const found = await AccessCode.findOne({ where: { access_code: code } });
        existCode = !!found; // if found, loop again
    }

    return code;

}