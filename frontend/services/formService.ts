import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

/**
 * Sends contact form data to /api/send_form endpoint,
 * appending the captcha token as a query param.
 *
 * @param data - form fields (name, email, phone, message)
 * @param token - captcha token from Yandex Smart Captcha
 */
export async function sendContactForm(data: ContactFormData, token: string): Promise<AxiosResponse<any>> {
  return await apiClient.post("/api/contacts/send_form", data, {
    params: { token },
  })
}
