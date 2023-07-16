import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "./uploadthing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
