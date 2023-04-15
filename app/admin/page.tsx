import { prisma } from "server/db";
import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  const allUsers = await prisma.user.findMany({});
  console.log(allUsers);
  return (
    <div>
      {allUsers.map((user) => (
        <div key={user.clerkId}>
          <p>{user.clerkId}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
