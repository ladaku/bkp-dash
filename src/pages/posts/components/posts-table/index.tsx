import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import TagTableActions from './posts-table-action';

type TPostsTableProps = {
  data: any;
  page: number;
  total: number;
  pageCount: number;
};

export default function PostsTable({ data, pageCount }: TPostsTableProps) {
  return (
    <>
      <TagTableActions />
      {data && (
        <DataTable columns={columns} data={data} pageCount={pageCount} />
      )}
    </>
  );
}
