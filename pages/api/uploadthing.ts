import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "utils/lib/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
