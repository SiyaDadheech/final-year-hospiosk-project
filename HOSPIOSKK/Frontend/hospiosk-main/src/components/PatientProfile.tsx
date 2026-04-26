import React, { useEffect } from 'react';
import { User, Phone, MapPin, Droplets, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PatientProfileProps {
  patientData: {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
    aadhaar: string;
    bloodGroup: string;
    medicalHistory: string[];
  };
}

const PatientProfile = ({ patientData }: PatientProfileProps) => {

  // ⭐ NEW CODE — patientData localStorage me save hoga
  useEffect(() => {
    if (patientData) {
      localStorage.setItem("patientData", JSON.stringify(patientData));
    }
  }, [patientData]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <User className="w-5 h-5" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-semibold">{patientData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Age / Gender</p>
            <p className="font-semibold">{patientData.age} years, {patientData.gender}</p>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-red-500" />
            <div>
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="font-semibold">{patientData.bloodGroup}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{patientData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold text-sm">{patientData.address}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Patient ID</p>
            <p className="font-semibold">{patientData.id}</p>
          </div>
        </div>
        
        {patientData.medicalHistory.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-gray-600 font-medium">Medical History</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {patientData.medicalHistory.map((condition, index) => (
                <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
