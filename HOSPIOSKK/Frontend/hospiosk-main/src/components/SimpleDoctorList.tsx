import React, { useState, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/lib/translations';
import { getDoctors } from '@/services/api';


interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  image: string;
}

interface SimpleDoctorListProps {
  onSelectDoctor: (doctor: Doctor, slot: string) => void;
  language: string;
}

const SimpleDoctorList = ({ onSelectDoctor, language }: SimpleDoctorListProps) => {

  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const t = getTranslation(language);

  // ⭐ Frontend fixed slots
  const defaultSlots = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();

        // ⭐ Backend data + Frontend slots
        const formattedDoctors = data.map((doc: any) => ({
          id: doc.id,
          name: doc.doctorName,
          specialization: doc.specialization,
          experience: 10,
          rating: 4.5,
          availableSlots: defaultSlots,
          image: '👨‍⚕️'
        }));

        setDoctors(formattedDoctors);

      } catch (err) {
        console.error("Doctor fetch error", err);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = ['all', 'Cardiologist', 'Orthopedics', 'Pediatrics', 'General Medicine'];

  const filteredDoctors =
    selectedSpecialization === 'all'
      ? doctors
      : doctors.filter(d => d.specialization === selectedSpecialization);

  return (
    <Card className="mb-6 shadow-kiosk border-0">
      <CardHeader className="text-center pb-6 pt-8">
        <CardTitle className="text-3xl font-bold text-foreground">
          {t.selectDoctor}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-8">

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {specializations.map((spec) => (
            <Button
              key={spec}
              onClick={() => setSelectedSpecialization(spec)}
              variant={selectedSpecialization === spec ? "default" : "outline"}
              className={`h-12 px-6 text-lg rounded-full ${
                selectedSpecialization === spec
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-border hover:border-primary'
              }`}
            >
              {spec === 'all' ? t.allDoctors : spec}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (

            <Card key={doctor.id} className="border-2 border-border rounded-xl">
              <CardContent className="p-6">

                <div className="text-center mb-4">
                  <div className="text-6xl">{doctor.image}</div>
                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                  <p className="text-primary">{doctor.specialization}</p>
                </div>

                <div className="mb-4">
                  <p>{doctor.experience} years</p>
                  <p>⭐ {doctor.rating}</p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t.availableSlots}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {doctor.availableSlots.map((slot, i) => (
                      <Button
                        key={i}
                        onClick={() => onSelectDoctor(doctor, slot)}
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

      </CardContent>
    </Card>
  );
};

export default SimpleDoctorList;
