
import React, { useState } from 'react';
import { Clock, Star, Users, CalendarClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  image: string;
  qualifications: string[];
  languages: string[];
}

interface DoctorListProps {
  onSelectDoctor: (doctor: Doctor, slot: string) => void;
}

const DoctorList = ({ onSelectDoctor }: DoctorListProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const doctors: Doctor[] = [
    {
      id: 'D001',
      name: 'Dr. Priya Sharma',
      specialization: 'Cardiology',
      experience: 15,
      rating: 4.8,
      availableSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
      image: '👩‍⚕️',
      qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 'D002',
      name: 'Dr. Rajesh Gupta',
      specialization: 'Orthopedics',
      experience: 12,
      rating: 4.7,
      availableSlots: ['09:30 AM', '11:00 AM', '03:00 PM', '05:00 PM'],
      image: '👨‍⚕️',
      qualifications: ['MBBS', 'MS Orthopedics', 'Fellowship in Joint Replacement'],
      languages: ['Hindi', 'English']
    },
    {
      id: 'D003',
      name: 'Dr. Anita Patel',
      specialization: 'Pediatrics',
      experience: 18,
      rating: 4.9,
      availableSlots: ['08:30 AM', '10:00 AM', '01:30 PM', '03:30 PM'],
      image: '👩‍⚕️',
      qualifications: ['MBBS', 'MD Pediatrics', 'Fellowship in Neonatology'],
      languages: ['Hindi', 'English', 'Gujarati']
    },
    {
      id: 'D004',
      name: 'Dr. Vikram Singh',
      specialization: 'Neurology',
      experience: 20,
      rating: 4.8,
      availableSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
      image: '👨‍⚕️',
      qualifications: ['MBBS', 'MD Medicine', 'DM Neurology'],
      languages: ['Hindi', 'English', 'Punjabi']
    },
    {
      id: 'D005',
      name: 'Dr. Meera Joshi',
      specialization: 'Dermatology',
      experience: 10,
      rating: 4.6,
      availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'],
      image: '👩‍⚕️',
      qualifications: ['MBBS', 'MD Dermatology', 'Fellowship in Cosmetic Dermatology'],
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 'D006',
      name: 'Dr. Amit Kumar',
      specialization: 'General Medicine',
      experience: 8,
      rating: 4.5,
      availableSlots: ['08:00 AM', '09:30 AM', '01:00 PM', '03:00 PM', '05:30 PM'],
      image: '👨‍⚕️',
      qualifications: ['MBBS', 'MD Internal Medicine'],
      languages: ['Hindi', 'English']
    }
  ];

  const specializations = ['all', 'Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Dermatology', 'General Medicine'];

  const filteredDoctors = selectedSpecialization === 'all' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialization === selectedSpecialization);

  const handleBookAppointment = (doctor: Doctor, slot: string) => {
    onSelectDoctor(doctor, slot);
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Users className="w-5 h-5" />
            Available Doctors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6">
              {specializations.map((spec) => (
                <TabsTrigger key={spec} value={spec} className="text-xs">
                  {spec === 'all' ? 'All' : spec}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{doctor.image}</div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Available Slots:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {doctor.availableSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookAppointment(doctor, slot)}
                            className="text-xs hover:bg-green-50 hover:border-green-300"
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorList;
