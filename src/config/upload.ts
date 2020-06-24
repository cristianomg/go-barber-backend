import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempfolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    directory: tempfolder,
    storage: multer.diskStorage({
        destination: tempfolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
