import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Certificates() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const progress = user ? storageService.getProgress(user.id) : null;

  const handleDownload = (certificate: any) => {
    toast({
      title: 'Download started',
      description: 'Your certificate is being prepared...',
    });
    // In a real app, this would generate and download a PDF
  };

  const handleShare = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate: ${certificate.courseName}`,
        text: `I earned a certificate in ${certificate.courseName}!`,
      });
    } else {
      toast({
        title: 'Link copied!',
        description: 'Certificate link copied to clipboard',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Certificates</h1>
              <p className="text-sm text-muted-foreground">Your achievements</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {progress?.certificates && progress.certificates.length > 0 ? (
          <div className="space-y-6">
            {progress.certificates.map((cert) => (
              <Card key={cert.id} className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <div className="absolute top-4 right-4">
                  <Award className="w-12 h-12 text-primary/20" />
                </div>
                
                <div className="relative space-y-6">
                  <div className="text-center space-y-2">
                    <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold">Certificate of Completion</h2>
                    <p className="text-muted-foreground">This certifies that</p>
                    <p className="text-2xl font-bold text-primary">{cert.studentName}</p>
                    <p className="text-muted-foreground">has successfully completed</p>
                    <p className="text-xl font-semibold">{cert.courseName}</p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Date Earned</p>
                      <p className="font-medium">
                        {new Date(cert.dateEarned).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate ID</p>
                      <p className="font-mono text-sm">{cert.id.slice(0, 8)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => handleDownload(cert)} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={() => handleShare(cert)} variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center space-y-4">
            <div className="inline-block p-4 bg-muted rounded-full">
              <Award className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">No certificates yet</h2>
              <p className="text-muted-foreground mb-6">
                Complete all lessons and pass quizzes to earn your first certificate!
              </p>
              <Button onClick={() => navigate('/lessons')}>
                Start Learning
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
