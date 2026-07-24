import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="card w-full max-w-sm">
        <h1 className="text-card-title font-semibold text-center mb-1">Welcome Back</h1>
        <p className="text-small text-center text-slate-500 dark:text-slate-400 mb-6">
          Log in to continue planning
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
