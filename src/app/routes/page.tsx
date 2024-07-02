import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const router = useRouter();

  useEffect(() => {
  
    if (!isAuthenticated) {
  
      router.push('/');
  
    }
  
  }, [isAuthenticated, router]);

  
  if (!isAuthenticated) {
  
    return null;
  
  }

  return <>{children}</>;
};

export default ProtectedRoute;
