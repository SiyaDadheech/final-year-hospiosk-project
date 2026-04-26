// Centralized translations for all 6 supported languages

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'ta' | 'te';

export interface Translations {
  // Common
  title: string;
  logout: string;
  changeLanguage: string;
  back: string;
  cancel: string;
  confirm: string;
  
  // Auth
  authTitle: string;
  authSubtitle: string;
  biometric: string;
  biometricDesc: string;
  aadhaar: string;
  aadhaarDesc: string;
  aadhaarPlaceholder: string;
  scanningFinger: string;
  verifyingAadhaar: string;
  wait: string;
  invalidAadhaar: string;
  aadhaarNotFound: string;
  
  // Doctor List
  selectDoctor: string;
  allDoctors: string;
  experience: string;
  years: string;
  rating: string;
  selectSlot: string;
  availableSlots: string;
  
  // Appointment
  newAppointment: string;
  appointmentBooked: string;
  thankYou: string;
  confirmAppointment: string;
  doctorDetails: string;
  patientDetails: string;
  symptoms: string;
  symptomsPlaceholder: string;
  proceedPayment: string;
  backToDoctors: string;
  consultationFee: string;
  
  // Payment
  paymentTitle: string;
  paymentSecure: string;
  paymentMethod: string;
  payNow: string;
  paymentSuccess: string;
  paymentFailed: string;
  tryAgain: string;
  processing: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    title: '🏥 Hospital Kiosk System',
    logout: 'Logout',
    changeLanguage: 'Change Language',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    
    // Auth
    authTitle: '🏥 Hospital Kiosk',
    authSubtitle: 'Please choose one method to identify yourself',
    biometric: 'Fingerprint',
    biometricDesc: 'Place your finger on scanner',
    aadhaar: 'Aadhaar Card',
    aadhaarDesc: 'Enter 12-digit number',
    aadhaarPlaceholder: 'Enter Aadhaar Number',
    scanningFinger: 'Scanning fingerprint...',
    verifyingAadhaar: 'Verifying Aadhaar...',
    wait: 'Please wait',
    invalidAadhaar: 'Invalid Aadhaar Number. Aadhaar must be exactly 12 digits.',
    aadhaarNotFound: 'Aadhaar number not found.',
    
    // Doctor List
    selectDoctor: 'Select Doctor',
    allDoctors: 'All Doctors',
    experience: 'Experience',
    years: 'years',
    rating: 'Rating',
    selectSlot: 'Select Time',
    availableSlots: 'Available Slots',
    
    // Appointment
    newAppointment: 'Book Another Appointment',
    appointmentBooked: 'Appointment Booked Successfully!',
    thankYou: 'Thank you for using our Hospital Kiosk System.',
    confirmAppointment: 'Confirm Your Appointment',
    doctorDetails: 'Doctor Details',
    patientDetails: 'Patient Details',
    symptoms: 'Describe your symptoms (optional)',
    symptomsPlaceholder: 'Please describe your current symptoms...',
    proceedPayment: 'Proceed to Payment',
    backToDoctors: 'Back to Doctors',
    consultationFee: 'Consultation Fee',
    
    // Payment
    paymentTitle: 'Complete Your Payment',
    paymentSecure: 'Secure payment via Razorpay',
    paymentMethod: 'Choose Payment Method',
    payNow: 'Pay Now',
    paymentSuccess: 'Payment Successful!',
    paymentFailed: 'Payment Failed',
    tryAgain: 'Try Again',
    processing: 'Processing Payment...',
  },
  
  hi: {
    // Common
    title: '🏥 अस्पताल की स्क्रीन',
    logout: 'बाहर निकलें',
    changeLanguage: 'भाषा बदलें',
    back: 'वापस',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    
    // Auth
    authTitle: '🏥 अस्पताल की स्क्रीन',
    authSubtitle: 'कृपया अपनी पहचान के लिए एक तरीका चुनें',
    biometric: 'अंगुली की छाप',
    biometricDesc: 'स्कैनर पर अंगुली रखें',
    aadhaar: 'आधार कार्ड',
    aadhaarDesc: '12 अंकों का नंबर डालें',
    aadhaarPlaceholder: 'आधार नंबर डालें',
    scanningFinger: 'अंगुली की जांच हो रही है...',
    verifyingAadhaar: 'आधार की जांच हो रही है...',
    wait: 'कृपया प्रतीक्षा करें',
    invalidAadhaar: 'अमान्य आधार नंबर। आधार बिल्कुल 12 अंकों का होना चाहिए।',
    aadhaarNotFound: 'आधार नंबर नहीं मिला।',
    
    // Doctor List
    selectDoctor: 'डॉक्टर चुनें',
    allDoctors: 'सभी डॉक्टर',
    experience: 'अनुभव',
    years: 'साल',
    rating: 'रेटिंग',
    selectSlot: 'समय चुनें',
    availableSlots: 'उपलब्ध समय',
    
    // Appointment
    newAppointment: 'नई अपॉइंटमेंट बुक करें',
    appointmentBooked: 'अपॉइंटमेंट बुक हो गई!',
    thankYou: 'हमारी सेवा का उपयोग करने के लिए धन्यवाद।',
    confirmAppointment: 'अपॉइंटमेंट की पुष्टि करें',
    doctorDetails: 'डॉक्टर का विवरण',
    patientDetails: 'मरीज का विवरण',
    symptoms: 'अपने लक्षण बताएं (वैकल्पिक)',
    symptomsPlaceholder: 'कृपया अपने लक्षण बताएं...',
    proceedPayment: 'भुगतान करें',
    backToDoctors: 'डॉक्टर सूची पर वापस',
    consultationFee: 'परामर्श शुल्क',
    
    // Payment
    paymentTitle: 'भुगतान पूरा करें',
    paymentSecure: 'Razorpay द्वारा सुरक्षित भुगतान',
    paymentMethod: 'भुगतान का तरीका चुनें',
    payNow: 'अभी भुगतान करें',
    paymentSuccess: 'भुगतान सफल!',
    paymentFailed: 'भुगतान विफल',
    tryAgain: 'पुनः प्रयास करें',
    processing: 'भुगतान हो रहा है...',
  },
  
  mr: {
    // Common
    title: '🏥 रुग्णालय कियोस्क',
    logout: 'बाहेर पडा',
    changeLanguage: 'भाषा बदला',
    back: 'मागे',
    cancel: 'रद्द करा',
    confirm: 'पुष्टी करा',
    
    // Auth
    authTitle: '🏥 रुग्णालय कियोस्क',
    authSubtitle: 'कृपया ओळखण्यासाठी एक मार्ग निवडा',
    biometric: 'बोटाचा ठसा',
    biometricDesc: 'स्कॅनरवर बोट ठेवा',
    aadhaar: 'आधार कार्ड',
    aadhaarDesc: '12 अंकी क्रमांक टाका',
    aadhaarPlaceholder: 'आधार क्रमांक टाका',
    scanningFinger: 'बोटाचा ठसा तपासत आहे...',
    verifyingAadhaar: 'आधार तपासत आहे...',
    wait: 'कृपया प्रतीक्षा करा',
    invalidAadhaar: 'अवैध आधार क्रमांक. आधार नेमका 12 अंकांचा असणे आवश्यक आहे.',
    aadhaarNotFound: 'आधार क्रमांक सापडला नाही.',
    
    // Doctor List
    selectDoctor: 'डॉक्टर निवडा',
    allDoctors: 'सर्व डॉक्टर',
    experience: 'अनुभव',
    years: 'वर्षे',
    rating: 'रेटिंग',
    selectSlot: 'वेळ निवडा',
    availableSlots: 'उपलब्ध वेळा',
    
    // Appointment
    newAppointment: 'नवीन भेट बुक करा',
    appointmentBooked: 'भेट यशस्वीरित्या बुक झाली!',
    thankYou: 'आमची सेवा वापरल्याबद्दल धन्यवाद.',
    confirmAppointment: 'तुमची भेट पुष्टी करा',
    doctorDetails: 'डॉक्टरचे तपशील',
    patientDetails: 'रुग्णाचे तपशील',
    symptoms: 'तुमची लक्षणे सांगा (ऐच्छिक)',
    symptomsPlaceholder: 'कृपया तुमची लक्षणे सांगा...',
    proceedPayment: 'पेमेंट करा',
    backToDoctors: 'डॉक्टर सूचीवर परत',
    consultationFee: 'सल्लामसलत शुल्क',
    
    // Payment
    paymentTitle: 'पेमेंट पूर्ण करा',
    paymentSecure: 'Razorpay द्वारे सुरक्षित पेमेंट',
    paymentMethod: 'पेमेंट पद्धत निवडा',
    payNow: 'आता पेमेंट करा',
    paymentSuccess: 'पेमेंट यशस्वी!',
    paymentFailed: 'पेमेंट अयशस्वी',
    tryAgain: 'पुन्हा प्रयत्न करा',
    processing: 'पेमेंट होत आहे...',
  },
  
  gu: {
    // Common
    title: '🏥 હોસ્પિટલ કિઓસ્ક',
    logout: 'બહાર નીકળો',
    changeLanguage: 'ભાષા બદલો',
    back: 'પાછા',
    cancel: 'રદ કરો',
    confirm: 'પુષ્ટિ કરો',
    
    // Auth
    authTitle: '🏥 હોસ્પિટલ કિઓસ્ક',
    authSubtitle: 'કૃપા કરીને ઓળખ માટે એક રીત પસંદ કરો',
    biometric: 'આંગળીની છાપ',
    biometricDesc: 'સ્કેનર પર આંગળી મૂકો',
    aadhaar: 'આધાર કાર્ડ',
    aadhaarDesc: '12 અંકનો નંબર દાખલ કરો',
    aadhaarPlaceholder: 'આધાર નંબર દાખલ કરો',
    scanningFinger: 'આંગળીની છાપ તપાસી રહ્યા છીએ...',
    verifyingAadhaar: 'આધાર તપાસી રહ્યા છીએ...',
    wait: 'કૃપા કરીને રાહ જુઓ',
    invalidAadhaar: 'અમાન્ય આધાર નંબર. આધાર બરાબર 12 અંકોનો હોવો જોઈએ.',
    aadhaarNotFound: 'આધાર નંબર મળ્યો નથી.',
    
    // Doctor List
    selectDoctor: 'ડૉક્ટર પસંદ કરો',
    allDoctors: 'બધા ડૉક્ટર',
    experience: 'અનુભવ',
    years: 'વર્ષ',
    rating: 'રેટિંગ',
    selectSlot: 'સમય પસંદ કરો',
    availableSlots: 'ઉપલબ્ધ સમય',
    
    // Appointment
    newAppointment: 'નવી એપોઇન્ટમેન્ટ બુક કરો',
    appointmentBooked: 'એપોઇન્ટમેન્ટ સફળતાપૂર્વક બુક થઈ!',
    thankYou: 'અમારી સેવાનો ઉપયોગ કરવા બદલ આભાર.',
    confirmAppointment: 'તમારી એપોઇન્ટમેન્ટની પુષ્ટિ કરો',
    doctorDetails: 'ડૉક્ટરની વિગતો',
    patientDetails: 'દર્દીની વિગતો',
    symptoms: 'તમારા લક્ષણો જણાવો (વૈકલ્પિક)',
    symptomsPlaceholder: 'કૃપા કરીને તમારા લક્ષણો જણાવો...',
    proceedPayment: 'ચુકવણી કરો',
    backToDoctors: 'ડૉક્ટર સૂચિ પર પાછા',
    consultationFee: 'સલાહ ફી',
    
    // Payment
    paymentTitle: 'ચુકવણી પૂર્ણ કરો',
    paymentSecure: 'Razorpay દ્વારા સુરક્ષિત ચુકવણી',
    paymentMethod: 'ચુકવણીની રીત પસંદ કરો',
    payNow: 'હમણાં ચુકવો',
    paymentSuccess: 'ચુકવણી સફળ!',
    paymentFailed: 'ચુકવણી નિષ્ફળ',
    tryAgain: 'ફરીથી પ્રયાસ કરો',
    processing: 'ચુકવણી થઈ રહી છે...',
  },
  
  ta: {
    // Common
    title: '🏥 மருத்துவமனை கியோஸ்க்',
    logout: 'வெளியேறு',
    changeLanguage: 'மொழி மாற்று',
    back: 'பின்',
    cancel: 'ரத்து செய்',
    confirm: 'உறுதிப்படுத்து',
    
    // Auth
    authTitle: '🏥 மருத்துவமனை கியோஸ்க்',
    authSubtitle: 'உங்களை அடையாளம் காண ஒரு வழியைத் தேர்ந்தெடுக்கவும்',
    biometric: 'கைரேகை',
    biometricDesc: 'ஸ்கேனரில் விரலை வைக்கவும்',
    aadhaar: 'ஆதார் அட்டை',
    aadhaarDesc: '12 இலக்க எண் உள்ளிடவும்',
    aadhaarPlaceholder: 'ஆதார் எண் உள்ளிடவும்',
    scanningFinger: 'கைரேகை ஸ்கேன் ஆகிறது...',
    verifyingAadhaar: 'ஆதார் சரிபார்க்கப்படுகிறது...',
    wait: 'தயவுசெய்து காத்திருக்கவும்',
    invalidAadhaar: 'தவறான ஆதார் எண். ஆதார் சரியாக 12 இலக்கங்களாக இருக்க வேண்டும்.',
    aadhaarNotFound: 'ஆதார் எண் கிடைக்கவில்லை.',
    
    // Doctor List
    selectDoctor: 'மருத்துவரைத் தேர்ந்தெடுக்கவும்',
    allDoctors: 'அனைத்து மருத்துவர்கள்',
    experience: 'அனுபவம்',
    years: 'ஆண்டுகள்',
    rating: 'மதிப்பீடு',
    selectSlot: 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
    availableSlots: 'கிடைக்கும் நேரங்கள்',
    
    // Appointment
    newAppointment: 'புதிய சந்திப்பை பதிவு செய்யவும்',
    appointmentBooked: 'சந்திப்பு வெற்றிகரமாக பதிவு செய்யப்பட்டது!',
    thankYou: 'எங்கள் சேவையைப் பயன்படுத்தியதற்கு நன்றி.',
    confirmAppointment: 'உங்கள் சந்திப்பை உறுதிப்படுத்தவும்',
    doctorDetails: 'மருத்துவர் விவரங்கள்',
    patientDetails: 'நோயாளி விவரங்கள்',
    symptoms: 'உங்கள் அறிகுறிகளை விவரிக்கவும் (விருப்பமானது)',
    symptomsPlaceholder: 'தயவுசெய்து உங்கள் அறிகுறிகளை விவரிக்கவும்...',
    proceedPayment: 'பணம் செலுத்தவும்',
    backToDoctors: 'மருத்துவர் பட்டியலுக்குத் திரும்பு',
    consultationFee: 'ஆலோசனைக் கட்டணம்',
    
    // Payment
    paymentTitle: 'பணம் செலுத்துதலை முடிக்கவும்',
    paymentSecure: 'Razorpay மூலம் பாதுகாப்பான பணம் செலுத்துதல்',
    paymentMethod: 'பணம் செலுத்தும் முறையைத் தேர்ந்தெடுக்கவும்',
    payNow: 'இப்போது செலுத்து',
    paymentSuccess: 'பணம் செலுத்துதல் வெற்றி!',
    paymentFailed: 'பணம் செலுத்துதல் தோல்வி',
    tryAgain: 'மீண்டும் முயற்சிக்கவும்',
    processing: 'பணம் செலுத்தப்படுகிறது...',
  },
  
  te: {
    // Common
    title: '🏥 హాస్పిటల్ కియోస్క్',
    logout: 'లాగ్ అవుట్',
    changeLanguage: 'భాష మార్చు',
    back: 'వెనుకకు',
    cancel: 'రద్దు చేయి',
    confirm: 'నిర్ధారించు',
    
    // Auth
    authTitle: '🏥 హాస్పిటల్ కియోస్క్',
    authSubtitle: 'దయచేసి మిమ్మల్ని గుర్తించడానికి ఒక మార్గాన్ని ఎంచుకోండి',
    biometric: 'వేలిముద్ర',
    biometricDesc: 'స్కానర్‌పై వేలు ఉంచండి',
    aadhaar: 'ఆధార్ కార్డ్',
    aadhaarDesc: '12 అంకెల నంబర్ నమోదు చేయండి',
    aadhaarPlaceholder: 'ఆధార్ నంబర్ నమోదు చేయండి',
    scanningFinger: 'వేలిముద్ర స్కాన్ అవుతోంది...',
    verifyingAadhaar: 'ఆధార్ ధృవీకరించబడుతోంది...',
    wait: 'దయచేసి వేచి ఉండండి',
    invalidAadhaar: 'చెల్లని ఆధార్ నంబర్. ఆధార్ సరిగ్గా 12 అంకెలు ఉండాలి.',
    aadhaarNotFound: 'ఆధార్ నంబర్ కనుగొనబడలేదు.',
    
    // Doctor List
    selectDoctor: 'డాక్టర్‌ను ఎంచుకోండి',
    allDoctors: 'అన్ని డాక్టర్లు',
    experience: 'అనుభవం',
    years: 'సంవత్సరాలు',
    rating: 'రేటింగ్',
    selectSlot: 'సమయాన్ని ఎంచుకోండి',
    availableSlots: 'అందుబాటులో ఉన్న సమయాలు',
    
    // Appointment
    newAppointment: 'కొత్త అపాయింట్‌మెంట్ బుక్ చేయండి',
    appointmentBooked: 'అపాయింట్‌మెంట్ విజయవంతంగా బుక్ అయింది!',
    thankYou: 'మా సేవను ఉపయోగించినందుకు ధన్యవాదాలు.',
    confirmAppointment: 'మీ అపాయింట్‌మెంట్‌ను నిర్ధారించండి',
    doctorDetails: 'డాక్టర్ వివరాలు',
    patientDetails: 'రోగి వివరాలు',
    symptoms: 'మీ లక్షణాలను వివరించండి (ఐచ్ఛికం)',
    symptomsPlaceholder: 'దయచేసి మీ లక్షణాలను వివరించండి...',
    proceedPayment: 'చెల్లింపు చేయండి',
    backToDoctors: 'డాక్టర్ల జాబితాకు తిరిగి వెళ్ళు',
    consultationFee: 'సంప్రదింపు రుసుము',
    
    // Payment
    paymentTitle: 'చెల్లింపు పూర్తి చేయండి',
    paymentSecure: 'Razorpay ద్వారా సురక్షిత చెల్లింపు',
    paymentMethod: 'చెల్లింపు విధానాన్ని ఎంచుకోండి',
    payNow: 'ఇప్పుడు చెల్లించండి',
    paymentSuccess: 'చెల్లింపు విజయవంతం!',
    paymentFailed: 'చెల్లింపు విఫలం',
    tryAgain: 'మళ్ళీ ప్రయత్నించండి',
    processing: 'చెల్లింపు జరుగుతోంది...',
  }
};

export const getTranslation = (language: string): Translations => {
  return translations[language as Language] || translations.en;
};

// Store and retrieve language from localStorage
export const saveLanguage = (language: string) => {
  localStorage.setItem('hospitalKioskLanguage', language);
};

export const getSavedLanguage = (): Language => {
  const saved = localStorage.getItem('hospitalKioskLanguage');
  if (saved && (saved in translations)) {
    return saved as Language;
  }
  return 'en';
};
