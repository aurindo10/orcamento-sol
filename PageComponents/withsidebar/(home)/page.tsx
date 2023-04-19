import { currentUser } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const user = await currentUser();

  return (
    <h1 className="font-cabin  text-3xl font-bold text-slate-50">
      {`Olá ${user?.firstName}`}{" "}
    </h1>
  );
}
