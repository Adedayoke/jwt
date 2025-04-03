import z, { TypeOf } from "zod";

export const signUpSchema = z
  .object({
    body: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("A valid email is needed"),
      password: z
        .string()
        .min(8, "the password should be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(8, "the password should be at least 8 characters"),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpType = TypeOf<typeof signUpSchema>["body"];

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email("A valid email is needed"),
    password: z.string().min(8, "the password should be at least 8 characters"),
  }),
});

export type signinType = TypeOf<typeof signInSchema>["body"];
