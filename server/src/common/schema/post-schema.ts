import z, { TypeOf } from "zod";

export const postQuerySchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

export type postQueryType = TypeOf<typeof postQuerySchema>;
