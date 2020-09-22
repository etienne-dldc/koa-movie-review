import * as z from "zod";

export function zodQueryValidator(schema) {
  return async function zodQueryValidatorMiddleware(ctx, next) {
    try {
      ctx.request.query = schema.parse(ctx.request.query);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ctx.throw(400, "Query Schema validation failed");
      }
      throw error;
    }
  };
}
