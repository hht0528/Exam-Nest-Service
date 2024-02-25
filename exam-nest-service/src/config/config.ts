import { Role } from 'src/role/role.enum'
import { adminMenus, studentMenus, teacherMenus } from './configure/menu_config'
import { routersData } from '../config/configure/menu_config'

export type UserMenuResType = {
  label: string
  key: string
  path: string
  hasMenu: boolean
}
type MenuType = Pick<UserMenuResType, 'label' | 'key'>[]

/**
 *获取用户角色对应路由菜单权限
 * @param role 角色
 * @returns
 */
export function getMenuFactory(role: Role) {
  let menus: MenuType
  switch (role) {
    case Role.STUDENT:
      menus = studentMenus
      break

    case Role.TEACHER:
      menus = teacherMenus
      break

    case Role.ADMIN:
      menus = adminMenus
      break
  }
  return menus.map((item) => {
    return {
      ...item,
      ...routersData[item.key],
    } as UserMenuResType
  })
}
