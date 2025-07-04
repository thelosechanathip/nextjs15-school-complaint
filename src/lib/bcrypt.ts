import bcrypt from 'bcrypt'

export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
}