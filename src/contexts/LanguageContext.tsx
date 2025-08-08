import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  hi: {
    // Navbar
    'nav.home': 'मुख्य पृष्ठ',
    'nav.booth': 'बूथ',
    'nav.support': 'सहायता',
    'nav.findWorkers': 'श्रमिक खोजें',
    'nav.joinAsWorker': 'श्रमिक के रूप में जुड़ें',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Hero Section
    'hero.title': 'विश्वसनीय स्थानीय श्रमिक खोजें',
    'hero.subtitle': 'घर की मरम्मत से लेकर निर्माण तक - सभी सेवाओं के लिए कुशल पेशेवर',
    'hero.serviceType': 'सेवा का प्रकार',
    'hero.location': 'स्थान',
    'hero.preferredDate': 'पसंदीदा दिनांक',
    'hero.urgency': 'तत्काल आवश्यकता',
    'hero.searchWorkers': 'श्रमिक खोजें',
    'hero.popularServices': 'लोकप्रिय सेवाएं',
    
    // Services
    'services.carpenter': 'बढ़ई',
    'services.painter': 'रंगसाज',
    'services.plumber': 'नलसाज',
    'services.electrician': 'बिजली मिस्त्री',
    'services.mason': 'राजमिस्त्री',
    'services.cleaner': 'सफाई कर्मी',
    'services.gardener': 'माली',
    'services.cook': 'रसोइया',
    'services.driver': 'ड्राइवर',
    'services.tutor': 'शिक्षक',
    
    // Worker Listings
    'workers.title': 'उपलब्ध श्रमिक',
    'workers.sortBy': 'क्रम में लगाएं',
    'workers.rating': 'रेटिंग',
    'workers.price': 'मूल्य',
    'workers.experience': 'अनुभव',
    'workers.viewProfile': 'प्रोफाइल देखें',
    'workers.hireNow': 'अभी किराए पर लें',
    'workers.available': 'उपलब्ध',
    'workers.unavailable': 'अनुपलब्ध',
    'workers.verified': 'सत्यापित',
    'workers.hourlyRate': 'प्रति घंटा दर',
    'workers.projectRate': 'प्रोजेक्ट दर',
    'workers.completedJobs': 'पूर्ण कार्य',
    'workers.reviews': 'समीक्षाएं',
    
    // Filters
    'filters.title': 'फ़िल्टर',
    'filters.clear': 'साफ़ करें',
    'filters.priceRange': 'मूल्य सीमा',
    'filters.serviceType': 'सेवा का प्रकार',
    'filters.experienceLevel': 'अनुभव स्तर',
    'filters.availability': 'उपलब्धता',
    'filters.workPreference': 'कार्य वरीयता',
    'filters.beginner': 'नौसिखिया',
    'filters.intermediate': 'मध्यम',
    'filters.expert': 'विशेषज्ञ',
    'filters.today': 'आज',
    'filters.thisWeek': 'इस सप्ताह',
    'filters.flexible': 'लचीला',
    'filters.onsite': 'घर पर',
    'filters.remote': 'दूर से',
    
    // Auth Forms
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.firstName': 'पहला नाम',
    'auth.lastName': 'अंतिम नाम',
    'auth.phone': 'फोन नंबर',
    'auth.location': 'स्थान',
    'auth.pincode': 'पिन कोड',
    'auth.aadharNumber': 'आधार नंबर',
    'auth.languagePreference': 'भाषा वरीयता',
    'auth.createAccount': 'खाता बनाएं',
    'auth.alreadyHaveAccount': 'पहले से खाता है?',
    'auth.dontHaveAccount': 'खाता नहीं है?',
    'auth.otpVerification': 'OTP सत्यापन',
    'auth.enterOtp': 'OTP दर्ज करें',
    'auth.verifyOtp': 'OTP सत्यापित करें',
    'auth.resendOtp': 'OTP दोबारा भेजें',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.yes': 'हां',
    'common.no': 'नहीं',
    'common.back': 'वापस',
    'common.next': 'आगे',
    'common.previous': 'पिछला',
    'common.submit': 'प्रस्तुत करें',
    
    // Urgency levels
    'urgency.sameDay': 'आज ही',
    'urgency.withinWeek': 'इस सप्ताह के भीतर',
    'urgency.flexible': 'लचीला',
    
    // Status
    'status.pending': 'लंबित',
    'status.accepted': 'स्वीकृत',
    'status.inProgress': 'प्रगति में',
    'status.completed': 'पूर्ण',
    'status.cancelled': 'रद्द',
    
    // Profile
    'profile.title': 'प्रोफाइल',
    'profile.bio': 'जीवनी',
    'profile.skills': 'कौशल',
    'profile.portfolio': 'पोर्टफोलियो',
    'profile.contactInfo': 'संपर्क जानकारी',
    'profile.workHistory': 'कार्य इतिहास',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.booth': 'Booth',
    'nav.support': 'Support',
    'nav.findWorkers': 'Find Workers',
    'nav.joinAsWorker': 'Join as Worker',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Find Trusted Local Workers',
    'hero.subtitle': 'From home repairs to construction - skilled professionals for all your needs',
    'hero.serviceType': 'Service Type',
    'hero.location': 'Location',
    'hero.preferredDate': 'Preferred Date',
    'hero.urgency': 'Urgency',
    'hero.searchWorkers': 'Search Workers',
    'hero.popularServices': 'Popular Services',
    
    // Services
    'services.carpenter': 'Carpenter',
    'services.painter': 'Painter',
    'services.plumber': 'Plumber',
    'services.electrician': 'Electrician',
    'services.mason': 'Mason',
    'services.cleaner': 'Cleaner',
    'services.gardener': 'Gardener',
    'services.cook': 'Cook',
    'services.driver': 'Driver',
    'services.tutor': 'Tutor',
    
    // Worker Listings
    'workers.title': 'Available Workers',
    'workers.sortBy': 'Sort by',
    'workers.rating': 'Rating',
    'workers.price': 'Price',
    'workers.experience': 'Experience',
    'workers.viewProfile': 'View Profile',
    'workers.hireNow': 'Hire Now',
    'workers.available': 'Available',
    'workers.unavailable': 'Unavailable',
    'workers.verified': 'Verified',
    'workers.hourlyRate': 'Hourly Rate',
    'workers.projectRate': 'Project Rate',
    'workers.completedJobs': 'Completed Jobs',
    'workers.reviews': 'Reviews',
    
    // Filters
    'filters.title': 'Filters',
    'filters.clear': 'Clear',
    'filters.priceRange': 'Price Range',
    'filters.serviceType': 'Service Type',
    'filters.experienceLevel': 'Experience Level',
    'filters.availability': 'Availability',
    'filters.workPreference': 'Work Preference',
    'filters.beginner': 'Beginner',
    'filters.intermediate': 'Intermediate',
    'filters.expert': 'Expert',
    'filters.today': 'Today',
    'filters.thisWeek': 'This Week',
    'filters.flexible': 'Flexible',
    'filters.onsite': 'On-site',
    'filters.remote': 'Remote',
    
    // Auth Forms
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.phone': 'Phone Number',
    'auth.location': 'Location',
    'auth.pincode': 'Pin Code',
    'auth.aadharNumber': 'Aadhar Number',
    'auth.languagePreference': 'Language Preference',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.otpVerification': 'OTP Verification',
    'auth.enterOtp': 'Enter OTP',
    'auth.verifyOtp': 'Verify OTP',
    'auth.resendOtp': 'Resend OTP',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    
    // Urgency levels
    'urgency.sameDay': 'Same Day',
    'urgency.withinWeek': 'Within Week',
    'urgency.flexible': 'Flexible',
    
    // Status
    'status.pending': 'Pending',
    'status.accepted': 'Accepted',
    'status.inProgress': 'In Progress',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    
    // Profile
    'profile.title': 'Profile',
    'profile.bio': 'Bio',
    'profile.skills': 'Skills',
    'profile.portfolio': 'Portfolio',
    'profile.contactInfo': 'Contact Information',
    'profile.workHistory': 'Work History',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'hi' | 'en'>('hi'); // Default to Hindi

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'hi' | 'en';
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: 'hi' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};