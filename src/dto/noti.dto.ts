export class NotiDto {
  recipient: string; // Email, phone number, or device token
  message: string; // Notification content
  subject?: string; // Subject (required for email)
  data?: Record<string, any>; // Additional data (e.g., for push notifications)
  metadata?: Record<string, any>; // Optional metadata for tracking
}
