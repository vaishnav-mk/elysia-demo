export async function load({ params }: any) {
  const response = await fetch(`http://localhost:3000/contacts`);

  const contacts: any = (await response.json()) || [];

  return { contacts };
}
