import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Dashboard } from "@/components/dashboard/dashboard";

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);

    // Se não há sessão, redirecionar para login
    if (!session) {
      redirect("/auth/signin");
    }

    // Se há sessão, mostrar o dashboard
    return <Dashboard />;
  } catch (error) {
    console.error('Error in Home page:', error);
    // Em caso de erro, redirecionar para login
    redirect("/auth/signin");
  }
}
