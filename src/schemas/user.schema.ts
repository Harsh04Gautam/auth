import z from "zod";

export const CreateUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
      email: z
        .string({ required_error: "email is required" })
        .email({ message: "invalid email" }),
      password: z.string({ required_error: "password is required" }).min(6, {
        message: "password must consist minimum of 6 character or more",
      }),
      passwordConfirmation: z.string({
        required_error: "password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "passwords do not match",
    }),
});

export const VerifyUserSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "parameter id is required" }),
    verificationCode: z.string({
      required_error: "parameter verificationCode is required",
    }),
  }),
});

export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "invalid email" }),
  }),
});

export const ResetPasswordSchema = z.object({
  body: z
    .object({
      password: z.string({ required_error: "password is required" }).min(6, {
        message: "password must consist minimum of 6 character or more",
      }),
      passwordConfirmation: z.string({
        required_error: "password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "passwords do not match",
    }),
  params: z.object({
    id: z.string({ required_error: "parameter id is required" }),
    resetPasswordCode: z.string({
      required_error: "parameter resetPasswordCode is required",
    }),
  }),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>["body"];
export type VerifyUserInput = z.infer<typeof VerifyUserSchema>["params"];
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>["body"];
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
