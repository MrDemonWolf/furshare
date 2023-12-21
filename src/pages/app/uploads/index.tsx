import { TrashIcon, ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import toast from "react-hot-toast";
import { partial } from "filesize";
import usePreviewUploadModal from "~/hooks/usePreviewUploadModal";
import { LoadingSpinner } from "~/components/global/loading";
import AppLayout from "~/components/layouts/app";
import ImageLightbox from "~/components/app/modal/lightbox";

import { api } from "~/utils/api";

dayjs.extend(LocalizedFormat);

const size = partial({ standard: "jedec" });

export default function UpLoadsPage() {
  const { onOpen, setFileURL, resetFileURL } = usePreviewUploadModal();

  const { data: uploads, isLoading } = api.uploads.get.useQuery() ?? [];

  const ctx = api.uploads.get.useQuery();

  const { mutate: removeUpload, isLoading: pendingRemovel } =
    api.uploads.remove.useMutation({
      onSuccess: () => {
        void ctx.refetch();
        toast.success("File has been deleted");
      },
      onError: () => {
        toast.error("Something went wrong deleting the file");
      },
    });
  return (
    <AppLayout>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Uploads</h1>
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700 dark:shadow-gray-800">
            <div className="p-6">
              <div className="mb-4 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Your uploads
                  </h1>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    Upload files to your account and share them with others. You
                    can also use our API to upload files to your account.
                  </p>
                </div>
                {/* Will be added later */}
                {/* {!isLoading && uploads && uploads.data.length > 0 && (
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                      <button
                        type="button"
                        onClick={() => {
                          onOpen();
                        }}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Upload File
                      </button>
                    </div>
                  )} */}
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="w-1 px-6 py-3 md:w-1/2">
                        File Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        File Size
                      </th>
                      <th scope="col" className="px-6 py-3">
                        File Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center md:text-right"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isLoading || pendingRemovel) && (
                      <tr>
                        <td className="text-center" colSpan={5}>
                          <div className="mx-auto p-10">
                            <LoadingSpinner size={64} />
                          </div>
                        </td>
                      </tr>
                    )}
                    {!isLoading &&
                      !pendingRemovel &&
                      uploads &&
                      uploads.data.length > 0 && (
                        <>
                          {uploads.data.map((upload) => (
                            <tr
                              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                              key={upload.id}
                            >
                              <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                              >
                                {upload.name}
                              </th>
                              <td className="px-6 py-4 text-gray-500 dark:text-gray-200">
                                {size(upload.fileSize)}
                              </td>
                              <td className="px-6 py-4 text-gray-500 dark:text-gray-200">
                                {upload.fileType}
                              </td>
                              <td className="px-6 py-4 text-gray-500 dark:text-gray-200">
                                {dayjs(upload.createdAt).format("LL")}
                              </td>
                              <td className="flex flex-col items-center space-y-2 px-6 py-4 text-center md:float-right md:block md:space-x-2 md:space-y-0">
                                <button
                                  onClick={() => {
                                    setFileURL(upload.fileUrl);
                                    onOpen();
                                  }}
                                >
                                  <ViewfinderCircleIcon
                                    width={24}
                                    height={24}
                                    className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 md:inline"
                                  >
                                    <span className="sr-only">View</span>
                                  </ViewfinderCircleIcon>
                                </button>
                                <button
                                  onClick={() => {
                                    resetFileURL();
                                    removeUpload({
                                      id: upload.id,
                                    });
                                  }}
                                >
                                  <TrashIcon
                                    width={24}
                                    height={24}
                                    className=" block text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 md:inline"
                                  >
                                    <span className="sr-only">Delete</span>
                                  </TrashIcon>
                                </button>

                                {/* <PencilIcon
                                    width={24}
                                    height={24}
                                    className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 md:inline"
                                  >
                                    Edit
                                  </PencilIcon> */}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    {!isLoading && uploads && uploads.data.length === 0 && (
                      <>
                        <td className="py-16 text-center md:p-28" colSpan={5}>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              vectorEffect="non-scaling-stroke"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                            No uploads yet
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                            Upload your first file to get started.
                          </p>
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                onOpen();
                              }}
                              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              <PlusIcon
                                className="-ml-0.5 mr-1.5 h-5 w-5"
                                aria-hidden="true"
                              />
                              Upload File
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tbody>
                </table>
                <nav
                  className="flex items-center justify-between pt-4"
                  aria-label="Table navigation"
                >
                  {uploads && (
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        1-{uploads.data.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {uploads.total}
                      </span>
                    </span>
                  )}
                  {/* <ul className="inline-flex h-8 -space-x-px text-sm">
                      <li>
                        <a
                          href="#"
                          className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </a>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </button>
                      </li>
                    </ul> */}
                </nav>
              </div>
            </div>
          </div>
        </div>
        <ImageLightbox />
      </main>
    </AppLayout>
  );
}
