"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useDebouncedSearch(
  paramKey: string,
  options?: { defaultValue?: string; delay?: number; resetPage?: boolean },
) {
  const { defaultValue = "", delay = 400, resetPage = true } = options ?? {};
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramValue = searchParams.get(paramKey) || defaultValue;
  const [localValue, setLocalValue] = useState(paramValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    setLocalValue(paramValue);
  }, [paramValue]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (localValue !== paramValue) {
        const updates: Record<string, string | undefined> = {
          [paramKey]: localValue || undefined,
        };
        if (resetPage) updates.page = "1";
        updateParams(updates);
      }
    }, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localValue, paramValue, delay, paramKey, resetPage, updateParams]);

  return [localValue, setLocalValue, updateParams] as const;
}
