import z from "zod";

export const CreateSessionSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email or password" }),
    password: z.string({ required_error: "password is required" }).min(6, {
      message: "invalid email or password",
    }),
  }),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>["body"];
