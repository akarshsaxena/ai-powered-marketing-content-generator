import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw, Send, Pencil } from "lucide-react";

interface EmailEntry {
  id?: number;         // optional, if backend doesn’t send, can be removed
  customerId: string;  // coming from backend
  customerType: string;
  productType: string,
  email: string;
  status: string;
  createdAt?: string;  // if you later add timestamps
  isCurrent?: boolean; // frontend only, for UI
}


const SendForApproval = () => {
  const location = useLocation();
  const { customerData, customerId, content } = location.state || {};
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState<EmailEntry[]>([]);
  const [loading, setLoading] = useState(false);


  
// Fetch all emails from DB
const fetchEmails = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:8080/api/customers/get-all-emails");
    const data: EmailEntry[] = await res.json();

    // Only use the DB response, no prepending
    setEmailList(data);
  } catch (err) {
    console.error("Error fetching emails:", err);
  } finally {
    setLoading(false);
  }
};

const handleSend = async (entry:EmailEntry) => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8080/api/marketing/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cgid: entry.customerId,
        subject: `Special Offer That You Cannot Miss`,
        bodyHtml: entry.email,
      }),
    });

    if (response.ok) {
      toast.success("Email sent successfully!");
      // After sending, go back to SendForApproval page
      await fetch("http://localhost:8080/api/customers/save-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:entry.id,
          customerId: entry.customerId,     // take from entry
          customerType: entry.customerType, // take from entry
          productType: entry.productType,
          email: entry.email,
          status: "SENT",
        }),
      });
      // navigate("/send-for-approval", {
      //   state: { customerData, customerId }, // pass whatever is needed
      // });
    } else {
      toast.error("Failed to send email. Try again.");
    }
  } catch (error) {
    toast.error("Error while sending email.");
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  fetchEmails(); // initial load
  const interval = setInterval(fetchEmails, 2000); // poll every25 sec
  return () => clearInterval(interval); // cleanup on unmount
}, []);
``


  // Navigate to AdminApproval page
  const goToAdminApproval = async (entry: EmailEntry) => {
  try {
    console.log(entry)
    // Save entry in DB with status "Pending" only if it's the current unsaved one
    if (entry.isCurrent) {
      await fetch("http://localhost:8080/api/customers/save-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id:entry.id,
          customerId: entry.customerId,     // take from entry
          customerType: entry.customerType, // take from entry
          productType: entry.productType,
          email: entry.email,
          status: "Pending",
        }),
      });
    }

    // Navigate with correct data
    navigate("/AdminAproval", {
      state: {
        id:entry.id,
        customerId: entry.customerId,       // from API
        customerData: {                     // build customerData object
          customerType: entry.customerType,
        },
        productType: entry.productType,
        generatedEmail: entry.email,
      },
    });

    fetchEmails(); // refresh table after save
  } catch (err) {
    console.error("Error saving pending email:", err);
  }
};


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Email Approvals</h1>
      <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Customer Type</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
  {emailList.map((entry, index) => (
    <tr
      key={entry.id || index}
      className={`
        odd:bg-white even:bg-gray-50
        ${entry.status === "Approved" ? "bg-green-100 text-green-800" : ""}
        ${entry.status === "Rejected" ? "bg-red-100 text-red-800" : ""}
        ${entry.isCurrent ? "font-semibold" : ""}
      `}
    >
      <td className="border p-2">{entry.customerType}</td>
      <td className="border p-2 break-words">{entry.email}</td>
      <td className="border p-2">{entry.status}</td>
      <td className="border p-2">
        {entry.status === "Pending" && (
          <Button
            onClick={() => goToAdminApproval(entry)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            Approve / Reject
          </Button>
        )}
        {entry.status === "Approved" && (
          <Button
            onClick={() => handleSend(entry)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm"
          >
            Send
          </Button>
        )}
        {entry.status === "Rejected" && (
          <span className="text-red-600 font-medium">Rejected</span>
        )}
         {entry.status === "Sent" && (
          <span className="text-greed-600 font-medium">Email Sent</span>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      
    </div>
  );
};

export default SendForApproval;
