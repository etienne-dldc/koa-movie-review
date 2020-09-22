import * as z from "zod";

export function zodBodyValidator(schema) {
  return async function zodBodyValidatorMiddleware(ctx, next) {
    try {
      ctx.request.body = schema.parse(ctx.request.body);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ctx.throw(400, `Body Schema validation failed: ${error.toString()}`);
      }
      throw error;
    }
  };
}
