import { DomainModule } from '@domain/domain.module'
import { Module } from '@nestjs/common'

const myControllersModule = [DomainModule]

@Module({
  imports: [...myControllersModule],
  controllers: [],
  exports: [...myControllersModule],
})
export class PresentationModule {}
