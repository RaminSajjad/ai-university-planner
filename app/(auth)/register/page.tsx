import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12">
      <div className="card w-full max-w-sm">
        <h1 className="text-card-title font-semibold text-center mb-1">Create Account</h1>
        <p className="text-small text-center text-slate-500 dark:text-slate-400 mb-6">
          Start planning your semester
        </p>
        <RegisterForm />
      </div>
    </main>
  );
}
