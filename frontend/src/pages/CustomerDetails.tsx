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
    contentRequirement: ""
  });
  const [error, setError] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const customerTypeOptions = ["Regular", "Corporate", "Premium", "HNI"];

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/api/customers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCustomerData({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            customerType: data.customerType,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            contentRequirement: ""
          });
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

  const handleInputChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateContent = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/marketing/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              cgid: id,
              requirement: customerData.contentRequirement,
              customerType: customerData.customerType // <- new: send selected value
          }),

      });
  
      if (response.ok) {
        const data = await response.json();
        // setGeneratedEmail(data.generatedEmail);
        console.log(data.generatedEmail)
        navigate("/suggested-content", { 
          state: { 
            customerData, 
            customerId: id, 
            generatedEmail: data.generatedEmail 
          } 
        });
      } else {
        console.error("Failed to generate email");
      }
    } catch (err) {
      console.error("Error calling backend:", err);
    }
    finally {
      setLoading(false);
    }
  };
  

  // const handleGenerateContent = () => {
  //   navigate("/suggested-content", { state: { customerData, customerId: id } });
  // };

  return (
    
    
    <div className="min-h-screen bg-background p-4">
      {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )}

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="hover:bg-muted">
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
                <Select value={customerData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
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
                <Select value={customerData.customerType} onValueChange={(value) => handleInputChange("customerType", value)}>
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
              <Button
                variant="link"
                className="text-primary hover:text-primary/80 p-0 flex items-center"
                onClick={() => setShowAddress(!showAddress)}
              >
                <MapPin className="h-4 w-4 mr-1" />
                {showAddress ? "Hide Address" : "View Address"}
              </Button>

              {showAddress && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={customerData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input value={customerData.state} onChange={(e) => handleInputChange("state", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input value={customerData.country} onChange={(e) => handleInputChange("country", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode</Label>
                    <Input value={customerData.pincode} onChange={(e) => handleInputChange("pincode", e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Describe Content Requirement</h3>
              <Textarea
                placeholder="Describe the marketing content you need for this customer..."
                value={customerData.contentRequirement}
                onChange={(e) => handleInputChange("contentRequirement", e.target.value)}
                rows={4}
                className="min-h-[100px]"
              />
            </div>
                {customerData.contentRequirement.trim().length >= 0 &&
            customerData.contentRequirement.trim().length < 10 && (
              <p className="text-red-600 text-sm mt-1">
                Content requirement must be at least 10 characters.
              </p>
            )}
            <div className="flex justify-end">
              <Button onClick={handleGenerateContent} size="lg" className="px-8" disabled={customerData.contentRequirement.trim().length < 10}>
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
