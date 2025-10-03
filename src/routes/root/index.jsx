import { useState, useEffect } from 'react';
import get from 'lodash/get';

import { useApi } from '../../hooks/use-api';
import { useAppContext } from '../../context';
import { actions } from '../../constants/actions';

import Button from '../../components/Button';
import Filters from '../../components/Filters';
import Header from '../../components/Header';
import LinkSummary from '../../components/LinkSummary';
import Spinner from '../../components/spinner';
import AddLink from '../../components/AddLink';
import EditLink from '../../components/EditLink';

const RootRoute = () => {
  const [isCreating, setCreating] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const { loading, getRequest } = useApi();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const getLinks = async () => {
      
      const res = await getRequest('links');
      dispatch({
        type: actions.UPDATE_LINKS,
        payload: get(res, 'data.links', []),
      });
    };

    getLinks();
  }, []);

  if (loading) {
    return (
      <div className='bg-gray-50 min-h-screen w-full flex flex-col'>
        <Header />
        <div className='flex-1 flex items-center justify-center'>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Dialogs */}
      <AddLink open={isCreating} onClose={() => setCreating(false)} />
      <EditLink
        open={isEditing}
        link={state?.links?.find((l) => l.linkId === isEditing)}
        onClose={() => setEditing(false)}
      />

      <div className='bg-gray-50 min-h-screen w-full'>
        <Header />
        <div className='px-4'>
          <div className='grid grid-cols-4 gap-8 max-w-6xl mx-auto my-12'>
            <div className='col-span-1'>
              <Filters />
            </div>

            <div className='col-span-3'>
              <div className='flex items-center border-b border-gray-200 mb-4 pb-4'>
                <h2 className='text-gray-800 font-semibold'>
                  My Link Saves ({state?.links?.length})
                </h2>
                <div className='ml-auto'>
                  <Button onClick={() => setCreating(true)}>+ Add Link</Button>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-8'>
                {state?.links?.length ? (
                  state?.links?.map((link) => (
                    <LinkSummary
                      key={link.linkId}
                      link={link}
                      onEdit={setEditing}
                    />
                  ))
                ) : (
                  <p className='text-gray-500'>No links to display</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RootRoute;
