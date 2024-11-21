import { Module } from '@nestjs/common'

const myControllersModule = []

@Module({
  imports: [...myControllersModule],
  controllers: [],
  exports: [...myControllersModule],
})
export class PresentationModule {}
