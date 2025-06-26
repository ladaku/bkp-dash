import { useAuthStore } from '@/hooks/useAuth';
import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate, useRoutes } from 'react-router-dom';
import { useRouter } from './hooks';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);
const TagPage = lazy(() => import('@/pages/tags'));
const PostPage = lazy(() => import('@/pages/posts'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const auth = useAuthStore();
  const router = useRouter();
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'tags',
          element: <TagPage />
        },
        {
          path: 'videos',
          element: <PostPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];
  const [route, setRoute] = useState(publicRoutes);

  // useEffect(() => {
  //   const token = localStorage.getItem('broco');
  //   if (token) {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     const now = Math.floor(Date.now() / 1000);
  //     console.log(auth.isLogin, 'arto', token, payload.exp < now);
  //     if (payload.exp < now) {
  //       router.replace('/login');
  //       auth.updateIsLogin(false);
  //     } else {
  //       router.replace('/');
  //     }
  //   }
  // }, [auth, auth.isLogin, router]);

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);
  return routes;
  // const routes = useRoutes(
  //   auth.isLogin ? [...dashboardRoutes, ...publicRoutes] : [...publicRoutes]
  // );
}
