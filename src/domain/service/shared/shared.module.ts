import { Module } from '@nestjs/common'
import { HashingService } from './hashing.service'

const myProviders = [HashingService]

@Module({
  providers: [...myProviders],
  exports: [...myProviders],
})
export class SharedModule {}
