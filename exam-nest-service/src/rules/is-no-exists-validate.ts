import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

// 初始化
import * as tcb from '@cloudbase/node-sdk'
import { Role } from 'src/role/role.enum'
const app = tcb.init({
  env: 'cloudbase-baas-9g1kgiaqe14a11a7',
  secretId: 'AKIDFrPzSq8IG6j8JWwJZEqaDkEetDfDh8Un',
  secretKey: 'wvRuNiEkAaBlHlN3tjXFCKSg1PtR9qgW',
  region: 'ap-guangzhou',
})

//表字段是否唯一
export function IsNotExists(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const db = app.database()
          const findParams: any = { [args.property]: value }
          //添加教师时验证是否已存在
          if (args.property === 'phone') {
            findParams.role = Role.TEACHER
          }
          const res = await db.collection(table).where(findParams).count()

          //console.log(res)

          return !Boolean(res.total)
        },
      },
    })
  }
}
