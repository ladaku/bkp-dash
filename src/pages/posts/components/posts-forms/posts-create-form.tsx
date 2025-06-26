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
import { useGetTagsSelect, useMutPost } from '../../queries/queries';
import { useQueryClient } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tags } from '@/constants/data';

const PostFormSchema = z.object({
  title: z
    .string({ required_error: 'name is required' })
    .min(1, { message: 'name is should be at least 1 character' }),
  desc: z
    .string({ required_error: 'desc is required' })
    .min(10, { message: 'desc is should be at least 1 character' }),
  thumb: z.instanceof(File),
  video: z.instanceof(File),
  tags: z.string()
});

type PostFormSchemaType = z.infer<typeof PostFormSchema>;

const PostCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const queryClient = useQueryClient();
  const tags = useGetTagsSelect();
  const post = useMutPost();
  const form = useForm<PostFormSchemaType>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: '',
      desc: '',
      tags: 'light'
    }
  });

  const onSubmit = (values: PostFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const fd = new FormData();
    fd.append('title', values.title);
    fd.append('desc', values.desc);
    fd.append('thumb', values.thumb);
    fd.append('video', values.video);
    fd.append('tags', values.tags);
    for (const [key, value] of fd.entries()) {
      console.log(key, value, 'djdj');
    }
    post.mutateAsync(fd).then(() => {
      modalClose();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    });
  };

  return (
    <div className="px-2">
      {/* <div className="flex items-center justify-center text-2xl font-bold">
        {'<Logo/>'}
      </div> */}

      <Heading
        title={'Create New Post/Video'}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title">Title</Label>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Enter title"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="desc">Description</Label>
                  <FormControl>
                    <Input
                      id="desc"
                      placeholder="Enter description"
                      {...field}
                      className=" px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="video">Video</Label>
                  <FormControl>
                    <Input
                      id="video"
                      //   placeholder="Enter description"
                      name={field.name}
                      type="file"
                      onChange={(e) => {
                        // react-hook-form expects the file itself, not the event
                        field.onChange(e.target.files?.[0]);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumb"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="thumb">Thumbnail</Label>
                  <FormControl>
                    <Input
                      id="thumb"
                      // placeholder="Enter description"
                      name={field.name}
                      type="file"
                      onChange={(e) => {
                        // react-hook-form expects the file itself, not the event
                        field.onChange(e.target.files?.[0]);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="tags">Tags</Label>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            tags.isLoading ? 'Loading...' : 'Select Tag'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.data?.length
                          ? tags.data.map((item: Tags, index: number) => (
                              <SelectItem value={`${item?.id}`} key={index}>
                                {item?.name}
                              </SelectItem>
                            ))
                          : ''}
                      </SelectContent>
                    </Select>
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
            <Button
              type="submit"
              className="rounded-full"
              size="lg"
              disabled={post.isPending}
            >
              Create Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostCreateForm;
