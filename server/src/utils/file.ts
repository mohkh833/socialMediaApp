import fs from 'fs'
export const deleteFile = (filePath :any) => {
    fs.unlink(filePath, (err) =>{
        if(err){
            throw(err)
        }
    })
}
