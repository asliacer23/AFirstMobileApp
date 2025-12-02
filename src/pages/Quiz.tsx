import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/lib/storage';
import { getQuizById } from '@/lib/quizzes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const quiz = id ? getQuizById(id) : null;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz not found</h2>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const score = Math.round((newAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length / totalQuestions) * 100);
      
      if (user) {
        storageService.saveQuizScore(user.id, quiz.id, score);
        
        if (score >= quiz.passingScore) {
          const progress = storageService.getProgress(user.id);
          const categoryQuizzes = ['html-quiz', 'css-quiz', 'js-quiz'];
          const completedQuizzes = categoryQuizzes.filter(qId => {
            const qScore = progress.quizScores[qId] || 0;
            return qScore >= 70;
          });

          if (completedQuizzes.length === categoryQuizzes.length && progress.certificates.length === 0) {
            storageService.addCertificate(user.id, {
              id: crypto.randomUUID(),
              courseName: 'Web Development Fundamentals',
              dateEarned: new Date().toISOString(),
              studentName: user.name
            });
            
            toast({
              title: 'Certificate Earned! 🎉',
              description: 'Congratulations! Check the Certificates page.',
            });
          }
        }
      }
      
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    if (attempts >= 2) {
      toast({
        title: 'Maximum attempts reached',
        description: 'You have used all 3 attempts. Review the lessons and try again later.',
        variant: 'destructive',
      });
      navigate('/lessons');
      return;
    }
    
    setAttempts(attempts + 1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const score = Math.round((answers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length / totalQuestions) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 space-y-6 text-center">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${passed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            {passed ? (
              <Trophy className="w-10 h-10 text-green-500" />
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {passed ? 'Congratulations! 🎉' : 'Keep Learning!'}
            </h2>
            <p className="text-muted-foreground">
              You scored <span className="text-2xl font-bold text-primary">{score}%</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Passing score: {quiz.passingScore}% • Attempts used: {attempts + 1}/3
            </p>
          </div>

          <div className="space-y-3">
            {!passed && attempts < 2 && (
              <Button onClick={handleRetry} className="w-full">
                Try Again ({2 - attempts} attempts left)
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/lessons')} className="w-full">
              Back to Lessons
            </Button>
            {passed && (
              <Button onClick={() => navigate('/certificates')} className="w-full">
                View Certificates
              </Button>
            )}
          </div>

          <div className="text-left space-y-4 mt-6">
            <h3 className="font-semibold">Review:</h3>
            {quiz.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{q.question}</p>
                      <p className="text-sm text-muted-foreground">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/lessons')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === idx
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === idx ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {selectedAnswer === idx && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full"
            size="lg"
          >
            {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        </Card>
      </main>
    </div>
  );
}
