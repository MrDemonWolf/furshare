import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { api } from "~/utils/api";

import useCreateTokenModal from "~/hooks/useCreateTokenModal";

export default function CreateIntergationTokenModal() {
  enum Expiry {
    never = "never",
    oneyear = "oneyear",
    ninetydays = "ninetydays",
    thirtydays = "thirtydays",
  }

  const { mutate } = api.intergations.create.useMutation();

  const { onClose, isOpen } = useCreateTokenModal();

  const [label, setLabel] = useState<string>("");
  const [expiry, setExpiry] = useState<Expiry>(Expiry.never);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl dark:bg-gray-700">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-600 px-4 py-6  sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          Create new Intergation Token
                        </Dialog.Title>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300 dark:text-indigo-100">
                            Get started by filling in the information below to
                            create your new API token. Reminder: An API token is
                            like a password, so keep it secret.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-bold leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Token label
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="project-name"
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={label}
                                  onChange={(e) => setLabel(e.target.value)}
                                />
                              </div>
                            </div>

                            <fieldset>
                              <legend className="text-sm font-bold leading-6 text-gray-900 dark:text-gray-100">
                                Expiry
                              </legend>
                              <div className="mt-2 space-y-4">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-public"
                                      name="privacy"
                                      aria-describedby="privacy-public-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      checked={expiry === Expiry.never}
                                      onClick={() => {
                                        setExpiry(Expiry.never);
                                      }}
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="privacy-public"
                                      className="font-medium text-gray-900 dark:text-gray-100"
                                    >
                                      Never
                                    </label>
                                    <p
                                      id="privacy-public-description"
                                      className="text-gray-500 dark:text-gray-200"
                                    >
                                      Your token will never expire. You can
                                      manually revoke it at any time.
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private-to-project"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                                        checked={expiry === Expiry.oneyear}
                                        onClick={() => {
                                          setExpiry(Expiry.oneyear);
                                        }}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-private-to-project"
                                        className="font-medium text-gray-900 dark:text-gray-100"
                                      >
                                        1 year
                                      </label>
                                      <p
                                        id="privacy-private-to-project-description"
                                        className="text-gray-500 dark:text-gray-200"
                                      >
                                        Your token will expire after 1 year. You
                                        can manually revoke it earlier, if
                                        needed.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private-to-project"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={expiry === Expiry.ninetydays}
                                        onClick={() => {
                                          setExpiry(Expiry.ninetydays);
                                        }}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-private-to-project"
                                        className="font-medium text-gray-900 dark:text-gray-100"
                                      >
                                        90 days
                                      </label>
                                      <p
                                        id="privacy-private-to-project-description"
                                        className="text-gray-500 dark:text-gray-200"
                                      >
                                        Your token will expire after 90 days.
                                        You can manually revoke it earlier, if
                                        needed.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        checked={expiry === Expiry.thirtydays}
                                        onClick={() => {
                                          setExpiry(Expiry.thirtydays);
                                        }}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-private"
                                        className="font-medium text-gray-900 dark:text-gray-100"
                                      >
                                        30 days
                                      </label>
                                      <p
                                        id="privacy-private-description"
                                        className="text-gray-500 dark:text-gray-200"
                                      >
                                        Your token will expire after 30 days.
                                        You can manually revoke it earlier, if
                                        needed.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => onClose()}
                      >
                        Nevermind
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          mutate({
                            label: "test",
                            expiry,
                          });
                        }}
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Create token
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
