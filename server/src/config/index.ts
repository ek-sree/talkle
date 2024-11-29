import dotenv from 'dotenv'
dotenv.config()

const config ={
    port: process.env.PORT || 3001,
    NODE_EN: process.env.NODE_EN,
    mongoUrl: process.env.MONGO_URI || '',
    EMAIL_NODEMAILER: process.env.EMAIL_NODEMAILER,
    PASSWORD_NODEMAILER: process.env.PASSWORD_NODEMAILER

}

export default config