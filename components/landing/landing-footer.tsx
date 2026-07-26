import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-background-dark border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-slate-100 font-semibold">AI Uni Planner</span>
            <p className="text-small text-slate-500 mt-2 leading-relaxed">
              Plan smarter. Study better. Achieve more.
            </p>
          </div>

          <div>
            <p className="text-small font-medium text-slate-300 mb-3">Project</p>
            <ul className="space-y-2 text-small text-slate-500">
              <li>
                <a
                  href="https://github.com/RaminSajjad/ai-university-planner"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-300 transition"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              </li>
              <li>
                <Link href="/register" className="flex items-center gap-1.5 hover:text-slate-300 transition">
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-small font-medium text-slate-300 mb-3">Technologies</p>
            <ul className="space-y-2 text-small text-slate-500">
              <li>Next.js 15 · React · TypeScript</li>
              <li>Tailwind CSS · Prisma · PostgreSQL</li>
              <li>Groq AI</li>
            </ul>
          </div>

          <div>
            <p className="text-small font-medium text-slate-300 mb-3">Contact</p>
            <ul className="space-y-2 text-small text-slate-500">
              <li>
                <Link href="/login" className="hover:text-slate-300 transition">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-small text-slate-500 text-center">
          © {new Date().getFullYear()} AI University Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
