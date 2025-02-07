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

export interface MostViewedPostRead {
  post_id: number
  title: string
  total_views: number
  unique_views: number
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
 * Shape for post views statistics (GET /api/posts/views).
 * Matches the OpenAPI schema PostViewsStatistics.
 */
export interface PostViewsStatistics {
  total_views: number;
  total_unique_views: number;
  date: string; // date-time
}

/**
 * Fetch a paginated list of posts.
 * GET /api/posts/?pageNumber=&pageSize=
 */
export async function getPosts(
  pageNumber = 1,
  pageSize = 10
): Promise<AxiosResponse<PaginatedPosts>> {
  return apiClient.get<PaginatedPosts>('/api/admin/posts/', {
    params: { pageNumber, pageSize },
  });
}

/**
 * Fetch a paginated list of published posts.
 * GET /api/posts/?pageNumber=&pageSize=
 */
export async function getPublishedPosts(
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
 * Collect a post view.
 * GET /api/posts/{slug}/collect-view
 */
export async function collectPostView(slug: string): Promise<AxiosResponse<void>> {
  return apiClient.get<void>(`/api/posts/${encodeURIComponent(slug)}/collect-view`);
}

/**
 * Fetch a single post by its ID.
 * GET /api/posts/{post_id}
 */
export async function getPostById(postId: number): Promise<AxiosResponse<PostRead>> {
  return apiClient.get<PostRead>(`/api/admin/posts/${postId}`);
}

/**
 * Create a new post.
 * POST /api/posts/
 */
export async function createPost(
  postData: PostCreate
): Promise<AxiosResponse<PostRead>> {
  return apiClient.post<PostRead>('/api/admin/posts/', postData);
}

/**
 * Update an existing post by ID.
 * PUT /api/posts/{post_id}
 */
export async function updatePost(
  postId: number,
  postData: PostUpdate
): Promise<AxiosResponse<PostRead>> {
  return apiClient.put<PostRead>(`/api/admin/posts/${postId}`, postData);
}

/**
 * Delete a post by ID.
 * DELETE /api/posts/{post_id}
 */
export async function deletePost(postId: number): Promise<AxiosResponse<void>> {
  return apiClient.delete<void>(`/api/admin/posts/${postId}`);
}

/**
 * Get post statistics.
 * GET /api/posts/statistics
 */
export async function getPostStatistics(): Promise<AxiosResponse<PostStatistics>> {
  return apiClient.get<PostStatistics>('/api/admin/posts/statistics');
}

/**
 * Get post views statistics.
 * GET /api/posts/views
 */
export async function getPostViewsStatistics(
  startDate?: string,
  endDate?: string
): Promise<AxiosResponse<PostViewsStatistics[]>> {
  return apiClient.get<PostViewsStatistics[]>("/api/admin/posts/views", {
    params: {
      ...(startDate ? { start_date: startDate } : {}),
      ...(endDate ? { end_date: endDate } : {}),
    },
  })
}

/**
 * Fetch the top `limit` most viewed posts.
 */
export async function getMostViewedPosts(
  limit = 5
): Promise<AxiosResponse<MostViewedPostRead[]>> {
  return apiClient.get<MostViewedPostRead[]>("/api/admin/posts/most-views", {
    params: { limit },
  })
}