import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutTag } from '../../queries/queries';
import { useQueryClient } from '@tanstack/react-query';

const TagFormSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, { message: 'name is should be at least 1 character' })
});

type TagFormSchemaType = z.infer<typeof TagFormSchema>;

const TagCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const queryClient = useQueryClient();
  const tag = useMutTag();
  const form = useForm<TagFormSchemaType>({
    resolver: zodResolver(TagFormSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = (values: TagFormSchemaType) => {
    tag.mutateAsync(values).then(() => {
      modalClose();
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    });
  };

  return (
    <div className="px-2">
      {/* <div className="flex items-center justify-center text-2xl font-bold">
        {'<Logo/>'}
      </div> */}

      <Heading
        title={'Create New Tag'}
        description={''}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your name tag"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              Create Tag
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TagCreateForm;
