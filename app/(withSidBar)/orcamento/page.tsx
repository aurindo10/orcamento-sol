import { auth, clerkClient } from "@clerk/nextjs/app-beta";
import { OrcamentoForm } from "components/templates/OrcamentoForm";

export default async function Page() {
  const { userId } = auth();
  const isUser = await clerkClient.users.getUser(userId ? userId : "");
  const user = isUser?.publicMetadata
    ? isUser
    : { publicMetadata: { worker: false, admin: false, masterAdmin: false } };
  if (!user.publicMetadata.worker) return <div>Not authorized</div>;
  return <OrcamentoForm></OrcamentoForm>;
}
