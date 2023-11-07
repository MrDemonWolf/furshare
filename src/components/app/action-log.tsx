import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "~/components/global/loading";

import { api } from "~/utils/api";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function UserActionLog() {
  const { data: actionLog, isLoading } = api.actionLog.get10.useQuery();
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <LoadingSpinner size={64} />
        </div>
      )}
      {actionLog && (
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {actionLog.map((action, actionId) => (
              <li key={action.id}>
                <div className="relative pb-8">
                  {actionId !== actionLog.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      {action.type === "UPLOAD_CREATED" && (
                        <span className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-400 align-middle ring-8 ring-white">
                          <ArrowUpTrayIcon
                            className="text-gray-900"
                            width={12}
                            height={12}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          {action.description} by{" "}
                          <span className="font-medium text-gray-900">
                            {action.user.displayName}
                          </span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={dayjs(action.createdAt).format("LL")}>
                          {dayjs(action.createdAt).format("LL")}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
