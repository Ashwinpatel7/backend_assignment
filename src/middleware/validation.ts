import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
  };
};