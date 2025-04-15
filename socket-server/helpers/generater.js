import { randomBytes } from "node:crypto"

export const generateId = () => randomBytes(16).toString('hex');