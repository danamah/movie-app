import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required")
      .min(2, "Name must be atleast 2 characters"),
    email: z.email(),
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must be atleast 6 characters"
      ),
    rePassword: z.string().nonempty("RePassword is Required"),
    gender: z
      .string()
      .nonempty("gender is required")
      .transform((gender) => (gender == "m" ? "male" : "female")),
    dateOfBirth: z.string().refine(
      (date) => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(date).getFullYear();
        const age = currentYear - birthYear;
        return age > 18;
      },
      { error: "Age must be atleast 18 years old" }
    ),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    error: "Password must match",
  });
