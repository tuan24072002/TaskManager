import { mkdirSync, renameSync } from 'fs';

export const uploadImage = (file) => {
    if (typeof file === 'object' && !Array.isArray(file)) {
        const date = Date.now()
        let fileDir = `./uploads/files/${date}`;
        let fileName = `${fileDir}/${file.originalname}`;
        mkdirSync(fileDir, { recursive: true })
        renameSync(file.path, fileName)
        return fileName;
    } else if (Array.isArray(file)) {
        const arr = file.map((f) => {
            const date = Date.now();
            let fileDir = `uploads/files/${date}`;
            let fileName = `${fileDir}/${f.originalname}`;
            mkdirSync(fileDir, { recursive: true })
            renameSync(f.path, fileName)
            return fileName;
        })
        return arr;
    } else {
        return "";
    }
}
