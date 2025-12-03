// Mock Email Notification Service
// In production, this would integrate with Resend API via an edge function

export type EmailType = 'new_referral' | 'commission_earned' | 'level_upgrade' | 'ticket_response';

interface EmailPayload {
  to: string;
  type: EmailType;
  data: Record<string, unknown>;
}

interface EmailTemplate {
  subject: string;
  body: string;
}

const getEmailTemplate = (type: EmailType, data: Record<string, unknown>): EmailTemplate => {
  switch (type) {
    case 'new_referral':
      return {
        subject: '🎉 New Referral Alert - Solid Life MLM',
        body: `
          Congratulations! You have a new referral.
          
          Referral Name: ${data.referralName || 'New Member'}
          Level: ${data.level || 'Level 1'}
          Date: ${new Date().toLocaleDateString()}
          
          Keep growing your network!
          
          Best regards,
          Solid Life MLM Nigeria Ltd
        `
      };
    
    case 'commission_earned':
      return {
        subject: '💰 Commission Earned - Solid Life MLM',
        body: `
          Great news! You've earned a commission.
          
          Amount: ₦${data.amount || 0}
          From: ${data.source || 'Network Sale'}
          Level: ${data.level || 'Direct'}
          Date: ${new Date().toLocaleDateString()}
          
          Your wallet has been credited.
          
          Best regards,
          Solid Life MLM Nigeria Ltd
        `
      };
    
    case 'level_upgrade':
      return {
        subject: '🏆 Level Upgrade - Solid Life MLM',
        body: `
          Congratulations on your achievement!
          
          You have been upgraded to: ${data.newLevel || 'New Level'}
          Previous Level: ${data.previousLevel || 'Previous'}
          New Benefits: ${data.benefits || 'Increased commissions'}
          
          Keep up the great work!
          
          Best regards,
          Solid Life MLM Nigeria Ltd
        `
      };
    
    case 'ticket_response':
      return {
        subject: '📩 Support Ticket Update - Solid Life MLM',
        body: `
          Your support ticket has been updated.
          
          Ticket ID: ${data.ticketId || 'N/A'}
          Status: ${data.status || 'Updated'}
          Response: ${data.response || 'Our team has responded to your query.'}
          
          Please login to view the full response.
          
          Best regards,
          Solid Life Support Team
        `
      };
    
    default:
      return {
        subject: 'Notification - Solid Life MLM',
        body: 'You have a new notification from Solid Life MLM.'
      };
  }
};

// Mock function to simulate sending email
export const sendEmail = async (payload: EmailPayload): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const template = getEmailTemplate(payload.type, payload.data);
  
  // Log for development
  console.log('📧 Email Notification (Mock):', {
    to: payload.to,
    subject: template.subject,
    body: template.body
  });
  
  // In production, this would call the Resend edge function
  // const response = await supabase.functions.invoke('send-email', {
  //   body: { to: payload.to, ...template }
  // });
  
  return {
    success: true,
    message: `Email notification sent to ${payload.to}`
  };
};

// Helper functions for common notifications
export const notifyNewReferral = (userEmail: string, referralName: string, level: number) => {
  return sendEmail({
    to: userEmail,
    type: 'new_referral',
    data: { referralName, level: `Level ${level}` }
  });
};

export const notifyCommissionEarned = (userEmail: string, amount: number, source: string, level: string) => {
  return sendEmail({
    to: userEmail,
    type: 'commission_earned',
    data: { amount: amount.toLocaleString(), source, level }
  });
};

export const notifyLevelUpgrade = (userEmail: string, newLevel: string, previousLevel: string, benefits: string) => {
  return sendEmail({
    to: userEmail,
    type: 'level_upgrade',
    data: { newLevel, previousLevel, benefits }
  });
};

export const notifyTicketResponse = (userEmail: string, ticketId: string, status: string, response: string) => {
  return sendEmail({
    to: userEmail,
    type: 'ticket_response',
    data: { ticketId, status, response }
  });
};
