export interface loginFormData {
  username: string
  password: string
}
export interface loginResponseData {
  code: number
  data: dataType
}
export interface dataType {
  message: string
  data: string
  ok: boolean
}
export interface userInfoReponseData extends dataType {}
