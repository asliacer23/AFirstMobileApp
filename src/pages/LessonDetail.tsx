import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/lib/storage';
import { getLessonById } from '@/lib/lessons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const lesson = id ? getLessonById(id) : null;
  const progress = user ? storageService.getProgress(user.id) : null;
  const isCompleted = progress?.completedLessons.includes(id || '') || false;
  const [isBookmarked, setIsBookmarked] = useState(
    progress?.bookmarks.includes(id || '') || false
  );

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    if (user && id) {
      storageService.markLessonComplete(user.id, id);
      toast({
        title: 'Lesson completed! 🎉',
        description: 'Keep up the great work!',
      });
      navigate('/lessons');
    }
  };

  const handleBookmark = () => {
    if (user && id) {
      const newState = storageService.toggleBookmark(user.id, id);
      setIsBookmarked(newState);
      toast({
        title: newState ? 'Bookmark added' : 'Bookmark removed',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/lessons')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
                <p className="text-sm text-muted-foreground capitalize">{lesson.category}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleBookmark}>
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <BookmarkPlus className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{lesson.difficulty}</Badge>
              {isCompleted && (
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </Badge>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">About this lesson</h2>
              <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Code Example</h2>
            <div className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code>{lesson.codeExample}</code>
              </pre>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Practice Notes</h2>
            <p className="text-muted-foreground leading-relaxed">{lesson.practiceNotes}</p>
          </Card>

          {!isCompleted && (
            <Button onClick={handleComplete} className="w-full" size="lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
