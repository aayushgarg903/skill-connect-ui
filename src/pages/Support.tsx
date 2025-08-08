import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "त्रुटि",
        description: "कृपया सभी आवश्यक फील्ड भरें",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "संदेश भेजा गया",
      description: "आपका संदेश सफलतापूर्वक भेजा गया है। हम 24 घंटे के भीतर जवाब देंगे।",
    });

    setContactForm({ name: '', email: '', category: '', message: '' });
  };

  const supportOptions = [
    {
      title: 'फोन सहायता',
      description: 'सीधे हमारी टीम से बात करें',
      icon: Phone,
      action: 'कॉल करें: +91 98765 43210',
      availability: 'सोमवार-शनिवार, 9 AM - 7 PM',
    },
    {
      title: 'ईमेल सहायता',
      description: 'विस्तृत सहायता के लिए ईमेल करें',
      icon: Mail,
      action: 'ईमेल: support@direhire.com',
      availability: '24 घंटे के भीतर जवाब',
    },
    {
      title: 'लाइव चैट',
      description: 'तुरंत सहायता के लिए चैट करें',
      icon: MessageCircle,
      action: 'चैट शुरू करें',
      availability: 'सोमवार-शुक्रवार, 10 AM - 6 PM',
    },
  ];

  const faqItems = [
    {
      question: 'DiReHire कैसे काम करता है?',
      answer: 'DiReHire एक मार्केटप्लेस है जहाँ ग्राहक कुशल श्रमिकों को खोज सकते हैं। ग्राहक अपनी आवश्यकता के अनुसार श्रमिक चुन सकते हैं, उनके रेटिंग और समीक्षाएं देख सकते हैं, और सीधे संपर्क कर सकते हैं।'
    },
    {
      question: 'श्रमिक के रूप में रजिस्ट्रेशन कैसे करें?',
      answer: '"Join as Worker" पर क्लिक करें, अपनी जानकारी भरें, आधार कार्ड की जानकारी दें, OTP से फोन नंबर सत्यापित करें। रजिस्ट्रेशन के बाद अपनी प्रोफाइल पूरी करें।'
    },
    {
      question: 'भुगतान कैसे होता है?',
      answer: 'भुगतान डिजिटल माध्यम से होता है। काम पूरा होने के बाद ग्राहक ऑनलाइन भुगतान कर सकते हैं। UPI, कार्ड, और नेट बैंकिंग सभी उपलब्ध हैं।'
    },
    {
      question: 'श्रमिकों की सत्यापना कैसे होती है?',
      answer: 'सभी श्रमिकों का आधार कार्ड सत्यापन, फोन नंबर सत्यापन, और कौशल प्रमाणन किया जाता है। सत्यापित श्रमिकों को "Verified" बैज मिलता है।'
    },
    {
      question: 'क्या कोई फीस है?',
      answer: 'ग्राहकों के लिए प्लेटफॉर्म का उपयोग मुफ्त है। श्रमिकों से केवल सफल बुकिंग पर छोटी सी कमीशन ली जाती है।'
    },
    {
      question: 'काम की गुणवत्ता की गारंटी कैसे है?',
      answer: 'हमारे पास रेटिंग सिस्टम, ग्राहक समीक्षाएं, और शिकायत निवारण प्रक्रिया है। खराब सेवा की स्थिति में फुल रिफंड की गारंटी है।'
    },
    {
      question: 'कौन सी सेवाएं उपलब्ध हैं?',
      answer: 'बढ़ई, रंगसाज, नलसाज, बिजली मिस्त्री, राजमिस्त्री, सफाई कर्मी, माली, रसोइया, ड्राइवर, और शिक्षक जैसी सभी प्रमुख सेवाएं उपलब्ध हैं।'
    },
    {
      question: 'आपातकाल में तुरंत सेवा मिल सकती है?',
      answer: 'हाँ, "Same Day" urgency option चुनकर आप तुरंत उपलब्ध श्रमिकों को खोज सकते हैं। आपातकालीन सेवाओं के लिए 24/7 सहायता उपलब्ध है।'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">सहायता केंद्र</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            हम आपकी सहायता के लिए यहाँ हैं। कोई भी प्रश्न हो तो संपर्क करें।
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Support Options */}
        <section>
          <h2 className="text-2xl font-bold mb-6">तुरंत सहायता</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-3">
                    <option.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">
                    {option.action}
                  </Button>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{option.availability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-2xl font-bold mb-6">संदेश भेजें</h2>
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>संपर्क फॉर्म</CardTitle>
              <CardDescription>
                हम 24 घंटे के भीतर आपके संदेश का जवाब देंगे
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">नाम *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="आपका नाम"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">ईमेल *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="आपका ईमेल"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">श्रेणी</Label>
                  <Input
                    id="category"
                    type="text"
                    value={contactForm.category}
                    onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                    placeholder="तकनीकी समस्या, भुगतान, खाता, अन्य"
                  />
                </div>

                <div>
                  <Label htmlFor="message">संदेश *</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="अपनी समस्या या प्रश्न विस्तार से लिखें..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  संदेश भेजें
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            अक्सर पूछे जाने वाले प्रश्न
          </h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Service Status */}
        <section>
          <h2 className="text-2xl font-bold mb-6">सेवा स्थिति</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                सभी सेवाएं चालू हैं
              </CardTitle>
              <CardDescription>
                सिस्टम स्टेटस - सभी सेवाएं सामान्य रूप से चल रही हैं
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <span className="font-medium">वेबसाइट & ऐप</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-700">चालू</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <span className="font-medium">भुगतान सिस्टम</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-700">चालू</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <span className="font-medium">सूचना सेवा</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-700">चालू</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Support;