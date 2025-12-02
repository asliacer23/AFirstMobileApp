import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/lib/storage';
import { lessons, getLessonsByCategory } from '@/lib/lessons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, Clock, BookOpen, Trophy } from 'lucide-react';

export default function Lessons() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const progress = user ? storageService.getProgress(user.id) : null;
  
  const defaultCategory = searchParams.get('category') as 'html' | 'css' | 'javascript' | null;
  const [activeTab, setActiveTab] = useState<string>(defaultCategory || 'html');

  const renderLessonCard = (lesson: typeof lessons[0]) => {
    const isCompleted = progress?.completedLessons.includes(lesson.id);
    
    return (
      <Card
        key={lesson.id}
        className="p-6 hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => navigate(`/lessons/${lesson.id}`)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {lesson.title}
              </h3>
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{lesson.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={lesson.difficulty === 'beginner' ? 'default' : lesson.difficulty === 'intermediate' ? 'secondary' : 'outline'}>
            {lesson.difficulty}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            ~15 min
          </Badge>
        </div>
      </Card>
    );
  };

  const categories = [
    { value: 'html', label: 'HTML', icon: '📄' },
    { value: 'css', label: 'CSS', icon: '🎨' },
    { value: 'javascript', label: 'JavaScript', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Learning Modules</h1>
              <p className="text-sm text-muted-foreground">Master web development fundamentals</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{cat.label} Course</h2>
                  <p className="text-muted-foreground">
                    {getLessonsByCategory(cat.value as any).length} lessons to complete
                  </p>
                </div>
                <Button onClick={() => navigate(`/quiz/${cat.value}-quiz`)}>
                  <Trophy className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {getLessonsByCategory(cat.value as any).map(renderLessonCard)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
