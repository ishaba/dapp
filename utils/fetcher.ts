export default async function fetcher<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const result = response.json();
  return result;
}
