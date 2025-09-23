import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EmailEntry {
  id?: number; // optional since current email may not have DB id yet
  customerType: string;
  email: string;
  status: string;
  createdAt?: string;
  isCurrent?: boolean;
}

const SendForApproval = () => {
  const location = useLocation();
  const { customerData, customerId, content } = location.state || {};
  const navigate = useNavigate();
  const [emailList, setEmailList] = useState<EmailEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/customers/get-all-emails");
      const data: EmailEntry[] = await res.json();

      // Add current email as first row if exists
      const currentEmail: EmailEntry | null = content
        ? {
            customerType: customerData?.customerType || "UNKNOWN",
            email: content,
            status: "Pending",
            isCurrent: true,
          }
        : null;

      if (currentEmail) {
        setEmailList([currentEmail, ...data]);
      } else {
        setEmailList(data);
      }
    } catch (err) {
      console.error("Error fetching emails:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleApproveReject = async (entry: EmailEntry, newStatus: string) => {
    try {
      await fetch("http://localhost:8080/api/customers/save-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customerId || entry.id,
          customerType: entry.customerType,
          email: entry.email,
          status: newStatus,
        }),
      });
      navigate("/suggested-content", {
        state: {
          customerData,
          customerId,
          generatedEmail: content, // so SuggestedContent still sees the email
          approved: newStatus == "Approved",          // 👈 flag to enable Send
        },
      });
      fetchEmails(); // Refresh table after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Email Approvals</h1>

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
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emailList.map((entry, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2">{entry.customerType}</td>
                  <td className="border p-2 break-words">{entry.email}</td>
                  <td className="border p-2">{entry.status}</td>
                  <td className="border p-2 flex gap-2">
                    {entry.isCurrent ? (
                      <>
                        <Button
                          onClick={() => handleApproveReject(entry, "Approved")}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleApproveReject(entry, "Rejected")}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        >
                          Reject
                        </Button>
                      </>
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
