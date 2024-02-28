import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint()
export class CanPassRule implements ValidatorConstraintInterface {
  async validate(value: string) {
    return value === '111111' || value === '222222' || value === '333333'
  }

  defaultMessage() {
    return '数据不匹配'
  }
}
