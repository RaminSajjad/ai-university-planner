import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/actions/profile";
import { ProfileForm } from "@/components/profile/profile-form";
import { AppShell } from "@/components/layout/app-shell";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await getProfile();
  if (!user) redirect("/login");

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6">
        <h1 className="text-subheading font-semibold mb-6">Profile</h1>
        <div className="card">
          <ProfileForm user={user} />
        </div>
      </div>
    </AppShell>
  );
}
