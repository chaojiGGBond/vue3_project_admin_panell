export interface loginFormData {
  username: string
  password: string
}
export interface loginResponseData {
  code: number
  data: dataType
}
export interface userInfoReponseData {}
export interface dataType {
  message: string,
  data: string,
  ok: boolean
}
