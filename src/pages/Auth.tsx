import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Phone, Shield, Globe } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp, signIn, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const userType = searchParams.get('type') as 'customer' | 'worker' || 'customer';
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    pincode: '',
    aadharNumber: '',
    languagePreference: 'hi' as 'hi' | 'en',
  });
  const [otpCode, setOtpCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.location) newErrors.location = 'Location is required';
      
      if (userType === 'worker') {
        if (!formData.pincode) newErrors.pincode = 'Pin code is required';
        if (!formData.aadharNumber) newErrors.aadharNumber = 'Aadhar number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (mode === 'login') {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else if (mode === 'signup') {
      // For workers, simulate OTP step
      if (userType === 'worker') {
        setMode('otp');
        toast({
          title: "OTP Sent",
          description: `OTP sent to ${formData.phone}`,
        });
        return;
      }
      
      // For customers, proceed directly
      const userData = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        location: formData.location,
        role: userType,
        language_preference: formData.languagePreference,
        ...(userType === 'worker' ? {
          pincode: formData.pincode,
          aadhar_number: formData.aadharNumber,
        } : {}),
      };

      const { error } = await signUp(formData.email, formData.password, userData);
      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to verify your account.",
        });
        navigate('/');
      }
    }
  };

  const handleOtpVerification = async () => {
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    const userData = {
      full_name: `${formData.firstName} ${formData.lastName}`,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      location: formData.location,
      role: userType,
      language_preference: formData.languagePreference,
      pincode: formData.pincode,
      aadhar_number: formData.aadharNumber,
      phone_verified: true,
    };

    const { error } = await signUp(formData.email, formData.password, userData);
    if (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate('/');
    }
  };

  if (mode === 'otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <Shield className="h-6 w-6 text-primary" />
              {t('auth.otpVerification')}
            </CardTitle>
            <CardDescription>
              OTP भेजा गया है {formData.phone} पर
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="otp">{t('auth.enterOtp')}</Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="6-digit OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <Button onClick={handleOtpVerification} className="w-full" disabled={loading}>
              {t('auth.verifyOtp')}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setMode('signup')}>
              {t('common.back')}
            </Button>
            <Button variant="ghost" className="w-full text-sm">
              {t('auth.resendOtp')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <CardTitle>
                {mode === 'login' ? t('auth.login') : t('auth.signup')}
                {mode === 'signup' && (
                  <span className="text-primary ml-2">
                    ({userType === 'worker' ? t('nav.joinAsWorker') : t('nav.findWorkers')})
                  </span>
                )}
              </CardTitle>
            </div>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-4 w-4" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t('auth.firstName')} *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('auth.lastName')} *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-1" />
                    {t('auth.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="location">{t('auth.location')} *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Delhi, Mumbai, Bangalore..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={errors.location ? 'border-destructive' : ''}
                  />
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>

                {userType === 'worker' && (
                  <>
                    <div>
                      <Label htmlFor="pincode">{t('auth.pincode')} *</Label>
                      <Input
                        id="pincode"
                        type="text"
                        maxLength={6}
                        placeholder="110001"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                        className={errors.pincode ? 'border-destructive' : ''}
                      />
                      {errors.pincode && <p className="text-sm text-destructive">{errors.pincode}</p>}
                    </div>

                    <div>
                      <Label htmlFor="aadhar">{t('auth.aadharNumber')} *</Label>
                      <Input
                        id="aadhar"
                        type="text"
                        maxLength={12}
                        placeholder="1234 5678 9012"
                        value={formData.aadharNumber}
                        onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value.replace(/\D/g, '') })}
                        className={errors.aadharNumber ? 'border-destructive' : ''}
                      />
                      {errors.aadharNumber && <p className="text-sm text-destructive">{errors.aadharNumber}</p>}
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="languagePreference">{t('auth.languagePreference')}</Label>
                  <Select
                    value={formData.languagePreference}
                    onValueChange={(value: 'hi' | 'en') => setFormData({ ...formData, languagePreference: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">{t('auth.email')} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password">{t('auth.password')} *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {mode === 'signup' && (
              <div>
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')} *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={errors.confirmPassword ? 'border-destructive' : ''}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common.loading') : mode === 'login' ? t('auth.login') : t('auth.createAccount')}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setErrors({});
                }}
              >
                {mode === 'login' ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;