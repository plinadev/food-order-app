import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest<T>(
  url: string,
  config?: RequestInit
): Promise<T> {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      (resData && resData.message) ||
        "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp<TData = unknown, TBody = unknown>(
  url: string,
  config?: RequestInit,
  initialData?: TData
) {
  const [data, setData] = useState<TData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearData = useCallback(() => {
    setData(initialData);
  }, [initialData]);

  const sendRequest = useCallback(
    async (body?: TBody) => {
      setIsLoading(true);
      setError(null);
      try {
        const resData = await sendHttpRequest<TData>(url, {
          ...config,
          body: body ? JSON.stringify(body) : config?.body,
        });
        setData(resData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (!config || config.method === "GET" || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
