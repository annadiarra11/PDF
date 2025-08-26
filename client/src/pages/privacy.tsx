import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Shield, Eye, Trash2, Lock, Server, Clock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data and respect your privacy 
              when using PDFKit Pro.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Key Principles */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Privacy Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                  <p className="text-gray-600 text-sm">We collect minimal data and process files locally when possible.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Auto-Delete</h3>
                  <p className="text-gray-600 text-sm">All uploaded files are automatically deleted after 1 hour.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Tracking</h3>
                  <p className="text-gray-600 text-sm">We don't track your activity or build user profiles.</p>
                </div>
              </div>
            </div>

            {/* Detailed Policy */}
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Server className="w-6 h-6 text-primary mr-3" />
                Information We Collect
              </h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Files You Upload</h3>
                <p className="text-gray-600 mb-4">
                  When you use our PDF processing tools, we temporarily store your files on our servers to perform the requested operations. 
                  These files are automatically deleted after one hour, regardless of whether the processing is complete.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Technical Information</h3>
                <p className="text-gray-600 mb-4">
                  We collect basic technical information necessary to provide our service, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>IP address (for security and abuse prevention)</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>File sizes and types (for processing optimization)</li>
                  <li>Error logs (to improve service reliability)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-gray-600">
                  If you contact us through our contact form, we store your name, email address, and message 
                  to respond to your inquiry. This information is kept only as long as necessary to address your request.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lock className="w-6 h-6 text-primary mr-3" />
                How We Use Your Information
              </h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">File Processing</h3>
                <p className="text-gray-600 mb-4">
                  Your uploaded files are used solely to perform the PDF operations you request. 
                  We do not access, view, or analyze the content of your files for any other purpose.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Service Improvement</h3>
                <p className="text-gray-600 mb-4">
                  We use aggregated, anonymous technical data to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Optimize processing performance</li>
                  <li>Identify and fix technical issues</li>
                  <li>Understand usage patterns to improve our tools</li>
                  <li>Prevent abuse and ensure service availability</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Communication</h3>
                <p className="text-gray-600">
                  We use your contact information only to respond to your inquiries and provide support. 
                  We do not send marketing emails or newsletters unless you explicitly opt-in.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 text-primary mr-3" />
                Data Retention
              </h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Uploaded Files</h3>
                    <p className="text-gray-600">
                      <strong className="text-danger">1 hour maximum</strong> - All uploaded files are automatically 
                      deleted from our servers after one hour, regardless of processing status.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technical Logs</h3>
                    <p className="text-gray-600">
                      <strong className="text-warning">30 days</strong> - Basic access logs are kept for security 
                      and debugging purposes, then automatically deleted.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Messages</h3>
                    <p className="text-gray-600">
                      <strong className="text-primary">2 years</strong> - Support inquiries are kept to track 
                      resolution and improve our service.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Analytics Data</h3>
                    <p className="text-gray-600">
                      <strong className="text-success">Anonymized</strong> - Usage statistics are aggregated 
                      and anonymized, with no personal identifiers.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Data Security</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>HTTPS Encryption:</strong> All data transmission is encrypted using TLS 1.3</li>
                  <li><strong>Server Security:</strong> Our servers are regularly updated and monitored for security threats</li>
                  <li><strong>Access Controls:</strong> Strict access controls limit who can access our systems</li>
                  <li><strong>Regular Audits:</strong> We conduct regular security audits and penetration testing</li>
                  <li><strong>Client-Side Processing:</strong> Many operations are performed locally in your browser</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-6">Third-Party Services</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Analytics</h3>
                <p className="text-gray-600 mb-4">
                  We use Google Analytics to understand how our service is used. This helps us improve the user experience. 
                  Google Analytics collects anonymized usage data and does not track individual users.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Content Delivery</h3>
                <p className="text-gray-600 mb-4">
                  We use content delivery networks (CDNs) to serve static assets like fonts and icons. 
                  These services may log basic request information but do not have access to your uploaded files.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">No Data Sharing</h3>
                <p className="text-gray-600">
                  We do not sell, rent, or share your personal information with third parties for marketing purposes. 
                  Your files and data remain private and are not shared with any external services.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  You have the following rights regarding your data:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Right to Access:</strong> Request information about what data we have about you</li>
                  <li><strong>Right to Deletion:</strong> Request deletion of your contact information and support messages</li>
                  <li><strong>Right to Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Right to Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                  <li><strong>Right to Opt-Out:</strong> Disable analytics tracking in your browser settings</li>
                </ul>
                
                <p className="text-gray-600">
                  To exercise these rights, please contact us at privacy@pdfkitpro.com. 
                  We will respond to your request within 30 days.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">Changes to This Policy</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  We may update this privacy policy from time to time. When we do, we will:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Update the "Last modified" date at the top of this page</li>
                  <li>Notify users of significant changes through our website</li>
                  <li>For major changes, provide 30 days advance notice when possible</li>
                </ul>
                
                <p className="text-gray-600">
                  We encourage you to review this policy periodically to stay informed about how we protect your privacy.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li><strong>Email:</strong> privacy@pdfkitpro.com</li>
                  <li><strong>Support:</strong> support@pdfkitpro.com</li>
                  <li><strong>Response Time:</strong> Within 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
