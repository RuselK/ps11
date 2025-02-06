import { AxiosResponse } from 'axios';
import apiClient from './apiClient';


/**
 * Shape for creating a post (POST /api/posts/).
 * Matches the OpenAPI schema PostCreate.
 */
export interface PostCreate {
  title: string;
  content: string;
  is_published: boolean;
}

/**
 * Shape for updating a post (PUT /api/posts/{post_id}).
 * Matches the OpenAPI schema PostUpdate.
 */
export interface PostUpdate {
  title: string;
  content: string;
  is_published: boolean;
}

/**
 * Shape of a Post object returned by the API.
 * Matches the OpenAPI schema PostRead.
 */
export interface PostRead {
  id: number;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
  created_at: string; // date-time
  updated_at: string; // date-time
}

/**
 * Page type returned by GET /api/posts/ (paginated list).
 * Matches Page_TypeVar_Customized_PostRead_ in the OpenAPI spec.
 */
export interface PaginatedPosts {
  items: PostRead[];
  total: number | null;
  page: number | null;
  size: number | null;
  pages: number | null;
}


/**
 * Shape for post statistics (GET /api/posts/statistics).
 * Matches the OpenAPI schema PostStatistics.
 */
export interface PostStatistics {
  total_posts: number;
  total_published_posts: number;
  total_draft_posts: number;
}


/**
 * Fetch a paginated list of posts.
 * GET /api/posts/?pageNumber=&pageSize=
 */
export async function getPosts(
  pageNumber = 1,
  pageSize = 10
): Promise<AxiosResponse<PaginatedPosts>> {
  return apiClient.get<PaginatedPosts>('/api/posts/', {
    params: { pageNumber, pageSize },
  });
}

/**
 * Fetch a single post by its slug.
 * GET /api/posts/{slug}
 */
export async function getPostBySlug(slug: string): Promise<AxiosResponse<PostRead>> {
  return apiClient.get<PostRead>(`/api/posts/${encodeURIComponent(slug)}`);
}

/**
 * Create a new post.
 * POST /api/posts/
 */
export async function createPost(
  postData: PostCreate
): Promise<AxiosResponse<PostRead>> {
  return apiClient.post<PostRead>('/api/posts/', postData);
}

/**
 * Update an existing post by ID.
 * PUT /api/posts/{post_id}
 */
export async function updatePost(
  postId: number,
  postData: PostUpdate
): Promise<AxiosResponse<PostRead>> {
  return apiClient.put<PostRead>(`/api/posts/${postId}`, postData);
}

/**
 * Delete a post by ID.
 * DELETE /api/posts/{post_id}
 */
export async function deletePost(postId: number): Promise<AxiosResponse<void>> {
  return apiClient.delete<void>(`/api/posts/${postId}`);
}

/**
 * Get post statistics.
 * GET /api/posts/statistics
 */
export async function getPostStatistics(): Promise<AxiosResponse<PostStatistics>> {
  return apiClient.get<PostStatistics>('/api/posts/statistics');
}
