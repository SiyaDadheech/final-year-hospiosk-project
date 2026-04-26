import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import { Smartphone, QrCode, CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react';
//import paymentQrCode from "C:/Users/siyad/OneDrive/Attachments/Desktop/btech_project/HOSPIOSKK/Frontend/hospiosk-main/src/assets/payment-qr.png";
import {paymentQrCode} from '../assets/payment-qr.png';
const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;
interface RazorpayPaymentProps {
  amount: number;
  language?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const translations: Record<string, Record<string, string>> = {
  en: {
    paymentOptions: "Payment Options",
    payViaUPI: "Pay via UPI App",
    payViaQR: "Pay via QR Code",
    scanQR: "Scan to Pay via UPI",
    upiApps: "Works with PhonePe, Google Pay, Paytm, BHIM & all UPI apps",
    amount: "Amount",
    processing: "Processing...",
    payNow: "Pay Now",
    paymentSuccess: "Payment Successful!",
    paymentFailed: "Payment Failed",
    tryAgain: "Try Again",
    qrReady: "QR Code Ready",
    scanToPay: "Scan to pay",
    confirmPayment: "I've completed the payment",
    waitingPayment: "Waiting for payment confirmation...",
    merchantName: "Hospital Kiosk",
    back: "Back",
    openingUPI: "Opening UPI app...",
    upiId: "UPI ID"
  },
  hi: {
    paymentOptions: "भुगतान विकल्प",
    payViaUPI: "UPI ऐप से भुगतान करें",
    payViaQR: "QR कोड से भुगतान करें",
    scanQR: "UPI के माध्यम से भुगतान करने के लिए स्कैन करें",
    upiApps: "PhonePe, Google Pay, Paytm, BHIM और सभी UPI ऐप्स के साथ काम करता है",
    amount: "राशि",
    processing: "प्रोसेसिंग...",
    payNow: "अभी भुगतान करें",
    paymentSuccess: "भुगतान सफल!",
    paymentFailed: "भुगतान विफल",
    tryAgain: "पुनः प्रयास करें",
    qrReady: "QR कोड तैयार",
    scanToPay: "भुगतान करने के लिए स्कैन करें",
    confirmPayment: "मैंने भुगतान पूरा कर लिया है",
    waitingPayment: "भुगतान की पुष्टि की प्रतीक्षा में...",
    merchantName: "अस्पताल कियोस्क",
    back: "वापस",
    openingUPI: "UPI ऐप खोला जा रहा है...",
    upiId: "UPI आईडी"
  },
  mr: {
    paymentOptions: "पेमेंट पर्याय",
    payViaUPI: "UPI अॅपद्वारे पेमेंट करा",
    payViaQR: "QR कोडद्वारे पेमेंट करा",
    scanQR: "UPI द्वारे पेमेंट करण्यासाठी स्कॅन करा",
    upiApps: "PhonePe, Google Pay, Paytm, BHIM आणि सर्व UPI अॅप्ससह कार्य करते",
    amount: "रक्कम",
    processing: "प्रक्रिया करत आहे...",
    payNow: "आता पेमेंट करा",
    paymentSuccess: "पेमेंट यशस्वी!",
    paymentFailed: "पेमेंट अयशस्वी",
    tryAgain: "पुन्हा प्रयत्न करा",
    qrReady: "QR कोड तयार",
    scanToPay: "पेमेंट करण्यासाठी स्कॅन करा",
    confirmPayment: "मी पेमेंट पूर्ण केले आहे",
    waitingPayment: "पेमेंट पुष्टीकरणाची प्रतीक्षा करत आहे...",
    merchantName: "हॉस्पिटल कियोस्क",
    back: "मागे",
    openingUPI: "UPI अॅप उघडत आहे...",
    upiId: "UPI आयडी"
  },
  gu: {
    paymentOptions: "ચુકવણી વિકલ્પો",
    payViaUPI: "UPI એપ દ્વારા ચૂકવણી કરો",
    payViaQR: "QR કોડ દ્વારા ચૂકવણી કરો",
    scanQR: "UPI દ્વારા ચૂકવણી કરવા સ્કેન કરો",
    upiApps: "PhonePe, Google Pay, Paytm, BHIM અને બધી UPI એપ્સ સાથે કામ કરે છે",
    amount: "રકમ",
    processing: "પ્રક્રિયા કરી રહ્યું છે...",
    payNow: "હવે ચૂકવણી કરો",
    paymentSuccess: "ચુકવણી સફળ!",
    paymentFailed: "ચુકવણી નિષ્ફળ",
    tryAgain: "ફરી પ્રયાસ કરો",
    qrReady: "QR કોડ તૈયાર",
    scanToPay: "ચૂકવણી કરવા સ્કેન કરો",
    confirmPayment: "મેં ચુકવણી પૂર્ણ કરી છે",
    waitingPayment: "ચુકવણી પુષ્ટિની રાહ જોઈ રહ્યું છે...",
    merchantName: "હોસ્પિટલ કિઓસ્ક",
    back: "પાછળ",
    openingUPI: "UPI એપ ખોલી રહ્યું છે...",
    upiId: "UPI આઈડી"
  },
  ta: {
    paymentOptions: "கட்டண விருப்பங்கள்",
    payViaUPI: "UPI ஆப் மூலம் செலுத்துங்கள்",
    payViaQR: "QR குறியீடு மூலம் செலுத்துங்கள்",
    scanQR: "UPI மூலம் செலுத்த ஸ்கேன் செய்யுங்கள்",
    upiApps: "PhonePe, Google Pay, Paytm, BHIM & அனைத்து UPI ஆப்களுடனும் இயங்கும்",
    amount: "தொகை",
    processing: "செயலாக்கம்...",
    payNow: "இப்போது செலுத்து",
    paymentSuccess: "கட்டணம் வெற்றிகரமாக!",
    paymentFailed: "கட்டணம் தோல்வி",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
    qrReady: "QR குறியீடு தயார்",
    scanToPay: "செலுத்த ஸ்கேன் செய்யுங்கள்",
    confirmPayment: "நான் கட்டணத்தை முடித்துவிட்டேன்",
    waitingPayment: "கட்டண உறுதிப்படுத்தலுக்காக காத்திருக்கிறது...",
    merchantName: "மருத்துவமனை கியோஸ்க்",
    back: "பின்செல்",
    openingUPI: "UPI ஆப் திறக்கிறது...",
    upiId: "UPI ஐடி"
  },
  te: {
    paymentOptions: "చెల్లింపు ఎంపికలు",
    payViaUPI: "UPI యాప్ ద్వారా చెల్లించండి",
    payViaQR: "QR కోడ్ ద్వారా చెల్లించండి",
    scanQR: "UPI ద్వారా చెల్లించడానికి స్కాన్ చేయండి",
    upiApps: "PhonePe, Google Pay, Paytm, BHIM & అన్ని UPI యాప్‌లతో పని చేస్తుంది",
    amount: "మొత్తం",
    processing: "ప్రాసెస్ చేస్తోంది...",
    payNow: "ఇప్పుడు చెల్లించండి",
    paymentSuccess: "చెల్లింపు విజయవంతం!",
    paymentFailed: "చెల్లింపు విఫలమైంది",
    tryAgain: "మళ్ళీ ప్రయత్నించండి",
    qrReady: "QR కోడ్ సిద్ధం",
    scanToPay: "చెల్లించడానికి స్కాన్ చేయండి",
    confirmPayment: "నేను చెల్లింపు పూర్తి చేశాను",
    waitingPayment: "చెల్లింపు నిర్ధారణ కోసం వేచి ఉంది...",
    merchantName: "హాస్పిటల్ కియోస్క్",
    back: "వెనుకకు",
    openingUPI: "UPI యాప్ తెరుస్తోంది...",
    upiId: "UPI ఐడి"
  }
};

// UPI ID for receiving payments - PRODUCTION UPI ID
const MERCHANT_UPI_ID = "7727900889@fam";
const MERCHANT_NAME = "Hospital Kiosk";

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({ 
  amount, 
  language = 'en',
  onSuccess,
  onFailure 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const t = translations[language] || translations['en'];

  // Load Razorpay script
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount to avoid reload issues
    };
  }, []);

  // Generate UPI deep link
  const generateUPILink = () => {
    const params = new URLSearchParams({
      pa: MERCHANT_UPI_ID,
      pn: MERCHANT_NAME,
      am: amount.toString(),
      cu: 'INR',
      tn: `Hospital Kiosk Payment - Rs ${amount}`
    });
    return `upi://pay?${params.toString()}`;
  };

  // Detect if user is on mobile
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // State to track if UPI failed to open
  const [upiOpenFailed, setUpiOpenFailed] = useState(false);

  // Handle UPI App payment - Direct UPI intent with proper fallback
  const handleUPIPayment = () => {
    setIsProcessing(true);
    setUpiOpenFailed(false);
    
    const upiLink = generateUPILink();
    
    // Check if on desktop - show UPI waiting screen (user can manually show QR)
    if (!isMobileDevice()) {
      toast({
        title: "Desktop detected",
        description: "UPI apps work on mobile devices. You can scan the QR code instead.",
      });
      setTimeout(() => {
        setIsProcessing(false);
        setUpiOpenFailed(true);
        setPaymentMethod('upi');
      }, 500);
      return;
    }
    
    // Show toast that UPI app is opening
    toast({
      title: t.openingUPI,
      description: `${t.amount}: ₹${amount}`,
    });

    // Track if UPI app opened successfully
    let upiOpened = false;
    
    // Listen for visibility change (indicates app switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        upiOpened = true;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try multiple methods to open UPI
    // Method 1: window.location (most reliable for mobile)
    try {
      window.location.href = upiLink;
    } catch (e) {
      console.log('window.location method failed, trying alternative');
    }

    // Fallback timeout - if UPI app doesn't open within 6 seconds, show message with QR option
    const fallbackTimeout = setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (!upiOpened) {
        toast({
          title: "Unable to open UPI app",
          description: "Please use the QR code option to pay",
          variant: "destructive"
        });
        setIsProcessing(false);
        setUpiOpenFailed(true);
        setPaymentMethod('upi');
      } else {
        // UPI app opened, show confirmation screen
        setIsProcessing(false);
        setPaymentMethod('upi');
      }
    }, 6000);

    // Quick check - if still visible after 1.5 seconds and no app opened
    setTimeout(() => {
      if (!document.hidden && !upiOpened) {
        // Try iframe method as backup
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = upiLink;
        document.body.appendChild(iframe);
        
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }
    }, 1500);

    // Cleanup on success (if app opens quickly)
    setTimeout(() => {
      if (upiOpened) {
        clearTimeout(fallbackTimeout);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        setIsProcessing(false);
        setPaymentMethod('upi');
      }
    }, 2000);
  };

  // Handle Razorpay UPI payment as fallback
  const handleRazorpayPayment = async () => {

  if (!razorpayLoaded || !window.Razorpay) {
    toast({
      title: "Payment Error",
      description: "Razorpay SDK not loaded",
      variant: "destructive"
    });
    return;
  }

  try {

    setIsProcessing(true);

    // ⭐ STEP 1 → Backend se order create
    //const res = await fetch("http://localhost:8080/payment/create-order", {
    const res = await fetch(`${BASE_URL}/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount })
    });

    const orderData = await res.json();

    console.log("Order Response =", orderData);

    // ⭐ STEP 2 → Razorpay popup config
    const options = {
      key: "rzp_test_SFFBZE3PmY7fBw",
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,

      name: "Hospital Kiosk",
      description: "Appointment Payment",

      handler: function (response: any) {

        console.log("Payment Success =", response);

        setIsProcessing(false);
        setPaymentStatus('success');

        toast({
          title: "Payment Successful",
          description: response.razorpay_payment_id
        });

        onSuccess?.();
      },

      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      }
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response: any) {

      console.log("Payment Failed =", response);

      setIsProcessing(false);
      setPaymentStatus('failed');

      toast({
        title: "Payment Failed",
        description: response.error.description,
        variant: "destructive"
      });

      onFailure?.();
    });

    razorpay.open();

  } catch (error) {
    console.error(error);
    setIsProcessing(false);
  }
};

const handlePaymentConfirmation = async () => {

  try {

    setIsProcessing(true);

    const patientData = JSON.parse(localStorage.getItem("patientData") || "{}");
    const appointmentDetails = JSON.parse(localStorage.getItem("appointmentDetails") || "{}");

    if (!patientData?.aadhaar || !appointmentDetails?.doctorName) {
      throw new Error("Patient or Appointment data missing");
    }

    //const response = await fetch("http://localhost:8080/appointments/book", {
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

    setPaymentStatus("success");
    setIsProcessing(false);

    onSuccess?.();

  } catch (error) {

    console.error(error);
    setPaymentStatus("failed");
    setIsProcessing(false);

    onFailure?.();
  }
};

const resetPayment = () => {
  setPaymentStatus('pending');
  setPaymentMethod(null);
  setIsProcessing(false);
};

  // Success state
  if (paymentStatus === 'success') {
    return (
      <Card className="p-8 text-center bg-accent/30 border-0 shadow-kiosk rounded-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-hospital-success/10 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-hospital-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{t.paymentSuccess}</h3>
        <p className="text-xl text-hospital-success font-semibold">₹{amount}</p>
      </Card>
    );
  }

  // Failed state
  if (paymentStatus === 'failed') {
    return (
      <Card className="p-8 text-center bg-destructive/5 border-0 shadow-kiosk rounded-xl">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <XCircle className="w-12 h-12 text-destructive" />
        </div>
        <h3 className="text-2xl font-bold text-destructive mb-4">{t.paymentFailed}</h3>
        <Button onClick={resetPayment} className="btn-kiosk bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          {t.tryAgain}
        </Button>
      </Card>
    );
  }

  // UPI App opened - waiting for confirmation
  if (paymentMethod === 'upi') {
    return (
      <Card className="p-8 shadow-kiosk border-0 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          
          {upiOpenFailed ? (
            <>
              <h3 className="text-xl font-bold text-foreground mb-2">Unable to open UPI app</h3>
              <p className="text-sm text-muted-foreground mb-6">Please scan the QR code to pay, or try again on a mobile device</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-foreground mb-2">{t.openingUPI}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t.upiApps}</p>
            </>
          )}
          
          <div className="bg-muted/50 p-4 rounded-xl mb-6">
            <p className="text-sm font-medium text-muted-foreground">{t.amount}:</p>
            <p className="text-2xl font-bold text-primary">₹{amount}</p>
            <p className="text-xs text-muted-foreground mt-2">{t.upiId}: {MERCHANT_UPI_ID}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handlePaymentConfirmation}
              className="w-full btn-kiosk bg-hospital-success hover:bg-hospital-success/90 text-white shadow-kiosk"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {t.confirmPayment}
            </Button>
            
            {/* Show QR Code button - prominent when UPI failed */}
            <Button 
              onClick={handleRazorpayPayment}
              variant={upiOpenFailed ? "default" : "outline"}
              className={upiOpenFailed 
                ? "w-full btn-kiosk bg-primary hover:bg-primary/90 text-primary-foreground shadow-kiosk" 
                : "w-full btn-kiosk border-2 border-primary text-primary"
              }
            >
              <QrCode className="w-5 h-5 mr-2" />
              {t.payViaQR}
            </Button>
            
            <Button 
              onClick={() => {
                setUpiOpenFailed(false);
                handleUPIPayment();
              }}
              variant="outline"
              className="w-full btn-kiosk border-2"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              {t.tryAgain}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                setPaymentMethod(null);
                setUpiOpenFailed(false);
              }}
              className="btn-kiosk"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // QR Code view - using provided QR image
  if (paymentMethod === 'qr') {
    return (
      <Card className="p-8 shadow-kiosk border-0 rounded-xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">{t.scanQR}</h3>
          <p className="text-sm text-muted-foreground mb-6">{t.upiApps}</p>
          
          {/* UPI ID displayed above QR */}
          <div className="mb-4">
            <p className="text-lg font-bold text-foreground tracking-wide">{MERCHANT_UPI_ID}</p>
          </div>
          
          {/* QR Code with white background for optimal scanning */}
          <div className="bg-white p-6 rounded-2xl inline-block mb-4 shadow-lg border border-border/50">
            <img 
              src={paymentQrCode} 
              alt="UPI Payment QR Code - Scan to Pay" 
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain mx-auto"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          
          {/* Scan label */}
          <div className="mb-4">
            <p className="text-lg font-semibold text-foreground">{t.scanQR}</p>
            <p className="text-sm text-muted-foreground mt-1">{t.upiApps}</p>
          </div>
          
          {/* Amount display */}
          <div className="bg-muted/50 px-6 py-3 rounded-xl mb-6 inline-block">
            <p className="text-sm font-medium text-muted-foreground">{t.amount}</p>
            <p className="text-2xl font-bold text-primary">₹{amount}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handlePaymentConfirmation}
              className="w-full btn-kiosk bg-hospital-success hover:bg-hospital-success/90 text-white shadow-kiosk"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {t.confirmPayment}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setPaymentMethod(null)}
              className="btn-kiosk border-2"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.back}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Payment method selection
  return (
    <Card className="p-8 shadow-kiosk border-0 rounded-xl">
      <h3 className="text-xl font-bold text-center text-foreground mb-6">{t.paymentOptions}</h3>
      
      <div className="bg-muted/50 p-4 rounded-xl mb-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">{t.amount}:</p>
        <p className="text-3xl font-bold text-primary">₹{amount}</p>
        <p className="text-xs text-muted-foreground mt-2">{t.upiId}: {MERCHANT_UPI_ID}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button 
          onClick={handleRazorpayPayment}
          disabled={isProcessing}
          className="h-16 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-kiosk transition-all duration-200 active:scale-95"
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
          ) : (
            <Smartphone className="w-6 h-6 mr-3" />
          )}
          {isProcessing ? t.openingUPI : t.payViaUPI}
        </Button>

        <Button 
          onClick={handleRazorpayPayment}
          variant="outline"
          className="h-16 text-lg border-2 border-primary text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 active:scale-95"
        >
          <QrCode className="w-6 h-6 mr-3" />
          {t.payViaQR}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-6">
        {t.upiApps}
      </p>
    </Card>
  );
};

export default RazorpayPayment;
