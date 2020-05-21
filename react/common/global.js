export const USER_IDENTIFIER_INTERFACE_ID = 'user-identifier'
export const SELF_APP_NAME_AND_VERSION =
  process.env.VTEX_APP_ID || process.env.VTEX_APP_NAME || null
export const ButtonBehavior = {
  POPOVER: 'popover',
  LINK: 'link',
}
export const GoogleOneTapAlignment = {
  RIGHT: 'Right',
  LEFT: 'Left',
}
export const ROOT_PATH = (__RUNTIME__ && __RUNTIME__.rootPath) || ''
