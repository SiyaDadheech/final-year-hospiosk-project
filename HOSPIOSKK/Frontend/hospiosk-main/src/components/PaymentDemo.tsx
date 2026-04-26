import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

interface PaymentDemoProps {
  appointmentFee: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

const PaymentDemo = ({ appointmentFee, onPaymentSuccess, onPaymentCancel }: PaymentDemoProps) => {

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handlePayment = async () => {

    setIsProcessing(true);
    setPaymentStatus('processing');

    setTimeout(async () => {

      const isSuccess = Math.random() > 0.1;

      if (!isSuccess) {
        setPaymentStatus('failed');
        setIsProcessing(false);
        return;
      }

      try {

        const patientData = JSON.parse(localStorage.getItem("patientData") || "{}");
        const appointmentDetails = JSON.parse(localStorage.getItem("appointmentDetails") || "{}");

        if (!patientData?.aadhaar || !appointmentDetails?.doctorName) {
          throw new Error("Patient or Appointment data missing");
        }

        const response = await fetch(`${BASE_URL}/appointments/book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            aadhaarNumber: patientData.aadhaar,
            doctorName: appointmentDetails.doctorName,
            timeSlot: appointmentDetails.timeSlot,
            symptoms: appointmentDetails.symptoms || "",
            paymentStatus: "PAID"
          })
        });

        if (!response.ok) {
          throw new Error("Appointment booking failed");
        }

        setPaymentStatus('success');

        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);

      } catch (error) {
        console.error(error);
        setPaymentStatus('failed');
        setIsProcessing(false);
      }

    }, 2500);
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setIsProcessing(false);
    setPaymentMethod(null);
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setUpiId('');
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">₹{appointmentFee} received successfully</p>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h3>

          <Button onClick={resetPayment} className="w-full bg-blue-600 mt-4">
            Try Again
          </Button>

          <Button variant="outline" onClick={onPaymentCancel} className="w-full mt-2">
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'processing') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold">Processing Payment...</h3>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>

        <h2 className="text-xl font-bold text-green-600">
          ₹{appointmentFee}
        </h2>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-blue-800">
            Demo Payment
          </span>
        </div>

        {!paymentMethod && (
          <div className="grid grid-cols-2 gap-3">

            <Button onClick={() => setPaymentMethod('card')} className="h-20 flex flex-col gap-2">
              <CreditCard className="w-6 h-6" />
              Card
            </Button>

            <Button onClick={() => setPaymentMethod('upi')} className="h-20 flex flex-col gap-2">
              UPI
            </Button>

          </div>
        )}

        {paymentMethod === 'card' && (
          <>
            <Input placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <Input placeholder="Expiry MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            <Input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />

            <Button onClick={handlePayment} className="w-full bg-green-600">
              Pay ₹{appointmentFee}
            </Button>
          </>
        )}

        {paymentMethod === 'upi' && (
          <>
            <Input placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />

            <Button onClick={handlePayment} className="w-full bg-green-600">
              Pay ₹{appointmentFee}
            </Button>
          </>
        )}

        <Button variant="outline" onClick={onPaymentCancel} className="w-full">
          Cancel Payment
        </Button>

      </CardContent>
    </Card>
  );
};

export default PaymentDemo;