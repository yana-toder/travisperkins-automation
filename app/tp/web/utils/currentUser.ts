// app/tp/web/utils/currentUser.ts
import fs from 'fs'
import {User} from '../types/User'

export function getCurrentUser(): User {
  return JSON.parse(fs.readFileSync('playwright/.auth/user-data.json', 'utf-8'))
}
