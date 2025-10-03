import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import get from "lodash/get";
import * as Yup from "yup";

import Button from "./Button";
import Error from "./Error";
import Dialog from "./Dialog";
import Input from "./Input";
import { useApi } from '../hooks/use-api';
import { useAppContext } from '../context';
import { actions } from '../constants/actions';

const AddLink = ({ open, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const { loading, postRequest } = useApi();
    const { dispatch } = useAppContext();

    const formik = useFormik({
        initialValues: {
            url: "",
        },
        validationSchema: Yup.object({
            url: Yup.string()
                .url("A valid URL is required")
                .required("A URL is required"),
        }),
        onSubmit: async (values) => {
            try {
                const res = await postRequest("links", { ...values });
                if (res?.data) {
                    if (!res.data.isNew) {
                        toast.error("Link already exists");
                        handleClose();
                        return;
                    }

                    dispatch({
                        type: actions.ADD_LINK,
                        payload: res.data.link,
                    });

                    toast.success("Successfully saved link");
                    handleClose();
                } else {
                    setError("An error has occured");
                }
            } catch (err) {
                const errorMsg = get(
                    err,
                    "response.data.error",
                    "An error has occurred."
                );
                setError(errorMsg);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <div className="space-y-4">
                <h2 className="text-gray-800 text-xl font-semibold">Add new link</h2>

                {error && <Error>{error}</Error>}

                <div>
                    <Input
                        id="url"
                        name="url"
                        label="URL"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        error={formik.touched.url && formik.errors.url}
                        placeholder="Enter a url"
                    />
                </div>

                <Button type="button" onClick={()=> formik.handleSubmit()} loading={loading}>
                    Add Link
                </Button>
            </div>
        </Dialog>
    );
};

export default AddLink;
