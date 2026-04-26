import React, { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import SimpleAuth from '@/components/SimpleAuth';
import PatientProfile from '@/components/PatientProfile';
import SimpleDoctorList from '@/components/SimpleDoctorList';
import AppointmentConfirmation from '@/components/AppointmentConfirmation';
import { Button } from '@/components/ui/button';
import { LogOut, Home, Globe } from 'lucide-react';
import { getTranslation, saveLanguage, getSavedLanguage } from '@/lib/translations';
import { bookAppointment, makePayment } from '@/services/api';

type Screen = 'language' | 'auth' | 'dashboard' | 'confirmation' | 'complete';

interface Doctor {
  id: number; // ✅ changed string → number
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  image: string;
  qualifications: string[];
  languages: string[];
}

interface Patient {
  id: number;
  name?: string;
}

const Index = () => {

  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => getSavedLanguage());
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const t = getTranslation(selectedLanguage);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    saveLanguage(language);
    setCurrentScreen('auth');
  };

  const handleAuthenticated = (data: Patient) => {
    setPatientData(data);
    setCurrentScreen('dashboard');
  };

  const handleDoctorSelection = (doctor: Doctor, slot: string) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(slot);
    setCurrentScreen('confirmation');
  };

  const handleAppointmentConfirm = async () => {

    try {

      if (!patientData || !selectedDoctor || !selectedSlot) {
        alert("Missing appointment data");
        return;
      }

      const appointmentData = {
        patientId: patientData.id,
        doctorId: selectedDoctor.id,
        slotTime: selectedSlot,
        appointmentDate: new Date().toISOString().split("T")[0]
      };

      const response = await bookAppointment(appointmentData);

      setAppointmentId(response.id);

      await makePayment(response.id);

      setCurrentScreen("complete");

    } catch (error) {
      console.error("Appointment Error", error);
      alert("Appointment booking failed");
    }
  };

  const handleBackToDoctors = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('language');
    setPatientData(null);
    setSelectedDoctor(null);
    setSelectedSlot('');
  };

  const handleNewAppointment = () => {
    setSelectedDoctor(null);
    setSelectedSlot('');
    setCurrentScreen('dashboard');
  };

  const handleChangeLanguage = () => {
    setCurrentScreen('language');
  };

  if (currentScreen === 'language') {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  if (currentScreen === 'auth') {
    return <SimpleAuth onAuthenticated={handleAuthenticated} language={selectedLanguage} />;
  }

  if (currentScreen === 'confirmation' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleChangeLanguage}>
                <Globe className="w-5 h-5" />
                {t.changeLanguage}
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                {t.logout}
              </Button>
            </div>
          </div>

          <AppointmentConfirmation
            doctor={selectedDoctor}
            slot={selectedSlot}
            patientData={patientData}
            onConfirm={handleAppointmentConfirm}
            onBack={handleBackToDoctors}
            language={selectedLanguage}
          />
        </div>
      </div>
    );
  }

  if (currentScreen === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/5 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-hospital-success/10 flex items-center justify-center">
            <span className="text-6xl">✅</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">{t.appointmentBooked}</h1>
          <p className="text-xl mb-10">{t.thankYou}</p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={handleNewAppointment}>
              <Home className="w-6 h-6 mr-2" />
              {t.newAppointment}
            </Button>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-6 h-6 mr-2" />
              {t.logout}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t.title}</h1>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleChangeLanguage}>
              <Globe className="w-5 h-5" />
              {t.changeLanguage}
            </Button>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
              {t.logout}
            </Button>
          </div>
        </div>

        {patientData && <PatientProfile patientData={patientData} />}

        <SimpleDoctorList
          onSelectDoctor={handleDoctorSelection}
          language={selectedLanguage}
        />

      </div>
    </div>
  );
};

export default Index;
