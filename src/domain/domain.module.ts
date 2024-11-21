import { Module } from '@nestjs/common'

const myDomainModule = []

@Module({
  imports: [...myDomainModule],
  exports: [...myDomainModule],
})
export class DomainModule {}
