import { createContext, useState } from "react";

type UserProgress = "cart" | "checkout" | null;

interface UserProgressContextValue {
  progress: UserProgress;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
}

const UserProgressContext = createContext<UserProgressContextValue>({
  progress: null,
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProgress, setUserProgress] = useState<UserProgress>(null);

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress(null);
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress(null);
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
