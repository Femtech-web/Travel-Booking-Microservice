import { BaseInterfaceRepository } from '../../repositories/base/base.abstract.repository';

import { UserEntity } from '../../entities/user.entity';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {}
