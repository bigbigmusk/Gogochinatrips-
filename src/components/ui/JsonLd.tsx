/**
 * Renders a JSON-LD structured-data block. Server component — no client JS.
 * The payload is trusted (built from our own typed data), so dangerouslySet
 * is safe here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
