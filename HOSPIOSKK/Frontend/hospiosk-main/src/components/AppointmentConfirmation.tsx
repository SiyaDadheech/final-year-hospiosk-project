
import React, { useState } from 'react';
import { CheckCircle, Calendar, Clock, User, Stethoscope, Phone, MapPin, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import RazorpayPayment from './RazorpayPayment';
import { getTranslation } from '@/lib/translations';
import { bookAppointment } from '@/services/api';   


interface AppointmentConfirmationProps {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    image: string;
  };
  slot: string;
  patientData: any;
  onConfirm: () => void;
  onBack: () => void;
  language: string;
}

const AppointmentConfirmation = ({ doctor, slot, patientData, onConfirm, onBack, language }: AppointmentConfirmationProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [isConfirmed, setIsConfirmed] = useState(false);
const [appointmentId, setAppointmentId] = useState<string | null>(null);


  const t = getTranslation(language);

  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 1); // Next day

  // Demo consultation fee based on specialization
  const getConsultationFee = (specialization: string) => {
    const fees: Record<string, number> = {
      'Cardiology': 800,
      'Neurology': 900,
      'Orthopedics': 700,
      'Pediatrics': 600,
      'Dermatology': 650,
      'General Medicine': 500
    };
    return fees[specialization] || 500;
  };

  const consultationFee = getConsultationFee(doctor.specialization);

 const handleProceedToPayment = () => {

  // Save appointment details
  localStorage.setItem("appointmentDetails", JSON.stringify({
    doctorName: doctor.name,
    timeSlot: slot,
    symptoms: symptoms || ""
  }));

  // Save patient data
  localStorage.setItem("patientData", JSON.stringify(patientData));

  setCurrentStep('payment');
};


  const handlePaymentSuccess = async () => {

  try {

    // ⭐ Aadhaar safely extract
    const aadhaar =
      patientData?.aadhaarNumber ||
      patientData?.aadhaar ||
      patientData?.aadhaar_number ||
      patientData?.aadhaarNo;

    if (!aadhaar) {
      alert("Aadhaar number missing");
      return;
    }

    // ⭐ Appointment Payload
    const appointmentPayload = {
      aadhaarNumber: aadhaar,
      doctorName: doctor.name,
      timeSlot: slot,
      symptoms: symptoms || ""
    };

    // ⭐ Call Backend
    const result = await bookAppointment(appointmentPayload);

    // ⭐ Safety check (VERY IMPORTANT)
    if (!result || !result.id) {
      alert("Appointment booking failed");
      return;
    }

    // ⭐ Store Appointment ID
    setAppointmentId(result.id.toString());
    localStorage.setItem("appointmentId", result.id.toString());

    // ⭐ Move to confirmation screen
    setCurrentStep('confirmed');
    setIsConfirmed(true);

  } catch (error) {
    console.error("Appointment booking failed", error);
    alert("Something went wrong while booking appointment");
  }
};

  const handlePaymentCancel = () => {
    setCurrentStep('details');
  };

  if (currentStep === 'payment') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t.paymentTitle}</h2>
          <p className="text-muted-foreground">{t.paymentSecure} - Dr. {doctor.name}</p>
        </div>
        <RazorpayPayment
          amount={consultationFee}
          language={language}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentCancel}
        />
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl text-center shadow-kiosk-lg border-0">
          <CardContent className="p-10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-hospital-success/10 flex items-center justify-center">
              <CheckCircle className="w-14 h-14 text-hospital-success" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">{t.appointmentBooked}</h2>
            <p className="text-muted-foreground text-lg mb-8">{t.thankYou}</p>
            
            <div className="bg-accent/50 border border-accent-foreground/10 rounded-xl p-5 mb-8">
              <p className="text-foreground font-semibold">Appointment ID: APT-{appointmentId}</p>
              <p className="text-foreground font-semibold">Payment ID: PAY-{Date.now()}</p>
            </div>

            <div className="space-y-4 text-left bg-muted/50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{appointmentDate.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{slot}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{doctor.name} - {doctor.specialization}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-hospital-success/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-hospital-success" />
                </div>
                <span className="text-foreground font-semibold">{t.consultationFee}: ₹{consultationFee} (Paid)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">Room 205, Second Floor, OPD Block</span>
              </div>
            </div>

            <Button 
              onClick={onConfirm} 
              className="w-full btn-kiosk bg-primary hover:bg-primary/90 text-primary-foreground shadow-kiosk"
            >
              🖨️ Print Appointment Slip
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Click the button above to print your appointment slip and complete the process
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-kiosk border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            {t.confirmAppointment}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Stethoscope className="w-5 h-5 text-primary" />
                {t.doctorDetails}
              </h3>
              <div className="bg-accent/30 border border-accent-foreground/10 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{doctor.image}</span>
                  <div>
                    <p className="font-semibold text-lg text-foreground">{doctor.name}</p>
                    <p className="text-primary font-medium">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{appointmentDate.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{slot}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-hospital-success" />
                    <span className="font-semibold text-hospital-success">{t.consultationFee}: ₹{consultationFee}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Room 205, Second Floor, OPD Block</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <User className="w-5 h-5 text-secondary" />
                {t.patientDetails}
              </h3>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-5">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-lg text-foreground">{patientData.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{patientData.phone}</span>
                  </div>
                  <div className="text-foreground">
                    <span className="text-muted-foreground">Age: </span>
                    <span>{patientData.age} years</span>
                  </div>
                  <div className="text-foreground">
                    <span className="text-muted-foreground">Patient ID: </span>
                    <span>{patientData.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t.symptoms}
            </label>
            <Textarea
              placeholder={t.symptomsPlaceholder}
              value={symptoms}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
  setSymptoms(e.target.value)
}
              className="min-h-[100px] rounded-xl border-border bg-background"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1 btn-kiosk border-2"
            >
              {t.backToDoctors}
            </Button>
            <Button 
              onClick={handleProceedToPayment}
              className="flex-1 btn-kiosk bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-kiosk"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {t.proceedPayment} (₹{consultationFee})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentConfirmation;
