import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Fingerprint,
  Brain,
  Globe
} from "lucide-react";
import { Link } from "react-router";

export default function App() {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Advanced encryption protocols protecting your data 24/7"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Authenticate in milliseconds with our optimized infrastructure"
    },
    {
      icon: Fingerprint,
      title: "Biometric Integration",
      description: "Seamless fingerprint and facial recognition support"
    },
    {
      icon: Brain,
      title: "AI-Powered Protection",
      description: "Machine learning algorithms detecting threats in real-time"
    }
  ];

  const stats = [
    { value: "99.99%", label: "Uptime" },
    { value: "10M+", label: "Active Users" },
    { value: "<100ms", label: "Response Time" },
    { value: "256-bit", label: "Encryption" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Next-Gen Authentication Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-cyan-300 to-purple-400 leading-tight">
              Secure Access to the Future
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Experience authentication reimagined. Powered by cutting-edge technology, 
              designed for seamless security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-blue-400/30 hover:border-blue-400 bg-transparent hover:bg-blue-500/10 text-white px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">
                Built for the <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">Modern World</span>
              </h2>
              <p className="text-xl text-slate-400">
                Enterprise-level security meets consumer-grade simplicity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-8 bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/70 transition-all hover:scale-105 hover:border-blue-500/50 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Highlight */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <Card className="p-12 bg-linear-to-br from-blue-950/50 to-purple-950/50 border-blue-500/30 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                    <Lock className="w-12 h-12 text-blue-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Your Security is Our Priority
                  </h2>
                  <p className="text-slate-300 text-lg">
                    We employ industry-leading security measures to ensure your data 
                    remains protected at all times.
                  </p>
                  <div className="space-y-3 pt-4">
                    {[
                      "End-to-end encryption",
                      "Zero-knowledge architecture",
                      "Multi-factor authentication",
                      "Regular security audits"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm p-8 flex items-center justify-center">
                    <Globe className="w-32 h-32 text-blue-400/50 animate-pulse" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-slate-300">
              Join millions of users who trust our platform for secure authentication
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-full shadow-lg shadow-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105"
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-slate-700 hover:border-blue-400 bg-transparent hover:bg-blue-500/10 text-white px-12 py-6 text-lg rounded-full backdrop-blur-sm transition-all hover:scale-105"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
