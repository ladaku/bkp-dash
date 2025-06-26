import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import TagTableActions from './tags-table-action';

type TTagsTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function TagsTable({ users, pageCount }: TTagsTableProps) {
  return (
    <>
      <TagTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
