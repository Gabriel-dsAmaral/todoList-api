export type TDecoded = { email: string; is_superuser: boolean };

declare global {
  namespace Express {
    interface Request {
      validated: any;
      decoded: TDecoded;

      findRepository: object;
    }
  }
}
