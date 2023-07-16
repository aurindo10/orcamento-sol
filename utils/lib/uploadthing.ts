// import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "server/db";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ blob: { maxFileSize: "8MB" } })
    .middleware(async ({ req, res }) => {
      return { userId: "ok" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        await prisma.xls.create({
          data: {
            url: file.url,
            fileKey: file.key,
          },
        });
        console.log("Upload complete for userId:", metadata.userId);
        console.log("file url", file.url);
      } catch (err) {
        throw new Error("Não deu certo");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
