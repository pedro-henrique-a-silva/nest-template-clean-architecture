import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { IPagination } from './pagination'
import { ClientError, ServerError } from './error'

interface SwaggerResponse {
  status: number
  description: string
  type?: any
  paginated?: boolean
}

interface SwaggerParameter {
  name: string
  description: string
  type?: any
  required?: boolean
  in: 'query' | 'path'
}

interface SwaggerBody {
  description: string
  type: any
  required?: boolean
}

interface SwaggerProps {
  tags: string[]
  summary: string
  description?: string
  security?: boolean
  body?: SwaggerBody
  okPaginatedResponse?: any
  responses: SwaggerResponse[]
  parameters?: SwaggerParameter[]
}

export function Swagger(props: SwaggerProps) {
  const responseDecorators = props.responses.map((response) => {
    if (response.paginated) {
      return ApiResponse({
        description: response.description,
        status: response.status,
        schema: {
          allOf: [
            { $ref: getSchemaPath(IPagination) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(response.type) },
                },
              },
            },
          ],
        },
      })
    }

    return ApiResponse({
      status: response.status,
      description: response.description,
      ...(response.type ? { type: response.type } : { type: ClientError }),
    })
  })

  const parameterDecorators =
    props.parameters?.map((parameter) => {
      if (parameter.in === 'query') {
        return ApiQuery({
          name: parameter.name,
          description: parameter.description,
          ...(parameter.type ? { type: parameter.type } : {}),
          required: parameter.required ?? true,
        })
      }

      return ApiParam({
        name: parameter.name,
        description: parameter.description,
        ...(parameter.type ? { type: parameter.type } : {}),
        required: parameter.required ?? true,
      })
    }) || []

  const bodyDecorator = props.body
    ? ApiBody({
        description: props.body.description,
        type: props.body.type,
        required: props.body.required ?? true,
      })
    : () => {}

  const securityDecorator = props.security ? ApiBearerAuth() : () => {}

  return applyDecorators(
    securityDecorator,
    ApiTags(...props.tags),
    ApiOperation({
      summary: props.summary,
      description: props.description || '',
    }),
    ...responseDecorators,
    ...parameterDecorators,
    bodyDecorator,
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: ServerError,
    }),
  )
}
