import { useState } from "react";
import { toast } from "react-toastify";
import get from "lodash/get";


import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";
import Error from "./Error";
import { useAppContext } from '../context';
import { useApi } from '../hooks/use-api';
import { actions } from '../constants/actions';

const EditLink = ({ open, onClose, link }) => {
  const [error, setError] = useState(false);
  const { putRequest, deleteRequest } = useApi();
  const { dispatch } = useAppContext();

  const handleSave = async () => {
    setError(false);
    try {
      const res = await putRequest(`links/${link.linkId}`, {});
      if (res?.data) {
        dispatch({
          type: actions.UPDATE_LINK,
          payload: res.data.link,
        });
        toast.success("Successfully saved link");
        onClose();
      } else {
        setError("An error has occurred");
      }
    } catch (err) {
      const errorMsg = get(
        err,
        "response.data.error",
        "An error has occurred."
      );
      setError(errorMsg);
    }
  };

  const handleDelete = async () => {
    setError(false);
    try {
      const res = await deleteRequest(`links/${link.linkId}`);
      if (res.status === 200) {
        toast.success("Successfully deleted link");
        dispatch({
          type: actions.DELETE_LINK,
          payload: link.linkId,
        });
        onClose();
      } else {
        setError("An error has occurred");
      }
    } catch (err) {
      const errorMsg = get(
        err,
        "response.data.error",
        "An error has occurred."
      );
      setError(errorMsg);
    }
  };

  if (!link) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-gray-800 text-xl font-semibold">Edit link</h2>

        {error && <Error>{error}</Error>}

        <div>
          <Input label="URL" value={link.url} readOnly />
        </div>

        <Button onClick={handleSave}>Save Link</Button>

        <div>
          <p className="text-gray-800 text-md font-semibold text-center my-6">
            Or
          </p>
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white rounded-md px-4 py-2 font-semibold hover:bg-red-600 transition-colors"
          >
            Delete Link
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditLink;
