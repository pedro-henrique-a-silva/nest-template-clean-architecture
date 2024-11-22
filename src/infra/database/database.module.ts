import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

const myProviders = [PrismaService]

@Module({
  providers: [...myProviders],
  exports: [...myProviders],
})
export class DatabaseModule {}
