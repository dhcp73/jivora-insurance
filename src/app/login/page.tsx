import type { Metadata } from "next";
import { LoginForm } from "@/components/auth-forms";
export const metadata: Metadata = { title: "Log in" };
export default function LoginPage() {
  return <div className="container-page py-16"><LoginForm /></div>;
}
