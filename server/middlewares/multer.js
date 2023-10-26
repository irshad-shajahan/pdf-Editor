import multer from "multer";

// let storage = multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,'uploads/')
//         },
//         filename:function(req, file, cb){
//             cb(null, Date.now()+'-'+file.originalname)
//         }
//     })

const storage = multer.memoryStorage();

let upload = multer({ storage: storage });
export default upload;
