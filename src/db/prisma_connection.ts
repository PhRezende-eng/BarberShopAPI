import { PrismaClient } from "@prisma/client";
import { ValidatePrismaResponse } from "../middlewares/validate_prisma_response";

const prisma = new PrismaClient();
prisma.$use(ValidatePrismaResponse.deleteAttributeFromResponseSelect);

export default prisma;
