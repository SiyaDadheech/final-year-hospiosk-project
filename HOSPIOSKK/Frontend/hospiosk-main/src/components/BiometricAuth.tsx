
import React, { useState } from 'react';
import { Fingerprint, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiometricAuthProps {
  onAuthenticated: (patientData: any) => void;
}

const BiometricAuth = ({ onAuthenticated }: BiometricAuthProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [authMethod, setAuthMethod] = useState<'biometric' | 'aadhaar' | null>(null);

  // Mock patient data
  const mockPatientData = {
    id: 'P001',
    name: 'Rajesh Kumar',
    age: 35,
    gender: 'Male',
    phone: '+91 9876543210',
    address: '123 MG Road, Mumbai, Maharashtra',
    aadhaar: '1234-5678-9012',
    bloodGroup: 'B+',
    medicalHistory: ['Hypertension', 'Diabetes Type 2']
  };

const handleBiometricScan = async () => {

  console.log("Biometric scan started");

  try {

    const pidOptions = `
      <PidOptions ver="1.0">
        <Opts fCount="1" fType="2" format="0" pidVer="2.0" timeout="20000"/>
      </PidOptions>
    `;

    const response = await fetch("http://127.0.0.1:11100/capture", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml"
      },
      body: pidOptions
    });

    const data = await response.text();

    console.log("Fingerprint Response:", data);

  } catch (error) {

    console.error("Fingerprint error:", error);

  }

};

  const handleAadhaarAuth = () => {
    if (aadhaarNumber.length === 12) {
      setAuthMethod('aadhaar');
      setIsScanning(true);
      
      // Simulate Aadhaar verification
      setTimeout(() => {
        setIsScanning(false);
        onAuthenticated(mockPatientData);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-800 mb-2">
            🏥 Hospital Kiosk System
          </CardTitle>
          <p className="text-gray-600">Please authenticate to access your medical records</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!authMethod && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-blue-300 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Fingerprint className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Biometric Scan</h3>
                    <p className="text-gray-600 mb-4">Use your fingerprint for quick access</p>
                    <Button 
                      onClick={handleBiometricScan}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Start Biometric Scan
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <CreditCard className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aadhaar Card</h3>
                    <p className="text-gray-600 mb-4">Enter your 12-digit Aadhaar number</p>
                    <Input
                      type="text"
                      placeholder="Enter Aadhaar Number"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="mb-4"
                      maxLength={12}
                    />
                    <Button 
                      onClick={handleAadhaarAuth}
                      disabled={aadhaarNumber.length !== 12}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Verify Aadhaar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {isScanning && (
            <div className="text-center py-8">
              <div className="animate-pulse">
                {authMethod === 'biometric' ? (
                  <Fingerprint className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                ) : (
                  <CreditCard className="w-20 h-20 text-green-600 mx-auto mb-4" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {authMethod === 'biometric' ? 'Scanning Fingerprint...' : 'Verifying Aadhaar...'}
              </h3>
              <p className="text-gray-600">Please wait while we authenticate your identity</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricAuth;
