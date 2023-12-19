import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { PlusIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components/global/loading";
import AppLayout from "~/components/layouts/app";
import useCreateTokenModal from "~/hooks/useCreateTokenModal";

import SideOverCreateIntergation from "~/components/app/side-over/create-intergation";

import { api } from "~/utils/api";

dayjs.extend(LocalizedFormat);

export default function IntergationsPage() {
  const { onOpen, token, resetToken } = useCreateTokenModal();

  const { data: intergations, isLoading } =
    api.intergations.get.useQuery() ?? [];

  const ctx = api.intergations.get.useQuery();

  const { mutate: removeIntergation, isLoading: pendingRemovel } =
    api.intergations.remove.useMutation({
      onSuccess: () => {
        void ctx.refetch();
        toast.success("Intergation token removed");
      },
      onError: () => {
        toast.error("Failed to remove intergation token");
      },
    });
  return (
    <AppLayout>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Intergation Tokens</h1>
          {token && (
            <div className="mb-6 w-full rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-gray-900">
                    Intergation token created
                  </h3>
                  <div className="my-4 overflow-y-auto whitespace-pre-wrap break-all bg-green-100 p-4 text-gray-700 shadow-inner">
                    {token}
                  </div>
                  <div className="font-medium text-gray-700">
                    Please save this token somewhere safe. You will not be able
                    to view it again. If you lose it, you will need to go
                    through the process of creating a new token.
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="rounded-md bg-indigo-400 px-2 py-1.5 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50"
                        onClick={() => {
                          copy(token);
                          toast.success("Token copied to clipboard");
                        }}
                      >
                        Copy token
                      </button>
                      <button
                        type="button"
                        className="ml-3 rounded-md bg-red-400 px-2 py-1.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        onClick={() => {
                          resetToken();
                          toast.dismiss();
                        }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700 dark:shadow-gray-800">
            <div className="p-6">
              <div className="mb-4 sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    Intergations (API Tokens)
                  </h1>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    Manage your API tokens. You can use these tokens to
                    authenticate with our API to upload files.
                  </p>
                </div>
                {!isLoading && intergations && intergations.data.length > 0 && (
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      onClick={() => {
                        onOpen();
                      }}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Create intergation
                    </button>
                  </div>
                )}
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="w-1 px-6 py-3 md:w-1/2">
                        Label
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Expires
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
                        <td className="text-center" colSpan={4}>
                          <div className="mx-auto p-10">
                            <LoadingSpinner size={64} />
                          </div>
                        </td>
                      </tr>
                    )}
                    {!isLoading &&
                      !pendingRemovel &&
                      intergations &&
                      intergations.data.length > 0 && (
                        <>
                          {intergations.data.map((intergation) => (
                            <tr
                              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                              key={intergation.id}
                            >
                              <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                              >
                                {intergation.label}
                              </th>
                              <td className="px-6 py-4 text-gray-500 dark:text-gray-200">
                                {intergation.isNever
                                  ? "Never Expires"
                                  : dayjs(intergation.expiresAt).format("LL")}
                              </td>
                              <td className="px-6 py-4 text-gray-500 dark:text-gray-200">
                                {dayjs(intergation.createdAt).format("LL")}
                              </td>
                              <td className="flex flex-col items-center space-y-2 px-6 py-4 text-center md:float-right md:block md:space-x-2 md:space-y-0">
                                <button
                                  onClick={() => {
                                    resetToken();
                                    removeIntergation({
                                      id: intergation.id,
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
                    {!isLoading &&
                      intergations &&
                      intergations.data.length === 0 && (
                        <>
                          <td className="py-16 text-center md:p-28" colSpan={4}>
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
                              No Intergations Tokens Found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
                              Get started by creating by creating a new
                              intergation token.
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
                                Create intergation
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
                  {intergations && (
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        1-{intergations.data.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {intergations.total}
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
        <SideOverCreateIntergation />
      </main>
    </AppLayout>
  );
}
