import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FileText, Shield, AlertTriangle, Scale } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-indigo-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using PDFKit Pro. 
              By using our service, you agree to these terms.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Key Points */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Points</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Free Service</h3>
                  <p className="text-gray-600 text-sm">All tools are completely free to use</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your Content</h3>
                  <p className="text-gray-600 text-sm">You retain all rights to your files</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Use Responsibly</h3>
                  <p className="text-gray-600 text-sm">Don't misuse our service or violate laws</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-6 h-6 text-danger" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Warranty</h3>
                  <p className="text-gray-600 text-sm">Service provided "as is"</p>
                </div>
              </div>
            </div>

            {/* Detailed Terms */}
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  By accessing and using PDFKit Pro ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                
                <p className="text-gray-600">
                  These terms apply to all visitors, users, and others who access or use the service. 
                  We reserve the right to update these terms at any time without prior notice.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">2. Description of Service</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  PDFKit Pro provides online PDF processing tools including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>PDF merging, splitting, and page manipulation</li>
                  <li>PDF compression and optimization</li>
                  <li>File format conversion (PDF to/from images, documents)</li>
                  <li>PDF security features (password protection, unlocking)</li>
                  <li>Basic PDF repair and organization tools</li>
                </ul>
                
                <p className="text-gray-600">
                  The service is provided free of charge and is supported by our commitment to making 
                  PDF tools accessible to everyone.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">3. User Obligations and Restrictions</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Acceptable Use</h3>
                <p className="text-gray-600 mb-4">You agree to use the service only for lawful purposes and in accordance with these terms. You agree NOT to:</p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                  <li>Upload files containing malicious code, viruses, or harmful content</li>
                  <li>Process copyrighted material without proper authorization</li>
                  <li>Use the service to violate any applicable laws or regulations</li>
                  <li>Attempt to reverse engineer, hack, or compromise the service</li>
                  <li>Overload our servers with excessive automated requests</li>
                  <li>Upload files containing illegal, harmful, or offensive content</li>
                  <li>Violate the privacy or rights of other individuals</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">File Size and Usage Limits</h3>
                <p className="text-gray-600">
                  Current file size limits are set at 10MB per file. We reserve the right to implement 
                  usage quotas or rate limiting to ensure fair access for all users.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">4. Intellectual Property Rights</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Content</h3>
                <p className="text-gray-600 mb-4">
                  You retain all rights, title, and interest in and to your uploaded files and any content you process 
                  through our service. We do not claim any ownership rights over your content.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Our Service</h3>
                <p className="text-gray-600 mb-4">
                  The PDFKit Pro service, including its design, functionality, and underlying technology, 
                  is protected by copyright and other intellectual property laws. You may not copy, 
                  modify, or redistribute our service without permission.
                </p>

                <h3 className="text-xl font-semibold mb-4">License to Use</h3>
                <p className="text-gray-600">
                  By uploading files to our service, you grant us a temporary, non-exclusive license to process 
                  your files solely for the purpose of providing the requested PDF operations. This license 
                  automatically expires when your files are deleted from our servers (within 1 hour).
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">5. Privacy and Data Protection</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  Your privacy is important to us. Our data handling practices are detailed in our Privacy Policy, 
                  which is incorporated into these terms by reference. Key points include:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>All uploaded files are automatically deleted after 1 hour</li>
                  <li>We do not access, view, or analyze the content of your files</li>
                  <li>We collect minimal technical data necessary to provide the service</li>
                  <li>We do not share your data with third parties for marketing purposes</li>
                </ul>
                
                <p className="text-gray-600">
                  By using our service, you acknowledge that you have read and understood our Privacy Policy.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">6. Disclaimers and Limitations</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Service "As Is"</h3>
                <p className="text-gray-600 mb-4">
                  The service is provided "as is" and "as available" without warranties of any kind, 
                  either express or implied. We do not warrant that the service will be uninterrupted, 
                  error-free, or completely secure.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Limitation of Liability</h3>
                <p className="text-gray-600 mb-4">
                  To the maximum extent permitted by law, PDFKit Pro shall not be liable for any indirect, 
                  incidental, special, or consequential damages resulting from your use of the service, 
                  including but not limited to:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Loss of data or files</li>
                  <li>Loss of profits or business opportunities</li>
                  <li>Service interruptions or downtime</li>
                  <li>Errors in file processing or conversion</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">File Backup Responsibility</h3>
                <p className="text-gray-600">
                  You are responsible for maintaining backups of your important files. While we strive 
                  to provide reliable service, we cannot guarantee against data loss and recommend 
                  keeping copies of important documents.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">7. Termination</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-semibold mb-4">Termination by You</h3>
                <p className="text-gray-600 mb-4">
                  You may stop using our service at any time. No account deletion is necessary as we 
                  do not require user registration.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">Termination by Us</h3>
                <p className="text-gray-600 mb-4">
                  We reserve the right to suspend or terminate access to our service for users who:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>Violate these terms of service</li>
                  <li>Misuse the service or attempt to harm our systems</li>
                  <li>Engage in illegal activities using our platform</li>
                  <li>Abuse our service in ways that affect other users</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Effect of Termination</h3>
                <p className="text-gray-600">
                  Upon termination, your right to use the service ceases immediately. All uploaded files 
                  will be deleted according to our normal retention policy (within 1 hour).
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">8. Changes to Terms</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these terms at any time. When we make changes:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>We will update the "Last updated" date at the top of this page</li>
                  <li>For significant changes, we will provide notice on our website</li>
                  <li>Continued use of the service after changes constitutes acceptance of new terms</li>
                  <li>If you disagree with changes, you should discontinue use of the service</li>
                </ul>
                
                <p className="text-gray-600">
                  We encourage you to review these terms periodically to stay informed of any updates.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">9. Governing Law</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 mb-4">
                  These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], 
                  without regard to its conflict of law provisions.
                </p>
                
                <p className="text-gray-600">
                  Any disputes arising from these terms or your use of the service shall be subject to the 
                  exclusive jurisdiction of the courts in [Jurisdiction].
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-6">10. Contact Information</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li><strong>Email:</strong> legal@pdfkitpro.com</li>
                  <li><strong>Support:</strong> support@pdfkitpro.com</li>
                  <li><strong>Website:</strong> https://pdfkitpro.com/contact</li>
                </ul>
                
                <p className="text-gray-600 mt-4">
                  We will respond to legal inquiries within 48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
