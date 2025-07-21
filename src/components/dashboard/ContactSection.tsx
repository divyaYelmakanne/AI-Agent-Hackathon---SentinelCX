import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Globe, Linkedin, Github, Twitter } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const contactInfo = [
    {
      icon: User,
      label: 'Contact Person',
      value: 'Divya Yelmakanne',
      description: 'Product Manager & Developer'
    },
    {
      icon: Mail,
      label: 'Email Address',
      value: 'divyayelmakanne@gmail.com',
      description: 'Primary contact for all inquiries'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      description: 'Average response time for all inquiries'
    },
    {
      icon: Globe,
      label: 'Availability',
      value: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM (IST)'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, name: 'LinkedIn', href: '#', color: 'text-blue-600' },
    { icon: Github, name: 'GitHub', href: '#', color: 'text-gray-800' },
    { icon: Twitter, name: 'Twitter', href: '#', color: 'text-blue-400' },
    { icon: Mail, name: 'Email', href: 'mailto:divyayelmakanne@gmail.com', color: 'text-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-medium bg-gradient-accent text-accent-foreground">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg opacity-90">
            Have questions about SentinelCX? We'd love to hear from you.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5 text-primary" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General Inquiry</SelectItem>
                      <SelectItem value="medium">Medium - Feature Request</SelectItem>
                      <SelectItem value="high">High - Technical Support</SelectItem>
                      <SelectItem value="urgent">Urgent - Critical Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide details about your inquiry, feature request, or issue..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{info.label}</h4>
                    <p className="text-foreground font-medium">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    className="justify-start"
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className={`h-4 w-4 mr-2 ${social.color}`} />
                      {social.name}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">How does SentinelCX analyze sentiment?</h4>
                <p className="text-sm text-muted-foreground">
                  We use advanced NLP algorithms including VADER, TextBlob, and HuggingFace models to analyze emotional tone in customer communications.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">What channels are supported?</h4>
                <p className="text-sm text-muted-foreground">
                  SentinelCX supports email, live chat, support tickets, and can be extended to social media platforms.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Is there a demo available?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! You're currently viewing our interactive demo. Contact us to discuss a customized implementation for your team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};