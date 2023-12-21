import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

import usePreviewUploadModal from "~/hooks/usePreviewUploadModal";
import { LoadingSpinner } from "~/components/global/loading";

export default function Lightbox() {
  const { onClose, isOpen, fileUrl } = usePreviewUploadModal();

  const [isLoading, setLoading] = useState(true);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => onClose()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="pb-2 text-xl font-bold leading-6 text-gray-900 "
                    >
                      Image Preview
                    </Dialog.Title>
                    <div className="mt-2">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LoadingSpinner size={64} />
                        </div>
                      )}
                      {isLoading}
                      <Image
                        src={fileUrl ?? "/images/placeholder.png"}
                        width={400}
                        height={320}
                        sizes="(max-width: 768px) 100vw,
                                      (max-width: 1200px) 50vw,
                                      33vw"
                        style={{ height: "100%", width: "100%" }}
                        alt="Uploaded image"
                        onLoad={() => setLoading(false)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-x-2 text-right sm:mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      if (!fileUrl) return toast.error("No file URL found!");
                      copy(fileUrl ?? "");
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    Copy Link
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      if (!fileUrl) return toast.error("No file URL found!");
                      window.open(fileUrl, "_blank");
                    }}
                  >
                    Preview in
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
