import { Prisma } from '@prisma/client';

export function getPrismaModelNames(): string[] {
  return Prisma.dmmf.datamodel.models.map(model => model.name).map(model => model.toLocaleLowerCase());
}

export const models = getPrismaModelNames()
