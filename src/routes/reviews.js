import * as z from "zod";
import Router from "@koa/router";
import { movieExist, insertReview, findMovieReviews, updateReview } from "../database/index.js";
import { zodBodyValidator } from "../middlewares/zodBodyValidator.js";
import { zodQueryValidator } from "../middlewares/zodQueryValidator.js";
import { authenticated } from "../middlewares/authenticated.js";
import { allUndefined } from "../utils.js";

export const reviewsRouter = Router();

reviewsRouter.post(
  "/",
  authenticated,
  zodBodyValidator(
    z.object({
      movie_id: z.string().length(12),
      author: z.string().nonempty(),
      rating: z.number().int().min(0).max(100),
      comment: z.string(),
    })
  ),
  async (ctx) => {
    const { movie_id, author, rating, comment } = ctx.request.body;
    if (!(await movieExist(movie_id))) {
      return ctx.throw(404, "Movie not found");
    }
    const review = await insertReview(movie_id, author, rating, comment);
    ctx.body = review;
  }
);

reviewsRouter.put(
  "/:review_id",
  authenticated,
  zodBodyValidator(
    z.object({
      author: z.string().nonempty().optional(),
      rating: z.number().int().min(0).max(100).optional(),
      comment: z.string().optional(),
    })
  ),
  async (ctx) => {
    const { review_id } = ctx.params;
    const { author, rating, comment } = ctx.request.body;
    if (allUndefined(author, rating, comment)) {
      return ctx.throw(400, "Empty update");
    }
    const review = await updateReview(review_id, { author, rating, comment });
    ctx.body = review;
  }
);

reviewsRouter.get("/", zodQueryValidator(z.object({ movie_id: z.string() })), async (ctx) => {
  const { movie_id } = ctx.request.query;
  const reviews = await findMovieReviews(movie_id);
  ctx.body = reviews;
});
