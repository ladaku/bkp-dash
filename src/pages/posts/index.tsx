import PageHead from '@/components/shared/page-head';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useGetPosts } from './queries/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import PostsTable from './components/posts-table';

export default function PostsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const country = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetPosts(offset, pageLimit);
  const posts = data?.data?.data;
  const totalData = data?.data?.total; //1000
  const pageCount = Math.ceil(totalData / pageLimit);
  console.log(posts, 'asoyyyy');

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Post - Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Videos', link: '/video' }
        ]}
      />
      <PostsTable
        data={posts}
        page={page}
        total={totalData}
        pageCount={pageCount}
      />
    </div>
  );
}
