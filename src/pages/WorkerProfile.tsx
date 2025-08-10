import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, CheckCircle, Calendar, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer_name: string;
  created_at: string;
  job_title: string;
}

interface WorkerProfile {
  id: string;
  user_id: string;
  bio: string;
  hourly_rate: number;
  experience_years: number;
  location: string;
  service_area: string[];
  is_available: boolean;
  is_verified: boolean;
  portfolio_images: string[];
  skills: string[];
  rating: number;
  total_jobs: number;
  user: {
    full_name: string;
    email: string;
    phone: string;
  };
  services: Array<{
    name: string;
    experience_level: string;
  }>;
}

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isCustomer } = useAuth();
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      if (!id) return;

      try {
        // Fetch worker profile with user data and services
        const { data: workerData, error: workerError } = await supabase
          .from('worker_profiles')
          .select(`
            *,
            users!inner(full_name, email, phone),
            worker_services!inner(
              services!inner(name),
              experience_level
            )
          `)
          .eq('id', id)
          .single();

        if (workerError) throw workerError;

        // Transform the data
        const transformedWorker: WorkerProfile = {
          ...workerData,
          user: workerData.users,
          services: workerData.worker_services.map((ws: any) => ({
            name: ws.services.name,
            experience_level: ws.experience_level,
          })),
        };

        setWorker(transformedWorker);

        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            *,
            reviewer:users!reviewer_id(full_name),
            job:jobs!job_id(title)
          `)
          .eq('reviewee_id', workerData.user_id)
          .order('created_at', { ascending: false });

        if (reviewsError) throw reviewsError;

        const transformedReviews: Review[] = reviewsData.map((review: any) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          reviewer_name: review.reviewer.full_name,
          created_at: review.created_at,
          job_title: review.job.title,
        }));

        setReviews(transformedReviews);
      } catch (error) {
        console.error('Error fetching worker profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerProfile();
  }, [id]);

  const handleHireNow = () => {
    if (!user) {
      navigate('/auth?type=customer');
      return;
    }
    // Navigate to hiring flow or open hiring modal
    // This would be implemented based on your hiring workflow
    console.log('Hire worker:', worker?.id);
  };

  const generateAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Worker not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={generateAvatar(worker.user.full_name)} />
                <AvatarFallback>{worker.user.full_name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl font-bold">{worker.user.full_name}</h2>
                  {worker.is_verified && (
                    <CheckCircle className="h-6 w-6 text-success" />
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{worker.rating.toFixed(1)} ({reviews.length} {t('workers.reviews')})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>{worker.total_jobs} {t('workers.completedJobs')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {worker.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {t(`services.${service.name.toLowerCase()}`)} ({t(`filters.${service.experience_level}`)})
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={worker.is_available ? 'default' : 'secondary'}>
                    <Clock className="h-3 w-3 mr-1" />
                    {worker.is_available ? t('workers.available') : t('workers.unavailable')}
                  </Badge>
                  <span className="font-semibold text-lg">
                    ₹{worker.hourly_rate}/{t('workers.hourlyRate')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 lg:w-64">
              <Button 
                size="lg" 
                onClick={handleHireNow}
                disabled={!worker.is_available}
                className="w-full"
              >
                {t('workers.hireNow')}
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('common.overview') || 'Overview'}</TabsTrigger>
            <TabsTrigger value="portfolio">{t('profile.portfolio')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('workers.reviews')}</TabsTrigger>
            <TabsTrigger value="contact">{t('profile.contactInfo')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.bio')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {worker.bio || `${worker.experience_years} साल का अनुभव रखने वाला पेशेवर। विभिन्न प्रकार की सेवाओं में विशेषज्ञता।`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('profile.skills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {worker.skills?.length > 0 ? (
                    worker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))
                  ) : (
                    worker.services.map((service, index) => (
                      <Badge key={index} variant="outline">
                        {t(`services.${service.name.toLowerCase()}`)}
                      </Badge>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Experience</h4>
                    <p className="text-muted-foreground">{worker.experience_years} years</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Service Areas</h4>
                    <p className="text-muted-foreground">
                      {worker.service_area?.join(', ') || worker.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  {t('profile.portfolio')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {worker.portfolio_images?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {worker.portfolio_images.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No portfolio images available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.reviewer_name}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.job_title} • {formatDate(review.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No reviews yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.contactInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{worker.user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{worker.user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{worker.location}</span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerProfile;