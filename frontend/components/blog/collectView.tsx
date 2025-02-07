"use client";

import { useEffect } from "react";
import { collectPostView } from "@/services/postService";

interface PostViewTrackerProps {
  slug: string;
}

export default function PostViewTracker({ slug }: PostViewTrackerProps) {
  useEffect(() => {
    collectPostView(slug)
  }, [slug]);

  return null;
}
