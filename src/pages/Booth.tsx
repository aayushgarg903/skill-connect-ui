import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Star, MapPin, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Booth = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const marketplaceStats = [
    { label: 'कुल श्रमिक', value: '5,000+', icon: Users, color: 'text-blue-600' },
    { label: 'औसत रेटिंग', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { label: 'शहर', value: '50+', icon: MapPin, color: 'text-green-600' },
    { label: 'पूर्ण कार्य', value: '25,000+', icon: Award, color: 'text-purple-600' },
  ];

  const topCategories = [
    { name: 'बढ़ई', workers: 1200, avgRating: 4.9, icon: '🔨' },
    { name: 'रंगसाज', workers: 950, avgRating: 4.8, icon: '🎨' },
    { name: 'नलसाज', workers: 800, avgRating: 4.7, icon: '🔧' },
    { name: 'बिजली मिस्त्री', workers: 650, avgRating: 4.8, icon: '⚡' },
    { name: 'राजमिस्त्री', workers: 550, avgRating: 4.6, icon: '🧱' },
    { name: 'सफाई कर्मी', workers: 750, avgRating: 4.9, icon: '🧹' },
  ];

  const recentActivity = [
    { type: 'new_worker', message: 'राम कुमार जी ने बढ़ई के रूप में रजिस्ट्रेशन किया', time: '2 घंटे पहले' },
    { type: 'job_completed', message: 'मुंबई में पेंटिंग का काम सफलतापूर्वक पूरा', time: '4 घंटे पहले' },
    { type: 'high_rating', message: 'सुरेश जी को 5 स्टार रेटिंग मिली', time: '6 घंटे पहले' },
    { type: 'milestone', message: '25,000 कार्य पूरे होने का मील का पत्थर', time: '1 दिन पहले' },
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
            <h1 className="text-3xl font-bold">DiReHire बूथ</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            मार्केटप्लेस की स्थिति, आंकड़े और गतिविधियों का विवरण
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Marketplace Stats */}
        <section>
          <h2 className="text-2xl font-bold mb-6">मार्केटप्लेस आंकड़े</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketplaceStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">शीर्ष सेवा श्रेणियां</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{category.workers} श्रमिक</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{category.avgRating} औसत रेटिंग</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>बढ़ रहा</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-bold mb-6">हाल की गतिविधि</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                लाइव अपडेट
              </CardTitle>
              <CardDescription>
                प्लेटफॉर्म पर हाल ही में हुई गतिविधियां
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Platform Features */}
        <section>
          <h2 className="text-2xl font-bold mb-6">प्लेटफॉर्म की विशेषताएं</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>श्रमिकों के लिए</CardTitle>
                <CardDescription>
                  पेशेवर श्रमिकों के लिए उपलब्ध सुविधाएं
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">निःशुल्क प्रोफाइल बनाएं</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">सीधे ग्राहकों से जुड़ें</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">ऑनलाइन पेमेंट प्राप्त करें</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">अपना पोर्टफोलियो दिखाएं</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ग्राहकों के लिए</CardTitle>
                <CardDescription>
                  ग्राहकों के लिए उपलब्ध सुविधाएं
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">सत्यापित श्रमिक खोजें</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">पारदर्शी मूल्य निर्धारण</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">वास्तविक समीक्षाएं पढ़ें</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">सुरक्षित भुगतान</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">DiReHire में शामिल हों</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                भारत के सबसे तेज़ी से बढ़ते कुशल श्रमिक मार्केटप्लेस का हिस्सा बनें। 
                चाहे आप काम खोज रहे हों या कुशल श्रमिक, हमारे पास आपके लिए सही समाधान है।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth?type=customer')}
                >
                  ग्राहक के रूप में जुड़ें
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/auth?type=worker')}
                >
                  श्रमिक के रूप में जुड़ें
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Booth;