const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const googleDrive = require('google-drive-dwn');

cmd({
    pattern: "gdrive",
    desc: "download songs.",
    category: "download",
    react: "🎃",
    filename: __filename
},
    
const drive = googleDrive({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    tokenPath: './sensitive_data/credentials.json',
    credentialsPath: './sensitive_data/token.json',
    fileDir: './statics/files',
    mimeTypes: {
      "application/vnd.google-apps.document": {
        "ext": "docx",
        "exportType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
      "application/vnd.google-apps.spreadsheet": {
        "ext": "xlsx",
        "exportType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      },
      "application/msword": {
        "ext": "doc"
      },
      "application/vnd.ms-excel": {
        "ext": "xls"
      },
      "application/pdf": {
        "ext": "pdf"
      },
      "image/png": {
        "ext": "png"
      },
      "image/jpeg": {
        "ext": "jpg"
      }
    },
    maxFileSize: 5e+7
});

drive('fileId')
  .then(res => console.log(res))
  .catch(err => console.error(err))



}catch(e){
console.log(e)
reply(`${e}`)
}
})

