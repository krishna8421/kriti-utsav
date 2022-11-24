import z from "zod";

const contingentSchema = z.object({
  name: z.string(), // String
  email: z.string(), // String
  mobile: z.string(), // String
  gender: z.string(), // GENDER
  address: z.string(), // String
  photoUrl: z.string(), // file
});

const participationDetailsSchema = z.object({
  eventType: z.string(), // String
  event: z.string(), // String
  name: z.string(), // String
  gender: z.string(), // String
  DOB: z.string(), // String
  modeOfParticipation: z.string(), // String
  photoUrl: z.string(), // String
});

export const formSchema = z.object({
  contingent: z.array(contingentSchema),

  arrivalDate: z.string(), // String
  arrivalTime: z.string(), // String
  arrivalMode: z.string(), // TRAVEL_MODE
  departureDate: z.string(), // String
  departureTime: z.string(), // String
  departureMode: z.string(), // TRAVEL_MODE

  contingentStrength: z.number(), // Int
  totalContingentMale: z.number(), // Int
  totalContingentFemale: z.number(), // Int

  //participation details
  participationDetails: z.array(participationDetailsSchema),

  // uploads
  eligibilityCertificatesUrl: z.string(), // file
  CurriculumVitaeUrl: z.string(), // file

  totalAmount: z.string(), // Int

  // payment confirmation
  transactionNumber: z.string(),
  transactionPhotoUrl: z.string(), // file
});
