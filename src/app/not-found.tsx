import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="badge">404</p>
      <h1 className="mt-4 text-3xl font-bold text-navy-900 dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-300">
        The page you requested does not exist. Try the home page or contact us on WhatsApp.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back home
      </Link>
    </div>
  );
}
