import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Shield, Zap, Users, Award } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Files Processed", value: "1M+", icon: Shield },
    { label: "Happy Users", value: "50K+", icon: Users },
    { label: "Tools Available", value: "25+", icon: Zap },
    { label: "Years Experience", value: "5+", icon: Award },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Passionate about making document processing accessible to everyone."
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b372?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Expert in PDF technologies and web security."
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Focused on creating intuitive and user-friendly interfaces."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About PDFKit Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're on a mission to make professional PDF tools accessible to everyone, 
              without compromising on security, speed, or quality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600">Democratizing professional PDF tools for everyone</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Team collaboration"
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Why We Built PDFKit Pro</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We noticed that most PDF tools were either expensive, required downloads, 
                  or compromised user privacy. We set out to create a solution that addresses all these issues.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Privacy First</h4>
                      <p className="text-gray-600">Your files are processed locally whenever possible and automatically deleted from our servers.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">No Installation Required</h4>
                      <p className="text-gray-600">Everything works directly in your browser - no downloads, no installations, no hassle.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-warning mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Completely Free</h4>
                      <p className="text-gray-600">Professional-grade tools without subscription fees or hidden costs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A passionate group of developers, designers, and PDF enthusiasts working to make your document workflow seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at PDFKit Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Security & Privacy</h3>
              <p className="text-gray-600">
                We believe your documents are yours alone. That's why we process files locally when possible 
                and automatically delete uploaded files after one hour.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
              <p className="text-gray-600">
                Professional tools shouldn't be limited to those who can afford expensive software. 
                We make powerful PDF tools accessible to everyone.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Simplicity</h3>
              <p className="text-gray-600">
                Complex tasks should be simple to perform. We focus on intuitive design and 
                streamlined workflows that get you results quickly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our tools and explore new technologies to provide 
                better, faster, and more secure PDF processing solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
