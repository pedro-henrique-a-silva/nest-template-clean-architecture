export {}

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload
    }
  }

  namespace Express {
    namespace Multer {
      export interface File {
        location: string
      }
    }
  }
}
