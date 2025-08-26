import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema } from "@shared/schema";
import { Mail, Clock, Globe, Loader2 } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const faqs = [
    {
      question: "Are my files really secure?",
      answer: "Yes, all files are processed locally in your browser when possible and automatically deleted from our servers after 1 hour. We never store or share your documents."
    },
    {
      question: "What's the maximum file size?",
      answer: "Current limit is 10MB per file, but this can be configured based on your needs. Most PDF operations can handle files of this size efficiently."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account or registration required. All tools are available immediately without any personal information."
    },
    {
      question: "Which file formats are supported?",
      answer: "We support PDF files for most operations, plus common image formats (JPG, PNG, BMP, TIFF) for conversion tools. Document formats like Word and PowerPoint are supported with limited conversion capabilities."
    },
    {
      question: "Can I use this for commercial purposes?",
      answer: "Yes, our tools are free for both personal and commercial use. There are no restrictions on usage type."
    },
    {
      question: "What browsers are supported?",
      answer: "PDFKit Pro works on all modern browsers including Chrome, Firefox, Safari, and Edge. No plugins or extensions required."
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. 
              Our team is here to help you make the most of our PDF tools.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-subject">
                                  <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="business">Business Inquiry</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message..."
                                className="min-h-[120px]"
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={contactMutation.isPending}
                        data-testid="submit-contact-form"
                      >
                        {contactMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Contact Info & FAQ */}
              <div className="space-y-8">
                
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-gray-600">support@pdfkitpro.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-gray-600">Usually within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Available Languages</p>
                        <p className="text-gray-600">English, Spanish, French, German</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                          <AccordionTrigger 
                            className="text-left hover:no-underline py-4"
                            data-testid={`faq-trigger-${index}`}
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent 
                            className="text-gray-600 pb-4"
                            data-testid={`faq-content-${index}`}
                          >
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
