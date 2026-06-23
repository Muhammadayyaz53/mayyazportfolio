import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(50, "Name must be 50 characters or less")
    .regex(
      /^[A-Za-z][A-Za-z\s.'-]*$/,
      "Name can only contain letters, spaces, apostrophes, periods, and hyphens",
    ),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .max(30, "Phone number is too long")
    .transform((value) => {
      // Normalize commonly entered phone formats into digits only
      const str = String(value || "");
      // Remove all non-digit characters
      let digits = str.replace(/\D/g, "");

      // If user entered a leading 0 (local format like 03160019053), convert to country code 92
      if (digits.startsWith("0") && digits.length >= 10) {
        digits = `92${digits.slice(1)}`;
      }

      // If user entered 10-digit mobile without leading 0 (e.g., 3160019053), prepend 92
      if (digits.length === 10) {
        digits = `92${digits}`;
      }

      // Ensure plus sign and return final normalized E.164-like string
      return `+${digits}`;
    })
    .refine((val) => /^\+92\d{10}$/.test(val), {
      message: "Phone must be a Pakistani mobile number, e.g. 03160019053 or +923160019053",
    }),

  subject: z
    .string()
    .trim()
    .min(2, "Subject is required")
    .max(120, "Subject must be 120 characters or less"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or less"),
});