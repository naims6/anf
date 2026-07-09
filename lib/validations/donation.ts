import { z } from "zod"

export const donationSchema = z.object({
  fund: z.string().min(1, "Please select a fund"),
  contact: z.string().min(1, "Phone or email is required"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Amount must be a positive number"
  ),
})

export type DonationFormData = z.infer<typeof donationSchema>
