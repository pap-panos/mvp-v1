import Link from "next/link";
export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="mb-auto mt-20 bg-base-200 rounded-box w-sm border-base-200 p-4">
      <div className="flex-col">
        <h1 className="text-3xl font-bold p-2">Sorry, something went wrong.</h1>
        {params?.error ? (
          <p className="text-sm text-muted-foreground p-4">
            Code error: {params.error}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground p-4">
            An unspecified error occurred.
          </p>
        )}
        <div className="justify-center flex p-2">
          <Link
            href="/auth/login"
            className="btn btn-primary text-white btn-sm rounded-full"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}
