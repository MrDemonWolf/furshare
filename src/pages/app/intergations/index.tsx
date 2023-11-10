import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { LoadingSpinner } from "~/components/global/loading";
import AppLayout from "~/components/layouts/app";

import { api } from "~/utils/api";

dayjs.extend(LocalizedFormat);

export default function IntergationsPage() {
  const { data: intergations, isLoading } = api.intergations.get.useQuery();

  return (
    <AppLayout>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">User Dashboard</h1>
          <section aria-labelledby="section-title">
            <h2 className="sr-only" id="section-title">
              API Tokens
            </h2>
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
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/app/intergation/modal/create";
                      }}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Create intergation
                    </button>
                  </div>
                </div>
                {isLoading && (
                  <div className="my-32 text-center md:my-48">
                    <LoadingSpinner size={128} />
                    Loading intergations...
                  </div>
                )}

                {!isLoading && intergations && (
                  <>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                          <tr>
                            <th scope="col" className="p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-all-search"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                  htmlFor="checkbox-all-search"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </th>
                            <th scope="col" className="w-1 px-6 py-3 md:w-1/2">
                              Label
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Expires
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center md:float-right"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-1"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                  htmlFor="checkbox-table-search-1"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              Apple MacBook Pro 17&quot;
                            </th>
                            <td className="px-6 py-4">Silver</td>
                            <td className="px-6 py-4">Laptop</td>
                            <td className="px-6 py-4">$2999</td>
                            <td className="px-6 py-4">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                          <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-2"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                />
                                <label
                                  htmlFor="checkbox-table-search-2"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">White</td>
                            <td className="px-6 py-4">Laptop PC</td>
                            <td className="px-6 py-4">$1999</td>
                            <td className="px-6 py-4">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                              >
                                Edit
                              </a>
                            </td>
                          </tr> */}
                          {intergations.data.map((intergation) => (
                            <tr
                              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                              key={intergation.id}
                            >
                              <td className="w-4 p-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                  />
                                  <label
                                    htmlFor="checkbox-table-search-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
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
                              <td className="flex flex-col items-center space-y-2 px-6 py-4 text-center md:float-right md:block md:space-x-2 md:space-y-0">
                                <TrashIcon
                                  width={24}
                                  height={24}
                                  className=" block text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 md:inline"
                                >
                                  <span className="sr-only">Delete</span>
                                </TrashIcon>
                                <PencilIcon
                                  width={24}
                                  height={24}
                                  className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 md:inline"
                                >
                                  Edit
                                </PencilIcon>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <nav
                        className="flex items-center justify-between pt-4"
                        aria-label="Table navigation"
                      >
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
                        <ul className="inline-flex h-8 -space-x-px text-sm">
                          <li>
                            <a
                              href="#"
                              className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Previous
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppLayout>
  );
}
