import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";
import service from "../../Appwrite/dataConf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        // Delete the existing featured image if it exists
        if (post.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }

        // Upload the new featured image if it exists
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          data.featuredImage = file.$id;
        }

        // Update the post with the new data
        const updatedPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: data.featuredImage || undefined,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`); // Navigate to updated post
        } else {
          console.error("Post update failed, no data returned.");
        }
      } else {
        // Create a new post with the uploaded featured image
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;
        if (file) {
          data.featuredImage = file.$id;
        }

        const newPostData = {
          ...data,
          userId: userData.$id,
        };

        // Create the post (may return 204)
        await service.createPostRequest(newPostData);

        // Explicitly retrieve the created post to navigate
        const createdPost = await service.getPost(data.slug); // Use slug or some identifier

        if (createdPost) {
          navigate(`/post/${createdPost.$id}`); // Navigate to created post
        } else {
          console.error("Post retrieval after creation failed.");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }

      return () => {
        subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          {!post && (
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          )}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
