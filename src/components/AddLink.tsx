import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import get from "lodash/get";
import * as Yup from "yup";

import Button from "./Button";
import Error from "./Error";
import Dialog from "./Dialog";
import Input from "./Input";
import { useApi } from "../hooks/use-api";
import { useAppContext } from "../context";
import { actions } from "../constants/actions";
import TagSelector from './TagSelctor';

interface Tag {
  title: string;
}

interface AddLinkProps {
  open: boolean;
  onClose: () => void;
}

const AddLink: React.FC<AddLinkProps> = ({ open, onClose }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, postRequest } = useApi();
  const { dispatch } = useAppContext();

  const formik = useFormik({
    initialValues: { url: "" },
    validationSchema: Yup.object({
      url: Yup.string().url("A valid URL is required").required("A URL is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await postRequest("links", { ...values, tags });
        if (res?.data) {
          if (!res.data.isNew) {
            toast.error("Link already exists");
            handleClose();
            return;
          }

          if (res.data.tags?.length) {
            dispatch({ type: actions.ADD_TAGS, payload: res.data.tags });
          }

          dispatch({ type: actions.ADD_LINK, payload: res.data.link });

          toast.success("Successfully saved link");
          handleClose();
        } else {
          setError("An error has occurred");
        }
      } catch (err) {
        const errorMsg = get(err, "response.data.error", "An error has occurred.");
        setError(errorMsg);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setTags([]);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="space-y-4">
        <h2 className="text-gray-800 text-xl font-semibold">Add new link</h2>

        {error && <Error>{error}</Error>}

        <Input
          id="url"
          name="url"
          label="URL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.url}
          error={formik.touched.url && formik.errors.url}
          placeholder="Enter a URL"
        />

        <TagSelector tags={tags} setTags={setTags} />

        <Button type="button" onClick={() => formik.handleSubmit()} isLoading={loading}>
          Add Link
        </Button>
      </div>
    </Dialog>
  );
};

export default AddLink;
