// "use client";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const { register, handleSubmit, reset } = useForm();
//   const [customers, setCustomers] = useState([]);
//   const [editMode, setEditMode] = useState(false);

//   // Function to start editing a customer, prefilling the form
//   const startEdit = (customer) => async () => {
//     setEditMode(true);
//     reset(customer);
//   };

//   // Fetch the list of customers from the backend
//   async function fetchCustomers() {
//     const data = await fetch(`/api/customer`);
//     const c = await data.json();
//     const c2 = c.map((customer) => {
//       customer.id = customer._id;
//       return customer;
//     });
//     setCustomers(c2);
//   }

//   // Function to create or update a customer based on edit mode
//   const createUserOrUpdate = async (data) => {
//     let response;

//     // Update existing customer if editMode is true
//     if (editMode) {
//       response = await fetch(`/api/customer`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         alert(`Failed to update customer: ${response.status}`);
//       } else {
//         alert("Customer updated successfully");
//       }
//     }
//     // Create a new customer if editMode is false
//     else {
//       response = await fetch(`/api/customer`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         alert(`Failed to add customer: ${response.status}`);
//       } else {
//         alert("Customer added successfully");
//       }
//     }

//     reset({
//       name: "",
//       dateofbirth: "",
//       membernumber: "",
//       interests: "",
//     });
//     setEditMode(false); // Exit edit mode
//     fetchCustomers(); // Refresh the customer list
//   };

//   // Function to delete a customer
//   const deleteById = (id) => async () => {
//     if (!confirm("Are you sure?")) return;

//     const response = await fetch(`/api/customer/${id}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       alert(`Failed to delete customer: ${response.status}`);
//     } else {
//       alert("Customer deleted successfully");
//       fetchCustomers();
//     }
//   };

//   // Fetch customers when the component is mounted
//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-row gap-4">
//         <div className="flex-1 w-64 ">
//           <form onSubmit={handleSubmit(createUserOrUpdate)}>
//             <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
//               <div>Name:</div>
//               <div>
//                 <input
//                   name="name"
//                   type="text"
//                   {...register("name", { required: true })}
//                   className="border border-black w-full"
//                 />
//               </div>
//               <div>Date of Birth:</div>
//               <div>
//                 <input
//                   name="dateofbirth"
//                   type="date"
//                   {...register("dateofbirth", { required: true })}
//                   className="border border-black w-full"
//                 />
//               </div>
//               <div>Member Number:</div>
//               <div>
//                 <input
//                   name="membernumber"
//                   type="number"
//                   {...register("membernumber", { required: true })}
//                   className="border border-black w-full"
//                 />
//               </div>
//               <div>Interests:</div>
//               <div>
//                 <textarea
//                   name="interests"
//                   {...register("interests", { required: false })}
//                   className="border border-black w-full"
//                 />
//               </div>
//               <div className="col-span-2">
//                 {editMode ? (
//                   <input
//                     type="submit"
//                     value="Update"
//                     className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//                   />
//                 ) : (
//                   <input
//                     type="submit"
//                     value="Add"
//                     className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
//                   />
//                 )}
//                 {editMode && (
//                   <button
//                     onClick={() => {
//                       reset({
//                         name: "",
//                         dateofbirth: "",
//                         membernumber: "",
//                         interests: "",
//                       });
//                       setEditMode(false);
//                     }}
//                     className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//         <div className="border m-4 bg-slate-300 flex-1 w-64">
//           <h1 className="text-2xl">Customers ({customers.length})</h1>
//           <ul className="list-disc ml-8">
//             {customers.map((c) => (
//               <li key={c._id}>
//                 <button
//                   className="border border-black p-1/2"
//                   onClick={startEdit(c)}
//                 >
//                   📝
//                 </button>{" "}
//                 <button
//                   className="border border-black p-1/2"
//                   onClick={deleteById(c._id)}
//                 >
//                   ❌
//                 </button>{" "}
//                 <Link href={`/customer/${c._id}`} className="font-bold">
//                   {c.name}
//                 </Link>{" "}
//                 - {c.interests}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// Utility to format date to YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Function to start editing a customer, prefilling the form
  const startEdit = (customer) => async () => {
    setEditMode(true);
    // Reset the form with existing customer data
    reset({
      ...customer,
      dateofbirth: formatDate(customer.dateofbirth), // Ensure DOB is in YYYY-MM-DD format
    });
  };

  // Fetch the list of customers from the backend
  async function fetchCustomers() {
    const data = await fetch(`/api/customer`);
    const c = await data.json();
    const c2 = c.map((customer) => {
      customer.id = customer._id;
      return customer;
    });
    setCustomers(c2);
  }

  // Function to create or update a customer based on edit mode
  const createUserOrUpdate = async (data) => {
    let response;

    // Update existing customer if editMode is true
    if (editMode) {
      response = await fetch(`/api/customer`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert(`Failed to update customer: ${response.status}`);
      } else {
        alert("Customer updated successfully");
      }
    }
    // Create a new customer if editMode is false
    else {
      response = await fetch(`/api/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert(`Failed to add customer: ${response.status}`);
      } else {
        alert("Customer added successfully");
      }
    }

    reset({
      name: "",
      dateofbirth: "",
      membernumber: "",
      interests: "",
    });
    setEditMode(false); // Exit edit mode
    fetchCustomers(); // Refresh the customer list
  };

  // Function to delete a customer
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    const response = await fetch(`/api/customer/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert(`Failed to delete customer: ${response.status}`);
    } else {
      alert("Customer deleted successfully");
      fetchCustomers();
    }
  };

  // Fetch customers when the component is mounted
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64 ">
          <form onSubmit={handleSubmit(createUserOrUpdate)}>
            <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
              <div>Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Date of Birth:</div>
              <div>
                <input
                  name="dateofbirth"
                  type="date"
                  {...register("dateofbirth", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Member Number:</div>
              <div>
                <input
                  name="membernumber"
                  type="number"
                  {...register("membernumber", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Interests:</div>
              <div>
                <textarea
                  name="interests"
                  {...register("interests", { required: false })}
                  className="border border-black w-full"
                />
              </div>
              <div className="col-span-2">
                {editMode ? (
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Add"
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                )}
                {editMode && (
                  <button
                    onClick={() => {
                      reset({
                        name: "",
                        dateofbirth: "",
                        membernumber: "",
                        interests: "",
                      });
                      setEditMode(false);
                    }}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <h1 className="text-2xl">Customers ({customers.length})</h1>
          <ul className="list-disc ml-8">
            {customers.map((c) => (
              <li key={c._id}>
                <button
                  className="border border-black p-1/2"
                  onClick={startEdit(c)}
                >
                  📝
                </button>{" "}
                <button
                  className="border border-black p-1/2"
                  onClick={deleteById(c._id)}
                >
                  ❌
                </button>{" "}
                <Link href={`/customer/${c._id}`} className="font-bold">
                  {c.name}
                </Link>{" "}
                - {c.interests}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
