import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/lib/storage';
import { lessons } from '@/lib/lessons';
import { quizzes } from '@/lib/quizzes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, LogOut, MessageSquare, Code, Palette, Braces } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const progress = user ? storageService.getProgress(user.id) : null;

  const totalLessons = lessons.length;
  const completedCount = progress?.completedLessons.length || 0;
  const progressPercent = (completedCount / totalLessons) * 100;

  const htmlLessons = lessons.filter(l => l.category === 'html');
  const cssLessons = lessons.filter(l => l.category === 'css');
  const jsLessons = lessons.filter(l => l.category === 'javascript');

  const htmlComplete = htmlLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
  const cssComplete = cssLessons.filter(l => progress?.completedLessons.includes(l.id)).length;
  const jsComplete = jsLessons.filter(l => progress?.completedLessons.includes(l.id)).length;

  const courses = [
    {
      title: 'HTML Fundamentals',
      icon: Code,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      completed: htmlComplete,
      total: htmlLessons.length,
      path: '/lessons?category=html'
    },
    {
      title: 'CSS Styling',
      icon: Palette,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      completed: cssComplete,
      total: cssLessons.length,
      path: '/lessons?category=css'
    },
    {
      title: 'JavaScript Programming',
      icon: Braces,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      completed: jsComplete,
      total: jsLessons.length,
      path: '/lessons?category=javascript'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Bestlink IT Academy</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <p className="text-muted-foreground">Keep learning to unlock your certificate!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{completedCount}/{totalLessons}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.title}
              className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(course.path)}
            >
              <div className={`p-3 ${course.bgColor} rounded-xl w-fit`}>
                <course.icon className={`w-8 h-8 ${course.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {course.completed} of {course.total} lessons completed
                </p>
              </div>
              <Progress value={(course.completed / course.total) * 100} />
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">All Lessons</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Browse all {totalLessons} lessons across HTML, CSS, and JavaScript
            </p>
            <Button className="w-full" onClick={() => navigate('/lessons')}>
              View Lessons
            </Button>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Study Assistant</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Get instant answers to your coding questions
            </p>
            <Button className="w-full" variant="outline" onClick={() => navigate('/chatbot')}>
              Open Chatbot
            </Button>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="font-semibold">Certificates</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {progress?.certificates.length || 0} certificates earned
            </p>
            <Button className="w-full" variant="outline" onClick={() => navigate('/certificates')}>
              View Certificates
            </Button>
          </Card>
        </div>

        {progressPercent === 100 && progress?.certificates.length === 0 && (
          <Card className="p-6 bg-primary/5 border-primary">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Congratulations! 🎉</h3>
                <p className="text-muted-foreground mt-1">
                  You've completed all lessons! Now take the quizzes to earn your certificates.
                </p>
                <Button className="mt-4" onClick={() => navigate('/lessons')}>
                  Take Quizzes
                </Button>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
