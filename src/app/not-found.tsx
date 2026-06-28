import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-bold text-gogo-red">404</span>
      <h1 className="mt-4 font-display text-3xl font-bold">This page took a different route</h1>
      <p className="mt-3 max-w-md text-muted-text">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to planning China.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/trips" className="btn-secondary">Browse trips</Link>
      </div>
    </div>
  );
}
