import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint()
export class CanPassRule implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    return value === '111111' || value === '222222' || value === '333333'
  }

  defaultMessage(args: ValidationArguments) {
    return '数据不匹配'
  }
}
