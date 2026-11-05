import type { Metadata } from "next";
import { SignupForm } from "@/components/auth-forms";
export const metadata: Metadata = { title: "Sign up" };
export default function SignupPage() {
  return <div className="container-page py-16"><SignupForm /></div>;
}
