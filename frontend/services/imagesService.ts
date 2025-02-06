import { AxiosResponse } from 'axios';
import apiClient from '@/services/apiClient';

export interface UploadedImage {
  url: string;
}

/**
 * Upload an image via POST /api/images/
 * 
 * The request body (multipart/form-data) must include the file field named "image".
 * Your OpenAPI schema (Body_upload_image_api_images__post) requires a single "image" property.
 */
export async function uploadImage(file: File): Promise<AxiosResponse<UploadedImage>> {
  const formData = new FormData();
  formData.append('image', file);

  return apiClient.post<UploadedImage>('/api/images/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Delete an image by filename via DELETE /api/images/{filename}
 */
export async function deleteImage(filename: string): Promise<AxiosResponse<void>> {
  return apiClient.delete<void>(`/api/images/${encodeURIComponent(filename)}`);
}
