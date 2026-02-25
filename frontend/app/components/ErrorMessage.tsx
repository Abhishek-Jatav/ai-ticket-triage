"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
  message: string | null;
}

export default function ErrorMessage({ message }: Props) {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  return null;
}
