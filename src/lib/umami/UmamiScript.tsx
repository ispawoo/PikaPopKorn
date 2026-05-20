export function UmamiScript() {
  const url = process.env.NEXT_PUBLIC_UMAMI_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!url || !websiteId) return null;

  return (
    <script
      async
      src={`${url}/script.js`}
      data-website-id={websiteId}
    />
  );
}
