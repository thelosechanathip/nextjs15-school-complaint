import { z } from "zod"

export const requestSchoolTransferSchema = z.object({
    id: z.string(),
    school_transfer_parent_pname: z.string(),
    school_transfer_parent_fname: z.string(),
    school_transfer_parent_lname: z.string(),
    school_transfer_address: z.string(),
    school_transfer_phonenumber: z.string(),
    school_transfer_student_pname: z.string(),
    school_transfer_student_fname: z.string(),
    school_transfer_student_lname: z.string(),
    school_transfer_student_class: z.string(),
    school_transfer_to: z.string(),
    school_transfer_sub_district: z.string(),
    school_transfer_district: z.string(),
    school_transfer_province: z.string(),
    school_transfer_postalnumber: z.string(),
    school_transfer_schoolphonenumber: z.string(),
    relationship_to_school_type: z.string(),
    relationship_to_school_other_details: z.string(),
    description: z.string(),
    description_details: z.string(),
    createdAt: z.date()
})
export type TRequestSchoolTransferSchema = z.infer<typeof requestSchoolTransferSchema>