import { Checkbox } from '@/components/ui/checkbox';
import { Posts } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { formatDistance } from 'date-fns';

export const columns: ColumnDef<Posts>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'desc',
    header: 'Desc'
  },
  {
    accessorKey: 'tumb',
    header: 'Thumbnail',
    cell: ({ row }) => {
      return (
        <img
          width={80}
          src={`${import.meta.env.VITE_URL_STATIC}/${row.original.thumb_url}`}
        />
      );
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Create date',
    cell: ({ row }) => {
      return formatDistance(row.original.created_at, new Date(), {
        addSuffix: true
      });
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
