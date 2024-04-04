import { IsString, Length, Matches, ValidateIf } from 'class-validator';
import { NAME_REGEX } from '../../consts/regex.const';
import { isNull, isUndefined } from '../../utils/validation.utils';

export abstract class UpdateUserDto {
  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  @ValidateIf((o: UpdateUserDto) => !isUndefined(o.name) || isNull(o.name))
  public name?: string;
}
