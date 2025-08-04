import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Dashboard } from "@/components/dashboard/dashboard";
import { validateEnv } from "@/lib/env";

export default async function Home() {
  try {
    // Verificar se o ambiente está configurado
    if (!validateEnv()) {
      redirect("/status");
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth/signin");
    }

    return <Dashboard />;
  } catch (error) {
    console.error('Error in Home page:', error);
    redirect("/status");
  }
}
