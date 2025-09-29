import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin } from "lucide-react";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [error, setError] = useState("");

  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    customerType: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    contentRequirement: "",
  });

  const [productType,setProductType] = useState("");

  const marketingOptionsByType: Record<string, string[]> = {
    Regular: [
      "Personal Loan Offers",
      "Savings Account Benefits",
      "Credit Card Rewards Program",
      "Car Loan Financing Options",
      "Fixed Deposit Investment Plans",
    ],
    Corporate: [
      "Corporate Loan Solutions",
      "Payroll Account Benefits",
      "Business Credit Cards",
      "Employee Insurance Packages",
      "Working Capital Financing",
    ],
    Premium: [
      "Exclusive Wealth Management Services",
      "Premium Credit Card Rewards",
      "High-Value Insurance Policies",
      "Priority Banking Services",
      "Retirement Planning Solutions",
    ],
    HNI: [
      "Ultra High Net Worth Investment Plans",
      "Private Banking Privileges",
      "Global Investment Opportunities",
      "Exclusive Mutual Fund Investment Offers",
      "Bespoke Wealth Management Services",
    ],
  };
  const selectedMarketingOptions =
    marketingOptionsByType[customerData.customerType] || [];

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const customerTypeOptions = ["Regular", "Corporate", "Premium", "HNI"];

  // Dropdown options for new fields
  const offerTypeOptions = ["Introductory", "Festival", "Loyalty-based", "Referral"];
  const offerTierOptions = ["Basic", "Premium", "Exclusive"];
  const interestRateOptions = ["5%", "6%", "7%", "8%"];
  const processingFeeOptions = ["No Fee", "1%", "2%"];
  const repaymentTenureOptions = ["6 months", "12 months", "24 months"];
  const specialConditionsOptions = ["Salaried customers only", "Metro cities only", "No special condition"];

  const subjectLineOptions = ["Promotional", "Informational", "Personalized"];
  const headerBannerOptions = ["Exciting Offer", "Limited Time", "Special Deal"];
  const visualsOptions = ["Include Visuals", "No Visuals"];
  const ctaButtonOptions = ["Apply Now", "Know More", "Book a Call"];
  const greetingOptions = ["Dear Mr./Ms.", "Hi", "Hello"];
  const signatureBlockOptions = ["RM Contact Info", "Branch Details", "Company Signature"];

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCustomerData(prev => ({
            ...prev,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            customerType: data.customerType,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
          }));
        } else if (response.status === 404) {
          setError("Customer not found");
        } else {
          setError("Something went wrong while fetching customer data.");
        }
      } catch (err) {
        setError("Unable to reach backend. Make sure Spring Boot is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  // Helper: update contentRequirement as key-value
  const handleContentRequirementChange = (key: string, value: string) => {
    if(key === "Marketing Option"){
      setProductType(value);
    }
    const lines = customerData.contentRequirement
      .split("\n")
      .filter(line => !line.startsWith(`${key}:`));

    const newLine = `${key}: ${value}`;
    const updatedContent = [...lines, newLine].join("\n");

    setCustomerData(prev => ({
      ...prev,
      contentRequirement: updatedContent,
    }));
  };

  // Generate content
  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/marketing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cgid: id,
          requirement: customerData.contentRequirement,
          customerType: customerData.customerType
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/suggested-content", {
          state: {
            customerData,
            customerId: id,
            productType: productType,
            generatedEmail: data.generatedEmail,
          }
        });
      } else {
        console.error("Failed to generate email");
      }
    } catch (err) {
      console.error("Error calling backend:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/search")} className="hover:bg-muted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Customer Details</h1>
        </div>

        {error && <div className="bg-destructive text-destructive-foreground p-4 rounded">{error}</div>}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Customer Information - {id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={customerData.fullName} disabled className="bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={customerData.email} disabled className="bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={customerData.phone} disabled className="bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={customerData.gender} onValueChange={(value) => setCustomerData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Customer Type</Label>
                <Select value={customerData.customerType} onValueChange={(value) => setCustomerData(prev => ({ ...prev, customerType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {customerTypeOptions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Address toggle */}
            <div className="space-y-2">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 flex items-center" onClick={() => setShowAddress(!showAddress)}>
                <MapPin className="h-4 w-4 mr-1" />
                {showAddress ? "Hide Address" : "View Address"}
              </Button>

              {showAddress && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={customerData.city} onChange={(e) => setCustomerData(prev => ({ ...prev, city: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input value={customerData.state} onChange={(e) => setCustomerData(prev => ({ ...prev, state: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value={customerData.country} onChange={(e) => setCustomerData(prev => ({ ...prev, country: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input value={customerData.pincode} onChange={(e) => setCustomerData(prev => ({ ...prev, pincode: e.target.value }))} />
                  </div>
                </div>
              )}
            </div>

            {/* Marketing Content Requirement */}
            <div className="space-y-6">
  <h3 className="text-lg font-semibold">Describe Content Requirement</h3>

  {/* Offer Details */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { label: "Marketing Option", options: selectedMarketingOptions },
      { label: "Offer Type", options: offerTypeOptions },
      { label: "Offer Tier", options: offerTierOptions },
      { label: "Interest Rate / ROI", options: interestRateOptions },
      { label: "Processing Fee / Charges", options: processingFeeOptions },
      { label: "Repayment Tenure / Lock-In Period", options: repaymentTenureOptions },
      { label: "Special Conditions", options: specialConditionsOptions },
    ].map(({ label, options }) => (
      <div key={label} className="flex flex-col space-y-1">
        <Label>{label}</Label>
        <Select onValueChange={(v) => handleContentRequirementChange(label, v)}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ))}
  </div>

  {/* Email Content Preferences */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
    {[
      { label: "Subject Line Style", options: subjectLineOptions },
      { label: "Header / Banner Text", options: headerBannerOptions },
      { label: "Use of Visuals or Icons", options: visualsOptions },
      { label: "CTA Button Text", options: ctaButtonOptions },
      { label: "Personalized Greeting", options: greetingOptions },
      { label: "Signature Block", options: signatureBlockOptions },
    ].map(({ label, options }) => (
      <div key={label} className="flex flex-col space-y-1">
        <Label>{label}</Label>
        <Select onValueChange={(v) => handleContentRequirementChange(label, v)}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ))}
  </div>



              {/* Textarea */}
              <Textarea
                placeholder="Content requirement (editable)..."
                value={customerData.contentRequirement}
                onChange={(e) => setCustomerData(prev => ({ ...prev, contentRequirement: e.target.value }))}
                rows={12}
                className="min-h-[150px] mt-2"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleGenerateContent}
                size="lg"
                className="px-8"
                disabled={customerData.contentRequirement.trim().length < 10}
              >
                Generate Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetails;
