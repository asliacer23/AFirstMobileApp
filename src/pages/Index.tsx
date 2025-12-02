import { Button } from "@/components/ui/button";
import { BookOpen, Code, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-4">
            <BookOpen className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">
            Bestlink IT Academy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master web development fundamentals with structured courses in HTML, CSS, and JavaScript
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-card rounded-xl">
              <Code className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">17+ Lessons</h3>
              <p className="text-sm text-muted-foreground">Learn HTML, CSS & JavaScript</p>
            </div>
            <div className="p-6 bg-card rounded-xl">
              <Award className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Earn Certificates</h3>
              <p className="text-sm text-muted-foreground">Complete courses and get certified</p>
            </div>
            <div className="p-6 bg-card rounded-xl">
              <BookOpen className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Study Assistant</h3>
              <p className="text-sm text-muted-foreground">Get help from AI chatbot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
