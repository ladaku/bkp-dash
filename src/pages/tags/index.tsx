import PageHead from '@/components/shared/page-head';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { useGetTags } from './queries/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import TagsTable from './components/tags-table';

export default function TagsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const country = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetTags(offset, pageLimit);
  const users = data?.data?.data;
  const totalUsers = data?.data?.total; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  console.log(users, 'asoyyyy');

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
      <PageHead title="Tag Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Tags', link: '/tags' }
        ]}
      />
      <TagsTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
