import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Send, Pencil } from "lucide-react";

interface EmailEntry {
  id?: number;         // optional, if backend doesn’t send, can be removed
  customerId: string;  // coming from backend
  customerType: string;
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



  useEffect(() => {
    fetchEmails();
  }, []);

  // Navigate to AdminApproval page
  const goToAdminApproval = async (entry: EmailEntry) => {
  try {
    // Save entry in DB with status "Pending" only if it's the current unsaved one
    if (entry.isCurrent) {
      await fetch("http://localhost:8080/api/customers/save-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: entry.customerId,     // take from entry
          customerType: entry.customerType, // take from entry
          email: entry.email,
          status: "Pending",
        }),
      });
    }

    // Navigate with correct data
    navigate("/AdminAproval", {
      state: {
        customerId: entry.customerId,       // from API
        customerData: {                     // build customerData object
          customerType: entry.customerType,
        },
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
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                  key={index}
                  className={`odd:bg-white even:bg-gray-50 ${
                    entry.isCurrent ? "font-semibold" : ""
                  }`}
                >
                  <td className="border p-2">{entry.customerType}</td>
                  <td className="border p-2 break-words">{entry.email}</td>
                  <td className="border p-2">{entry.status}</td>
                  <td className="border p-2">
                    {entry.status === "Pending" ? (
                      <Button
                        onClick={() => goToAdminApproval(entry)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        Send to Admin for Approval
                      </Button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SendForApproval;
