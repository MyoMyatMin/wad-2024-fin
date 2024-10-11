export default async function CustomerDetails({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  console.log(API_BASE);

  // Fetch customer details by ID from the API
  const data = await fetch(`${API_BASE}/customer/${params.id}`, {
    cache: "no-store",
  });
  const customer = await data.json();
  console.log({ customer });

  // Format the date of birth to a readable format
  const formattedDOB = new Date(customer.dateofbirth).toLocaleDateString();

  return (
    <div className="m-4">
      <h1>Customer</h1>
      <p className="font-bold text-xl text-blue-800">{customer.name}</p>
      <p>Date of Birth: {formattedDOB}</p>
      <p>Member Number: {customer.membernumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
