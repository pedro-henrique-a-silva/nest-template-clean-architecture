import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthGuard } from '@presentationguards/auth.guard'
import { join } from 'path'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN}` },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'tmp', 'uploads'),
      exclude: ['/api*'],
      serveRoot: '/files',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
