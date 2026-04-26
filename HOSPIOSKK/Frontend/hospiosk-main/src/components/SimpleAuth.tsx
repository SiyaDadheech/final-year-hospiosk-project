import React, { useState } from 'react';
import { Fingerprint, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getTranslation } from '@/lib/translations';
import { validateAadhaarFormat } from '@/lib/aadhaarData';
import { getPatientByAadhaar } from "@/services/api";

interface SimpleAuthProps {
  onAuthenticated: (patientData: any) => void;
  language: string;
}

const SimpleAuth = ({ onAuthenticated, language }: SimpleAuthProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [authMethod, setAuthMethod] = useState<'biometric' | 'aadhaar' | null>(null);
  const [error, setError] = useState<string>('');

  const t = getTranslation(language);

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

  const handleBiometricScan = () => {
    setAuthMethod('biometric');
    setIsScanning(true);
    setError('');

    setTimeout(() => {
      setIsScanning(false);
      onAuthenticated(mockPatientData);
    }, 3000);
  };

  const handleAadhaarAuth = async () => {
    setError('');

    if (!validateAadhaarFormat(aadhaarNumber)) {
      setError(t.invalidAadhaar);
      return;
    }

    try {
      setAuthMethod('aadhaar');
      setIsScanning(true);

      const record = await getPatientByAadhaar(aadhaarNumber);

      setTimeout(() => {
        setIsScanning(false);

        const patientData = {
          id: record.id,
          name: record.name,
          age: record.age,
          gender: record.gender,
          phone: record.mobileNumber,
          address: record.address || 'N/A',
          aadhaar: record.aadhaarNumber,
          bloodGroup: record.bloodGroup || 'N/A',
          medicalHistory: []
        };

        onAuthenticated(patientData);
      }, 1500);

    } catch (error) {
      setIsScanning(false);
      setError(t.aadhaarNotFound);
    }
  };

  const handleAadhaarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaarNumber(value);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl shadow-kiosk-lg border-0">
        <CardHeader className="text-center pb-8 pt-10">
          <CardTitle className="text-4xl font-bold text-foreground mb-4">
            {t.authTitle}
          </CardTitle>
          <p className="text-xl text-muted-foreground">{t.authSubtitle}</p>
        </CardHeader>
        <CardContent className="pb-10">
          {!authMethod && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              <Card className="border-2 border-border hover:border-primary transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-soft hover:shadow-kiosk rounded-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-full inline-flex mb-6">
                    <Fingerprint className="w-20 h-20 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-foreground">{t.biometric}</h3>
                  <p className="text-xl text-muted-foreground mb-8">{t.biometricDesc}</p>
                  <Button
                    onClick={handleBiometricScan}
                    className="w-full btn-kiosk bg-primary hover:bg-primary/90 text-primary-foreground shadow-kiosk"
                  >
                    {t.biometric}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-secondary transition-all duration-300 transform hover:scale-[1.02] shadow-soft hover:shadow-kiosk rounded-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 p-8 rounded-full inline-flex mb-6">
                    <CreditCard className="w-20 h-20 text-secondary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-foreground">{t.aadhaar}</h3>
                  <p className="text-xl text-muted-foreground mb-6">{t.aadhaarDesc}</p>

                  <Input
                    type="text"
                    placeholder={t.aadhaarPlaceholder}
                    value={aadhaarNumber}
                    onChange={handleAadhaarInputChange}
                    className="mb-4 h-16 text-2xl text-center rounded-xl border-2 border-border focus:border-secondary"
                    maxLength={12}
                  />

                  {error && (
                    <Alert variant="destructive" className="mb-4 rounded-xl">
                      <AlertCircle className="h-5 w-5" />
                      <AlertDescription className="text-lg">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleAadhaarAuth}
                    disabled={aadhaarNumber.length === 0}
                    className="w-full btn-kiosk bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-kiosk"
                  >
                    {t.aadhaar}
                  </Button>

                </CardContent>
              </Card>

            </div>
          )}

          {isScanning && (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="animate-pulse-soft mb-8">
                <div className={`${authMethod === 'biometric' ? 'bg-primary/10' : 'bg-secondary/10'} p-12 rounded-full inline-flex`}>
                  {authMethod === 'biometric'
                    ? <Fingerprint className="w-24 h-24 text-primary" />
                    : <CreditCard className="w-24 h-24 text-secondary" />
                  }
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4 text-foreground">
                {authMethod === 'biometric' ? t.scanningFinger : t.verifyingAadhaar}
              </h3>

              <p className="text-xl text-muted-foreground">{t.wait}</p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleAuth;
