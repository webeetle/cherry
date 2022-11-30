import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

const zId = z.object({id: z.string().uuid({ message: "Invalid UUID" })})

const zToDoPartial = z.object({
  description: z.string().min(1),
  done: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

const zToDo = zToDoPartial.merge(zId)

// export json schema
export const sToDo = zodToJsonSchema(zToDoPartial.merge(zId));
export const sToDoInsert = zodToJsonSchema(zToDoPartial);
export const sToDoToUpdate = zodToJsonSchema(zToDoPartial);

// extract the inferred type
export type ToDo = z.infer<typeof zToDo>;
export type ToDoToInsert = z.infer<typeof zToDoPartial>;
export type ToDoToUpdate = z.infer<typeof zToDoPartial>;