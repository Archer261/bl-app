import util from 'util';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dbConfig from '../config/db';

const storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg'];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-bezkoder-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: dbConfig.imgBucket,
            filename: `${Date.now()}-bezkoder-${file.originalname}`,
        };
    },
});

const uploadFiles = multer({ storage: storage }).single('file');
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;