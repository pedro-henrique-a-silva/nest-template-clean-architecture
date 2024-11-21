import { ApiProperty } from '@nestjs/swagger'

export class ClientError {
  @ApiProperty() message!: string
  @ApiProperty() error!: string
  @ApiProperty() statusCode!: number
}

export class ServerError {
  @ApiProperty() message!: string
  @ApiProperty() error!: string
  @ApiProperty() statusCode!: number
}
