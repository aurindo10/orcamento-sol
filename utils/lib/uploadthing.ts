// import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "server/db";
import { utapi } from "uploadthing/server";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ blob: { maxFileSize: "8MB" } })
    .middleware(async ({ req, res }) => {
      return { userId: "ok" };
    })
    .onUploadComplete(async ({ metadata, file: uploadedFile }) => {
      try {
        await prisma.$transaction(async (tx) => {
          try {
            // delete all files except the uploaded file
            const files = await utapi.listFiles();
            const allFileKeys = files.map((file) => {
              return file.key;
            });
            const allFilesUrls = await utapi.getFileUrls(allFileKeys);
            const allFilesToDelete = allFilesUrls
              .filter((item) => item.url != uploadedFile.url)
              .map((item) => {
                return item.url;
              });
            await utapi.deleteFiles(allFilesToDelete);
            // delete all files from the database
            await tx.xls.deleteMany();
            tx.xls.create({
              data: {
                url: uploadedFile.url,
                fileKey: uploadedFile.key,
              },
            });
            return { success: true };
          } catch (err) {
            throw err;
          }
        });
      } catch (err) {
        console.log(err);
        throw new Error("Não deu certo");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
