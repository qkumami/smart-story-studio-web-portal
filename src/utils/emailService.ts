// Email Service for Smart Story Studio Web Portal
// Matches iOS Build 3 email functionality

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  attachment?: Blob;
  attachmentName?: string;
}

class EmailService {
  private canSendEmail(): boolean {
    // Check if the browser supports mailto links
    return typeof window !== 'undefined';
  }

  private createMailtoLink(options: EmailOptions): string {
    const { to, subject, body } = options;
    
    const mailtoUrl = new URL('mailto:' + encodeURIComponent(to));
    mailtoUrl.searchParams.set('subject', subject);
    mailtoUrl.searchParams.set('body', body);
    
    return mailtoUrl.toString();
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!this.canSendEmail()) {
        throw new Error('Email is not supported in this browser');
      }

      const mailtoLink = this.createMailtoLink(options);
      
      // Open default email client
      window.open(mailtoLink, '_blank');
      
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }

  async sendReportEmail(
    to: string,
    reportType: string,
    studentName: string,
    date: string,
    pdfBlob?: Blob
  ): Promise<boolean> {
    const subject = `Smart Story Studio - ${reportType} Report for ${studentName}`;
    const body = `Dear Parent/Guardian,

Please find attached the ${reportType.toLowerCase()} report for ${studentName} dated ${date}.

This report has been generated using Smart Story Studio's AI-powered assessment system and provides detailed insights into your child's development and learning progress.

If you have any questions about this report, please don't hesitate to contact us.

Best regards,
Smart Story Studio Team

---
This is an automated email from Smart Story Studio.
Generated on ${new Date().toLocaleDateString('en-GB')}`;

    return await this.sendEmail({
      to,
      subject,
      body,
      attachment: pdfBlob,
      attachmentName: `smart-story-studio-${reportType.toLowerCase()}-${date}.pdf`
    });
  }

  // Alternative method using a service like EmailJS (if configured)
  async sendEmailWithService(options: EmailOptions): Promise<boolean> {
    try {
      // This would integrate with EmailJS or similar service
      // For now, fall back to mailto
      return await this.sendEmail(options);
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService(); 